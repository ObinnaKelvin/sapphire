import React, { useState, useEffect, useRef} from 'react'
import './patient.scss';
import { Navbar, StaffNavbar, StaffNavbarMobile } from '../../components/navigation/Navbar'
import { AddButton } from '../../components/buttons/Buttons'
import cancel from '../../assets/images/cross.png'
import { useNavigate } from "react-router-dom";
import { AtSign, CalendarRange, Camera, Phone, Search, User, User2, UserPlus2, Users, Wallet} from 'lucide-react';
import { Calendar } from 'react-date-range';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from 'date-fns'//transform the dates to readable formats
import axios from 'axios';

const Patient = () => {
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState(new Date());
    const [phone, setPhone] = useState('');
    // const[date, setDate] = useState()
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('')
    const [openDate, setOpenDate] = useState(false)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [encodedBy, setEncodedBy] = useState('');
    const [encodedDate, setEncodedDate] = useState(new Date());
    const [activeStep, setActiveStep] = useState(1);
    const [kinName, setKinName] = useState('');
    const [kinPhone, setKinPhone] = useState('');
    const [kinAddress, setKinAddress] = useState('');
    const [kinRelationship, setKinRelationship] = useState('');

    
    const navigate = useNavigate();

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

    // const calculateAge = (dateOfBirth) => {
    //     const thisYear = new Date().getFullYear();
    //     const dobYear = dateOfBirth.getFullYear();
    //     setAge(thisYear - dobYear);
    //     // return thisYear - dobYear;
    //     //console.log(thisYear)
    // }

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

    const handleSubmit = async(e) => {
        e.preventDefault();

        // axios.post(`${process.env.PUBLIC_URL}api/patients`, {
        await axios.post('http://localhost:9000/api/patients/', {
            
            firstName: firstname,
            middleName: middlename,
            lastName: lastname,
            mobile: phone,
            email: email,
            dateOfBirth: dob,
            maritalStatus: maritalStatus,
            address: address,
            state: state,
            country: country,
            kinName: kinName,
            kinPhone: kinPhone,
            kinRelationship: kinRelationship,
            kinAddress: kinAddress,
            encodedBy: encodedBy,
            encodedDate: encodedDate,
            lastUpdatedBy: encodedBy,
            lastUpdatedDate: encodedDate
        })
        .then(response => console.log(response))
        navigate("/staff-portal/patient")
        setPatientToggle(2)
    }

    // useEffect(() => {
    //     calculateAge(dob);
    // }, [dob])

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

                    {
                        patientToggle ===  1 &&
                        <div className="patient-create-wrapper">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="section-title">
                                        <span>Basic Information</span>
                                    </div>
                                    <section>

                                        <div className="section-left">
                                            <div className="photo-container">
                                                <div className="patient-photo">
                                                    <div className="patient-icon-frame">
                                                    <User />
                                                        {/* <FontAwesomeIcon className='patient-icon' icon={faUser}/> */}
                                                    </div>
                                                </div>
                                                <div className="camera-frame">
                                                    {/* <FontAwesomeIcon icon={faCamera}/> */}
                                                    <Camera />
                                                </div>
                                            </div>

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
        
                                            {/* <input 
                                            type="text" 
                                            placeholder='Date of Birth'
                                            name='dob'
                                            value={dob}
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
                                            </div> */}

                                            
                                            <input 
                                            type="date" 
                                            placeholder='Age'
                                            name='dob'
                                            value={dob}
                                            // onChange={handleInputChange}
                                            onChange = {(e)=>setDob(e.target.value)}
                                            className="formInput sm"
                                            />

                                            {/* <input 
                                            type="text" 
                                            placeholder='Age'
                                            name='dob'
                                            value={age}
                                            onChange = {(e)=>setAge(e.target.value)}
                                            className="formInput sm"
                                            /> */}

                                            {/* <h2>{age > 0 ? `${age}` : ''}</h2> */}



                                        </div>
                                        <div className="section-right">
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
                                                <option>-  Select Marital Status  -</option>
                                                <option value={'Single'}>Single</option>
                                                <option value={'Married'}>Married</option>
                                                <option value={'Widowed'}>Widowed</option>
                                                <option value={'Divorced'}>Divorced</option>
                                                <option value={'Separated'}>Separated</option>
                                            </select>

                                        </div>
                                    </section>

                                    <div className="section-title">
                                        <span>Kin Details</span>
                                    </div>
                                    <section>
                                            <input 
                                            type="text" 
                                            placeholder='Kin Name'
                                            name='kinName'
                                            value={kinName}
                                            // onChange={handleInputChange}
                                            onChange = {(e)=>setKinName(e.target.value)}
                                            className="formInput sm"
                                            />
                                            <input 
                                            type="text" 
                                            placeholder='Phone'
                                            name='phone'
                                            value={kinPhone}
                                            // onChange={handleInputChange}
                                            onChange = {(e)=>setKinPhone(e.target.value)}
                                            className="formInput sm"
                                            />
                                            <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setKinRelationship(e.target.value)} value={kinRelationship}>
                                                <option>- Select Relationship -</option>
                                                <option value={'Father'}>Father</option>
                                                <option value={'Mother'}>Mother</option>
                                                <option value={'Husband'}>Husband</option>
                                                <option value={'Wife'}>Wife</option>
                                                <option value={'Uncle'}>Uncle</option>
                                                <option value={'Aunt'}>Aunt</option>
                                                <option value={'Brother'}>Brother</option>
                                                <option value={'Sister'}>Sister</option>
                                                <option value={'Unknown'}>Unknown</option>
                                            </select>
                                            <textarea className="formTextArea sm" type="text"name="user_additional_info" placeholder="Address here..."
                                            value={kinAddress} onChange={(e)=> setKinAddress(e.target.value)}
                                            />

                                    </section>

                                    <div className="section-title">
                                        <span>Payer Info</span>
                                    </div>
                                    <button>Create Patient</button>
                                    {/* <div className="button" type='submit' onClick={(e)=>setActiveStep(2)}>Create Patient</div> */}
                                </form>
    
                        </div>
                    }

                    {
                        patientToggle ===  2 &&
                        <div className="patient-list-wrapper">
                            <div className="patient-item">
                                <div className="patient-user"><span><User2 size={16} /></span>Nina Theresa Austin <em>(Female)</em></div>
                                <div className="patient-phone"><span><Phone size={16} /></span>07023113345</div>
                                <div className="patient-age"><span><CalendarRange size={16}/></span>41 Years</div>
                                <div className="patient-payer"><span><Wallet size={16}/></span>Private</div>
                                <div className="patient-email"><span><AtSign size={16}/></span>nina.austin@gmail.com</div>
                            </div>
                            <div className="patient-item">
                                <div className="patient-user"><span><User2 size={16} /></span>Nina Theresa Austin <em>(Female)</em></div>
                                <div className="patient-phone"><span><Phone size={16} /></span>07023113345</div>
                                <div className="patient-age"><span><CalendarRange size={16}/></span>41 Years</div>
                                <div className="patient-payer"><span><Wallet size={16}/></span>Private</div>
                                <div className="patient-email"><span><AtSign size={16}/></span>nina.austin@gmail.com</div>
                            </div>
                            <div className="patient-item">
                                <div className="patient-user"><span><User2 size={16} /></span>Nina Theresa Austin <em>(Female)</em></div>
                                <div className="patient-phone"><span><Phone size={16} /></span>07023113345</div>
                                <div className="patient-age"><span><CalendarRange size={16}/></span>41 Years</div>
                                <div className="patient-payer"><span><Wallet size={16}/></span>Private</div>
                                <div className="patient-email"><span><AtSign size={16}/></span>nina.austin@gmail.com</div>
                            </div>
                            <div className="patient-item">
                                <div className="patient-user"><span><User2 size={16} /></span>Nina Theresa Austin <em>(Female)</em></div>
                                <div className="patient-phone"><span><Phone size={16} /></span>07023113345</div>
                                <div className="patient-age"><span><CalendarRange size={16}/></span>41 Years</div>
                                <div className="patient-payer"><span><Wallet size={16}/></span>Private</div>
                                <div className="patient-email"><span><AtSign size={16}/></span>nina.austin@gmail.com</div>
                            </div>
                            <div className="patient-item">
                                <div className="patient-user"><span><User2 size={16} /></span>Nina Theresa Austin <em>(Female)</em></div>
                                <div className="patient-phone"><span><Phone size={16} /></span>07023113345</div>
                                <div className="patient-age"><span><CalendarRange size={16}/></span>41 Years</div>
                                <div className="patient-payer"><span><Wallet size={16}/></span>Private</div>
                                <div className="patient-email"><span><AtSign size={16}/></span>nina.austin@gmail.com</div>
                            </div>
                            <div className="patient-item">
                                <div className="patient-user"><span><User2 size={16} /></span>Nina Theresa Austin <em>(Female)</em></div>
                                <div className="patient-phone"><span><Phone size={16} /></span>07023113345</div>
                                <div className="patient-age"><span><CalendarRange size={16}/></span>41 Years</div>
                                <div className="patient-payer"><span><Wallet size={16}/></span>Private</div>
                                <div className="patient-email"><span><AtSign size={16}/></span>nina.austin@gmail.com</div>
                            </div>
                            <div className="patient-item">
                                <div className="patient-user"><span><User2 size={16} /></span>Nina Theresa Austin <em>(Female)</em></div>
                                <div className="patient-phone"><span><Phone size={16} /></span>07023113345</div>
                                <div className="patient-age"><span><CalendarRange size={16}/></span>41 Years</div>
                                <div className="patient-payer"><span><Wallet size={16}/></span>Private</div>
                                <div className="patient-email"><span><AtSign size={16}/></span>nina.austin@gmail.com</div>
                            </div>
                            <div className="patient-item">
                                <div className="patient-user"><span><User2 size={16} /></span>Nina Theresa Austin <em>(Female)</em></div>
                                <div className="patient-phone"><span><Phone size={16} /></span>07023113345</div>
                                <div className="patient-age"><span><CalendarRange size={16}/></span>41 Years</div>
                                <div className="patient-payer"><span><Wallet size={16}/></span>Private</div>
                                <div className="patient-email"><span><AtSign size={16}/></span>nina.austin@gmail.com</div>
                            </div>
                            <div className="patient-item">
                                <div className="patient-user"><span><User2 size={16} /></span>Nina Theresa Austin <em>(Female)</em></div>
                                <div className="patient-phone"><span><Phone size={16} /></span>07023113345</div>
                                <div className="patient-age"><span><CalendarRange size={16}/></span>41 Years</div>
                                <div className="patient-payer"><span><Wallet size={16}/></span>Private</div>
                                <div className="patient-email"><span><AtSign size={16}/></span>nina.austin@gmail.com</div>
                            </div>
                            <div className="patient-item">
                                <div className="patient-user"><span><User2 size={16} /></span>Nina Theresa Austin <em>(Female)</em></div>
                                <div className="patient-phone"><span><Phone size={16} /></span>07023113345</div>
                                <div className="patient-age"><span><CalendarRange size={16}/></span>41 Years</div>
                                <div className="patient-payer"><span><Wallet size={16}/></span>Private</div>
                                <div className="patient-email"><span><AtSign size={16}/></span>nina.austin@gmail.com</div>
                            </div>
                            <div className="patient-item">
                                <div className="patient-user"><span><User2 size={16} /></span>Nina Theresa Austin <em>(Female)</em></div>
                                <div className="patient-phone"><span><Phone size={16} /></span>07023113345</div>
                                <div className="patient-age"><span><CalendarRange size={16}/></span>41 Years</div>
                                <div className="patient-payer"><span><Wallet size={16}/></span>Private</div>
                                <div className="patient-email"><span><AtSign size={16}/></span>nina.austin@gmail.com</div>
                            </div>
                            <div className="patient-item">
                                <div className="patient-user"><span><User2 size={16} /></span>Nina Theresa Austin <em>(Female)</em></div>
                                <div className="patient-phone"><span><Phone size={16} /></span>07023113345</div>
                                <div className="patient-age"><span><CalendarRange size={16}/></span>41 Years</div>
                                <div className="patient-payer"><span><Wallet size={16}/></span>Private</div>
                                <div className="patient-email"><span><AtSign size={16}/></span>nina.austin@gmail.com</div>
                            </div>
                            <div className="patient-item">
                                <div className="patient-user"><span><User2 size={16} /></span>Nina Theresa Austin <em>(Female)</em></div>
                                <div className="patient-phone"><span><Phone size={16} /></span>07023113345</div>
                                <div className="patient-age"><span><CalendarRange size={16}/></span>41 Years</div>
                                <div className="patient-payer"><span><Wallet size={16}/></span>Private</div>
                                <div className="patient-email"><span><AtSign size={16}/></span>nina.austin@gmail.com</div>
                            </div>
                            <div className="patient-item">
                                <div className="patient-user"><span><User2 size={16} /></span>Nina Theresa Austin <em>(Female)</em></div>
                                <div className="patient-phone"><span><Phone size={16} /></span>07023113345</div>
                                <div className="patient-age"><span><CalendarRange size={16}/></span>41 Years</div>
                                <div className="patient-payer"><span><Wallet size={16}/></span>Private</div>
                                <div className="patient-email"><span><AtSign size={16}/></span>nina.austin@gmail.com</div>
                            </div>
                            <div className="patient-item">
                                <div className="patient-user"><span><User2 size={16} /></span>Nina Theresa Austin <em>(Female)</em></div>
                                <div className="patient-phone"><span><Phone size={16} /></span>07023113345</div>
                                <div className="patient-age"><span><CalendarRange size={16}/></span>41 Years</div>
                                <div className="patient-payer"><span><Wallet size={16}/></span>Private</div>
                                <div className="patient-email"><span><AtSign size={16}/></span>nina.austin@gmail.com</div>
                            </div>
    
                        </div>
                    }


                </div>

            </div>

        </div>
        
    </div>
  )
}

export default Patient