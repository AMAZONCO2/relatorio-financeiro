"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ParetoDataPoint } from "@/types/financial";

interface ParetoChartProps {
  data: ParetoDataPoint[];
}

export function ParetoChart({ data }: ParetoChartProps) {
  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Direcionadores de Custo (Análise Pareto ABC)
          </h3>
          <p className="text-[9px] text-slate-400 font-medium mt-1 uppercase">
            Impacto de impostos e custos operacionais sobre a Receita Bruta
          </p>
        </div>
        <button className="text-[10px] font-black text-blue-500 hover:underline uppercase tracking-tighter">
          Baixar CSV
        </button>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "#94a3b8", fontWeight: 700 }}
            />
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              tickFormatter={(v: number) => `R$ ${v}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              tickFormatter={(v: number) => `${v}%`}
            />
            <Tooltip />
            <Bar
              yAxisId="left"
              dataKey="cost"
              fill="#1e293b"
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cumulative"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ r: 4, fill: "#f59e0b" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
