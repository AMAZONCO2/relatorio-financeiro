"use client";

import { BarChart as BarChartIcon } from "lucide-react";
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
import type { AnnualBarDataPoint } from "@/types/financial";

interface AnnualBarChartProps {
  data: AnnualBarDataPoint[];
}

export function AnnualBarChart({ data }: AnnualBarChartProps) {
  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <BarChartIcon className="w-4 h-4 text-emerald-500" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Fluxo de Caixa Total Anual do Projeto (Visão Detalhada)
          </h3>
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase">
            <div className="w-2 h-2 rounded bg-blue-500" /> Desenvolvedor
          </span>
          <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase">
            <div className="w-2 h-2 rounded bg-emerald-500" /> Comunidade
          </span>
          <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase">
            <div className="w-2 h-2 rounded bg-slate-900" /> Total
          </span>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "#94a3b8", fontWeight: 700 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              tickFormatter={(v: number) => `R$ ${v}M`}
            />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value, name) => {
                const labels: Record<string, string> = {
                  developer: "Desenvolvedor",
                  community: "Comunidade",
                  total: "Total",
                };
                const numericValue =
                  typeof value === "number" ? value : Number(value ?? 0);
                const safeName = String(name);
                return [
                  `R$ ${numericValue.toFixed(2)}M`,
                  labels[safeName] ?? safeName,
                ];
              }}
            />
            <Bar
              dataKey="developer"
              name="developer"
              fill="#3b82f6"
              radius={[3, 3, 0, 0]}
              barSize={8}
            />
            <Bar
              dataKey="community"
              name="community"
              fill="#10b981"
              radius={[3, 3, 0, 0]}
              barSize={8}
            />
            <Line
              type="monotone"
              dataKey="total"
              name="total"
              stroke="#0f172a"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
