import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TrendChartProps } from "../core/types";

export function TrendChart({ title, data }: TrendChartProps) {
  if (!data.length) return null;
  return (
    <div>
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      <ResponsiveContainer width="100%" minHeight={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="x" />
          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="y"
            stroke="#1e3a8a"
            strokeWidth={2}
            fill="url(#trendGradient)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
