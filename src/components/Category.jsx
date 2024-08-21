import React, { useState } from 'react';
import { useDashboardContext } from '../context/DashboardProvider';
import Widget from './Widget';
import AddIcon from '@mui/icons-material/Add';

const Category = ({ category }) => {
  const { addWidget, removeWidget,setFormDialog } = useDashboardContext();
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const handleAddWidget = () => {
    if (widgetName.trim() && widgetText.trim()) {
      addWidget(category.id, widgetName, widgetText);
      setWidgetName('');
      setWidgetText('');
    }
  };

  return (
    <div className="w-full ">
      <h2 className="text-sm font-bold">{category.name}</h2>
      <div className="flex flex-grow items-center justify-start gap-2 overflow-x-auto py-1">
        {category.widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            onRemoveWidget={() => removeWidget(category.id, widget.id)}
          />
        ))}
          <div onClick={(()=>setFormDialog(true))} className=" cursor-pointer border flex-shrink-0 flex items-center justify-center border-gray-300 p-2 w-[30rem] h-[13rem] rounded-lg bg-gray-50">
      <button
        className="text-gray-600 font-medium rounded-md flex text-sm items-center gap-1 justify-center py-1 px-3 border-2"
      >
      <AddIcon fontSize='small' className='text-gray-600'/> Add Widget 
      </button>
    </div>
      </div>
     
     
      {/* <div className="mt-6">
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2 mr-2"
          placeholder="Widget Name"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
        />
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2 mr-2"
          placeholder="Widget Text"
          value={widgetText}
          onChange={(e) => setWidgetText(e.target.value)}
        />
        <button
          onClick={handleAddWidget}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Add Widget
        </button>
      </div> */}


    </div>
  );
};

export default Category;
