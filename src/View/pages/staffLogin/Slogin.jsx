import React, { useState, useEffect } from 'react'
import { Navbar } from '../../components/navigation/Navbar'
import './slogin.scss';
import message from '../../assets/images/message.png'
import sloginbg from '../../assets/images/placeholder.gif';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import logo from '../../assets/images/logo.PNG'
import {Eye, EyeOff} from 'lucide-react'
import HashLoader from 'react-spinners/HashLoader';

function Slogin() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[activeStep, setActiveStep] = useState(1)
  const currentUser = JSON.parse(localStorage.getItem('staff'));
  const recoveryEmail = JSON.parse(localStorage.getItem('recovery email'));
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("")
  const [resetPassword, setResetPassword] = useState('');
  const [confirmResetPassword, setConfirmResetPassword] = useState('');
  const [visiblePassword, setVisiblePassword] = useState(false); 

    useEffect(() => {
        console.log("recoveryEmail:", recoveryEmail)
        recoveryEmail ? setEmail(recoveryEmail) : setEmail('')
        console.log("Email:", email)
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();

        
        setIsLoading(true);
        setError(null)
        try {
            // const response = await axios.post("http://localhost:9000/api/auth/login", {email, password}) //LOCAL
            const response = await axios.post("https://sapphire-api.onrender.com/api/auth/slogin", {email, password})  //PRODUCTION

            //const json = await response.data.details
            const json = await response.data.details
            const status = await response.statusText
            // if(status !== 'OK') {
            //     //setIsLoading(false);
            //     console.log("!json");
            //     // setError(json.error)
            // }

            // if(status === 'OK') {
            if(json) {

                // save the user to local storage
                localStorage.setItem('staff', JSON.stringify(json));

                // set Access Mode to local storage
                localStorage.setItem('access mode', JSON.stringify("staff"));

                // update the auth context
                dispatch({type: 'LOGIN', payload: json})
                console.log("response.data", json);
                //console.log("json", json)

                // update loading state
                setIsLoading(false);
                setError(null)

                navigate(`/portal/auth/${json._id}`) //1. navigate to otp page
            }

        } catch (error) {
            setIsLoading(false)
            setError(error.response.data)
            setTimeout(() => {
                setError(null); //set error to null after 5 seconds
            }, 5000);
            console.log(error)
        }

        //await login(email, password)
    }


  return (
    <div className="slogin-container">
      <Navbar />
        <div className="slogin-wrapper">
            <div className={`slogin-wrapper-left ${activeStep === 3 ? "inactive" : "active" }`}>
                <img src={sloginbg} alt="Login BG" />
            </div>
            <div className={`slogin-wrapper-right ${activeStep === 3 ? "inactive" : "active" }`}>
                
                <div className="form-holder">
                    <div className={`phase1 ${activeStep === 1 ? "active" : "inactive" }`}>
                        <div className="headerText">
                            <h3><span>Sapphire Staff Portal</span></h3>
                        </div>

                        {
                            success && <div className={"success"}>{success}</div>
                        }

                        {
                            error && <div className="error">{error}</div>
                        }

                        <form action="">
                            <section>
                                {/* <input 
                                type="text" 
                                placeholder='Username'
                                name='username'
                                value={username}
                                onChange = {(e)=>setUsername(e.target.value)}
                                className="formInput"
                                /> */}
                                <input 
                                type="text" 
                                placeholder='Email'
                                name='email'
                                value={email}
                                onChange = {(e)=>setEmail(e.target.value)}
                                className="formInput"
                                />
                                <input 
                                type="password" 
                                placeholder='Password'
                                name='password'
                                value={password}
                                onChange = {(e)=>setPassword(e.target.value)}
                                className="formInput"
                                />
                            </section>
                            
                            {/* <button type='submit'>Login</button> */}
                            {/* <Link to="/staff-portal" className='link'> */}
                                {/* <div className='button' type='submit'>Login</div> */}
                                <button className='button'  disabled={isLoading} type='submit' onClick={handleLogin}>{ isLoading ? <HashLoader size={30} cssOverride={{ margin: '0px auto 0px auto'}} color="#fff" /> : `Login`}</button>
                            {/* </Link> */}

                            <div className="sub-info" onClick={(e)=>setActiveStep(2)}>
                                Forgot Password?
                            </div>
                            
                        </form>
                    </div>
                    <div className={`phase2 ${activeStep === 2 ? "active" : "inactive" } `}>
                        <div className="headerText">
                            <h3>Reset <span>Password</span></h3>
                            <p>Enter the email address associated with your account and we'll email you a reset password.</p>
                        </div>
                        <form action="">
                            <section>
                                <input 
                                type="text" 
                                placeholder='Email'
                                name='email'
                                value={email}
                                // onChange={handleInputChange}
                                onChange = {(e)=>setEmail(e.target.value)}
                                className="formInput"
                                />
                            </section>
                            
                            {/* <button type='submit' onClick={(e)=>setActiveStep(3)}>Reset Password</button> */}
                            <div className='submit' type='submit' onClick={(e)=>setActiveStep(3)}>Reset Password</div>

                            <div className="sub-info" onClick={(e)=>setActiveStep(1)}>
                                Have an account? <span>Sign In</span>
                            </div>
                            
                        </form>
                        
                    </div>

                </div>
            </div>
            <div className={`phase3 ${activeStep === 3 ? "active" : "inactive" } `}>
                <div className="phase3-wrapper">
                    <div className="img-holder">
                        <img src={message} alt='Email Confirmation'/>
                    </div>
                    <div className="text-description">
                        <h3>Check your email</h3>
                        <p>We just emailed you a reset password. Kindly check your email and login again.</p>
                    </div>
                    <div className="sub-info">
                        <span onClick={(e)=>setActiveStep(1)}>Login now!</span> or <span onClick={(e)=>setActiveStep(2)}>Resend Password</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Slogin