import React from 'react';
import './404.scss'
import banner from '../../assets/images/construction.png';

const UnderConstruction = () => {
  return (
    <div className='underconstruction-container'>
        
        <div className="banner-holder">

            <div className="banner-holder-text">
                <div className="header-text">Oops!</div>
                <div className="sub-text">"We'll be back"</div>
            </div>
            <div className="banner-holder-image">
                <img src={banner} alt="depicting construction" />
            </div>

        </div>

    </div>
  )
}

export default UnderConstruction