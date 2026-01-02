import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DeviceCardProps {
  name: string;
  status: "online" | "offline" | "warning";
  cpu: number;
  memory: number;
  image: string;
  delay?: number;
}

export function DeviceCard({
  name,
  status,
  cpu,
  memory,
  image,
  delay = 0,
}: DeviceCardProps) {
  const statusColors = {
    online: "bg-emerald-500",
    offline: "bg-red-500",
    warning: "bg-amber-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:glow-primary"
    >
      <div className="relative h-32">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
              status === "online" && "bg-emerald-500/20 text-emerald-400",
              status === "offline" && "bg-red-500/20 text-red-400",
              status === "warning" && "bg-amber-500/20 text-amber-400"
            )}
          >
            <span className={cn("w-1.5 h-1.5 rounded-full", statusColors[status])} />
            {status}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-semibold text-foreground mb-3">{name}</h4>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">CPU</span>
              <span className="text-foreground font-medium">{cpu}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${cpu}%` }}
                transition={{ delay: delay + 0.2, duration: 0.5 }}
                className={cn(
                  "h-full rounded-full",
                  cpu > 80 ? "bg-accent" : "bg-primary"
                )}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Memory</span>
              <span className="text-foreground font-medium">{memory}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${memory}%` }}
                transition={{ delay: delay + 0.3, duration: 0.5 }}
                className={cn(
                  "h-full rounded-full",
                  memory > 80 ? "bg-accent" : "bg-secondary"
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}