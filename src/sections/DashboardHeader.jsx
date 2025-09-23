import { ChevronRight } from "lucide-react";
import HeaderActions from "../components/HeaderActions";

const DashboardHeader = ({ allWidgets, onSearchResults, onManageWidgets }) => {
  return (
    <div className="bg-slate-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 sm:py-2 gap-2 sm:gap-0">
          {/* Left side - Title and selected option */}
          <div className="flex items-center text-xs sm:text-sm text-gray-600 mt-0 sm:mt-1 order-1">
            <span className="truncate">Home</span>
            <ChevronRight size={14} className="mx-1 sm:mx-1 flex-shrink-0" />
            <span className="text-primary-700 font-semibold truncate">
              Dashboard V2
            </span>
          </div>

          {/* Right side - Actions */}
          <div className="w-full sm:w-auto order-2 sm:order-2">
            <HeaderActions
              allWidgets={allWidgets}
              onSearchResults={onSearchResults}
              onManageWidgets={onManageWidgets}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
