// -------------------------------------------------
// Tipos do sistema de Relatório Financeiro
// -------------------------------------------------

/** KPI principal exibido no topo do dashboard */
export interface KpiItem {
  label: string;
  value: string;
  sub: string;
  /** Nome do ícone Lucide (mapeado no componente) */
  iconName: "database" | "percent" | "barChart3" | "clock" | "dollarSign";
  /** Classe Tailwind para a borda esquerda */
  borderColor: string;
  /** Classe Tailwind para a cor do texto do subtítulo */
  textColor: string;
  /** Classe Tailwind para a cor do ícone */
  iconColor: string;
}

/** Métricas menores com barra de progresso */
export interface SmallMetric {
  label: string;
  value: string;
  unit: string;
  iconName: "dollarSign" | "calendar" | "trendingUp" | "scale";
  /** Porcentagem da barra de progresso (0-100) */
  progress: number;
  /** Classe Tailwind da cor da barra */
  progressColor: string;
}

/** Dados para o gráfico radar de dimensões de performance */
export interface RadarDataPoint {
  subject: string;
  A: number;
  B: number;
  fullMark: number;
}

/** Fluxo de caixa anual para gráfico de barras */
export interface AnnualBarDataPoint {
  year: string;
  community: number;
  developer: number;
  total: number;
  /** Mantido por compatibilidade com implementações anteriores */
  flow: number;
  status: "invest" | "profit";
}

/** Projeção de fluxo de caixa (líquido vs acumulado) */
export interface CashFlowDataPoint {
  name: string;
  liquid: number;
  accumulated: number;
}

/** Dados para decomposição DRE (Waterfall) */
export interface WaterfallDataPoint {
  name: string;
  value: number;
  color: string;
}

/** Dados para análise Pareto ABC */
export interface ParetoDataPoint {
  name: string;
  cost: number;
  cumulative: number;
}

/** Linha da tabela DRE */
export interface DreRow {
  description: string;
  totalProject: string;
  community: string;
  developer: string;
  /** Variante visual da linha */
  variant?: "default" | "negative" | "subtotal" | "expense" | "total";
}

/** Dados para a tabela de Orçamento (Budget) */
export interface BudgetRow {
  category: string;
  totalSpent: number;
  totalBudgeted: number;
  /** Valores mensais (array de 12 meses) */
  monthlyValues: number[];
  /** Se é uma linha de totalizador */
  isTotal?: boolean;
  /** Se é uma linha de destaque secundário (ex: total s/ impostos) */
  isSubTotal?: boolean;
}

export interface BudgetYearData {
  yearLabel: string;
  months: string[]; // Ex: ["abr 26", "mai 26", ...]
  rows: BudgetRow[];
  totalDolar: number;
}
