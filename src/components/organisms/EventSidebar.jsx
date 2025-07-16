import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import EventCard from "@/components/molecules/EventCard";

const EventSidebar = ({ 
  selectedDate, 
  events = [], 
  onEventClick, 
  onAddEvent, 
  onClose 
}) => {
  const selectedEvents = events.filter(event => 
    selectedDate && format(new Date(event.startDate), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
  );

  return (
    <motion.div
      className="glass-card rounded-2xl p-6 h-fit"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
          </h3>
          <p className="text-sm text-gray-600">
            {selectedDate ? format(selectedDate, "EEEE") : ""}
          </p>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 md:hidden"
          >
            <ApperIcon name="X" className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Add Event Button */}
      {selectedDate && (
        <Button
          variant="primary"
          onClick={() => onAddEvent(selectedDate)}
          className="w-full mb-4 flex items-center justify-center space-x-2"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span>Add Event</span>
        </Button>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {selectedDate ? (
          selectedEvents.length > 0 ? (
            <>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Events ({selectedEvents.length})
              </h4>
              <div className="space-y-2">
                {selectedEvents.map((event) => (
                  <motion.div
                    key={event.Id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="glass-effect rounded-xl p-4 cursor-pointer hover:bg-white/50 transition-all"
                      onClick={() => onEventClick(event)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-1 ${
                          event.category === "event" 
                            ? "bg-primary" 
                            : event.category === "chore" 
                            ? "bg-secondary" 
                            : "bg-accent"
                        }`}></div>
                        
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-800 mb-1">
                            {event.title}
                          </h5>
                          
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                            <ApperIcon name="Clock" className="w-3 h-3" />
                            <span>
                              {format(new Date(event.startDate), "h:mm a")} - {format(new Date(event.endDate), "h:mm a")}
                            </span>
                          </div>
                          
                          {event.location && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                              <ApperIcon name="MapPin" className="w-3 h-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          
                          {event.assignedTo && event.assignedTo.length > 0 && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                              <ApperIcon name="User" className="w-3 h-3" />
                              <span>{event.assignedTo.join(", ")}</span>
                            </div>
                          )}
                          
                          <Badge variant={event.category}>
                            {event.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                <ApperIcon name="Calendar" className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                No events scheduled
              </h4>
              <p className="text-xs text-gray-500 mb-4">
                Add your first event for this day
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onAddEvent(selectedDate)}
                className="flex items-center space-x-1"
              >
                <ApperIcon name="Plus" className="w-3 h-3" />
                <span>Add Event</span>
              </Button>
            </div>
          )
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
              <ApperIcon name="Calendar" className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Select a date
            </h4>
            <p className="text-xs text-gray-500">
              Click on any date to view or add events
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EventSidebar;