import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Activity,
  Users,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import Chat from "@/components/dashboard/pages/Chat";
import { useLocation } from "react-router-dom";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AreaChartCard } from "@/components/dashboard/AreaChartCard";
import { LiveFeed } from "@/components/dashboard/LiveFeed";
import { DeviceCard } from "@/components/dashboard/DeviceCard";
import { GaugeCard } from "@/components/dashboard/GaugeCard";
import { TeamMember } from "@/components/dashboard/TeamMember";
import { LiveIoTPage } from "@/components/dashboard/pages/LiveIoTPage";
import { DeviceHealthPage } from "@/components/dashboard/pages/DeviceHealthPage";
import { MaintenancePage } from "@/components/dashboard/pages/MaintenancePage";
import { KPIsPage } from "@/components/dashboard/pages/KPIsPage";
import { ServerManagementPage } from "@/components/dashboard/pages/ServerManagementPage";
import { SettingsPage } from "@/components/dashboard/pages/SettingsPage";

const devices = [
  { name: "Edge Gateway Alpha", status: "online" as const, cpu: 45, memory: 62, image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop" },
  { name: "Sensor Hub Beta", status: "online" as const, cpu: 78, memory: 54, image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop" },
  { name: "Data Node Gamma", status: "warning" as const, cpu: 92, memory: 88, image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop" },
  { name: "Router Delta", status: "online" as const, cpu: 23, memory: 41, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
];

const team = [
  { name: "Sarah Chen", role: "System Architect", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", status: "online" as const },
  { name: "Marcus Johnson", role: "Network Engineer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", status: "online" as const },
  { name: "Elena Rodriguez", role: "DevOps Lead", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", status: "away" as const },
  { name: "David Kim", role: "Security Analyst", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", status: "offline" as const },
];

export default function Index() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const location = useLocation();

  // Sync active sidebar item with route if visiting /dashboard/chat
  useEffect(() => {
    if (location.pathname.includes("/dashboard/chat")) setActiveItem("chat");
  }, [location.pathname]);

  const renderContent = () => {
    switch (activeItem) {
      case "chat":
        return <Chat />;
      case "live-iot":
        return <LiveIoTPage />;
      case "device-health":
        return <DeviceHealthPage />;
      case "maintenance":
        return <MaintenancePage />;
      case "kpis":
        return <KPIsPage />;
      case "servers":
        return <ServerManagementPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return (
          <>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">IoT Command Center</h1>
              <p className="text-muted-foreground">Real-time infrastructure monitoring and analytics</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatsCard title="Active Devices" value="2,847" change="+12.5%" changeType="positive" icon={Server} sparkline={[40, 60, 45, 80, 55, 90, 75]} delay={0} />
              <StatsCard title="Data Throughput" value="1.2 TB" change="+8.2%" changeType="positive" icon={HardDrive} sparkline={[30, 50, 70, 45, 85, 60, 80]} delay={0.1} />
              <StatsCard title="Network Latency" value="12ms" change="-3.1%" changeType="positive" icon={Wifi} sparkline={[80, 60, 70, 50, 40, 45, 35]} delay={0.2} />
              <StatsCard title="System Uptime" value="99.97%" change="+0.02%" changeType="positive" icon={Activity} sparkline={[95, 98, 97, 99, 98, 99, 100]} delay={0.3} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2"><AreaChartCard /></div>
              <div><LiveFeed /></div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <GaugeCard title="CPU Usage" value={67} max={100} unit="%" color="primary" delay={0} />
              <GaugeCard title="Memory" value={54} max={100} unit="%" color="accent" delay={0.1} />
              <GaugeCard title="Storage" value={78} max={100} unit="%" color="secondary" delay={0.2} />
              <GaugeCard title="Bandwidth" value={42} max={100} unit="%" color="primary" delay={0.3} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Device Fleet</h2>
                    <p className="text-sm text-muted-foreground">Monitor your infrastructure</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400"><CheckCircle className="w-3.5 h-3.5" />24 Online</span>
                    <span className="flex items-center gap-1.5 text-xs text-amber-400"><AlertTriangle className="w-3.5 h-3.5" />3 Warning</span>
                  </div>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {devices.map((device, i) => (<DeviceCard key={device.name} {...device} delay={0.5 + i * 0.1} />))}
                </div>
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Team</h3>
                </div>
                <div className="space-y-1">
                  {team.map((member, i) => (<TeamMember key={member.name} {...member} delay={0.7 + i * 0.1} />))}
                </div>
              </motion.div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} activeItem={activeItem} setActiveItem={setActiveItem} />
      <motion.main
        initial={false}
        animate={{ marginLeft: sidebarCollapsed ? 80 : 280 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="min-h-screen p-4 lg:p-8 transition-all duration-300 lg:ml-0"
        style={{ marginLeft: 0 }}
      >
        <div className="lg:hidden h-16" />
        {renderContent()}
      </motion.main>
      <style>{`@media (min-width: 1024px) { main { margin-left: ${sidebarCollapsed ? '80px' : '280px'} !important; }}`}</style>
    </div>
  );
}
