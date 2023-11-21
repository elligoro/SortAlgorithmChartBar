
    export enum ChartTypeEnum {
        empty = 'empty',
        get = 'get',
        set = 'set'
    }

    export interface ChartAction {
        type: ChartTypeEnum,
        payload: any
    }

    export interface ChartState {
        chart: Array<any>
    }


