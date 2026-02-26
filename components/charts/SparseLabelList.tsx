"use client";

import { Text } from "recharts";

const DENSE_THRESHOLD = 12;
const MAX_LABELS_WHEN_DENSE = 6;

/**
 * Retorna true se o label deve ser exibido.
 * Em gráficos densos (> DENSE_THRESHOLD pontos), mostra apenas ~MAX_LABELS_WHEN_DENSE labels.
 */
function shouldShowLabel(
  index: number,
  totalLength: number,
  step: number
): boolean {
  if (totalLength <= DENSE_THRESHOLD) return true;
  return index % step === 0 || index === 0 || index === totalLength - 1;
}

/**
 * Content para LabelList que exibe labels de forma esparsa em gráficos densos,
 * evitando sobreposição quando há muitos pontos.
 */
export function createSparseLabelContent(
  totalLength: number,
  style?: React.CSSProperties
): (props: Record<string, unknown>) => React.ReactNode {
  const step = Math.max(1, Math.ceil(totalLength / MAX_LABELS_WHEN_DENSE));

  return function SparseLabelContent(props: Record<string, unknown>) {
    const index = (props.index as number) ?? 0;
    const value = props.value;
    if (value == null || value === "") return null;
    if (!shouldShowLabel(index, totalLength, step)) return null;

    const displayValue = value != null ? String(value) : "";
    return (
      <Text
        {...props}
        style={{
          fontSize: 9,
          fontWeight: 700,
          fill: "#475569",
          ...style,
        }}
      >
        {displayValue}
      </Text>
    );
  };
}
