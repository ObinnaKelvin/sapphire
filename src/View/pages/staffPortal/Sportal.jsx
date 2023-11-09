import React, { useState, useEffect} from 'react'
import './sportal.scss';
import { Navbar, PatientNavbar, PatientNavbarMobile, StaffNavbar, StaffNavbarMobile } from '../../components/navigation/Navbar';
import { AlignLeft, CalendarRange, LayoutPanelLeft, Phone, Search, User2 } from 'lucide-react';

function Sportal() {

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
    <div className="sportal-container">
        <Navbar />
        <div className="sportal-wrapper">
            <div className="sportal-sidenav">
                {/* <PatientNavbar /> */}
                <StaffNavbar />
            </div>
            <div className="sportal-mobile">
                {/* <PatientNavbarMobile /> */}
                <StaffNavbarMobile />
            </div>
            <div className="sportal-body">
                <div className="sportal-body-header">
                    <div className="page-title">
                        Appointments
                    </div>
                    <div className="name-space">
                        Hi Kelvin, {greet}
                    </div>
                    <div className="search-bar">
                        <div className="search-icon">
                            <Search size={19} />
                        </div>
                        <input 
                            type="text" 
                            placeholder='Name, Phone number, Service'
                            // name='email'
                            // value={email}
                            // onChange={handleInputChange}
                            // onChange = {(e)=>setEmail(e.target.value)}
                            className="formInput"
                        />
                    </div>
                    <div className="booking-category">
                        <div className="category-item ">All</div>
                        <div className="category-item active">Today</div>
                        <div className="category-item">Pending</div>
                        <div className="category-item">Cancelled</div>
                    </div>
                    {/* <div className="sorting">
                        <div className="sorting-grid">
                            <LayoutPanelLeft size={17} />
                        </div>
                        <div className="sorting-list">
                            <AlignLeft size={17} />
                        </div>
                    </div> */}
                </div>
                <div className="sportal-body-body">
                    <div className="booking-wrapper">
                        <div className="booking-item">
                            {/* <div className="booking-orderno"></div> */}
                            <div className="booking-service">Consultation</div>
                            <div className="booking-user"><span><User2 size={16} /></span>Nina Austin</div>
                            <div className="booking-phone"><span><Phone size={16} /></span>07023113345</div>
                            <div className="booking-date"><span><CalendarRange size={16}/></span> Oct 31st 2023</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status success">Success</div>
                            {/* <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div> */}
                            {/* <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 1</PatientTransaction> */}
                        </div>
                        <div className="booking-item">
                            {/* <div className="booking-orderno"></div> */}
                            <div className="booking-service">Gastrointestinal Surgery</div>
                            <div className="booking-user"><span><User2 size={16} /></span>Kabaye Perry</div>
                            <div className="booking-phone"><span><Phone size={16} /></span>07023113345</div>
                            <div className="booking-date"><span><CalendarRange size={16}/></span> Oct 31st 2023</div>
                            <div className="booking-amount">₦800,000</div>
                            <div className="booking-status pending">Pending</div>
                            {/* <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div> */}
                            {/* <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 1</PatientTransaction> */}
                        </div>
                        <div className="booking-item">
                            {/* <div className="booking-orderno"></div> */}
                            <div className="booking-service">Surgical Oncology</div>
                            <div className="booking-user"><span><User2 size={16} /></span>John Norton</div>
                            <div className="booking-phone"><span><Phone size={16} /></span>07023113345</div>
                            <div className="booking-date"><span><CalendarRange size={16}/></span> Oct 31st 2023</div>
                            <div className="booking-amount">₦1,000,000</div>
                            <div className="booking-status success">Success</div>
                            {/* <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div> */}
                            {/* <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 1</PatientTransaction> */}
                        </div>
                        <div className="booking-item">
                            {/* <div className="booking-orderno"></div> */}
                            <div className="booking-service">Consultation</div>
                            <div className="booking-user"><span><User2 size={16} /></span>Christopher Tyler</div>
                            <div className="booking-phone"><span><Phone size={16} /></span>07023113345</div>
                            <div className="booking-date"><span><CalendarRange size={16}/></span> Oct 31st 2023</div>
                            <div className="booking-amount">₦250,000</div>
                            <div className="booking-status refund">Refund</div>
                            {/* <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div> */}
                            {/* <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 1</PatientTransaction> */}
                        </div>
                        <div className="booking-item">
                            {/* <div className="booking-orderno"></div> */}
                            <div className="booking-service">Thyroid Surgery</div>
                            <div className="booking-user"><span><User2 size={16} /></span>Damian Ngure</div>
                            <div className="booking-phone"><span><Phone size={16} /></span>07023113345</div>
                            <div className="booking-date"><span><CalendarRange size={16}/></span> Oct 31st 2023</div>
                            <div className="booking-amount">₦500,000</div>
                            <div className="booking-status cancel">Cancelled</div>
                            {/* <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div> */}
                            {/* <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 1</PatientTransaction> */}
                        </div>
                        <div className="booking-item">
                            {/* <div className="booking-orderno"></div> */}
                            <div className="booking-service">Breast Surgery</div>
                            <div className="booking-user"><span><User2 size={16} /></span>Felicia Chuka</div>
                            <div className="booking-phone"><span><Phone size={16} /></span>07023113345</div>
                            <div className="booking-date"><span><CalendarRange size={16}/></span> Oct 31st 2023</div>
                            <div className="booking-amount">₦130,000</div>
                            <div className="booking-status refund">Refund</div>
                            {/* <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div> */}
                            {/* <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 1</PatientTransaction> */}
                        </div>
                        <div className="booking-item">
                            {/* <div className="booking-orderno"></div> */}
                            <div className="booking-service">Minimal Access Surgery</div>
                            <div className="booking-user"><span><User2 size={16} /></span>Angela George</div>
                            <div className="booking-phone"><span><Phone size={16} /></span>07023113345</div>
                            <div className="booking-date"><span><CalendarRange size={16}/></span> Oct 31st 2023</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status pending">Pending</div>
                            {/* <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div> */}
                            {/* <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 1</PatientTransaction> */}
                        </div>
                        <div className="booking-item">
                            {/* <div className="booking-orderno"></div> */}
                            <div className="booking-service">Consultation</div>
                            <div className="booking-user"><span><User2 size={16} /></span>Esther Zhen</div>
                            <div className="booking-phone"><span><Phone size={16} /></span>07023113345</div>
                            <div className="booking-date"><span><CalendarRange size={16}/></span> Oct 31st 2023</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status pending">Pending</div>
                            {/* <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div> */}
                            {/* <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 1</PatientTransaction> */}
                        </div>
                        <div className="booking-item">
                            {/* <div className="booking-orderno"></div> */}
                            <div className="booking-service">Urological Surgery</div>
                            <div className="booking-user"><span><User2 size={16} /></span>Tyler Perry</div>
                            <div className="booking-phone"><span><Phone size={16} /></span>07023113345</div>
                            <div className="booking-date"><span><CalendarRange size={16}/></span> Oct 31st 2023</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status cancel">Cancelled</div>
                            {/* <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div> */}
                            {/* <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 1</PatientTransaction> */}
                        </div>
                        <div className="booking-item">
                            {/* <div className="booking-orderno"></div> */}
                            <div className="booking-service">Consultation</div>
                            <div className="booking-user"><span><User2 size={16} /></span>Shullamite Jadon</div>
                            <div className="booking-phone"><span><Phone size={16} /></span>07023113345</div>
                            <div className="booking-date"><span><CalendarRange size={16}/></span> Oct 31st 2023</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status cancel">Cancelled</div>
                            {/* <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div> */}
                            {/* <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 1</PatientTransaction> */}
                        </div>
                        <div className="booking-item">
                            {/* <div className="booking-orderno"></div> */}
                            <div className="booking-service">Diagnostic and Therapeutic Endoscopy</div>
                            <div className="booking-user"><span><User2 size={16} /></span>Glen Johnson</div>
                            <div className="booking-phone"><span><Phone size={16} /></span>07023113345</div>
                            <div className="booking-date"><span><CalendarRange size={16}/></span> Oct 31st 2023</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status refund">Refund</div>
                            {/* <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div> */}
                            {/* <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 1</PatientTransaction> */}
                        </div>
                        <div className="booking-item">
                            {/* <div className="booking-orderno"></div> */}
                            <div className="booking-service">Consultation</div>
                            <div className="booking-user"><span><User2 size={16} /></span>Sean Kingston</div>
                            <div className="booking-phone"><span><Phone size={16} /></span>07023113345</div>
                            <div className="booking-date"><span><CalendarRange size={16}/></span> Oct 31st 2023</div>
                            <div className="booking-amount">₦650,000</div>
                            <div className="booking-status success">Success</div>
                            {/* <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div> */}
                            {/* <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 1</PatientTransaction> */}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Sportal