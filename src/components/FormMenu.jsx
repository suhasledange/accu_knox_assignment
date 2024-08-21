import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDashboardContext } from "../context/DashboardProvider";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const FormMenu = () => {
  const { register, handleSubmit, reset } = useForm();
  const {
    dashboardData,
    formDialog,
    setFormDialog,
    addWidget,
    removeWidget,
    toggleWidgetVisibility,

  } = useDashboardContext();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(
    dashboardData.categories?.[0]?.id || null
  );

  const [showAddWidgetInput, setShowAddWidgetInput] = useState(false);

  const [widgetVisibility, setWidgetVisibility] = useState(() => {
    const initialVisibility = {};

    if (dashboardData && dashboardData.categories) {
      dashboardData.categories.forEach((category) => {
        category.widgets.forEach((widget) => {
          initialVisibility[widget.id] = widget.shown;
        });
      });
    }

    return initialVisibility;
  });

  useEffect(() => {
    if (formDialog) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 200);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [formDialog]);

  const formReset = () => {
    setFormDialog(false);
    reset();
    setShowAddWidgetInput(false);
  };

  const handleWidgetCheckboxChange = (widgetId) => (event) => {
    setWidgetVisibility((prevState) => ({
      ...prevState,
      [widgetId]: event.target.checked,
    }));
  };

  const handleAddWidget = (data) => {
    const { widgetName } = data;
    if (widgetName && selectedCategory) {
      addWidget(selectedCategory, widgetName, "Default widget text");
      setShowAddWidgetInput(false);
      reset();
    }
  };

  const handleRemoveWidget = (categoryID,widgetID)=>{

      
  }

  const handleConfirm = () => {
    Object.keys(widgetVisibility).forEach((widgetId) => {
      const isShown = widgetVisibility[widgetId];
      const category = dashboardData.categories.find((category) =>
        category.widgets.some((widget) => widget.id === widgetId)
      );
      if (category) {
        const widget = category.widgets.find(
          (widget) => widget.id === widgetId
        );
        if (widget.shown !== isShown) {
          toggleWidgetVisibility(category.id, widgetId);
        }
      }
    });

    formReset();
  };

  if (!dashboardData.categories || dashboardData.categories.length === 0) {
    return null;
  }

  return (
    isVisible && (
      <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden">
        <div
          className={`fixed inset-0 w-full ${
            isAnimating ? "opacity-60" : "opacity-0"
          } duration-200  transform h-full bg-black `}
          onClick={formReset}
        ></div>
        <div className="flex flex-col items-end min-h-screen">
          <div
            className={`relative transform w-full max-w-xl duration-300 p-4 px-4 h-full min-h-screen bg-white rounded-sm shadow-lg ${
              isAnimating ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center text-gray-700 justify-between mb-3">
              <h2 className="font-semibold text-lg">Add Widget</h2>
              <CloseIcon
                className="text-2xl cursor-pointer"
                onClick={formReset}
              />
            </div>
            <p className="text-sm font-medium mb-4">
              Personalize your dashboard by adding the following widgets
            </p>

            <div className="overflow-hidden h-[calc(100vh-18vh)] flex flex-col justify-between py-3">
              <div>
                {/* Tabs for categories */}
                <div className="flex mb-4">
                  {dashboardData.categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`py-2 px-4 border-b-2 ${
                        selectedCategory === category.id
                          ? "font-semibold border-b-black"
                          : ""
                      }`}
                    >
                      {category.shortname}
                    </button>
                  ))}
                </div>

                {/* Checkbox list for existing widgets */}
                <div className="mb-4 flex flex-col gap-2">
                  {dashboardData.categories
                    .find((category) => category.id === selectedCategory)
                    ?.widgets.map((widget) => (
                      <div 
                      key={widget.id}
                      className="border flex items-center justify-between">
                      <label
                        className="custom-checkbox flex p-1 px-2 items-center rounded-sm border-gray-300 space-x-3"
                      >
                        <input
                          type="checkbox"
                          onChange={handleWidgetCheckboxChange(widget.id)}
                          checked={widgetVisibility[widget.id]}
                        />
                        <span>{widget.name}</span>
                      </label>
                      <DeleteIcon onClick={()=>removeWidget(selectedCategory,widget.id)} fontSize="small" className="text-gray-800 cursor-pointer"/>
                      </div>
                    ))}
                </div>
                {/* Add Widget Button/Icon */}
                {!showAddWidgetInput && (
                  <div className="flex items-center space-x-2 mb-4">
                    <AddIcon
                      className="text-blue-950 cursor-pointer"
                      onClick={() => setShowAddWidgetInput(true)}
                    />
                    <span
                      className="text-blue-950 cursor-pointer"
                      onClick={() => setShowAddWidgetInput(true)}
                    >
                      Add Widget
                    </span>
                  </div>
                )}

                {/* Input field for adding a new widget */}
                {showAddWidgetInput && (
                  <form
                    onSubmit={handleSubmit(handleAddWidget)}
                    className="mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        {...register("widgetName", { required: true })}
                        className=" border-b-2 outline-none "
                        placeholder="Enter widget name"
                      />
                      <button
                        onClick={() => setShowAddWidgetInput(false)}
                        className="border border-black text-gray-600 py-[0.1rem] px-2 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-950 text-white py-[0.1rem] px-4 rounded-md"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={formReset}
                  className="border active:scale-95 border-black rounded-md flex items-center justify-center py-1 px-4"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-950 active:scale-95 text-white py-1 px-4 rounded-md"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default FormMenu;
