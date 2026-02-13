import { DollarSign, Calendar, TrendingUp, Scale } from "lucide-react";
import type { SmallMetric } from "@/types/financial";

const iconMap = {
  dollarSign: DollarSign,
  calendar: Calendar,
  trendingUp: TrendingUp,
  scale: Scale,
} as const;

interface SmallMetricCardsProps {
  data: SmallMetric[];
}

export function SmallMetricCards({ data }: SmallMetricCardsProps) {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((m, i) => {
        const Icon = iconMap[m.iconName];
        return (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-[9px] font-bold text-slate-400 uppercase">
                {m.label}
              </p>
              <div className="text-slate-300">
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-lg font-black">
              {m.value}{" "}
              <span className="text-[10px] text-slate-400 font-medium">
                {m.unit}
              </span>
            </div>
            <div className="mt-3 w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${m.progressColor}`}
                style={{ width: `${m.progress}%` }}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
