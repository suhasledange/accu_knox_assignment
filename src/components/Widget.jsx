import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
const Widget = ({ widget, onRemoveWidget }) => {
  return widget.shown && (
    <div className="border shadow-sm flex-shrink-0 w-[29rem] h-[12rem] p-2 border-gray-300 overflow-hidden rounded-lg relative bg-gray-50">
      <h3 className="text-md font-medium">{widget.name}</h3>

    <div className='flex items-center h-[calc(100%-20%)] justify-center'>
        <div className=' flex flex-col items-center justify-center gap-1'>
        <AutoGraphIcon fontSize='large' className='text-gray-600'/>
        <p className='text-xs'>No Graph data available!</p> 
        </div>

    </div>

      {/* <button
        onClick={onRemoveWidget}
        className="mt-4 text-gray-600 underline absolute -top-2 right-1"
      >
         <DeleteIcon />
      </button> */}
    </div>
  );
};

export default Widget;
