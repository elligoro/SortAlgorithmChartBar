import ChartReducer from '../Reducers/ChartReducers';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getChartData(sortType:string, onMsgCallback:any) {
    //const res = await Promise.resolve({ok:true, json:()=>"{\"name\":\"ilya\"}"}) //fetch(baseUrl + "chart?type=" + sortType);
    /*const res = await fetch(baseUrl + '/api/sort?type=' + sortType, {
        method: 'GET',
        mode: 'cors'
    });
    */

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