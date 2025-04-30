export function calculateAngle(date: Date): number {
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds() + date.getMilliseconds() / 1000;
  const hourAngle = (360 / 12) * hours + (360 / 12) * (minutes / 60);
  const minuteAngle = (360 / 60) * minutes + (360 / 60) * (seconds / 60);
  let angleBetween = minuteAngle - hourAngle;
  if (angleBetween < 0) angleBetween += 360;
  return angleBetween;
}

export function formatOffset(diffMs: number): string {
  const minutes = Math.floor(diffMs / 60000);
  const seconds = Math.floor((diffMs % 60000) / 1000);
  const hundredths = Math.floor((diffMs % 1000) / 10);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}:${String(hundredths).padStart(2, '0')}`;
}

export async function fetchServerTimeOffset(): Promise<string> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_TIMEZONEDB_API_KEY;
    const res = await fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=Europe/Prague`
    );
    const data = await res.json();
    const serverDate = new Date(data.formatted.replace(' ', 'T'));
    const local = new Date();
    const diffMs = Math.abs(local.getTime() - serverDate.getTime());
    return formatOffset(diffMs);
  } catch {
    return 'Chyba při získávání času';
  }
}
