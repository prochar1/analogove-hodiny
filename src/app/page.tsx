'use client';

import { useState, useEffect } from 'react';
import { AnalogClock } from '@/components/AnalogClock';
import { AngleButton } from '@/components/AngleButton';
import { ServerTimeButton } from '@/components/ServerTimeButton';

/**
 * Hlavní stránka aplikace
 * - Spravuje aktuální čas ve stavu (date)
 * - Každých 50 ms aktualizuje čas (pro plynulý pohyb ručiček)
 * - Předává aktuální čas dětským komponentám jako prop
 */
export default function Home() {
  // Stav pro aktuální čas (Date), inicializován na null
  const [date, setDate] = useState<Date | null>(null);

  // Po načtení komponenty nastaví čas a spustí interval pro jeho aktualizaci
  useEffect((): (() => void) => {
    setDate(new Date());
    const interval: NodeJS.Timeout = setInterval(() => setDate(new Date()), 50);
    return () => clearInterval(interval);
  }, []);

  // Pokud čas ještě není načten, nic nevykresluje (můžeš zde zobrazit spinner)
  if (!date) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 min-h-screen">
      {/* Komponenta s analogovými hodinami */}
      <AnalogClock date={date} />
      <div className="flex flex-col items-center w-full max-w-xs">
        {/* Tlačítko pro výpočet úhlu mezi ručičkami */}
        <AngleButton date={date} />
        {/* Tlačítko pro zjištění odchylky od serverového času */}
        <ServerTimeButton date={date} />
      </div>
    </div>
  );
}
