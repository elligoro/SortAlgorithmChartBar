import ChartData from '../Models/CahrtData';
import * as ChartReducerModel from '../Models/ChartReducerModel';

export default function ChartReducer(chart : ChartReducerModel.ChartState, action : ChartReducerModel.ChartAction) {
    switch(action.type){
        case ChartReducerModel.ChartTypeEnum.empty : return [];
        case ChartReducerModel.ChartTypeEnum.get: return chart;
        case ChartReducerModel.ChartTypeEnum.set:
            const { data } = action.payload;
            return data;
    }
}