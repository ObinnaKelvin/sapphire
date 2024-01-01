import React, { useState } from 'react';
import ReactDom from 'react-dom'
import './modal.scss'


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

export const PatientAppointments = () => {
    return (
        <div className={"pappointments-container"}>
            <div className="pappointments-item">

                <div className="pappointments-item-header">
                    <div className="tariff">500,000</div>
                    <div className="appt-status"></div>
                </div>

                <div className="pappointments-item-description">
                        <div className="pappointments-item-description-item">
                            <div className="central">Appointment Details</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Appointment ID</div>
                            <div className="right">1</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Service</div>
                            <div className="right">Thyroid Surgery</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Date</div>
                            <div className="right">Oct 31st 2023, 02:34pm</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Appointment Status</div>
                            <div className="right"></div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Notes</div>
                            <div className="right"></div>
                        </div>
                </div>

            </div>
        </div>
    )
}