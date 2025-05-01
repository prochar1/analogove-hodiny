/**
 * Spočítá úhel mezi minutovou a hodinovou ručičkou na analogových hodinách pro daný čas.
 * @param date - Datum a čas, pro který se úhel počítá
 * @returns Úhel v rozsahu 0–360 stupňů
 */
export function calculateAngle(date: Date): number {
  const hours: number = date.getHours() % 12; // Hodiny v rozsahu 0–11
  const minutes: number = date.getMinutes(); // Minuty 0–59
  const seconds: number = date.getSeconds() + date.getMilliseconds() / 1000; // Sekundy s desetinnou částí
  const hourAngle: number = (360 / 12) * hours + (360 / 12) * (minutes / 60); // Úhel hodinové ručičky
  const minuteAngle: number =
    (360 / 60) * minutes + (360 / 60) * (seconds / 60); // Úhel minutové ručičky
  let angleBetween: number = minuteAngle - hourAngle; // Rozdíl úhlů
  if (angleBetween < 0) angleBetween += 360; // Úhel vždy kladný
  return angleBetween;
}

/**
 * Převede rozdíl času v milisekundách na formát mm:ss:SS (minuty:vteřiny:setiny).
 * @param diffMs - Rozdíl v milisekundách
 * @returns Řetězec ve formátu mm:ss:SS
 */
export function formatOffset(diffMs: number): string {
  const minutes: number = Math.floor(diffMs / 60000);
  const seconds: number = Math.floor((diffMs % 60000) / 1000);
  const hundredths: number = Math.floor((diffMs % 1000) / 10);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}:${String(hundredths).padStart(2, '0')}`;
}

/**
 * Typ odpovědi z TimeZoneDB API (používáme pouze pole formatted)
 */
interface TimeZoneDbResponse {
  formatted: string;
  [key: string]: unknown;
}

/**
 * Získá aktuální čas ze serveru (TimeZoneDB), porovná s lokálním časem a vrátí odchylku ve formátu mm:ss:SS.
 * @param localDate - Lokální čas, se kterým se serverový čas porovnává
 * @returns Odchylka jako řetězec, nebo chybová hláška
 */
export async function fetchServerTimeOffset(localDate: Date): Promise<string> {
  try {
    const apiKey: string | undefined =
      process.env.NEXT_PUBLIC_TIMEZONEDB_API_KEY;
    const res: Response = await fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=Europe/Prague`
    );
    if (!res.ok) {
      // Pokud API vrátí chybu (např. špatný klíč)
      console.error('Chyba při volání TimeZoneDB API:', res.statusText);
      return 'Chyba serveru, zkuste to později';
    }
    const data: TimeZoneDbResponse = await res.json();
    if (!data.formatted) {
      // Pokud odpověď neobsahuje očekávaná data
      console.error('Neplatná odpověď z TimeZoneDB API:', data);
      return 'Neplatná odpověď serveru';
    }
    const serverDate: Date = new Date(
      (data.formatted as string).replace(' ', 'T')
    );
    const diffMs: number = Math.abs(localDate.getTime() - serverDate.getTime());
    return formatOffset(diffMs);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // Fallback: zkus získat čas ze serveru aplikace
    try {
      const res = await fetch('/api/server-time');
      if (!res.ok) throw new Error('Chyba při získávání času ze serveru');
      const data = await res.json();
      const serverDate = new Date(data.serverTime);
      const diffMs = Math.abs(localDate.getTime() - serverDate.getTime());
      return formatOffset(diffMs);
    } catch (err) {
      console.error('Chyba při fallbacku na serverový čas:', err);
      return 'Nelze získat čas ze serveru';
    }
  }
}
