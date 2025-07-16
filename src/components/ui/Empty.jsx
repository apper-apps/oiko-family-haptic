import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  description = "Get started by creating your first item",
  actionLabel = "Create New",
  onAction,
  icon = "Calendar",
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`glass-card rounded-2xl p-12 text-center ${className}`}
    >
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
        <ApperIcon name={icon} className="w-10 h-10 text-primary" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        {description}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="btn-primary flex items-center space-x-2 mx-auto"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          <span>{actionLabel}</span>
        </button>
      )}
    </motion.div>
  );
};

export default Empty;