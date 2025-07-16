import eventData from "@/services/mockData/events.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for events
let events = [...eventData];

export const eventService = {
  async getAll() {
    await delay(300);
    return [...events];
  },

  async getById(id) {
    await delay(200);
    const event = events.find(e => e.Id === id);
    if (!event) {
      throw new Error("Event not found");
    }
    return { ...event };
  },

  async create(eventData) {
    await delay(400);
    
    const newEvent = {
      Id: Math.max(...events.map(e => e.Id), 0) + 1,
      ...eventData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    events.push(newEvent);
    return { ...newEvent };
  },

  async update(id, eventData) {
    await delay(400);
    
    const index = events.findIndex(e => e.Id === id);
    if (index === -1) {
      throw new Error("Event not found");
    }
    
    events[index] = {
      ...events[index],
      ...eventData,
      updatedAt: new Date().toISOString()
    };
    
    return { ...events[index] };
  },

  async delete(id) {
    await delay(300);
    
    const index = events.findIndex(e => e.Id === id);
    if (index === -1) {
      throw new Error("Event not found");
    }
    
    events.splice(index, 1);
    return { success: true };
  }
};