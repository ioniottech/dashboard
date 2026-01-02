import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Key,
  User,
  Mail,
  Moon,
  Sun,
  Monitor,
  Volume2,
  Vibrate,
  Lock,
  Eye,
  EyeOff,
  Check,
  ChevronRight,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface SettingSection {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
}

const sections: SettingSection[] = [
  { id: "general", title: "General", icon: Settings, description: "Basic application settings" },
  { id: "notifications", title: "Notifications", icon: Bell, description: "Alert and notification preferences" },
  { id: "security", title: "Security", icon: Shield, description: "Account and data protection" },
  { id: "appearance", title: "Appearance", icon: Palette, description: "Theme and display options" },
  { id: "integrations", title: "Integrations", icon: Globe, description: "Third-party connections" },
  { id: "data", title: "Data & Storage", icon: Database, description: "Data management settings" },
];

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    vibrationEnabled: false,
    criticalAlertsOnly: false,
    twoFactorAuth: true,
    sessionTimeout: "30",
    theme: "dark",
    compactMode: false,
    animationsEnabled: true,
    autoSync: true,
    dataRetention: "90",
  });

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return (
          <div className="space-y-6">
            <SettingItem
              icon={User}
              title="Profile Information"
              description="Update your account details"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-lg bg-primary/20 text-primary text-sm hover:bg-primary/30 transition-colors"
              >
                Edit Profile
              </motion.button>
            </SettingItem>

            <SettingItem
              icon={Mail}
              title="Email Address"
              description="admin@iotcentral.com"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-lg bg-muted text-foreground text-sm hover:bg-muted/80 transition-colors"
              >
                Change
              </motion.button>
            </SettingItem>

            <SettingItem
              icon={Globe}
              title="Language"
              description="English (US)"
            >
              <select className="px-3 py-2 rounded-lg bg-muted text-foreground text-sm border-none outline-none">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </SettingItem>

            <SettingItem
              icon={Monitor}
              title="Timezone"
              description="UTC-5 (Eastern Time)"
            >
              <select className="px-3 py-2 rounded-lg bg-muted text-foreground text-sm border-none outline-none">
                <option>UTC-5 (Eastern)</option>
                <option>UTC-8 (Pacific)</option>
                <option>UTC+0 (GMT)</option>
                <option>UTC+1 (CET)</option>
              </select>
            </SettingItem>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <SettingItem
              icon={Mail}
              title="Email Notifications"
              description="Receive alerts via email"
            >
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(v) => updateSetting("emailNotifications", v)}
              />
            </SettingItem>

            <SettingItem
              icon={Bell}
              title="Push Notifications"
              description="Browser push notifications"
            >
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(v) => updateSetting("pushNotifications", v)}
              />
            </SettingItem>

            <SettingItem
              icon={Volume2}
              title="Sound Effects"
              description="Play sounds for alerts"
            >
              <Switch
                checked={settings.soundEnabled}
                onCheckedChange={(v) => updateSetting("soundEnabled", v)}
              />
            </SettingItem>

            <SettingItem
              icon={Vibrate}
              title="Vibration"
              description="Vibrate on mobile devices"
            >
              <Switch
                checked={settings.vibrationEnabled}
                onCheckedChange={(v) => updateSetting("vibrationEnabled", v)}
              />
            </SettingItem>

            <SettingItem
              icon={Shield}
              title="Critical Alerts Only"
              description="Only notify for high-priority events"
            >
              <Switch
                checked={settings.criticalAlertsOnly}
                onCheckedChange={(v) => updateSetting("criticalAlertsOnly", v)}
              />
            </SettingItem>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <SettingItem
              icon={Lock}
              title="Two-Factor Authentication"
              description="Add an extra layer of security"
            >
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(v) => updateSetting("twoFactorAuth", v)}
              />
            </SettingItem>

            <SettingItem
              icon={Key}
              title="API Key"
              description={showApiKey ? "sk-iot-xxxx-xxxx-xxxx-xxxx" : "••••••••••••••••"}
            >
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-lg bg-primary/20 text-primary text-sm hover:bg-primary/30 transition-colors"
                >
                  Regenerate
                </motion.button>
              </div>
            </SettingItem>

            <SettingItem
              icon={Monitor}
              title="Session Timeout"
              description="Auto-logout after inactivity"
            >
              <select
                value={settings.sessionTimeout}
                onChange={(e) => updateSetting("sessionTimeout", e.target.value)}
                className="px-3 py-2 rounded-lg bg-muted text-foreground text-sm border-none outline-none"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="never">Never</option>
              </select>
            </SettingItem>

            <SettingItem
              icon={Shield}
              title="Active Sessions"
              description="2 devices currently logged in"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-lg bg-red-400/20 text-red-400 text-sm hover:bg-red-400/30 transition-colors"
              >
                Logout All
              </motion.button>
            </SettingItem>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <div className="p-4 bg-muted/30 rounded-xl">
              <p className="text-sm font-medium text-foreground mb-3">Theme</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "light", icon: Sun, label: "Light" },
                  { id: "dark", icon: Moon, label: "Dark" },
                  { id: "system", icon: Monitor, label: "System" },
                ].map((theme) => (
                  <motion.button
                    key={theme.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateSetting("theme", theme.id)}
                    className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      settings.theme === theme.id
                        ? "bg-primary/20 border border-primary"
                        : "bg-muted hover:bg-muted/80 border border-transparent"
                    }`}
                  >
                    <theme.icon className={`w-5 h-5 ${settings.theme === theme.id ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-sm ${settings.theme === theme.id ? "text-primary" : "text-muted-foreground"}`}>
                      {theme.label}
                    </span>
                    {settings.theme === theme.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2"
                      >
                        <Check className="w-4 h-4 text-primary" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <SettingItem
              icon={Palette}
              title="Compact Mode"
              description="Reduce padding and spacing"
            >
              <Switch
                checked={settings.compactMode}
                onCheckedChange={(v) => updateSetting("compactMode", v)}
              />
            </SettingItem>

            <SettingItem
              icon={Palette}
              title="Animations"
              description="Enable motion effects"
            >
              <Switch
                checked={settings.animationsEnabled}
                onCheckedChange={(v) => updateSetting("animationsEnabled", v)}
              />
            </SettingItem>
          </div>
        );

      case "integrations":
        return (
          <div className="space-y-4">
            {[
              { name: "Slack", status: "connected", icon: "💬" },
              { name: "Microsoft Teams", status: "disconnected", icon: "📱" },
              { name: "PagerDuty", status: "connected", icon: "🚨" },
              { name: "AWS CloudWatch", status: "connected", icon: "☁️" },
              { name: "Datadog", status: "disconnected", icon: "🐕" },
            ].map((integration, i) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <span className="text-2xl">{integration.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{integration.name}</p>
                  <p className={`text-xs ${
                    integration.status === "connected" ? "text-emerald-400" : "text-muted-foreground"
                  }`}>
                    {integration.status === "connected" ? "Connected" : "Not connected"}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    integration.status === "connected"
                      ? "bg-red-400/20 text-red-400 hover:bg-red-400/30"
                      : "bg-primary/20 text-primary hover:bg-primary/30"
                  }`}
                >
                  {integration.status === "connected" ? "Disconnect" : "Connect"}
                </motion.button>
              </motion.div>
            ))}
          </div>
        );

      case "data":
        return (
          <div className="space-y-6">
            <SettingItem
              icon={Database}
              title="Auto Sync"
              description="Automatically sync data across devices"
            >
              <Switch
                checked={settings.autoSync}
                onCheckedChange={(v) => updateSetting("autoSync", v)}
              />
            </SettingItem>

            <SettingItem
              icon={Database}
              title="Data Retention"
              description="How long to keep historical data"
            >
              <select
                value={settings.dataRetention}
                onChange={(e) => updateSetting("dataRetention", e.target.value)}
                className="px-3 py-2 rounded-lg bg-muted text-foreground text-sm border-none outline-none"
              >
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="365">1 year</option>
                <option value="forever">Forever</option>
              </select>
            </SettingItem>

            <div className="p-4 bg-muted/30 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium text-foreground">Storage Usage</p>
                  <p className="text-sm text-muted-foreground">4.2 GB of 10 GB used</p>
                </div>
                <span className="text-sm text-primary">42%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "42%" }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-primary rounded-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left"
              >
                <Database className="w-5 h-5 text-primary mb-2" />
                <p className="font-medium text-foreground">Export Data</p>
                <p className="text-xs text-muted-foreground">Download all your data</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-xl bg-red-400/10 hover:bg-red-400/20 transition-colors text-left"
              >
                <Database className="w-5 h-5 text-red-400 mb-2" />
                <p className="font-medium text-red-400">Clear Cache</p>
                <p className="text-xs text-muted-foreground">Free up 1.2 GB</p>
              </motion.button>
            </div>
          </div>
        );

      default:
        return null;
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
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your preferences and configurations
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-2"
        >
          {sections.map((section, i) => (
            <motion.button
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ x: 4 }}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeSection === section.id
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <section.icon className="w-5 h-5" />
              <span className="flex-1 text-left text-sm font-medium">{section.title}</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${
                activeSection === section.id ? "rotate-90" : ""
              }`} />
            </motion.button>
          ))}
        </motion.div>

        {/* Settings Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 glass-card rounded-2xl p-6"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              {sections.find(s => s.id === activeSection)?.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {sections.find(s => s.id === activeSection)?.description}
            </p>
          </div>

          {renderSection()}
        </motion.div>
      </div>
    </div>
  );
}

interface SettingItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}

function SettingItem({ icon: Icon, title, description, children }: SettingItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-medium text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
