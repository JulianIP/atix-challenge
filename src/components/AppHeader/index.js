import React, { useState } from 'react';
import './AppHeader.scss';
import logo from './iso_atix.svg';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';
import { faBell, faBars, faChartLine, faList } from '@fortawesome/free-solid-svg-icons'

export default function() {
    const [sidenavActive, setSidenavActive] = useState(true);
    const alarmsActiveCount = useSelector(store => store.Alarms.alarmsList.filter(a => a.Status === "A").length);

    const toggleSidenav = () => setSidenavActive(oldValue => !oldValue);

    return ([
        <header className="app-header">
            <div className="navbar-header">
                <FontAwesomeIcon onClick={toggleSidenav} icon={faBars} />
                <NavLink to="/Home"><img alt="" src={logo}></img></NavLink>
            </div>
            <div className="notification-badge">
                <FontAwesomeIcon icon={faBell} />
                <span className="badge">{alarmsActiveCount}</span>
            </div>
        </header>,
        <section id="sidebar-nav" className={`sidenav-bar ${sidenavActive ? 'active': ''}`}>
            <ul>
                <li>
                    <NavLink to="/Home">
                        <FontAwesomeIcon icon={faChartLine} />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Alarms">
                        <FontAwesomeIcon icon={faList} />
                    </NavLink>
                </li>
            </ul>
        </section>
    ])
}