import React from 'react';
import './booking.scss';
import Navbar from '../../components/navigation/Navbar'

function Booking() {
  return (
    <div className='booking-container'>
        <Navbar />

        <div className="booking-banner">
            <div className='booking-overlay'></div>
            <div className="booking-header">
                    <p>Booking is Simple!</p>
            </div>
        </div>
        <div className="booking-wrapper">

        </div>
    </div>
  )
}

export default Booking