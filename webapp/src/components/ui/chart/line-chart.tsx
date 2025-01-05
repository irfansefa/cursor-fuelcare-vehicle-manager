import * as React from "react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"

interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  lines: {
    dataKey: string
    stroke?: string
    name?: string
  }[]
  xAxisDataKey: string
  height?: number | string
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  ({
    className,
    data,
    lines,
    xAxisDataKey,
    height = 400,
    showGrid = true,
    showLegend = true,
    showTooltip = true,
    ...props
  }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxisDataKey} />
            <YAxis />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {lines.map((line, index) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
                name={line.name || line.dataKey}
                activeDot={{ r: 8 }}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
LineChart.displayName = "LineChart"

export { LineChart } 