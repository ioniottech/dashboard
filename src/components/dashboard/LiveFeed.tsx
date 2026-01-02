import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Activity, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogEntry {
  id: number;
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  device: string;
}

const logTypes = ["info", "success", "warning", "error"] as const;
const devices = ["Sensor-A1", "Gateway-B2", "Node-C3", "Hub-D4", "Router-E5"];
const messages = [
  "Temperature reading: 23.5°C",
  "Connection established",
  "Firmware update available",
  "Battery level: 85%",
  "Data packet received",
  "Heartbeat signal OK",
  "Calibration complete",
  "Network latency: 12ms",
  "Memory usage: 64%",
  "CPU load: 42%",
];

function generateLog(id: number): LogEntry {
  return {
    id,
    timestamp: new Date().toLocaleTimeString(),
    message: messages[Math.floor(Math.random() * messages.length)],
    type: logTypes[Math.floor(Math.random() * logTypes.length)],
    device: devices[Math.floor(Math.random() * devices.length)],
  };
}

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: AlertCircle,
};

const colorMap = {
  info: "text-blue-400 bg-blue-500/20",
  success: "text-emerald-400 bg-emerald-500/20",
  warning: "text-amber-400 bg-amber-500/20",
  error: "text-red-400 bg-red-500/20",
};

export function LiveFeed() {
  const [logs, setLogs] = useState<LogEntry[]>(() =>
    Array.from({ length: 5 }, (_, i) => generateLog(i))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => [generateLog(Date.now()), ...prev.slice(0, 9)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="glass-card rounded-2xl p-6 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Live Feed</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="space-y-2 h-[320px] overflow-y-auto scrollbar-thin pr-2">
        <AnimatePresence mode="popLayout">
          {logs.map((log) => {
            const Icon = iconMap[log.type];
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-3 rounded-xl bg-muted/30 border border-border/30"
              >
                <div className="flex items-start gap-3">
                  <div className={cn("p-1.5 rounded-lg", colorMap[log.type])}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">
                        {log.timestamp}
                      </span>
                      <span className="text-xs font-medium text-primary">
                        {log.device}
                      </span>
                    </div>
                    <p className="text-sm text-foreground truncate">{log.message}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}