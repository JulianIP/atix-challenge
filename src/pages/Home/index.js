import React from 'react';
import './Home.scss';
import { WidgetAlarmsCounter } from './widgets/alarmsCounter';

export default function Home(props) {
    const alarmsCounterProps = WidgetAlarmsCounter.useAlarmsCounter();
    
    return (
        <div className="home-page">
            <h2>Home / Dashboard</h2>
            <WidgetAlarmsCounter.AlarmsCounter {...alarmsCounterProps} />
        </div>
    )
}