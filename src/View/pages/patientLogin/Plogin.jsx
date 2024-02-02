import React, { useState, useEffect } from 'react';
import ploginbg from '../../assets/images/account.gif';
import './plogin.scss';
import { Navbar } from '../../components/navigation/Navbar';
import message from '../../assets/images/message.png'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import logo from '../../assets/images/logo.PNG'
import {Eye, EyeOff} from 'lucide-react'
import HashLoader from 'react-spinners/HashLoader';
//import { useLogin } from '../../hooks/useLogin';

const Plogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeStep, setActiveStep] = useState(1) //1 normally
    const currentUser = JSON.parse(localStorage.getItem('user'));
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


    //const { login, error, isLoading } = useLogin();

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
            const response = await axios.post("https://sapphire-api.onrender.com/api/auth/login", {email, password})  //PRODUCTION

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
                localStorage.setItem('user', JSON.stringify(json));

                // set Access Mode to local storage
                localStorage.setItem('access mode', JSON.stringify("patient"));

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

    const handlePasswordResetOTP = async (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        setError(null)

        try {
            // const response = await axios.post("http://localhost:9000/api/auth/login/generate-new-password-reset", {email}) //LOCAL
            const response = await axios.post("https://sapphire-api.onrender.com/api/auth/login/generate-new-password-reset", {email})  //PRODUCTION                 
            if (response.status === 200) {
                //setIsLoading(true)
                setSuccess(response.data);
                setError(null); //set error to null after 5 seconds
                // save the user to local storage
                localStorage.setItem('recovery email', JSON.stringify(email));
                console.log(response.data);
                 setTimeout(() => {
                        setActiveStep(4) //2. Then navigate to slide 4
                //     navigate("/patient-portal"); //2. Then navigate to dashboard
                  }, 5000);
            } 
            setTimeout(() => {
                setSuccess(null); //set success to null after 5 seconds
                setError(null); //set error to null after 5 seconds
              }, 5000);
            setIsLoading(false);
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleOTPChange = (e) => {
        if(isNaN(e.target.value)) return false;
        setOtp(e.target.value);

    }

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null)
        setSuccess(null)
        //setEmail(currentUser.email);

        try {
            //const response = await axios.post("http://localhost:9000/api/auth/login/verify", {email, otp}) //LOCAL
            const response = await axios.post("https://sapphire-api.onrender.com/api/auth/login/verify", {email, otp}) //PRODUCTION
            
            if (response.status === 200) {
                //setIsLoading(true)
                setSuccess(response.data.message);
                setError(null); //set error to null after 5 seconds
                console.log(response.data.message);
                setTimeout(() => {
                    setActiveStep(5) //2. Then navigate to slide 5 Reset Password
                    //navigate("/patient-portal"); //2. Then navigate to dashboard
                  }, 5000);
            } 
            if (response.status === 400) {
                setSuccess(null);
                setError(response.data.message); //set error to null after 5 seconds
                console.log(response.data.message);
            } 
            setTimeout(() => {
                setSuccess(null); //set success to null after 5 seconds
                setError(null); //set error to null after 5 seconds
              }, 5000);
            setIsLoading(false);
            console.log(response);
        } catch (error) {
            setIsLoading(false)
            setError(error.response.data)
            console.log(error.response.data)
            setTimeout(() => {
                setSuccess(null); //set success to null after 5 seconds
                setError(null); //set error to null after 5 seconds
              }, 5000);
            
        }
    }

    const generateNewOTP = async () => {
        setIsLoading(true);
        setError(null)
        setEmail(currentUser.email);

        try {
            
            //const response = await axios.post("http://localhost:9000/api/auth/login/generate-new", {email}) //LOCAL
            const response = await axios.post("https://sapphire-api.onrender.com/api/auth/login/generate-new", {email}) //PRODUCTION
            if (response.status === 200) {
                setSuccess(response.data);
                setError(null); //set error to null after 5 seconds
                console.log(response.data);
            }
            setTimeout(() => {
                setSuccess(null); //set success to null after 5 seconds
                setError(null); //set error to null after 5 seconds
              }, 5000);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false)
            setError(error)
            console.log(error)
            
        }

    }
    
    const toggleVisibility = () => {
        setVisiblePassword(!visiblePassword)
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null)

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

            console.log("Hey!")
            //const response = await axios.put("http://localhost:9000/api/auth/login/password-reset", {email, resetPassword}) //LOCAL
            const response = await axios.put("https://sapphire-api.onrender.com/api/auth/login/password-reset", {email, resetPassword}) //PRODUCTION
            console.log(response)
            setSuccess("Password changed successfully!");
            setTimeout(() => {
                setSuccess(null); //set success to null after 5 seconds
                setError(null); //set error to null after 5 seconds
                setActiveStep(3)
              }, 5000);
            setIsLoading(false);
            return;
            // if (response.status === 200) {
            //     setSuccess(response.data);
            //     setError(null); //set error to null after 5 seconds
            //     console.log(response.data);
            // }
            // setTimeout(() => {
            //     setSuccess(null); //set success to null after 5 seconds
            //     setError(null); //set error to null after 5 seconds
            //   }, 5000);
            // setIsLoading(false);
        } catch (error) {
            setIsLoading(false)
            setError(error)
            console.log(error)
        }

    }

  return (
    <div className="plogin-container">
        <Navbar />
        <div className="plogin-wrapper">
            <div className={`plogin-wrapper-left ${activeStep === 3 ? "inactive" : "active" }`}>
                <img src={ploginbg} alt="Login BG" />
            </div>
            <div className={`plogin-wrapper-right ${activeStep === 3 ? "inactive" : "active" }`}>
                
                <div className="form-holder">
                    <div className={`phase1 ${activeStep === 1 ? "active" : "inactive" }`}>

                        {
                           error && <div className="error">{error}</div>
                        }   
                        
                        <div className="headerText">
                            <h3>Hello! <span>Welcome</span> Back</h3>
                        </div>
                        <form action="">
                            <section>
                                <input 
                                type="text" 
                                placeholder='Email'
                                name='email'
                                value={email}
                                // onChange={handleInputChange}
                                onChange = {(e)=>setEmail(e.target.value.trim())}
                                className="formInput"
                                />
                                <input 
                                type="password" 
                                placeholder='Password'
                                name='password'
                                value={password.trim()}
                                // onChange={handleInputChange}
                                onChange = {(e)=>setPassword(e.target.value.trim())}
                                className="formInput"
                                />
                            </section>
                            
                            {/* <button type='submit'>Login</button> */}
                            {/* <Link to="/patient-portal" className='link'>
                                <div className='button' type='submit'>Login</div>
                            </Link> */}
                            {/* <Link to="/patient-portal/auth" className='link'> */}
                                <button className='button'  disabled={isLoading} type='submit' onClick={handleLogin}>{ isLoading ? <HashLoader size={30} cssOverride={{ margin: '0px auto 0px auto'}} color="#fff" /> : `Login`}</button>
                            {/* </Link> */}

                            {/* <HashLoader size={30} cssOverride={{position:'absolute', left:'190px', bottom:'13px',  margin: '0px auto 80px auto'}} color="#fff" />  */}

                            <div className="sub-info" onClick={(e)=>setActiveStep(2)}>
                                Forgot Password?
                            </div>
                            
                        </form>
                    </div>
                    <div className={`phase2 ${activeStep === 2 ? "active" : "inactive" } `}>
                        <div className="headerText">
                            <h3>Forgot <span>Password</span></h3>

                                {
                                    success && <div className={"otp-success"}>{success}</div>
                                }

                                {
                                    error && <div className="otp-error">{error}</div>
                                }


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
                                onChange = {(e)=>setEmail(e.target.value.trim())}
                                className="formInput"
                                />
                            </section>
                            
                            <button  className='submit' type='submit' disabled={isLoading} onClick={handlePasswordResetOTP}>Continue</button>
                            {/* <div className='submit' type='submit' onClick={(e)=>setActiveStep(3)}>Reset Password</div> */}

                            <div className="sub-info" onClick={(e)=>setActiveStep(1)}>
                                Have an account? <span>Sign In</span>
                            </div>
                            
                        </form>
                        
                    </div>

                    <div className={`phase4 ${activeStep === 4 ? "active" : "inactive" } `}>

                        <div className="authotp-wrapper">

                            <div className="logo-holder">
                                <img src={logo} alt='logo screenshot'/>
                            </div>
                            {
                                success && <div className={"otp-success"}>{success}</div>
                            }

                            {
                                error && <div className="otp-error">{error}</div>
                            }
                            
                            <div className="auth-description">
                                <span>2-Step Verification</span>
                                <p>Hi {recoveryEmail}, to help keep your account safe, Sapphire wants to make sure 
                                    it's really you.
                                </p>
                                We emailed a code to 
                                <div className="auth-email"><em>{recoveryEmail}</em></div>
                                Please enter the code to reset your password.
                            </div>
                            <div className="otpHolder">

                                <input 
                                    className='otp-field'
                                    type='text'
                                    name='otp'
                                    maxLength="6"
                                    value={otp}
                                    onChange={handleOTPChange}
                                
                                />

                            </div>
                            <div className="otp-buttons">
                                <div className="otp-clear" onClick={() => setOtp("")}>Clear</div>
                                <button className="otp-verify" disabled={isLoading} onClick={handleVerifyOTP}>
                                    {isLoading ? 
                                    <HashLoader size={30} cssOverride={{ margin: '0px auto 0px auto'}} color="#fff" /> : `Verity OTP`}
                                </button>
                                
                            </div>

                            <div className="otp-remark">
                                <p>Didn't receive the verification code? It could take a bit of time. <span className="otp-resend" onClick={generateNewOTP}>Request a new OTP code</span></p>
                            </div>

                        </div>
                        
                    </div>
                    <div className={`phase5 ${activeStep === 5 ? "active" : "inactive" } `}>

                        <div className="reset-wrapper">

                            <div className="logo-holder">
                                <img src={logo} alt='logo screenshot'/>
                            </div>
                            {
                                success && <div className="reset-success">{success}</div>
                            }

                            {
                                error && <div className="reset-error">{error}</div>
                            }
                            
                            <div className="reset-description">
                                <span>Reset Password</span>
                                <p>Set the new password for your account so you can login and access Sapphire.
                                </p>
                            </div>
                            <form action="">
                                <section>
                                    <label>New Password</label>
                                    <input 
                                    type={visiblePassword ? "text" : "password"}
                                    placeholder='••••••••'
                                    name='resetPassword'
                                    value={resetPassword}
                                    onChange = {(e)=>setResetPassword(e.target.value.trim())}
                                    className="formInput"
                                    />
                                    { visiblePassword ? <div className="visibility_icon" onClick={toggleVisibility}><Eye /></div> : <div className="visibility_icon" onClick={toggleVisibility}><EyeOff /></div>} 
                                </section>

                                <section>
                                    <label>Confirm New Password</label>
                                    <input 
                                    type={visiblePassword ? "text" : "password"}
                                    placeholder='••••••••'
                                    name='password'
                                    value={confirmResetPassword}
                                    onChange = {(e)=>setConfirmResetPassword(e.target.value.trim())}
                                    className="formInput"
                                    />
                                    { visiblePassword ? <div className="visibility_icon" onClick={toggleVisibility}><Eye /></div> : <div className="visibility_icon" onClick={toggleVisibility}><EyeOff /></div>} 
                                </section>
                                
                                <button className='button'  disabled={isLoading} type='submit' onClick={handleChangePassword}>Reset Password</button>
                                
                            </form>

                        </div>
                        
                    </div>

                </div>
            </div>
            <div className={`phase3 ${activeStep === 3 ? "active" : "inactive" } `}>
                <div className="phase3-wrapper">
                    <div className="img-holder">
                        <img src={message} alt='Email Confirmation'/>
                    </div>
                    <div className="text-description">
                        <h3>Password Changed!</h3>
                        <p>Your password has been changed successfully.</p>
                    </div>
                    <div className="sub-info">
                        <span onClick={(e)=>setActiveStep(1)}>Login now!</span>
                        {/*  or <span onClick={(e)=>setActiveStep(2)}>Resend Password</span> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Plogin