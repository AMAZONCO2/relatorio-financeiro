import {
  TrendingUp,
  TrendingDown,
  ArrowRightLeft,
  BarChart3,
  AlertTriangle,
  Zap,
  Target,
  Layers,
} from "lucide-react";
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

function fmtPct(val: number): string {
  const sign = val > 0 ? "+" : "";
  return `${sign}${val.toFixed(1)}%`;
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
  const variacaoTotal = ((totalAno2 - totalAno1) / totalAno1) * 100;

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

  // Categorias que aparecem no ano 2 (eram zero no ano 1)
  const newInAno2 = comparisons.filter((c) => c.ano1 === 0 && c.ano2 > 0);

  // Categorias que desaparecem no ano 2 (estavam ativas no ano 1)
  const goneInAno2 = comparisons.filter((c) => c.ano1 > 0 && c.ano2 === 0);

  // Maiores crescimentos (excluindo novas)
  const topGrowth = comparisons
    .filter((c) => c.ano1 > 0 && c.ano2 > 0 && c.diff > 0)
    .sort((a, b) => b.diff - a.diff);

  // Maiores reduções
  const topReductions = comparisons
    .filter((c) => c.ano1 > 0 && c.ano2 > 0 && c.diff < 0)
    .sort((a, b) => a.diff - b.diff);

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

  return {
    totalAno1,
    totalAno2,
    variacaoTotal,
    avgAno1,
    avgAno2,
    newInAno2,
    goneInAno2,
    topGrowth,
    topReductions,
    topByValueAno2,
    monthsAno1,
    monthsAno2,
    peakAno1,
    peakAno2,
    lowAno1,
    lowAno2,
    countFor80,
    totalCategoriesAno2: sortedCatAno2.length,
    comparisons,
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
/*  Componente de barras mensais comparativas                          */
/* ------------------------------------------------------------------ */

function MonthlyComparisonBars({
  monthsAno1,
  monthsAno2,
}: {
  monthsAno1: MonthTotal[];
  monthsAno2: MonthTotal[];
}) {
  const globalMax = Math.max(
    ...monthsAno1.map((m) => m.value),
    ...monthsAno2.map((m) => m.value)
  );

  return (
    <div className="grid grid-cols-12 gap-1 items-end h-24">
      {monthsAno1.map((m1, i) => {
        const m2 = monthsAno2[i];
        const h1 = globalMax > 0 ? (m1.value / globalMax) * 100 : 0;
        const h2 = globalMax > 0 ? ((m2?.value ?? 0) / globalMax) * 100 : 0;
        return (
          <div key={i} className="flex flex-col items-center gap-0.5">
            <div className="flex gap-[2px] items-end h-[72px]">
              <div
                className="w-2 bg-emerald-400/70 rounded-t"
                style={{ height: `${h1}%` }}
                title={`Ano 1 - ${m1.label}: ${fmtBRL(m1.value)}`}
              />
              <div
                className="w-2 bg-blue-400/70 rounded-t"
                style={{ height: `${h2}%` }}
                title={`Ano 2 - ${m2?.label ?? ""}: ${fmtBRL(m2?.value ?? 0)}`}
              />
            </div>
            <span className="text-[7px] text-slate-400 font-bold">
              {m1.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Componente principal                                               */
/* ------------------------------------------------------------------ */

export function BudgetAnalysis() {
  const ins = computeInsights();

  return (
    <section className="space-y-4">
      {/* Título da seção */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4 text-violet-500" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Análise Comparativa · Ano 1 vs Ano 2
          </h3>
        </div>

        <div className="p-4 space-y-5">
          {/* KPI Cards de resumo */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              icon={BarChart3}
              label="Total Ano 1"
              value={fmtBRL(ins.totalAno1)}
              sub={`Média mensal: ${fmtBRL(ins.avgAno1)}`}
              accent="text-emerald-400"
            />
            <StatCard
              icon={BarChart3}
              label="Total Ano 2"
              value={fmtBRL(ins.totalAno2)}
              sub={`Média mensal: ${fmtBRL(ins.avgAno2)}`}
              accent="text-blue-400"
            />
            <StatCard
              icon={ins.variacaoTotal > 0 ? TrendingUp : TrendingDown}
              label="Variação YoY"
              value={fmtPct(ins.variacaoTotal)}
              sub={`${
                ins.variacaoTotal > 0 ? "Aumento" : "Redução"
              } de ${fmtBRL(Math.abs(ins.totalAno2 - ins.totalAno1))}`}
              accent={
                ins.variacaoTotal > 0 ? "text-amber-500" : "text-emerald-500"
              }
            />
            <StatCard
              icon={Target}
              label="Concentração (80%)"
              value={`${ins.countFor80} de ${ins.totalCategoriesAno2}`}
              sub="Categorias representam 80% do gasto no Ano 2"
              accent="text-violet-400"
            />
          </div>

          {/* Comparação mensal visual */}
          <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                Distribuição Mensal Comparativa
              </p>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[8px] font-bold text-slate-400">
                  <span className="w-2 h-2 rounded-sm bg-emerald-400/70 inline-block" />
                  Ano 1
                </span>
                <span className="flex items-center gap-1 text-[8px] font-bold text-slate-400">
                  <span className="w-2 h-2 rounded-sm bg-blue-400/70 inline-block" />
                  Ano 2
                </span>
              </div>
            </div>
            <MonthlyComparisonBars
              monthsAno1={ins.monthsAno1}
              monthsAno2={ins.monthsAno2}
            />
          </div>

          {/* Grid de insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Pico e Vale */}
            <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-lg p-4 space-y-3">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Picos e Vales Mensais
              </p>
              <div className="space-y-2 text-[10px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Pico Ano 1</span>
                  <span className="font-bold text-emerald-600">
                    {ins.peakAno1.label} · {fmtBRL(ins.peakAno1.value)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Pico Ano 2</span>
                  <span className="font-bold text-blue-600">
                    {ins.peakAno2.label} · {fmtBRL(ins.peakAno2.value)}
                  </span>
                </div>
                <hr className="border-slate-200 dark:border-slate-700" />
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Vale Ano 1</span>
                  <span className="font-bold text-emerald-600">
                    {ins.lowAno1.label} · {fmtBRL(ins.lowAno1.value)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Vale Ano 2</span>
                  <span className="font-bold text-blue-600">
                    {ins.lowAno2.label} · {fmtBRL(ins.lowAno2.value)}
                  </span>
                </div>
              </div>
            </div>

            {/* Categorias novas e encerradas */}
            <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-lg p-4 space-y-3">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-violet-500" />
                Movimentação de Categorias
              </p>
              <div className="space-y-2 text-[10px]">
                {ins.newInAno2.length > 0 && (
                  <div>
                    <span className="text-[8px] font-bold text-blue-500 uppercase">
                      Novas no Ano 2
                    </span>
                    {ins.newInAno2.map((c, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center mt-1"
                      >
                        <span className="text-slate-500 truncate mr-2">
                          {c.category}
                        </span>
                        <span className="font-bold text-blue-600 whitespace-nowrap">
                          {fmtBRL(c.ano2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {ins.goneInAno2.length > 0 && (
                  <div className={ins.newInAno2.length > 0 ? "mt-2" : ""}>
                    <span className="text-[8px] font-bold text-red-400 uppercase">
                      Encerradas no Ano 2
                    </span>
                    {ins.goneInAno2.map((c, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center mt-1"
                      >
                        <span className="text-slate-500 truncate mr-2">
                          {c.category}
                        </span>
                        <span className="font-bold text-slate-400 line-through whitespace-nowrap">
                          {fmtBRL(c.ano1)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {ins.newInAno2.length === 0 && ins.goneInAno2.length === 0 && (
                  <p className="text-slate-400 italic">
                    Todas as categorias permanecem ativas
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Top 5 categorias Ano 2 + variação */}
          <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-lg p-4 space-y-3">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
              Top 5 Categorias no Ano 2 (por valor)
            </p>
            <div className="space-y-2.5">
              {ins.topByValueAno2.map((c, i) => {
                const maxVal = ins.topByValueAno2[0].ano2;
                const hasAno1 = c.ano1 > 0;
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-600 dark:text-slate-300 font-medium truncate mr-2">
                        {i + 1}. {c.category}
                      </span>
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <span className="font-bold">{fmtBRL(c.ano2)}</span>
                        {hasAno1 ? (
                          <span
                            className={`text-[9px] font-bold ${
                              c.diff > 0
                                ? "text-amber-500"
                                : c.diff < 0
                                ? "text-emerald-500"
                                : "text-slate-400"
                            }`}
                          >
                            {fmtPct(c.pctChange)}
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-blue-500">
                            NOVO
                          </span>
                        )}
                      </div>
                    </div>
                    <MiniBar
                      value={c.ano2}
                      max={maxVal}
                      color="bg-blue-500/60"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Insights-chave em texto */}
          <div className="bg-amber-50/60 dark:bg-amber-900/10 border border-amber-200/60 dark:border-amber-800/30 rounded-lg p-4 space-y-2">
            <p className="text-[9px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Insights-Chave
            </p>
            <ul className="space-y-1.5 text-[10px] text-slate-600 dark:text-slate-300 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>
                  O orçamento do <b>Ano 2</b> é{" "}
                  <b className="text-amber-600 dark:text-amber-400">
                    {fmtPct(ins.variacaoTotal)}
                  </b>{" "}
                  superior ao Ano 1, passando de {fmtBRL(ins.totalAno1)} para{" "}
                  {fmtBRL(ins.totalAno2)}.
                </span>
              </li>
              {ins.newInAno2.length > 0 && (
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <span>
                    <b>{ins.newInAno2.length} categoria(s)</b> entram em
                    execução apenas no Ano 2:{" "}
                    {ins.newInAno2.map((c) => c.category).join(", ")}.
                  </span>
                </li>
              )}
              {ins.goneInAno2.length > 0 && (
                <li className="flex gap-2">
                  <span className="text-amber-500 font-bold mt-0.5">•</span>
                  <span>
                    <b>{ins.goneInAno2.length} categoria(s)</b> do Ano 1 não
                    possuem execução no Ano 2:{" "}
                    {ins.goneInAno2.map((c) => c.category).join(", ")}.
                  </span>
                </li>
              )}
              <li className="flex gap-2">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>
                  O pico de gastos no Ano 2 ocorre em{" "}
                  <b>{ins.peakAno2.label}</b> ({fmtBRL(ins.peakAno2.value)}),{" "}
                  {ins.peakAno2.value > ins.peakAno1.value
                    ? `${fmtPct(
                        ((ins.peakAno2.value - ins.peakAno1.value) /
                          ins.peakAno1.value) *
                          100
                      )} acima`
                    : `${fmtPct(
                        ((ins.peakAno1.value - ins.peakAno2.value) /
                          ins.peakAno1.value) *
                          100
                      )} abaixo`}{" "}
                  do pico do Ano 1 ({ins.peakAno1.label}).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>
                  A média mensal sobe de {fmtBRL(ins.avgAno1)} para{" "}
                  {fmtBRL(ins.avgAno2)}, indicando uma{" "}
                  <b>intensificação das atividades</b> no segundo ano do
                  projeto.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-500 font-bold mt-0.5">•</span>
                <span>
                  No Ano 2, apenas{" "}
                  <b>
                    {ins.countFor80} de {ins.totalCategoriesAno2} categorias
                  </b>{" "}
                  concentram 80% dos gastos — atenção redobrada ao
                  acompanhamento dessas rubricas.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
