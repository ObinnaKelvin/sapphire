import React from 'react';
import './services.scss';
import scapel from '../../assets/images/scalpel.png';
import kidney from '../../assets/images/kidney.png';
import bariatric from '../../assets/images/bariatric-surgery.png';
import intestine from '../../assets/images/intestine.png';
import thyroid from '../../assets/images/thyroid.png';
import breast from '../../assets/images/breasts.png';
import endoscope from '../../assets/images/endoscope.png';
import oncology from '../../assets/images/oncology.png';

const Services = () => {
  return (
    <div className='services-container'>
        <div className="services-wrapper">
            <div className="services-header">
                <div className="spikes">
                    <div className="spike spikeOne"></div>
                    <div className="spike spikeTwo"></div>
                    <div className="spike spikeThree"></div>
                </div>
                <div className="services-header-text">
                    Our Special Services
                </div>
            </div>
            <div className="services-items">
                <div className="services-item">
                    <div className="img-holder">
                        <img src={scapel} alt='scapel for surgery'/>
                    </div>
                    <p>Minimal Access Surgery</p>
                </div>
                <div className="services-item">
                    <div className="img-holder">
                        <img src={kidney} alt='Urology surgery'/>
                    </div>
                    <p>Urology Surgery</p>
                </div>
                <div className="services-item">
                    <div className="img-holder">
                        <img src={bariatric} alt='Bariatric surgery'/>
                    </div>
                    <p>Bariatric Surgery</p>
                </div>
                <div className="services-item">
                    <div className="img-holder">
                        <img src={intestine} alt='Gastrointestinal surgery'/>
                    </div>
                    <p>Gastrointestinal Surgery</p>
                </div>
                <div className="services-item">
                    <div className="img-holder">
                        <img src={thyroid} alt='Thyroid surgery'/>
                    </div>
                    <p>Thyroid Surgery</p>
                </div>
                <div className="services-item">
                    <div className="img-holder">
                        <img src={breast} alt='Breast surgery'/>
                    </div>
                    <p>Breast Surgery</p>
                </div>
                <div className="services-item">
                    <div className="img-holder">
                        <img src={endoscope} alt='Diagnostic and Therapeutic Endoscopy'/>
                    </div>
                    <p>Diagnostic and Therapeutic Endoscopy</p>
                </div>
                <div className="services-item">
                    <div className="img-holder">
                        <img src={oncology} alt='Surgical Oncology'/>
                    </div>
                    <p>Surgical Oncology</p>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Services