import React, { useState, useEffect } from 'react';
import './pportal.scss';
import { Navbar, PatientNavbar, PatientNavbarMobile } from '../../components/navigation/Navbar';
import { LayoutPanelLeft, AlignLeft, Search, ChevronRight } from 'lucide-react'
import { PatientTransaction } from '../../components/modal/Modal';

function Pportal() {

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [modalOpen, setModalOpen] = useState(false);
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
                <PatientNavbar />
            </div>
            <div className="pportal-mobile">
                <PatientNavbarMobile />
            </div>
            <div className="pportal-body">
                <div className="pportal-body-header">
                    <div className="name-space">
                        Hi {currentUser.firstname}, {greet}
                    </div>
                    <div className="search-bar">
                        <div className="search-icon">
                            <Search />
                        </div>
                        <input 
                            type="text" 
                            placeholder='Search Order no. or Service name'
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
                            <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div>
                            <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 1</PatientTransaction>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#02</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status pending">Pending</div>
                            <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div>
                            <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 2</PatientTransaction>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#03</div>
                            <div className="booking-service">Bariatric Surgery</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦500,000</div>
                            <div className="booking-status success">Success</div>
                            <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div>
                            <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 3</PatientTransaction>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#04</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status pending">Pending</div>
                            <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div>
                            <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 4</PatientTransaction>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#05</div>
                            <div className="booking-service">Diagnostic and Therapeutic Endoscopy</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦900,000</div>
                            <div className="booking-status pending">Pending</div>
                            <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div>
                            <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 5</PatientTransaction>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#06</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status pending">Pending</div>
                            <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div>
                            <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 6</PatientTransaction>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#07</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status pending">Pending</div>
                            <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div>
                            <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 7</PatientTransaction>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#08</div>
                            <div className="booking-service">Thyroid Surgery</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status success">Success</div>
                            <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div>
                            <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 8</PatientTransaction>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#09</div>
                            <div className="booking-service">Urological Surgery</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦550,000</div>
                            <div className="booking-status cancel">Cancelled</div>
                            <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div>
                            <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 9</PatientTransaction>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#10</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status pending">Pending</div>
                            <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div>
                            <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 10</PatientTransaction>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#11</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status refund">Refund</div>
                            <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div>
                            <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 11</PatientTransaction>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#12</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status pending">Pending</div>
                            <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div>
                            <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 12</PatientTransaction>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pportal