import { useEffect, useState } from "react";
import { InsightProps, TransformedInsightData } from "../core/types";
import { transformerRegistry } from "../registry/transformerRegistry";

export function useInsightData(
  props: InsightProps,
  fromTime: Date,
  toTime: Date
) {
  // State management for data, loading, and error
  const [data, setData] = useState<TransformedInsightData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // To avoid setting state on unmounted component
    let mounted = true;

    // Function to fetch and transform data
    async function run() {
      try {
        setLoading(true);
        setError(null);

        const rawData = await props.dataResolver(
          props.metric,
          props.timeGrain,
          fromTime,
          toTime
        );

        // Fetch dimension values if needed
        let dimensionValues: string[] = [];

        if (props.type === "contributor" && props.dimensionValuesResolver) {
          dimensionValues = await props.dimensionValuesResolver(
            props.metric,
            props.dimension!
          );
        }

        // Transform data using the appropriate transformer
        const transformer = transformerRegistry[props.type];
        const transformed = transformer(rawData, {
          metric: props.metric,
          dimension: props.dimension,
          dimensionValues,
          timeGrain: props.timeGrain,
        });

        if (mounted) setData(transformed);
      } catch (e: any) {

        if (mounted) setError(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    run();

    // Cleanup function
    return () => {
      mounted = false;
    };
  }, [
    props.type,
    props.metric,
    props.dimension,
    props.timeGrain,
    props.dataResolver,
    props.dimensionValuesResolver,
    fromTime,
    toTime,
  ]);

  return { data, loading, error };
}
