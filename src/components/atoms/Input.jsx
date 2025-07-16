import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  type = "text", 
  placeholder = "", 
  className = "", 
  error = false,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 glass-effect rounded-xl border border-white/20 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300";
  
  const errorStyles = error ? "border-error/50 focus:ring-error/50 focus:border-error/50" : "";
  
  const classes = cn(baseStyles, errorStyles, className);
  
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={classes}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;