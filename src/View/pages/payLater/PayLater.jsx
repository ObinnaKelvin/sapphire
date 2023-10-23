import React, { useState, useEffect, useRef  } from 'react'
import Navbar from '../../components/navigation/Navbar'
import './paylater.scss';
import paylaterbg from '../../assets/images/booking.jpg'
import person from '../../assets/images/gamer.png'
import cancel from '../../assets/images/cross.png'
import user from '../../assets/images/user.png'
import paper from '../../assets/images/paper.png'
import flag from '../../assets/images/flag.png';
import tick from '../../assets/images/tick.png';
import { Phone, Mail, User, Stethoscope, CalendarDays, BookOpen } from 'lucide-react';
import { clinicData } from './clinicData.jsx'
import { Calendar } from 'react-date-range';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from 'date-fns'//transform the dates to readable formats
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

function PayLater() {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const[date, setDate] = useState()
    const [description, setDescription] = useState('');
    const[openDate, setOpenDate] = useState(false)
    const[activeStep, setActiveStep] = useState(2)
    const[clinic, setClinic] = useState('')
    const[sex, setSex] = useState('')
    const onChangeDate = (dateSelected) => {
        // console.log(dateSelected)
        // console.log(format(dateSelected, 'dd/MM/yyyy'))
        setDate(format(dateSelected, 'eeee do LLLL yyyy'))
    }
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
                        <div className={`stage one ${activeStep === 1||2||3 ? "active" : "inactive" }`}>
                            <div className="stage-icon">
                                <img src={user} alt='user sign' />
                            </div>
                            <div className="stage-text">Personal</div>
                            <div className="stage-bar"></div>
                        </div>
                        <div className={`stage two ${activeStep === 2 ? "active" : "inactive" }`}>
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


                                <select className = 'formSelect mid' name="user_sex" onChange={(e)=>setSex(e.target.value)} value={sex}>
                                    <option>- Choose Sex -</option>
                                    <option value={'Male'}>Male</option>
                                    <option value={'Female'}>Female</option>
                                </select>


                                <input 
                                type="text" 
                                placeholder='Phone'
                                name='phone'
                                value={phone}
                                // onChange={handleInputChange}
                                onChange = {(e)=>setPhone(e.target.value)}
                                className="formInput mid"
                                />


                                <input type="text" className="formInput mid" name="user_appointment_date" placeholder="Select Appointment Date" value={date} onChange={(e)=> setDate(e.target.value)} onClick={()=>setOpenDate(!openDate)} />
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


                                <select className = 'formSelect mid' name="user_appointment_clinic" onChange={(e)=>setClinic(e.target.value)} value={clinic}>
                                    <option>- Choose a Surgical Procedure -</option>
                                    {
                                    clinicData.map((data)=>(
                                        <option value={data.name} key={data.id}>{data.name}</option>
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
                                value={description} onChange={(e)=> setDescription(e.target.value)}
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
                                        <Phone size={16} /> {phone}
                                    </div>
                                    <div className="email">
                                        <Mail size={16} /> {email}
                                    </div>
                                    <div className="sex">
                                        <User size={16} /> {sex}
                                    </div>
                                </div>
                                <div className="clinic">
                                    <Stethoscope size={16} /> {clinic}
                                </div>
                                <div className="date">
                                    <CalendarDays size={16} /> {date}
                                </div>
                                <div className="note">
                                    <BookOpen size={16} /> {description}
                                </div>
                            </section>
                            
                            {/* <button type='submit' onClick={(e)=>setActiveStep(3)}>Reset Password</button> */}
                            <div className="button-holder">
                                <div className="previous" onClick={(e)=>setActiveStep(1)}>Previous</div>
                                <div className="finish" onClick={(e)=>setActiveStep(3)}>Finish</div>
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

export default PayLater