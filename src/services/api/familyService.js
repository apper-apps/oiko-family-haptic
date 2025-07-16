import { toast } from "react-toastify";

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

export const familyService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "color" } },
          { field: { Name: "birthday" } },
          { field: { Name: "avatar" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ]
      };
      
      const response = await apperClient.fetchRecords("family_member", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching family members:", error);
      toast.error("Failed to fetch family members");
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
          { field: { Name: "color" } },
          { field: { Name: "birthday" } },
          { field: { Name: "avatar" } },
          { field: { Name: "createdAt" } },
          { field: { Name: "updatedAt" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ]
      };
      
      const response = await apperClient.getRecordById("family_member", id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching family member with ID ${id}:`, error);
      toast.error("Failed to fetch family member");
      return null;
    }
  },

  async create(memberData) {
    try {
      const apperClient = getApperClient();
      
      // Filter to only include Updateable fields
      const filteredData = {
        Name: memberData.name || "",
        Tags: memberData.tags || "",
        Owner: memberData.owner || null,
        color: memberData.color || "#7C9EF8",
        birthday: memberData.birthday || "",
        avatar: memberData.avatar || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const params = {
        records: [filteredData]
      };
      
      const response = await apperClient.createRecord("family_member", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} family members:${JSON.stringify(failedRecords)}`);
          
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
      
      throw new Error("Failed to create family member");
    } catch (error) {
      console.error("Error creating family member:", error);
      toast.error("Failed to create family member");
      throw error;
    }
  },

  async update(id, memberData) {
    try {
      const apperClient = getApperClient();
      
      // Filter to only include Updateable fields
      const filteredData = {
        Id: id,
        Name: memberData.name || "",
        Tags: memberData.tags || "",
        Owner: memberData.owner || null,
        color: memberData.color || "#7C9EF8",
        birthday: memberData.birthday || "",
        avatar: memberData.avatar || "",
        updatedAt: new Date().toISOString()
      };
      
      const params = {
        records: [filteredData]
      };
      
      const response = await apperClient.updateRecord("family_member", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} family members:${JSON.stringify(failedUpdates)}`);
          
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
      
      throw new Error("Failed to update family member");
    } catch (error) {
      console.error("Error updating family member:", error);
      toast.error("Failed to update family member");
      throw error;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      const params = {
        RecordIds: [id]
      };
      
      const response = await apperClient.deleteRecord("family_member", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} family members:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting family member:", error);
      toast.error("Failed to delete family member");
      throw error;
    }
  }
};