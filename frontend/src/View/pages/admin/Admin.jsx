import React, { useState, useEffect} from 'react'
import { Navbar, StaffNavbar, StaffNavbarMobile } from '../../components/navigation/Navbar'
import axios from 'axios';
import './admin.scss'
import * as MdIcons from 'react-icons/md';
import * as RxIcons from 'react-icons/rx';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import * as ImIcons from 'react-icons/im';
import {Eye, EyeOff} from 'lucide-react'

function Admin() {

    const staffUser = JSON.parse(localStorage.getItem('staff'));
    const [greet, setGreet] = useState('');
    const [title, setTitle] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    // const [password, setPassword] = useState('');
    const [resetPassword, setResetPassword] = useState('');
    const [confirmResetPassword, setConfirmResetPassword] = useState('');
    const [activeStep, setActiveStep] = useState(1)
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [visibleResetPassword, setVisibleResetPassword] = useState(false);
    const [visibleConfirmResetPassword, setVisibleConfirmResetPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(null);
    const currentUser = JSON.parse(localStorage.getItem('user'));

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

    const loadUserDetails = async () => {
        try {
            setIsLoading(true);
            await axios.get(`https://sapphire-api.onrender.com/api/user/find/${staffUser.email}`) //PRODUCTION;
            .then( response => {
                //console.log("response", response)
                setFirstname(response.data[0].firstname)
                setLastname(response.data[0].lastname)
                setEmail(response.data[0].email)
            })
            // console.log(item)
            setIsLoading(false);
            
        } catch (error) {
            console.log("Can't load User Info", error)
        }
    }
    
    const toggleVisibilityReset = () => {
        setVisibleResetPassword(!visibleResetPassword)
    }
    
    const toggleVisibilityConfirmReset = () => {
        setVisibleConfirmResetPassword(!visibleConfirmResetPassword)
    }

    const handleResetPassword = async () => {
        try {

            if(!resetPassword && !confirmResetPassword) {
                setError("Password fields should not be empty");
                setTimeout(() => {
                    setSuccess(null); //set success to null after 5 seconds
                    setError(null); //set error to null after 5 seconds
                  }, 5000);
                setIsLoading(false);
                return;
            }
            if(resetPassword !== confirmResetPassword) {
                setError("Password fields do not match");
                setTimeout(() => {
                    setSuccess(null); //set success to null after 5 seconds
                    setError(null); //set error to null after 5 seconds
                  }, 5000);
                setIsLoading(false);
                return;
            }
            if(!resetPassword) {
                setError("Password field should not be empty");
                setTimeout(() => {
                    setSuccess(null); //set success to null after 5 seconds
                    setError(null); //set error to null after 5 seconds
                  }, 5000);
                setIsLoading(false);
                return;
            }
            if(!confirmResetPassword) {
                setError("Confirm password field should not be empty");
                setTimeout(() => {
                    setSuccess(null); //set success to null after 5 seconds
                    setError(null); //set error to null after 5 seconds
                  }, 5000);
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            const response = await axios.put("https://sapphire-api.onrender.com/api/auth/login/staff-password-reset", {email, confirmResetPassword}) //PRODUCTION
            console.log(response)
            setSuccess("Password changed successfully!");
            setTimeout(() => {
                setSuccess(null); //set success to null after 5 seconds
                setError(null); //set error to null after 5 seconds
              }, 5000);
            setIsLoading(false);
        } catch (error) {
            
        }
    }

        
    useEffect(() => {
        handleGreet();

    }, [])  
    
    useEffect(() => {
        loadUserDetails()
    }, [])


  return (
    <div className='admin-container'>
        <Navbar />

        <div className="admin-wrapper">
            <div className="admin-sidenav">
                {/* <PatientNavbar /> */}
                <StaffNavbar  />
            </div>
            <div className="admin-mobile">
                {/* <PatientNavbarMobile /> */}
                <StaffNavbarMobile  />
            </div>

            <div className="admin-body">

                <div className="admin-body-header">
                    <div className="page-title">
                        Administrator
                    </div>
                    <div className="name-space">
                        Hi {staffUser.firstname}, {greet}
                    </div>
                </div>

                <div className="admin-body-body">

                    <div className={`admin-menu-wrapper ${activeStep === 1 ? "active" : "inactive" } `}>
                        <div className="admin-item" onClick={() => setActiveStep(1.1)}>

                            <div className="icon">
                                <MdIcons.MdPassword  style={{width: '35px',height: '35px'}} />
                            </div>
                            <div className="description">
                                Reset Password
                            </div>
                        </div>
                    </div>

                    <div className="admin-menu-functions-wrapper">

                        <div className={`admin-functions-item ${activeStep === 1.1 ? "active" : "inactive" } `}>
                            <div className="back-button" onClick={() => setActiveStep(1)}><RxIcons.RxCaretLeft   style={{width: '35px',height: '35px'}} /> </div>
                            <div className="function-item "><RiIcons.RiLockPasswordFill   style={{width: '35px',height: '35px'}} /> </div>

                                {
                                    success && <div className="notification success"><SiIcons.SiTicktick style={{width: '35px',height: '35px'}} />{success}</div>
                                }

                                {
                                    error && <div className="notification error"><ImIcons.ImCancelCircle style={{width: '35px',height: '35px'}} />{error}</div>
                                }

                            {/* <div className="notification success"><SiIcons.SiTicktick style={{width: '35px',height: '35px'}} /> New password has been set</div>
                            <div className="notification error"><ImIcons.ImCancelCircle style={{width: '35px',height: '35px'}} /> New password has been set</div> */}

                            <form action="">
                                        
                                <section className='group'>
                                    {/* <label>First Name</label> */}
                                    <input 
                                        type="text" 
                                        placeholder='First name'
                                        name='firstname'
                                        value={firstname}
                                        onChange = {(e)=>setFirstname(e.target.value)}
                                        className=" formInput sm"
                                        disabled
                                        // className={`formInput sm ${isRequired && "required"}`}
                                    />


                                    {/* <label>Last Name</label> */}
                                    <input 
                                        type="text" 
                                        placeholder='Last name'
                                        name='lastname'
                                        value={lastname}
                                        onChange = {(e)=>setLastname(e.target.value)}
                                        className=" formInput sm"
                                        disabled
                                        // className={`formInput sm ${isRequired && "required"}`}
                                    />

                                    <input 
                                        type="text" 
                                        placeholder='Email'
                                        name='email'
                                        value={email}
                                        onChange = {(e)=>setEmail(e.target.value)}
                                        className="formInput"
                                        disabled
                                    />

                                    {/* <input 
                                        type="text" 
                                        placeholder='Phone'
                                        name='phone'
                                        value={phone}
                                        onChange = {(e)=>setPhone(e.target.value)}
                                        className="formInput"
                                        disabled
                                    /> */}
                                </section>

                                <section>

                                    <label>New Password</label>
                                    <input 
                                    type={visibleResetPassword ? "text" : "password"} 
                                    placeholder='••••••••'
                                    name='password'
                                    value={resetPassword}
                                    onChange = {(e)=>setResetPassword(e.target.value.trim())}
                                    className="formInput"
                                    />
                                    { visibleResetPassword ? <div className="visibility_icon" onClick={toggleVisibilityReset}><Eye /></div> : <div className="visibility_icon" onClick={toggleVisibilityReset}><EyeOff /></div>} 
                                </section>

                                <section>

                                    <label>Confirm New Password</label>
                                    <input 
                                    type={visibleConfirmResetPassword ? "text" : "password"}
                                    placeholder='••••••••'
                                    name='password'
                                    value={confirmResetPassword}
                                    onChange = {(e)=>setConfirmResetPassword(e.target.value.trim())}
                                    className="formInput"
                                    />
                                    { visibleConfirmResetPassword ? <div className="visibility_icon" onClick={toggleVisibilityConfirmReset}><Eye /></div> : <div className="visibility_icon" onClick={toggleVisibilityConfirmReset}><EyeOff /></div>} 
                                </section>
                            </form>

                            <div className="submit-button" onClick={handleResetPassword}>
                                Change Password
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        
    </div>
  )
}

export default Admin