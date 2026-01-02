import { TimeGrain } from "../core/types";
import { TrendChartProps } from "../core/types";
import { formatTimeLabel } from "../utils/time";

export const transformTrendData = (
  raw: any[],
  ctx: { metric: string; timeGrain: TimeGrain }
): TrendChartProps => {
  // Transform raw data into chart data points with formatted time labels
  return {
    title: ctx.metric,
    data: raw.map((bucket) => ({
      x: formatTimeLabel(bucket.fromtime, ctx.timeGrain),
      y: bucket[ctx.metric],
    })),
  };
};
