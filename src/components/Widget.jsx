import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Widget = ({ widget, onRemoveWidget }) => {


    const options={
        plugins:{
            legend:{
                position:'right',
                labels: {
                    font: {
                        size: 10
                    },
                    boxWidth:10,
                    padding:10
                }
            },
        },
        
      }

      const textCenter = {
        id:'textCenter',
        beforeDatasetsDraw(chart,args,pluginOptions){
            const {ctx,data} = chart;
            ctx.save();
            ctx.font = 'bold 1rem sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign='center';
            ctx.textBaseline='middle';
            ctx.fillText( widget.chartData.total,chart.getDatasetMeta(0).data[0].x,chart.getDatasetMeta(0).data[0].y)
        }
      }

  return (
    widget.shown && (
      <div className="border shadow-sm flex-shrink-0 w-[30rem] h-[13rem] p-2 border-gray-300 overflow-hidden rounded-lg relative bg-gray-50">
        <h3 className="text-md font-medium">{widget.name}</h3>

        <div className="flex items-center h-[calc(100%-10%)] justify-center">
          {widget.graph ? (
            <div className="w-64 h-64">
                <Doughnut data={widget.chartData}
                plugins={[textCenter]}
                options={options}
                />
            </div>
          ) : (
            <div className=" flex flex-col items-center justify-center gap-1">
              <AutoGraphIcon fontSize="large" className="text-gray-600" />
              <p className="text-xs">No Graph data available!</p>
            </div>
          )}
        </div>

        {/* <button
        onClick={onRemoveWidget}
        className="mt-4 text-gray-600 underline absolute -top-2 right-1"
      >
         <DeleteIcon />
      </button> */}
      </div>
    )
  );
};

export default Widget;
