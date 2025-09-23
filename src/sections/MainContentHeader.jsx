import TimerButton from "../components/TimerButton";
import { Plus, RefreshCcw, EllipsisVertical } from "lucide-react";

const MainContentHeader = ({
  onAddWidget,
  allWidgets = [],
  categories = [],
}) => {
  const handleAddWidget = () => {
    const defaultCategory =
      categories.length > 0
        ? categories[0]
        : { id: "default", name: "Dashboard" };
    onAddWidget(defaultCategory.id, defaultCategory.name);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 sm:py-2 gap-3 sm:gap-0">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate pr-2 sm:pr-0">
        CNAPP Dashboard
      </h1>

      <div className="flex flex-nowrap items-center gap-1 sm:gap-2 w-full sm:w-auto overflow-x-auto">
        <button
          onClick={handleAddWidget}
          className="flex items-center justify-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-white border border-gray-300 rounded-md sm:rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-xs sm:text-sm md:text-base min-w-fit flex-shrink-0"
        >
          <Plus
            size={14}
            className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] flex-shrink-0"
          />
          <span className="hidden sm:inline whitespace-nowrap">Add Widget</span>
          <span className="sm:hidden text-xs whitespace-nowrap">Add</span>
        </button>

        <button className="flex items-center justify-center h-10 px-2 py-1.5 sm:px-2 sm:py-1 bg-white border border-gray-300 rounded-md sm:rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 min-w-[36px] sm:min-w-[44px] flex-shrink-0">
          <RefreshCcw size={14} className="sm:w-[15px] sm:h-[15px]" />
        </button>

        <button className="flex items-center justify-center h-10 px-2 py-1.5 sm:px-2 sm:py-1 bg-white border border-gray-300 rounded-md sm:rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 min-w-[36px] sm:min-w-[44px] flex-shrink-0">
          <EllipsisVertical size={14} className="sm:w-[15px] sm:h-[15px]" />
        </button>

        <div className="flex-shrink-0">
          <TimerButton />
        </div>
      </div>
    </div>
  );
};

export default MainContentHeader;
