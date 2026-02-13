import type {
  KpiItem,
  SmallMetric,
  RadarDataPoint,
  AnnualBarDataPoint,
  CashFlowDataPoint,
  WaterfallDataPoint,
  ParetoDataPoint,
  DreRow,
} from "@/types/financial";

// -------------------------------------------------
// Arquivo gerado automaticamente por scripts/generate-financial-data.js
// Fontes: data/dre.csv, data/kpi.csv, data/fluxo_caixa.csv
// -------------------------------------------------

export const kpiData: KpiItem[] = [
  {
    label: "VPL TOTAL",
    value: "R$ 2,42 Bi",
    sub: "Dev: R$ 489 Mi | Com: R$ 1,76 Bi",
    iconName: "database",
    borderColor: "border-emerald-500",
    textColor: "text-emerald-500",
    iconColor: "text-emerald-500"
  },
  {
    label: "TIR GLOBAL (IRR)",
    value: "396%",
    sub: "Desenvolvedor: 139%",
    iconName: "percent",
    borderColor: "border-blue-500",
    textColor: "text-blue-500",
    iconColor: "text-blue-500"
  },
  {
    label: "ROI TOTAL (40 ANOS)",
    value: "36600%",
    sub: "Multiplicador: 366x",
    iconName: "barChart3",
    borderColor: "border-purple-500",
    textColor: "text-purple-500",
    iconColor: "text-purple-500"
  },
  {
    label: "RETORNO POR VCU",
    value: "R$ 15,81",
    sub: "Dev: R$ 3,19 | Com: R$ 11,45",
    iconName: "dollarSign",
    borderColor: "border-orange-500",
    textColor: "text-orange-500",
    iconColor: "text-orange-500"
  }
];

export const smallMetrics: SmallMetric[] = [
  {
    label: "VPL DESENVOLVEDOR",
    value: "R$ 489 Mi",
    unit: "",
    iconName: "dollarSign",
    progress: 20.17,
    progressColor: "bg-blue-500"
  },
  {
    label: "VPL COMUNIDADE",
    value: "R$ 1,76 Bi",
    unit: "",
    iconName: "trendingUp",
    progress: 72.44,
    progressColor: "bg-emerald-500"
  },
  {
    label: "MÉDIA RECEITA ANUAL",
    value: "R$ 309 Mi",
    unit: "/ ano",
    iconName: "calendar",
    progress: 85,
    progressColor: "bg-orange-500"
  },
  {
    label: "PAYBACK",
    value: "Ano 3",
    unit: "",
    iconName: "scale",
    progress: 7.5,
    progressColor: "bg-purple-500"
  }
];

export const radarData: RadarDataPoint[] = [
  {
    subject: "Potencial VPL",
    A: 95,
    B: 65,
    fullMark: 150
  },
  {
    subject: "Vol. Fluxo Caixa",
    A: 90,
    B: 50,
    fullMark: 150
  },
  {
    subject: "Retorno Aj. Risco",
    A: 85,
    B: 95,
    fullMark: 150
  },
  {
    subject: "Impacto Social",
    A: 100,
    B: 40,
    fullMark: 150
  },
  {
    subject: "Margem %",
    A: 80,
    B: 90,
    fullMark: 150
  }
];

// Fluxo anual (R$ Mi) com comunidade, desenvolvedor e total.
export const annualBarData: AnnualBarDataPoint[] = [
  {
    year: "2024",
    community: 0,
    developer: -9.66,
    total: -9.66,
    flow: -9.66,
    status: "invest"
  },
  {
    year: "2025",
    community: 0,
    developer: -17.44,
    total: -17.44,
    flow: -17.44,
    status: "invest"
  },
  {
    year: "2026",
    community: 202.02,
    developer: 58.21,
    total: 260.23,
    flow: 260.23,
    status: "profit"
  },
  {
    year: "2027",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2028",
    community: 202.02,
    developer: 50.66,
    total: 252.68,
    flow: 252.68,
    status: "profit"
  },
  {
    year: "2029",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2030",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2031",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2032",
    community: 202.02,
    developer: 50.66,
    total: 252.68,
    flow: 252.68,
    status: "profit"
  },
  {
    year: "2033",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2034",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2035",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2036",
    community: 202.02,
    developer: 50.66,
    total: 252.68,
    flow: 252.68,
    status: "profit"
  },
  {
    year: "2037",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2038",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2039",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2040",
    community: 202.02,
    developer: 50.66,
    total: 252.68,
    flow: 252.68,
    status: "profit"
  },
  {
    year: "2041",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2042",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2043",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2044",
    community: 202.02,
    developer: 50.66,
    total: 252.68,
    flow: 252.68,
    status: "profit"
  },
  {
    year: "2045",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2046",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2047",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2048",
    community: 202.02,
    developer: 50.66,
    total: 252.68,
    flow: 252.68,
    status: "profit"
  },
  {
    year: "2049",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2050",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2051",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2052",
    community: 202.02,
    developer: 50.66,
    total: 252.68,
    flow: 252.68,
    status: "profit"
  },
  {
    year: "2053",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2054",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2055",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2056",
    community: 202.02,
    developer: 50.66,
    total: 252.68,
    flow: 252.68,
    status: "profit"
  },
  {
    year: "2057",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2058",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2059",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2060",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2061",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2062",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2063",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  },
  {
    year: "2064",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    flow: 256.39,
    status: "profit"
  }
];

// Serie resumida (a cada 4 anos) de fluxo total (R$ Mi) para o grafico de area.
export const cashFlowData: CashFlowDataPoint[] = [
  {
    name: "2024",
    liquid: -9.66,
    accumulated: -9.66
  },
  {
    name: "2028",
    liquid: 252.68,
    accumulated: 742.2
  },
  {
    name: "2032",
    liquid: 252.68,
    accumulated: 1764.05
  },
  {
    name: "2036",
    liquid: 252.68,
    accumulated: 2785.91
  },
  {
    name: "2040",
    liquid: 252.68,
    accumulated: 3807.76
  },
  {
    name: "2044",
    liquid: 252.68,
    accumulated: 4829.61
  },
  {
    name: "2048",
    liquid: 252.68,
    accumulated: 5851.47
  },
  {
    name: "2052",
    liquid: 252.68,
    accumulated: 6873.32
  },
  {
    name: "2056",
    liquid: 252.68,
    accumulated: 7895.18
  },
  {
    name: "2060",
    liquid: 256.39,
    accumulated: 8920.74
  },
  {
    name: "2064",
    liquid: 256.39,
    accumulated: 9946.3
  }
];

// Serie completa 2024-2064 (R$ Mi): comunidade, desenvolvedor e total.
export const full40YearCashFlow = [
  {
    year: "2024",
    community: 0,
    developer: -9.66,
    total: -9.66,
    accumulatedCommunity: 0,
    accumulatedDeveloper: -9.66,
    accumulatedTotal: -9.66
  },
  {
    year: "2025",
    community: 0,
    developer: -17.44,
    total: -17.44,
    accumulatedCommunity: 0,
    accumulatedDeveloper: -27.1,
    accumulatedTotal: -27.1
  },
  {
    year: "2026",
    community: 202.02,
    developer: 58.21,
    total: 260.23,
    accumulatedCommunity: 202.02,
    accumulatedDeveloper: 31.11,
    accumulatedTotal: 233.13
  },
  {
    year: "2027",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 404.04,
    accumulatedDeveloper: 85.48,
    accumulatedTotal: 489.52
  },
  {
    year: "2028",
    community: 202.02,
    developer: 50.66,
    total: 252.68,
    accumulatedCommunity: 606.06,
    accumulatedDeveloper: 136.14,
    accumulatedTotal: 742.2
  },
  {
    year: "2029",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 808.08,
    accumulatedDeveloper: 190.51,
    accumulatedTotal: 998.59
  },
  {
    year: "2030",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 1010.09,
    accumulatedDeveloper: 244.89,
    accumulatedTotal: 1254.98
  },
  {
    year: "2031",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 1212.11,
    accumulatedDeveloper: 299.26,
    accumulatedTotal: 1511.37
  },
  {
    year: "2032",
    community: 202.02,
    developer: 50.66,
    total: 252.68,
    accumulatedCommunity: 1414.13,
    accumulatedDeveloper: 349.92,
    accumulatedTotal: 1764.05
  },
  {
    year: "2033",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 1616.15,
    accumulatedDeveloper: 404.29,
    accumulatedTotal: 2020.44
  },
  {
    year: "2034",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 1818.17,
    accumulatedDeveloper: 458.66,
    accumulatedTotal: 2276.83
  },
  {
    year: "2035",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 2020.19,
    accumulatedDeveloper: 513.04,
    accumulatedTotal: 2533.22
  },
  {
    year: "2036",
    community: 202.02,
    developer: 50.66,
    total: 252.68,
    accumulatedCommunity: 2222.21,
    accumulatedDeveloper: 563.7,
    accumulatedTotal: 2785.91
  },
  {
    year: "2037",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 2424.23,
    accumulatedDeveloper: 618.07,
    accumulatedTotal: 3042.3
  },
  {
    year: "2038",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 2626.24,
    accumulatedDeveloper: 672.44,
    accumulatedTotal: 3298.69
  },
  {
    year: "2039",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 2828.26,
    accumulatedDeveloper: 726.81,
    accumulatedTotal: 3555.08
  },
  {
    year: "2040",
    community: 202.02,
    developer: 50.66,
    total: 252.68,
    accumulatedCommunity: 3030.28,
    accumulatedDeveloper: 777.48,
    accumulatedTotal: 3807.76
  },
  {
    year: "2041",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 3232.3,
    accumulatedDeveloper: 831.85,
    accumulatedTotal: 4064.15
  },
  {
    year: "2042",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 3434.32,
    accumulatedDeveloper: 886.22,
    accumulatedTotal: 4320.54
  },
  {
    year: "2043",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 3636.34,
    accumulatedDeveloper: 940.59,
    accumulatedTotal: 4576.93
  },
  {
    year: "2044",
    community: 202.02,
    developer: 50.66,
    total: 252.68,
    accumulatedCommunity: 3838.36,
    accumulatedDeveloper: 991.26,
    accumulatedTotal: 4829.61
  },
  {
    year: "2045",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 4040.38,
    accumulatedDeveloper: 1045.63,
    accumulatedTotal: 5086.01
  },
  {
    year: "2046",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 4242.4,
    accumulatedDeveloper: 1100,
    accumulatedTotal: 5342.4
  },
  {
    year: "2047",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 4444.41,
    accumulatedDeveloper: 1154.37,
    accumulatedTotal: 5598.79
  },
  {
    year: "2048",
    community: 202.02,
    developer: 50.66,
    total: 252.68,
    accumulatedCommunity: 4646.43,
    accumulatedDeveloper: 1205.04,
    accumulatedTotal: 5851.47
  },
  {
    year: "2049",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 4848.45,
    accumulatedDeveloper: 1259.41,
    accumulatedTotal: 6107.86
  },
  {
    year: "2050",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 5050.47,
    accumulatedDeveloper: 1313.78,
    accumulatedTotal: 6364.25
  },
  {
    year: "2051",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 5252.49,
    accumulatedDeveloper: 1368.15,
    accumulatedTotal: 6620.64
  },
  {
    year: "2052",
    community: 202.02,
    developer: 50.66,
    total: 252.68,
    accumulatedCommunity: 5454.51,
    accumulatedDeveloper: 1418.81,
    accumulatedTotal: 6873.32
  },
  {
    year: "2053",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 5656.53,
    accumulatedDeveloper: 1473.19,
    accumulatedTotal: 7129.71
  },
  {
    year: "2054",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 5858.55,
    accumulatedDeveloper: 1527.56,
    accumulatedTotal: 7386.1
  },
  {
    year: "2055",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 6060.57,
    accumulatedDeveloper: 1581.93,
    accumulatedTotal: 7642.49
  },
  {
    year: "2056",
    community: 202.02,
    developer: 50.66,
    total: 252.68,
    accumulatedCommunity: 6262.58,
    accumulatedDeveloper: 1632.59,
    accumulatedTotal: 7895.18
  },
  {
    year: "2057",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 6464.6,
    accumulatedDeveloper: 1686.96,
    accumulatedTotal: 8151.57
  },
  {
    year: "2058",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 6666.62,
    accumulatedDeveloper: 1741.34,
    accumulatedTotal: 8407.96
  },
  {
    year: "2059",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 6868.64,
    accumulatedDeveloper: 1795.71,
    accumulatedTotal: 8664.35
  },
  {
    year: "2060",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 7070.66,
    accumulatedDeveloper: 1850.08,
    accumulatedTotal: 8920.74
  },
  {
    year: "2061",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 7272.68,
    accumulatedDeveloper: 1904.45,
    accumulatedTotal: 9177.13
  },
  {
    year: "2062",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 7474.7,
    accumulatedDeveloper: 1958.82,
    accumulatedTotal: 9433.52
  },
  {
    year: "2063",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 7676.72,
    accumulatedDeveloper: 2013.2,
    accumulatedTotal: 9689.91
  },
  {
    year: "2064",
    community: 202.02,
    developer: 54.37,
    total: 256.39,
    accumulatedCommunity: 7878.73,
    accumulatedDeveloper: 2067.57,
    accumulatedTotal: 9946.3
  }
] as const;

export const waterfallData: WaterfallDataPoint[] = [
  {
    name: "Receita Bruta",
    value: 12653.51,
    color: "#0284c7"
  },
  {
    name: "(-) Impostos (PIS/COFI",
    value: -461.85,
    color: "#ef4444"
  },
  {
    name: "(-) Custos (Verificaçõ",
    value: -636.86,
    color: "#f59e0b"
  },
  {
    name: "(-) Despesas Gerais e ",
    value: -244.32,
    color: "#f59e0b"
  },
  {
    name: "(-) OpEx - Gerenciamen",
    value: -218.66,
    color: "#f59e0b"
  },
  {
    name: "(-) OpEx Complementar ",
    value: -315.83,
    color: "#f59e0b"
  },
  {
    name: "(-) IR/CSLL",
    value: -829.68,
    color: "#ef4444"
  },
  {
    name: "Fluxo de Caixa",
    value: 9946.3,
    color: "#059669"
  }
];

export const paretoData: ParetoDataPoint[] = [
  {
    name: "IR/CSLL",
    cost: 829.68,
    cumulative: 30.65
  },
  {
    name: "Custos (Verificações -",
    cost: 636.86,
    cumulative: 54.17
  },
  {
    name: "Impostos (PIS/COFINS)",
    cost: 461.85,
    cumulative: 71.23
  },
  {
    name: "OpEx Complementar (Ati",
    cost: 315.83,
    cumulative: 82.9
  },
  {
    name: "Despesas Gerais e Adm.",
    cost: 244.32,
    cumulative: 91.92
  },
  {
    name: "OpEx - Gerenciamento d",
    cost: 218.66,
    cumulative: 100
  }
];

export const dreRows: DreRow[] = [
  {
    description: "(=) Fluxo de Comercialização",
    totalProject: "R$ 153 Mi",
    developer: "R$ 46 Mi",
    community: "R$ 107 Mi",
    variant: "subtotal"
  },
  {
    description: "(+) Receita Bruta",
    totalProject: "R$ 12.654 Mi",
    developer: "R$ 3.796 Mi",
    community: "R$ 8.857 Mi",
    variant: "default"
  },
  {
    description: "(-) Impostos (PIS/COFINS)",
    totalProject: "R$ 462 Mi",
    developer: "R$ 139 Mi",
    community: "R$ 323 Mi",
    variant: "negative"
  },
  {
    description: "(=) Receita Líquida",
    totalProject: "R$ 12.192 Mi",
    developer: "R$ 3.657 Mi",
    community: "R$ 8.534 Mi",
    variant: "subtotal"
  },
  {
    description: "(-) Custos (Verificações - Certificadora)",
    totalProject: "R$ 637 Mi",
    developer: "R$ 637 Mi",
    community: "—",
    variant: "expense"
  },
  {
    description: "(-) Despesas Gerais e Adm. / Equipe Operacional e Logística",
    totalProject: "R$ 244 Mi",
    developer: "R$ 244 Mi",
    community: "—",
    variant: "expense"
  },
  {
    description: "(-) OpEx - Gerenciamento do Projeto e Carbono",
    totalProject: "R$ 219 Mi",
    developer: "R$ 219 Mi",
    community: "—",
    variant: "expense"
  },
  {
    description: "(=) Lucro Bruto",
    totalProject: "R$ 11.092 Mi",
    developer: "R$ 2.558 Mi",
    community: "R$ 8.534 Mi",
    variant: "subtotal"
  },
  {
    description: "(-) OpEx Complementar (Atividades Sociais e Monitoramento)",
    totalProject: "R$ 316 Mi",
    developer: "R$ 316 Mi",
    community: "—",
    variant: "expense"
  },
  {
    description: "(-) PSA",
    totalProject: "R$ 0 Mi",
    developer: "—",
    community: "—",
    variant: "expense"
  },
  {
    description: "(-) Outorga",
    totalProject: "R$ 0 Mi",
    developer: "—",
    community: "—",
    variant: "expense"
  },
  {
    description: "(=) Resultado Operacional",
    totalProject: "R$ 10.776 Mi",
    developer: "R$ 2.242 Mi",
    community: "R$ 8.534 Mi",
    variant: "subtotal"
  },
  {
    description: "(-) Juros Dívida",
    totalProject: "R$ 0 Mi",
    developer: "—",
    community: "—",
    variant: "expense"
  },
  {
    description: "(=) Base IR/CSLL",
    totalProject: "R$ 10.776 Mi",
    developer: "R$ 2.242 Mi",
    community: "R$ 8.534 Mi",
    variant: "subtotal"
  },
  {
    description: "(-) IR/CSLL",
    totalProject: "R$ 830 Mi",
    developer: "R$ 174 Mi",
    community: "R$ 655 Mi",
    variant: "expense"
  },
  {
    description: "(+) Entrada Dívida",
    totalProject: "R$ 0 Mi",
    developer: "—",
    community: "—",
    variant: "default"
  },
  {
    description: "(-) Amortização Principal Dívida",
    totalProject: "R$ 0 Mi",
    developer: "—",
    community: "—",
    variant: "expense"
  },
  {
    description: "(=) Fluxo de Caixa do Projeto",
    totalProject: "R$ 9.946 Mi",
    developer: "R$ 2.068 Mi",
    community: "R$ 7.879 Mi",
    variant: "total"
  }
];
