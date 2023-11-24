import React, { useState, useEffect} from 'react'
import './patient.scss';
import { Navbar, StaffNavbar, StaffNavbarMobile } from '../../components/navigation/Navbar'
import { AddButton } from '../../components/buttons/Buttons'
import { Search, Users} from 'lucide-react';

const Patient = () => {

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
    <div className='patient-container'>
        <Navbar />
        <AddButton />

        <div className="patient-wrapper">
            <div className="patient-sidenav">
                {/* <PatientNavbar /> */}
                <StaffNavbar />
            </div>
            <div className="patient-mobile">
                {/* <PatientNavbarMobile /> */}
                <StaffNavbarMobile />
            </div>
            <div className="patient-body">
                <div className="patient-body-header">
                    <div className="page-title">
                        Patients
                    </div>
                    <div className="name-space">
                        Hi Kelvin, {greet}
                    </div>

                    <div className="patient-list">
                        <Users />
                        <span>Patient List</span>
                    </div>
                    <div className="search-bar">
                        <div className="search-icon">
                            <Search size={19} />
                        </div>
                        <input 
                            type="text" 
                            placeholder='Name, Phone number, Email'
                            // name='email'
                            // value={email}
                            // onChange={handleInputChange}
                            // onChange = {(e)=>setEmail(e.target.value)}
                            className="formInput"
                        />
                    </div>
                    {/* <div className="booking-category">
                        <div className="category-item ">All</div>
                        <div className="category-item active">Today</div>
                        <div className="category-item">Pending</div>
                        <div className="category-item">Cancelled</div>
                    </div> */}
                    {/* <div className="sorting">
                        <div className="sorting-grid">
                            <LayoutPanelLeft size={17} />
                        </div>
                        <div className="sorting-list">
                            <AlignLeft size={17} />
                        </div>
                    </div> */}
                </div>

            </div>

        </div>
        
    </div>
  )
}

export default Patient