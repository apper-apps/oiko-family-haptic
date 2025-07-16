import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const QuickActions = ({ onAddEvent, onAddChore, onAddBirthday }) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="primary"
        size="sm"
        onClick={onAddEvent}
        className="flex items-center space-x-2"
      >
        <ApperIcon name="Plus" className="w-4 h-4" />
        <span>Event</span>
      </Button>
      
      <Button
        variant="secondary"
        size="sm"
        onClick={onAddChore}
        className="flex items-center space-x-2"
      >
        <ApperIcon name="CheckSquare" className="w-4 h-4" />
        <span>Chore</span>
      </Button>
      
      <Button
        variant="secondary"
        size="sm"
        onClick={onAddBirthday}
        className="flex items-center space-x-2"
      >
        <ApperIcon name="Gift" className="w-4 h-4" />
        <span>Birthday</span>
      </Button>
    </div>
  );
};

export default QuickActions;