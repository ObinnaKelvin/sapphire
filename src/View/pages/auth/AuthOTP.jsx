import React, { useState, useEffect } from 'react';
import './authotp.scss';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.PNG'
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import HashLoader from 'react-spinners/HashLoader';

const AuthOTP = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [otpVal, setOtpVal] = useState(new Array(6).fill(""))
    const [otp, setOtp] = useState("")
    const { user } = useAuthContext();
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const currentStaff = JSON.parse(localStorage.getItem('staff'));
    const accessMode = JSON.parse(localStorage.getItem('access mode'));
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [isFullyRegistered, setIsFullyRegistered] = useState();


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

        currentUser ?
        setEmail(currentUser.email) : setEmail(currentStaff.email);
      //loadFacilityIncidenceData() //This runs again to update the update state
        loadRegStatus()
    }, [])

    const loadRegStatus = async () => {
        //await axios.get(`http://localhost:9000/api/patients/find/${currentUser.email}`) //LOCAL
        currentUser &&
        await axios.get(`https://sapphire-api.onrender.com/api/patients/find/${currentUser.email}`) //PRODUCTION
        //.then(response => console.log(response.data[0].isFullyRegistered))
        .then(response => setIsFullyRegistered(response.data[0].isFullyRegistered))
    }
  
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
        setSuccess(null)
        currentUser ? setEmail(currentUser.email) : setEmail(currentStaff.email);

        try {
            //const response = await axios.post("http://localhost:9000/api/auth/login/verify", {email, otp}) //LOCAL
            const response = await axios.post("https://sapphire-api.onrender.com/api/auth/login/verify", {email, otp}) //PRODUCTION
            
            if (response.status === 200) {
                //setIsLoading(true)
                setSuccess(response.data.message);
                setError(null); //set error to null after 5 seconds
                console.log(response.data.message);

                if (accessMode == "staff") {
                    setTimeout(() => {
                        navigate("/staff-portal"); //Navigate to Profile
                      }, 2000);
                }

                if (accessMode == "patient") {

                    //Next Check if fully registered, if not navigate to profile page and reveal the modal.
                    if(isFullyRegistered == 0) {
                        setTimeout(() => {
                            navigate("/patient-portal/profile"); //Navigate to Profile
                          }, 5000);
                    } else {
                        setTimeout(() => {
                            navigate("/patient-portal"); //Navigate to Dashboard
                          }, 5000);
                    }
                    
                }
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
        currentUser ? setEmail(currentUser.email) : setEmail(currentStaff.email);

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

    const generateNewOTPViaSms = async () => {
        setIsLoading(true);
        setError(null)
        setPhone(currentUser.phone);

        try {
            
            //const response = await axios.post("http://localhost:9000/api/auth/login/generate-new-sms", {email, phone}) //LOCAL
            const response = await axios.post("https://sapphire-api.onrender.com/api/auth/login/generate-new-sms", {email, phone}) //PRODUCTION
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

  return (
    <div className='authotp-container'>

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
                <p>Hi { currentUser ? currentUser.firstname : currentStaff.firstname}, to help keep your account safe, Sapphire wants to make sure 
                    it's really you trying to sign in.
                </p>
                We emailed a code to 
                <div className="auth-email"><em>{ currentUser ? currentUser.email : currentStaff.email}</em></div>
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
                <button className="otp-verify" disabled={isLoading} onClick={handleVerifyOTP}>{isLoading ? 
                    <HashLoader size={30} cssOverride={{ margin: '0px auto 0px auto'}} color="#fff" /> : `Verity OTP`}</button>
                {/* <button disabled={isLoading}>Disabled</button> */}
                
            </div>

            <div className="otp-remark">
                <p>Didn't receive the verification code? It could take a bit of time. <span className="otp-resend" onClick={generateNewOTP}>Request a new OTP code</span></p>
            </div>

        </div>
    </div>
  )
}

export default AuthOTP