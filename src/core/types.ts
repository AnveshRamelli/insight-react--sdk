export type InsightType = "trend" | "contributor";
export type TimeGrain = "daily" | "weekly" | "monthly";


 // Base props shared by all insights

export interface BaseInsightProps {
  metric: string;
  timeGrain: TimeGrain;
  timeRange: number; // days
}

// Data resolver function types
export type DataResolver = (
  metric: string,
  grain: TimeGrain,
  fromTime: Date,
  toTime: Date
) => Promise<Record<string, any>[]>;

// Dimension values resolver function type
export type DimensionValuesResolver = (
  metric: string,
  dimension: string
) => Promise<string[]>;

// Public Insight component props 
export interface InsightProps extends BaseInsightProps {
  type: InsightType;
  dimension?: string;

  dataResolver: DataResolver;
  dimensionValuesResolver?: DimensionValuesResolver;
}

// Time range interface
export interface TimeRange {
  fromTime: Date;
  toTime: Date;
}

// Transformed data structures for charts
export interface TrendPoint {
  x: string;
  y: number;
}

// Base Chart props interfaces
export interface ChartProps {
  title: string;
}

// Contributor series interface
export interface ContributorSeries {
  id: string;
  label: string;
  color: string;
}

// Trend chart props interface
export interface TrendChartProps extends ChartProps {
  data: TrendPoint[];
}

// Contributor chart props interface
export interface ContributorChartProps extends ChartProps {
  data: Record<string, number | string>[];
  series: ContributorSeries[];
}

// Union type for transformed insight data
export type TransformedInsightData = TrendChartProps | ContributorChartProps;