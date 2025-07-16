import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  children, 
  variant = "default", 
  className = "", 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary",
    secondary: "bg-secondary/20 text-secondary",
    success: "bg-success/20 text-success",
    warning: "bg-warning/20 text-warning",
    error: "bg-error/20 text-error",
    event: "bg-primary/20 text-primary",
    chore: "bg-secondary/20 text-secondary",
    birthday: "bg-accent/20 text-accent"
  };
  
  const classes = cn(baseStyles, variants[variant], className);
  
  return (
    <span ref={ref} className={classes} {...props}>
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;