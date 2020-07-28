const initialState = {
    Loading: false,
    Alarms: {
        alarmsList: [],
        metricSources: [],
        metricTypes: []
    }
}

export default function (state = initialState, action) {
    switch(action.type) {
        case "TOGGLE_LOADING":
            return {
                ...state,
                Loading: action.value
            }
        case "GET_ALARMS_LIST": 
            return {
                ...state, 
                Alarms: {
                    ...state.Alarms,
                    alarmsList: action.alarmsList
                }
            }
        case "ADD_EMPTY_ALARM":
            return {
                ...state,
                Alarms: {
                    ...state.Alarms
                }
            }
        case "GET_METRIC_SOURCES":
            return {
                ...state,
                Alarms: {
                    ...state.Alarms,
                    metricSources: action.metricSources
                }
            }
        case "GET_METRIC_TYPES":
            return {
                ...state,
                Alarms: {
                    ...state.Alarms,
                    metricTypes: action.metricTypes
                }
            }
        case "ADD_ALARM":
            return {
                ...state,
                Alarms: {
                    ...state.Alarms,
                    alarmsList: [...state.Alarms.alarmsList, action.alarm]
                }
            }
        case "MODIFY_ALARM":
            return {
                ...state,
                Alarms: {
                    ...state.Alarms,
                    alarmsList: state.Alarms.alarmsList.map( al => al.id === action.alarm.id ? action.alarm : al )
                }
            }
        case "DELETE_ALARM":
            return {
                ...state,
                Alarms: {
                    ...state.Alarms,
                    alarmsList: state.Alarms.alarmsList.filter( al => al.id !== action.id )
                }
            }
        default: 
            return state;
    }
}