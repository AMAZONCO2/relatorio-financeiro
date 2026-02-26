"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import type { CashFlowDataPoint } from "@/types/financial";
import { createSparseLabelContent } from "@/components/charts/SparseLabelList";

const DENSE_THRESHOLD = 12;

interface CashFlowChartProps {
  data: CashFlowDataPoint[];
}

export function CashFlowChart({ data }: CashFlowChartProps) {
  const isDense = data.length > DENSE_THRESHOLD;
  const sparseContent = createSparseLabelContent(data.length);
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          Projeção de Fluxo de Caixa (Líquido vs Acumulado)
        </h3>
        <div className="flex gap-3">
          <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase">
            <div className="w-2 h-2 rounded-full bg-emerald-500" /> Líquido
          </span>
          <span className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase">
            <div className="w-2 h-2 rounded-full bg-slate-800" /> Acumulado
          </span>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart
            data={data}
            margin={{
              top: isDense ? 40 : 28,
              right: isDense ? 50 : 10,
              left: 0,
              bottom: 0,
            }}
          >
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
              tickFormatter={(v: number) => `R$ ${v}M`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              tickFormatter={(v: number) => `R$ ${v}M`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="liquid"
              stroke="#10b981"
              strokeWidth={3}
              fill="rgba(16, 185, 129, 0.1)"
            >
              {!isDense && (
                <LabelList
                  dataKey="liquid"
                  position="top"
                  formatter={(v) => `R$ ${Number(v ?? 0)}M`}
                  style={{ fontSize: 9, fontWeight: 700, fill: "#64748b" }}
                />
              )}
            </Area>
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="accumulated"
              stroke="#1e293b"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="none"
            >
              <LabelList
                dataKey="accumulated"
                position="top"
                formatter={(v) => `R$ ${Number(v ?? 0)}M`}
                content={isDense ? (sparseContent as never) : undefined}
                style={
                  isDense
                    ? undefined
                    : { fontSize: 9, fontWeight: 700, fill: "#64748b" }
                }
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
