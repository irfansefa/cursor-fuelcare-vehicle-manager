import * as React from "react"
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"

interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: {
    name: string
    value: number
    color?: string
  }[]
  height?: number | string
  showLegend?: boolean
  showTooltip?: boolean
  innerRadius?: number | string
  outerRadius?: number | string
  colors?: string[]
}

const defaultColors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF6B6B",
]

const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  ({
    className,
    data,
    height = 400,
    showLegend = true,
    showTooltip = true,
    innerRadius = 0,
    outerRadius = "80%",
    colors = defaultColors,
    ...props
  }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsPieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || colors[index % colors.length]}
                />
              ))}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
PieChart.displayName = "PieChart"

export { PieChart } 