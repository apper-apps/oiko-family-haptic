import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";

const FormField = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  placeholder = "", 
  required = false,
  error = "",
  className = ""
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={!!error}
        required={required}
      />
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;