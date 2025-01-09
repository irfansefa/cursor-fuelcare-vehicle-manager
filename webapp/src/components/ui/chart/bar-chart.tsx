import * as React from "react"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"

interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  bars: {
    dataKey: string
    name?: string
    color?: string
  }[]
  xAxisDataKey: string
  height?: number | string
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  layout?: "horizontal" | "vertical"
  stackBars?: boolean
}

const formatValue = (value: number) => value.toFixed(2);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <p className="font-medium">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: {formatValue(entry.value)}
        </p>
      ))}
    </div>
  );
};

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  ({
    className,
    data,
    bars,
    xAxisDataKey,
    height = 400,
    showGrid = true,
    showLegend = true,
    showTooltip = true,
    layout = "horizontal",
    stackBars = false,
    ...props
  }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsBarChart
            data={data}
            layout={layout}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxisDataKey} />
            <YAxis tickFormatter={formatValue} />
            {showTooltip && <Tooltip content={<CustomTooltip />} cursor={false} />}
            {showLegend && <Legend />}
            {bars.map((bar, index) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                fill={bar.color}
                name={bar.name || bar.dataKey}
                stackId={stackBars ? "stack" : undefined}
                background={{ fill: "transparent" }}
                activeBar={{ stroke: "white", strokeWidth: 2 }}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
BarChart.displayName = "BarChart"

export { BarChart } 