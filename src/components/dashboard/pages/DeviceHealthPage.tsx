import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  Thermometer,
  Battery,
  Clock,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

interface HealthMetric {
  id: string;
  device: string;
  status: "healthy" | "warning" | "critical";
  temperature: number;
  battery: number;
  uptime: string;
  lastCheck: string;
  trend: "up" | "down" | "stable";
  history: number[];
}

const healthData: HealthMetric[] = [
  { id: "d1", device: "Gateway Alpha", status: "healthy", temperature: 42, battery: 98, uptime: "99.9%", lastCheck: "2 min ago", trend: "up", history: [85, 88, 87, 90, 92, 94, 96] },
  { id: "d2", device: "Sensor Hub Beta", status: "healthy", temperature: 38, battery: 87, uptime: "99.7%", lastCheck: "1 min ago", trend: "stable", history: [90, 91, 89, 92, 90, 91, 90] },
  { id: "d3", device: "Edge Node Gamma", status: "warning", temperature: 68, battery: 45, uptime: "98.2%", lastCheck: "5 min ago", trend: "down", history: [95, 92, 88, 85, 80, 76, 72] },
  { id: "d4", device: "Router Delta", status: "healthy", temperature: 35, battery: 100, uptime: "100%", lastCheck: "30 sec ago", trend: "up", history: [88, 90, 91, 93, 95, 97, 99] },
  { id: "d5", device: "Sensor Epsilon", status: "critical", temperature: 78, battery: 12, uptime: "85.4%", lastCheck: "15 min ago", trend: "down", history: [80, 72, 65, 55, 42, 30, 20] },
  { id: "d6", device: "Gateway Zeta", status: "healthy", temperature: 40, battery: 92, uptime: "99.5%", lastCheck: "1 min ago", trend: "stable", history: [91, 92, 91, 92, 91, 92, 92] },
];

const diagnosticData = [
  { name: "Mon", value: 95 },
  { name: "Tue", value: 92 },
  { name: "Wed", value: 88 },
  { name: "Thu", value: 94 },
  { name: "Fri", value: 97 },
  { name: "Sat", value: 99 },
  { name: "Sun", value: 96 },
];

export function DeviceHealthPage() {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-emerald-400";
      case "warning": return "text-amber-400";
      case "critical": return "text-red-400";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "healthy": return "bg-emerald-400/20";
      case "warning": return "bg-amber-400/20";
      case "critical": return "bg-red-400/20";
      default: return "bg-muted";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-400" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const healthySummary = healthData.filter(d => d.status === "healthy").length;
  const warningSummary = healthData.filter(d => d.status === "warning").length;
  const criticalSummary = healthData.filter(d => d.status === "critical").length;

  return (
    <div className="space-y-6 px-4 md:px-0 py-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1">
          Device Health Monitor
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Real-time diagnostics and telemetry analysis
        </p>
      </motion.div>

      {/* Health Summary - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-4 flex sm:flex-col items-center gap-4 sm:gap-0 text-center border-l-4 border-l-emerald-400"
        >
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2" />
          <div className="text-left sm:text-center">
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{healthySummary}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Healthy Devices</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-4 flex sm:flex-col items-center gap-4 sm:gap-0 text-center border-l-4 border-l-amber-400"
        >
          <AlertCircle className="w-8 h-8 text-amber-400 mb-2" />
          <div className="text-left sm:text-center">
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{warningSummary}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Active Warnings</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-4 flex sm:flex-col items-center gap-4 sm:gap-0 text-center border-l-4 border-l-red-400"
        >
          <HeartPulse className="w-8 h-8 text-red-400 mb-2" />
          <div className="text-left sm:text-center">
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{criticalSummary}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Critical Errors</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card rounded-2xl p-4 sm:p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Device Status</h3>
          <div className="space-y-3">
            {healthData.map((device, i) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                onClick={() => setSelectedDevice(selectedDevice === device.id ? null : device.id)}
                className={`p-3 sm:p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedDevice === device.id
                    ? "bg-primary/10 border-primary/40 shadow-lg shadow-primary/5"
                    : "bg-muted/20 border-transparent hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${getStatusBg(device.status)}`}>
                    <HeartPulse className={`w-5 h-5 sm:w-6 sm:h-6 ${getStatusColor(device.status)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-foreground truncate">{device.device}</p>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-tight ${getStatusBg(device.status)} ${getStatusColor(device.status)}`}>
                        {device.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">Checked: {device.lastCheck}</p>
                  </div>

                  {/* Telemetry (Desktop Only in Row) */}
                  <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm font-medium">{device.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Battery className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm font-medium">{device.battery}%</span>
                    </div>
                  </div>

                  {/* Trend & Sparkline */}
                  <div className="flex items-center gap-3">
                    {getTrendIcon(device.trend)}
                    <div className="w-12 sm:w-20 h-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={device.history.map((v, i) => ({ i, v }))}>
                          <Line
                            type="monotone"
                            dataKey="v"
                            stroke={device.status === "critical" ? "#f87171" : "hsl(var(--primary))"}
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Mobile Expanded Details */}
                <AnimatePresence>
                  {selectedDevice === device.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-border/40">
                        <div className="p-2 bg-background/40 rounded-lg border border-border/20">
                          <p className="text-[10px] uppercase text-muted-foreground font-bold">Temp</p>
                          <p className="text-sm font-bold">{device.temperature}°C</p>
                        </div>
                        <div className="p-2 bg-background/40 rounded-lg border border-border/20">
                          <p className="text-[10px] uppercase text-muted-foreground font-bold">Battery</p>
                          <p className="text-sm font-bold">{device.battery}%</p>
                        </div>
                        <div className="p-2 bg-background/40 rounded-lg border border-border/20">
                          <p className="text-[10px] uppercase text-muted-foreground font-bold">Uptime</p>
                          <p className="text-sm font-bold">{device.uptime}</p>
                        </div>
                        <div className="p-2 bg-background/40 rounded-lg border border-border/20">
                          <p className="text-[10px] uppercase text-muted-foreground font-bold">Status</p>
                          <p className={`text-sm font-bold capitalize ${getStatusColor(device.status)}`}>{device.status}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Diagnostics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6 flex flex-col"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Health Score</h3>
          <div className="h-[250px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diagnosticData}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={32}>
                  {diagnosticData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={entry.value >= 95 ? "#34d399" : entry.value >= 90 ? "hsl(var(--primary))" : "#fbbf24"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-auto p-4 bg-muted/20 rounded-xl border border-border/30">
            <p className="text-xs text-muted-foreground font-medium">Average Health Score</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-foreground">94.4%</p>
              <span className="text-emerald-400 text-sm font-bold mb-1">↑ 2.1%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}