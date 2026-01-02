import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Power,
  RefreshCw,
  Settings,
  Cpu,
  HardDrive,
  MemoryStick,
  Thermometer,
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface ServerNode {
  id: string;
  name: string;
  location: string;
  status: "running" | "stopped" | "maintenance";
  cpu: number;
  memory: number;
  storage: number;
  temperature: number;
  uptime: string;
  tasks: number;
  history: number[];
}

const servers: ServerNode[] = [
  {
    id: "s1",
    name: "Production Server 01",
    location: "US-East-1",
    status: "running",
    cpu: 67,
    memory: 54,
    storage: 78,
    temperature: 42,
    uptime: "45d 12h",
    tasks: 24,
    history: [60, 65, 62, 70, 68, 67, 65],
  },
  {
    id: "s2",
    name: "Production Server 02",
    location: "US-East-1",
    status: "running",
    cpu: 45,
    memory: 62,
    storage: 45,
    temperature: 38,
    uptime: "32d 8h",
    tasks: 18,
    history: [40, 45, 50, 48, 46, 45, 44],
  },
  {
    id: "s3",
    name: "Staging Server",
    location: "EU-West-1",
    status: "running",
    cpu: 23,
    memory: 35,
    storage: 32,
    temperature: 35,
    uptime: "12d 4h",
    tasks: 8,
    history: [20, 25, 22, 28, 24, 23, 22],
  },
  {
    id: "s4",
    name: "Development Server",
    location: "EU-West-1",
    status: "maintenance",
    cpu: 0,
    memory: 0,
    storage: 56,
    temperature: 28,
    uptime: "0d 0h",
    tasks: 0,
    history: [50, 45, 40, 30, 20, 10, 0],
  },
  {
    id: "s5",
    name: "Backup Server",
    location: "AP-South-1",
    status: "stopped",
    cpu: 0,
    memory: 0,
    storage: 92,
    temperature: 25,
    uptime: "0d 0h",
    tasks: 0,
    history: [0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "s6",
    name: "Analytics Server",
    location: "US-West-2",
    status: "running",
    cpu: 89,
    memory: 76,
    storage: 67,
    temperature: 52,
    uptime: "89d 22h",
    tasks: 42,
    history: [75, 80, 85, 88, 90, 89, 88],
  },
];

const resourceAllocation = [
  { name: "Compute", allocated: 780, total: 1000, color: "primary" },
  { name: "Memory", allocated: 256, total: 512, color: "accent" },
  { name: "Storage", allocated: 4.2, total: 10, color: "secondary" },
  { name: "Network", allocated: 850, total: 1000, color: "primary" },
];

export function ServerManagementPage() {
  const [expandedServer, setExpandedServer] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<{ serverId: string; action: string } | null>(null);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "running":
        return { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-400/20", label: "Running" };
      case "stopped":
        return { icon: XCircle, color: "text-red-400", bg: "bg-red-400/20", label: "Stopped" };
      case "maintenance":
        return { icon: AlertCircle, color: "text-amber-400", bg: "bg-amber-400/20", label: "Maintenance" };
      default:
        return { icon: AlertCircle, color: "text-muted-foreground", bg: "bg-muted", label: "Unknown" };
    }
  };

  const handleAction = (serverId: string, action: string) => {
    setSelectedAction({ serverId, action });
    // Simulate action completion
    setTimeout(() => setSelectedAction(null), 2000);
  };

  const runningCount = servers.filter(s => s.status === "running").length;
  const stoppedCount = servers.filter(s => s.status === "stopped").length;
  const maintenanceCount = servers.filter(s => s.status === "maintenance").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
          Server Management
        </h1>
        <p className="text-muted-foreground">
          Monitor and control your server infrastructure
        </p>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-4"
        >
          <Server className="w-6 h-6 text-primary mb-2" />
          <p className="text-3xl font-bold text-foreground">{servers.length}</p>
          <p className="text-sm text-muted-foreground">Total Servers</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-4"
        >
          <CheckCircle className="w-6 h-6 text-emerald-400 mb-2" />
          <p className="text-3xl font-bold text-foreground">{runningCount}</p>
          <p className="text-sm text-muted-foreground">Running</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-4"
        >
          <XCircle className="w-6 h-6 text-red-400 mb-2" />
          <p className="text-3xl font-bold text-foreground">{stoppedCount}</p>
          <p className="text-sm text-muted-foreground">Stopped</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-4"
        >
          <AlertCircle className="w-6 h-6 text-amber-400 mb-2" />
          <p className="text-3xl font-bold text-foreground">{maintenanceCount}</p>
          <p className="text-sm text-muted-foreground">Maintenance</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Server List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 space-y-4"
        >
          {servers.map((server, i) => {
            const status = getStatusConfig(server.status);
            const StatusIcon = status.icon;
            const isExpanded = expandedServer === server.id;
            const isProcessing = selectedAction?.serverId === server.id;

            return (
              <motion.div
                key={server.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <div
                  onClick={() => setExpandedServer(isExpanded ? null : server.id)}
                  className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${status.bg}`}>
                      <Server className={`w-6 h-6 ${status.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{server.name}</p>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{server.location}</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="hidden md:flex items-center gap-6">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-sm text-foreground">
                          <Cpu className="w-3 h-3 text-primary" />
                          <span>{server.cpu}%</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-sm text-foreground">
                          <MemoryStick className="w-3 h-3 text-accent" />
                          <span>{server.memory}%</span>
                        </div>
                      </div>
                      <div className="w-16 h-8">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={server.history.map((v, i) => ({ i, v }))}>
                            <Line
                              type="monotone"
                              dataKey="v"
                              stroke={server.status === "running" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {server.status === "running" ? (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => { e.stopPropagation(); handleAction(server.id, "stop"); }}
                          className="p-2 rounded-lg bg-red-400/20 text-red-400 hover:bg-red-400/30 transition-colors"
                        >
                          <Pause className="w-4 h-4" />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => { e.stopPropagation(); handleAction(server.id, "start"); }}
                          className="p-2 rounded-lg bg-emerald-400/20 text-emerald-400 hover:bg-emerald-400/30 transition-colors"
                        >
                          <Play className="w-4 h-4" />
                        </motion.button>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => { e.stopPropagation(); handleAction(server.id, "restart"); }}
                        className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                      >
                        <RotateCcw className={`w-4 h-4 ${isProcessing && selectedAction?.action === "restart" ? "animate-spin" : ""}`} />
                      </motion.button>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        className="text-muted-foreground"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border/50"
                    >
                      <div className="p-4 bg-muted/20">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="p-3 bg-background/50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Cpu className="w-4 h-4 text-primary" />
                              <span className="text-xs text-muted-foreground">CPU Usage</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${server.cpu}%` }}
                                className="h-full bg-primary rounded-full"
                              />
                            </div>
                            <p className="text-sm font-medium text-foreground mt-1">{server.cpu}%</p>
                          </div>

                          <div className="p-3 bg-background/50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <MemoryStick className="w-4 h-4 text-accent" />
                              <span className="text-xs text-muted-foreground">Memory</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${server.memory}%` }}
                                className="h-full bg-accent rounded-full"
                              />
                            </div>
                            <p className="text-sm font-medium text-foreground mt-1">{server.memory}%</p>
                          </div>

                          <div className="p-3 bg-background/50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <HardDrive className="w-4 h-4 text-secondary" />
                              <span className="text-xs text-muted-foreground">Storage</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${server.storage}%` }}
                                className="h-full bg-secondary rounded-full"
                              />
                            </div>
                            <p className="text-sm font-medium text-foreground mt-1">{server.storage}%</p>
                          </div>

                          <div className="p-3 bg-background/50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Thermometer className="w-4 h-4 text-amber-400" />
                              <span className="text-xs text-muted-foreground">Temperature</span>
                            </div>
                            <p className="text-xl font-bold text-foreground">{server.temperature}°C</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <span className="text-muted-foreground">Uptime: <span className="text-foreground">{server.uptime}</span></span>
                            <span className="text-muted-foreground">Active Tasks: <span className="text-foreground">{server.tasks}</span></span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            <span>Configure</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Resource Allocation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Resource Allocation</h3>
          <div className="space-y-5">
            {resourceAllocation.map((resource, i) => {
              const percentage = (resource.allocated / resource.total) * 100;
              return (
                <motion.div
                  key={resource.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{resource.name}</span>
                    <span className="text-sm font-medium text-foreground">
                      {resource.allocated} / {resource.total}
                      {resource.name === "Storage" ? " TB" : resource.name === "Memory" ? " GB" : ""}
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className={`h-full rounded-full ${
                        resource.color === "primary" ? "bg-gradient-primary" :
                        resource.color === "accent" ? "bg-accent" :
                        "bg-secondary"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-border/50">
            <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm text-foreground"
              >
                <Power className="w-4 h-4 text-primary" />
                <span>Power All Servers</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm text-foreground"
              >
                <RefreshCw className="w-4 h-4 text-accent" />
                <span>Sync All</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm text-foreground"
              >
                <Settings className="w-4 h-4 text-muted-foreground" />
                <span>Global Settings</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
