
import { ContributorChart } from "../charts/contributorChart";
import { TrendChart } from "../charts/trendChart";
import { InsightType } from "../core/types";

// Registry mapping insight types to their corresponding chart components

export const insightRegistry: Record<InsightType, any> = {
  trend: TrendChart,
  contributor: ContributorChart
};