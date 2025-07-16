import { toast } from "react-toastify";

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

export const eventService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "startDate" } },
          { field: { Name: "endDate" } },
          { field: { Name: "category" } },
          { field: { Name: "assignedTo" } },
          { field: { Name: "location" } },
          { field: { Name: "googleEventId" } },
          { field: { Name: "recurrence" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ]
      };
      
      const response = await apperClient.fetchRecords("event", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events");
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "startDate" } },
          { field: { Name: "endDate" } },
          { field: { Name: "category" } },
          { field: { Name: "assignedTo" } },
          { field: { Name: "location" } },
          { field: { Name: "googleEventId" } },
          { field: { Name: "recurrence" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ]
      };
      
      const response = await apperClient.getRecordById("event", id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching event with ID ${id}:`, error);
      toast.error("Failed to fetch event");
      return null;
    }
  },

  async create(eventData) {
    try {
      const apperClient = getApperClient();
      
      // Filter to only include Updateable fields
      const filteredData = {
        Name: eventData.title || "",
        Tags: eventData.tags || "",
        Owner: eventData.owner || null,
        title: eventData.title || "",
        description: eventData.description || "",
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        category: eventData.category || "event",
        assignedTo: Array.isArray(eventData.assignedTo) ? eventData.assignedTo.join(',') : eventData.assignedTo || "",
        location: eventData.location || "",
        googleEventId: eventData.googleEventId || "",
        recurrence: eventData.recurrence ? JSON.stringify(eventData.recurrence) : "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const params = {
        records: [filteredData]
      };
      
      const response = await apperClient.createRecord("event", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} events:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }
      
      throw new Error("Failed to create event");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event");
      throw error;
    }
  },

  async update(id, eventData) {
    try {
      const apperClient = getApperClient();
      
      // Filter to only include Updateable fields
      const filteredData = {
        Id: id,
        Name: eventData.title || "",
        Tags: eventData.tags || "",
        Owner: eventData.owner || null,
        title: eventData.title || "",
        description: eventData.description || "",
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        category: eventData.category || "event",
        assignedTo: Array.isArray(eventData.assignedTo) ? eventData.assignedTo.join(',') : eventData.assignedTo || "",
        location: eventData.location || "",
        googleEventId: eventData.googleEventId || "",
        recurrence: eventData.recurrence ? JSON.stringify(eventData.recurrence) : "",
        updatedAt: new Date().toISOString()
      };
      
      const params = {
        records: [filteredData]
      };
      
      const response = await apperClient.updateRecord("event", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} events:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          return successfulUpdates[0].data;
        }
      }
      
      throw new Error("Failed to update event");
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event");
      throw error;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      const params = {
        RecordIds: [id]
      };
      
      const response = await apperClient.deleteRecord("event", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} events:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
      throw error;
    }
  }
};