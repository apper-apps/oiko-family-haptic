import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import Button from "@/components/atoms/Button";
import { familyService } from "@/services/api/familyService";

const FamilyPage = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    birthday: "",
    color: "#7C9EF8"
  });

  useEffect(() => {
    loadFamilyMembers();
  }, []);

  const loadFamilyMembers = async () => {
    try {
      setLoading(true);
      setError("");
      const members = await familyService.getAll();
      setFamilyMembers(members);
    } catch (err) {
      setError("Failed to load family members");
      toast.error("Failed to load family members");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    
    if (!newMember.name.trim()) {
      toast.error("Please enter a name");
      return;
    }

    try {
      await familyService.create(newMember);
      toast.success("Family member added successfully!");
      setNewMember({ name: "", birthday: "", color: "#7C9EF8" });
      setIsAddingMember(false);
      loadFamilyMembers();
    } catch (err) {
      toast.error("Failed to add family member");
    }
  };

  const handleDeleteMember = async (memberId) => {
    if (!window.confirm("Are you sure you want to remove this family member?")) {
      return;
    }

    try {
      await familyService.delete(memberId);
      toast.success("Family member removed successfully!");
      loadFamilyMembers();
    } catch (err) {
      toast.error("Failed to remove family member");
    }
  };

  const colors = [
    "#7C9EF8", "#9B89D3", "#8B7FE8", "#52C782", "#F5A623", "#E85D75", "#5DADE2"
  ];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-6">
        <Error message={error} onRetry={loadFamilyMembers} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="glass-card rounded-2xl p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Family Members
            </h1>
            <p className="text-gray-600">
              Manage your family members and their preferences
            </p>
          </div>
          
          <Button
            variant="primary"
            onClick={() => setIsAddingMember(true)}
            className="flex items-center space-x-2"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            <span>Add Member</span>
          </Button>
        </div>
      </motion.div>

      {/* Add Member Form */}
      {isAddingMember && (
        <motion.div
          className="glass-card rounded-2xl p-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleAddMember} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Name</label>
                <input
                  type="text"
                  value={newMember.name}
onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Enter family member name"
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label className="form-label">Birthday</label>
                <input
                  type="date"
                  value={newMember.birthday}
                  onChange={(e) => setNewMember({ ...newMember, birthday: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>
            
            <div>
              <label className="form-label">Color</label>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setNewMember({ ...newMember, color })}
                    className={`w-8 h-8 rounded-full border-2 ${
                      newMember.color === color ? "border-gray-800" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button type="submit" variant="primary">
                Add Member
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsAddingMember(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Family Members List */}
      {familyMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyMembers.map((member, index) => (
            <motion.div
              key={member.Id}
              className="glass-card rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
style={{ backgroundColor: member.color }}
                  >
                    {member.Name?.charAt(0).toUpperCase() || member.name?.charAt(0).toUpperCase()}
                  </div>
<div>
                    <h3 className="font-semibold text-gray-800">{member.Name || member.name}</h3>
                    {member.birthday && (
                      <p className="text-sm text-gray-600">
                        {new Date(member.birthday).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteMember(member.Id)}
                  className="text-error hover:bg-error/10"
                >
                  <ApperIcon name="Trash2" className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <ApperIcon name="Palette" className="w-4 h-4" />
                  <span>Color Theme</span>
</div>
                
                {member.birthday && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ApperIcon name="Gift" className="w-4 h-4" />
                    <span>Birthday: {new Date(member.birthday).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <Empty
          title="No family members yet"
          description="Add your first family member to get started with organizing your family calendar"
          actionLabel="Add Family Member"
          onAction={() => setIsAddingMember(true)}
          icon="Users"
        />
      )}
    </div>
  );
};

export default FamilyPage;