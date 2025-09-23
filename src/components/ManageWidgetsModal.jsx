import { useState, useMemo } from "react";
import { X, Search } from "lucide-react";

const ManageWidgetsModal = ({
  isOpen,
  onClose,
  categories,
  allWidgets,
  onToggleWidget,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const widgetsByCategory = useMemo(() => {
    const result = {};

    categories.forEach((category) => {
      result[category.id] = {
        categoryName: category.name,
        widgets: [],
      };

      const allUniqueWidgets = new Set();
      categories.forEach((cat) => {
        cat.widgets.forEach((widget) => {
          allUniqueWidgets.add(widget.name);
        });
      });

      allUniqueWidgets.forEach((widgetName) => {
        const existsInCategory = category.widgets.find(
          (w) => w.name === widgetName
        );
        const originalWidget = categories
          .flatMap((cat) => cat.widgets)
          .find((w) => w.name === widgetName);

        if (originalWidget) {
          result[category.id].widgets.push({
            id: originalWidget.id,
            name: originalWidget.name,
            text: originalWidget.text,
            isActive: !!existsInCategory,
          });
        }
      });
    });

    return result;
  }, [categories]);

  const filteredWidgetsByCategory = useMemo(() => {
    if (!searchTerm.trim()) return widgetsByCategory;

    const filtered = {};
    Object.keys(widgetsByCategory).forEach((categoryId) => {
      const category = widgetsByCategory[categoryId];
      const filteredWidgets = category.widgets.filter((widget) =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filteredWidgets.length > 0) {
        filtered[categoryId] = {
          ...category,
          widgets: filteredWidgets,
        };
      }
    });

    return filtered;
  }, [widgetsByCategory, searchTerm]);

  const handleToggle = (categoryId, widgetId, isChecked) => {
    onToggleWidget(categoryId, widgetId, isChecked);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Manage Widgets
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search widgets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors duration-200"
            />
          </div>
        </div>

        {/* Categories and Widgets */}
        <div className="flex-1 overflow-y-auto">
          {Object.keys(filteredWidgetsByCategory).length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              {searchTerm
                ? `No widgets found matching "${searchTerm}"`
                : "No widgets available"}
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(filteredWidgetsByCategory).map(
                ([categoryId, category]) => (
                  <div
                    key={categoryId}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <h3 className="text-md font-semibold text-gray-800 mb-3">
                      {category.categoryName}
                    </h3>
                    <div className="space-y-2">
                      {category.widgets.map((widget) => (
                        <label
                          key={`${categoryId}-${widget.id}`}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        >
                          <input
                            type="checkbox"
                            checked={widget.isActive}
                            onChange={(e) =>
                              handleToggle(
                                categoryId,
                                widget.id,
                                e.target.checked
                              )
                            }
                            className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-800">
                              {widget.name}
                            </div>
                            <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {widget.text}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-gray-200 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageWidgetsModal;
