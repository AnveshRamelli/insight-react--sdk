import { TimeGrain } from "../core/types";

// Calculate time range based on number of days
export const calculateTimeRange = (days: number) => {
  const toTime = new Date();
  const fromTime = new Date();
  fromTime.setDate(toTime.getDate() - days);

  return { fromTime, toTime };
}

// Format time label based on time grain
export function formatTimeLabel(
  rawDate: string,
  grain: TimeGrain
): string {
  if (grain !== "monthly") {
    return rawDate;
  }

  // Convert "DD-MM-YYYY" to "MMM YYYY" for monthly grain
  const [day, month, year] = rawDate.split("-");

  const isoDate = `${year}-${month}-${day}`;
  const date = new Date(isoDate);

  return date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}