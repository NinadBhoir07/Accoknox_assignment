import { useEffect } from "react";
import CategorySection from "./CategorySection";
import MainContentHeader from "./MainContentHeader";

const MainContent = ({
  categories,
  isSearchActive,
  onAddWidget,
  onRemoveWidget,
  onManageWidgets,
}) => {
  const allWidgets = categories.flatMap((category) =>
    category.widgets.map((widget) => ({
      ...widget,
      categoryId: category.id,
      categoryName: category.name,
    }))
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Main Content Header with Add Widget functionality */}
      <MainContentHeader
        onAddWidget={onAddWidget}
        allWidgets={allWidgets}
        categories={categories}
      />

      {/* Categories */}
      {categories.map((category) => (
        <CategorySection
          key={category.id}
          category={category}
          isSearchActive={isSearchActive}
          onAddWidget={onAddWidget}
          onRemoveWidget={onRemoveWidget}
        />
      ))}
      {categories.every((cat) => cat.widgets.length === 0) &&
        !isSearchActive && <EmptyDashboard onManageWidgets={onManageWidgets} />}
    </div>
  );
};

// Empty Dashboard Component
const EmptyDashboard = ({ onManageWidgets }) => (
  <div className="text-center py-12">
    <div className="text-gray-500 mb-4">
      Your dashboard is empty. Start by adding some widgets!
    </div>
    <button
      onClick={onManageWidgets}
      className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
    >
      Get Started
    </button>
  </div>
);

export default MainContent;
