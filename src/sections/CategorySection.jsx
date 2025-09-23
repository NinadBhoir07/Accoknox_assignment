import React from "react";
import WidgetGrid from "../components/WidgetGrid";

const CategorySection = ({
  category,
  isSearchActive,
  onAddWidget,
  onRemoveWidget,
}) => {
  const handleAddWidget = () => {
    onAddWidget(category.id, category.name);
  };

  return (
    <div className="mb-8">
      {/* Category Header - Only title, no add button */}
      <CategoryHeader categoryName={category.name} />

      {/* Widgets Content with Add Widget Card */}
      <WidgetGrid
        category={category}
        isSearchActive={isSearchActive}
        onAddWidget={handleAddWidget}
        onRemoveWidget={onRemoveWidget}
      />
    </div>
  );
};

// Simplified Category Header Component - Only displays the title
const CategoryHeader = ({ categoryName }) => (
  <div className="mb-6">
    <h2 className="text-lg font-semibold text-gray-800">{categoryName}</h2>
  </div>
);

export default CategorySection;
