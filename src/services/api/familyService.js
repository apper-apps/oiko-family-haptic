import familyData from "@/services/mockData/familyMembers.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for family members
let familyMembers = [...familyData];

export const familyService = {
  async getAll() {
    await delay(300);
    return [...familyMembers];
  },

  async getById(id) {
    await delay(200);
    const member = familyMembers.find(m => m.Id === id);
    if (!member) {
      throw new Error("Family member not found");
    }
    return { ...member };
  },

  async create(memberData) {
    await delay(400);
    
    const newMember = {
      Id: Math.max(...familyMembers.map(m => m.Id), 0) + 1,
      ...memberData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    familyMembers.push(newMember);
    return { ...newMember };
  },

  async update(id, memberData) {
    await delay(400);
    
    const index = familyMembers.findIndex(m => m.Id === id);
    if (index === -1) {
      throw new Error("Family member not found");
    }
    
    familyMembers[index] = {
      ...familyMembers[index],
      ...memberData,
      updatedAt: new Date().toISOString()
    };
    
    return { ...familyMembers[index] };
  },

  async delete(id) {
    await delay(300);
    
    const index = familyMembers.findIndex(m => m.Id === id);
    if (index === -1) {
      throw new Error("Family member not found");
    }
    
    familyMembers.splice(index, 1);
    return { success: true };
  }
};