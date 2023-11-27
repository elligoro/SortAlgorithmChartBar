import React, { useState, useReducer, useEffect } from 'react';
import { getChartData, GetSortSelections } from '../../Services/ChartService';
import ChartData from '../../Models/CahrtData';
import ChartReducer from '../../Reducers/ChartReducers';
import * as ChartReducerModel from '../../Models/ChartReducerModel';

//https://react-chartjs-2.js.org/examples/vertical-bar-chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,

  
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const initialChartState: any = [];
const dataWebSocket = { data: "" };
/*
try {
    initialChartState = JSON.parse(localStorage.getItem('chart') ?? "") ?? [];
} catch (e) {
    throw Error("cannot get valid initial chart state");
}
*/
function Chart() {
  
  interface RadioBtnOptions {
    Name: string;
    Value: string;
    isChecked: boolean;
  }

  const [chart, dispatch] = useReducer(ChartReducer, initialChartState);
  const [radioBtnOptions, setRadioBtnOptions] = useState(new Array<RadioBtnOptions>());
  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    const rbo = radioBtnOptions;
    rbo.forEach(r => r.isChecked = (Number)(r.Value) === (Number)(e.target.value));                                                                 
    setRadioBtnOptions([...rbo]);
  }  
  
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

    const getTxtDic = () => { 
        const ab = "abcdefghijklmnopqrstuvwxyz".toLocaleUpperCase();
        const block = 50;
        const abArr = ab.split('');
        const abbArrLength = abArr.length;
        const abDic:Record<string, number>= {};
        abArr.forEach((a,i) => abDic[a] = ((i+1)*block));

        return abDic;  
    };
    const txtConverter:any = getTxtDic();
    const setData = (labels: Array<any>) => {
        const colBasicHeight = 10;
        const columnsArr = labels.map(l => txtConverter[l]);

        return {
          labels,
          datasets: [
                    {
                        label: '',
                        data: columnsArr,
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            };
    };

    const WsCallback = (event:MessageEvent) => {
                                                  const data: Blob = event.data;
                                                    data.text().then(d => {
                                                      dispatch({ type: ChartReducerModel.ChartTypeEnum.set, payload: { data: JSON.parse(d) } });
                                                    });
                                                  }; 
  
  
  
  const fetchData = () => { 
    GetSortSelections()
    .then((res: Object) => {
        const radioOp = [...radioBtnOptions];
        Object.entries(res)
          .forEach(([key, value]) => {
            const rop: RadioBtnOptions = { Name: key, Value: value, isChecked: value === 0 ? true : false };
            radioOp.push(rop);
          });
        setRadioBtnOptions(radioOp);
    });
  };
  
  useEffect(() => { fetchData() }, []);
  
    return (
        <>  
            {chart && chart.length > 0 &&
            <h1> {JSON.stringify(chart)} </h1>}
            <div>             
            {radioBtnOptions.length > 0 && radioBtnOptions.map((so: RadioBtnOptions) => {
              return (
                    <div>
                      <label>
                        <span>{so.Name}</span>
                        <input
                          type="radio"
                          value={so.Value}
                          checked={so.isChecked}    
                          onChange={onOptionChange}
                        />
                      </label>
                    </div>
                  )})}
            </div>
            <button
                className='btn btn-success'
                onClick={(e) => {
                  getChartData((radioBtnOptions.find((r)=>r.isChecked)?.Name ?? 'insertion_sort'),WsCallback);                  
                }}
            >Show Chart</button>          
        <></>
        <Bar options={options} data={setData(chart)} />;
        </>
  ) 
}

export default Chart;
 