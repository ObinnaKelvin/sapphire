import React, { useState, useEffect} from 'react'
import { Navbar, StaffNavbar, StaffNavbarMobile } from '../../components/navigation/Navbar'
import './notifications.scss'
import { Clock8 } from 'lucide-react';
import { NotificationBot } from '../../components/buttons/Buttons';

function Notifications() {

    const staffUser = JSON.parse(localStorage.getItem('staff'));
    const [greet, setGreet] = useState('');
    const handleGreet = () => {
        let today = new Date()
        let getCurrentHour = today.getHours() 

        if (getCurrentHour < 12) {
            setGreet("Good Morning");
        }
        else if (getCurrentHour < 18) {
            setGreet("Good Afternoon");
        }
        else {
            setGreet("Good Evening");
        }
    }

    
    useEffect(() => {
        handleGreet();
    }, [])

  return (
    <div className='notifications-container'>
        <Navbar />
        <NotificationBot />
        
        <div className="notifications-wrapper">
            <div className="notifications-sidenav">
                {/* <PatientNavbar /> */}
                <StaffNavbar />
            </div>
            <div className="notifications-mobile">
                {/* <PatientNavbarMobile /> */}
                <StaffNavbarMobile />
            </div>

            <div className="notifications-body">
                <div className="notifications-body-header">
                    <div className="page-title">
                        Notifications
                    </div>
                    <div className="name-space">
                        Hi {staffUser.firstname}, {greet}
                    </div>
                </div>

                <div className="notifications-body-body">

                    <div className="notifications-wrapper">
                        
                        <div className="notifications-item">
                            <div className="left">
                                <div className="notification-tag appointment">
                                    Appointment
                                </div>
                                <div className="details">
                                    Abike Dabiri has just booked an appointment
                                </div>
                            </div>
                            <div className="right">
                                <div className="notification-date">
                                    <span><Clock8 size={18} /></span>
                                    <span>February 28, 2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="notifications-item">
                            <div className="left">
                                <div className="notification-tag appointment">
                                    Appointment
                                </div>
                                <div className="details">
                                    Jane Doe has just booked an appointment
                                </div>
                            </div>
                            <div className="right">
                                <div className="notification-date">
                                    <span><Clock8 size={18} /></span>
                                    <span>February 28, 2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="notifications-item">
                            <div className="left">
                                <div className="notification-tag appointment">
                                    Appointment
                                </div>
                                <div className="details">
                                    Andrew Bright has just booked an appointment
                                </div>
                            </div>
                            <div className="right">
                                <div className="notification-date">
                                    <span><Clock8 size={18} /></span>
                                    <span>February 28, 2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="notifications-item">
                            <div className="left">
                                <div className="notification-tag appointment">
                                    Appointment
                                </div>
                                <div className="details">
                                    Paul Ike has just booked an appointment
                                </div>
                            </div>
                            <div className="right">
                                <div className="notification-date">
                                    <span><Clock8 size={18} /></span>
                                    <span>February 28, 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
  )
}

export default Notifications