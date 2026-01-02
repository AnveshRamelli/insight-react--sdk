import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { ContributorChartProps } from "../core/types";

export function ContributorChart({
  title,
  data,
  series,
}: ContributorChartProps) {
  if (!data.length || !series.length) return null;

  return (
    <div>
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      <ResponsiveContainer width="100%" minHeight={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Legend />

          {series.map((s) => (
            <Bar
              key={s.id}
              dataKey={s.id}
              stackId="total"
              fill={s.color}
              name={s.label ?? s.id}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
