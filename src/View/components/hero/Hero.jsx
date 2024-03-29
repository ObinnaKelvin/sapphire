import React from 'react'
import './hero.scss';
//import heroImg from '../../assets/images/hero4.PNG';
import heroImg from '../../assets/images/cov1.jpg';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="hero-container">
        <div className="hero-left">
          <div className="hero-left-wrapper">
              <div className="hero-caption">
                <p>You are in <span>Safe</span> hands</p>
              </div>
              <div className="hero-description">
                  <p>
                  We are passionate about quality, built on excellence. 
                  Setting new standards for safe surgical care.
                  </p>
              </div>
                <Link to={'/book-appointment'} className='link'>
                  <div className="hero-cta">
                    Book Now
                  </div>
                </Link>
          </div>
        </div>
        <div className="hero-right">
              <img src={heroImg}/>
        </div>
    </div>
  )
}

export default Hero