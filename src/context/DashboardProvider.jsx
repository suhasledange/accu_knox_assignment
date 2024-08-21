import React, { createContext, useContext, useState, useEffect } from 'react';
import initialDashboardData from '../lib/dashboardData.json';

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

const addShownKeyToInitialData = (data) => {
  return {
    ...data,
    categories: data.categories.map((category) => ({
      ...category,
      widgets: category.widgets.map((widget) => ({
        ...widget,
        shown: widget.shown !== undefined ? widget.shown : true,
      })),
    })),
  };
};

export const DashboardProvider = ({ children }) => {
  const [formDialog, setFormDialog] = useState(false);
  const [dashboardData, setDashboardData] = useState(() => {
    const savedData = localStorage.getItem('dashboardData');
    const parsedData = savedData ? JSON.parse(savedData) : initialDashboardData;
    return addShownKeyToInitialData(parsedData);
  });

  const [searchResults, setSearchResults] = useState(null);

  const saveDataToLocalStorage = (data) => {
    localStorage.setItem('dashboardData', JSON.stringify(data));
  };

  const fetchDashboardData = () => {
    const savedData = localStorage.getItem('dashboardData');
    const parsedData = savedData ? JSON.parse(savedData) : initialDashboardData;
    setDashboardData(addShownKeyToInitialData(parsedData));
    setSearchResults(null);
  };

  const addWidget = (categoryId, widgetName, widgetText) => {
    const updatedData = {
      ...dashboardData,
      categories: dashboardData.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: [
                ...category.widgets,
                {
                  id: `${categoryId}-${widgetName.toLowerCase().replace(/\s+/g, '-')}`,
                  name: widgetName,
                  text: widgetText,
                  graph:false,
                  shown: true,
                },
              ],
            }
          : category
      ),
    };
    setDashboardData(updatedData);
    saveDataToLocalStorage(updatedData);
    setSearchResults(null);
  };

  const removeWidget = (categoryId, widgetId) => {
    const updatedData = {
      ...dashboardData,
      categories: dashboardData.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter((widget) => widget.id !== widgetId),
            }
          : category
      ),
    };
    setDashboardData(updatedData);
    saveDataToLocalStorage(updatedData);
    setSearchResults(null);
  };

  const toggleWidgetVisibility = (categoryId, widgetId) => {
    const updatedData = {
      ...dashboardData,
      categories: dashboardData.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.map((widget) =>
                widget.id === widgetId ? { ...widget, shown: !widget.shown } : widget
              ),
            }
          : category
      ),
    };
    setDashboardData(updatedData);
    saveDataToLocalStorage(updatedData);
    setSearchResults(null);
  };

  const searchWidgets = (searchText) => {
    if (!searchText) {
      setSearchResults(null);
      return;
    }
  
    const lowercasedText = searchText.toLowerCase();
    const results = dashboardData.categories.flatMap((category) =>
      category.widgets.filter(
        (widget) =>
          widget.name.toLowerCase().includes(lowercasedText)
      )
    );
  
    setSearchResults(results.length > 0 ? results : null);
  };

  const dataToRender = searchResults
    ? { ...dashboardData, categories: [{ id: 'search', name: 'Search Results', widgets: searchResults }] }
    : dashboardData;

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dashboardData: dataToRender,
        addWidget,
        removeWidget,
        toggleWidgetVisibility,
        fetchDashboardData,
        formDialog,
        setFormDialog,
        searchWidgets,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
