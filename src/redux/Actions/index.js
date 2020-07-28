import axios from 'axios';

export const isLoading = value => ({ type: "TOGGLE_LOADING",  value })

export const getAlarmsListAsync = filters => dispatch => {
    dispatch(isLoading(true));

    let uri = `/alarms?Name=${filters.nameFilter || 'all'}&Status=${filters.statusFilter || 'all' }`;
    axios.get(uri)
        .then(result => dispatch({ 
            type: "GET_ALARMS_LIST",
            alarmsList: result.data.alarms
         }))
        .catch()
        .finally(()=>dispatch(isLoading(false)))
}

export const createAlarmAsync = payload => dispatch => {
    dispatch(isLoading(true));
    axios.post('/alarms', payload)
        .then(r => dispatch({ type: "ADD_ALARM", alarm: r.data.alarm }))
        .catch()
        .finally(()=>dispatch(isLoading(false)))
}

export const saveAlarmAsync = alarm => dispatch => {
    let modifiedAlarm = {...alarm};
    delete modifiedAlarm.id;
    dispatch(isLoading(true));
    axios.put(`/alarms/${alarm.id}`, modifiedAlarm)
        .then(r => dispatch({ type: "MODIFY_ALARM", alarm: r.data.alarm }))
        .catch()
        .finally(()=>dispatch(isLoading(false)));
}

export const deleteAlarmAsync = id => dispatch => {
    dispatch(isLoading(true));
    axios.delete(`/alarms/${id}`)
        .then(() => dispatch({ type: "DELETE_ALARM", id: id }))
        .catch()
        .finally(()=>dispatch(isLoading(false)));
}

export const getMetricSourcesAsync = () => dispatch => {
    dispatch(isLoading(true));
    axios.get(`/metricSources`)
        .then(r => dispatch({ type: "GET_METRIC_SOURCES", metricSources: r.data.metricSources }))
        .catch()
        .finally(()=>dispatch(isLoading(false)));

}

export const getMetricTypesAsync = () => dispatch => {
    dispatch(isLoading(true));
    axios.get(`/metricTypes`)
        .then(r => dispatch({ type: "GET_METRIC_TYPES", metricTypes: r.data.metricTypes }))
        .catch()
        .finally(()=>dispatch(isLoading(false)));
    
}