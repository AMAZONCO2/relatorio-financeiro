/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT_DIR, "data");

const FILES = {
  dre: path.join(DATA_DIR, "dre.csv"),
  kpi: path.join(DATA_DIR, "kpi.csv"),
  fluxo: path.join(DATA_DIR, "fluxo_caixa.csv"),
  output: path.join(DATA_DIR, "financial-data.ts"),
};

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function parseCsv(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const rows = lines.map(parseCsvLine);
  const headers = rows[0].map((header) => header.trim());

  return rows.slice(1).map((row) => {
    const record = {};
    headers.forEach((header, index) => {
      const fallback = `col_${index}`;
      const key = header || fallback;
      record[key] = (row[index] || "").trim();
    });
    return record;
  });
}

function normalizeKey(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function parseBrazilianNumber(value) {
  if (!value) return 0;
  const cleaned = String(value)
    .replace(/\s+/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function round2(value) {
  return Number(value.toFixed(2));
}

function formatNumber(value, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(value);
}

function formatCurrencyCompact(value) {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) {
    return `R$ ${formatNumber(value / 1_000_000_000, 2)} Bi`;
  }
  return `R$ ${formatNumber(value / 1_000_000, 0)} Mi`;
}

function formatCurrencyMi(value) {
  return `R$ ${formatNumber(value / 1_000_000, 0)} Mi`;
}

function formatSignedCurrencyMi(value) {
  const formatted = formatCurrencyMi(Math.abs(value));
  return value < 0 ? `(${formatted})` : formatted;
}

function toTs(value, indentLevel = 0) {
  const indent = "  ".repeat(indentLevel);
  const nextIndent = "  ".repeat(indentLevel + 1);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map(
      (item) => `${nextIndent}${toTs(item, indentLevel + 1)}`
    );
    return `[\n${items.join(",\n")}\n${indent}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0) return "{}";
    const lines = entries.map(([key, val]) => {
      const safeKey = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)
        ? key
        : JSON.stringify(key);
      return `${nextIndent}${safeKey}: ${toTs(val, indentLevel + 1)}`;
    });
    return `{\n${lines.join(",\n")}\n${indent}}`;
  }

  return JSON.stringify(value);
}

function buildKpiData(kpiRows) {
  const byCategory = new Map(
    kpiRows.map((row) => [
      normalizeKey(row.Categoria || row.Categoria?.trim()),
      row,
    ])
  );

  const total = byCategory.get("total");
  const developer = byCategory.get("desenvolvedor");
  const community = byCategory.get("comunidade");

  if (!total || !developer || !community) {
    throw new Error(
      "Nao foi possivel encontrar as linhas TOTAL, DESENVOLVEDOR e COMUNIDADE no kpi.csv"
    );
  }

  const totalVpl = parseBrazilianNumber(total.VPL);
  const devVpl = parseBrazilianNumber(developer.VPL);
  const comVpl = parseBrazilianNumber(community.VPL);

  const totalTir = (total.TIR || "").trim();
  const devTir = (developer.TIR || "").trim();

  const totalRoi = (total.ROI || total["ROI "] || "").trim();
  const totalReturnPerVcu = (total["RETORNO POR VCU"] || "").trim();
  const devReturnPerVcu = (developer["RETORNO POR VCU"] || "").trim();
  const comReturnPerVcu = (community["RETORNO POR VCU"] || "").trim();

  const roiMultiplier = totalRoi.endsWith("%")
    ? `${formatNumber(parseBrazilianNumber(totalRoi) / 100, 0)}x`
    : "n/a";

  const kpiData = [
    {
      label: "VPL TOTAL",
      value: formatCurrencyCompact(totalVpl),
      sub: `Dev: ${formatCurrencyCompact(
        devVpl
      )} | Com: ${formatCurrencyCompact(comVpl)}`,
      iconName: "database",
      borderColor: "border-emerald-500",
      textColor: "text-emerald-500",
      iconColor: "text-emerald-500",
    },
    {
      label: "TIR GLOBAL (IRR)",
      value: totalTir || "n/a",
      sub: `Desenvolvedor: ${devTir || "n/a"}`,
      iconName: "percent",
      borderColor: "border-blue-500",
      textColor: "text-blue-500",
      iconColor: "text-blue-500",
    },
    {
      label: "ROI TOTAL (40 ANOS)",
      value: totalRoi || "n/a",
      sub: `Multiplicador: ${roiMultiplier}`,
      iconName: "barChart3",
      borderColor: "border-purple-500",
      textColor: "text-purple-500",
      iconColor: "text-purple-500",
    },
    {
      label: "RETORNO POR VCU",
      value: totalReturnPerVcu.trim() || "n/a",
      sub: `Dev: ${devReturnPerVcu.trim() || "n/a"} | Com: ${
        comReturnPerVcu.trim() || "n/a"
      }`,
      iconName: "dollarSign",
      borderColor: "border-orange-500",
      textColor: "text-orange-500",
      iconColor: "text-orange-500",
    },
  ];

  const smallMetrics = [
    {
      label: "VPL DESENVOLVEDOR",
      value: formatCurrencyCompact(devVpl),
      unit: "",
      iconName: "dollarSign",
      progress: Math.min(100, Math.max(0, round2((devVpl / totalVpl) * 100))),
      progressColor: "bg-blue-500",
    },
    {
      label: "VPL COMUNIDADE",
      value: formatCurrencyCompact(comVpl),
      unit: "",
      iconName: "trendingUp",
      progress: Math.min(100, Math.max(0, round2((comVpl / totalVpl) * 100))),
      progressColor: "bg-emerald-500",
    },
  ];

  return { kpiData, smallMetrics };
}

function getColumnValue(row, candidates) {
  const normalizedCandidates = candidates.map(normalizeKey);
  const entries = Object.entries(row);
  for (const [key, rawValue] of entries) {
    if (normalizedCandidates.includes(normalizeKey(key))) {
      return rawValue;
    }
  }
  return "";
}

function buildFlowData(fluxoRows, smallMetricsSeed) {
  const yearly = new Map();

  for (const row of fluxoRows) {
    const tipo = normalizeKey(row.TIPO || "");
    const year = Number.parseInt(getColumnValue(row, ["ANO"]), 10);
    if (!Number.isFinite(year)) continue;

    const group = tipo.includes("comunidade")
      ? "community"
      : tipo.includes("desenvolvedor")
      ? "developer"
      : null;
    if (!group) continue;

    const receita = parseBrazilianNumber(
      getColumnValue(row, ["(+) Receita Bruta"])
    );
    const resultadoOperacional = parseBrazilianNumber(
      getColumnValue(row, ["(=) Resultado Operacional"])
    );
    const ir = parseBrazilianNumber(getColumnValue(row, ["(-) IR/CSLL"]));
    const net = resultadoOperacional - ir;

    if (!yearly.has(year)) {
      yearly.set(year, {
        year,
        community: { receita: 0, net: 0 },
        developer: { receita: 0, net: 0 },
      });
    }

    yearly.get(year)[group] = {
      receita,
      net,
    };
  }

  const rows = Array.from(yearly.values()).sort((a, b) => a.year - b.year);
  let accumulatedTotal = 0;
  let accumulatedCommunity = 0;
  let accumulatedDeveloper = 0;

  const full40YearCashFlow = rows.map((row) => {
    const total = row.community.net + row.developer.net;
    accumulatedCommunity += row.community.net;
    accumulatedDeveloper += row.developer.net;
    accumulatedTotal += total;
    return {
      year: String(row.year),
      community: round2(row.community.net / 1_000_000),
      developer: round2(row.developer.net / 1_000_000),
      total: round2(total / 1_000_000),
      accumulatedCommunity: round2(accumulatedCommunity / 1_000_000),
      accumulatedDeveloper: round2(accumulatedDeveloper / 1_000_000),
      accumulatedTotal: round2(accumulatedTotal / 1_000_000),
    };
  });

  const annualBarData = full40YearCashFlow.map((row) => ({
    year: row.year,
    community: row.community,
    developer: row.developer,
    total: row.total,
    flow: row.total,
    status: row.total < 0 ? "invest" : "profit",
  }));

  const cashFlowData = full40YearCashFlow
    .filter((row, index) => {
      if (index === 0 || index === full40YearCashFlow.length - 1) return true;
      const yearNumber = Number.parseInt(row.year, 10);
      return (yearNumber - 2024) % 4 === 0;
    })
    .map((row) => ({
      name: row.year,
      liquid: row.total,
      accumulated: row.accumulatedTotal,
    }));

  const receitaAnualMedia =
    rows.reduce((sum, row) => {
      return sum + row.community.receita + row.developer.receita;
    }, 0) / rows.length;

  const paybackIndex = full40YearCashFlow.findIndex(
    (row) => row.accumulatedTotal >= 0
  );
  const paybackYear = paybackIndex >= 0 ? paybackIndex + 1 : 0;

  smallMetricsSeed.push(
    {
      label: "MÉDIA RECEITA ANUAL",
      value: formatCurrencyCompact(receitaAnualMedia),
      unit: "/ ano",
      iconName: "calendar",
      progress: 85,
      progressColor: "bg-orange-500",
    },
    {
      label: "PAYBACK",
      value: paybackYear ? `Ano ${paybackYear}` : "n/a",
      unit: "",
      iconName: "scale",
      progress: paybackYear ? round2((paybackYear / 40) * 100) : 0,
      progressColor: "bg-purple-500",
    }
  );

  return { annualBarData, cashFlowData, full40YearCashFlow };
}

function buildDreData(dreRowsRaw) {
  const parsed = dreRowsRaw.map((row) => {
    const description = row.Item || "";
    const developer = parseBrazilianNumber(
      row.Desenvolvedora || row["Desenvolvedora "] || "0"
    );
    const community = parseBrazilianNumber(
      row.Comunidade || row["Comunidade "] || "0"
    );
    const total = developer + community;

    const descriptionKey = normalizeKey(description);
    let variant = "default";
    if (descriptionKey.includes("fluxo de caixa do projeto")) variant = "total";
    else if (descriptionKey.startsWith("(-) impostos (pis/cofins)"))
      variant = "negative";
    else if (descriptionKey.startsWith("(-)")) variant = "expense";
    else if (descriptionKey.startsWith("(=)")) variant = "subtotal";

    return {
      description: description.trim(),
      developer,
      community,
      total,
      variant,
    };
  });

  const dreRows = parsed.map((row) => ({
    description: row.description,
    totalProject: formatSignedCurrencyMi(row.total),
    developer:
      row.developer === 0 ? "—" : formatSignedCurrencyMi(row.developer),
    community:
      row.community === 0 ? "—" : formatSignedCurrencyMi(row.community),
    variant: row.variant,
  }));

  const receitaBruta = parsed.find((row) =>
    normalizeKey(row.description).includes("receita bruta")
  );
  const fluxoFinal = parsed.find((row) =>
    normalizeKey(row.description).includes("fluxo de caixa do projeto")
  );

  const deductions = parsed
    .filter(
      (row) => normalizeKey(row.description).startsWith("(-)") && row.total > 0
    )
    .map((row) => ({
      name: row.description.replace(/^[-()\s]+/, ""),
      value: row.total,
    }));

  const waterfallData = [
    {
      name: "Receita Bruta",
      value: receitaBruta ? round2(receitaBruta.total / 1_000_000) : 0,
      color: "#0284c7",
    },
    ...deductions.map((item) => ({
      name: `(-) ${item.name.slice(0, 18)}`,
      value: round2(-(item.value / 1_000_000)),
      color:
        item.name.includes("IR/CSLL") || item.name.includes("Impostos")
          ? "#ef4444"
          : "#f59e0b",
    })),
    {
      name: "Fluxo de Caixa",
      value: fluxoFinal ? round2(fluxoFinal.total / 1_000_000) : 0,
      color: "#059669",
    },
  ];

  const totalDeductions = deductions.reduce((sum, row) => sum + row.value, 0);
  const sortedDeductions = [...deductions].sort((a, b) => b.value - a.value);
  let cumulative = 0;
  const paretoData = sortedDeductions.map((item) => {
    cumulative += item.value;
    return {
      name: item.name.slice(0, 22),
      cost: round2(item.value / 1_000_000),
      cumulative:
        totalDeductions > 0 ? round2((cumulative / totalDeductions) * 100) : 0,
    };
  });

  return { dreRows, waterfallData, paretoData };
}

function buildFinancialDataFile({
  kpiData,
  smallMetrics,
  annualBarData,
  cashFlowData,
  full40YearCashFlow,
  dreRows,
  waterfallData,
  paretoData,
}) {
  const radarData = [
    { subject: "Potencial VPL", A: 95, B: 65, fullMark: 150 },
    { subject: "Vol. Fluxo Caixa", A: 90, B: 50, fullMark: 150 },
    { subject: "Retorno Aj. Risco", A: 85, B: 95, fullMark: 150 },
    { subject: "Impacto Social", A: 100, B: 40, fullMark: 150 },
    { subject: "Margem %", A: 80, B: 90, fullMark: 150 },
  ];

  return `import type {
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

export const kpiData: KpiItem[] = ${toTs(kpiData)};

export const smallMetrics: SmallMetric[] = ${toTs(smallMetrics)};

export const radarData: RadarDataPoint[] = ${toTs(radarData)};

// Fluxo anual (R$ Mi) com comunidade, desenvolvedor e total.
export const annualBarData: AnnualBarDataPoint[] = ${toTs(annualBarData)};

// Serie resumida (a cada 4 anos) de fluxo total (R$ Mi) para o grafico de area.
export const cashFlowData: CashFlowDataPoint[] = ${toTs(cashFlowData)};

// Serie completa 2024-2064 (R$ Mi): comunidade, desenvolvedor e total.
export const full40YearCashFlow = ${toTs(full40YearCashFlow)} as const;

export const waterfallData: WaterfallDataPoint[] = ${toTs(waterfallData)};

export const paretoData: ParetoDataPoint[] = ${toTs(paretoData)};

export const dreRows: DreRow[] = ${toTs(dreRows)};
`;
}

function main() {
  const kpiRows = parseCsv(FILES.kpi);
  const fluxoRows = parseCsv(FILES.fluxo);
  const dreRowsRaw = parseCsv(FILES.dre);

  const { kpiData, smallMetrics } = buildKpiData(kpiRows);
  const { annualBarData, cashFlowData, full40YearCashFlow } = buildFlowData(
    fluxoRows,
    smallMetrics
  );
  const { dreRows, waterfallData, paretoData } = buildDreData(dreRowsRaw);

  const content = buildFinancialDataFile({
    kpiData,
    smallMetrics,
    annualBarData,
    cashFlowData,
    full40YearCashFlow,
    dreRows,
    waterfallData,
    paretoData,
  });

  fs.writeFileSync(FILES.output, content, "utf8");
  console.log("financial-data.ts atualizado com sucesso.");
}

main();
