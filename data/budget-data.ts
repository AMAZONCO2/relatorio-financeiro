import type { BudgetRow, BudgetYearData } from "@/types/financial";

// ---------------------------------------------------------------------------
// Helper: arredonda para 2 casas decimais evitando erros de ponto flutuante
// ---------------------------------------------------------------------------
const round2 = (v: number): number => Math.round(v * 100) / 100;

// ---------------------------------------------------------------------------
// Helper: recebe as linhas de categoria e devolve as linhas calculadas
//   - GASTOS TOTAIS  = soma de todas as categorias (incluindo IMPOSTOS)
//   - (SEM IMPOSTOS) = GASTOS TOTAIS − IMPOSTOS
// ---------------------------------------------------------------------------
function buildTotalRows(categoryRows: BudgetRow[]): [BudgetRow, BudgetRow] {
  const months = categoryRows[0].monthlyValues.length;

  // Soma geral (todas as categorias)
  const totalSpent = round2(
    categoryRows.reduce((acc, r) => acc + r.totalSpent, 0)
  );
  const totalBudgeted = round2(
    categoryRows.reduce((acc, r) => acc + r.totalBudgeted, 0)
  );
  const monthlyValues = Array.from({ length: months }, (_, i) =>
    round2(categoryRows.reduce((acc, r) => acc + r.monthlyValues[i], 0))
  );

  // Linha de IMPOSTOS (se existir)
  const impostos = categoryRows.find((r) => r.category === "IMPOSTOS");

  const gastosTotais: BudgetRow = {
    category: "GASTOS TOTAIS",
    totalSpent,
    totalBudgeted,
    monthlyValues,
    isTotal: true,
  };

  const semImpostos: BudgetRow = {
    category: "(SEM IMPOSTOS)",
    totalSpent: round2(totalSpent - (impostos?.totalSpent ?? 0)),
    totalBudgeted: round2(totalBudgeted - (impostos?.totalBudgeted ?? 0)),
    monthlyValues: monthlyValues.map((v, i) =>
      round2(v - (impostos?.monthlyValues[i] ?? 0))
    ),
    isSubTotal: true,
  };

  return [gastosTotais, semImpostos];
}

// ---------------------------------------------------------------------------
// Linhas de categoria — Ano 1
// ---------------------------------------------------------------------------
const ano1Categories: BudgetRow[] = [
  {
    category: "DUE DILIGENCE",
    totalSpent: 0,
    totalBudgeted: 443814.0,
    monthlyValues: [
      36984.5, 36984.5, 36984.5, 36984.5, 36984.5, 36984.5, 36984.5, 36984.5,
      36984.5, 36984.5, 36984.5, 36984.5,
    ],
  },
  {
    category: "CLPI",
    totalSpent: 0,
    totalBudgeted: 514186.0,
    monthlyValues: [102837.2, 257093.0, 154255.8, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    category: "IMPLEMENTAÇÃO DE ATIVIDADES SOCIAIS",
    totalSpent: 0,
    totalBudgeted: 7895829.0,
    monthlyValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    category: "GOVERNANÇA",
    totalSpent: 0,
    totalBudgeted: 1331801.0,
    monthlyValues: [
      0, 0, 0, 133180.1, 133180.1, 133180.1, 133180.1, 133180.1, 133180.1,
      133180.1, 133180.1, 133180.1,
    ],
  },
  {
    category: "DIAGNÓSTICO SOCIAL",
    totalSpent: 0,
    totalBudgeted: 493262.0,
    monthlyValues: [
      0, 0, 0, 98652.4, 147978.6, 147978.6, 98652.4, 0, 0, 0, 0, 0,
    ],
  },
  {
    category: "LINHA DE BASE CARBONO",
    totalSpent: 0,
    totalBudgeted: 321552.0,
    monthlyValues: [0, 0, 0, 0, 64310.4, 96465.6, 96465.6, 64310.4, 0, 0, 0, 0],
  },
  {
    category: "INVENTÁRIO DA FAUNA",
    totalSpent: 0,
    totalBudgeted: 912404.0,
    monthlyValues: [
      0, 0, 0, 0, 73923.8, 110885.7, 110885.7, 73923.8, 0, 0, 108597.0,
      162895.5,
    ],
  },
  {
    category: "MONITORAMENTO (FAUNA, FLORA)",
    totalSpent: 0,
    totalBudgeted: 1234156.0,
    monthlyValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    category: "EQUITABLE EARTH - VIABILIDADE",
    totalSpent: 0,
    totalBudgeted: 2178109.28,
    monthlyValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    category: "EQUITABLE EARTH - PROJECT DESIGN",
    totalSpent: 0,
    totalBudgeted: 858863.72,
    monthlyValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    category: "EQUITABLE EARTH - MONITORAMENTO ANUAL",
    totalSpent: 0,
    totalBudgeted: 0,
    monthlyValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    category: "VVB",
    totalSpent: 0,
    totalBudgeted: 537452.0,
    monthlyValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    category: "Custos Indiretos do Projeto",
    totalSpent: 0,
    totalBudgeted: 536008.34,
    monthlyValues: [
      21666.67, 21666.67, 21666.67, 21666.67, 21666.67, 21666.67, 21666.67,
      21666.67, 21666.67, 21666.67, 21666.67, 21666.67,
    ],
  },
  {
    category: "Custos Indiretos de Escritório",
    totalSpent: 0,
    totalBudgeted: 10299918.42,
    monthlyValues: [
      384090.0, 384090.0, 384090.0, 384090.0, 384090.0, 384090.0, 384090.0,
      384090.0, 384090.0, 384090.0, 384090.0, 384090.0,
    ],
  },
  {
    category: "IMPOSTOS",
    totalSpent: 0,
    totalBudgeted: 0,
    monthlyValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
];

// ---------------------------------------------------------------------------
// Linhas de categoria — Ano 2
// ---------------------------------------------------------------------------
const ano2Categories: BudgetRow[] = [
  {
    category: "DUE DILIGENCE",
    totalSpent: 0,
    totalBudgeted: 443814.0,
    monthlyValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    category: "CLPI",
    totalSpent: 0,
    totalBudgeted: 514186.0,
    monthlyValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    category: "IMPLEMENTAÇÃO DE ATIVIDADES SOCIAIS",
    totalSpent: 0,
    totalBudgeted: 7895829.0,
    monthlyValues: [
      0, 526388.6, 1579165.8, 526388.6, 0, 526388.6, 1579165.8, 526388.6, 0,
      526388.6, 1579165.8, 526388.6,
    ],
  },
  {
    category: "GOVERNANÇA",
    totalSpent: 0,
    totalBudgeted: 1331801.0,
    monthlyValues: [133180.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    category: "DIAGNÓSTICO SOCIAL",
    totalSpent: 0,
    totalBudgeted: 493262.0,
    monthlyValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    category: "LINHA DE BASE CARBONO",
    totalSpent: 0,
    totalBudgeted: 321552.0,
    monthlyValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    category: "INVENTÁRIO DA FAUNA",
    totalSpent: 0,
    totalBudgeted: 912404.0,
    monthlyValues: [162895.5, 108597.0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    category: "MONITORAMENTO (FAUNA, FLORA)",
    totalSpent: 0,
    totalBudgeted: 1234156.0,
    monthlyValues: [
      0, 0, 0, 138234.2, 207351.3, 207351.3, 138234.2, 0, 0, 0, 271492.5,
      271492.5,
    ],
  },
  {
    category: "EQUITABLE EARTH - VIABILIDADE",
    totalSpent: 0,
    totalBudgeted: 2178109.28,
    monthlyValues: [653432.78, 0, 0, 0, 1524676.49, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    category: "EQUITABLE EARTH - PROJECT DESIGN",
    totalSpent: 0,
    totalBudgeted: 858863.72,
    monthlyValues: [0, 0, 0, 858863.72, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    category: "EQUITABLE EARTH - MONITORAMENTO ANUAL",
    totalSpent: 0,
    totalBudgeted: 0,
    monthlyValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    category: "VVB",
    totalSpent: 0,
    totalBudgeted: 537452.0,
    monthlyValues: [0, 0, 0, 0, 0, 0, 107530.4, 268826.0, 161095.6, 0, 0, 0],
  },
  {
    category: "Custos Indiretos do Projeto",
    totalSpent: 0,
    totalBudgeted: 536008.34,
    monthlyValues: [
      23000.69, 23000.69, 23000.69, 23000.69, 23000.69, 23000.69, 23000.69,
      23000.69, 23000.69, 23000.69, 23000.69, 23000.69,
    ],
  },
  {
    category: "Custos Indiretos de Escritório",
    totalSpent: 0,
    totalBudgeted: 10299918.42,
    monthlyValues: [
      474236.53, 474236.53, 474236.53, 474236.53, 474236.53, 474236.53,
      474236.53, 474236.53, 474236.53, 474236.53, 474236.53, 474236.53,
    ],
  },
  {
    category: "IMPOSTOS",
    totalSpent: 0,
    totalBudgeted: 0,
    monthlyValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
];

// ---------------------------------------------------------------------------
// Exportação final com totais calculados dinamicamente
// ---------------------------------------------------------------------------
export const budgetData: Record<"ano1" | "ano2", BudgetYearData> = {
  ano1: {
    yearLabel: "ANO 1 (2026 - 2027)",
    months: [
      "abr. de 2026",
      "mai. de 2026",
      "jun. de 2026",
      "jul. de 2026",
      "ago. de 2026",
      "set. de 2026",
      "out. de 2026",
      "nov. de 2026",
      "dez. de 2026",
      "jan. de 2027",
      "fev. de 2027",
      "mar. de 2027",
    ],
    totalDolar: 5271084.29,
    rows: [...ano1Categories, ...buildTotalRows(ano1Categories)],
  },
  ano2: {
    yearLabel: "ANO 2 (2027 - 2028)",
    months: [
      "abr. de 2027",
      "mai. de 2027",
      "jun. de 2027",
      "jul. de 2027",
      "ago. de 2027",
      "set. de 2027",
      "out. de 2027",
      "nov. de 2027",
      "dez. de 2027",
      "jan. de 2028",
      "fev. de 2028",
      "mar. de 2028",
    ],
    totalDolar: 5271084.29,
    rows: [...ano2Categories, ...buildTotalRows(ano2Categories)],
  },
};
