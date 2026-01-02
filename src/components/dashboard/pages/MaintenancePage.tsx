import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  Wrench,
  Calendar,
  CheckCircle,
  XCircle,
  ChevronRight,
  TrendingUp,
  Zap,
  Shield,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

interface Alert {
  id: string;
  device: string;
  type: "critical" | "warning" | "info";
  message: string;
  prediction: string;
  probability: number;
  timeToFailure: string;
  createdAt: string;
}

interface ScheduledTask {
  id: string;
  title: string;
  device: string;
  date: string;
  status: "pending" | "completed" | "overdue";
  priority: "high" | "medium" | "low";
}

const alerts: Alert[] = [
  {
    id: "a1",
    device: "Sensor Hub Beta",
    type: "critical",
    message: "Bearing wear detected - replacement required",
    prediction: "Component failure predicted",
    probability: 94,
    timeToFailure: "~72 hours",
    createdAt: "2 hours ago",
  },
  {
    id: "a2",
    device: "Edge Node Gamma",
    type: "warning",
    message: "Fan speed degradation noticed",
    prediction: "Cooling efficiency dropping",
    probability: 76,
    timeToFailure: "~2 weeks",
    createdAt: "5 hours ago",
  },
  {
    id: "a3",
    device: "Gateway Alpha",
    type: "info",
    message: "Firmware update available",
    prediction: "Security patch recommended",
    probability: 100,
    timeToFailure: "N/A",
    createdAt: "1 day ago",
  },
];

const scheduledTasks: ScheduledTask[] = [
  { id: "t1", title: "Replace Sensor Hub Beta bearing", device: "Sensor Hub Beta", date: "Dec 24, 2024", status: "pending", priority: "high" },
  { id: "t2", title: "Calibrate temperature sensors", device: "All Sensors", date: "Dec 26, 2024", status: "pending", priority: "medium" },
  { id: "t3", title: "Network security audit", device: "Gateway Alpha", date: "Dec 28, 2024", status: "pending", priority: "high" },
  { id: "t4", title: "Battery replacement", device: "Edge Node Gamma", date: "Dec 20, 2024", status: "overdue", priority: "high" },
  { id: "t5", title: "Firmware update", device: "Router Delta", date: "Dec 18, 2024", status: "completed", priority: "low" },
];

const predictionAccuracy = [
  { name: "Accuracy", value: 87, fill: "hsl(var(--primary))" },
];

const maintenanceStats = [
  { name: "Completed", value: 45, color: "#34d399" },
  { name: "Pending", value: 12, color: "hsl(var(--primary))" },
  { name: "Overdue", value: 3, color: "#f87171" },
];

export function MaintenancePage() {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical": return { text: "text-red-400", bg: "bg-red-400/20", border: "border-red-400" };
      case "warning": return { text: "text-amber-400", bg: "bg-amber-400/20", border: "border-amber-400" };
      case "info": return { text: "text-blue-400", bg: "bg-blue-400/20", border: "border-blue-400" };
      default: return { text: "text-muted-foreground", bg: "bg-muted", border: "border-border" };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed": return { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/20" };
      case "overdue": return { icon: XCircle, color: "text-red-400", bg: "bg-red-400/20" };
      default: return { icon: Clock, color: "text-amber-400", bg: "bg-amber-400/20" };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-400";
      case "medium": return "bg-amber-400";
      case "low": return "bg-emerald-400";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
          Predictive Maintenance
        </h1>
        <p className="text-muted-foreground">
          AI-powered failure prediction and maintenance scheduling
        </p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Alerts", value: "3", icon: AlertTriangle, color: "text-accent" },
          { label: "Scheduled Tasks", value: "12", icon: Calendar, color: "text-primary" },
          { label: "Prediction Accuracy", value: "87%", icon: TrendingUp, color: "text-emerald-400" },
          { label: "Avg. Uptime", value: "99.2%", icon: Shield, color: "text-blue-400" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-xl p-4"
          >
            <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Predictive Alerts</h3>
            <span className="ml-auto px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full animate-glow">
              {alerts.length} Active
            </span>
          </div>

          <div className="space-y-3">
            {alerts.map((alert, i) => {
              const colors = getAlertColor(alert.type);
              const isExpanded = expandedAlert === alert.id;

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`rounded-xl border-l-4 ${colors.border} overflow-hidden`}
                >
                  <div
                    onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}
                    className={`p-4 cursor-pointer ${colors.bg} hover:bg-muted/50 transition-colors`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${colors.bg}`}>
                        <Zap className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full uppercase ${colors.bg} ${colors.text}`}>
                            {alert.type}
                          </span>
                          <span className="text-xs text-muted-foreground">{alert.createdAt}</span>
                        </div>
                        <p className="text-sm font-medium text-foreground">{alert.device}</p>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        className="text-muted-foreground"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-border/50"
                      >
                        <div className="p-4 bg-background/50 grid grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">Failure Probability</p>
                            <p className={`text-xl font-bold ${colors.text}`}>{alert.probability}%</p>
                          </div>
                          <div className="text-center p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">Time to Failure</p>
                            <p className="text-xl font-bold text-foreground">{alert.timeToFailure}</p>
                          </div>
                          <div className="text-center p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">Recommendation</p>
                            <p className="text-sm font-medium text-primary">{alert.prediction}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Prediction Accuracy */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">AI Accuracy</h3>
            <div className="relative h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="90%"
                  data={predictionAccuracy}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                    background={{ fill: 'hsl(var(--muted))' }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-4xl font-bold text-foreground">87%</p>
                <p className="text-sm text-muted-foreground">Accuracy</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Task Distribution</h3>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={maintenanceStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {maintenanceStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {maintenanceStats.map((stat) => (
                <div key={stat.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }} />
                  <span className="text-xs text-muted-foreground">{stat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scheduled Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Scheduled Maintenance</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Priority</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Task</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Device</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Due Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {scheduledTasks.map((task, i) => {
                const status = getStatusBadge(task.status);
                const StatusIcon = status.icon;

                return (
                  <motion.tr
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">{task.title}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{task.device}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{task.date}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${status.bg} ${status.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        <span className="capitalize">{task.status}</span>
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
