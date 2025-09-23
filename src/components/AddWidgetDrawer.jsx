import { useState, useEffect } from "react";
import { X } from "lucide-react";

const AddWidgetDrawer = ({
  isOpen,
  onClose,
  onAddWidget,
  categoryName,
  categoryId,
  allWidgets,
}) => {
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");
  const [selectedTab, setSelectedTab] = useState("CSPM");

  // Widget categories for tabs
  const widgetCategories = {
    CSPM: {
      name: "CSPM",
      widgets: [
        {
          id: "cloud-accounts",
          name: "Cloud Accounts",
          description: "Monitor cloud account connections",
        },
        {
          id: "cloud-security",
          name: "Cloud Account Risk Assessment",
          description: "Security risk analysis",
        },
      ],
    },
    CWPP: {
      name: "CWPP",
      widgets: [
        {
          id: "namespace-alerts",
          name: "Top 5 Namespace Specific Alerts",
          description: "Namespace monitoring",
        },
        {
          id: "workload-alerts",
          name: "Workload Alerts",
          description: "Workload security alerts",
        },
      ],
    },
    Image: {
      name: "Image",
      widgets: [
        {
          id: "image-risk",
          name: "Image Risk Assessment",
          description: "Container image vulnerabilities",
        },
        {
          id: "image-security",
          name: "Image Security Issues",
          description: "Security issues in images",
        },
      ],
    },
    Ticket: {
      name: "Ticket",
      widgets: [
        {
          id: "open-tickets",
          name: "Open Tickets",
          description: "Currently open support tickets",
        },
        {
          id: "resolved-tickets",
          name: "Resolved Tickets",
          description: "Recently resolved tickets",
        },
      ],
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (widgetName.trim() && widgetText.trim()) {
      onAddWidget(categoryId, {
        name: widgetName.trim(),
        text: widgetText.trim(),
        type: "custom",
      });

      setWidgetName("");
      setWidgetText("");
      onClose();
    }
  };

  const handleClose = () => {
    setWidgetName("");
    setWidgetText("");
    onClose();
  };

  const handleWidgetSelect = (widget) => {
    setWidgetName(widget.name);
    setWidgetText(widget.description);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-2xl bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-primary-600 text-white px-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Add Widget</h2>
            <button
              onClick={handleClose}
              className="p-2 text-white hover:bg-primary-700 rounded-full transition-colors duration-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <p className="p-2 mt-1">
            Personalise your dashboard by adding the following widget
          </p>
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {Object.entries(widgetCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTab(key)}
                  className={`px-6 py-1 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    selectedTab === key
                      ? "border-primary-600 text-primary-600 bg-primary-50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Widget Selection */}
          <div className="px-6 py-2">
            <div className="space-y-4">
              {widgetCategories[selectedTab]?.widgets.map((widget) => (
                <div
                  key={widget.id}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
                >
                  <input
                    type="checkbox"
                    id={widget.id}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleWidgetSelect(widget);
                      } else {
                        setWidgetName("");
                        setWidgetText("");
                      }
                    }}
                    checked={widgetName === widget.name}
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={widget.id}
                      className="block text-sm font-medium text-gray-800 cursor-pointer"
                    >
                      {widget.name}
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      {widget.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Widget Form */}
            {(widgetName || widgetText) && (
              <div className="mt-4 px-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Widget Details
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="widgetName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Widget Name *
                    </label>
                    <input
                      id="widgetName"
                      type="text"
                      value={widgetName}
                      onChange={(e) => setWidgetName(e.target.value)}
                      placeholder="Enter widget name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors duration-200"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="widgetText"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Widget Content *
                    </label>
                    <textarea
                      id="widgetText"
                      value={widgetText}
                      onChange={(e) => setWidgetText(e.target.value)}
                      placeholder="Enter widget content"
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors duration-200 resize-vertical"
                      required
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-white">
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!widgetName.trim() || !widgetText.trim()}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWidgetDrawer;
