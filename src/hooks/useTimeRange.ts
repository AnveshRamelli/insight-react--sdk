import { useMemo } from "react";
import { calculateTimeRange } from "../utils/time";

// Hook to calculate time range based on input days
export function useTimeRange(timeRange: number) {
  return useMemo(() => calculateTimeRange(timeRange), [timeRange]);
}