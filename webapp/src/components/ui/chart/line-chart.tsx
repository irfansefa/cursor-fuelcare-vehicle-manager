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
  color: string;
}

export interface LineChartProps {
  data: Array<Record<string, any>>;
  xAxisLabel?: string;
  yAxisLabel?: string;
  height?: number;
  className?: string;
  formatYAxis?: (value: number) => string;
  formatTooltip?: (value: number) => string;
  lines?: LineConfig[];
}

export const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  ({ 
    data, 
    xAxisLabel, 
    yAxisLabel, 
    height = 300, 
    className, 
    formatYAxis, 
    formatTooltip,
    lines = [{ dataKey: 'y', name: 'Value', color: 'var(--primary)' }],
  }, ref) => {
    return (
      <div ref={ref} className={cn('w-full', className)}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsLineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              label={xAxisLabel ? { value: xAxisLabel, position: 'bottom', offset: -5 } : undefined}
            />
            <YAxis
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
              tickFormatter={formatYAxis}
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                formatTooltip ? formatTooltip(value) : value,
                name
              ]}
              labelFormatter={(label) => `${label}`}
            />
            <Legend />
            {lines.map((line, index) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.color}
                strokeWidth={2}
                dot={{ fill: line.color }}
                activeDot={{ r: 6, fill: line.color }}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    );
  }
);

LineChart.displayName = 'LineChart'; 