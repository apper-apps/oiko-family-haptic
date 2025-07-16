import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import EventModal from "@/components/organisms/EventModal";
import { eventService } from "@/services/api/eventService";

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      setError("");
      const eventData = await eventService.getById(parseInt(id));
      setEvent(eventData);
    } catch (err) {
      setError("Failed to load event details");
      toast.error("Failed to load event details");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      setIsDeleting(true);
      await eventService.delete(parseInt(id));
      toast.success("Event deleted successfully");
      navigate("/");
    } catch (err) {
      toast.error("Failed to delete event");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    loadEvent(); // Refresh event data after edit
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-6">
        <Error message={error} onRetry={loadEvent} />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="p-6">
        <Error message="Event not found" onRetry={() => navigate("/")} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        className="glass-card rounded-2xl p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span>Back to Calendar</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Edit" className="w-4 h-4" />
              <span>Edit</span>
            </Button>
            
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center space-x-2"
            >
              {isDeleting ? (
                <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
              ) : (
                <ApperIcon name="Trash2" className="w-4 h-4" />
              )}
              <span>Delete</span>
            </Button>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className={`w-4 h-4 rounded-full mt-1 ${
            event.category === "event" 
              ? "bg-primary" 
              : event.category === "chore" 
              ? "bg-secondary" 
              : "bg-accent"
          }`}></div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {event.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <Badge variant={event.category}>
                {event.category}
              </Badge>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <ApperIcon name="Calendar" className="w-4 h-4" />
                <span>
                  {format(new Date(event.startDate), "MMMM d, yyyy")}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <ApperIcon name="Clock" className="w-4 h-4" />
                <span>
                  {format(new Date(event.startDate), "h:mm a")} - {format(new Date(event.endDate), "h:mm a")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Event Details */}
      <motion.div
        className="glass-card rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Description */}
            {event.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {event.description}
                </p>
              </div>
            )}

            {/* Location */}
            {event.location && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Location
                </h3>
                <div className="flex items-center space-x-2 text-gray-600">
                  <ApperIcon name="MapPin" className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            )}

            {/* Recurrence */}
            {event.recurrence && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Recurrence
                </h3>
                <div className="flex items-center space-x-2 text-gray-600">
                  <ApperIcon name="Repeat" className="w-4 h-4" />
                  <span className="capitalize">{event.recurrence.type}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Assigned To */}
            {event.assignedTo && event.assignedTo.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Assigned To
                </h3>
                <div className="space-y-2">
                  {event.assignedTo.map((person, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-gray-600">{person}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Event Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <ApperIcon name="Calendar" className="w-4 h-4" />
                  <span>
                    {format(new Date(event.startDate), "EEEE, MMMM d, yyyy")}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <ApperIcon name="Clock" className="w-4 h-4" />
                  <span>
                    {format(new Date(event.startDate), "h:mm a")} - {format(new Date(event.endDate), "h:mm a")}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <ApperIcon name="Tag" className="w-4 h-4" />
                  <span className="capitalize">{event.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Edit Modal */}
      <EventModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        event={event}
      />
    </div>
  );
};

export default EventDetailsPage;