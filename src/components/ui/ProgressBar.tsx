import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
}

export function ProgressBar({ value, max }: ProgressBarProps) {
  const pct = Math.round((value / max) * 100);
  const color =
    pct >= 100 ? '#e63946' :
    pct >= 80  ? '#ff9f1c' : '#2ec4b6';

  return (
    <div className="progress-wrap">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
        {value}/{max}
      </span>
    </div>
  );
}
