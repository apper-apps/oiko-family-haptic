import { useState } from "react";
import { motion } from "framer-motion";
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday
} from "date-fns";
import EventCard from "@/components/molecules/EventCard";
import ApperIcon from "@/components/ApperIcon";

const CalendarGrid = ({ 
  currentDate, 
  events = [], 
  onDateClick, 
  onEventClick, 
  selectedDate 
}) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getEventsForDay = (date) => {
    return events.filter(event => 
      isSameDay(new Date(event.startDate), date)
    );
  };

  const getDayClass = (date) => {
    let classes = "calendar-day cursor-pointer transition-all duration-300";
    
    if (!isSameMonth(date, currentDate)) {
      classes += " other-month";
    }
    
    if (isToday(date)) {
      classes += " ring-2 ring-primary/50";
    }
    
    if (selectedDate && isSameDay(date, selectedDate)) {
      classes += " selected";
    }
    
    return classes;
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {dayLabels.map((day) => (
          <div
            key={day}
            className="text-center py-3 text-sm font-semibold text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {days.map((date, index) => {
          const dayEvents = getEventsForDay(date);
          
          return (
            <motion.div
              key={date.toISOString()}
              className={getDayClass(date)}
              onClick={() => onDateClick(date)}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.01 }}
            >
              <div className="p-3 h-full flex flex-col">
                {/* Date Number */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-semibold ${
                    !isSameMonth(date, currentDate) 
                      ? "text-gray-400" 
                      : isToday(date)
                      ? "text-primary"
                      : "text-gray-700"
                  }`}>
                    {format(date, "d")}
                  </span>
                  
                  {isToday(date) && (
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  )}
                </div>

                {/* Events */}
                <div className="flex-1 space-y-1 overflow-hidden">
                  {dayEvents.slice(0, 3).map((event) => (
                    <EventCard
                      key={event.Id}
                      event={event}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                    />
                  ))}
                  
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 px-2 py-1">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>

                {/* Add Event Button */}
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDateClick(date);
                    }}
                    className="w-full p-1 text-xs text-gray-500 hover:text-primary transition-colors"
                  >
                    <ApperIcon name="Plus" className="w-3 h-3 mx-auto" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;