import React, { useState, useEffect } from 'react';
import './authotp.scss';
import logo from '../../assets/images/logo.PNG'
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';

const AuthOTP = () => {
    const [email, setEmail] = useState('');
    const [otpVal, setOtpVal] = useState(new Array(6).fill(""))
    const [otp, setOtp] = useState("")
    const { user } = useAuthContext();
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);


    const handleChange = (element, index) => {
        if(isNaN(element.value)) return false;

        setOtp([...otpVal.map((d, idx) => (idx === index) ? element.value : d)])
        // setOtpValue(otp.join(""))

        //const num = [...otp.map((d, idx) => (idx === index) ? element.value : d)]
        //const otpValue = num.join("")
        //setOtpNum(num.join(""));
        console.log(otpVal)

        //Focus next input
        if(element.nextSibling) {
            element.nextSibling.focus();
        }
    }

    const handleOTPChange = (e) => {
        if(isNaN(e.target.value)) return false;
        setOtp(e.target.value);

    }

    useEffect(() => {

        setEmail(currentUser.email);
      //loadFacilityIncidenceData() //This runs again to update the update state
    }, [])
  
    // const fetchEmail = async() => {
    //   //await axios.get('http://localhost:3005/api/facility/') //local
    //   await axios.get(`${PUBLIC_URL}api/facility/`) //production
    //   .then(response => setFacilityData(response.data))
    //   .then(console.log("Facility Data >>>>",facilityData))
    // }

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null)
        setEmail(currentUser.email);
        //console.log(email);

        try {
            
            const response = await axios.post("http://localhost:9000/api/auth/login/verify", {email, otp})
            console.log(response);
        } catch (error) {
            setIsLoading(false)
            setError(error)
            console.log(error)
            
        }
    }

    const generateNewOTP = async () => {
        setIsLoading(true);
        setError(null)
        setEmail(currentUser.email);

        try {
            
            const response = await axios.post("http://localhost:9000/api/auth/login/generate-new", {email})
            console.log(response);
        } catch (error) {
            setIsLoading(false)
            setError(error)
            console.log(error)
            
        }

    }

  return (
    <div className='authotp-container'>

        <div className="authotp-wrapper">

            <div className="logo-holder">
                <img src={logo} alt='logo screenshot'/>
            </div>
            <div className="auth-description">
                <span>2-Step Verification</span>
                <p>To help keep your account safe, Sapphire wants to make sure 
                    it's really you trying to sign in.
                </p>
                We emailed a code to 
                <div className="auth-email"><em>{currentUser.email}</em></div>
                {/* <div className="auth-email"><em>{user.email}</em></div> */}
                Please enter the code to sign in.
                {/* {otp.join("")}
                {otpVal} */}
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

                {/* {
                    otp.map( (data, index) => {
                        return (
                            <input 
                                className='otp-field'
                                type='text'
                                name='otp'
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                            />
                        )
                    } )
                } */}

            </div>
            <div className="otp-buttons">
                {/* <div className="otp-clear" onClick={ e => setOtp([...otp.map(data => "")])}>Clear</div> */}
                <div className="otp-clear" onClick={() => setOtp("")}>Clear</div>
                <button className="otp-verify" onClick={handleVerifyOTP}>Verity OTP</button>
                
            </div>

            <div className="otp-remark">
                <p>Didn't receive the verification code? It could take a bit of time. <span className="otp-resend" onClick={generateNewOTP}>Request a new OTP code</span></p>
            </div>

        </div>
    </div>
  )
}

export default AuthOTP