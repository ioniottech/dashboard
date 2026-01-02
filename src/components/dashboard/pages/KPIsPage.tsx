import { motion } from "framer-motion";
import {
  Gauge,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  Clock,
  Activity,
  Server,
  Wifi,
  HardDrive,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import { GaugeCard } from "../GaugeCard";

const performanceData = [
  { month: "Jan", throughput: 820, latency: 45, uptime: 99.2 },
  { month: "Feb", throughput: 890, latency: 42, uptime: 99.5 },
  { month: "Mar", throughput: 920, latency: 38, uptime: 99.7 },
  { month: "Apr", throughput: 880, latency: 41, uptime: 99.4 },
  { month: "May", throughput: 950, latency: 35, uptime: 99.8 },
  { month: "Jun", throughput: 1020, latency: 32, uptime: 99.9 },
];

const radarData = [
  { metric: "Uptime", value: 98, fullMark: 100 },
  { metric: "Speed", value: 86, fullMark: 100 },
  { metric: "Security", value: 92, fullMark: 100 },
  { metric: "Efficiency", value: 78, fullMark: 100 },
  { metric: "Reliability", value: 95, fullMark: 100 },
  { metric: "Scalability", value: 84, fullMark: 100 },
];

const kpiCards = [
  { title: "System Uptime", value: "99.97%", change: "+0.12%", trend: "up", icon: Activity, color: "emerald" },
  { title: "Avg Response Time", value: "12ms", change: "-3ms", trend: "up", icon: Clock, color: "primary" },
  { title: "Data Throughput", value: "1.2 TB/h", change: "+15%", trend: "up", icon: HardDrive, color: "accent" },
  { title: "Active Connections", value: "2,847", change: "+124", trend: "up", icon: Wifi, color: "primary" },
  { title: "Error Rate", value: "0.02%", change: "-0.01%", trend: "up", icon: Zap, color: "emerald" },
  { title: "Server Load", value: "67%", change: "+5%", trend: "down", icon: Server, color: "amber" },
];

const categoryKPIs = [
  { category: "Network", kpis: [
    { name: "Bandwidth Utilization", value: 78, target: 85 },
    { name: "Packet Loss Rate", value: 0.1, target: 0.5 },
    { name: "Jitter", value: 2.3, target: 5 },
  ]},
  { category: "Compute", kpis: [
    { name: "CPU Utilization", value: 67, target: 80 },
    { name: "Memory Usage", value: 54, target: 75 },
    { name: "Disk I/O", value: 42, target: 70 },
  ]},
  { category: "Application", kpis: [
    { name: "Request Rate", value: 1250, target: 2000 },
    { name: "Success Rate", value: 99.8, target: 99.5 },
    { name: "Queue Length", value: 12, target: 50 },
  ]},
];

export function KPIsPage() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4" />;
      case "down": return <TrendingDown className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = (trend: string, isGood: boolean = true) => {
    if (trend === "up") return isGood ? "text-emerald-400" : "text-red-400";
    if (trend === "down") return isGood ? "text-red-400" : "text-emerald-400";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
          Infrastructure KPIs
        </h1>
        <p className="text-muted-foreground">
          Key performance indicators and system metrics
        </p>
      </motion.div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map((kpi, i) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.03, y: -2 }}
            className="glass-card rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <kpi.icon className={`w-5 h-5 ${
                kpi.color === "emerald" ? "text-emerald-400" :
                kpi.color === "amber" ? "text-amber-400" :
                kpi.color === "accent" ? "text-accent" : "text-primary"
              }`} />
              <span className={`text-xs flex items-center gap-0.5 ${
                getTrendColor(kpi.trend, kpi.title !== "Server Load")
              }`}>
                {getTrendIcon(kpi.trend)}
                {kpi.change}
              </span>
            </div>
            <p className="text-xl font-bold text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground">{kpi.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Gauges Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GaugeCard title="Network Health" value={92} max={100} unit="%" color="primary" delay={0} />
        <GaugeCard title="System Load" value={67} max={100} unit="%" color="accent" delay={0.1} />
        <GaugeCard title="Storage Used" value={78} max={100} unit="%" color="secondary" delay={0.2} />
        <GaugeCard title="Memory Usage" value={54} max={100} unit="%" color="primary" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Performance Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={performanceData}>
                <defs>
                  <linearGradient id="throughputGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="throughput"
                  fill="url(#throughputGradient)"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="latency"
                  stroke="hsl(var(--accent))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--accent))', strokeWidth: 0, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Throughput (GB/h)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-xs text-muted-foreground">Latency (ms)</span>
            </div>
          </div>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">System Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />
                <Radar
                  name="Performance"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Category KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryKPIs.map((category, i) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Gauge className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">{category.category}</h3>
            </div>

            <div className="space-y-4">
              {category.kpis.map((kpi) => {
                const percentage = (kpi.value / kpi.target) * 100;
                const isGood = kpi.name.includes("Loss") || kpi.name.includes("Jitter") || kpi.name.includes("Queue")
                  ? kpi.value <= kpi.target
                  : kpi.value >= kpi.target * 0.8;

                return (
                  <div key={kpi.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{kpi.name}</span>
                      <span className={`text-sm font-medium ${isGood ? "text-emerald-400" : "text-amber-400"}`}>
                        {kpi.value}{kpi.name.includes("Rate") && kpi.value > 100 ? "" : "%"}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        className={`h-full rounded-full ${
                          isGood ? "bg-gradient-primary" : "bg-amber-400"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
