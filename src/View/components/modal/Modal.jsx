import React, { useState } from 'react';
import ReactDom from 'react-dom'
import './modal.scss'
import naira from '../../assets/images/naira-black.png'
import numeral from "numeral";
import { format } from 'date-fns'//transform the dates to readable formats


export const PatientTransaction = ({children, open, onClose, id }) => {

    if(!open) return null;


    return ReactDom.createPortal (
        <>
            <div className='ptransact-overlay' />
            {/* <div className='ptransact-container'> */}
            <div className={open?`ptransact-container` : `ptransact-container inactive`}>
                Hi Modal
                {children}
                <button onClick={onClose}>Close</button>
                <div onClick={onClose}>CloseIt</div>
            </div>
        </>,
        document.getElementById("modal")
    )
}

export const PatientAppointments = ({item, onClose}) => {

    return (
        item &&
        <div className={ item ? `pappointments-container` : `pappointments-container inactive`} onClick={onClose}>
            <div className="pappointments-item">

                <div className="pappointments-item-header">
                    <div className="tariff"><img src={naira}/>{numeral(item.tariff).format()}</div>
                    <div className="appt-status"></div>
                </div>

                <div className="pappointments-item-description">
                        <div className="pappointments-item-description-item">
                            <div className="central">Appointment Details</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Appointment ID</div>
                            <div className="right">SAPP-{item.appointmentId}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Service</div>
                            <div className="right">{item.service}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Appointment Date</div>
                            <div className="right">{`${format(new Date(item.appointmentDate), "MMM do, yyy")}`}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">First Name</div>
                            <div className="right">{item.firstname}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Last Name</div>
                            <div className="right">{item.lastname}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Gender</div>
                            <div className="right">{item.gender}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Mobile</div>
                            <div className="right">{item.mobile}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Appointment Status</div>
                            <div className="right">{item.appointmentStatus}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Reference Number</div>
                            <div className="right">{item.referenceNo}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Notes</div>
                            <div className="right"><em>{item.notes}</em></div>
                        </div>
                </div>

            </div>
        </div>
    )
}