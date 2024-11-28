import React from 'react';
import './booking.scss';
import { Navbar } from '../../components/navigation/Navbar'
import {CalendarCheck, MoveRight, Hourglass, Bookmark} from 'lucide-react'
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';

function Booking() {
  const currentUser = JSON.parse(localStorage.getItem('user'));

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
            <div className="icon now">
              <CalendarCheck size={25} />
            </div>
            <div className="action now">
              Book a Slot, Pay Now!
            </div>
            {/* <div className="button-now">
              Book a Slot, Pay NOW!
            </div> */}
            <div className="description">
              Payment ensures that you hold down a slot.
            </div>
            <Link to='/pay-now'>
              <div className="action-button now">
                <MoveRight />
              </div>
            </Link>
          </div>
          <div className="decision-item">
            <div className="icon later">
              <Hourglass size={25} />
            </div>
            <div className="action later">
              Book a Slot, Pay Later!
            </div>
            <div className="description">
              Temporary slot is booked but confirmed when payment is made.
            </div>
            <Link to='/pay-later'>
              <div className="action-button later">
                <MoveRight />
              </div>
            </Link>
          </div>
            <div className="decision-item">
              <div className="icon monitor">
                <Bookmark size={25} />
              </div>
              <div className="action monitor">
                Patient Portal
              </div>
              <div className="description">
                View all records of your bookings.
              </div>
              

              <Link to={currentUser ? "/patient-portal" : '/patient-login'}>
              {/* <Link to='/patient-login'> */}
                <div className="action-button monitor">
                  <MoveRight />
                </div>
              </Link>
            </div>
        </div>
        <div className="booking-wrapper">

        </div>

        <Footer />
    </div>
  )
}

export default Booking