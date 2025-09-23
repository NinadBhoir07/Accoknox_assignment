import { Plus } from "lucide-react";
import Widget from "./Widget";

const WidgetGrid = ({
  category,
  isSearchActive,
  onAddWidget,
  onRemoveWidget,
}) => {
  const handleRemoveWidget = (widgetId) => {
    onRemoveWidget(category.id, widgetId);
  };

  if (isSearchActive) {
    if (category.widgets.length === 0) {
      return (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="text-gray-500">
            No widgets found matching your search
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            onRemove={handleRemoveWidget}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Existing Widgets */}
      {category.widgets.map((widget) => (
        <Widget key={widget.id} widget={widget} onRemove={handleRemoveWidget} />
      ))}

      {/* Add Widget Card */}
      <AddWidgetCard onAddWidget={onAddWidget} />
    </div>
  );
};

// Add Widget Card Component
const AddWidgetCard = ({ onAddWidget }) => (
  <div
    onClick={onAddWidget}
    className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all duration-200 group min-h-[200px]"
  >
    <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-3 group-hover:border-primary-400 transition-colors duration-200">
      <Plus
        size={24}
        className="text-gray-400 group-hover:text-primary-600 transition-colors duration-200"
      />
    </div>

    <div className="text-gray-600 group-hover:text-primary-700 transition-colors duration-200">
      <div className="font-medium mb-1">Add Widget</div>
      <div className="text-sm text-gray-500 group-hover:text-primary-600">
        Click to add a new widget
      </div>
    </div>
  </div>
);

export default WidgetGrid;
