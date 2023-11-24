import React, { useState, useEffect, useRef} from 'react'
import './sappointment.scss';
import { Navbar, StaffNavbar, StaffNavbarMobile } from '../../components/navigation/Navbar'
// import { AddButton } from '../../components/buttons/Buttons'
import { Search, UserPlus2} from 'lucide-react';
import cancel from '../../assets/images/cross.png'
import { doctorData } from './doctor.jsx'
import { Calendar } from 'react-date-range';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from 'date-fns'//transform the dates to readable formats

const Sappointment = () => {
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const[date, setDate] = useState()
    const [description, setDescription] = useState('');
    const [descriptionAppt, setDescriptionAppt] = useState('');
    const [costing, setCosting] = useState('20,000');
    const[openDate, setOpenDate] = useState(false)
    const[activeStep, setActiveStep] = useState(1)
    const[doctor, setDoctor] = useState('')
    const[sex, setSex] = useState('')
    const[paymentStatus, setPaymentStatus] = useState('Pending')
    const[appointmentStatus, setAppointmentStatus] = useState('')
    const onChangeDate = (dateSelected) => {
        // console.log(dateSelected)
        // console.log(format(dateSelected, 'dd/MM/yyyy'))
        setDate(format(dateSelected, 'eeee do LLLL yyyy'))
    }

    //We add a listener effect that activates 'false' which 
    // invokes the 'inactive' property to the dropdowns
    let formRef = useRef();
    const [modalOpen, setModalOpen] = useState(false);
    const [greet, setGreet] = useState('');

    const handleGreet = () => {
        let today = new Date()
        let getCurrentHour = today.getHours() 

        if (getCurrentHour < 12) {
            setGreet("Good Morning");
        }
        else if (getCurrentHour < 18) {
            setGreet("Good Afternoon");
        }
        else {
            setGreet("Good Evening");
        }
    }

    useEffect(() => {
        handleGreet();
    }, [])



  return (
    <div className="sappointment-container">
        <Navbar />
        {/* <AddButton /> */}

        <div className="sappointment-wrapper">
            <div className="sappointment-sidenav">
                {/* <PatientNavbar /> */}
                <StaffNavbar />
            </div>
            <div className="sappointment-mobile">
                {/* <PatientNavbarMobile /> */}
                <StaffNavbarMobile />
            </div>
            <div className="sappointment-body">
                <div className="sappointment-body-header">
                    <div className="page-title">
                        Create Appointment
                    </div>
                    <div className="name-space">
                        Hi Kelvin, {greet}
                    </div>

                    <div className="new-patient">
                        <UserPlus2 />
                        <span>New Patient</span>
                    </div>
                    <div className="search-bar">
                        <div className="search-icon">
                            <Search size={19} />
                        </div>
                        <input 
                            type="text" 
                            placeholder='Name, Phone number, Email'
                            // name='email'
                            // value={email}
                            // onChange={handleInputChange}
                            // onChange = {(e)=>setEmail(e.target.value)}
                            className="formInput"
                        />
                    </div>
                    {/* <div className="booking-category">
                        <div className="category-item ">All</div>
                        <div className="category-item active">Today</div>
                        <div className="category-item">Pending</div>
                        <div className="category-item">Cancelled</div>
                    </div> */}
                    {/* <div className="sorting">
                        <div className="sorting-grid">
                            <LayoutPanelLeft size={17} />
                        </div>
                        <div className="sorting-list">
                            <AlignLeft size={17} />
                        </div>
                    </div> */}
                </div>
                <div className="sappointment-body-body">
                    <div className="sappointment-search-results"></div>
                    <div className="sappointment-create-wrapper">

                        <div className="form-holder">
                            <form action="">
                                <section>
                                    <input 
                                    type="text" 
                                    placeholder='First name'
                                    name='firstname'
                                    value={firstname}
                                    // onChange={handleInputChange}
                                    onChange = {(e)=>setFirstname(e.target.value)}
                                    className="formInput sm"
                                    />
                                    <input 
                                    type="text" 
                                    placeholder='Middle name'
                                    name='middlename'
                                    value={middlename}
                                    // onChange={handleInputChange}
                                    onChange = {(e)=>setLastname(e.target.value)}
                                    className="formInput sm"
                                    />
                                    <input 
                                    type="text" 
                                    placeholder='Last name'
                                    name='lastname'
                                    value={lastname}
                                    // onChange={handleInputChange}
                                    onChange = {(e)=>setLastname(e.target.value)}
                                    className="formInput sm"
                                    />
                                    <input 
                                    type="text" 
                                    placeholder='Email'
                                    name='email'
                                    value={email}
                                    // onChange={handleInputChange}
                                    onChange = {(e)=>setEmail(e.target.value)}
                                    className="formInput sm"
                                    />
                                    <input 
                                    type="text" 
                                    placeholder='Date of Birth'
                                    name='dob'
                                    value={dob}
                                    // onChange={handleInputChange}
                                    onChange = {(e)=>setDob(e.target.value)}
                                    className="formInput sm"
                                    />


                                    <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setSex(e.target.value)} value={sex}>
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
                                    className="formInput sm"
                                    />


                                    <input type="text" className="formInput sm" name="user_appointment_date" placeholder="Select Appointment Date" value={date} onChange={(e)=> setDate(e.target.value)} onClick={()=>setOpenDate(!openDate)} />
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

                                    <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setSex(e.target.value)} value={sex}>
                                        <option>- Choose Visit Type -</option>
                                        <option value={'First Visit Consultation - Urology'}>First Visit Consultation - Urology</option>
                                        <option value={'Follow up Consultation - Urology'}>Follow up Consultation - Urology</option>
                                    </select>


                                    <select className = 'formSelect sm' name="user_appointment_clinic" onChange={(e)=>setDoctor(e.target.value)} value={doctor}>
                                        <option>- Choose a Doctor -</option>
                                        {
                                        doctorData.map((data)=>(
                                            <option value={data.name} key={data.id}>{data.name}</option>
                                        ))
                                        }
                                    </select>
                                    
                                    <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setPaymentStatus(e.target.value)} value={sex}>
                                        {/* <option>- Choose Visit Type -</option> */}
                                        <option value={paymentStatus}>{`Payment: ${paymentStatus}`}</option>
                                        <option value={"Success"}>Payment: Success</option>
                                        <option value={"Refund"}>Payment: Refund</option>
                                        <option value={"Cancelled"}>Payment: Cancelled</option>
                                    </select>
                                </section>
                                <section>

                                    <textarea className="formTextArea sm" type="text"name="user_additional_info" placeholder="Patient Comment..."
                                    value={description} onChange={(e)=> setDescription(e.target.value)}
                                    />
                                    <textarea className="formTextArea sm" type="text"name="user_additional_info" placeholder="Notes Upon Visit..."
                                    value={description} onChange={(e)=> setDescriptionAppt(e.target.value)}
                                    />
                                </section>
                                <div className="button" type='submit' onClick={(e)=>setActiveStep(2)}>Create Appointment</div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Sappointment