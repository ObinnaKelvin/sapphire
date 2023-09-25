import React from 'react'
import './footer.scss'

function Footer() {

    const currentYear = new Date().getFullYear();

  return (
    <div className="footer-container">
        <div className="footer-top">
            <div className="footer-top-upper">
                <div className="footer-top-upper-left">
                    Emergency Dial
                </div>
                <div className="footer-top-upper-right">
                    0703500000000
                </div>
            </div>
            <div className="footer-top-inner">
                <div className="footer-logo-holder">

                </div>
                <div className="footer-link-holder">
                    <div>ABOUT</div>
                    <div>BLOG</div>
                    <div>GALLERY</div>
                    <div>CONTACT</div>
                    <div>MY SAPPHIRE</div>
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