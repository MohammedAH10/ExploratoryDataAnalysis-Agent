
import React from 'react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, showText = false }) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Central Data Point */}
        <circle cx="60" cy="60" r="8" fill="url(#logoGradient)" filter="url(#glow)" />

        {/* Data Points scattered for exploration theme */}
        <g opacity="0.9">
          {[
            { cx: 30, cy: 35, r: 3 },
            { cx: 45, cy: 25, r: 2.5 },
            { cx: 75, cy: 30, r: 3.5 },
            { cx: 90, cy: 40, r: 2.8 },
            { cx: 25, cy: 65, r: 2.5 },
            { cx: 85, cy: 75, r: 3.2 },
            { cx: 40, cy: 85, r: 2.7 },
            { cx: 70, cy: 90, r: 3 },
          ].map((point, i) => (
            <circle
              key={i}
              cx={point.cx}
              cy={point.cy}
              r={point.r}
              fill="url(#logoGradient)"
              opacity="0.7"
            />
          ))}
        </g>

        {/* Connection Lines (representing data relationships) */}
        <g stroke="url(#logoGradient)" strokeWidth="1.5" opacity="0.4">
          <line x1="60" y1="60" x2="30" y2="35" />
          <line x1="60" y1="60" x2="75" y2="30" />
          <line x1="60" y1="60" x2="90" y2="40" />
          <line x1="60" y1="60" x2="25" y2="65" />
          <line x1="60" y1="60" x2="85" y2="75" />
          <line x1="60" y1="60" x2="40" y2="85" />
          <line x1="30" y1="35" x2="45" y2="25" />
          <line x1="75" y1="30" x2="90" y2="40" />
          <line x1="85" y1="75" x2="70" y2="90" />
        </g>

        {/* Circular scanning rings */}
        <circle
          cx="60"
          cy="60"
          r="25"
          stroke="url(#logoGradient)"
          strokeWidth="1"
          strokeDasharray="4 6"
          opacity="0.5"
        />
        <circle
          cx="60"
          cy="60"
          r="40"
          stroke="url(#logoGradient)"
          strokeWidth="0.8"
          strokeDasharray="8 4"
          opacity="0.3"
        />

        {/* Outer Frame */}
        <rect
          x="10"
          y="10"
          width="100"
          height="100"
          stroke="url(#logoGradient)"
          strokeWidth="1.5"
          rx="8"
          opacity="0.25"
        />

        {/* Corner accents */}
        {[
          { x: 10, y: 10 },
          { x: 102, y: 10 },
          { x: 10, y: 102 },
          { x: 102, y: 102 },
        ].map((corner, i) => (
          <g key={i}>
            <line
              x1={corner.x}
              y1={corner.y}
              x2={corner.x + (i % 2 === 0 ? 8 : -8)}
              y2={corner.y}
              stroke="url(#logoGradient)"
              strokeWidth="2"
              opacity="0.6"
            />
            <line
              x1={corner.x}
              y1={corner.y}
              x2={corner.x}
              y2={corner.y + (i < 2 ? 8 : -8)}
              stroke="url(#logoGradient)"
              strokeWidth="2"
              opacity="0.6"
            />
          </g>
        ))}
      </svg>
      {showText && (
        <span className="mt-2 text-white font-extrabold tracking-widest text-[10px] sm:text-xs uppercase">
          EDA AGENT
        </span>
      )}
    </div>
  );
};


