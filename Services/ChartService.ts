import ChartReducer from '../Reducers/ChartReducers';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function GetSortSelections(){
    const res = await fetch('http://localhost:8003' + '/api/sort/sort-options', {
        method: 'GET',
        mode: 'cors'       
    });

    return await res.json();
}

export async function getChartData(sortType:string, onMsgCallback:any) {
    const ws = new WebSocket("ws://127.0.0.1:8003/api/sort-websocket");
       ws.onopen = () => {
           console.log("Connection Established!");
           ws.send(new TextEncoder().encode(JSON.stringify({ "msg":"ok", "isClose":false})));
       };
        ws.onmessage = onMsgCallback;
    
        ws.onclose = () => {
            console.log("Connection Closed!");
        };

        ws.onerror = () => {
            console.log("WS Error");
        };
            
    return () => {
        ws.close();
    };
}