import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "", 
  disabled = false,
  onClick,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/25 focus:ring-primary/50",
    secondary: "glass-effect text-primary hover:bg-white/50 focus:ring-primary/50",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50",
    success: "bg-gradient-to-r from-success to-success/80 text-white hover:shadow-lg hover:shadow-success/25 focus:ring-success/50",
    danger: "bg-gradient-to-r from-error to-error/80 text-white hover:shadow-lg hover:shadow-error/25 focus:ring-error/50"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-xl"
  };
  
  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );
  
  return (
    <motion.button
      ref={ref}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;