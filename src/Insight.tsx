import { InsightProps } from "./core/types";
import { validateInsightProps } from "./utils/validation";
import { useTimeRange } from "./hooks/useTimeRange";
import { useInsightData } from "./hooks/useInsightData";
import { Loading } from "./states/loading";
import { ErrorState } from "./states/error";
import { Empty } from "./states/empty";
import { insightRegistry } from "./registry/insightRegistry";
import { useMemo } from "react";

// Main Insight component - Public API
export function Insight(props: InsightProps) {
  // Validate props on each render
  useMemo(() => validateInsightProps(props), [props]);
  // Get resolver ready time range using custom hook
  const { fromTime, toTime } = useTimeRange(props.timeRange);
  // Fetch transformed data using custom hook
  const { data, loading, error } = useInsightData(props, fromTime, toTime);

  if (loading) return <Loading />;
  if (error) return <ErrorState error={error} />;
  if (!data) return <Empty />;

  // Get the appropriate chart component from registry
  const Chart = insightRegistry[props.type];
  return <Chart {...data} />;
}
