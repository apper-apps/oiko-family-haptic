import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const CategoryFilter = ({ activeFilters, onFilterChange }) => {
  const categories = [
    { key: "all", label: "All", icon: "Calendar", color: "text-gray-600" },
    { key: "event", label: "Events", icon: "Calendar", color: "text-primary" },
    { key: "chore", label: "Chores", icon: "CheckSquare", color: "text-secondary" },
    { key: "birthday", label: "Birthdays", icon: "Gift", color: "text-accent" }
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 mr-2">Filter:</span>
      <div className="flex space-x-1">
        {categories.map((category) => (
          <Button
            key={category.key}
            variant={activeFilters.includes(category.key) ? "primary" : "ghost"}
            size="sm"
            onClick={() => onFilterChange(category.key)}
            className="relative"
          >
            <ApperIcon name={category.icon} className={`w-4 h-4 mr-1 ${category.color}`} />
            {category.label}
            {activeFilters.includes(category.key) && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg -z-10"
                layoutId={`filter-${category.key}`}
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;