import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/App";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
const Header = () => {
  const { logout } = useContext(AuthContext);
  
  const navItems = [
    { path: "/", label: "Calendar", icon: "Calendar" },
    { path: "/family", label: "Family", icon: "Users" },
    { path: "/settings", label: "Settings", icon: "Settings" }
  ];

  return (
    <motion.header
      className="glass-effect border-b border-white/20 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <ApperIcon name="Calendar" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">OIKO</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`
                }
              >
                <ApperIcon name={item.icon} className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

{/* Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="primary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
              <span className="hidden sm:inline">Add Event</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
            >
              <ApperIcon name="Bell" className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="LogOut" className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-white/20">
        <nav className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-primary"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              <ApperIcon name={item.icon} className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;