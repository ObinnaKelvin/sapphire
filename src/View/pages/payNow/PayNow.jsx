import React, { useState, useEffect, useRef, useReducer  } from 'react'
import { Navbar } from '../../components/navigation/Navbar'
import './paynow.scss';
import paynowbg from '../../assets/images/booking.jpg'
import person from '../../assets/images/gamer.png'
import cancel from '../../assets/images/cross.png'
import user from '../../assets/images/user.png'
import paper from '../../assets/images/paper.png'
import flag from '../../assets/images/flag.png';
// import logo from '../../assets/images/logo.PNG';
import logo from '../../assets/images/sapphirelogo.png';
import naira from '../../assets/images/naira.png';
import pay from '../../assets/images/wallet.png';
import { Phone, Mail, User, Stethoscope, CalendarDays, BookOpen, DownloadCloud, AlertCircle } from 'lucide-react';
import { Calendar } from 'react-date-range';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format, parseISO } from 'date-fns'//transform the dates to readable formats
import numeral from "numeral";
import axios from 'axios';
import Flutterwave from '../../components/flutterwave/Flutterwave.jsx';
import PaystackIntegration from '../../components/paystack/Paystack.jsx';
// import { usePaystackPayment } from 'react-paystack';
import Interswitch from '../../components/interswitch/Interswitch.jsx';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import HashLoader from 'react-spinners/HashLoader';
import { formatDate } from '../../utils/formatDate.js';
import { io } from "socket.io-client";



function PayNow() {

    const PUBLIC_URL = "https://sapphire-api.onrender.com/";

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const[appointmentDate, setAppointmentDate] = useState('')
    const[showAppointmentDate, setShowAppointmentDate] = useState('')
    const [notes, setNotes] = useState('');
    const[date, setDate] = useState()
    const[openDate, setOpenDate] = useState(false)
    const[activeStep, setActiveStep] = useState(1) //1
    const[service, setService] = useState('')
    const[serviceData, setServiceData] = useState([])
    const[serviceId, setServiceId] = useState('')
    const[gender, setGender] = useState('')
    const onChangeDate = (dateSelected) => {
        // console.log(dateSelected)
        // console.log(format(dateSelected, 'dd/MM/yyyy'))
        // setDate(format(dateSelected, 'eeee do LLLL yyyy'))
        setShowAppointmentDate(format(dateSelected, 'eeee do LLLL yyyy'))
        setAppointmentDate(dateSelected)
        // setAppointmentDate(dateSelected)
    }
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [isRequired, setIsRequired] = useState(false);
    const [isPatientLoading, setIsPatientLoading] = useState(null);
    const [patientExist, setPatientExist] = useState('')
    const [regfee, setRegfee] = useState(0);
    // const [totalbill, setTotalbill] = useState('');
    // const [encodedDate, setEncodedDate] = useState(new Date());
    const [encodedDate, setEncodedDate] = useState(new Date());
    const [tariff, setTariff] = useState('');
    let totalbill = regfee+tariff
    //const [tariffData, setTariffData] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const receipt = JSON.parse(localStorage.getItem('Receipt'));
    // const [startDate, setStartDate] = useState(new Date());
    //For Notification >>
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('')
    const [type, setType] = useState('')
    const [destination, setDestination] = useState('')
    // const [socket, setSocket] = useState(null);
    
    // const socket = sessionStorage.getItem("socket");

    const referenceNo =  JSON.parse(localStorage.getItem('RefNo'))
    console.log("newRef",referenceNo)

    //Force Reference Update
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

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

    
    // useEffect(() => {

    //     setSocket(io("http://localhost:4000"));
        
    //     // sessionStorage.setItem("socket", io("http://localhost:4000"));
    //     console.log(socket)
    // }, [])
    
    // setTimeout(() => {
    //     reloadPage()
    // }, 1000);



    // const reloadPage = () => {
    //     // window.location.reload(false);
    //     const currentReferenceNo = JSON.parse(localStorage.getItem('RefNo'));
    //     //setReferenceNo(...referenceNo, currentReferenceNo);
    //     console.log("isPaySuccessRef:", currentReferenceNo);
    // }

    const loadServiceData = async() => {
        // await axios.get("http://localhost:9000/api/service/") //LOCAL
        await axios.get(`${PUBLIC_URL}api/service/`) //PRODUCTION
        //.then(response => console.log(response.data))
        .then(response => setServiceData(response.data))
        //.then(console.log("Services Data >>>>", serviceData))
    }

    const loadTariffData = async() => {
       serviceId &&
       //await axios.get(`http://localhost:9000/api/tariff/find/${serviceId}`) //LOCAL
        await axios.get(`${PUBLIC_URL}api/tariff/find/${serviceId}`) //PRODUCTION
        //.then(response => console.log(response.data.cost))
        //.then(response => setTariffData(response.data.cost))
        .then(response => setTariff(response.data.cost))
    }

    const loadStatusData = async() => {
        //await axios.get("http://localhost:9000/api/status/find/1") //LOCAL
        await axios.get(`${PUBLIC_URL}api/status/find/1`) //PRODUCTION
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

    const handlePaySubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null)
        forceUpdate();
        // setTimeout(() => {
        //     forceUpdate(); //set ActiveStep to 3 after 5 seconds
        //     }, 2000);

        try {

            const referenceNo =  await JSON.parse(localStorage.getItem('RefNo'))
            if (referenceNo) {
               // const response = await axios.post("http://localhost:9000/api/appointments/", //LOCAL
                // const response = await axios.post(`${PUBLIC_URL}api/appointments/`, //PRODUCTION
                // {firstname, lastname, email, gender, mobile, referenceNo, service, notes, tariff, encodedDate, appointmentDate, paymentStatus})
                
                const response = await axios.all([
                    axios.post(`${PUBLIC_URL}api/appointments/`, //PRODUCTION
                    {firstname, lastname, email, gender, mobile, referenceNo, service, notes, totalbill, encodedDate, appointmentDate, paymentStatus}), 
                    axios.post(`${PUBLIC_URL}api/notifications/`, 
                    {title, body, type, destination, encodedDate}) 
                ]);
    
                if (response[0].status === 200) {
                    setSuccess(response[0].data);
                    setError(null); //set error to null after 5 seconds
                    setTimeout(() => {
                        setActiveStep(4); //set ActiveStep to 3 after 5 seconds
                      }, 2000);
                      
                    // save the Response to local storage
                    localStorage.setItem('Receipt', JSON.stringify(response[0].data));
                    console.log(response[0].data);
                }

                if (response[1].status === 200) {
                    console.log(response[1].data);
                    console.log(title);
                    console.log(type);
                    console.log(destination);
                }

                //Send Notications
                // socket?.emit("sendNotification", {
                //     patientName: `${receipt.firstname} ${receipt.lastname}`,
                //     bookindDate :  `${receipt.encodedDate}`,
                //     service: receipt.service

                // })

            } else {
                alert("You need to make payment first!")
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

    const printComponentRef = useRef()
    // const reference = new Date().getTime().toString()
    // console.log("reference:", reference)

    // console.log("isPaySuccess:", isPaySuccess);

    

  return (
    <div className="paynow-container">
        <Navbar />
        <div className="paynow-wrapper" ref={formRef}>
            <div className={`paynow-wrapper-left ${activeStep == 5 ? "inactive" : "active" }`}  ref={formRef}>
                <img src={paynowbg} alt="Login BG" />
            </div>
            <div className={`paynow-wrapper-right ${activeStep == 5 ? "inactive" : "active" }`}  ref={formRef}>
                
                <div className="form-holder">
                    <div className="headerText">
                        <h3><span>Book a Session With Us</span></h3>
                    </div>
                    <div className="progress-status">
                        <div className={`stage one ${activeStep == 2||3 ? "active" : "inactive" }`}>
                            <div className="stage-icon">
                                <img src={user} alt='user sign' />
                            </div>
                            <div className="stage-text">Personal</div>
                            <div className="stage-bar"></div>
                        </div>
                        <div className={`stage two ${activeStep == 3 ? "active" : "inactive" }`}>
                            <div className="stage-icon">
                                <img src={paper} alt='user sign' />
                            </div>
                            <div className="stage-text">Summary</div>
                            <div className="stage-bar"></div>
                        </div>
                        <div className={`stage two ${activeStep == 3 ? "active" : "inactive" }`}>
                            <div className="stage-icon">
                                <img src={pay} alt='user sign' />
                            </div>
                            <div className="stage-text">Pay</div>
                            <div className="stage-bar"></div>
                        </div>
                        <div className={`stage three ${activeStep == 3 ? "active" : "inactive" }`}>
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


                                <select className = {`formSelect mid ${isRequired && "required"}`} name="user_sex" onChange={(e)=>setGender(e.target.value)} value={gender}>
                                    <option>- Choose Sex -</option>
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


                                {/* <input 
                                    type="date" 
                                    placeholder='Select Appointment Date'
                                    name='showAppointmentDate'
                                    value={showAppointmentDate}
                                    onChange = {(e)=>setAppointmentDate(e.target.value)}
                                    className="formInput mid"
                                /> */}

                                <input type="text" className={`formInput mid ${isRequired && "required"}`} name="user_appointment_date" placeholder="Select Appointment Date" value={showAppointmentDate} onChange={(e)=> setAppointmentDate(e.target.value)} onClick={()=>setOpenDate(!openDate)} />
                                <div className={`calendar-backdrop ${openDate ? 'active' : 'inactive'}`} ref={formRef} >
                                    <Calendar
                                    onChange={onChangeDate}
                                    date={new Date()}
                                    className='calendar'
                                    />
                                    <div className="cancel-holder" onClick={()=>setOpenDate(false)}>
                                        <img src={cancel} />
                                    </div>
                                </div>


                                {/* <select className = 'formSelect mid' name="user_appointment_clinic" onChange={(e)=>setService(e.target.value)} value={service}> */}
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
                            <div className="button" type='submit' onClick={
                                handleContinue}
                                // (e)=> {
                                // if(firstname && lastname && email && mobile && showAppointmentDate && service && gender) {
                                //     setActiveStep(2);
                                //     setIsRequired(false)
                                // } else {
                                //     setIsRequired(true)
                                // }
                            
                                // }}
                            
                                >{isPatientLoading ? <HashLoader size={30} cssOverride={{ margin: '0px auto 0px auto'}} color="#fff" /> : `Continue`}</div>

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
                                <div className="previous" onClick={(e)=>setActiveStep(1)}>Previous</div>
                                <div className="finish" onClick={(e)=>setActiveStep(3)}>Pay Now</div>
                            </div>
                        </form>
                    </div>
                    <div className={`phase3 ${activeStep === 3 ? "active" : "inactive" } `}>
                        
                        <div className="phase3-wrapper">
                            {/* <div className="icon-holder">
                                <img src={tick} alt="success tick" />
                            </div> */}
                            <div className="amount-holder">
                                <img src={naira} alt='naira sign'/> {numeral(totalbill).format("0,0")}
                            </div>
                            {/* <div className="titleText">
                                Appointment Booked!
                            </div> */}
                            <p>Select payment method</p>

                            {/* {currentReferenceNo} */}

                            <div className="payment-platforms">

                                <PaystackIntegration cost={totalbill} email={email} mobile={mobile} name={`${firstname} ${lastname}`} title={service} reference={referenceNo}/>
                                
                                {/* <Flutterwave cost={tariff} email={email} mobile={mobile} name={`${firstname} ${lastname}`} title={service}/> */}
                                
                                {/* <Interswitch /> */}
                            </div>

                            <button className="book-again" onClick={(e)=>{ forceUpdate(); handlePaySubmit(e)}}>{isLoading ? 
                                    <HashLoader size={30} cssOverride={{ margin: '0px auto 0px auto'}} color="#fff" /> : `Generate Receipt`}
                            </button>
                        </div>
                    </div>
                    
                    <div className={`phase4 ${activeStep === 4 ? "active" : "inactive" } `}>
                        <div className="phase4-wrapper"  ref={printComponentRef}>
                            <div className="icon-holder">
                                <img src={logo} alt="success tick" />
                                Sapphire Surgical Centre
                            </div>
                            <div className="titleText">
                                Transaction Receipt
                            </div>
                            <div className="phase4-body-item">
                                <div className="left">Transaction Amount</div>
                                <div className="right">{receipt&&receipt.tariff}</div>
                            </div>
                            <div className="phase4-body-item">
                                <div className="left">Transaction Date</div>
                                {/* <div className="right">{receipt&&  format(`${receipt.encodedDate}`, 'eeee do LLLL yyyy')}</div> */}
                                {/* <div className="right">{receipt&&  parseISO(receipt.encodedDate)}</div> */}
                                <div className="right">{receipt&&  formatDate(receipt.encodedDate)}</div>
                            </div>
                            <div className="phase4-body-item">
                                <div className="left">Appointment ID</div>
                                <div className="right">SAPP-{receipt&&receipt.appointmentId}</div>
                            </div>
                            <div className="phase4-body-item">
                                <div className="left">Service</div>
                                <div className="right">{receipt&&receipt.service}</div>
                            </div>
                            <div className="phase4-body-item">
                                <div className="left">Appointment Date</div>
                                <div className="right">{receipt&& formatDate(receipt.appointmentDate)}</div>
                            </div>
                            <div className="phase4-body-item">
                                <div className="left">Customer</div>
                                <div className="right">{receipt&&receipt.firstname} {receipt&&receipt.lastname}</div>
                            </div>
                            <div className="phase4-body-item">
                                <div className="left">Mobile</div>
                                <div className="right">{receipt&&receipt.mobile}</div>
                            </div>
                            <div className="phase4-body-item">
                                <div className="left">Reference Number</div>
                                <div className="right">{receipt&&receipt.referenceNo}</div>
                            </div>
                            <div className="phase4-body-item">
                                <div className="left">Transaction Status</div>
                                <div className="right">{receipt&&receipt.paymentStatus}</div>
                            </div>
                            {/* <div className="phase4-body-item">
                                <div className="left">Appointment ID</div>
                                <div className="right">SAPP-</div>
                            </div>
                            <div className="titleText">
                                Appointment Booked!
                            </div> */}
                            <p>You will receive a confirmation mail shortly and an instruction on how to track your bookings.
                                If you have any questions or would like more information, please call our 24-hour Contact Centre
                                on +2349010002302 or send an email to info@sapphiresurgeons.com. <br/>
                                Thank you for choosing Sapphire Partners.
                            </p>
                        </div>
                    </div>
                    {
                        activeStep === 4 &&
                        <>
                            <div className="functions-box">
                                <button onClick={() => exportComponentAsJPEG(printComponentRef)}>
                                    <span className='box1'>JPEG</span><DownloadCloud className='box1' />
                                </button>
                                {/* <button onClick={() => exportComponentAsPDF(printComponentRef)}>
                                    <span className='box2'>PDF</span><DownloadCloud className='box2' />
                                </button> */}
                                <button onClick={() => exportComponentAsPNG(printComponentRef)}>
                                    <span className='box3'>PNG</span><DownloadCloud className='box3' />
                                </button>
                            </div>
                            <div className="book-again" onClick={handleFinish}>
                                Finish
                            </div>
                        </>
                    }

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

export default PayNow