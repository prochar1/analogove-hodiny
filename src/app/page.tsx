'use client';

import { useState, useEffect } from 'react';
import { AnalogClock } from '@/components/AnalogClock';
import { AngleButton } from '@/components/AngleButton';
import { ServerTimeButton } from '@/components/ServerTimeButton';

export default function Home() {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    setDate(new Date());
    const interval = setInterval(() => setDate(new Date()), 100);
    return () => clearInterval(interval);
  }, []);

  if (!date) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 min-h-screen">
      <AnalogClock date={date} />
      <div className="flex flex-col items-center w-full max-w-xs">
        <AngleButton date={date} />
        <ServerTimeButton />
      </div>
    </div>
  );
}
