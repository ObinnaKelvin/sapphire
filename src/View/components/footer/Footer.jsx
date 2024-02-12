import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss'

function Footer() {

    const currentYear = new Date().getFullYear();
    const currentStaff = JSON.parse(localStorage.getItem('staff'));

  return (
    <div className="footer-container">
        <div className="footer-top">
            {/* <div className="footer-top-upper">
                <div className="footer-top-upper-left">
                    Emergency Dial
                </div>
                <div className="footer-top-upper-right">
                    0703500000000
                </div>
            </div> */}
            <div className="footer-top-inner">

                <div className="footer-logo-holder">

                </div>

                <div className="footer-link-holder">
                    <Link to={'/about-us'} className='link'>
                        <div>ABOUT</div>
                    </Link>
                    <Link to={'/blog'} className='link'>
                        <div>BLOG</div>
                    </Link>
                    <Link to={'/gallery'} className='link'>
                        <div>GALLERY</div>
                    </Link>
                    <Link to={'/contact-us'} className='link'>
                        <div>CONTACT</div>
                    </Link>
                    <Link to={currentStaff ? '/staff-portal' : '/staff-login'} className='link mysapphire'>
                        <div>MY SAPPHIRE</div>
                    </Link>
                </div>

            </div>
        </div>
        <div className="footer-middle">
            <div className="footer-middle-inner">
                <div className="footer-tail">Copyright {currentYear} © All rights reserved</div>
            </div>
        </div>
    </div>
  )
}

export default Footer