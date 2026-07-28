"use client";

import { useId } from "react";

function buildLinePath(values: number[], width: number, height: number, padding: number) {
  if (values.length === 0) return { line: "", area: "", points: [] as Array<readonly [number, number]> };
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = (width - padding * 2) / (Math.max(values.length - 1, 1));

  const points = values.map((value, index) => {
    const x = padding + index * stepX;
    const y = padding + (1 - (value - min) / range) * (height - padding * 2);
    return [x, y] as const;
  });

  const line = points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${points[points.length - 1][0].toFixed(1)},${height - padding} L${points[0][0].toFixed(1)},${height - padding} Z`;

  return { line, area, points };
}

export function Sparkline({
  data,
  color = "var(--coral)",
  width = 88,
  height = 32,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}) {
  const gradientId = useId();
  const { line, area } = buildLinePath(data, width, height, 2);

  return (
    <svg className="sparkline" viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} stroke="none" />
      <path d={line} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrendChart({
  labels,
  series,
  height = 200,
}: {
  labels: string[];
  series: Array<{ key: string; label: string; color: string; values: number[] }>;
  height?: number;
}) {
  const width = 480;
  const padding = 26;
  const allValues = series.flatMap((item) => item.values);
  const max = Math.max(...allValues, 1);
  const min = Math.min(0, ...allValues);
  const range = max - min || 1;
  const stepX = (width - padding * 2) / Math.max(labels.length - 1, 1);

  const toPoints = (values: number[]) =>
    values.map((value, index) => {
      const x = padding + index * stepX;
      const y = padding + (1 - (value - min) / range) * (height - padding * 2);
      return [x, y] as const;
    });

  const gridFractions = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="trend-chart">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label="Performance trend chart">
        {gridFractions.map((fraction) => {
          const y = padding + fraction * (height - padding * 2);
          return (
            <line
              key={fraction}
              x1={padding}
              x2={width - padding}
              y1={y}
              y2={y}
              className="trend-grid-line"
            />
          );
        })}
        {series.map((item) => {
          const points = toPoints(item.values);
          const line = points
            .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
            .join(" ");
          return (
            <g key={item.key}>
              <path d={line} fill="none" stroke={item.color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              {points.map(([x, y], index) => (
                <circle key={index} cx={x} cy={y} r="3" fill={item.color} stroke="white" strokeWidth="1.4" />
              ))}
            </g>
          );
        })}
        {labels.map((label, index) => {
          const x = padding + index * stepX;
          return (
            <text key={label} x={x} y={height - 6} className="trend-axis-label" textAnchor="middle">
              {label}
            </text>
          );
        })}
      </svg>
      <div className="chart-legend">
        {series.map((item) => (
          <span key={item.key}>
            <i style={{ background: item.color }} /> {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function BarChart({
  data,
  height = 160,
}: {
  data: Array<{ label: string; value: number; color: string }>;
  height?: number;
}) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="bar-chart" style={{ height }}>
      {data.map((item) => (
        <div className="bar-chart-col" key={item.label}>
          <span className="bar-chart-value">{item.value}</span>
          <div className="bar-chart-track">
            <span
              className="bar-chart-fill"
              style={{ height: `${Math.max(6, (item.value / max) * 100)}%`, background: item.color }}
            />
          </div>
          <small>{item.label}</small>
        </div>
      ))}
    </div>
  );
}
