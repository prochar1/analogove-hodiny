import React, { useState } from 'react';
import { calculateAngle } from '@/utils/time';

/**
 * Props pro komponentu AngleButton
 * - date: aktuální čas, podle kterého se počítá úhel mezi ručičkami
 */
interface AngleButtonProps {
  date: Date;
}

/**
 * Komponenta AngleButton
 * - Po kliknutí na tlačítko spočítá úhel mezi minutovou a hodinovou ručičkou
 * - Výsledek zobrazí uživateli
 */
export const AngleButton: React.FC<AngleButtonProps> = ({
  date,
}: AngleButtonProps) => {
  // Stav pro uložený úhel (výsledek výpočtu)
  const [angle, setAngle] = useState<number | null>(null);

  /**
   * Handler pro kliknutí na tlačítko
   * - Spočítá úhel pomocí utilitní funkce a uloží ho do stavu
   */
  const handleClick: () => void = () => {
    setAngle(calculateAngle(date));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xs">
      {/* Výpis úhlu, pokud je spočítán */}
      {angle !== null && (
        <div className="mb-4 text-lg font-semibold">
          Úhel: {angle.toFixed(0)}&#176;
        </div>
      )}
      {/* Tlačítko pro výpočet úhlu */}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4"
        onClick={handleClick}
      >
        Spočítat úhel
      </button>
    </div>
  );
};
