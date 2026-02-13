"use client";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { RadarDataPoint } from "@/types/financial";

interface RadarChartSectionProps {
  data: RadarDataPoint[];
}

export function RadarChartSection({ data }: RadarChartSectionProps) {
  const comparativeData = data.map((item) => ({
    subject: item.subject,
    comunidade: item.A,
    desenvolvedor: item.B,
  }));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">
        Dimensões de Performance
      </h3>
      <div className="flex flex-col gap-6">
        <ResponsiveContainer width="100%" height={220}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontSize: 9, fontWeight: 700, fill: "#94a3b8" }}
            />
            <Radar
              name="Comunidade"
              dataKey="A"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.6}
            />
            <Radar
              name="Desenvolvedor"
              dataKey="B"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: 10, fontWeight: 700 }}
            />
          </RadarChart>
        </ResponsiveContainer>

        <div>
          <h4 className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-3">
            Comparativo por Dimensão
          </h4>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart
              data={comparativeData}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="subject"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#94a3b8", fontWeight: 700 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: "#94a3b8" }}
              />
              <Tooltip />
              <Bar
                dataKey="comunidade"
                name="Comunidade"
                fill="#10b981"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="desenvolvedor"
                name="Desenvolvedor"
                fill="#3b82f6"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
