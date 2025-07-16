import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ViewToggle = ({ currentView, onViewChange }) => {
  const views = [
    { key: "month", label: "Month", icon: "Calendar" },
    { key: "week", label: "Week", icon: "CalendarDays" },
    { key: "day", label: "Day", icon: "CalendarRange" }
  ];

  return (
    <div className="glass-effect rounded-xl p-1 inline-flex">
      {views.map((view) => (
        <Button
          key={view.key}
          variant={currentView === view.key ? "primary" : "ghost"}
          size="sm"
          onClick={() => onViewChange(view.key)}
          className="relative"
        >
          <ApperIcon name={view.icon} className="w-4 h-4 mr-2" />
          {view.label}
          {currentView === view.key && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg -z-10"
              layoutId="activeView"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </Button>
      ))}
    </div>
  );
};

export default ViewToggle;