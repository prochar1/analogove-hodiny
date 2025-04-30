export function calculateAngle(date: Date): number {
  const hours: number = date.getHours() % 12;
  const minutes: number = date.getMinutes();
  const seconds: number = date.getSeconds() + date.getMilliseconds() / 1000;
  const hourAngle: number = (360 / 12) * hours + (360 / 12) * (minutes / 60);
  const minuteAngle: number =
    (360 / 60) * minutes + (360 / 60) * (seconds / 60);
  let angleBetween: number = minuteAngle - hourAngle;
  if (angleBetween < 0) angleBetween += 360;
  return angleBetween;
}

export function formatOffset(diffMs: number): string {
  const minutes: number = Math.floor(diffMs / 60000);
  const seconds: number = Math.floor((diffMs % 60000) / 1000);
  const hundredths: number = Math.floor((diffMs % 1000) / 10);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}:${String(hundredths).padStart(2, '0')}`;
}

interface TimeZoneDbResponse {
  formatted: string;
  [key: string]: unknown;
}

export async function fetchServerTimeOffset(): Promise<string> {
  try {
    const apiKey: string | undefined =
      process.env.NEXT_PUBLIC_TIMEZONEDB_API_KEY;
    const res: Response = await fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=Europe/Prague`
    );
    const data: TimeZoneDbResponse = await res.json();
    const serverDate: Date = new Date(
      (data.formatted as string).replace(' ', 'T')
    );
    const local: Date = new Date();
    const diffMs: number = Math.abs(local.getTime() - serverDate.getTime());
    return formatOffset(diffMs);
  } catch {
    return 'Chyba při získávání času';
  }
}
