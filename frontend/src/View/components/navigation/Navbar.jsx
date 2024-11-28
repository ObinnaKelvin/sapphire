import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './navbar.scss'
import {Bell, CalendarClock, Contact2, LogOut, User2, Wallet2} from 'lucide-react';
// import logo from '../../assets/images/logo.PNG';
import logo from '../../assets/images/sapphirelogo.png';
import { useAuthContext } from '../../hooks/useAuthContext';
import * as TbIcons from 'react-icons/tb';
import * as GrIcons from 'react-icons/gr';

export const Navbar = () => {
    // const navigate = useNavigate()
    const [open, setOpen] = useState(false);    
    const[activeState, setActiveState] = useState(1)

    const switchMenu = (index) => {
        setActiveState(index)
        localStorage.setItem('activeMenu', JSON.stringify(index))
        console.log("Active Menu Index:", activeState)
    }

    const currentMenu = JSON.parse(localStorage.getItem('activeMenu'))
    console.log("Current Menu", currentMenu)    

    const toggle = () => {
        setOpen(!open)
        console.log(open)
    }
    

  return (
    <div className="navbar-container">
        <div className="navbar-header">
            <div className="navbar-header-logo" onClick={() => switchMenu(1)}>
                <Link to={'/'}  className='link'>
                <img src={logo} alt="sapphire surgeons logo" className='nav-logo'/>
                {/* <span className='logo-text'>Sapphire Surgical Centre</span> */}
                </Link>
            </div>
            <div className="navbar-header-right">
                <Link to={'/'}  className={currentMenu === 1 ? 'link active' : 'link'} onClick={() => switchMenu(1)}>
                <div>Home</div>
                </Link>
                <Link to={'/about-us'} className={currentMenu === 2 ? 'link active' : 'link'} onClick={() => switchMenu(2)}>
                <div>About</div>
                </Link>
                <Link to={'/blog'} className={currentMenu === 3 ? 'link active' : 'link'} onClick={() => switchMenu(3)}>
                <div>Blog</div>
                </Link>
                <Link to={'/gallery'} className={currentMenu === 4 ? 'link active' : 'link'} onClick={() => switchMenu(4)}>
                <div>Gallery</div>
                </Link>
                <Link to={'/contact-us'} className={currentMenu === 5 ? 'link active' : 'link'} onClick={() => switchMenu(5)}>
                <div>Contact Us</div>
                </Link>
                <Link to={'/book-appointment'} className='link' onClick={() => switchMenu(6)}>
                    <div className='book'>
                        <span>Book Appointment</span>
                        <span>
                            <CalendarClock size={19}/>
                        </span>
                    </div>
                </Link>
            </div>
            <div className='navbar-hamburger' onClick={toggle}>
                    <span className="hamOne"></span>
                    <span className="hamTwo"></span>
                    <span className="hamThree"></span>
            </div>
        </div>
        <div className={ open ? 'navbar-sidebar open' : 'navbar-sidebar'} onClick={() => setOpen(false)}>
                <Link to={'/'}  className={currentMenu === 1 ? 'link active' : 'link'} onClick={() => switchMenu(1)}>
                <div>Home</div>
                </Link>
                <Link to={'/about-us'} className={currentMenu === 2 ? 'link active' : 'link'} onClick={() => switchMenu(2)}>
                <div>About</div>
                </Link>
                <Link to={'/blog'} className={currentMenu === 3 ? 'link active' : 'link'} onClick={() => switchMenu(3)}>
                <div>Blog</div>
                </Link>
                <Link to={'/gallery'} className={currentMenu === 4 ? 'link active' : 'link'} onClick={() => switchMenu(4)}>
                <div>Gallery</div>
                </Link>
                <Link to={'/contact-us'} className={currentMenu === 5 ? 'link active' : 'link'} onClick={() => switchMenu(5)}>
                <div>Contact Us</div>
                </Link>
                <Link to={'/book-appointment'} className='link' onClick={() => switchMenu(6)}>
                    <div className='book'>
                        <span>Book Appointment</span>
                        <span>
                            <CalendarClock size={19}/>
                        </span>
                    </div>
                </Link>
        </div>
        <div className= {open ? "navbar-overlay open" : "navbar-overlay"}  onClick={() => setOpen(false)}></div>
    </div>
  )
}


export const PatientNavbar = () => {

    const { dispatch } = useAuthContext();

    const handleLogout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
    }

    return (
        <div className="patientnavbar-container">
            <div className="patientnavbar-wrapper">
                <div className="step1">
                    <Link to={'/patient-portal'} className='link'>
                        <div className='patientnavbar-item'>
                            <Wallet2  size={20} />
                            <span>Bookings</span>
                        </div>
                    </Link>
                    <Link to={'/patient-portal/profile'} className='link'>
                        <div className='patientnavbar-item'>
                            <Contact2 size={20} />
                            <span>Profile</span>
                        </div>
                    </Link>
                </div>
                <div className="step2">
                    <Link to={'/patient-login'} className='link'>
                        <div className='patientnavbar-item' onClick={handleLogout}>
                            <LogOut size={20} />
                            <span>Log Out</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export const PatientNavbarMobile = () => {

    const { dispatch } = useAuthContext();

    const handleLogout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
    }

    return (
        <div className="patientnavbarmobile-container">
            <div className="patientnavbarmobile-wrapper">
                <div className="step1">
                    <Link to={'/patient-portal'} className='link'>
                        <div className='patientnavbarmobile-item'>
                            <Wallet2  size={20} />
                            <span>Bookings</span>
                        </div>
                    </Link>
                    <Link to={'/patient-portal/profile'} className='link'>
                        <div className='patientnavbarmobile-item'>
                            <Contact2 size={20} />
                            <span>Profile</span>
                        </div>
                    </Link>
                    <Link to={'/patient-login'} className='link'>
                        <div className='patientnavbarmobile-item' onClick={handleLogout}>
                            <LogOut size={20} />
                            <span>Log Out</span>
                        </div>
                    </Link>
                </div>
                {/* <div className="step2">
                    <Link to={'/patient-login'} className='link'>
                        <div className='patientnavbarmobile-item' onClick={handleLogout}>
                            <LogOut size={20} />
                            <span>Log Out</span>
                        </div>
                    </Link>
                </div> */}
            </div>
        </div>
    )
}

export const StaffNavbar = ({socket}) => {

    const { dispatch } = useAuthContext();

    const handleLogout = () => {
        localStorage.removeItem('staff')
        dispatch({type: 'LOGOUT'})
    }

    return (
        <div className="staffnavbar-container">
            <div className="staffnavbar-wrapper">
                <div className="step1">
                    <Link to={'/staff-portal'} className='link'>
                        <div className='staffnavbar-item'>
                            <Wallet2  size={20} />
                            <span>Bookings</span>
                        </div>
                    </Link>
                    <Link to={'/staff-portal/patient'} className='link'>
                        <div className='staffnavbar-item'>
                            <User2 size={20} />
                            <span>Patients</span>
                        </div>
                    </Link>
                    <Link to={'/staff-portal/notifications'} className='link'>
                        <div className='staffnavbar-item notifications'>
                            <Bell size={20} />
                            <span>Notifications</span>
                            <div className="stats"></div>
                        </div>
                    </Link>
                    <Link to={'/staff-portal/reports'} className='link'>
                        <div className='staffnavbar-item notifications'>
                            <TbIcons.TbFileAnalytics  style={{width: '22px',height: '22px'}}  />
                            <span>Reports</span>
                        </div>
                    </Link>
                    <Link to={'/staff-portal/admin'} className='link'>
                        <div className='staffnavbar-item notifications'>
                            <GrIcons.GrUserAdmin  style={{width: '22px',height: '22px'}}  />
                            <span>Admin</span>
                        </div>
                    </Link>
                </div>
                <div className="step2">
                    <Link to={'/staff-login'} className='link'>
                        <div className='staffnavbar-item' onClick={handleLogout}>
                            <LogOut size={20} />
                            <span>Log Out</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export const StaffNavbarMobile = () => {

    const { dispatch } = useAuthContext();

    const handleLogout = () => {
        localStorage.removeItem('staff')
        dispatch({type: 'LOGOUT'})
    }

    return (
        <div className="staffnavbarmobile-container">
            <div className="staffnavbarmobile-wrapper">
                <div className="step1">
                    <Link to={'/staff-portal'} className='link'>
                        <div className='staffnavbarmobile-item'>
                            <Wallet2  size={20} />
                            <span>Bookings</span>
                        </div>
                    </Link>
                    <Link to={'/staff-portal/patient'} className='link'>
                        <div className='staffnavbarmobile-item'>
                            <User2 size={20} />
                            <span>Patients</span>
                        </div>
                    </Link>
                    <Link to={'/staff-portal/notifications'} className='link'>
                        <div className='staffnavbarmobile-item notifications'>
                            <Bell size={20} />
                            <span>Notifications</span>
                            <div className="stats"></div>
                        </div>
                    </Link>
                    <Link to={'/staff-login'} className='link'>
                        <div className='staffnavbarmobile-item' onClick={handleLogout}>
                            <LogOut size={20} />
                            <span>Log Out</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

// export default Navbar