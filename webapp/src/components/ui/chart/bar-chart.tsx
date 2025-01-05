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
    fill?: string
    name?: string
  }[]
  xAxisDataKey: string
  height?: number | string
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  layout?: "horizontal" | "vertical"
  stackBars?: boolean
}

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
            <YAxis />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {bars.map((bar, index) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                fill={bar.fill}
                name={bar.name || bar.dataKey}
                stackId={stackBars ? "stack" : undefined}
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