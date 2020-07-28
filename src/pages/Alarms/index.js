import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAlarmsListAsync, saveAlarmAsync, deleteAlarmAsync, createAlarmAsync, getMetricSourcesAsync, getMetricTypesAsync } from '../../redux/Actions';
import { faPlus, faPencilAlt, faTrashAlt, faPlay, faPause, faTimes } from '@fortawesome/free-solid-svg-icons'
import './Alarms.scss';
import { Modal, ModalBody, ModalHeader } from '../../components/Modal';
import { useForm } from "react-hook-form";

export default function Alarms(props) {
    const { statusFilterOptions, alarmsList, metricSources, metricTypes } = useSelector( store => ({
                statusFilterOptions: store.Alarms.statusFilterOptions,
                alarmsList: store.Alarms.alarmsList,
                metricSources: store.Alarms.metricSources,
                metricTypes: store.Alarms.metricTypes
          })),
          [modalAlarm, setModalAlarm] = useState(false),
          [formToEdit, setFormToEdit] = useState({}),
          dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        dispatch(getMetricSourcesAsync());
        dispatch(getMetricTypesAsync());
        getAlarmsList();
    }, []);

    useEffect(() => console.log(formToEdit), [formToEdit]);
    
    const getAlarmsList = filters => dispatch(getAlarmsListAsync(filters || {}));

    const filterAlarmsList = form => {
        form.preventDefault();
        getAlarmsList({ nameFilter: form.target.nameFilter.value, statusFilter: form.target.statusFilter.value})
    }
    
    const deleteAlarm = alarm => dispatch(deleteAlarmAsync(alarm.id));
    
    const resumeAlarm = alarm => dispatch(saveAlarmAsync({...alarm, Status: "A"}));
    
    const pauseAlarm = alarm => dispatch(saveAlarmAsync({...alarm, Status: "P"}));
    
    const saveAlarm = form => {
        let newForm = { 
            Name: form.AlarmName, 
            Source: metricSources.find(m => m.id === form.MetricSource).Name, 
            Metric: metricTypes.find(m => m.id === form.MetricType).Name, 
            TriggerAt: { value: form.TriggerValue, condition: form.TriggerCondition }, 
            Status: formToEdit.Status || 'A'
        }
        toggleModalAlarm();

        if(formToEdit.id) {
            dispatch(saveAlarmAsync({...newForm, id: formToEdit.id}));
        } else {
            dispatch(createAlarmAsync(newForm));
        }
    }

    const toggleModalAlarm = () => setModalAlarm(old => !old);

    return (
        <div className="alarms-page">
            <h1>Alarms</h1>
            <div className="table-box d-flex flex-column flex-wrap">
                <div className="filters-box d-flex align-items-center">
                    <form onSubmit={filterAlarmsList}>
                        <input name="nameFilter" placeholder="Name Filter"></input>
                        <select className="select" name="statusFilter" options={statusFilterOptions} placeholder="Status Filter">
                            <option value="">Select State</option>
                            <option value="A">Active</option>
                            <option value="P">Paused</option>
                        </select>
                        <button type="submit" className="button primary">Search</button>
                    </form>
                </div>
                <table className="alarms-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Source</th>
                            <th>Metric</th>
                            <th>Trigger</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            alarmsList.map((alarm, i) => (
                                <tr key={i}>
                                    <td>{alarm.Name}</td>
                                    <td>{alarm.Source}</td>
                                    <td>{alarm.Metric}</td>
                                    <td>{alarm.TriggerAt.condition === "lower" ? '<' : '>'}{alarm.TriggerAt.value}%</td>
                                    <td>{alarm.Status === "P" ? "Paused" : "Active"}</td>
                                    <td>
                                        <button className="button primary accion" onClick={() => { setFormToEdit(alarm); toggleModalAlarm(); }}><FontAwesomeIcon icon={faPencilAlt} /></button>
                                        <button className="button primary accion" onClick={() => deleteAlarm(alarm)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                        {
                                            alarm.Status === "P" ? 
                                            <button className="button primary accion" onClick={() => resumeAlarm(alarm)}><FontAwesomeIcon icon={faPlay} /></button>
                                            :
                                            <button className="button primary accion" onClick={() => pauseAlarm(alarm)}><FontAwesomeIcon icon={faPause} /></button>
                                        }
                                    </td>
                                </tr>  
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <button onClick={() => { setFormToEdit({}); toggleModalAlarm();}} className="fab-add"><FontAwesomeIcon icon={faPlus} /></button>
            <Modal active={modalAlarm} className="modal-alarm-form" closeModal={toggleModalAlarm}>
                <ModalHeader className="align-items-center justify-content-between">
                    <h3>Alarms</h3>
                    <FontAwesomeIcon style={{cursor: 'pointer'}} onClick={toggleModalAlarm} icon={faTimes}/>
                </ModalHeader>
                <ModalBody className="body flex-column">
                    <form onSubmit={handleSubmit(saveAlarm)} className="d-flex flex-column flex-wrap">
                        <input defaultValue={formToEdit.Name} placeholder="Alarm Name" name="AlarmName" ref={register({ required: { value: true, message: "This field is required" }, pattern: { value: /^[A-Za-z0-9]+$/i, message: "The Alarm Name must be alphanumeric" }})}></input>
                        {errors.AlarmName && <p>{errors.AlarmName.message}</p>}
                        <select defaultValue={metricSources.find(m => m.Name === formToEdit.Source)?.id} className="select" name="MetricSource" ref={register({ required: true })}>
                            <option value="">Metric Source</option>
                            {
                                metricSources?.map(ms => (
                                    <option value={ms.id}>{ms.Name}</option>
                                ))
                            }
                        </select>
                        {errors.MetricSource && <p>This field is required</p>}
                        <select defaultValue={metricTypes.find(m => m.Name === formToEdit.Metric)?.id} className="select" placeholder="Metric type" name="MetricType" ref={register({ required: true })}>
                            <option value="">Metric type</option>
                            {
                                metricTypes?.map(mt => (
                                    <option value={mt.id}>{mt.Name}</option>
                                ))
                            }
                        </select>
                        {errors.MetricType && <p>This field is required</p>}
                        <div className="d-flex flex-row align-items-center justify-content-between"> 
                            <div className="d-flex flex-column">
                                <select defaultValue={formToEdit.TriggerAt?.condition} className="select" placeholder="Trigger Condition" name="TriggerCondition" ref={register({ required: true })}>
                                    <option value="">Trigger Condition</option>
                                    <option value="lower">Lower than</option>
                                    <option value="higher">Higher than</option>
                                </select>
                                {errors.TriggerCondition && <p>This field is required</p>}
                            </div>
                            <div className="d-flex flex-column">
                                <input defaultValue={formToEdit.TriggerAt?.value} placeholder="Trigger Value" name="TriggerValue" type="number" ref={register({ required: true, min: 0, max: 100 })}></input>
                                {errors.TriggerValue && <p>Value must be between 0 and 100</p>}
                            </div>
                        </div>
                        <input type="submit" className="button primary"></input>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    )
}