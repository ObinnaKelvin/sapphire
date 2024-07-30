import React, { useState, useEffect, useRef  } from 'react'
import { Navbar } from '../../components/navigation/Navbar'
import './paylater.scss';
import paylaterbg from '../../assets/images/booking.jpg'
import person from '../../assets/images/gamer.png'
import cancel from '../../assets/images/cross.png'
import user from '../../assets/images/user.png'
import paper from '../../assets/images/paper.png'
import flag from '../../assets/images/flag.png';
import tick from '../../assets/images/tick.png';
import { Phone, Mail, User, Stethoscope, CalendarDays, BookOpen, AlertCircle } from 'lucide-react';
import { clinicData } from './clinicData.jsx'
import { Calendar } from 'react-date-range';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from 'date-fns'//transform the dates to readable formats
import axios from 'axios';
import naira from '../../assets/images/naira.png';
import numeral from "numeral";
import HashLoader from 'react-spinners/HashLoader';
import { io } from 'socket.io-client';

// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

function PayLater({socket}) {

    const PUBLIC_URL = "https://sapphire-api.onrender.com/";

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const[appointmentDate, setAppointmentDate] = useState('')
    const[showAppointmentDate, setShowAppointmentDate] = useState('')
    const [notes, setNotes] = useState('');
    const[openDate, setOpenDate] = useState(false)
    const[activeStep, setActiveStep] = useState(1)
    const[service, setService] = useState('')
    const[serviceData, setServiceData] = useState([])
    const[serviceId, setServiceId] = useState('')
    const[gender, setGender] = useState('')
    const onChangeDate = (dateSelected) => {
        // console.log(dateSelected)
        // console.log(format(dateSelected, 'dd/MM/yyyy'))
        setShowAppointmentDate(format(dateSelected, 'eeee do LLLL yyyy'))
        setAppointmentDate(dateSelected)
    }
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [isRequired, setIsRequired] = useState(false);
    const [isPatientLoading, setIsPatientLoading] = useState(null);
    const [patientExist, setPatientExist] = useState('')
    const [regfee, setRegfee] = useState(0);
    const [encodedDate, setEncodedDate] = useState(new Date());
    const [tariff, setTariff] = useState('');
    let totalbill = regfee+tariff
    //const [tariffData, setTariffData] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    // const [startDate, setStartDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('')
    const [type, setType] = useState('')
    const [destination, setDestination] = useState('')

    //We add a listener effect that activates 'false' which 
    // invokes the 'inactive' property to the dropdowns
    let formRef = useRef();
    useEffect(() => { 
        let listener = (e) => {
            if(!formRef.current.contains(e.target)) {
            // setOpenOptions(false);
            setOpenDate(false);
            console.log(formRef.current);          
            }

        }

        document.addEventListener("mousedown", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
        }
    }, [])

    useEffect(() => {
        loadServiceData()
        loadStatusData()
    }, [])

    useEffect(() => {
        loadTariffData()
    }, [service])

    const loadServiceData = async() => {
        // await axios.get("http://localhost:9000/api/service/") //LOCAL
        await axios.get(`${PUBLIC_URL}api/service/`) //PRODUCTION
        //.then(response => console.log(response.data))
        .then(response => setServiceData(response.data))
        //.then(console.log("Services Data >>>>", serviceData))
    }

    const loadTariffData = async() => {
       serviceId &&
        // await axios.get(`http://localhost:9000/api/tariff/find/${serviceId}`)  //LOCAL
        await axios.get(`${PUBLIC_URL}api/tariff/find/${serviceId}`) //PRODUCTION
        //.then(response => console.log(response.data.cost))
        //.then(response => setTariffData(response.data.cost))
        .then(response => setTariff(response.data.cost))
    }

    const loadStatusData = async() => {
        // await axios.get("http://localhost:9000/api/status/find/2")  //LOCAL
        await axios.get(`${PUBLIC_URL}api/status/find/2`) //PRODUCTION
        //.then(response => console.log(response.data.description))
        .then(response => setPaymentStatus(response.data.description))
        //.then(console.log("Status Data >>>>", paymentStatus))
    }

    const getValue = (e) => {
        const idChosen = e.target.children[e.target.selectedIndex].getAttribute('data-id')
        setServiceId(idChosen)
        setService(e.target.value)
        console.log(idChosen)
    }

    const checkPatientIsExist = async () => {
        setIsPatientLoading(true);
        try {
            //const response = await axios.get("http://localhost:9000/api/patients/find/${email}") //LOCAL
            const response = await axios.get(`${PUBLIC_URL}api/patients/find/${email}`) //PRODUCTION
            // if (response.status === 200) {
            if (response.data.length > 0) {
                setPatientExist(true);
                setRegfee(0)
                // console.log(patientExist)
            } else {
                setPatientExist(false)
                setRegfee(12000)
                // console.log(patientExist)
            }
            // setTimeout(() => {
            //     setIsPatientLoading(true)
            //   }, 5000);
            setIsPatientLoading(false);
            //.then(data => console.log(data.status))
            
        } catch (error) {
            setIsPatientLoading(false)
            console.log(error)
        }
    }

    const handleContinue = () => {
        if(firstname && lastname && email && mobile && showAppointmentDate && service && gender) {
            checkPatientIsExist()
            setActiveStep(2);
            setIsRequired(false)

            //This enhances the notification handle
            setTitle(`${firstname} ${lastname} has just booked an appointment for ${service}`);
            setType(`Appointment`)
            setDestination(`staff`)
        } else {
            setIsRequired(true)
        }
    
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null)

        try {
            // const response = await axios.post("http://localhost:9000/api/appointments/", //LOCAL
            // const response = await axios.post(`${PUBLIC_URL}api/appointments/`, 
            // {firstname, lastname, email, gender, mobile, service, notes, service, tariff, encodedDate, appointmentDate, paymentStatus})
            
            const response = await axios.all([
                axios.post(`${PUBLIC_URL}api/appointments/`, 
                {firstname, lastname, email, gender, mobile, service, notes, service, tariff, encodedDate, appointmentDate, paymentStatus}),
                axios.post(`${PUBLIC_URL}api/notifications/`, 
                {title, body, type, destination, encodedDate}) 
            ]);

            if (response[0].status === 200) {
                setSuccess(response[0].data);
                setError(null); //set error to null after 5 seconds
                setTimeout(() => {
                    setActiveStep(3); //set ActiveStep to 3 after 5 seconds
                  }, 2000);
                sessionStorage.setItem("receipt", JSON.stringify(response[0].data))
                console.log(response[0].data);
                // const socket = io("https://sapphire-api.onrender.com:10000", {transports: ["websocket"]});
                //const socket = io("http://localhost:4000");
                socket.emit("sendNotification", 
                    {
                        firstname,
                        appointmentDate,
                        service
                    }
                )
                console.log("Alert!!")
            }

            if (response[1].status === 200) {
                console.log(response[1].data);
                console.log(title);
                console.log(type);
                console.log(destination);
            }
            setIsLoading(false);
            
        } catch (error) {
            console.log(error)
        }

    }


    const handleFinish = () => {
        localStorage.setItem('Receipt', JSON.stringify({}));
        localStorage.setItem('RefNo', JSON.stringify(''));
        setFirstname('');
        setLastname('');
        setEmail('');
        setMobile('');
        setShowAppointmentDate('')
        setNotes('');
        // date = useState()
        setService('')
        setGender('')
        setActiveStep(1);
    }

    //Everything Sockets

    const runNotificationAlert = (patientName, bookingDate, service) => {
        // const socket = io("https://sapphire-api.onrender.com:10000", {transports: ["websocket"]});
        const socket = io("http://localhost:4000");
        socket.emit("new_booking", {message: "User booking confirmed"})
        socket.emit("sendNotification", 
            {
                patientName,
                bookingDate,
                service
            }
        )
        console.log("Alert!!")
    }

    const handleNotification = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null)

        // setTitle(`${firstname} ${lastname} has just booked an appointment for ${service}`);
        // setType(`Appointment`)
        // setDestination(`staff`)


        try {
            const response = await axios.post(`${PUBLIC_URL}api/notifications/`, 
            {title, body, type, destination, encodedDate})

            if (response.status === 200) {
                console.log(response.data);
                console.log(title);
                console.log(type);
                console.log(destination);
                // setSuccess(response.data);
                // setError(null); //set error to null after 5 seconds
                // setTimeout(() => {
                //     setActiveStep(3); //set ActiveStep to 3 after 5 seconds
                //   }, 2000);
                // sessionStorage.setItem("receipt", JSON.stringify(response.data))
                // console.log(response.data);
            }
            setIsLoading(false);

            
        } catch (error) {
            console.log(error)
        }
    }

    //const receipt = sessionStorage.getItem("receipt")

    useEffect(() => {

        //const socket = io("https://sapphire-api.onrender.com:10000", {transports: ["websocket"]});
        //const socket = io("http://localhost:4000");
        socket&&
        socket?.on("connection", () => {
            console.log("Connected to socket io")
        });

        socket&&
        socket.on("new_booking", (data) => {
            console.log("New booking confirmed", data.message)
        });
        
        socket&&
        socket.on("sendNotification", ({firstname, appointmentDate, service}) => {
           console.log("sendNotification", {firstname, appointmentDate, service})
        })

        // runNotificationAlert(firstname, appointmentDate, service)

    }, [socket])
    


  return (
    <div className="paylater-container">
        <Navbar />
        <div className="paylater-wrapper" ref={formRef}>
            <div className={`paylater-wrapper-left ${activeStep === 4 ? "inactive" : "active" }`}  ref={formRef}>
                <img src={paylaterbg} alt="Login BG" />
            </div>
            <div className={`paylater-wrapper-right ${activeStep === 4 ? "inactive" : "active" }`}  ref={formRef}>
                
                <div className="form-holder">
                    <div className="headerText">
                        <h3><span>Book a Session With Us</span></h3>
                    </div>
                    <div className="progress-status">
                        <div className={`stage one ${activeStep === 2||3 ? "active" : "inactive" }`}>
                            <div className="stage-icon">
                                <img src={user} alt='user sign' />
                            </div>
                            <div className="stage-text">Personal</div>
                            <div className="stage-bar"></div>
                        </div>
                        <div className={`stage two ${activeStep === 3 ? "active" : "inactive" }`}>
                            <div className="stage-icon">
                                <img src={paper} alt='user sign' />
                            </div>
                            <div className="stage-text">Summary</div>
                            <div className="stage-bar"></div>
                        </div>
                        <div className={`stage three ${activeStep === 3 ? "active" : "inactive" }`}>
                            <div className="stage-icon">
                                <img src={flag} alt='user sign' />
                            </div>
                            <div className="stage-text">Finish</div>
                            <div className="stage-bar"></div>
                        </div>
                    </div>
                    <div className={`phase1 ${activeStep === 1 ? "active" : "inactive" }`}  ref={formRef}>
                        { isRequired && <div className="error_msg">
                            <AlertCircle /> Mandatory fields are required!
                        </div>}
                        <form action="" ref={formRef}>
                            <section>
                                <input 
                                type="text" 
                                placeholder='First name'
                                name='firstname'
                                value={firstname}
                                // onChange={handleInputChange}
                                onChange = {(e)=>setFirstname(e.target.value)}
                                className={`formInput ${isRequired && "required"}`}
                                />
                                <input 
                                type="text" 
                                placeholder='Last name'
                                name='lastname'
                                value={lastname}
                                // onChange={handleInputChange}
                                onChange = {(e)=>setLastname(e.target.value)}
                                className={`formInput ${isRequired && "required"}`}
                                />
                                <input 
                                type="text" 
                                placeholder='Email'
                                name='email'
                                value={email}
                                // onChange={handleInputChange}
                                onChange = {(e)=>setEmail(e.target.value)}
                                className={`formInput ${isRequired && "required"}`}
                                />


                                <select className = {`formSelect mid ${isRequired && "required"}`} name="user_gender" onChange={(e)=>setGender(e.target.value)} value={gender}>
                                    <option>- Choose Gender -</option>
                                    <option value={'Male'}>Male</option>
                                    <option value={'Female'}>Female</option>
                                    <option value={'Others'}>Other</option>
                                </select>


                                <input 
                                type="text" 
                                placeholder='Mobile'
                                name='mobile'
                                value={mobile}
                                // onChange={handleInputChange}
                                onChange = {(e)=>setMobile(e.target.value)}
                                className={`formInput mid ${isRequired && "required"}`}
                                />


                                <input type="text" className={`formInput mid ${isRequired && "required"}`} name="user_appointment_date" placeholder="Select Appointment Date" value={showAppointmentDate} onChange={(e)=> setAppointmentDate(e.target.value)} onClick={()=>setOpenDate(!openDate)} />
                                {/* <div className={`calendar-backdrop ${openDate ? 'active' : 'inactive'}`} onClick={()=>setOpenDate(false)}> */}
                                <div className={`calendar-backdrop ${openDate ? 'active' : 'inactive'}`} ref={formRef}>
                                    <Calendar
                                    onChange={onChangeDate}
                                    date={new Date()}
                                    className='calendar'
                                    />
                                    <div className="cancel-holder" onClick={()=>setOpenDate(false)}>
                                        <img src={cancel} />
                                    </div>
                                </div>


                                {/* <select className = 'formSelect mid' name="user_appointment_clinic" onChange={(e)=>{setService(e.target.value); console.log(e.target.value)}} value={service}> */}
                                <select className = {`formSelect mid ${isRequired && "required"} `} name="user_appointment_clinic" onChange={getValue} value={service}>
                                    <option>- Choose a Service -</option>
                                    {
                                    // clinicData.map((data)=>(
                                    //     <option value={data.name} key={data.id}>{data.name}</option>
                                    // ))

                                        serviceData.map((data)=>(
                                            <option value={data.service} key={data._id} data-id={data.serviceId}>{data.serviceName}</option>
                                        ))
                                    }
                                </select>
                                <div className='tariff-box'>{numeral(tariff).format("0,0")}</div>
                            </section>
                            {/* <section>
                                <select className = 'formSelect' name="user_appointment_clinic" onChange={(e)=>setClinic(e.target.value)} value={clinic}>
                                    <option>- Choose a Surgical Procedure -</option>
                                    {
                                    clinicData.map((data)=>(
                                        <option value={data.name} key={data.id}>{data.name}</option>
                                    ))
                                    }
                                </select>
                            </section> */}
                            <section>

                                <textarea className="formTextArea full" type="text"name="user_additional_info" placeholder="Are there some more information you would want the doctor to know about?"
                                value={notes} onChange={(e)=> setNotes(e.target.value)}
                                />
                                    {/* <Calendar onChange={onChangeDate} value={date} nextLabel next2Label/> */}
                            </section>
                                    {/* <Calendar
                                    onChange={onChangeDate}
                                    date={new Date()}
                                    /> */}
                            {/* <section>
                                    <textarea className="formTextArea" type="text"name="user_additional_info" placeholder="Are there some more information you would want the doctor to know about?"
                                    value={description} onChange={(e)=> setDescription(e.target.value)}
                                    />
                            </section> */}
                            
                            {/* <button className="button" type='submit' onClick={(e)=>setActiveStep(2)}>Continue</button> */}
                            <div className="button" type='submit' onClick={handleContinue}>Continue</div>

                                {/* <div className="button" onClick={() => runNotificationAlert(firstname, appointmentDate, service)}>Run Socket</div> */}

                            {/* <div className="sub-info" onClick={(e)=>setActiveStep(2)}>
                                Forgot Password?
                            </div> */}
                            
                        </form>
                    </div>
                    <div className={`phase2 ${activeStep === 2 ? "active" : "inactive" } `}>
                        {/* <div className="headerText">
                            <h3>Reset <span>Password</span></h3>
                            <p>Enter the email address associated with your account and we'll email you a reset password.</p>
                        </div> */}
                        <form action="">
                            <section>
                                <div className="patient-card">
                                    <div className="photo-card">
                                        <img src={person} alt='User card'/>
                                    </div>
                                    <div className="name">
                                        {firstname} {lastname}
                                    </div>
                                    <div className="phone">
                                        <Phone size={16} /> {mobile}
                                    </div>
                                    <div className="email">
                                        <Mail size={16} /> {email}
                                    </div>
                                    <div className="sex">
                                        <User size={16} /> {gender}
                                    </div>
                                </div>
                                <div className="clinic">
                                    <Stethoscope size={16} /> {service}
                                </div>
                                <div className="date">
                                    <CalendarDays size={16} /> {showAppointmentDate}
                                </div>
                                <div className="note">
                                    <BookOpen size={16} /> {notes}
                                </div>
                                <div className="cost">
                                    <div className="bill-summary-wrapper">
                                        <div className="summary-header">Bill Summary</div>
                                        {
                                            regfee !== 0 && 
                                            <div className="summary-item">
                                                <div className="item-left">Registration Fee</div>
                                                <div className="item-right">₦{numeral(regfee).format("0,0")}</div>
                                            </div>
                                        }
                                        <div className="summary-item">
                                            <div className="item-left">{service}</div>
                                            <div className="item-right">₦{numeral(tariff).format("0,0")}</div>
                                        </div>
                                        <div className="summary-item total">
                                            <div className="item-left">Total Bill</div>
                                            <div className="item-right">₦{numeral(totalbill).format("0,0")}</div>
                                        </div>
                                    </div>
                                    {/* <img src={naira} alt='naira sign'/> {numeral(tariff+50).format("0,0")} */}
                                </div>
                            </section>
                            
                            {/* <button type='submit' onClick={(e)=>setActiveStep(3)}>Reset Password</button> */}
                            <div className="button-holder">
                                {/* <div className="previous" onClick={(e)=>setActiveStep(1)}>Previous</div> */}
                                <button  className="previous" onClick={(e)=>setActiveStep(1)}>
                                    Previous
                                </button>
                                {/* <div className="finish" onClick={(e)=>setActiveStep(3)}>Finish</div> */}
                                {/* <div className="finish" onClick={handleSubmit}>Finish</div> */}
                                {/* <button  className="finish" onClick={() => {handleSubmit(); runNotificationAlert(firstname, appointmentDate, service)}}> */}
                                <button  className="finish" onClick={(e) => {handleSubmit(e);}}>
                                    {
                                        isLoading ? 
                                        <HashLoader size={30} cssOverride={{ margin: '0px auto 0px auto'}} color="#fff" /> : `Finish`
                                    }
                                </button>
                            </div>
                           
                            
                        </form>
                        
                    </div>
                    <div className={`phase3 ${activeStep === 3 ? "active" : "inactive" } `}>
                        {/* <div className="headerText">
                            <h3>Reset <span>Password</span></h3>
                            <p>Enter the email address associated with your account and we'll email you a reset password.</p>
                        </div> */}
                        <div className="phase3-wrapper">
                            <div className="icon-holder">
                                <img src={tick} alt="success tick" />
                            </div>
                            <div className="titleText">
                                Appointment Booked!
                            </div>
                            <p>You will receive a confirmation mail shortly and an instruction on how to track your bookings.</p>
                            <div className="book-again" onClick={handleFinish}>
                                Book Again
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>
            {/* <div className={`phase3 ${activeStep === 3 ? "active" : "inactive" } `}>
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
            </div> */}
        </div>
    </div>
  )
}

export default PayLater