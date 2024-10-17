import React from 'react';
import { useDashboardContext } from '../context/DashboardProvider';
import Widget from './Widget';
import AddIcon from '@mui/icons-material/Add';

const Category = ({ category }) => {
  const { removeWidget,setFormDialog } = useDashboardContext();


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
     
    

    </div>
  );
};

export default Category;
