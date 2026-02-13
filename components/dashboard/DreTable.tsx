import type { DreRow } from "@/types/financial";

interface DreTableProps {
  rows: DreRow[];
}

/** Classes CSS por variante de linha */
const rowVariants: Record<NonNullable<DreRow["variant"]>, string> = {
  default: "hover:bg-slate-50 dark:hover:bg-slate-800/50",
  negative: "text-rose-500",
  subtotal: "bg-slate-50/30 dark:bg-slate-800/20 font-bold",
  expense: "",
  total: "bg-emerald-500 text-white font-black border-t-2 border-emerald-600",
};

/** Classes CSS de estilo para colunas community/developer */
function getCommunityClass(variant?: DreRow["variant"]): string {
  if (variant === "subtotal") return "text-emerald-500";
  if (variant === "total") return "";
  return "text-slate-400";
}

function getDeveloperClass(variant?: DreRow["variant"]): string {
  if (variant === "subtotal") return "text-blue-500";
  if (variant === "total") return "";
  return "text-slate-400";
}

export function DreTable({ rows }: DreTableProps) {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          DRE Consolidado (Demonstração de Resultado)
        </h3>
        <span className="text-[9px] text-slate-400 font-bold">
          2024 - 2064 Projeção Total
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px] text-left">
          <thead className="text-[9px] text-slate-400 font-bold uppercase border-b border-slate-100 dark:border-slate-800">
            <tr>
              <th className="px-4 py-2.5">Descrição</th>
              <th className="px-4 py-2.5 text-right">Total Projeto</th>
              <th className="px-4 py-2.5 text-right text-emerald-500">
                Comunidade (70%)
              </th>
              <th className="px-4 py-2.5 text-right text-blue-500">
                ACC (Desenvolvedor)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {rows.map((row, i) => {
              const variant = row.variant ?? "default";
              return (
                <tr key={i} className={rowVariants[variant]}>
                  <td
                    className={`px-4 ${variant === "total" ? "py-3" : "py-2"} ${
                      variant === "expense" ? "font-medium" : ""
                    }`}
                  >
                    {row.description}
                  </td>
                  <td
                    className={`px-4 ${
                      variant === "total"
                        ? "py-3 text-right uppercase"
                        : "py-2 text-right font-bold"
                    }`}
                  >
                    {row.totalProject}
                  </td>
                  <td
                    className={`px-4 ${
                      variant === "total"
                        ? "py-3 text-right uppercase"
                        : "py-2 text-right"
                    } ${getCommunityClass(variant)}`}
                  >
                    {row.community}
                  </td>
                  <td
                    className={`px-4 ${
                      variant === "total"
                        ? "py-3 text-right uppercase"
                        : "py-2 text-right"
                    } ${getDeveloperClass(variant)}`}
                  >
                    {row.developer}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
