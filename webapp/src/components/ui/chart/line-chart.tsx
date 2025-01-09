'use client';

import * as React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { cn } from '@/lib/utils';

interface LineConfig {
  dataKey: string;
  name: string;
  stroke: string;
}

export interface LineChartProps {
  data: Array<Record<string, any>>;
  xAxisDataKey: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number;
  className?: string;
  formatYAxis?: (value: number) => string;
  formatTooltip?: (value: number) => string;
  lines?: LineConfig[];
  showGrid?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <p className="font-medium">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} className="text-sm" style={{ color: entry.stroke }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

const calculateYAxisDomain = (data: Array<Record<string, any>>, lines: LineConfig[]): [number, number] => {
  let minValue = Infinity;
  let maxValue = -Infinity;

  data.forEach(item => {
    lines.forEach(line => {
      const value = Number(item[line.dataKey]);
      if (!isNaN(value)) {
        minValue = Math.min(minValue, value);
        maxValue = Math.max(maxValue, value);
      }
    });
  });

  if (minValue === Infinity || maxValue === -Infinity) {
    return [0, 100]; // Default domain if no valid data
  }

  // Add padding (10% of the data range) to top and bottom
  const range = maxValue - minValue;
  const padding = range * 0.1;
  return [
    Math.max(0, minValue - padding), // Don't go below 0 if data is all positive
    maxValue + padding
  ];
};

const defaultYAxisFormatter = (value: number) => value.toFixed(2);

export const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  ({ 
    data, 
    xAxisDataKey,
    xAxisLabel, 
    yAxisLabel, 
    height = 300, 
    className, 
    formatYAxis = defaultYAxisFormatter, 
    formatTooltip,
    lines = [{ dataKey: 'y', name: 'Value', stroke: 'var(--primary)' }],
    showGrid = true,
  }, ref) => {
    const yAxisDomain = React.useMemo(() => calculateYAxisDomain(data, lines), [data, lines]);

    return (
      <div ref={ref} className={cn('w-full', className)}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsLineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis
              dataKey={xAxisDataKey}
              label={xAxisLabel ? { value: xAxisLabel, position: 'bottom', offset: -5 } : undefined}
            />
            <YAxis
              domain={yAxisDomain}
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
              tickFormatter={formatYAxis}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={false}
            />
            <Legend />
            {lines.map((line, index) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.stroke}
                strokeWidth={2}
                dot={{ fill: line.stroke }}
                activeDot={{ r: 6, fill: line.stroke }}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    );
  }
);

LineChart.displayName = 'LineChart'; 