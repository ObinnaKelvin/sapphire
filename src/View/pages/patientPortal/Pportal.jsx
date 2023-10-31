import React from 'react';
import './pportal.scss';
import Navbar from '../../components/navigation/Navbar';
import { LayoutPanelLeft, AlignLeft, Search } from 'lucide-react'

function Pportal() {
  return (
    <div className="pportal-container">
        <Navbar />
        <div className="pportal-wrapper">
            <div className="pportal-sidenav">

            </div>
            <div className="pportal-body">
                <div className="pportal-body-header">
                    <div className="name-space">
                        Hi Kelvin, Good Evening
                    </div>
                    <div className="search-bar">
                        <div className="search-icon">
                            <Search />
                        </div>
                        <input 
                            type="text" 
                            placeholder='Search Order no.'
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
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status">Successful</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pportal