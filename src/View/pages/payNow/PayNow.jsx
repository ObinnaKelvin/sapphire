import React, { useState, useEffect, useRef  } from 'react'
import { Navbar } from '../../components/navigation/Navbar'
import './paynow.scss';
import paynowbg from '../../assets/images/booking.jpg'
import person from '../../assets/images/gamer.png'
import cancel from '../../assets/images/cross.png'
import user from '../../assets/images/user.png'
import paper from '../../assets/images/paper.png'
import flag from '../../assets/images/flag.png';
import tick from '../../assets/images/tick.png';
import naira from '../../assets/images/naira.png';
import { Phone, Mail, User, Stethoscope, CalendarDays, BookOpen } from 'lucide-react';
import { clinicData } from './clinicData.jsx'
import { Calendar } from 'react-date-range';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from 'date-fns'//transform the dates to readable formats
import numeral from "numeral";
import axios from 'axios';
import Flutterwave from '../../components/flutterwave/Flutterwave.jsx';

function PayNow() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const[appointmentDate, setAppointmentDate] = useState('')
    const[showAppointmentDate, setShowAppointmentDate] = useState('')
    const [notes, setNotes] = useState('');
    const[date, setDate] = useState()
    const [costing, setCosting] = useState('20,000');
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
    }
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [encodedDate, setEncodedDate] = useState(new Date());
    const [tariff, setTariff] = useState('');
    //const [tariffData, setTariffData] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    // const [startDate, setStartDate] = useState(new Date());

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
        await axios.get("http://localhost:9000/api/service/")
        //.then(response => console.log(response.data))
        .then(response => setServiceData(response.data))
        //.then(console.log("Services Data >>>>", serviceData))
    }

    const loadTariffData = async() => {
       serviceId &&
        await axios.get(`http://localhost:9000/api/tariff/find/${serviceId}`)
        //.then(response => console.log(response.data.cost))
        //.then(response => setTariffData(response.data.cost))
        .then(response => setTariff(response.data.cost))
    }

    const loadStatusData = async() => {
        await axios.get("http://localhost:9000/api/status/find/2")
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

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null)

        try {
            const response = await axios.post("http://localhost:9000/api/appointments/", 
            {firstname, lastname, email, gender, mobile, service, notes, tariff, encodedDate, appointmentDate, paymentStatus}) 

            if (response.status === 200) {
                setSuccess(response.data);
                setError(null); //set error to null after 5 seconds
                setTimeout(() => {
                    setActiveStep(3); //set ActiveStep to 3 after 5 seconds
                  }, 5000);
                console.log(response.data);
            }
            setIsLoading(false);
            
        } catch (error) {
            console.log(error)
        }

    }
    

  return (
    <div className="paynow-container">
        <Navbar />
        <div className="paynow-wrapper" ref={formRef}>
            <div className={`paynow-wrapper-left ${activeStep === 4 ? "inactive" : "active" }`}  ref={formRef}>
                <img src={paynowbg} alt="Login BG" />
            </div>
            <div className={`paynow-wrapper-right ${activeStep === 4 ? "inactive" : "active" }`}  ref={formRef}>
                
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
                        <form action="" ref={formRef}>
                            <section>
                                <input 
                                type="text" 
                                placeholder='First name'
                                name='firstname'
                                value={firstname}
                                // onChange={handleInputChange}
                                onChange = {(e)=>setFirstname(e.target.value)}
                                className="formInput"
                                />
                                <input 
                                type="text" 
                                placeholder='Last name'
                                name='lastname'
                                value={lastname}
                                // onChange={handleInputChange}
                                onChange = {(e)=>setLastname(e.target.value)}
                                className="formInput"
                                />
                                <input 
                                type="text" 
                                placeholder='Email'
                                name='email'
                                value={email}
                                // onChange={handleInputChange}
                                onChange = {(e)=>setEmail(e.target.value)}
                                className="formInput"
                                />


                                <select className = 'formSelect mid' name="user_sex" onChange={(e)=>setGender(e.target.value)} value={gender}>
                                    <option>- Choose Sex -</option>
                                    <option value={'Male'}>Male</option>
                                    <option value={'Female'}>Female</option>
                                </select>


                                <input 
                                type="text" 
                                placeholder='Mobile'
                                name='mobile'
                                value={mobile}
                                // onChange={handleInputChange}
                                onChange = {(e)=>setMobile(e.target.value)}
                                className="formInput mid"
                                />


                                <input type="text" className="formInput mid" name="user_appointment_date" placeholder="Select Appointment Date" value={showAppointmentDate} onChange={(e)=> setAppointmentDate(e.target.value)} onClick={()=>setOpenDate(!openDate)} />
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


                                {/* <select className = 'formSelect mid' name="user_appointment_clinic" onChange={(e)=>setService(e.target.value)} value={service}> */}
                                <select className = 'formSelect mid' name="user_appointment_clinic" onChange={getValue} value={service}>
                                    <option>- Choose a Surgical Procedure -</option>
                                    {
                                        // clinicData.map((data)=>(
                                        //     <option value={data.name} key={data.id}>{data.name}</option>
                                        // ))
                                        serviceData.map((data)=>(
                                            <option value={data.service} key={data._id} data-id={data.serviceId}>{data.serviceName}</option>
                                        ))

                                    }
                                </select>
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
                            <div className="button" type='submit' onClick={(e)=>setActiveStep(2)}>Continue</div>

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
                                    <img src={naira} alt='naira sign'/> {numeral(tariff).format("0,0")}
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
                                <img src={naira} alt='naira sign'/> {numeral(tariff).format("0,0")}
                            </div>
                            {/* <div className="titleText">
                                Appointment Booked!
                            </div> */}
                            <p>Select payment method</p>

                            <div className="payment-platforms">
                                <div className="payment-item">
                                  <div className="left">
                                    <svg height="-393" viewBox="-131.2 222 600.2 106.9" width="119" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m-45.8 232.2h-80.4c-2.7 0-5 2.3-5 5.1v9.1c0 2.8 2.3 5.1 5 5.1h80.4c2.8 0 5-2.3 5.1-5.1v-9c0-2.9-2.3-5.2-5.1-5.2zm0 50.5h-80.4c-1.3 0-2.6.5-3.5 1.5-1 1-1.5 2.2-1.5 3.6v9.1c0 2.8 2.3 5.1 5 5.1h80.4c2.8 0 5-2.2 5.1-5.1v-9.1c-.1-2.9-2.3-5.1-5.1-5.1zm-35.1 25.2h-45.3c-1.3 0-2.6.5-3.5 1.5s-1.5 2.2-1.5 3.6v9.1c0 2.8 2.3 5.1 5 5.1h45.2c2.8 0 5-2.3 5-5v-9.1c.1-3-2.1-5.3-4.9-5.2zm40.2-50.5h-85.5c-1.3 0-2.6.5-3.5 1.5s-1.5 2.2-1.5 3.6v9.1c0 2.8 2.3 5.1 5 5.1h85.4c2.8 0 5-2.3 5-5.1v-9.1c.1-2.8-2.2-5-4.9-5.1zm0 0" fill="#00c3f7"/>
                                        <path d="m52.8 252.6c-2.5-2.6-5.4-4.6-8.7-6s-6.8-2.1-10.4-2.1c-3.5-.1-6.9.7-10.1 2.2-2.1 1-4 2.4-5.6 4.1v-1.6c0-.8-.3-1.6-.8-2.2s-1.3-1-2.2-1h-11.1c-.8 0-1.6.3-2.1 1-.6.6-.9 1.4-.8 2.2v74.8c0 .8.3 1.6.8 2.2.6.6 1.3.9 2.1.9h11.4c.8 0 1.5-.3 2.1-.9.6-.5 1-1.3.9-2.2v-25.6c1.6 1.8 3.7 3.1 6 3.9 3 1.1 6.1 1.7 9.3 1.7 3.6 0 7.2-.7 10.5-2.1s6.3-3.4 8.8-6c2.6-2.7 4.6-5.9 6-9.4 1.6-3.9 2.3-8.1 2.2-12.3.1-4.2-.7-8.4-2.2-12.4-1.5-3.3-3.5-6.5-6.1-9.2zm-10.2 27.1c-.6 1.6-1.5 3-2.7 4.3-2.3 2.5-5.6 3.9-9 3.9-1.7 0-3.4-.3-5-1.1-1.5-.7-2.9-1.6-4.1-2.8s-2.1-2.7-2.7-4.3c-1.3-3.4-1.3-7.1 0-10.5.6-1.6 1.6-3 2.7-4.2 1.2-1.2 2.6-2.2 4.1-2.9 1.6-.7 3.3-1.1 5-1.1 1.8 0 3.4.3 5.1 1.1 1.5.7 2.9 1.6 4 2.8 1.2 1.2 2 2.6 2.7 4.2 1.2 3.5 1.1 7.2-.1 10.6zm79.6-33.6h-11.3c-.8 0-1.6.3-2.1.9-.6.6-.9 1.4-.9 2.3v1.4c-1.4-1.7-3.2-3-5.1-3.9-3.1-1.5-6.5-2.2-9.9-2.2-7.3 0-14.2 2.9-19.4 8-2.7 2.7-4.8 5.9-6.2 9.4-1.6 3.9-2.4 8.1-2.3 12.4-.1 4.2.7 8.4 2.3 12.4 1.5 3.5 3.5 6.7 6.2 9.4 5.1 5.2 12.1 8.1 19.3 8.1 3.4.1 6.8-.7 9.9-2.2 1.9-1 3.8-2.3 5.2-3.9v1.5c0 .8.3 1.6.9 2.2.6.5 1.3.9 2.1.9h11.3c.8 0 1.6-.3 2.1-.9.6-.6.9-1.4.9-2.2v-50.3c0-.8-.3-1.6-.8-2.2-.6-.7-1.4-1.1-2.2-1.1zm-15.3 33.6c-.6 1.6-1.5 3-2.7 4.3-1.2 1.2-2.5 2.2-4 2.9-3.2 1.5-6.9 1.5-10.1 0-1.5-.7-2.9-1.7-4.1-2.9s-2.1-2.7-2.7-4.3c-1.2-3.4-1.2-7.1 0-10.5.6-1.6 1.5-2.9 2.7-4.2 1.2-1.2 2.5-2.2 4.1-2.9 3.2-1.5 6.9-1.5 10 0 1.5.7 2.9 1.6 4 2.8s2 2.6 2.7 4.2c1.4 3.5 1.4 7.2.1 10.6zm127.9-6.8c-1.6-1.4-3.5-2.6-5.5-3.4-2.1-.9-4.4-1.5-6.6-2l-8.6-1.7c-2.2-.4-3.8-1-4.6-1.7-.7-.5-1.2-1.3-1.2-2.2s.5-1.7 1.6-2.4c1.5-.8 3.1-1.2 4.8-1.1 2.2 0 4.4.5 6.4 1.3 2 .9 3.9 1.8 5.7 3 2.5 1.6 4.7 1.3 6.2-.5l4.1-4.7c.8-.8 1.2-1.8 1.3-2.9-.1-1.2-.7-2.2-1.6-3-1.7-1.5-4.5-3.1-8.2-4.7s-8.4-2.4-13.9-2.4c-3.4-.1-6.7.4-9.9 1.4-2.7.9-5.3 2.2-7.6 3.9-2.1 1.6-3.7 3.6-4.9 6-1.1 2.3-1.7 4.8-1.7 7.3 0 4.7 1.4 8.5 4.2 11.3s6.5 4.7 11.1 5.6l9 2c1.9.3 3.9.9 5.7 1.8 1 .4 1.6 1.4 1.6 2.5 0 1-.5 1.9-1.6 2.7s-2.9 1.3-5.3 1.3-4.9-.5-7.1-1.6c-2.1-1-4-2.3-5.8-3.8-.8-.6-1.6-1.1-2.6-1.5-1-.3-2.3 0-3.6 1.1l-4.9 3.7c-1.4 1-2.1 2.7-1.7 4.3.3 1.7 1.6 3.3 4.1 5.2 6.2 4.2 13.6 6.4 21.1 6.2 3.5 0 7-.4 10.3-1.4 2.9-.9 5.6-2.2 8-4 2.2-1.6 4-3.7 5.2-6.2 1.2-2.4 1.8-5 1.8-7.7.1-2.4-.4-4.8-1.4-7-1-1.6-2.3-3.3-3.9-4.7zm49.4 13.7c-.5-.9-1.4-1.5-2.5-1.7-1 0-2.1.3-2.9.9-1.4.9-3 1.4-4.6 1.5-.5 0-1.1-.1-1.6-.2-.6-.1-1.1-.4-1.5-.8-.5-.5-.9-1.1-1.2-1.7-.4-1-.6-2-.5-3v-20.5h14.6c.9 0 1.7-.4 2.3-1s1-1.3 1-2.2v-8.7c0-.9-.3-1.7-1-2.2-.6-.6-1.4-.9-2.2-.9h-14.7v-14c0-.8-.3-1.7-.9-2.2s-1.3-.8-2.1-.9h-11.4c-.8 0-1.6.3-2.2.9s-1 1.4-1 2.2v14h-6.5c-.8 0-1.6.3-2.2 1-.5.6-.8 1.4-.8 2.2v8.7c0 .8.3 1.6.8 2.2.5.7 1.3 1 2.2 1h6.5v24.4c-.1 2.9.5 5.8 1.7 8.4 1.1 2.2 2.5 4.1 4.4 5.7 1.8 1.5 3.9 2.6 6.2 3.2 2.3.7 4.7 1.1 7.1 1.1 3.1 0 6.3-.5 9.3-1.5 2.8-.9 5.3-2.5 7.3-4.6 1.3-1.3 1.4-3.4.4-4.9zm61.8-40.5h-11.3c-.8 0-1.5.3-2.1.9s-.9 1.4-.9 2.3v1.4c-1.4-1.7-3.1-3-5.1-3.9-3.1-1.5-6.5-2.2-9.9-2.2-7.3 0-14.2 2.9-19.4 8-2.7 2.7-4.8 5.9-6.2 9.4-1.6 3.9-2.4 8.1-2.3 12.3-.1 4.2.7 8.4 2.3 12.4 1.4 3.5 3.6 6.7 6.2 9.4 5.1 5.2 12 8.1 19.3 8.1 3.4.1 6.8-.7 9.9-2.1 2-1 3.8-2.3 5.2-3.9v1.5c0 .8.3 1.6.9 2.1.6.6 1.3.9 2.1.9h11.3c1.7 0 3-1.3 3-3v-50.3c0-.8-.3-1.6-.8-2.2-.5-.7-1.3-1.1-2.2-1.1zm-15.2 33.6c-.6 1.6-1.5 3-2.7 4.3-1.2 1.2-2.5 2.2-4 2.9-1.6.7-3.3 1.1-5.1 1.1s-3.4-.4-5-1.1c-1.5-.7-2.9-1.7-4.1-2.9s-2.1-2.7-2.6-4.3c-1.2-3.4-1.2-7.1 0-10.5.6-1.6 1.5-3 2.6-4.2 1.2-1.2 2.6-2.2 4.1-2.9 1.6-.7 3.3-1.1 5-1.1s3.4.3 5.1 1.1c1.5.7 2.8 1.6 4 2.8s2.1 2.6 2.7 4.2c1.3 3.4 1.3 7.2 0 10.6zm77.2 6.1-6.5-5c-1.2-1-2.4-1.3-3.4-.9-.9.4-1.7 1-2.4 1.7-1.4 1.7-3.1 3.2-4.9 4.5-2 1.1-4.1 1.7-6.3 1.5-2.6 0-5-.7-7.1-2.2s-3.7-3.5-4.5-6c-.6-1.7-.9-3.4-.9-5.1 0-1.8.3-3.5.9-5.3.6-1.6 1.4-3 2.6-4.2s2.5-2.2 4-2.8c1.6-.7 3.3-1.1 5.1-1.1 2.2-.1 4.4.5 6.3 1.6 1.9 1.2 3.5 2.7 4.9 4.5.6.7 1.4 1.3 2.3 1.7 1 .4 2.2.1 3.4-.9l6.5-4.9c.8-.5 1.4-1.3 1.7-2.2.4-1 .3-2.1-.3-3-2.5-3.9-5.9-7.1-10-9.4-4.3-2.4-9.4-3.7-15.1-3.7-4 0-8 .8-11.8 2.3-3.6 1.5-6.8 3.6-9.5 6.3s-4.9 5.9-6.4 9.5c-3.1 7.5-3.1 15.9 0 23.4 1.5 3.5 3.6 6.8 6.4 9.4 5.7 5.6 13.3 8.6 21.3 8.6 5.7 0 10.8-1.3 15.1-3.7 4.1-2.3 7.6-5.5 10.1-9.5.5-.9.6-2 .3-2.9-.4-.8-1-1.6-1.8-2.2zm60.2 11.7-17.9-26.2 15.3-20.2c.7-.9 1-2.2.6-3.3-.3-.8-1-1.6-2.9-1.6h-12.1c-.7 0-1.4.2-2 .5-.8.4-1.4 1-1.8 1.7l-12.2 17.1h-2.9v-40.4c0-.8-.3-1.6-.9-2.2s-1.3-.9-2.1-.9h-11.3c-.8 0-1.6.3-2.2.9s-.9 1.3-.9 2.2v74.5c0 .9.3 1.6.9 2.2s1.4.9 2.2.9h11.3c.8 0 1.6-.3 2.1-.9.6-.6.9-1.4.9-2.2v-19.7h3.2l13.3 20.4c.8 1.5 2.3 2.4 3.9 2.4h12.7c1.9 0 2.7-.9 3.1-1.7.5-1.2.4-2.5-.3-3.5zm-281.8-51.4h-12.7c-1 0-1.9.3-2.6 1-.6.6-1 1.3-1.2 2.1l-9.4 34.8h-2.3l-10-34.8c-.2-.7-.5-1.4-1-2.1-.6-.7-1.4-1.1-2.3-1.1h-12.9c-1.7 0-2.7.5-3.2 1.7-.3 1-.3 2.1 0 3.1l16 49c.3.7.6 1.5 1.2 2 .6.6 1.5.9 2.4.9h6.8l-.6 1.6-1.5 4.5c-.5 1.4-1.3 2.6-2.5 3.5-1.1.8-2.4 1.3-3.8 1.2-1.2 0-2.3-.3-3.4-.7-1.1-.5-2.1-1.1-3-1.8-.8-.6-1.8-.9-2.9-.9h-.1c-1.2.1-2.3.7-2.9 1.8l-4 5.9c-1.6 2.6-.7 4.2.3 5.1 2.2 2 4.7 3.5 7.5 4.4 3.1 1.1 6.3 1.6 9.5 1.6 5.8 0 10.6-1.6 14.3-4.7 3.8-3.4 6.7-7.8 8.1-12.8l18.6-60.6c.4-1.1.5-2.2.1-3.2-.1-.7-.8-1.5-2.5-1.5zm0 0" fill="#011b33"/>
                                    </svg>
                                    {/* <svg height="-285" viewBox="-135.4 209.8 604.3 125.4" width="119" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m67.2 244.4h.2c1.2 0 1.9.9 1.9 2.1v53.9c0 .9-.7 1.9-1.9 1.9-.9 0-1.9-.7-1.9-1.9v-54.1c0-1 .7-1.9 1.7-1.9zm-51.3 2.8h35.3c1.2 0 1.9 1.2 1.9 2.1s-.7 1.9-1.9 1.9h-33.4v22.5h30.2c.9 0 1.9.7 1.9 1.9 0 .9-.7 1.9-1.9 1.9h-29.9v23.2c-.2 1.2-1.2 2.1-2.3 2.1-1.2 0-2.1-.9-2.1-2.1v-51.3h.2a2 2 0 0 1 2-2.2zm102.5 16.7c0-1.2-.9-1.9-1.9-1.9-1.2 0-1.9.9-1.9 1.9v22.5c0 7.7-6.3 13.7-14 13.5-8.2 0-12.9-5.3-12.9-13.7v-22.3c0-1.2-.9-1.9-1.9-1.9-.9 0-1.9.9-1.9 1.9v23c0 9.5 6.1 16.5 16.1 16.5 6.1.2 11.9-3 14.7-8.4v5.8c0 1.2.9 1.9 1.9 1.9 1.2 0 1.9-.9 1.9-1.9h-.2v-36.9zm35.5.3c0 .9-.9 1.6-1.9 1.6h-12.9v25.8c0 5.8 3.3 7.9 8.2 7.9 1.6 0 3.3-.2 4.7-.7.9 0 1.6.7 1.6 1.6 0 .7-.5 1.4-1.2 1.6-1.9.7-4 .9-5.8.9-6.1 0-11.2-3.5-11.2-10.9v-26.2h-4.4c-.9 0-1.9-.9-1.9-1.9 0-.9.9-1.6 1.9-1.6h4.4v-11.1c0-.9.7-1.9 1.6-1.9h.2c.9 0 1.9.9 1.9 1.9v11.1h12.9c1 0 1.9.9 1.9 1.9zm30 1.6c.9 0 1.9-.7 1.9-1.6s-.9-1.9-1.9-1.9h-12.9v-11.1c0-.9-.9-1.9-1.9-1.9h-.2c-.9 0-1.6.9-1.6 1.9v11.1h-4.4c-.9 0-1.9.7-1.9 1.6s.9 1.9 1.9 1.9h4.4v26.2c0 7.4 5.1 10.9 11.2 10.9 1.9 0 4-.2 5.8-.9.7-.2 1.2-.9 1.2-1.6 0-.9-.7-1.6-1.6-1.6-1.4.5-3 .7-4.7.7-4.9 0-8.2-2.1-8.2-7.9v-25.8zm8.9 16.5c0-11.8 8.2-21.1 19.2-21.1 11.5 0 18.7 9.3 18.7 21.1 0 .9-.9 1.9-1.9 1.9h-31.8c.7 10 8 15.8 15.9 15.8 4.9 0 9.8-2.1 13.1-5.6.2-.2.7-.5 1.2-.5.9 0 1.9.9 1.9 1.9 0 .5-.2.9-.7 1.4-4 4.4-9.8 6.7-15.7 6.5-10.8 0-19.9-8.4-19.9-21.1zm53.1-8.4c2.6-6.7 8.9-11.6 16.1-12.1 1.2 0 2.1.9 2.1 2.3 0 .9-.7 2.1-1.9 2.1h-.2c-8.7.9-16.1 7.2-16.1 20.2v14.9c-.2 1.2-.9 1.9-2.1 1.9-.9 0-1.9-.9-1.9-1.9v-37.2c.2-1.2.9-1.9 2.1-1.9.9 0 1.9.9 1.9 1.9zm79.9-14.2c-2.8 0-5.1 1.9-5.8 4.6l-6.8 21.6-6.8-21.6c-.7-2.8-3.3-4.9-6.3-4.9h-.7c-3 0-5.6 1.9-6.3 4.9l-6.8 21.4-6.5-21.6c-.7-2.6-3-4.6-5.8-4.6h-.2c-3 0-5.4 2.6-5.4 5.6 0 .9.2 1.9.5 2.8l10.5 30c.7 3 3.3 5.1 6.5 5.3h.5c3 0 5.6-2.1 6.5-5.1l6.8-21.4 6.8 21.4c.7 3 3.5 5.1 6.5 5.1h.5c3.3 0 6.1-2.1 6.8-5.3l10.5-30.2c.2-.7.5-1.6.5-2.3v-.2c-.1-3.1-2.4-5.5-5.5-5.5zm16.4 2.1c4.4-1.4 8.9-2.3 13.6-2.1 6.5 0 11.2 1.9 14.7 4.9 3.3 3.7 4.9 8.6 4.7 13.5v19c0 3.3-2.6 5.8-5.8 5.8-3 0-5.6-2.1-5.8-5.1-3.3 3.5-8 5.6-12.9 5.3-7.7 0-14.5-4.6-14.5-13 0-9.3 7-13.7 17.1-13.7 3.5 0 7 .5 10.3 1.6v-.7c0-5.1-3-7.7-9.1-7.7-2.8 0-5.6.2-8.4 1.2-.5.2-1.2.2-1.6.2-2.8.2-5.1-1.9-5.1-4.6-.2-2 .9-3.9 2.8-4.6zm69 1.9c.7-2.6 3-4.2 5.6-4.2 3.3 0 5.8 2.6 5.8 5.6v.2c0 .9-.2 1.9-.7 2.8l-12.6 30c-1.2 3-4 4.9-7 5.1h-.7c-3.3-.2-5.8-2.3-6.8-5.3l-13.1-30c-.5-.9-.7-1.9-.7-2.8.2-3.3 2.8-5.6 5.8-5.6 2.8 0 5.1 1.9 5.8 4.4l9.1 24.4zm16.2 19.5c.5 11.6 10.5 20.7 22.2 20 5.4 0 10.5-1.6 14.7-5.1 1.2-.9 1.6-2.1 1.6-3.5v-.2c0-2.6-2.1-4.6-4.7-4.6-.9 0-2.1.2-2.8.9-2.6 1.9-5.6 3-8.7 2.8-5.1.2-9.6-3.3-10.3-8.4h24.1c3-.2 5.4-2.8 5.1-5.8v-.9c0-10.5-9.1-19.3-20.3-19-12.4 0-21.1 10-21.1 22.1v1.7z" fill="#10112b"/>
                                        <path d="m196.7 280.4c.7-8.8 7-15.6 15-15.6 9.1 0 14 7.4 14.5 15.6zm167 7c0 4.6-4 7.4-9.6 7.2-3.7 0-6.5-1.9-6.5-5.1v-.2c0-3.5 3.3-5.8 8.4-5.8 2.6 0 5.4.7 7.7 1.6zm84.7-18.4c-4.9 0-8.2 3.5-9.1 9.1h18c-.7-5.4-4-9.1-8.9-9.1z" fill="#fff"/>
                                        <path d="m-46.7 217.7c52.6-7.9 18.9 36.9 2.6 49.5 11.2 8.6 22.7 20.7 27.6 34.4 9.1 25.1-13.3 28.8-30.2 22.5-18.5-6.5-34.8-20.4-45.6-36.7-3 0-6.3-.5-9.4-1.4 6.1 17.2 8.7 34.8 7 49.2 0-29-13.8-57.8-33.7-81.8-7-8.4.2-14.6 6.5-6.5 4.3 5.9 8.2 12 11.7 18.3 6.9-23.6 40.5-44.2 63.5-47.5zm-7.5 42.7c10.3-6.3 41.6-39.9 12.4-36.9-16.8 1.9-37.2 17.4-45.6 27.4 11.7-1.4 23.6 3.7 33.2 9.5zm-29 26.1c9.4 10.5 22.2 20.7 36 24.4 8 2.1 16.8 1.2 13.6-10.2-3.3-10.5-11.7-19.7-19.9-26.7-2.3 1.6-4.9 3.3-7.5 4.4-7 3.9-14.5 6.7-22.2 8.1z" fill="#eba12a"/>
                                        <path d="m-87.7 258.3c8-.7 16.6 3.5 23.2 7.7-6.3 3-13.3 4.9-20.6 5.3-10.7.1-12.9-12-2.6-13z" fill="#fff"/>
                                    </svg> */}
                                  </div>
                                  <div className="right">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 141.732 141.732"><g fill="#2566af">
                                        <path d="M62.935 89.571h-9.733l6.083-37.384h9.734zM45.014 52.187L35.735 77.9l-1.098-5.537.001.002-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s4.691.976 10.181 4.273l8.456 32.479h10.141l15.485-37.385H45.014zM121.569 89.571h8.937l-7.792-37.385h-7.824c-3.613 0-4.493 2.786-4.493 2.786L95.881 89.571h10.146l2.029-5.553h12.373l1.14 5.553zm-10.71-13.224l5.114-13.99 2.877 13.99h-7.991zM96.642 61.177l1.389-8.028s-4.286-1.63-8.754-1.63c-4.83 0-16.3 2.111-16.3 12.376 0 9.658 13.462 9.778 13.462 14.851s-12.075 4.164-16.06.965l-1.447 8.394s4.346 2.111 10.986 2.111c6.642 0 16.662-3.439 16.662-12.799 0-9.72-13.583-10.625-13.583-14.851.001-4.227 9.48-3.684 13.645-1.389z"/></g>
                                        <path d="M34.638 72.364l-3.275-16.812s-.396-3.366-4.617-3.366h-15.34l-.18.633s7.373 1.528 14.445 7.253c6.762 5.472 8.967 12.292 8.967 12.292z" fill="#e6a540"/>
                                        <path fill="none" d="M0 0h141.732v141.732H0z"/>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 192.756 192.756"><g fill-rule="evenodd" clip-rule="evenodd">
                                        <path fill="#fff" d="M0 0h192.756v192.756H0V0z"/>
                                        <path d="M96.42 133.041c8.667 7.986 20.306 12.83 32.966 12.83 27.189 0 49.195-22.176 49.195-49.451 0-27.358-22.006-49.535-49.195-49.535-12.66 0-24.299 4.843-32.966 12.83-9.941 9.091-16.229 22.176-16.229 36.705.001 14.529 6.288 27.615 16.229 36.621z" fill="#e9b040"/>
                                        <path d="M172.041 123.949c0-.85.68-1.529 1.529-1.529.934 0 1.613.68 1.613 1.529 0 .936-.68 1.615-1.613 1.615-.849 0-1.529-.679-1.529-1.615zm1.529 1.276c.68 0 1.273-.596 1.273-1.275s-.594-1.189-1.273-1.189c-.596 0-1.189.51-1.189 1.189s.594 1.275 1.189 1.275zm-.17-.51h-.34v-1.445h.594c.086 0 .256 0 .34.086.17.084.17.17.17.34s-.084.34-.254.34l.34.68h-.426l-.17-.596h-.254v.595-.85h.34c.084 0 .084-.086.084-.17 0-.086 0-.086-.084-.17h-.34v1.19z" fill="#e9b040"/>
                                        <path d="M112.309 91.153c-.17-1.784-.51-3.483-.85-5.268H81.381c.34-1.784.85-3.483 1.359-5.183h27.275a56.916 56.916 0 0 0-2.039-5.268H84.865a62.38 62.38 0 0 1 2.804-5.268h17.419a44.706 44.706 0 0 0-3.738-5.183h-9.942a48.87 48.87 0 0 1 5.013-5.268c-8.751-7.902-20.307-12.83-33.052-12.83-27.104 0-49.195 22.177-49.195 49.535 0 27.275 22.091 49.451 49.195 49.451 12.745 0 24.3-4.844 33.052-12.83a47.105 47.105 0 0 0 4.929-5.184h-9.942c-1.36-1.699-2.549-3.398-3.739-5.268h17.419a39.517 39.517 0 0 0 2.889-5.268H84.865c-.765-1.699-1.529-3.398-2.125-5.184h27.275c.594-1.699 1.02-3.482 1.443-5.268.34-1.699.68-3.482.85-5.268a51.61 51.61 0 0 0 .256-5.184c0-1.781-.085-3.565-.255-5.264z" fill="#cc2131"/>
                                        <path d="M172.041 107.891c0-.934.68-1.613 1.529-1.613.934 0 1.613.68 1.613 1.613 0 .85-.68 1.615-1.613 1.615-.849 0-1.529-.766-1.529-1.615zm1.529 1.189c.68 0 1.273-.51 1.273-1.189s-.594-1.189-1.273-1.189c-.596 0-1.189.51-1.189 1.189s.594 1.189 1.189 1.189zm-.17-.51h-.34v-1.359H173.994c.17.086.17.256.17.426 0 .084-.084.254-.254.34l.34.594h-.426l-.17-.51h-.254v.509-.764h.17c.084 0 .17 0 .17-.086.084 0 .084-.084.084-.17 0 0 0-.084-.084-.084 0-.086-.086 0-.17 0h-.17v1.104z" fill="#fff"/>
                                        <path d="M79.682 110.695c-1.614.424-2.804.68-3.993.68-2.549 0-4.079-1.615-4.079-4.504 0-.594.085-1.189.17-1.869l.34-1.953.255-1.615L74.669 87.5h5.098l-.595 3.059h3.229l-.765 5.098h-3.229l-1.359 8.326c-.085.426-.085.68-.085.85 0 1.105.51 1.529 1.784 1.529.595 0 1.104-.084 1.614-.17l-.679 4.503zM96.166 110.525c-1.869.51-3.568.764-5.438.764-5.778 0-9.092-3.059-9.092-9.09 0-7.053 3.909-12.151 9.346-12.151 4.333 0 7.137 2.889 7.137 7.391 0 1.531-.17 2.975-.594 5.014H86.904c-.085.34-.085.51-.085.68 0 2.379 1.614 3.568 4.673 3.568 1.954 0 3.653-.424 5.523-1.273l-.849 5.097zm-3.144-12.15v-1.02c0-1.699-.935-2.634-2.549-2.634-1.7 0-2.889 1.274-3.399 3.653h5.948v.001zM38.898 110.949H33.63l3.059-19.286-6.882 19.286h-3.653l-.425-19.201-3.229 19.201h-5.183l4.163-25.064h7.732l.17 15.465 5.183-15.465h8.497l-4.164 25.064zM51.729 101.859c-.51-.086-.68-.086-1.02-.086-3.059 0-4.588 1.189-4.588 3.059 0 1.275.765 2.125 1.954 2.125 2.549 0 3.568-2.125 3.654-5.098zm4.248 9.09h-4.588l.085-2.123c-1.19 1.613-2.804 2.463-5.608 2.463-2.549 0-4.758-2.293-4.758-5.607 0-.934.17-1.783.425-2.633.849-3.145 3.993-5.098 8.836-5.184.595 0 1.529 0 2.379.086.169-.68.169-.936.169-1.36 0-1.36-1.104-1.785-3.568-1.785-1.529 0-3.229.255-4.418.68l-.765.17-.34.084.765-4.588c2.464-.765 4.248-1.104 6.203-1.104 4.588 0 7.052 2.124 7.052 6.032 0 1.02.085 1.785-.255 3.994l-1.189 7.307-.17 1.275-.085 1.02-.085.68-.085.593zM121.826 90.728c1.529 0 2.889.425 4.758 1.359l.934-5.438c-.51-.255-.68-.255-1.359-.51l-2.123-.595c-.68-.17-1.529-.255-2.465-.255-2.635 0-4.164.085-5.777 1.02-.85.595-1.955 1.36-3.145 2.719l-.68-.17-5.438 3.823.256-2.124h-5.609l-3.312 20.391h5.354l1.953-10.959s.766-1.531 1.105-2.039c1.02-1.275 1.869-1.275 2.973-1.275h.426a27.428 27.428 0 0 0-.256 3.908c0 6.627 3.738 10.791 9.516 10.791 1.445 0 2.721-.17 4.674-.68l.936-5.777c-1.699.934-3.229 1.359-4.504 1.359-3.143 0-5.014-2.379-5.014-6.117-.002-5.523 2.803-9.431 6.797-9.431zM166.941 85.885l-1.188 7.137c-1.275-1.954-2.805-2.889-4.844-2.889-2.805 0-5.438 1.614-7.053 4.673v-.084l-3.398-2.04.34-2.124h-5.693l-3.229 20.391h5.268l1.785-10.959s1.359-1.531 1.699-2.039c.85-1.02 1.699-1.191 2.379-1.275-.594 1.699-.934 3.738-.934 6.033 0 5.098 2.633 8.496 6.541 8.496 1.955 0 3.484-.68 4.928-2.295l-.254 2.039h5.014l4.078-25.064h-5.439zm-6.541 20.222c-1.785 0-2.719-1.359-2.719-3.994 0-3.994 1.699-6.882 4.162-6.882 1.869 0 2.805 1.445 2.805 3.994 0 4.078-1.699 6.882-4.248 6.882zM135.846 101.859c-.51-.086-.68-.086-1.02-.086-3.061 0-4.59 1.189-4.59 3.059 0 1.275.766 2.125 1.955 2.125 2.549 0 3.569-2.125 3.655-5.098zm4.248 9.09h-4.674l.17-2.123c-1.189 1.613-2.805 2.463-5.607 2.463-2.635 0-4.928-2.209-4.928-5.607 0-4.842 3.652-7.816 9.43-7.816.596 0 1.529 0 2.295.086.17-.68.256-.936.256-1.36 0-1.36-1.105-1.785-3.654-1.785-1.445 0-3.229.255-4.418.68l-.68.17-.34.084.764-4.588c2.465-.765 4.25-1.104 6.203-1.104 4.588 0 6.967 2.124 6.967 6.032 0 1.02.17 1.785-.254 3.994l-1.105 7.307-.17 1.275-.17 1.02-.084.68v.592h-.001zM67.107 94.891c1.02 0 2.464.085 3.994.34l.765-4.758c-1.53-.17-3.569-.425-4.759-.425-5.947 0-7.901 3.229-7.901 6.967 0 2.465 1.104 4.248 3.993 5.607 2.124 1.02 2.464 1.189 2.464 2.125 0 1.273-1.104 2.039-3.144 2.039-1.614 0-3.144-.256-4.843-.85l-.595 4.672.084.086 1.02.17c.34.084.765.17 1.36.254 1.274.086 2.379.17 3.059.17 5.948 0 8.412-2.293 8.412-6.797 0-2.803-1.36-4.502-3.994-5.691-2.294-1.021-2.549-1.189-2.549-2.125 0-.934 1.02-1.784 2.634-1.784z" fill="#1b3771"/>
                                        <path d="M128.963 85.035l-.936 5.438c-1.869-.935-3.229-1.359-4.758-1.359-3.994 0-6.797 3.908-6.797 9.431 0 3.824 1.869 6.117 5.014 6.117 1.273 0 2.803-.424 4.502-1.273l-.934 5.691c-1.955.51-3.229.766-4.674.766-5.777 0-9.346-4.164-9.346-10.875 0-8.922 4.928-15.21 11.98-15.21.934 0 1.783.085 2.463.255l2.125.51c.681.255.851.34 1.361.509zM111.799 88.774h-.51c-1.783 0-2.803.85-4.418 3.313l.51-3.144h-4.844l-3.312 20.392h5.354c1.953-12.49 2.463-14.614 5.012-14.614h.34c.51-2.464 1.189-4.249 2.039-5.863l-.171-.084zM81.042 109.08c-1.444.51-2.634.68-3.823.68-2.719 0-4.249-1.529-4.249-4.502 0-.51.085-1.189.17-1.785l.34-2.039.255-1.613 2.294-13.936h5.268l-.595 3.059h2.719l-.68 5.013h-2.719l-1.444 8.497c-.085.34-.085.596-.085.85 0 1.02.51 1.445 1.784 1.445.595 0 1.104 0 1.444-.17l-.679 4.501zM60.565 95.401c0 2.55 1.189 4.333 3.993 5.693 2.209 1.02 2.549 1.359 2.549 2.209 0 1.275-.935 1.869-3.059 1.869-1.614 0-3.059-.254-4.758-.764l-.765 4.672.255.086.935.17c.339.084.765.17 1.444.17 1.189.17 2.209.17 2.889.17 5.607 0 8.242-2.125 8.242-6.797 0-2.805-1.104-4.42-3.738-5.693-2.294-1.02-2.549-1.274-2.549-2.209 0-1.104.935-1.614 2.634-1.614 1.02 0 2.464.085 3.824.255l.764-4.673c-1.359-.255-3.483-.425-4.673-.425-5.948-.001-8.072 3.143-7.987 6.881zM169.662 109.336h-5.014l.256-1.955c-1.445 1.529-2.975 2.209-4.93 2.209-3.908 0-6.457-3.312-6.457-8.41 0-6.798 3.994-12.576 8.666-12.576 2.125 0 3.654.935 5.1 2.804l1.189-7.137h5.268l-4.078 25.065zm-7.818-4.758c2.465 0 4.164-2.889 4.164-6.883 0-2.634-.936-3.994-2.805-3.994-2.379 0-4.162 2.804-4.162 6.798 0 2.72.934 4.079 2.803 4.079zM97.355 108.91c-1.87.596-3.569.85-5.523.85-5.948 0-9.007-3.143-9.007-9.176 0-6.967 3.909-12.15 9.262-12.15 4.418 0 7.221 2.889 7.221 7.392 0 1.53-.17 2.975-.68 5.098H88.094c-.085.256-.085.426-.085.596 0 2.379 1.615 3.568 4.673 3.568 1.954 0 3.653-.34 5.523-1.275l-.85 5.097zm-2.974-12.15v-1.019c0-1.699-.935-2.634-2.549-2.634-1.699 0-2.889 1.275-3.399 3.653h5.948zM40.258 109.336H34.99l3.059-19.288-6.882 19.288h-3.654l-.425-19.118-3.228 19.118h-4.928l4.163-25.065h7.647l.255 15.549 5.097-15.549h8.327l-4.163 25.065zM53.428 100.244c-.51 0-.765-.084-1.19-.084-2.974 0-4.503 1.104-4.503 3.143 0 1.275.68 2.039 1.869 2.039 2.209 0 3.739-2.039 3.824-5.098zm3.908 9.092h-4.419l.085-2.125c-1.36 1.699-3.144 2.465-5.608 2.465-2.889 0-4.843-2.209-4.843-5.523 0-5.012 3.398-7.901 9.346-7.901.595 0 1.36.085 2.209.169.17-.679.17-.934.17-1.274 0-1.359-.935-1.869-3.399-1.869-1.529 0-3.229.17-4.418.51l-.765.255-.51.085.765-4.588c2.634-.765 4.418-1.02 6.373-1.02 4.588 0 7.052 2.039 7.052 5.947 0 1.02-.085 1.785-.425 4.079l-1.19 7.223-.17 1.273-.085 1.02-.085.766-.083.508zM137.545 100.244c-.596 0-.85-.084-1.189-.084-3.059 0-4.59 1.104-4.59 3.143 0 1.275.766 2.039 1.955 2.039 2.125 0 3.738-2.039 3.824-5.098zm3.908 9.092h-4.418l.084-2.125c-1.359 1.699-3.143 2.465-5.607 2.465-2.889 0-4.844-2.209-4.844-5.523 0-5.012 3.398-7.901 9.346-7.901.596 0 1.361.085 2.125.169.17-.679.256-.934.256-1.274 0-1.359-.936-1.869-3.398-1.869-1.531 0-3.314.17-4.504.51l-.68.255-.51.085.764-4.588c2.635-.765 4.418-1.02 6.373-1.02 4.588 0 6.967 2.039 6.967 5.947 0 1.02 0 1.785-.424 4.079l-1.105 7.223-.17 1.273-.17 1.02-.084.766v.508h-.001zM155.727 88.774h-.51c-1.783 0-2.803.85-4.418 3.313l.51-3.144h-4.844l-3.229 20.392h5.268c1.955-12.49 2.465-14.614 5.014-14.614h.34c.51-2.464 1.189-4.249 2.039-5.863l-.17-.084z" fill="#fff"/></g>
                                    </svg>
                                    <svg height="261" viewBox="0 0 462 161" width="50" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" transform="matrix(0 -1 1 0 .5 160.5)">
                                        <path d="m79.9417 159.8534c-43.9416 0-79.5631-35.6215-79.5631-79.5631 0-43.9436 35.6215-79.5661 79.5631-79.5661s79.5631 35.6225 79.5631 79.5661c0 43.9416-35.6215 79.5631-79.5631 79.5631" fill="#ed342b"/>
                                        <path d="m45.8608 80.2892c40.3403-17.7967 78.0258-30.8457 78.0258-30.8457v-27.2823s-48.3695 16.6053-108.8585 47.45v21.3561c60.489 30.8447 108.8585 47.4489 108.8585 47.4489v-27.2823s-37.6855-13.0479-78.0258-30.8447" fill="#fefefe"/>
                                        <path d="m84.0912 422.9398c0-15.4229-16.6083-16.6073-16.6083-16.6073v33.2116s16.6083-1.1845 16.6083-16.6043m-33.2136 36.7719v-53.3792s-17.7958 1.1844-17.7958 24.9114c0 11.8605 3.5624 23.723 3.5624 23.723l-18.9792 2.3739s-4.7478-11.8625-4.7478-28.4708c0-23.724 11.8635-45.0761 45.0771-45.0761 26.0969 0 42.7042 16.6083 42.7042 40.3323 0 35.5855-35.5865 37.9564-49.8209 35.5855m28.0285-181.5094 19.5859 3.6733s8.606-28.3618-7.3426-51.4141h-78.3437v24.4816h63.6545c7.3416 9.7925 2.4459 23.2592 2.4459 23.2592m5.1851-102.0465c0-15.4198-16.6083-16.6053-16.6083-16.6053v33.2126s16.6083-1.1844 16.6083-16.6073m-33.2136 36.772v-53.3773s-17.7958 1.1855-17.7958 24.9095c0 11.8595 3.5624 23.723 3.5624 23.723l-18.9792 2.3739s-4.7478-11.8635-4.7478-28.4708c0-23.724 11.8635-45.0771 45.0771-45.0771 26.0969 0 42.7042 16.6083 42.7042 40.3323 0 35.5865-35.5865 37.9574-49.8209 35.5865m-8.1295 125.0202c29.8371-12.4312 57.9361-18.6444 57.9361-18.6444l-.003-24.8574s-47.9868 12.4302-87.7493 33.5624v19.8788c39.7625 21.1332 87.7423 33.5634 87.7423 33.5634v-24.8585s-28.089-6.2131-57.9261-18.6443" fill="#03435f"/></g>
                                    </svg>
                                  </div>  
                                </div>
                                {/* <Flutterwave cost={tariff} email={email} mobile={mobile} name={`${firstname} ${lastname}`} title={service}/> */}
                                <Flutterwave cost={500000} email={email} mobile={mobile} name={`${firstname} ${lastname}`} title={service}/>
                            </div>
                            {/* <div className="book-again" onClick={(e)=>setActiveStep(1)}>
                                Book Again
                            </div> */}
                        </div>
                    </div>
                    
                    <div className={`phase4 ${activeStep === 4 ? "active" : "inactive" } `}>
                        <div className="phase4-wrapper">
                            <div className="icon-holder">
                                <img src={tick} alt="success tick" />
                            </div>
                            <div className="titleText">
                                Appointment Booked!
                            </div>
                            <p>You will receive a confirmation mail shortly and an instruction on how to track your bookings.</p>
                            <div className="book-again" onClick={(e)=>setActiveStep(1)}>
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

export default PayNow