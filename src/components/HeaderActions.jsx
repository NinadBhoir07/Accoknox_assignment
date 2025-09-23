import { Settings, BellRing } from "lucide-react";
import SearchBar from "./SearchBar";

const HeaderActions = ({ allWidgets, onSearchResults, onManageWidgets }) => {
  return (
    <div className="flex items-center gap-4">
      {/* Search Bar */}
      <div className="w-80">
        <SearchBar allWidgets={allWidgets} onSearchResults={onSearchResults} />
      </div>

      <div className="text-gray-500">
        <BellRing />
      </div>

      {/* Manage Button */}
      <button
        onClick={onManageWidgets}
        className="flex items-center gap-2 px-4 py-1 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
      >
        <Settings size={18} />
        <span className="hidden sm:inline">Manage Widgets</span>
        <span className="sm:hidden">Manage</span>
      </button>
    </div>
  );
};

export default HeaderActions;
