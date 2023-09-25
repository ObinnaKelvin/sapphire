import React from 'react';
import './whyus.scss';
import safe from '../../assets/images/shield.png';
import value from '../../assets/images/gold-ingots.png';
import expert from '../../assets/images/surgeon.png';

function WhyUs() {
  return (
    <div className='whyus-container'>
        <div className="whyus-wrapper">
            <div className="whyus-header">
                <div className="spikes">
                    <div className="spike spikeOne"></div>
                    <div className="spike spikeTwo"></div>
                    <div className="spike spikeThree"></div>
                </div>
                <div className="whyus-header-text">
                    Why People <span>Choose</span> Us?
                </div>
            </div>

            <div className="whyus-items">
                <div className="whyus-item">
                    <div className="toppane"></div>
                    <div className="img-holder">
                        <img src={safe} alt='scapel for surgery'/>
                    </div>
                    <p>Safety</p>
                    <span>
                        Reputation for outcomes comparable to international 
                        standards.
                    </span>
                </div>
                <div className="whyus-item">
                    <div className="toppane"></div>
                    <div className="img-holder">
                        <img src={value} alt='Urology surgery'/>
                    </div>
                    <p>Value</p>
                    <span>
                        Guaranteed value for money.
                    </span>
                </div>
                <div className="whyus-item">
                    <div className="toppane"></div>
                    <div className="img-holder">
                        <img src={expert} alt='Bariatric surgery'/>
                    </div>
                    <p>Experts</p>
                    <span>
                        Access to some of the most 
                        highly experienced surgeons 
                        in the country.
                    </span>
                </div>
            </div>

        </div>
    </div>
  )
}

export default WhyUs