import { useState, useRef, useEffect } from "react";
import { Clock, ChevronDown } from "lucide-react";

const TimerButton = ({
  selectedFilter = "Last 2 days",
  onFilterChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const timeFilters = [
    { id: "last-2-days", label: "Last 2 days" },
    { id: "last-7-days", label: "Last 7 days" },
    { id: "last-30-days", label: "Last 30 days" },
    { id: "last-3-months", label: "Last 3 months" },
    { id: "last-6-months", label: "Last 6 months" },
    { id: "last-year", label: "Last year" },
    { id: "today", label: "Today" },
    { id: "yesterday", label: "Yesterday" },
    { id: "this-week", label: "This week" },
    { id: "this-month", label: "This month" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterSelect = (filter) => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Main Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 min-w-[140px] justify-between"
      >
        {/* Clock Icon */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary-100 flex items-center justify-center">
            <Clock size={18} className="text-primary-600" />
          </div>
          <span className="font-medium">{selectedFilter}</span>
        </div>

        {/* Chevron Icon */}
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full min-w-[180px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
          {timeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterSelect(filter.label)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                selectedFilter === filter.label
                  ? "bg-primary-50 text-primary-700 font-medium"
                  : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                {selectedFilter === filter.label && (
                  <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                )}
                <span
                  className={selectedFilter === filter.label ? "ml-0" : "ml-4"}
                >
                  {filter.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimerButton;
