import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "00:00", value: 2400, value2: 1800 },
  { name: "04:00", value: 1398, value2: 2200 },
  { name: "08:00", value: 9800, value2: 6800 },
  { name: "12:00", value: 3908, value2: 4800 },
  { name: "16:00", value: 4800, value2: 3800 },
  { name: "20:00", value: 3800, value2: 4300 },
  { name: "24:00", value: 4300, value2: 2100 },
];

export function AreaChartCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      whileHover={{ scale: 1.01 }}
      className="glass-card rounded-2xl p-6 transition-all duration-300 hover:glow-secondary"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Network Traffic</h3>
          <p className="text-sm text-muted-foreground">Real-time bandwidth monitoring</p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Inbound</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-muted-foreground">Outbound</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6549" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#FF6549" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF1766" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#EF1766" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(280 40% 20%)" />
            <XAxis
              dataKey="name"
              stroke="hsl(280 10% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(280 10% 65%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(280 60% 12%)",
                border: "1px solid hsl(280 40% 20%)",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
              labelStyle={{ color: "hsl(0 0% 98%)" }}
              itemStyle={{ color: "hsl(280 10% 65%)" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#FF6549"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
            <Area
              type="monotone"
              dataKey="value2"
              stroke="#EF1766"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue2)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}