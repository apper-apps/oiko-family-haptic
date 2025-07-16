import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import { eventService } from "@/services/api/eventService";
import { familyService } from "@/services/api/familyService";

const EventModal = ({ isOpen, onClose, event = null, selectedDate = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    category: "event",
    assignedTo: [],
    location: "",
    recurrence: "none"
  });
  
  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      loadFamilyMembers();
      
      if (event) {
        // Edit mode
        const eventDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        
        setFormData({
          title: event.title || "",
          description: event.description || "",
          startDate: format(eventDate, "yyyy-MM-dd"),
          endDate: format(endDate, "yyyy-MM-dd"),
          startTime: format(eventDate, "HH:mm"),
          endTime: format(endDate, "HH:mm"),
          category: event.category || "event",
          assignedTo: event.assignedTo || [],
          location: event.location || "",
          recurrence: event.recurrence?.type || "none"
        });
      } else if (selectedDate) {
        // New event mode
        const dateStr = format(selectedDate, "yyyy-MM-dd");
        setFormData(prev => ({
          ...prev,
          startDate: dateStr,
          endDate: dateStr,
          startTime: "09:00",
          endTime: "10:00"
        }));
      }
    }
  }, [isOpen, event, selectedDate]);

  const loadFamilyMembers = async () => {
    try {
      const members = await familyService.getAll();
      setFamilyMembers(members);
    } catch (error) {
      toast.error("Failed to load family members");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleMemberToggle = (memberId) => {
    setFormData(prev => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(memberId)
        ? prev.assignedTo.filter(id => id !== memberId)
        : [...prev.assignedTo, memberId]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    
    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }
    
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = "End date must be after start date";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
      
      const eventData = {
        title: formData.title,
        description: formData.description,
        startDate: startDateTime.toISOString(),
        endDate: endDateTime.toISOString(),
        category: formData.category,
        assignedTo: formData.assignedTo,
        location: formData.location,
        recurrence: formData.recurrence !== "none" ? { type: formData.recurrence } : null
      };
      
      if (event) {
        await eventService.update(event.Id, eventData);
        toast.success("Event updated successfully!");
      } else {
        await eventService.create(eventData);
        toast.success("Event created successfully!");
      }
      
      onClose();
    } catch (error) {
      toast.error(event ? "Failed to update event" : "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div
          className="glass-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold gradient-text">
                {event ? "Edit Event" : "Create New Event"}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <FormField
                label="Event Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter event title"
                required
                error={errors.title}
              />

              {/* Description */}
              <div className="space-y-2">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter event description"
                  className="form-input resize-none"
                  rows={3}
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  error={errors.startDate}
                />
                
                <FormField
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  error={errors.endDate}
                />
                
                <FormField
                  label="Start Time"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleInputChange}
                />
                
                <FormField
                  label="End Time"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleInputChange}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="event">Event</option>
                  <option value="chore">Chore</option>
                  <option value="birthday">Birthday</option>
                </select>
              </div>

              {/* Location */}
              <FormField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location (optional)"
              />

              {/* Assigned To */}
              <div className="space-y-2">
                <label className="form-label">Assign To</label>
                <div className="flex flex-wrap gap-2">
                  {familyMembers.map((member) => (
                    <button
                      key={member.Id}
                      type="button"
                      onClick={() => handleMemberToggle(member.Id)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        formData.assignedTo.includes(member.Id)
                          ? "bg-gradient-to-r from-primary to-secondary text-white"
                          : "glass-effect text-gray-600 hover:bg-white/50"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: member.color }}
                        ></div>
                        <span>{member.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recurrence */}
              <div className="space-y-2">
                <label className="form-label">Repeat</label>
                <select
                  name="recurrence"
                  value={formData.recurrence}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="none">No Repeat</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className="flex items-center space-x-2"
                >
                  {loading && <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />}
                  <span>{event ? "Update Event" : "Create Event"}</span>
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EventModal;