import React, { useState, useEffect, useRef} from 'react'
import './patient.scss';
import { Navbar, StaffNavbar, StaffNavbarMobile } from '../../components/navigation/Navbar'
import { AddButton } from '../../components/buttons/Buttons'
import cancel from '../../assets/images/cross.png'
import { Search, UserPlus2, Users} from 'lucide-react';
import { Calendar } from 'react-date-range';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from 'date-fns'//transform the dates to readable formats

const Patient = () => {
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState();
    const [phone, setPhone] = useState('');
    // const[date, setDate] = useState()
    const[gender, setGender] = useState('')
    const[openDate, setOpenDate] = useState(false)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const[activeStep, setActiveStep] = useState(1)

    //We add a listener effect that activates 'false' which 
    // invokes the 'inactive' property to the dropdowns
    let formRef = useRef();
    const [modalOpen, setModalOpen] = useState(false);
    const [greet, setGreet] = useState('');
    const [patientToggle, setPatientToggle] = useState(1);
    const onChangeDateofBirth = (dateSelected) => {
        // console.log(dateSelected)
        // console.log(format(dateSelected, 'dd/MM/yyyy'))
        setDob(format(dateSelected, 'eeee do LLLL yyyy'))
    }


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
    <div className='patient-container'>
        <Navbar />
        <AddButton />

        <div className="patient-wrapper">
            <div className="patient-sidenav">
                {/* <PatientNavbar /> */}
                <StaffNavbar />
            </div>
            <div className="patient-mobile">
                {/* <PatientNavbarMobile /> */}
                <StaffNavbarMobile />
            </div>
            <div className="patient-body">
                <div className="patient-body-header">
                    <div className="page-title">
                        Patients
                    </div>
                    <div className="name-space">
                        Hi Kelvin, {greet}
                    </div>

                    <div className="patient-toggle">
                        <div className={`patient-item ${patientToggle === 1 ? "active" : "inactive"}`} onClick={() => setPatientToggle(1)}>
                            <UserPlus2 />
                            <span>New Patient</span>
                        </div>
                        <div className={`patient-item ${patientToggle === 2 ? "active" : "inactive"}`} onClick={() => setPatientToggle(2)}>
                            <Users />
                            <span>Patient List</span>
                        </div>

                    </div>
                    {
                        patientToggle === 2 &&
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
                    }
                </div>

                <div className="patient-body-body">

                    <div className="patient-create-wrapper">
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
                                    onChange = {(e)=>setMiddlename(e.target.value)}
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
                                    <div className={`calendar-backdrop ${openDate ? 'active' : 'inactive'}`} ref={formRef}>
                                        <Calendar
                                        onChange={onChangeDateofBirth}
                                        date={new Date()}
                                        className='calendar'
                                        />
                                        <div className="cancel-holder" onClick={()=>setOpenDate(false)}>
                                            <img src={cancel} />
                                        </div>
                                    </div>


                                    <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setGender(e.target.value)} value={gender}>
                                        <option>- Select Gender -</option>
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

                                    <textarea className="formTextArea sm" type="text"name="user_additional_info" placeholder="Address here..."
                                    value={address} onChange={(e)=> setAddress(e.target.value)}
                                    />

                                    <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setCity(e.target.value)} value={city}>
                                        <option>- Select City -</option>
                                        <option value={'Ogba'}>Ogba</option>
                                        <option value={'Alimosho'}>Alimosho</option>
                                    </select>
                                    <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setState(e.target.value)} value={state}>
                                        <option>- Select State -</option>
                                        <option value={'Lagos'}>Lagos</option>
                                        <option value={'Ogun'}>Ogun</option>
                                    </select>
                                    <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setCountry(e.target.value)} value={country}>
                                        <option>- Select Country -</option>
                                        <option value={'Nigeria'}>Nigeria</option>
                                        <option value={'Nigeria'}>Nigeria</option>
                                    </select>
                                    <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setMaritalStatus(e.target.value)} value={maritalStatus}>
                                        <option>- Select Marital Status -</option>
                                        <option value={'Single'}>Single</option>
                                        <option value={'Married'}>Married</option>
                                        <option value={'Widowed'}>Widowed</option>
                                        <option value={'Divorced'}>Divorced</option>
                                        <option value={'Separated'}>Separated</option>
                                    </select>
                                </section>
                                <div className="button" type='submit' onClick={(e)=>setActiveStep(2)}>Create Patient</div>
                            </form>

                    </div>
                    <div className="patient-list-wrapper">

                    </div>

                </div>

            </div>

        </div>
        
    </div>
  )
}

export default Patient