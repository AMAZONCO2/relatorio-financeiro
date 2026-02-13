import { Database, Percent, BarChart3, Clock, DollarSign } from "lucide-react";
import type { KpiItem } from "@/types/financial";

const iconMap = {
  database: Database,
  percent: Percent,
  barChart3: BarChart3,
  clock: Clock,
  dollarSign: DollarSign,
} as const;

interface KpiCardsProps {
  data: KpiItem[];
}

export function KpiCards({ data }: KpiCardsProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((kpi, i) => {
        const Icon = iconMap[kpi.iconName];
        return (
          <div
            key={i}
            className={`bg-white dark:bg-slate-900 p-5 rounded-xl border-l-4 ${kpi.borderColor} shadow-sm flex items-center justify-between`}
          >
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                {kpi.label}
              </p>
              <h3 className="text-2xl font-black">{kpi.value}</h3>
              <p className={`text-[10px] font-bold mt-1 ${kpi.textColor}`}>
                {kpi.sub}
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-full">
              <Icon className={`w-5 h-5 ${kpi.iconColor}`} />
            </div>
          </div>
        );
      })}
    </section>
  );
}
