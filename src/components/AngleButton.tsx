import React, { useState } from 'react';
import { calculateAngle } from '@/utils/time';

interface AngleButtonProps {
  date: Date;
}

export const AngleButton: React.FC<AngleButtonProps> = ({
  date,
}: AngleButtonProps) => {
  const [angle, setAngle] = useState<number | null>(null);

  const handleClick: () => void = () => {
    setAngle(calculateAngle(date));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xs">
      {angle !== null && (
        <div className="mb-4 text-lg font-semibold">
          Úhel: {angle.toFixed(0)}&#176;
        </div>
      )}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4"
        onClick={handleClick}
      >
        Spočítat úhel
      </button>
    </div>
  );
};
