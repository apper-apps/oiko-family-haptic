import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import CalendarGrid from "@/components/organisms/CalendarGrid";
import EventSidebar from "@/components/organisms/EventSidebar";
import EventModal from "@/components/organisms/EventModal";
import DateNavigator from "@/components/molecules/DateNavigator";
import ViewToggle from "@/components/molecules/ViewToggle";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import QuickActions from "@/components/molecules/QuickActions";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { eventService } from "@/services/api/eventService";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentView, setCurrentView] = useState("month");
  const [activeFilters, setActiveFilters] = useState(["all"]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");
      const eventsData = await eventService.getAll();
      setEvents(eventsData);
    } catch (err) {
      setError("Failed to load events");
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleAddEvent = (date = null) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };

  const handleAddChore = () => {
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };

  const handleAddBirthday = () => {
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };

  const handleFilterChange = (filter) => {
    if (filter === "all") {
      setActiveFilters(["all"]);
    } else {
      setActiveFilters(prev => {
        const newFilters = prev.filter(f => f !== "all");
        if (newFilters.includes(filter)) {
          const filtered = newFilters.filter(f => f !== filter);
          return filtered.length === 0 ? ["all"] : filtered;
        } else {
          return [...newFilters, filter];
        }
      });
    }
  };

  const filteredEvents = events.filter(event => {
    if (activeFilters.includes("all")) return true;
    return activeFilters.includes(event.category);
  });

  const handleModalClose = () => {
    setIsEventModalOpen(false);
    setSelectedEvent(null);
    loadEvents(); // Refresh events after modal closes
  };

  if (loading) {
    return <Loading type="calendar" />;
  }

  if (error) {
    return (
      <div className="p-6">
        <Error message={error} onRetry={loadEvents} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <motion.div
        className="glass-card rounded-2xl p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          <DateNavigator
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />
          
          <div className="flex items-center space-x-4">
            <ViewToggle
              currentView={currentView}
              onViewChange={setCurrentView}
            />
            
            <QuickActions
              onAddEvent={() => handleAddEvent()}
              onAddChore={handleAddChore}
              onAddBirthday={handleAddBirthday}
            />
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/20">
          <CategoryFilter
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
      </motion.div>

      {/* Main Calendar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-3">
          <CalendarGrid
            currentDate={currentDate}
            events={filteredEvents}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
            selectedDate={selectedDate}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <EventSidebar
            selectedDate={selectedDate}
            events={filteredEvents}
            onEventClick={handleEventClick}
            onAddEvent={handleAddEvent}
            onClose={() => setSelectedDate(null)}
          />
        </div>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={handleModalClose}
        event={selectedEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default CalendarPage;