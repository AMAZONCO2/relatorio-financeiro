import { DollarSign } from "lucide-react";
import { budgetData } from "@/data/budget-data";
import type { BudgetYearData } from "@/types/financial";

/** Formata valor monetário completo (BRL) */
function formatCurrency(val: number): string {
  if (val === 0) return "-";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
}

/** Formata valor completo USD */
function formatUSD(val: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(val);
}

/** Extrai abreviação de 3 letras do mês */
function shortMonth(full: string): string {
  return full
    .replace(/\. de \d{4}$/, "")
    .replace(".", "")
    .trim()
    .slice(0, 3);
}

/** Calcula intensidade de cor (0-1) baseado no valor relativo ao máximo da linha */
function getIntensity(val: number, maxVal: number): number {
  if (maxVal === 0 || val === 0) return 0;
  return Math.min(1, val / maxVal);
}

/** Cor de destaque por ano */
const yearAccent: Record<string, string> = {
  ano1: "text-emerald-600",
  ano2: "text-blue-600",
};

/** Seção de tabela para um único ano */
function BudgetYearSection({
  data,
  yearKey,
}: {
  data: BudgetYearData;
  yearKey: string;
}) {
  return (
    <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Header do ano */}
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-50/50 dark:bg-slate-800/50">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-500" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Detalhamento Orçamentário
          </h3>
          <span
            className={`text-[10px] font-black uppercase tracking-widest ${
              yearAccent[yearKey] ?? "text-slate-500"
            }`}
          >
            — {data.yearLabel}
          </span>
        </div>

        <span className="text-[9px] text-slate-400 font-bold">
          Total USD: {formatUSD(data.totalDolar)}
        </span>
      </div>

      {/* Tabela com scroll horizontal */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-[9px] border-collapse">
          <thead>
            <tr className="bg-slate-800 dark:bg-slate-950 text-white text-[8px] font-bold uppercase tracking-wider">
              <th className="px-3 py-2 text-left border-r border-slate-700 min-w-[140px]">
                Categoria
              </th>
              <th className="px-2 py-2 text-center border-r border-slate-700 bg-amber-600/80 min-w-[80px]">
                Gasto
              </th>
              <th className="px-2 py-2 text-center border-r border-slate-700 bg-blue-600/80 min-w-[80px]">
                Orçado
              </th>
              {data.months.map((month, idx) => (
                <th
                  key={idx}
                  className="px-2 py-2 text-center border-r border-slate-700 last:border-r-0 min-w-[80px]"
                >
                  {shortMonth(month)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => {
              const isTotalRow = row.isTotal;
              const isSubTotal = row.isSubTotal;
              const maxMonthly = Math.max(...row.monthlyValues);

              let rowBg =
                i % 2 === 0
                  ? "bg-white dark:bg-slate-900"
                  : "bg-slate-50/60 dark:bg-slate-800/30";
              let textColor = "text-slate-600 dark:text-slate-300";
              let categoryWeight = "font-medium";

              if (isTotalRow) {
                rowBg = "bg-emerald-600 dark:bg-emerald-700";
                textColor = "text-white";
                categoryWeight = "font-black";
              } else if (isSubTotal) {
                rowBg = "bg-emerald-500 dark:bg-emerald-600";
                textColor = "text-white";
                categoryWeight = "font-bold";
              }

              return (
                <tr
                  key={i}
                  className={`${rowBg} ${textColor} transition-colors`}
                >
                  <td
                    className={`px-3 py-2 text-left border-r border-slate-100 dark:border-slate-800 ${categoryWeight}`}
                  >
                    {row.category}
                  </td>

                  <td
                    className={`px-2 py-2 text-right font-bold border-r tabular-nums ${
                      isTotalRow || isSubTotal
                        ? "border-emerald-400"
                        : "border-slate-100 dark:border-slate-800"
                    }`}
                  >
                    {row.totalSpent === 0 ? (
                      <span
                        className={
                          isTotalRow || isSubTotal
                            ? "opacity-60"
                            : "text-slate-300 dark:text-slate-600"
                        }
                      >
                        -
                      </span>
                    ) : (
                      formatCurrency(row.totalSpent)
                    )}
                  </td>

                  <td
                    className={`px-2 py-2 text-right font-bold border-r tabular-nums ${
                      isTotalRow || isSubTotal
                        ? "border-emerald-400"
                        : "border-slate-100 dark:border-slate-800"
                    }`}
                  >
                    {row.totalBudgeted === 0 ? (
                      <span
                        className={
                          isTotalRow || isSubTotal
                            ? "opacity-60"
                            : "text-slate-300 dark:text-slate-600"
                        }
                      >
                        -
                      </span>
                    ) : (
                      formatCurrency(row.totalBudgeted)
                    )}
                  </td>

                  {row.monthlyValues.map((val, mIdx) => {
                    const intensity = getIntensity(val, maxMonthly);
                    const isLast = mIdx === row.monthlyValues.length - 1;

                    let cellBg = "";
                    if (!isTotalRow && !isSubTotal && val > 0) {
                      const alpha = Math.round(intensity * 15 + 3);
                      cellBg = `rgba(16, 185, 129, ${alpha / 100})`;
                    }

                    return (
                      <td
                        key={mIdx}
                        className={`px-2 py-2 text-right tabular-nums ${
                          !isLast ? "border-r" : ""
                        } ${
                          isTotalRow || isSubTotal
                            ? "border-emerald-400"
                            : "border-slate-50 dark:border-slate-800/50"
                        }`}
                        style={cellBg ? { backgroundColor: cellBg } : undefined}
                      >
                        {val === 0 ? (
                          <span
                            className={
                              isTotalRow || isSubTotal
                                ? "opacity-40"
                                : "text-slate-200 dark:text-slate-700"
                            }
                          >
                            -
                          </span>
                        ) : (
                          formatCurrency(val)
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer compacto */}
      <div className="px-4 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
        <span className="text-[8px] text-slate-400 uppercase tracking-widest">
          Valores em reais (BRL) · Orçamento detalhado por categoria e mês
        </span>
        <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400">
          Total USD: {formatUSD(data.totalDolar)}
        </span>
      </div>
    </section>
  );
}

/** Componente principal: renderiza cada ano em sua própria seção */
export function BudgetTable() {
  const years = Object.keys(budgetData) as Array<keyof typeof budgetData>;

  return (
    <div className="space-y-6 print:space-y-3">
      {years.map((key) => (
        <BudgetYearSection key={key} data={budgetData[key]} yearKey={key} />
      ))}
    </div>
  );
}
