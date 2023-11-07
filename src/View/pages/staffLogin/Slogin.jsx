import React, { useState } from 'react'
import { Navbar } from '../../components/navigation/Navbar'
import './slogin.scss';
import message from '../../assets/images/message.png'
import sloginbg from '../../assets/images/placeholder.gif';

function Slogin() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[activeStep, setActiveStep] = useState(1)

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
                        <form action="">
                            <section>
                                <input 
                                type="text" 
                                placeholder='Username'
                                name='username'
                                value={username}
                                // onChange={handleInputChange}
                                onChange = {(e)=>setUsername(e.target.value)}
                                className="formInput"
                                />
                                <input 
                                type="password" 
                                placeholder='Password'
                                name='password'
                                value={password}
                                // onChange={handleInputChange}
                                onChange = {(e)=>setPassword(e.target.value)}
                                className="formInput"
                                />
                            </section>
                            
                            <button type='submit'>Login</button>

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