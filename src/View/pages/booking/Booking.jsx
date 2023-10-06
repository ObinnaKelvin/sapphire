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
                    <p>Schedule an Appointment With Us</p>
                    {/* <p>Booking is Simple!</p> */}
            </div>
        </div>
        <div className="booking-decision">
          <div className="decision-item">
            <div className="button-now">
              Book a Slot, Pay NOW!
            </div>
            Payment ensures that you hold down a slot.
          </div>
          <div className="decision-item">
            <div className="button-later">
              Book a Slot, Pay LATER!
            </div>
            Temporary slot is booked but confirmed when payment is made.
          </div>
        </div>
        <div className="booking-wrapper">

        </div>
    </div>
  )
}

export default Booking