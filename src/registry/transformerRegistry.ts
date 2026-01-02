
import { InsightType } from "../core/types";
import { transformContributorData } from "../transformers/contributor.transformer";
import { transformTrendData } from "../transformers/trend.transformer";

// Registry mapping insight types to their corresponding data transformer functions

export const transformerRegistry: Record<InsightType, Function> = {
  trend: transformTrendData,
  contributor: transformContributorData
};