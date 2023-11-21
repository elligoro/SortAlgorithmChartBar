import React, { useState, useReducer, useEffect } from 'react';
import { getChartData } from '../../Services/ChartService';
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
function Chart (){
    const [chart, dispatch] = useReducer(ChartReducer, initialChartState);
    
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
/*
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
*/
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

    useEffect(() => {
        
    },[]);
    
    return (
        <>  

            {chart && chart.length > 0 &&
                                      <h1> {JSON.stringify(chart)} </h1>}
            <button
                className='btn btn-success'
                onClick={(e) => {
                    //getChartData('insertion_sort').then(res => dispatch({ type: ChartReducerModel.ChartTypeEnum.set, payload: { data: res } }));                  
                  getChartData('insertion_sort', (event:MessageEvent) => {
                                                              const data: Blob = event.data;
                                                                data.text().then(d => {
                                                                  dispatch({ type: ChartReducerModel.ChartTypeEnum.set, payload: { data: JSON.parse(d) } });
                                                                });
                                                              });                  
                }}
            >Show Chart</button>
            
        <></>
        <Bar options={options} data={setData(chart)} />;
        </>
  ) 
}

export default Chart;
 