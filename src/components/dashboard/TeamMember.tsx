import { motion } from "framer-motion";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  status: "online" | "away" | "offline";
  delay?: number;
}

export function TeamMember({ name, role, image, status, delay = 0 }: TeamMemberProps) {
  const statusColors = {
    online: "bg-emerald-500",
    away: "bg-amber-500",
    offline: "bg-muted-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ x: 4 }}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer"
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-10 h-10 rounded-full object-cover border-2 border-border"
        />
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${statusColors[status]}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground truncate">{name}</h4>
        <p className="text-xs text-muted-foreground truncate">{role}</p>
      </div>
    </motion.div>
  );
}