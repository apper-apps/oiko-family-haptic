import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Label = forwardRef(({ 
  children, 
  htmlFor, 
  className = "", 
  required = false,
  ...props 
}, ref) => {
  const baseStyles = "block text-sm font-medium text-gray-700 mb-2";
  
  const classes = cn(baseStyles, className);
  
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={classes}
      {...props}
    >
      {children}
      {required && <span className="text-error ml-1">*</span>}
    </label>
  );
});

Label.displayName = "Label";

export default Label;