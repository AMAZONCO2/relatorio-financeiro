"use client";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { WaterfallDataPoint } from "@/types/financial";

interface WaterfallChartProps {
  data: WaterfallDataPoint[];
}

export function WaterfallChart({ data }: WaterfallChartProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">
        Decomposição DRE (Cascata)
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart data={data} barSize={40}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 8, fill: "#94a3b8", fontWeight: 700 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "#94a3b8" }}
            />
            <Tooltip cursor={{ fill: "transparent" }} />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
