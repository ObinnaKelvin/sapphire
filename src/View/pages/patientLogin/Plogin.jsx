import React, { useState } from 'react';
import ploginbg from '../../assets/images/account.gif';
import './plogin.scss';
import Navbar from '../../components/navigation/Navbar';

function Plogin() {
    // const {formData, setFormData} = useState({
    //     email: "",
    //     password: ""
    // });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[activeStep, setActiveStep] = useState(1)

    // const handleInputChange = e => {
    //     setFormData({...formData, [e.target.value]:e.target.value});
    // }

  return (
    <div className="plogin-container">
        <Navbar />
        <div className="plogin-wrapper">
            <div className="plogin-wrapper-left">
                <img src={ploginbg} alt="Login BG" />
            </div>
            <div className="plogin-wrapper-right">
                
                <div className="form-holder">
                    <div className={`phase1 ${activeStep === 1 ? "active" : "inactive" }`}>
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
                                onChange = {(e)=>setEmail(e.target.value)}
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
                            <p>Enter the email address associated with your account and we'll send you a reset password.</p>
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
                            
                            <button type='submit'>Send</button>

                            <div className="sub-info" onClick={(e)=>setActiveStep(1)}>
                                Have an account? <span>Sign Up</span>
                            </div>
                            
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    // <div className='px-5 lg:px-0'>
    //     <div className="w-full max-w-[570px] mx-auto rouded-lg shadow-md md:p-10">
    //         <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
    //             Hello! <span className='text-primaryColor'>Welcome</span> Back
    //         </h3>

    //         <form action="" className='py-4 md:py-0'>
    //             <div className="mb-5">
    //                 <input 
    //                     type="text" 
    //                     placeholder='Email'
    //                     name='email'
    //                     value={FormData.email}
    //                     onChange={handleInputChange}
    //                     className='w-full px-4 py-23 border-b border-solid border-[#0066ff61]'
    //                 />
    //             </div>
    //             <div className="mb-5">
    //                 <input 
    //                     type="password" 
    //                     placeholder='Password'
    //                     name='password'
    //                     value={FormData.password}
    //                     onChange={handleInputChange}
    //                     className='w-full px-4 py-23 border-b border-solid border-[#0066ff61]'
    //                 />
    //             </div>

    //             <div className="mt-7">
    //                 <button type='submit' className='cd '>Login</button>
    //             </div>
    //         </form>
    //     </div>
    // </div>
  )
}

export default Plogin