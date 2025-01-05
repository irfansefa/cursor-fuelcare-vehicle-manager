'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowLeft } from "react-icons/fi"

import { LineChart } from "@/components/ui/chart/line-chart"
import { BarChart } from "@/components/ui/chart/bar-chart"
import { PieChart } from "@/components/ui/chart/pie-chart"

const lineChartData = [
  { name: 'Jan', value1: 400, value2: 240 },
  { name: 'Feb', value1: 300, value2: 139 },
  { name: 'Mar', value1: 200, value2: 980 },
  { name: 'Apr', value1: 278, value2: 390 },
  { name: 'May', value1: 189, value2: 480 },
  { name: 'Jun', value1: 239, value2: 380 },
]

const barChartData = [
  { name: 'Q1', value1: 4000, value2: 2400 },
  { name: 'Q2', value1: 3000, value2: 1398 },
  { name: 'Q3', value1: 2000, value2: 9800 },
  { name: 'Q4', value1: 2780, value2: 3908 },
]

const pieChartData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
]

export default function ChartsShowcase() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <Link href="/showcase" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Showcase
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Chart Components</h1>

      {/* Line Chart Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Line Chart</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Line Chart</h3>
            <LineChart
              data={lineChartData}
              xAxisDataKey="name"
              lines={[
                { dataKey: "value1", stroke: "#8884d8", name: "Series 1" },
                { dataKey: "value2", stroke: "#82ca9d", name: "Series 2" },
              ]}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Line Chart without Grid</h3>
            <LineChart
              data={lineChartData}
              xAxisDataKey="name"
              lines={[
                { dataKey: "value1", stroke: "#8884d8", name: "Series 1" },
                { dataKey: "value2", stroke: "#82ca9d", name: "Series 2" },
              ]}
              showGrid={false}
            />
          </div>
        </div>
      </section>

      {/* Bar Chart Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Bar Chart</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Bar Chart</h3>
            <BarChart
              data={barChartData}
              xAxisDataKey="name"
              bars={[
                { dataKey: "value1", fill: "#8884d8", name: "Series 1" },
                { dataKey: "value2", fill: "#82ca9d", name: "Series 2" },
              ]}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Stacked Bar Chart</h3>
            <BarChart
              data={barChartData}
              xAxisDataKey="name"
              bars={[
                { dataKey: "value1", fill: "#8884d8", name: "Series 1" },
                { dataKey: "value2", fill: "#82ca9d", name: "Series 2" },
              ]}
              stackBars
            />
          </div>
        </div>
      </section>

      {/* Pie Chart Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Pie Chart</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Pie Chart</h3>
            <PieChart data={pieChartData} />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Donut Chart</h3>
            <PieChart
              data={pieChartData}
              innerRadius="60%"
              outerRadius="80%"
            />
          </div>
        </div>
      </section>

      {/* Code Example */}
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
        <pre className="text-sm">
          {`// Line Chart Example
<LineChart
  data={data}
  xAxisDataKey="name"
  lines={[
    { dataKey: "value1", stroke: "#8884d8", name: "Series 1" },
    { dataKey: "value2", stroke: "#82ca9d", name: "Series 2" },
  ]}
/>

// Bar Chart Example
<BarChart
  data={data}
  xAxisDataKey="name"
  bars={[
    { dataKey: "value1", fill: "#8884d8", name: "Series 1" },
    { dataKey: "value2", fill: "#82ca9d", name: "Series 2" },
  ]}
  stackBars
/>

// Pie Chart Example
<PieChart
  data={[
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
  ]}
  innerRadius="60%"
  outerRadius="80%"
/>`}
        </pre>
      </div>
    </div>
  )
} 