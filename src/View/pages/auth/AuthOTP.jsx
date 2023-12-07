import React, { useState } from 'react';
import './authotp.scss';
import logo from '../../assets/images/logo.PNG'

const AuthOTP = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""))
    const [otpValue, setOtpValue] = useState("")

    const handleChange = (element, index) => {
        if(isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index) ? element.value : d)])

        //Focus next input
        if(element.nextSibling) {
            element.nextSibling.focus();
        }

        setOtpValue(otp.join(""))
        console.log(otp.join(""))
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
                <div className="auth-email"><em>okereobinna11@gmail.com</em></div>
                Please enter the code to sign in.
                {otp.join("")}
            </div>
            <div className="otpHolder">

                {
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
                }

            </div>
            <div className="otp-buttons">
                <div className="otp-clear" onClick={ e => setOtp([...otp.map(data => "")])}>Clear</div>
                <div className="otp-verify">Verity OTP</div>
                
            </div>

            <div className="otp-remark">
                <p>Didn't receive the verification code? It could take a bit of time. <div className="otp-resend">Request a new OTP code</div></p>
            </div>

        </div>
    </div>
  )
}

export default AuthOTP