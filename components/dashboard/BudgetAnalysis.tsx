import { BarChart3, AlertTriangle, Zap, Target, FileText } from "lucide-react";
import { budgetData } from "@/data/budget-data";
import type { BudgetYearData } from "@/types/financial";

/* ------------------------------------------------------------------ */
/*  Helpers de formatação                                              */
/* ------------------------------------------------------------------ */

function fmtBRL(val: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
}

function shortMonth(full: string): string {
  return full
    .replace(/\. de \d{4}$/, "")
    .replace(".", "")
    .trim()
    .slice(0, 3)
    .toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  Motor de cálculo de insights                                       */
/* ------------------------------------------------------------------ */

interface CategoryComparison {
  category: string;
  ano1: number;
  ano2: number;
  diff: number;
  pctChange: number;
}

interface MonthTotal {
  label: string;
  value: number;
}

function sumYear(data: BudgetYearData): number {
  const totalRow = data.rows.find((r) => r.isTotal);
  if (totalRow) return totalRow.monthlyValues.reduce((a, b) => a + b, 0);
  return data.rows
    .filter((r) => !r.isTotal && !r.isSubTotal)
    .reduce((sum, r) => sum + r.monthlyValues.reduce((a, b) => a + b, 0), 0);
}

function categoryTotals(data: BudgetYearData): Map<string, number> {
  const map = new Map<string, number>();
  for (const row of data.rows) {
    if (row.isTotal || row.isSubTotal) continue;
    map.set(
      row.category,
      row.monthlyValues.reduce((a, b) => a + b, 0)
    );
  }
  return map;
}

function monthlyTotals(data: BudgetYearData): MonthTotal[] {
  const totalRow = data.rows.find((r) => r.isTotal);
  if (!totalRow) return [];
  return data.months.map((m, i) => ({
    label: shortMonth(m),
    value: totalRow.monthlyValues[i],
  }));
}

function computeInsights() {
  const ano1 = budgetData.ano1;
  const ano2 = budgetData.ano2;

  const totalAno1 = sumYear(ano1);
  const totalAno2 = sumYear(ano2);

  // Comparação por categoria
  const catAno1 = categoryTotals(ano1);
  const catAno2 = categoryTotals(ano2);
  const allCategories = new Set([...catAno1.keys(), ...catAno2.keys()]);

  const comparisons: CategoryComparison[] = [];
  for (const cat of allCategories) {
    const v1 = catAno1.get(cat) ?? 0;
    const v2 = catAno2.get(cat) ?? 0;
    const diff = v2 - v1;
    const pctChange = v1 > 0 ? ((v2 - v1) / v1) * 100 : v2 > 0 ? 100 : 0;
    comparisons.push({ category: cat, ano1: v1, ano2: v2, diff, pctChange });
  }

  // Top 5 categorias por valor no ano 2
  const topByValueAno2 = comparisons
    .filter((c) => c.ano2 > 0)
    .sort((a, b) => b.ano2 - a.ano2)
    .slice(0, 5);

  // Meses
  const monthsAno1 = monthlyTotals(ano1);
  const monthsAno2 = monthlyTotals(ano2);

  const peakAno1 = monthsAno1.reduce((max, m) =>
    m.value > max.value ? m : max
  );
  const peakAno2 = monthsAno2.reduce((max, m) =>
    m.value > max.value ? m : max
  );
  const lowAno1 = monthsAno1.reduce((min, m) =>
    m.value < min.value ? m : min
  );
  const lowAno2 = monthsAno2.reduce((min, m) =>
    m.value < min.value ? m : min
  );

  // Média mensal
  const avgAno1 = totalAno1 / 12;
  const avgAno2 = totalAno2 / 12;

  // Concentração: quantas categorias representam 80% do gasto no ano 2
  const sortedCatAno2 = [...comparisons]
    .filter((c) => c.ano2 > 0)
    .sort((a, b) => b.ano2 - a.ano2);
  let acum = 0;
  let countFor80 = 0;
  for (const c of sortedCatAno2) {
    acum += c.ano2;
    countFor80++;
    if (acum >= totalAno2 * 0.8) break;
  }

  // Top 5 categorias por valor no ano 1
  const topByValueAno1 = comparisons
    .filter((c) => c.ano1 > 0)
    .sort((a, b) => b.ano1 - a.ano1)
    .slice(0, 5);

  // Concentração 80% no ano 1
  const sortedCatAno1 = [...comparisons]
    .filter((c) => c.ano1 > 0)
    .sort((a, b) => b.ano1 - a.ano1);
  let acumAno1 = 0;
  let countFor80Ano1 = 0;
  for (const c of sortedCatAno1) {
    acumAno1 += c.ano1;
    countFor80Ano1++;
    if (acumAno1 >= totalAno1 * 0.8) break;
  }

  return {
    totalAno1,
    totalAno2,
    avgAno1,
    avgAno2,
    topByValueAno1,
    topByValueAno2,
    monthsAno1,
    monthsAno2,
    peakAno1,
    peakAno2,
    lowAno1,
    lowAno2,
    countFor80Ano1,
    countFor80Ano2: countFor80,
    totalCategoriesAno1: sortedCatAno1.length,
    totalCategoriesAno2: sortedCatAno2.length,
    yearLabelAno1: ano1.yearLabel ?? "Ano 1",
    yearLabelAno2: ano2.yearLabel ?? "Ano 2",
  };
}

/* ------------------------------------------------------------------ */
/*  Sub-componentes visuais                                            */
/* ------------------------------------------------------------------ */

function MiniBar({
  value,
  max,
  color,
}: {
  value: number;
  max: number;
  color: string;
}) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  sub: string;
  accent: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex justify-between items-start mb-2">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </p>
        <div className={accent}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-lg font-black leading-tight">{value}</p>
      <p className="text-[10px] text-slate-400 mt-1">{sub}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Barras mensais descritivas (uma série por ano)                     */
/* ------------------------------------------------------------------ */

function MonthlyBars({
  months,
  color,
  yearLabel,
}: {
  months: MonthTotal[];
  color: string;
  yearLabel: string;
}) {
  const maxVal = Math.max(...months.map((m) => m.value), 1);

  return (
    <div className="space-y-2">
      <p className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">
        {yearLabel}
      </p>
      <div className="grid grid-cols-12 gap-1 items-end h-20">
        {months.map((m, i) => {
          const h = maxVal > 0 ? (m.value / maxVal) * 100 : 0;
          return (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <div
                className={`w-3 ${color} rounded-t min-h-[4px]`}
                style={{ height: `${Math.max(h, 2)}%` }}
                title={`${m.label}: ${fmtBRL(m.value)}`}
              />
              <span className="text-[7px] text-slate-400 font-bold">
                {m.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Componente principal                                               */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Bloco descritivo de um ano                                        */
/* ------------------------------------------------------------------ */

function YearDescriptiveBlock({
  yearLabel,
  total,
  avg,
  peak,
  low,
  topCategories,
  countFor80,
  totalCategories,
  months,
  barColor,
  accentColor,
  valueKey,
}: {
  yearLabel: string;
  total: number;
  avg: number;
  peak: MonthTotal;
  low: MonthTotal;
  topCategories: CategoryComparison[];
  countFor80: number;
  totalCategories: number;
  months: MonthTotal[];
  barColor: string;
  accentColor: string;
  valueKey: "ano1" | "ano2";
}) {
  const maxVal = topCategories[0] ? topCategories[0][valueKey] : 1;
  const getVal = (c: CategoryComparison) => c[valueKey];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
        <div className={`w-1 h-6 rounded ${barColor}`} />
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
          {yearLabel}
        </h4>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={BarChart3}
          label="Total"
          value={fmtBRL(total)}
          sub={`Média mensal: ${fmtBRL(avg)}`}
          accent={accentColor}
        />
        <StatCard
          icon={Target}
          label="Concentração (80%)"
          value={`${countFor80} de ${totalCategories}`}
          sub="Categorias representam 80% do gasto"
          accent="text-violet-400"
        />
      </div>

      <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-lg p-4 space-y-2">
        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          Pico e Vale Mensais
        </p>
        <div className="space-y-1.5 text-[10px]">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Pico</span>
            <span className="font-bold">
              {peak.label} · {fmtBRL(peak.value)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Vale</span>
            <span className="font-bold">
              {low.label} · {fmtBRL(low.value)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-lg p-4 space-y-3">
        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
          Top 5 Categorias (por valor)
        </p>
        <div className="space-y-2.5">
          {topCategories.map((c, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-600 dark:text-slate-300 font-medium truncate mr-2">
                  {i + 1}. {c.category}
                </span>
                <span className="font-bold whitespace-nowrap">
                  {fmtBRL(getVal(c))}
                </span>
              </div>
              <MiniBar value={getVal(c)} max={maxVal} color={barColor} />
            </div>
          ))}
        </div>
      </div>

      <MonthlyBars
        months={months}
        color={barColor}
        yearLabel="Distribuição mensal"
      />
    </div>
  );
}

export function BudgetAnalysis() {
  const ins = computeInsights();

  return (
    <section className="space-y-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-2">
          <FileText className="w-4 h-4 text-violet-500" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Relatório Descritivo · Ano 1 e Ano 2
          </h3>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <YearDescriptiveBlock
              yearLabel={ins.yearLabelAno1}
              total={ins.totalAno1}
              avg={ins.avgAno1}
              peak={ins.peakAno1}
              low={ins.lowAno1}
              topCategories={ins.topByValueAno1}
              countFor80={ins.countFor80Ano1}
              totalCategories={ins.totalCategoriesAno1}
              months={ins.monthsAno1}
              barColor="bg-emerald-400/70"
              accentColor="text-emerald-400"
              valueKey="ano1"
            />
            <YearDescriptiveBlock
              yearLabel={ins.yearLabelAno2}
              total={ins.totalAno2}
              avg={ins.avgAno2}
              peak={ins.peakAno2}
              low={ins.lowAno2}
              topCategories={ins.topByValueAno2}
              countFor80={ins.countFor80Ano2}
              totalCategories={ins.totalCategoriesAno2}
              months={ins.monthsAno2}
              barColor="bg-blue-400/70"
              accentColor="text-blue-400"
              valueKey="ano2"
            />
          </div>

          {/* Insights descritivos (não comparativos) */}
          <div className="mt-6 bg-amber-50/60 dark:bg-amber-900/10 border border-amber-200/60 dark:border-amber-800/30 rounded-lg p-4 space-y-2">
            <p className="text-[9px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Resumo Descritivo
            </p>
            <ul className="space-y-1.5 text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>
                  <b>{ins.yearLabelAno1}</b>: orçamento total de{" "}
                  {fmtBRL(ins.totalAno1)}, com média mensal de{" "}
                  {fmtBRL(ins.avgAno1)}. Pico em {ins.peakAno1.label} (
                  {fmtBRL(ins.peakAno1.value)}) e vale em {ins.lowAno1.label} (
                  {fmtBRL(ins.lowAno1.value)}).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>
                  <b>{ins.yearLabelAno2}</b>: orçamento total de{" "}
                  {fmtBRL(ins.totalAno2)}, com média mensal de{" "}
                  {fmtBRL(ins.avgAno2)}. Pico em {ins.peakAno2.label} (
                  {fmtBRL(ins.peakAno2.value)}) e vale em {ins.lowAno2.label} (
                  {fmtBRL(ins.lowAno2.value)}).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>
                  No Ano 1, {ins.countFor80Ano1} de {ins.totalCategoriesAno1}{" "}
                  categorias concentram 80% dos gastos.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>
                  No Ano 2, {ins.countFor80Ano2} de {ins.totalCategoriesAno2}{" "}
                  categorias concentram 80% dos gastos.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
