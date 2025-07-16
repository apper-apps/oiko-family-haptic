import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    weekStart: "sunday",
    timeFormat: "12",
    defaultView: "month",
    googleCalendarSync: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("oiko-settings");
    if (savedSettings) {
      setSettings({ ...settings, ...JSON.parse(savedSettings) });
    }
  }, []);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("oiko-settings", JSON.stringify(newSettings));
    toast.success("Settings updated successfully!");
  };

  const handleGoogleCalendarSync = async () => {
    try {
      setLoading(true);
      // Simulate Google Calendar OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      handleSettingChange("googleCalendarSync", !settings.googleCalendarSync);
      toast.success(settings.googleCalendarSync ? "Google Calendar disconnected" : "Google Calendar connected successfully!");
    } catch (error) {
      toast.error("Failed to connect to Google Calendar");
    } finally {
      setLoading(false);
    }
  };

  const settingSections = [
    {
      title: "General",
      icon: "Settings",
      settings: [
        {
          key: "theme",
          label: "Theme",
          type: "select",
          options: [
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
            { value: "system", label: "System" }
          ]
        },
        {
          key: "defaultView",
          label: "Default Calendar View",
          type: "select",
          options: [
            { value: "month", label: "Month" },
            { value: "week", label: "Week" },
            { value: "day", label: "Day" }
          ]
        },
        {
          key: "weekStart",
          label: "Week Starts On",
          type: "select",
          options: [
            { value: "sunday", label: "Sunday" },
            { value: "monday", label: "Monday" }
          ]
        },
        {
          key: "timeFormat",
          label: "Time Format",
          type: "select",
          options: [
            { value: "12", label: "12-hour" },
            { value: "24", label: "24-hour" }
          ]
        }
      ]
    },
    {
      title: "Notifications",
      icon: "Bell",
      settings: [
        {
          key: "notifications",
          label: "Enable Notifications",
          type: "toggle"
        }
      ]
    },
    {
      title: "Integrations",
      icon: "Link",
      settings: [
        {
          key: "googleCalendarSync",
          label: "Google Calendar Sync",
          type: "custom",
          component: "googleCalendarSync"
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="glass-card rounded-2xl p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <ApperIcon name="Settings" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Settings</h1>
            <p className="text-gray-600">Customize your OIKO experience</p>
          </div>
        </div>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <ApperIcon name={section.icon} className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
            </div>

            <div className="space-y-4">
              {section.settings.map((setting) => (
                <div key={setting.key} className="flex items-center justify-between py-3 border-b border-white/20 last:border-b-0">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {setting.label}
                    </label>
                  </div>

                  <div>
                    {setting.type === "select" && (
                      <select
                        value={settings[setting.key]}
                        onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                        className="form-input w-auto min-w-[120px]"
                      >
                        {setting.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {setting.type === "toggle" && (
                      <button
                        onClick={() => handleSettingChange(setting.key, !settings[setting.key])}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings[setting.key] ? "bg-gradient-to-r from-primary to-secondary" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings[setting.key] ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    )}

                    {setting.type === "custom" && setting.component === "googleCalendarSync" && (
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm ${settings.googleCalendarSync ? "text-success" : "text-gray-500"}`}>
                          {settings.googleCalendarSync ? "Connected" : "Disconnected"}
                        </span>
                        <Button
                          variant={settings.googleCalendarSync ? "secondary" : "primary"}
                          size="sm"
                          onClick={handleGoogleCalendarSync}
                          disabled={loading}
                          className="flex items-center space-x-2"
                        >
                          {loading ? (
                            <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                          ) : (
                            <ApperIcon name={settings.googleCalendarSync ? "Unlink" : "Link"} className="w-4 h-4" />
                          )}
                          <span>{settings.googleCalendarSync ? "Disconnect" : "Connect"}</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* About Section */}
      <motion.div
        className="glass-card rounded-2xl p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
          <ApperIcon name="Calendar" className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold gradient-text mb-2">OIKO Family Calendar</h3>
        <p className="text-gray-600 mb-4">
          Version 1.0.0 - Your family's scheduling companion
        </p>
        <p className="text-sm text-gray-500">
          Built with love for families who want to stay organized together
        </p>
      </motion.div>
    </div>
  );
};

export default SettingsPage;