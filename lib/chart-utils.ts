import type { GlobalSettingsContextType } from "@/contexts/global-settings-context" // Assuming type export
import type { TooltipProps } from "recharts" // For type safety on formatter

// --- Core Chart Palette (from globals.css) ---
export const CHART_PALETTE = {
  primary: "hsl(var(--chart-1))",
  secondary: "hsl(var(--chart-2))",
  accent1: "hsl(var(--chart-3))",
  accent2: "hsl(var(--chart-4))",
  accent3: "hsl(var(--chart-5))",
  positive: "hsl(var(--chart-positive))",
  negative: "hsl(var(--chart-negative))",
  warning: "hsl(var(--chart-warning))",
  grayLight: "hsl(var(--chart-gray-light))",
  grayMedium: "hsl(var(--chart-gray-medium))",
  mutedForeground: "hsl(var(--muted-foreground))",
  background: "hsl(var(--background))", // For dot fills on lines
}

// --- Common Chart Element Styles ---
export const commonGridProps = {
  stroke: CHART_PALETTE.grayLight,
  strokeDasharray: "3 3",
  opacity: 0.6,
}

export const commonAxisStyles = {
  tickLine: false,
  axisLine: { stroke: CHART_PALETTE.grayMedium, opacity: 0.8 },
  fontSize: 11, // McKinsey style often uses slightly smaller, crisp fonts for axes
  stroke: CHART_PALETTE.mutedForeground,
}

export const commonXAxisProps = {
  ...commonAxisStyles,
  dy: 8, // Increased downward offset for better spacing
  padding: { left: 10, right: 10 }, // Add some padding
}

export const commonYAxisProps = (width = 60) => ({
  ...commonAxisStyles,
  width: width,
  dx: -5, // Slight inward offset
  padding: { top: 10, bottom: 10 }, // Add some padding
})

export const commonLegendProps = {
  wrapperStyle: {
    fontSize: "12px",
    paddingTop: "15px", // More space for legend
    marginLeft: "20px", // Align with typical chart content
  },
  iconSize: 10,
}

// --- Common Series Styles ---
export const commonLineStyle = {
  strokeWidth: 2.5,
  dot: { r: 4, strokeWidth: 1.5, fill: CHART_PALETTE.background, stroke: "currentColor" },
  activeDot: { r: 6, strokeWidth: 2, fill: CHART_PALETTE.background, stroke: "currentColor" },
}

export const commonBarStyle = {
  radius: [3, 3, 0, 0] as [number, number, number, number], // Slightly less radius for a crisper look
  barSize: 18, // Standardized bar size
}

// --- Tooltip Formatter ---
// This function generates a Recharts tooltip formatter
export const getCurrencyTooltipFormatter = (
  globalSettings: Pick<GlobalSettingsContextType, "formatCurrency" | "selectedCurrency">,
  valueInSmallestUnit?: boolean, // If true, value is in paisa/cents, else in base unit (e.g. Rupee/Dollar)
  unitMultiplier = 10000000, // Default for Crores
): TooltipProps<number, string>["formatter"] => {
  return (value, name, item) => {
    // Check if this specific dataKey needs currency formatting
    // (Could be based on `item.dataKey` or `name` if names are consistent)
    const keysToFormat = ["disbursed", "funded", "revenue", "mrr", "valueAsNumber", "avgValuation"]
    const namesToFormat = [
      `Disbursed (${globalSettings.selectedCurrency.code} Cr)`,
      `Target (${globalSettings.selectedCurrency.code} Cr)`,
      `Revenue (${globalSettings.selectedCurrency.code})`,
      `Avg Valuation (${globalSettings.selectedCurrency.code} Cr)`,
    ]

    if (
      (typeof item?.dataKey === "string" && keysToFormat.includes(item.dataKey)) ||
      (typeof name === "string" && namesToFormat.some((n) => name.startsWith(n.split(" (")[0])))
    ) {
      const numericValue = Number(value)
      if (valueInSmallestUnit) {
        return globalSettings.formatCurrency(numericValue) // formatCurrency expects value in smallest unit (e.g. paisa)
      }
      return globalSettings.formatCurrency(numericValue * unitMultiplier) // Convert from Cr/Lakh etc. to smallest unit
    }
    return String(value)
  }
}

// --- Pie Chart Specifics ---
export const commonPieLabel = ({ name, percent }: { name: string; percent: number }) => {
  if (!name || typeof percent !== "number") return ""
  const namePart = name.split(" ")[0] // Get first word for brevity
  return `${namePart}: ${(percent * 100).toFixed(0)}%`
}

export const commonPieProps = {
  cx: "50%",
  cy: "50%",
  outerRadius: "80%", // Relative sizing
  labelLine: false,
}

// --- Dynamic Color Assignment for Series ---
// (Used for charts where colors aren't predefined in data)
export const DYNAMIC_CHART_COLORS = [
  CHART_PALETTE.primary,
  CHART_PALETTE.secondary,
  CHART_PALETTE.accent1,
  CHART_PALETTE.accent2,
  CHART_PALETTE.accent3,
  "hsl(var(--chart-accent-teal))", // Retaining some from previous for variety if needed
  "hsl(var(--chart-accent-purple))",
]
