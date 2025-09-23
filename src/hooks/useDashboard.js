import { useReducer, useMemo } from 'react';
import { initialDashboardData } from '../data/initialData';

function dashboardReducer(state, action) {
  switch (action.type) {
    case 'ADD_WIDGET':
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.categoryId
            ? {
              ...category,
              widgets: [...category.widgets, action.widget]
            }
            : category
        )
      };

    case 'REMOVE_WIDGET':
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.categoryId
            ? {
              ...category,
              widgets: category.widgets.filter(widget => widget.id !== action.widgetId)
            }
            : category
        )
      };

    case 'TOGGLE_WIDGET':
      const { categoryId, widgetId, isChecked } = action;

      if (isChecked) {
        let widgetToAdd = null;
        state.categories.forEach(cat => {
          const found = cat.widgets.find(w => w.id === widgetId);
          if (found) widgetToAdd = found;
        });

        if (widgetToAdd) {
          return {
            ...state,
            categories: state.categories.map(category =>
              category.id === categoryId
                ? {
                  ...category,
                  widgets: category.widgets.some(w => w.id === widgetId)
                    ? category.widgets
                    : [...category.widgets, widgetToAdd]
                }
                : category
            )
          };
        }
      } else {
        // Remove widget from the category
        return {
          ...state,
          categories: state.categories.map(category =>
            category.id === categoryId
              ? {
                ...category,
                widgets: category.widgets.filter(widget => widget.id !== widgetId)
              }
              : category
          )
        };
      }
      return state;

    default:
      return state;
  }
}

export function useDashboard() {
  const [dashboardData, dispatch] = useReducer(dashboardReducer, initialDashboardData);

  const addWidget = (categoryId, widget) => {
    dispatch({
      type: 'ADD_WIDGET',
      categoryId,
      widget: {
        ...widget,
        id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }
    });
  };

  const removeWidget = (categoryId, widgetId) => {
    dispatch({
      type: 'REMOVE_WIDGET',
      categoryId,
      widgetId
    });
  };

  const toggleWidget = (categoryId, widgetId, isChecked) => {
    dispatch({
      type: 'TOGGLE_WIDGET',
      categoryId,
      widgetId,
      isChecked
    });
  };

  const allWidgets = useMemo(() => {
    const widgets = [];
    dashboardData.categories.forEach(category => {
      category.widgets.forEach(widget => {
        widgets.push({
          ...widget,
          categoryId: category.id,
          categoryName: category.name
        });
      });
    });
    return widgets;
  }, [dashboardData]);

  return {
    dashboardData,
    addWidget,
    removeWidget,
    toggleWidget,
    allWidgets
  };
}