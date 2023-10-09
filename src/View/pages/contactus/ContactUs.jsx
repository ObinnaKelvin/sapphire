import React from 'react'
import "./contactUs.scss";
import Navbar from '../../components/navigation/Navbar';
import { MapPin,Phone,Mails } from 'lucide-react';
import location from '../../assets/images/locationbg.png'
import call from '../../assets/images/callbg.png'
import email from '../../assets/images/emailbg.png'
import Footer from '../../components/footer/Footer';


function ContactUs() {
  return (
    <div className='contactus-container'>
      <Navbar />

      <div className="contactus-banner">
            <div className='contactus-overlay'></div>
            <div className="contactus-header">
                    <p>Get In Touch</p>
            </div>
      </div>

      <div className="contactus-items">
        <div className="contactus-items-wrapper">
          <div className="contactus-item address">
            <div className="item-icon">
              <MapPin size={32} />
            </div>
            <div className="item-caption address">
              Address
            </div>
            <div className="item-description">
              16 Adeyemo Alakija Street,
              Victoria Island Lagos.
            </div>
            <div className="overlay-image">
              <img src={location} alt='location Alt'/>
            </div>
          </div>
          <div className="contactus-item phone">
            <div className="item-icon">
              <Phone size={32} />
            </div>
            <div className="item-caption phone">
              Phone
            </div>
            <div className="item-description">
              +234 705656565656
            </div>
            <div className="overlay-image">
              <img src={call} alt='call Alt'/>
            </div>
          </div>
          <div className="contactus-item email">
            <div className="item-icon">
              <Mails size={32} />
            </div>
            <div className="item-caption">
              Email
            </div>
            <div className="item-description">
              sapphire@gmail.com
            </div>
            <div className="overlay-image">
              <img src={email} alt='call Alt'/>
            </div>
          </div>
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default ContactUs