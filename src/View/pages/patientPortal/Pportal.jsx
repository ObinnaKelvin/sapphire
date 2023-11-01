import React, { useState, useEffect } from 'react';
import './pportal.scss';
import Navbar from '../../components/navigation/Navbar';
import { LayoutPanelLeft, AlignLeft, Search } from 'lucide-react'

function Pportal() {

    const [greet, setGreet] = useState('');

    const handleGreet = () => {
        let today = new Date()
        let getCurrentHour = today.getHours() 

        if (getCurrentHour < 12) {
            setGreet("Good Morning");
        }
        else if (getCurrentHour < 18) {
            setGreet("Good Afternoon");
        }
        else {
            setGreet("Good Evening");
        }
    }

    useEffect(() => {
        handleGreet();
    }, [])


  return (
    <div className="pportal-container">
        <Navbar />
        <div className="pportal-wrapper">
            <div className="pportal-sidenav">

            </div>
            <div className="pportal-body">
                <div className="pportal-body-header">
                    <div className="name-space">
                        Hi Kelvin, {greet}
                    </div>
                    <div className="search-bar">
                        <div className="search-icon">
                            <Search />
                        </div>
                        <input 
                            type="text" 
                            placeholder='Search Order no. i.e #23'
                            // name='email'
                            // value={email}
                            // onChange={handleInputChange}
                            // onChange = {(e)=>setEmail(e.target.value)}
                            className="formInput"
                        />
                    </div>
                    <div className="sorting">
                        <div className="sorting-grid">
                            <LayoutPanelLeft size={17} />
                        </div>
                        <div className="sorting-list">
                            <AlignLeft size={17} />
                        </div>
                    </div>
                </div>
                <div className="pportal-body-body">
                    <div className="booking-wrapper">
                        <div className="booking-item">
                            <div className="booking-orderno">#01</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status success">Success</div>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#02</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status pending">Pending</div>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#03</div>
                            <div className="booking-service">Bariatric Surgery</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦500,000</div>
                            <div className="booking-status success">Success</div>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#04</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status pending">Pending</div>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#05</div>
                            <div className="booking-service">Diagnostic and Therapeutic Endoscopy</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦900,000</div>
                            <div className="booking-status pending">Pending</div>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#06</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status pending">Pending</div>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#07</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status pending">Pending</div>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#08</div>
                            <div className="booking-service">Thyroid Surgery</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status success">Success</div>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#09</div>
                            <div className="booking-service">Urological Surgery</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦550,000</div>
                            <div className="booking-status cancel">Cancelled</div>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#10</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status pending">Pending</div>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#11</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status refund">Refund</div>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#12</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status pending">Pending</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pportal