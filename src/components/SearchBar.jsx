import { useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ allWidgets, onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term.trim() === "") {
      setIsSearchActive(false);
      onSearchResults([]);
      return;
    }

    const filtered = allWidgets.filter(
      (widget) =>
        widget.name.toLowerCase().includes(term.toLowerCase()) ||
        widget.text.toLowerCase().includes(term.toLowerCase()) ||
        widget.categoryName.toLowerCase().includes(term.toLowerCase())
    );

    setIsSearchActive(true);
    onSearchResults(filtered);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearchActive(false);
    onSearchResults([]);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search anything..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-1 border bg-slate-200 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors duration-200"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Matches Found */}
      {isSearchActive && (
        <div className="absolute top-full left-0 right-0 mt-1 text-sm text-gray-600 bg-white border rounded-lg p-2 shadow-lg z-10">
          Found {onSearchResults.length || 0} widget(s) matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;
