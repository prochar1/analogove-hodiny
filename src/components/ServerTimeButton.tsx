import React, { useState } from 'react';
import { fetchServerTimeOffset } from '@/utils/time';

// Typ props: očekává aktuální čas (date) z rodičovské komponenty
interface ServerTimeButtonProps {
  date: Date;
}

/**
 * Komponenta ServerTimeButton
 * - Po kliknutí na tlačítko získá čas ze serveru (TimeZoneDB)
 * - Spočítá a zobrazí odchylku mezi lokálním a serverovým časem
 * - Zobrazuje spinner během načítání
 */
export const ServerTimeButton: React.FC<ServerTimeButtonProps> = ({ date }) => {
  // Stav pro zobrazení odchylky
  const [offset, setOffset] = useState<string | null>(null);
  // Stav pro zobrazení spinneru během načítání
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Handler pro kliknutí na tlačítko
   * - Nastaví loading na true
   * - Zavolá utilitní funkci pro získání a výpočet odchylky
   * - Výsledek uloží do stavu offset
   * - Po dokončení nastaví loading na false
   */
  const handleClick: () => Promise<void> = async () => {
    setLoading(true);
    const offset: string = await fetchServerTimeOffset(date);
    setOffset(offset);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Výpis odchylky, pokud je k dispozici */}
      {offset && (
        <div className="mb-4 mt-4 text-base font-semibold">
          Odchylka: {offset}
        </div>
      )}
      {/* Tlačítko pro získání času ze serveru, během načítání zobrazuje spinner */}
      <button
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition mb-2 flex items-center justify-center min-w-[180px]"
        onClick={handleClick}
        disabled={loading}
      >
        {loading && (
          <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
        )}
        Získat čas ze serveru
      </button>
    </div>
  );
};
