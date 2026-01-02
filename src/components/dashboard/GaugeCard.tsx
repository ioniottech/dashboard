import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GaugeCardProps {
  title: string;
  value: number;
  max: number;
  unit: string;
  color?: "primary" | "accent" | "secondary";
  delay?: number;
}

export function GaugeCard({
  title,
  value,
  max,
  unit,
  color = "primary",
  delay = 0,
}: GaugeCardProps) {
  const percentage = (value / max) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75;

  const colorClasses = {
    primary: "text-primary",
    accent: "text-accent",
    secondary: "text-secondary",
  };

  const strokeColors = {
    primary: "#FF6549",
    accent: "#EF1766",
    secondary: "#63068F",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card rounded-2xl p-6 transition-all duration-300 hover:glow-secondary"
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>

      <div className="relative flex items-center justify-center">
        <svg className="w-28 h-28 -rotate-[135deg]" viewBox="0 0 100 100">
          {/* Background arc */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="hsl(280 40% 20%)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference * 0.75}
            strokeDashoffset={0}
          />
          {/* Progress arc */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={strokeColors[color]}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference * 0.75}
            initial={{ strokeDashoffset: circumference * 0.75 }}
            animate={{ strokeDashoffset }}
            transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${strokeColors[color]}50)`,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5 }}
            className={cn("text-2xl font-bold", colorClasses[color])}
          >
            {value}
          </motion.span>
          <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span>{max} {unit}</span>
      </div>
    </motion.div>
  );
}