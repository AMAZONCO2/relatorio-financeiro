import fs from "node:fs";
import path from "node:path";
import type { BudgetRow, BudgetYearData } from "@/types/financial";

const CSV_FILE_PATH = path.join(
  process.cwd(),
  "data",
  "fisico_financeiro_atividade.csv"
);

// ---------------------------------------------------------------------------
// Helper: arredonda para 2 casas decimais evitando erros de ponto flutuante
// ---------------------------------------------------------------------------
const round2 = (v: number): number => Math.round(v * 100) / 100;
const DEFAULT_BRL_PER_USD = 5.2;

type CsvRecord = Record<string, string>;
type ParsedCsv = {
  headers: string[];
  rows: CsvRecord[];
};

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
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

function parseCsv(filePath: string): ParsedCsv {
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const rows = lines.map(parseCsvLine);
  const headers = rows[0].map((header) => header.trim());

  return {
    headers,
    rows: rows.slice(1).map((row) => {
      const record: CsvRecord = {};
      headers.forEach((header, index) => {
        const fallback = `col_${index}`;
        const key = header || fallback;
        record[key] = (row[index] || "").trim();
      });
      return record;
    }),
  };
}

function parseBrazilianCurrency(value: string): number {
  if (!value) return 0;

  const cleaned = value
    .replace(/\s+/g, "")
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".");

  if (cleaned === "-" || cleaned === "") return 0;

  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? round2(parsed) : 0;
}

function getBrlPerUsd(): number {
  const envRate = Number.parseFloat(process.env.NEXT_PUBLIC_BRL_USD_RATE ?? "");
  if (Number.isFinite(envRate) && envRate > 0) return envRate;
  return DEFAULT_BRL_PER_USD;
}

function normalizeText(value: string): string {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function findHeaderKey(
  headers: string[],
  matcher: (normalizedHeader: string) => boolean
): string {
  const found = headers.find((header) => matcher(normalizeText(header)));
  if (!found) {
    throw new Error("Cabeçalho obrigatório não encontrado no CSV.");
  }
  return found;
}

function getMonthHeaders(headers: string[]): string[] {
  return headers.filter((header) =>
    /^[a-z]{3}\/\d{2}$/i.test(normalizeText(header))
  );
}

function monthKeyToPtBrLabel(monthKey: string): string {
  const [rawMonth, rawYear] = monthKey.toLowerCase().split("/");
  const monthMap: Record<string, string> = {
    jan: "jan.",
    fev: "fev.",
    mar: "mar.",
    abr: "abr.",
    mai: "mai.",
    jun: "jun.",
    jul: "jul.",
    ago: "ago.",
    set: "set.",
    out: "out.",
    nov: "nov.",
    dez: "dez.",
  };

  const month = monthMap[rawMonth] ?? `${rawMonth}.`;
  const fullYear = `20${rawYear}`;
  return `${month} de ${fullYear}`;
}

function getYearLabel(yearIndex: 1 | 2, months: string[]): string {
  const firstYear = months[0]?.split("/")[1];
  const lastYear = months[months.length - 1]?.split("/")[1];
  const start = firstYear ? `20${firstYear}` : "----";
  const end = lastYear ? `20${lastYear}` : "----";
  return `ANO ${yearIndex} (${start} - ${end})`;
}

function isSummaryCategory(category: string): boolean {
  const normalized = normalizeText(category);
  return (
    normalized.includes("gastos totais") ||
    normalized.includes("(sem impostos)")
  );
}

function buildRowsFromCsv(
  csvRows: CsvRecord[],
  categoryKey: string,
  totalSpentKey: string,
  totalBudgetedKey: string,
  monthKeys: readonly string[]
): BudgetRow[] {
  return csvRows
    .map((row) => {
      const category = row[categoryKey]?.trim() ?? "";
      if (!category || isSummaryCategory(category)) return null;

      return {
        category,
        totalSpent: parseBrazilianCurrency(row[totalSpentKey] ?? ""),
        totalBudgeted: parseBrazilianCurrency(row[totalBudgetedKey] ?? ""),
        monthlyValues: monthKeys.map((monthKey) =>
          parseBrazilianCurrency(row[monthKey] ?? "")
        ),
      } satisfies BudgetRow;
    })
    .filter((row): row is BudgetRow => row !== null);
}

// ---------------------------------------------------------------------------
// Helper: recebe as linhas de categoria e devolve as linhas calculadas
//   - GASTOS TOTAIS  = soma de todas as categorias (incluindo IMPOSTOS)
//   - (SEM IMPOSTOS) = GASTOS TOTAIS − IMPOSTOS
// ---------------------------------------------------------------------------
function buildTotalRows(categoryRows: BudgetRow[]): [BudgetRow, BudgetRow] {
  const months = categoryRows[0]?.monthlyValues.length ?? 12;

  const totalSpent = round2(
    categoryRows.reduce((acc, r) => acc + r.totalSpent, 0)
  );
  const totalBudgeted = round2(
    categoryRows.reduce((acc, r) => acc + r.totalBudgeted, 0)
  );
  const monthlyValues = Array.from({ length: months }, (_, i) =>
    round2(categoryRows.reduce((acc, r) => acc + (r.monthlyValues[i] ?? 0), 0))
  );

  const impostos = categoryRows.find(
    (r) => normalizeText(r.category) === "impostos"
  );

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

function getYearTotalBrl(rows: BudgetRow[]): number {
  const totalRow = rows.find((row) => row.isTotal);
  if (totalRow) {
    return round2(totalRow.monthlyValues.reduce((acc, val) => acc + val, 0));
  }
  return round2(
    rows
      .filter((row) => !row.isSubTotal)
      .reduce(
        (acc, row) => acc + row.monthlyValues.reduce((a, b) => a + b, 0),
        0
      )
  );
}

function brlToUsd(valueBrl: number): number {
  return round2(valueBrl / getBrlPerUsd());
}

const parsedCsv = parseCsv(CSV_FILE_PATH);
const categoryKey = findHeaderKey(parsedCsv.headers, (header) =>
  header.includes("orcado")
);
const totalSpentKey = findHeaderKey(
  parsedCsv.headers,
  (header) => header === "total (gasto)"
);
const totalBudgetedKey = findHeaderKey(
  parsedCsv.headers,
  (header) => header === "total (orcado)"
);

const monthHeaders = getMonthHeaders(parsedCsv.headers);
if (monthHeaders.length < 24) {
  throw new Error(
    "CSV inválido: são esperados pelo menos 24 meses para o comparativo de Ano 1 e Ano 2."
  );
}

const ano1MonthKeys = monthHeaders.slice(3, 15);
const ano2MonthKeys = monthHeaders.slice(15, 27);

if (ano1MonthKeys.length !== 12 || ano2MonthKeys.length !== 12) {
  throw new Error(
    "CSV inválido: não foi possível montar blocos de 12 meses para Ano 1 e Ano 2."
  );
}

const ano1Categories = buildRowsFromCsv(
  parsedCsv.rows,
  categoryKey,
  totalSpentKey,
  totalBudgetedKey,
  ano1MonthKeys
);
const ano2Categories = buildRowsFromCsv(
  parsedCsv.rows,
  categoryKey,
  totalSpentKey,
  totalBudgetedKey,
  ano2MonthKeys
);
const ano1Rows = [...ano1Categories, ...buildTotalRows(ano1Categories)];
const ano2Rows = [...ano2Categories, ...buildTotalRows(ano2Categories)];

// ---------------------------------------------------------------------------
// Exportação final com totais calculados dinamicamente via CSV
// ---------------------------------------------------------------------------
export const budgetData: Record<"ano1" | "ano2", BudgetYearData> = {
  ano1: {
    yearLabel: getYearLabel(1, ano1MonthKeys),
    months: ano1MonthKeys.map(monthKeyToPtBrLabel),
    totalDolar: brlToUsd(getYearTotalBrl(ano1Rows)),
    rows: ano1Rows,
  },
  ano2: {
    yearLabel: getYearLabel(2, ano2MonthKeys),
    months: ano2MonthKeys.map(monthKeyToPtBrLabel),
    totalDolar: brlToUsd(getYearTotalBrl(ano2Rows)),
    rows: ano2Rows,
  },
};
