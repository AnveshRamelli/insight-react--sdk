import { TimeGrain } from "../core/types";
import { ContributorChartProps } from "../core/types";
import { formatTimeLabel } from "../utils/time";

// Default colors for contributor chart series.
// This can be dynamically generated through a helper function later
const DEFAULT_COLORS = ["#9acbdc", "#f6b1ac", "#8da2fb", "#1f3b63"];

export const transformContributorData = (
  raw: any[],
  ctx: {
    metric: string;
    dimension: string;
    dimensionValues: string[];
    timeGrain: TimeGrain;
  }
): ContributorChartProps => {
  // Transform raw data into chart data points with formatted time labels
  const data = raw.map((row) => {
    const point: Record<string, number | string> = {
      x: formatTimeLabel(row.fromtime, ctx.timeGrain),
    };

    // Add dimension values to point if they exist in the row else default to 0 for data consistency
    ctx.dimensionValues.forEach((dim) => {
      point[dim] = row[dim] ?? 0;
    });

    return point;
  });

  // Construct series metadata for the chart based on dimension values
  const series = ctx.dimensionValues.map((dim, index) => ({
    id: dim,
    label: dim,
    color: DEFAULT_COLORS[index % DEFAULT_COLORS.length],
  }));

  return {
    title: `${ctx.metric} by ${ctx.dimension}`,
    data,
    series,
  };
};
