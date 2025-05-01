import React from 'react';

/**
 * Props pro komponentu AnalogClock
 * - date: aktuální čas, podle kterého se vykreslují ručičky hodin
 */
interface AnalogClockProps {
  date: Date;
}

/**
 * Komponenta AnalogClock
 * - Vykresluje SVG analogové hodiny podle zadaného času
 * - Zobrazuje ciferník, číslice, minutové čárky a všechny tři ručičky
 */
export const AnalogClock: React.FC<AnalogClockProps> = ({
  date,
}: AnalogClockProps) => {
  // Rozměry SVG hodin
  const size: number = 300;
  const center: number = size / 2;
  const radius: number = size / 2 - 10;

  // Získání aktuálních hodin, minut a sekund
  const hours: number = date.getHours() % 12;
  const minutes: number = date.getMinutes();
  const seconds: number = date.getSeconds() + date.getMilliseconds() / 1000;

  // Výpočet úhlů ručiček
  const hourAngle: number = (360 / 12) * hours + (360 / 12) * (minutes / 60);
  const minuteAngle: number =
    (360 / 60) * minutes + (360 / 60) * (seconds / 60);
  const secondAngle: number = (360 / 60) * seconds;

  return (
    <div className="flex flex-col items-center mb-8">
      <svg width={size} height={size}>
        {/* Ciferník */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#333"
          strokeWidth="4"
          fill="#fff"
        />
        {/* Číslice */}
        {[...Array(12)].map((_, i: number) => {
          const angleDeg: number = (i + 1) * 30 - 90;
          const angleRad: number = angleDeg * (Math.PI / 180);
          const rNum: number = radius - 22;
          const x: number = center + rNum * Math.cos(angleRad);
          const y: number = center + rNum * Math.sin(angleRad);
          const rotate: number = angleDeg + 90;
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="16"
              fontFamily="monospace"
              fill="#333"
              transform={`rotate(${rotate} ${x} ${y})`}
            >
              {i + 1}
            </text>
          );
        })}
        {/* Minutové čárky */}
        {[...Array(60)].map((_, i: number) => {
          const angle: number = (i * 6 - 90) * (Math.PI / 180);
          const r1: number = radius - 4;
          const r2: number = i % 5 === 0 ? radius - 14 : radius - 8;
          const x1: number = center + r1 * Math.cos(angle);
          const y1: number = center + r1 * Math.sin(angle);
          const x2: number = center + r2 * Math.cos(angle);
          const y2: number = center + r2 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#888"
              strokeWidth={i % 5 === 0 ? 2 : 1}
            />
          );
        })}
        {/* Hodinová ručička */}
        <line
          x1={center}
          y1={center}
          x2={center + (radius - 50) * Math.sin((Math.PI / 180) * hourAngle)}
          y2={center - (radius - 50) * Math.cos((Math.PI / 180) * hourAngle)}
          stroke="#333"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Minutová ručička */}
        <line
          x1={center}
          y1={center}
          x2={center + (radius - 20) * Math.sin((Math.PI / 180) * minuteAngle)}
          y2={center - (radius - 20) * Math.cos((Math.PI / 180) * minuteAngle)}
          stroke="#1976d2"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Vteřinová ručička */}
        <line
          x1={center}
          y1={center}
          x2={center + (radius - 10) * Math.sin((Math.PI / 180) * secondAngle)}
          y2={center - (radius - 10) * Math.cos((Math.PI / 180) * secondAngle)}
          stroke="#e53935"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Střed */}
        <circle cx={center} cy={center} r="6" fill="#1976d2" />
      </svg>
    </div>
  );
};
