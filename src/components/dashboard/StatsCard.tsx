import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  sparkline?: number[];
  delay?: number;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  sparkline,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:glow-secondary"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-primary">
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
        {change && (
          <span
            className={cn(
              "text-sm font-medium px-2 py-1 rounded-lg",
              changeType === "positive" && "bg-emerald-500/20 text-emerald-400",
              changeType === "negative" && "bg-red-500/20 text-red-400",
              changeType === "neutral" && "bg-muted text-muted-foreground"
            )}
          >
            {change}
          </span>
        )}
      </div>

      <h3 className="text-muted-foreground text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-foreground">{value}</p>

      {sparkline && (
        <div className="mt-4 flex items-end gap-1 h-8">
          {sparkline.map((val, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${val}%` }}
              transition={{ delay: delay + i * 0.05, duration: 0.3 }}
              className="flex-1 rounded-t bg-gradient-to-t from-primary to-accent opacity-60"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}