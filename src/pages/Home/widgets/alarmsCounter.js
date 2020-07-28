import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAlarmsListAsync } from '../../../redux/Actions';

const useAlarmsCounter = function() {
    const { alarmsTotal, activeAlarms } = useSelector(store => ({
        alarmsTotal: store.Alarms.alarmsList.length,
        activeAlarms: store.Alarms.alarmsList.filter(a => a.Status === "A").length
    })),
    dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlarmsListAsync('',''))
    }, []);

    return {
        alarmsTotal,
        activeAlarms
    }
}

const AlarmsCounter = function(props) {
    return (
        <section className="widgets-container d-flex align-items-center justify-content-between flex-wrap">
            <div className="widget-card d-flex align-items-center justify-content-center flex-wrap">
                <h3>{props.activeAlarms}/{props.alarmsTotal} Alarms Turned On</h3>
            </div>
        </section>
    )
}

export const WidgetAlarmsCounter = { useAlarmsCounter, AlarmsCounter }
