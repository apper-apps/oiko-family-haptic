import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const EventCard = ({ event, onClick, className = "" }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "event":
        return "Calendar";
      case "chore":
        return "CheckSquare";
      case "birthday":
        return "Gift";
      default:
        return "Calendar";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "event":
        return "border-l-primary";
      case "chore":
        return "border-l-secondary";
      case "birthday":
        return "border-l-accent";
      default:
        return "border-l-primary";
    }
  };

  return (
    <motion.div
      className={`event-card ${getCategoryColor(event.category)} ${className}`}
      whileHover={{ y: -2 }}
      onClick={onClick}
    >
      <div className="flex items-start space-x-2">
        <ApperIcon 
          name={getCategoryIcon(event.category)} 
          className="w-3 h-3 mt-0.5 flex-shrink-0" 
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-800 truncate text-xs">
            {event.title}
          </h4>
          {event.startDate && (
            <p className="text-gray-600 text-xs mt-1">
              {format(new Date(event.startDate), "h:mm a")}
            </p>
          )}
          {event.assignedTo && event.assignedTo.length > 0 && (
            <div className="flex items-center mt-1">
              <ApperIcon name="User" className="w-3 h-3 mr-1 text-gray-500" />
              <span className="text-xs text-gray-600">
                {event.assignedTo.join(", ")}
              </span>
            </div>
          )}
        </div>
        <Badge variant={event.category} className="text-xs">
          {event.category}
        </Badge>
      </div>
    </motion.div>
  );
};

export default EventCard;