import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import MainContent from "./MainContent";
import AddWidgetDrawer from "../components/AddWidgetDrawer";
import ManageWidgetsModal from "../components/ManageWidgetsModal";
import { useDashboard } from "../hooks/useDashboard";

const Dashboard = () => {
  const { dashboardData, addWidget, removeWidget, toggleWidget, allWidgets } =
    useDashboard();

  const [addWidgetDrawer, setAddWidgetDrawer] = useState({
    isOpen: false,
    categoryId: null,
    categoryName: null,
  });
  const [manageWidgetsModal, setManageWidgetsModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Handle adding widget
  const handleAddWidget = (categoryId, categoryName) => {
    setAddWidgetDrawer({ isOpen: true, categoryId, categoryName });
  };

  // Handle closing add widget drawer
  const handleCloseAddWidget = () => {
    setAddWidgetDrawer({ isOpen: false, categoryId: null, categoryName: null });
  };

  // Handle search results
  const handleSearchResults = (results) => {
    setSearchResults(results);
    setIsSearchActive(results.length > 0);
  };

  // Handle opening manage widgets modal
  const handleManageWidgets = () => {
    setManageWidgetsModal(true);
  };

  // Handle closing manage widgets modal
  const handleCloseManageWidgets = () => {
    setManageWidgetsModal(false);
  };

  // Determine which categories to display (normal or search results)
  const displayCategories = isSearchActive
    ? [{ id: "search-results", name: "Search Results", widgets: searchResults }]
    : dashboardData.categories;

  return (
    <div className="min-h-screen bg-slate-200">
      {/* Header Section */}
      <DashboardHeader
        allWidgets={allWidgets}
        onSearchResults={handleSearchResults}
        onManageWidgets={handleManageWidgets}
      />

      {/* Main Content Section */}
      <MainContent
        categories={displayCategories}
        isSearchActive={isSearchActive}
        onAddWidget={handleAddWidget}
        onRemoveWidget={removeWidget}
        onManageWidgets={handleManageWidgets}
      />

      {/* Add Widget Drawer */}
      <AddWidgetDrawer
        isOpen={addWidgetDrawer.isOpen}
        onClose={handleCloseAddWidget}
        onAddWidget={addWidget}
        categoryName={addWidgetDrawer.categoryName}
        categoryId={addWidgetDrawer.categoryId}
        allWidgets={allWidgets}
      />

      {/* Manage Widgets Modal */}
      <ManageWidgetsModal
        isOpen={manageWidgetsModal}
        onClose={handleCloseManageWidgets}
        categories={dashboardData.categories}
        allWidgets={allWidgets}
        onToggleWidget={toggleWidget}
      />
    </div>
  );
};

export default Dashboard;
