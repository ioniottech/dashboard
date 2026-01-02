import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  HeartPulse,
  AlertTriangle,
  Gauge,
  MessageSquareText,
  ChevronLeft,
  ChevronRight,
  Server,
  Settings,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
  hasPulse?: boolean;
  hasGlow?: boolean;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "chat", label: "Chat", icon: MessageSquareText },
  { id: "live-iot", label: "Live IoT Infrastructure", icon: Activity, hasPulse: true },
  { id: "device-health", label: "Device Health", icon: HeartPulse },
  { id: "maintenance", label: "Predictive Maintenance", icon: AlertTriangle, badge: 3, hasGlow: true },
  { id: "kpis", label: "Infrastructure KPIs", icon: Gauge },
  { id: "servers", label: "Server Management", icon: Server },
  { id: "settings", label: "Settings", icon: Settings },
];

interface DashboardSidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  activeItem: string;
  setActiveItem: (id: string) => void;
}

export function DashboardSidebar({
  collapsed,
  setCollapsed,
  activeItem,
  setActiveItem,
}: DashboardSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/sign-in");
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-border/50">
        <motion.div
          className="flex items-center gap-3"
          initial={false}
          animate={{ justifyContent: collapsed ? "center" : "flex-start" }}
        >

           <img src="/images/logo.webp" alt="App Logo" className="w-20 h-20" />

          {/* <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary pulse-dot" />
          </div> */}
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-bold text-lg gradient-text whitespace-nowrap overflow-hidden"
              >
                IoT Central
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            collapsed={collapsed}
            isActive={activeItem === item.id}
            onClick={() => {
              setActiveItem(item.id);
              setMobileOpen(false);
            }}
          />
        ))}
      </nav>

      {/* AI Chatbot Button */}
      {/* <div className="p-3 border-t border-border/50">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl",
            "bg-gradient-primary text-primary-foreground font-medium",
            "shadow-lg glow-primary transition-all duration-300",
            collapsed && "justify-center px-3"
          )}
        >
          <MessageSquareText className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="whitespace-nowrap overflow-hidden"
              >
                AI Support
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div> */}

      {/* Logout Button */}
      <div className="p-3 border-t border-border/50">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl",
            "bg-muted/10 text-foreground font-medium",
            "transition-all duration-300",
            collapsed && "justify-center px-3"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="whitespace-nowrap overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Collapse Toggle (Desktop) */}
      <div className="hidden lg:block p-3 border-t border-border/50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          )}
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl glass-card glow-secondary"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </motion.button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-sidebar z-50 border-r border-border/50"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="hidden lg:block fixed left-0 top-0 bottom-0 bg-sidebar border-r border-border/50 z-30"
      >
        {sidebarContent}
      </motion.aside>
    </>
  );
}

interface NavButtonProps {
  item: NavItem;
  collapsed: boolean;
  isActive: boolean;
  onClick: () => void;
}

function NavButton({ item, collapsed, isActive, onClick }: NavButtonProps) {
  const Icon = item.icon;

  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300",
        "hover:bg-muted/50",
        isActive && "bg-gradient-primary text-primary-foreground glow-primary",
        !isActive && "text-muted-foreground hover:text-foreground",
        collapsed && "justify-center"
      )}
    >
      <div className="relative flex-shrink-0">
        <Icon className="w-5 h-5" />
        {item.hasPulse && !isActive && (
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary pulse-dot" />
        )}
      </div>
      
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="text-sm font-medium whitespace-nowrap overflow-hidden flex-1 text-left"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {!collapsed && item.badge && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            "px-2 py-0.5 text-xs font-bold rounded-full",
            "bg-accent text-accent-foreground",
            item.hasGlow && "animate-glow"
          )}
        >
          {item.badge}
        </motion.span>
      )}
    </motion.button>
  );
}