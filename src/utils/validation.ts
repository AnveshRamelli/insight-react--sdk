import { InsightProps } from "../core/types";
import { ValidationError } from "../core/errors";

// Validate properties of Insight component
export function validateInsightProps(props: InsightProps) {
  if (!props.metric) {
    throw new ValidationError("metric is required");
  }

  if (props.type === "contributor" && !props.dimension) {
    throw new ValidationError(
      "dimension is required when type is 'contributor'"
    );
  }

  if (!props.dataResolver) {
    throw new ValidationError("dataResolver is required");
  }
}