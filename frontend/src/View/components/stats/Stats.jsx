import React from 'react'
import './stats.scss';
import shimmer from '../../assets/images/abstract-shape.png';
import happy from '../../assets/images/happy.png';
import medical from '../../assets/images/medical.png';
import talent from '../../assets/images/talent.png';
import CountUp from 'react-countup';

const Stats = () => {
  return (
    <div className='stats-container'>
        <div className="shimmer shimmerOne">
            <img src={shimmer} alt='shimmer one'/>
        </div>
        <div className="shimmer shimmerTwo">
            <img src={shimmer} alt='shimmer one'/>
        </div>
        <div className="stats-wrapper">
            <div className="stats-item">
                <img src={happy} alt='happy'/>
                <div className="stats-figures">
                    <CountUp end={50000} duration={2} enableScrollSpy={true}/>
                    +
                </div>
                <span>Happy Patients</span>
            </div>
            <div className="stats-item">
                <img src={medical} alt='happy'/>
                <div className="stats-figures">
                    <CountUp end={97} duration={2} enableScrollSpy={true}/>
                    %
                </div>
                <span>Recovery Rate</span>
            </div>
            <div className="stats-item">
                <img src={talent} alt='happy'/>
                <div className="stats-figures">
                    <CountUp end={110} duration={2} enableScrollSpy={true}/>
                    +
                </div>
                <span>Years of Experience</span>
            </div>
        </div>
    </div>
  )
}

export default Stats