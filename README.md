# Insight React SDK

A lightweight, extensible **React frontend SDK** for rendering analytical insights such as **trend** and **contributor** views from raw metric data.  
The SDK abstracts data transformation, time handling, and visualization selection to provide a clean, developer friendly API.


## Features

- **Single public API**: `<Insight />`
- **Backend-agnostic** via resolver functions
- SDK-owned **time range calculation**
- Dedicated **data transformation layer**
- Automatic **chart selection** based on insight type
- Clear separation of responsibilities:
  - data fetching
  - transformation
  - visualization
-  Built-in loading, error, and empty states
-  Easy to extend with new insight types

---

## Installation

```
npm install insight-react-sdk
```
## usage    

### Step 1: Import the Insight component
```
import { Insight } from "insight-react-sdk";
```

### Step 2: Implement a data resolver

The resolver is responsible for returning raw metric data.
The SDK handles everything else.

```

const dataResolver = async (metric, grain, fromTime, toTime) => {
  return [
    { fromtime: "01-01-2025", totime: "07-01-2025", Revenue: 120 },
    { fromtime: "08-01-2025", totime: "14-01-2025", Revenue: 180 },
  ];
};
```

### Step 3: Render a Trend Insight
```
export default function TrendExample() {
  return (
    <Insight
      type="trend"
      metric="Revenue"
      timeGrain="weekly"
      timeRange={30}
      dataResolver={dataResolver}
    />
  );
}
```

### Step 4: Render a Contributor Insight

For contributor insights, provide a dimension and a dimension values resolver.
```
const contributorDataResolver = async (metric, grain, fromTime, toTime) => {
  return [
    { fromtime: "01-01-2025", totime: "07-01-2025", India: 60, USA: 40 },
    { fromtime: "08-01-2025", totime: "14-01-2025", India: 30, USA: 70 },
  ];
};
```
```
const dimensionValuesResolver = async () => {
  return ["India", "USA"];
};
```
```
export default function ContributorExample() {
  return (
    <Insight
      type="contributor"
      metric="Revenue"
      dimension="location"
      timeGrain="weekly"
      timeRange={30}
      dataResolver={contributorDataResolver}
      dimensionValuesResolver={dimensionValuesResolver}
    />
  );
}
```
## Insight Types

### Trend Insight

- Displays how a single metric changes over time

- Uses line/area visualization

- X-axis represents time

- Y-axis represents the metric value

### Contributor Insight

- Displays how different dimension values contribute to a metric

- Uses stacked bar visualization

- Each dimension value is rendered as a separate series


## Time Handling

- timeRange is specified in days

- The SDK calculates fromTime and toTime internally

- timeGrain controls aggregation semantics

- Monthly insights display labels as Jan 2025, Feb 2025, etc.

- Daily and weekly labels are passed through as provided

## Extensibility

- New insight types can be added by:

- Creating a new transformer

- Creating a corresponding chart

- Registering both internally

- No changes are required in the public API.

## Notes

- The SDK does not perform data fetching directly

- The consuming application controls data sources

- No external date or chart configuration libraries are required