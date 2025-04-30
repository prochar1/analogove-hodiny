import React from 'react';

interface AnalogClockProps {
  date: Date;
}

export const AnalogClock: React.FC<AnalogClockProps> = ({ date }) => {
  const size = 200;
  const center = size / 2;
  const radius = size / 2 - 10;

  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds() + date.getMilliseconds() / 1000;

  // Výpočet úhlů ručiček
  const hourAngle = (360 / 12) * hours + (360 / 12) * (minutes / 60);
  const minuteAngle = (360 / 60) * minutes + (360 / 60) * (seconds / 60);
  const secondAngle = (360 / 60) * seconds;

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
        {[...Array(12)].map((_, i) => {
          const angleDeg = (i + 1) * 30 - 90;
          const angleRad = angleDeg * (Math.PI / 180);
          const rNum = radius - 18;
          const x = center + rNum * Math.cos(angleRad);
          const y = center + rNum * Math.sin(angleRad);
          const rotate = angleDeg + 90;
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
        {[...Array(60)].map((_, i) => {
          const angle = (i * 6 - 90) * (Math.PI / 180);
          const r1 = radius - 4;
          const r2 = i % 5 === 0 ? radius - 14 : radius - 8;
          const x1 = center + r1 * Math.cos(angle);
          const y1 = center + r1 * Math.sin(angle);
          const x2 = center + r2 * Math.cos(angle);
          const y2 = center + r2 * Math.sin(angle);
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
