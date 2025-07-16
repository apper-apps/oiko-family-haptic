import { format, addMonths, subMonths } from "date-fns";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const DateNavigator = ({ currentDate, onDateChange }) => {
  const handlePrevious = () => {
    onDateChange(subMonths(currentDate, 1));
  };

  const handleNext = () => {
    onDateChange(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePrevious}
        className="p-2"
      >
        <ApperIcon name="ChevronLeft" className="w-4 h-4" />
      </Button>
      
      <div className="flex items-center space-x-2">
        <h2 className="text-2xl font-bold gradient-text">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToday}
          className="text-sm"
        >
          Today
        </Button>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleNext}
        className="p-2"
      >
        <ApperIcon name="ChevronRight" className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default DateNavigator;