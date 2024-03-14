import React from 'react';
import './404.scss';
import box from '../../assets/images/open-box.png'
import appt from '../../assets/images/appointment.gif'


export const NoRecords = () => {
    return (
        <div className="noRecords-container">
            <div className="noRecords-wrapper">
                <img src={box} alt='no record found box' />
                <span>No records found</span>
            </div>
        </div>
    )
}

export const NoAppointments = () => {
    return (
        <div className="noAppointments-container">
            <div className="noAppointments-wrapper">
                <img src={appt} alt='no Appointments found box' />
                <span>You don't have any upcoming appointments at the moment</span>
            </div>
        </div>
    )
}