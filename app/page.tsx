import { Header } from "@/components/layout/Header";
import { PrintHeader } from "@/components/layout/PrintHeader";
import { Footer } from "@/components/layout/Footer";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { DreTable } from "@/components/dashboard/DreTable";
import { RadarChartSection } from "@/components/dashboard/RadarChartSection";
import { SmallMetricCards } from "@/components/dashboard/SmallMetricCards";
import { AnnualBarChart } from "@/components/dashboard/AnnualBarChart";
import { CashFlowChart } from "@/components/dashboard/CashFlowChart";
import { WaterfallChart } from "@/components/dashboard/WaterfallChart";
import { ParetoChart } from "@/components/dashboard/ParetoChart";
import { BudgetAnalysis } from "@/components/dashboard/BudgetAnalysis";
import { BudgetTable } from "@/components/dashboard/BudgetTable";

import {
  kpiData,
  dreRows,
  radarData,
  smallMetrics,
  annualBarData,
  cashFlowData,
  waterfallData,
  paretoData,
} from "@/data/financial-data";

export default function HomePage() {
  return (
    <div className="print-sheet min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-6 transition-colors duration-300">
      <Header />
      <PrintHeader />

      <main className="max-w-[1400px] mx-auto space-y-6 print:space-y-3">
        {/* KPIs Principais */}
        <KpiCards data={kpiData} />

        {/* DRE Consolidado + Radar */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DreTable rows={dreRows} />
          <RadarChartSection data={radarData} />
        </section>

        {/* Métricas Secundárias */}
        <SmallMetricCards data={smallMetrics} />

        {/* Fluxo de Caixa Anual (Barras) */}
        <AnnualBarChart data={annualBarData} />

        {/* Cash Flow Projection + Waterfall */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CashFlowChart data={cashFlowData} />
          <WaterfallChart data={waterfallData} />
        </section>

        {/* Pareto ABC */}
        <ParetoChart data={paretoData} />

        {/* Análise Comparativa Ano 1 vs Ano 2 */}
        <BudgetAnalysis />

        {/* Detalhamento Orçamentário (por último) */}
        <BudgetTable />
      </main>

      <Footer />
    </div>
  );
}
