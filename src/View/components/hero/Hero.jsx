import React from 'react'
import './hero.scss';
import heroImg from '../../assets/images/hero4.PNG';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="hero-container">
        <div className="hero-left">
          <div className="hero-left-wrapper">
              <div className="hero-caption">
                <p>It is <span>Safer</span> with Us</p>
              </div>
              <div className="hero-description">
                  <p>
                    We have implemented a number of protocols 
                    and measures to ensure the safety and quick recovery
                    of our patients.
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