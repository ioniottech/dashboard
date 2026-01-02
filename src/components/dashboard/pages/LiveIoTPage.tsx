import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Wifi,
  Radio,
  Signal,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Circle,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DataPoint {
  time: string;
  inbound: number;
  outbound: number;
}

interface NetworkNode {
  id: string;
  name: string;
  type: "gateway" | "sensor" | "router" | "edge";
  status: "active" | "idle" | "warning";
  dataFlow: number;
  x: number;
  y: number;
}

const nodes: NetworkNode[] = [
  { id: "gw1", name: "Gateway Alpha", type: "gateway", status: "active", dataFlow: 89, x: 50, y: 30 },
  { id: "s1", name: "Temp Sensor 01", type: "sensor", status: "active", dataFlow: 45, x: 20, y: 60 },
  { id: "s2", name: "Pressure Sensor", type: "sensor", status: "idle", dataFlow: 12, x: 35, y: 80 },
  { id: "r1", name: "Router Hub", type: "router", status: "active", dataFlow: 76, x: 65, y: 55 },
  { id: "e1", name: "Edge Node 01", type: "edge", status: "warning", dataFlow: 92, x: 80, y: 35 },
  { id: "s3", name: "Motion Sensor", type: "sensor", status: "active", dataFlow: 34, x: 85, y: 70 },
];

const connections = [
  { from: "gw1", to: "s1" },
  { from: "gw1", to: "s2" },
  { from: "gw1", to: "r1" },
  { from: "r1", to: "e1" },
  { from: "r1", to: "s3" },
  { from: "e1", to: "s3" },
];

export function LiveIoTPage() {
  const [streamData, setStreamData] = useState<DataPoint[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [pulseNodes, setPulseNodes] = useState<Set<string>>(new Set());

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", { hour12: false }).slice(0, 5);
      
      setStreamData(prev => {
        const newData = [
          ...prev,
          {
            time: timeStr,
            inbound: Math.floor(Math.random() * 500) + 200,
            outbound: Math.floor(Math.random() * 400) + 150,
          }
        ].slice(-20);
        return newData;
      });

      // Randomly pulse nodes
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)].id;
      setPulseNodes(prev => new Set([...prev, randomNode]));
      setTimeout(() => {
        setPulseNodes(prev => {
          const next = new Set(prev);
          next.delete(randomNode);
          return next;
        });
      }, 1000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getNodeColor = (status: string) => {
    switch (status) {
      case "active": return "hsl(var(--primary))";
      case "idle": return "hsl(var(--muted-foreground))";
      case "warning": return "hsl(var(--accent))";
      default: return "hsl(var(--muted))";
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "gateway": return Wifi;
      case "sensor": return Radio;
      case "router": return Activity;
      case "edge": return Zap;
      default: return Signal;
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
          Live IoT Infrastructure
        </h1>
        <p className="text-muted-foreground">
          Real-time network topology and data streams
        </p>
      </motion.div>

      {/* Network Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Connections", value: "847", trend: "+12", icon: Activity },
          { label: "Data Rate", value: "2.4 GB/s", trend: "+8%", icon: Zap },
          { label: "Signal Strength", value: "94%", trend: "+2%", icon: Signal },
          { label: "Packet Loss", value: "0.02%", trend: "-0.5%", icon: Radio },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="glass-card rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-primary" />
              <span className={`text-xs flex items-center ${
                stat.trend.startsWith("+") ? "text-emerald-400" : "text-accent"
              }`}>
                {stat.trend.startsWith("+") ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Topology */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Network Topology</h3>
          <div className="relative aspect-[4/3] bg-background/50 rounded-xl overflow-hidden">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full">
              {connections.map((conn, i) => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return null;
                
                return (
                  <motion.line
                    key={i}
                    x1={`${fromNode.x}%`}
                    y1={`${fromNode.y}%`}
                    x2={`${toNode.x}%`}
                    y2={`${toNode.y}%`}
                    stroke="hsl(var(--primary) / 0.3)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map((node, i) => {
              const Icon = getNodeIcon(node.type);
              const isPulsing = pulseNodes.has(node.id);
              
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                >
                  <motion.div
                    animate={{
                      scale: isPulsing ? [1, 1.3, 1] : 1,
                      boxShadow: isPulsing
                        ? ["0 0 0 0 hsl(var(--primary) / 0.4)", "0 0 0 15px hsl(var(--primary) / 0)", "0 0 0 0 hsl(var(--primary) / 0)"]
                        : "0 0 0 0 hsl(var(--primary) / 0)",
                    }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: getNodeColor(node.status) }}
                  >
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </motion.div>

                  <AnimatePresence>
                    {activeNode === node.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 glass-card rounded-lg p-3 z-10 min-w-[140px]"
                      >
                        <p className="text-sm font-medium text-foreground">{node.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{node.type}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-primary"
                              initial={{ width: 0 }}
                              animate={{ width: `${node.dataFlow}%` }}
                            />
                          </div>
                          <span className="text-xs text-primary">{node.dataFlow}%</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Live Data Stream */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Data Stream</h3>
            <div className="flex items-center gap-2">
              <Circle className="w-2 h-2 fill-primary text-primary animate-pulse" />
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
          </div>
          
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={streamData}>
                <defs>
                  <linearGradient id="streamInbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="streamOutbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="inbound"
                  stroke="hsl(var(--primary))"
                  fill="url(#streamInbound)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="outbound"
                  stroke="hsl(var(--accent))"
                  fill="url(#streamOutbound)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Inbound</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-xs text-muted-foreground">Outbound</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Device Activity Stream */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Device Activity Stream</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nodes.map((node, i) => {
            const Icon = getNodeIcon(node.type);
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: getNodeColor(node.status) }}
                >
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{node.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{node.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{node.dataFlow}%</p>
                  <p className="text-xs text-muted-foreground">Load</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
