import React, { useState, useEffect } from 'react'
import { Navbar, PatientNavbar, PatientNavbarMobile } from '../../components/navigation/Navbar'
import './puprofile.scss';
import { ClipboardList, Siren, Users, Wallet } from 'lucide-react';
import man from '../../assets/images/man1.png'
import phoneRec from '../../assets/images/phonerecord.gif';
import personalRec from '../../assets/images/personal.PNG'
import success from '../../assets/images/sss.PNG'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'//transform the dates to readable formats

const PUProfile = () => {
    // const { patientId } = useParams();
    const [patientId, setPatientId] = useState('');
    const [title, setTitle] = useState('');
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState(new Date());
    // const [dob, setDob] = useState(new Date().toISOString().slice(0, 10));
    const [phone, setPhone] = useState('');
    // const[date, setDate] = useState()
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('')
    const [religion, setReligion] = useState('')
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
    const [emName, setEmName] = useState('');
    const [emPhone, setEmPhone] = useState('');
    const [emAddress, setEmAddress] = useState('');
    const [emRelationship, setEmRelationship] = useState('');
    const [modalStep, setModalStep] = useState(1);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [isFullyRegistered, setIsFullyRegistered] = useState();

    // console.log(patientId)
    console.log("isFullyRegistered",isFullyRegistered)

    const handleNext = async (step) => {
       // e.preventDefault();
        return setModalStep(step);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        //await axios.put(`http://localhost:9000/api/patients/find/${currentUser.email}`, {
            await axios.put(`http://localhost:9000/api/patients/${patientId}`, {
                title:title,
                firstName:firstname,
                lastName:lastname,
                middleName:middlename,
                email:email,
                gender:gender,
                mobile:phone,
                dateOfBirth:dob,
                city:city,
                country:country,
                state:state,
                maritalStatus:maritalStatus,
                religion:religion,
                address:address,
                kinName:kinName,
                kinPhone:kinPhone,
                kinRelationship:kinRelationship,
                kinAddress:kinAddress,
                emergencyName:emName,
                emergencyPhone:emPhone,
                emergencyRelationship:emRelationship,
                emergencyAddress:emAddress,
                encodedBy: patientId,
                encodedDate,


        })
        .then(response => console.log(response))
    }

    const handleComplete = async (e) => {
        e.preventDefault();
        let completed = 1;
            await axios.put(`http://localhost:9000/api/patients/${patientId}`, {
                title:title,
                firstName:firstname,
                lastName:lastname,
                middleName:middlename,
                email:email,
                gender:gender,
                mobile:phone,
                dateOfBirth:dob,
                city:city,
                country:country,
                state:state,
                maritalStatus:maritalStatus,
                religion:religion,
                address:address,
                kinName:kinName,
                kinPhone:kinPhone,
                kinRelationship:kinRelationship,
                kinAddress:kinAddress,
                emergencyName:emName,
                emergencyPhone:emPhone,
                emergencyRelationship:emRelationship,
                emergencyAddress:emAddress,
                encodedBy: patientId,
                encodedDate,
                isFullyRegistered:completed
        })
        .then(response => console.log(response))
        setIsFullyRegistered(1);

    }

    useEffect(() => {
        loadPatientRecord()
    }, [])

    const loadPatientRecord = async () => {
        try {

            await axios.get(`http://localhost:9000/api/patients/find/${currentUser.email}`)
            // .then(response => console.log(response.data[0]))
            .then(response => {
                setPatientId(response.data[0]._id)
                setTitle(response.data[0].title)
                setFirstname(response.data[0].firstName)
                setLastname(response.data[0].lastName)
                setMiddlename(response.data[0].middleName)
                setEmail(response.data[0].email)
                setGender(response.data[0].gender)
                setPhone(response.data[0].mobile)
                // setDob(format(new Date(response.data[0].dateOfBirth), "yyyy-MM-dd"))
                setCity(response.data[0].city)
                setCountry(response.data[0].country)
                setState(response.data[0].state)
                setMaritalStatus(response.data[0].maritalStatus)
                setReligion(response.data[0].religion)
                setAddress(response.data[0].address)
                setKinName(response.data[0].kinName)
                setKinPhone(response.data[0].kinPhone)
                setKinRelationship(response.data[0].kinRelationship)
                setKinAddress(response.data[0].kinAddress)
                setEmName(response.data[0].emergencyName)
                setEmPhone(response.data[0].emergencyPhone)
                setEmRelationship(response.data[0].emergencyRelationship)
                setEmAddress(response.data[0].emergencyAddress)
                setIsFullyRegistered(response.data[0].isFullyRegistered)
            })

        
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='puprofile-container'>
        <Navbar />
        <div className="puprofile-wrapper">
            <div className="puprofile-sidenav">
                <PatientNavbar />
            </div>
            <div className="puprofile-mobile">
                <PatientNavbarMobile />
            </div>

            {/* { isFullyRegistered == 0

            } */}
            <div className={`puprofile-modal-container ${isFullyRegistered == 0 ? "active" : "inactive"}`}>
                {/* Hey hey */}
                <div className="puprofile-modal-items">

                    <div className={`puprofile-modal-item ${modalStep === 1 ? "active" : "inactive"}`}>
                        <div className="modal-header"><h2>We want to know you better...</h2></div>
                        <div className="modal-icon">
                            <img src={phoneRec}/>
                        </div>
                        <div className="modal-description">
                            <p>We want to ensure that you have a smooth patient experience.</p>
                            <p>Please follow the next 3 steps to complete your profile details in 5 minutes.</p>
                            <p>You only need to complete this process once.</p>
                        </div>
                        <div className="modal-buttons">
                            <button className='passive'>Not now</button>
                            <button onClick={(e) => { handleNext(2)}}>Next</button>
                        </div>
                    </div>
                    <div className={`puprofile-modal-item ${modalStep === 2 ? "active" : "inactive"}`}>
                        <div className="modal-header"><h2>Personal Information</h2></div>
                        <div className="modal-icon">
                            <img src={personalRec}/>
                        </div>
                        <div className="modal-description">
                            {/* <p>We want to ensure that you have a smooth patient experience.</p>
                            <p>Please follow the next few steps to complete your profile details in 5 minutes.</p> */}
                                <form action="">
                                    <section>
                                        <label>Title</label>
                                        <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setTitle(e.target.value)} value={title}>
                                            <option>- Select Title -</option>
                                            <option value={'Master'}>Master</option>
                                            <option value={'Mr'}>Mr</option>
                                            <option value={'Miss'}>Miss</option>
                                            <option value={'Mrs'}>Mrs</option>
                                            <option value={'Ms'}>Ms</option>
                                            <option value={'Dr.'}>Dr.</option>
                                            <option value={'Prof.'}>Prof.</option>
                                            <option value={'Revd.'}>Revd.</option>
                                        </select>
                                    </section>
                                    
                                    <section>
                                        <label>First Name</label>
                                        <input 
                                            type="text" 
                                            placeholder='First name'
                                            name='firstname'
                                            value={firstname}
                                            onChange = {(e)=>setFirstname(e.target.value)}
                                            className="formInput sm"
                                        />
                                    </section>

                                    <section>
                                        <label>Middle Name</label>
                                        <input 
                                            type="text" 
                                            placeholder='Middle name'
                                            name='middlename'
                                            value={middlename}
                                            onChange = {(e)=>setMiddlename(e.target.value)}
                                            className="formInput md"
                                        />
                                    </section>

                                    <section>
                                        <label>Last Name</label>
                                        <input 
                                            type="text" 
                                            placeholder='Last name'
                                            name='lastname'
                                            value={lastname}
                                            onChange = {(e)=>setLastname(e.target.value)}
                                            className="formInput md"
                                        />
                                    </section>

                                    <section>
                                        <label>Email</label>
                                        <input 
                                            type="text" 
                                            placeholder='Email'
                                            name='email'
                                            value={email}
                                            onChange = {(e)=>setEmail(e.target.value)}
                                            className="formInput md"
                                        />
                                    </section>

                                    <section>
                                        <label>Gender</label>
                                        <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setGender(e.target.value)} value={gender}>
                                            <option>- Select Gender -</option>
                                            <option value={'Male'}>Male</option>
                                            <option value={'Female'}>Female</option>
                                            <option value={'Other'}>Other</option>
                                        </select>
                                    </section>

                                    <section>
                                        <label>Phone</label>       
                                        <input 
                                            type="text" 
                                            placeholder='Phone'
                                            name='phone'
                                            value={phone}
                                            // onChange={handleInputChange}
                                            onChange = {(e)=>setPhone(e.target.value)}
                                            className="formInput md"
                                        />
                                    </section>

                                    <section>
                                        <label>Date Of Birth</label>
                                        <input 
                                        type="date" 
                                        placeholder='Date Of Birth'
                                        name='dob'
                                        value={dob}
                                        // onChange={handleInputChange}
                                        onChange = {(e)=>setDob(e.target.value)}
                                        className="formInput md"
                                        />
                                    </section>


                                    <section>
                                        <label>City</label>
                                        <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setCity(e.target.value)} value={city}>
                                            <option>- Select City -</option>
                                            <option value={'Ogba'}>Ogba</option>
                                            <option value={'Alimosho'}>Alimosho</option>
                                        </select>
                                    </section>
                                    
                                    <section>
                                        <label>State</label>
                                        <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setState(e.target.value)} value={state}>
                                            <option>- Select State -</option>
                                            <option value={'Lagos'}>Lagos</option>
                                            <option value={'Ogun'}>Ogun</option>
                                        </select>
                                    </section>
                                    
                                    <section>
                                        <label>Country</label>
                                        <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setCountry(e.target.value)} value={country}>
                                            <option>- Select Country -</option>
                                            <option value={'Nigeria'}>Nigeria</option>
                                            <option value={'Nigeria'}>Nigeria</option>
                                        </select>
                                    </section>
                                    
                                    <section>
                                        <label>Marital Status</label>
                                        <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setMaritalStatus(e.target.value)} value={maritalStatus}>
                                            <option>-  Select Marital Status  -</option>
                                            <option value={'Single'}>Single</option>
                                            <option value={'Married'}>Married</option>
                                            <option value={'Widowed'}>Widowed</option>
                                            <option value={'Divorced'}>Divorced</option>
                                            <option value={'Separated'}>Separated</option>
                                        </select>
                                    </section>

                                    <section>
                                        <label>Religion</label>
                                        <select className = 'formSelect sm' name="user_religion" onChange={(e)=>setReligion(e.target.value)} value={religion}>
                                            <option>-  Select Religion  -</option>
                                            <option value={'Christianity'}>Christianity</option>
                                            <option value={'Islam'}>Islam</option>
                                            <option value={'Traditional'}>Traditional</option>
                                            <option value={'Unknown'}>Unknown</option>
                                        </select>
                                    </section>
                                    
                                    <section>
                                        <label>Address</label>
                                        <textarea className="formTextArea md" type="text"name="user_additional_info" placeholder="Address here..."
                                        value={address} onChange={(e)=> setAddress(e.target.value)}
                                        />
                                    </section>

                                </form>
                        </div>
                        <div className="modal-buttons">
                            <button onClick={(e) => handleNext(1)} className='passive'>Back</button>
                            <button onClick={(e) => {
                                if(title&&firstname&&middlename&&lastname&&email&&gender&&phone&&dob&&city&&state&&country&&maritalStatus&&religion&&address){
                                    handleUpdate(e); handleNext(3); 
                                } else {
                                    alert("Please fill all fields in this section")
                                }
                            }}
                            >Save and Continue</button>
                        </div>
                    </div>
                    <div className={`puprofile-modal-item ${modalStep === 3 ? "active" : "inactive"}`}>
                        <div className="modal-header"><h2>Emergency Contact</h2></div>
                        <div className="modal-icon">
                            <img src={phoneRec}/>
                        </div>
                        <div className="modal-description">
                                <form action="">
                                    <section>
                                        <label>Full Name</label>
                                            <input 
                                                type="text" 
                                                placeholder='Kin Name'
                                                name='kinName'
                                                value={emName}
                                                onChange = {(e)=>setEmName(e.target.value)}
                                                className="formInput lg"
                                            />
                                    </section>
                                    <section>
                                        <label> Phone</label>
                                            <input 
                                            type="text" 
                                            placeholder='Phone'
                                            name='phone'
                                            value={emPhone}
                                            onChange = {(e)=>setEmPhone(e.target.value)}
                                            className="formInput lg"
                                            />
                                    </section>
                                    <section>
                                        <label>Relationship</label>
                                            <select className = 'formSelect lg' name="user_sex" onChange={(e)=>setEmRelationship(e.target.value)} value={emRelationship}>
                                                <option>- Select Relationship -</option>
                                                <option value={'Father'}>Father</option>
                                                <option value={'Mother'}>Mother</option>
                                                <option value={'Husband'}>Husband</option>
                                                <option value={'Wife'}>Wife</option>
                                                <option value={'Uncle'}>Uncle</option>
                                                <option value={'Aunt'}>Aunt</option>
                                                <option value={'Brother'}>Brother</option>
                                                <option value={'Sister'}>Sister</option>
                                                <option value={'Friend'}>Friend</option>
                                                <option value={'Unknown'}>Unknown</option>
                                            </select>
                                    </section>
                                    <section>
                                        <label>Address</label>
                                            <textarea className="formTextArea md" type="text"name="user_additional_info" placeholder="Address here..."
                                            value={emAddress} onChange={(e)=> setEmAddress(e.target.value)}
                                            />
                                    </section>
                                    {/* <section>
                                        <label>Gender</label>
                                    </section>
                                    <section>
                                        <label>Gender</label>
                                    </section> */}

                                </form>
                        </div>
                        <div className="modal-buttons">
                            <button onClick={(e) => handleNext(2)} className='passive'>Back</button>
                            <button onClick={(e) => {
                                if(emName&&emPhone&&emRelationship&&emAddress) {
                                   handleUpdate(e); handleNext(4)
                                } else {
                                    alert("Please fill all fields in this section")
                                }
                            }}
                            >Save and Continue</button>
                        </div>

                    </div>
                    <div className={`puprofile-modal-item ${modalStep === 4 ? "active" : "inactive"}`}>
                        <div className="modal-header"><h2>Next of Kin</h2></div>
                        <div className="modal-icon">
                            <img src={phoneRec}/>
                        </div>
                        <div className="modal-description">
                                <form action="">
                                    <section>
                                        <label>Kin Name</label>
                                            <input 
                                                type="text" 
                                                placeholder='Name'
                                                name='kinName'
                                                value={kinName}
                                                // onChange={handleInputChange}
                                                onChange = {(e)=>setKinName(e.target.value)}
                                                className="formInput lg"
                                            />
                                    </section>
                                    <section>
                                        <label>Kin Phone</label>
                                            <input 
                                            type="text" 
                                            placeholder='Phone'
                                            name='phone'
                                            value={kinPhone}
                                            // onChange={handleInputChange}
                                            onChange = {(e)=>setKinPhone(e.target.value)}
                                            className="formInput lg"
                                            />
                                    </section>
                                    <section>
                                        <label>Relationship</label>
                                            <select className = 'formSelect lg' name="user_sex" onChange={(e)=>setKinRelationship(e.target.value)} value={kinRelationship}>
                                                <option>- Select Relationship -</option>
                                                <option value={'Father'}>Father</option>
                                                <option value={'Mother'}>Mother</option>
                                                <option value={'Husband'}>Husband</option>
                                                <option value={'Wife'}>Wife</option>
                                                <option value={'Uncle'}>Uncle</option>
                                                <option value={'Aunt'}>Aunt</option>
                                                <option value={'Brother'}>Brother</option>
                                                <option value={'Sister'}>Sister</option>
                                                <option value={'Friend'}>Friend</option>
                                                <option value={'Unknown'}>Unknown</option>
                                            </select>
                                    </section>
                                    <section>
                                        <label>Kin Address</label>
                                            <textarea className="formTextArea md" type="text"name="user_additional_info" placeholder="Address here..."
                                            value={kinAddress} onChange={(e)=> setKinAddress(e.target.value)}
                                            />
                                    </section>

                                </form>
                        </div>
                        <div className="modal-buttons">
                            <button onClick={(e) => handleNext(3)} className='passive'>Back</button>
                            <button onClick={(e) => {
                                if (kinName&&kinPhone&&kinAddress&&kinRelationship) {
                                    handleNext(5); handleUpdate(e)
                                } else {
                                    alert("Please fill all fields in this section")
                                }
                            }}
                            >Finish</button>
                        </div>

                    </div>
                    <div className={`puprofile-modal-item ${modalStep === 5 ? "active" : "inactive"}`}>
                        <div className="modal-header"><h2>You're all set!</h2></div>
                        <div className="modal-icon">
                            <img src={success}/>
                        </div>
                        <div className="modal-description">
                                {/* <form action="">
                                    <section>
                                        <label>Kin Name</label>
                                            <input 
                                                type="text" 
                                                placeholder='Name'
                                                name='kinName'
                                                value={kinName}
                                                onChange = {(e)=>setKinName(e.target.value)}
                                                className="formInput lg"
                                            />
                                    </section>
                                    <section>
                                        <label>Kin Phone</label>
                                            <input 
                                            type="text" 
                                            placeholder='Phone'
                                            name='phone'
                                            value={kinPhone}
                                            onChange = {(e)=>setKinPhone(e.target.value)}
                                            className="formInput lg"
                                            />
                                    </section>
                                    <section>
                                        <label>Relationship</label>
                                            <select className = 'formSelect lg' name="user_sex" onChange={(e)=>setKinRelationship(e.target.value)} value={kinRelationship}>
                                                <option>- Select Relationship -</option>
                                                <option value={'Father'}>Father</option>
                                                <option value={'Mother'}>Mother</option>
                                                <option value={'Husband'}>Husband</option>
                                                <option value={'Wife'}>Wife</option>
                                                <option value={'Uncle'}>Uncle</option>
                                                <option value={'Aunt'}>Aunt</option>
                                                <option value={'Brother'}>Brother</option>
                                                <option value={'Sister'}>Sister</option>
                                                <option value={'Friend'}>Friend</option>
                                                <option value={'Unknown'}>Unknown</option>
                                            </select>
                                    </section>
                                    <section>
                                        <label>Kin Address</label>
                                            <textarea className="formTextArea md" type="text"name="user_additional_info" placeholder="Address here..."
                                            value={kinAddress} onChange={(e)=> setKinAddress(e.target.value)}
                                            />
                                    </section>

                                </form> */}
                        </div>
                        <div className="modal-buttons">
                            {/* <button onClick={(e) => handleNext(3)} className='passive'>Back</button> */}
                            <button onClick={(e) => handleComplete(e)}>Done</button>
                        </div>

                    </div>

                </div>
            </div>

            <div className="puprofile-body">

                <div className="puprofile-body-header">
                    <div className="left-info">
                        <div className="pic-holder">
                            <img src={man} alt="" />
                        </div>
                    </div>
                    <div className="right-info">{`${currentUser.firstname} ${currentUser.lastname}`}</div>
                </div>

                <div className="puprofile-body-body">
                    <div className="left-items">
                        <div className="body-item">
                            <div className='header-section'>
                                <div className="icon-holder">
                                    <ClipboardList />
                                </div>
                                <div className="section-title">
                                    Basic Information
                                </div>
                            </div>
                            <div className='body-body'>
                                <form action="">
                                    <section>
                                        <label>Title</label>
                                        <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setTitle(e.target.value)} value={title}>
                                            <option>- Select Title -</option>
                                            <option value={'Master'}>Master</option>
                                            <option value={'Mr'}>Mr</option>
                                            <option value={'Miss'}>Miss</option>
                                            <option value={'Mrs'}>Mrs</option>
                                            <option value={'Ms'}>Ms</option>
                                            <option value={'Dr.'}>Dr.</option>
                                            <option value={'Prof.'}>Prof.</option>
                                            <option value={'Revd.'}>Revd.</option>
                                        </select>
                                    </section>
                                    
                                    <section>
                                        <label>First Name</label>
                                        <input 
                                            type="text" 
                                            placeholder='First name'
                                            name='firstname'
                                            value={firstname}
                                            onChange = {(e)=>setFirstname(e.target.value)}
                                            className="formInput sm"
                                        />
                                    </section>

                                    <section>
                                        <label>Middle Name</label>
                                        <input 
                                            type="text" 
                                            placeholder='Middle name'
                                            name='middlename'
                                            value={middlename}
                                            onChange = {(e)=>setMiddlename(e.target.value)}
                                            className="formInput sm"
                                        />
                                    </section>

                                    <section>
                                        <label>Last Name</label>
                                        <input 
                                            type="text" 
                                            placeholder='Last name'
                                            name='lastname'
                                            value={lastname}
                                            onChange = {(e)=>setLastname(e.target.value)}
                                            className="formInput sm"
                                        />
                                    </section>

                                    <section>
                                        <label>Email</label>
                                        <input 
                                            type="text" 
                                            placeholder='Email'
                                            name='email'
                                            value={email}
                                            onChange = {(e)=>setEmail(e.target.value)}
                                            className="formInput sm"
                                        />
                                    </section>

                                    <section>
                                        <label>Gender</label>
                                        <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setGender(e.target.value)} value={gender}>
                                            <option>- Select Gender -</option>
                                            <option value={'Male'}>Male</option>
                                            <option value={'Female'}>Female</option>
                                        </select>
                                    </section>

                                    <section>
                                        <label>Phone</label>       
                                        <input 
                                            type="text" 
                                            placeholder='Phone'
                                            name='phone'
                                            value={phone}
                                            // onChange={handleInputChange}
                                            onChange = {(e)=>setPhone(e.target.value)}
                                            className="formInput sm"
                                        />
                                    </section>

                                    <section>
                                        <label>Date Of Birth</label>
                                        <input 
                                        type="date" 
                                        placeholder='Date Of Birth'
                                        name='dob'
                                        value={dob}
                                        // onChange={handleInputChange}
                                        onChange = {(e)=>setDob(e.target.value)}
                                        className="formInput sm"
                                        />
                                    </section>

                                    <section>
                                        <label>City</label>
                                        <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setCity(e.target.value)} value={city}>
                                            <option>- Select City -</option>
                                            <option value={'Ogba'}>Ogba</option>
                                            <option value={'Alimosho'}>Alimosho</option>
                                        </select>
                                    </section>
                                    
                                    <section>
                                        <label>State</label>
                                        <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setState(e.target.value)} value={state}>
                                            <option>- Select State -</option>
                                            <option value={'Lagos'}>Lagos</option>
                                            <option value={'Ogun'}>Ogun</option>
                                        </select>
                                    </section>
                                    
                                    <section>
                                        <label>Country</label>
                                        <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setCountry(e.target.value)} value={country}>
                                            <option>- Select Country -</option>
                                            <option value={'Nigeria'}>Nigeria</option>
                                            <option value={'Nigeria'}>Nigeria</option>
                                        </select>
                                    </section>
                                    
                                    <section>
                                        <label>Marital Status</label>
                                        <select className = 'formSelect sm' name="user_sex" onChange={(e)=>setMaritalStatus(e.target.value)} value={maritalStatus}>
                                            <option>-  Select Marital Status  -</option>
                                            <option value={'Single'}>Single</option>
                                            <option value={'Married'}>Married</option>
                                            <option value={'Widowed'}>Widowed</option>
                                            <option value={'Divorced'}>Divorced</option>
                                            <option value={'Separated'}>Separated</option>
                                        </select>
                                    </section>

                                    <section>
                                        <label>Religion</label>
                                        <select className = 'formSelect sm' name="user_religion" onChange={(e)=>setReligion(e.target.value)} value={religion}>
                                            <option>-  Select Religion  -</option>
                                            <option value={'Christianity'}>Christianity</option>
                                            <option value={'Islam'}>Islam</option>
                                            <option value={'Traditional'}>Traditional</option>
                                            <option value={'Unknown'}>Unknown</option>
                                        </select>
                                    </section>
                                    
                                    <section>
                                        <label>Address</label>
                                        <textarea className="formTextArea sm" type="text"name="user_additional_info" placeholder="Address here..."
                                        value={address} onChange={(e)=> setAddress(e.target.value)}
                                        />
                                    </section>

                                </form>
                            </div>
                        </div>
                        
                        <div className="body-item">
                            <div className='header-section'>
                                <div className="icon-holder">
                                    <Siren />
                                </div>
                                <div className="section-title">
                                    Emergency Contact
                                </div>
                            </div>
                            <div className='body-body'>
                                <form action="">
                                    
                                    <section>
                                        <label>Name</label>
                                        <input 
                                            type="text" 
                                            placeholder='Name'
                                            name='name'
                                            value={emName}
                                            onChange = {(e)=>setEmName(e.target.value)}
                                            className="formInput sm"
                                        />
                                    </section>

                                    <section>
                                        <label>Phone</label>       
                                        <input 
                                            type="text" 
                                            placeholder='Phone'
                                            name='phone'
                                            value={emPhone}
                                            onChange = {(e)=>setEmPhone(e.target.value)}
                                            className="formInput sm"
                                        />
                                    </section>

                                    <section>
                                        <label>Relationship</label>
                                            <select className = 'formSelect lg' name="user_sex" onChange={(e)=>setEmRelationship(e.target.value)} value={emRelationship}>
                                                <option>- Select Relationship -</option>
                                                <option value={'Father'}>Father</option>
                                                <option value={'Mother'}>Mother</option>
                                                <option value={'Husband'}>Husband</option>
                                                <option value={'Wife'}>Wife</option>
                                                <option value={'Uncle'}>Uncle</option>
                                                <option value={'Aunt'}>Aunt</option>
                                                <option value={'Brother'}>Brother</option>
                                                <option value={'Sister'}>Sister</option>
                                                <option value={'Friend'}>Friend</option>
                                                <option value={'Unknown'}>Unknown</option>
                                            </select>
                                    </section>
                                    
                                    <section>
                                        <label>Address</label>
                                        <textarea className="formTextArea sm" type="text"name="user_additional_info" placeholder="Address here..."
                                        value={emAddress} onChange={(e)=> setEmAddress(e.target.value)}
                                        />
                                    </section>

                                </form>
                            </div>
                        </div>

                    </div>
                    <div className="right-items">
                        <div className="body-item">
                             <div className='header-section'>
                                <div className="icon-holder">
                                    <Users />
                                </div>
                                <div className="section-title">
                                    Kin Details
                                </div>
                            </div>
                            <div className='body-body'>
                                <form action="">
                                    <section>
                                        <label>Kin Name</label>
                                            <input 
                                                type="text" 
                                                placeholder='Kin Name'
                                                name='kinName'
                                                value={kinName}
                                                // onChange={handleInputChange}
                                                onChange = {(e)=>setKinName(e.target.value)}
                                                className="formInput sm"
                                            />
                                    </section>
                                    <section>
                                        <label>Kin Phone</label>
                                            <input 
                                            type="text" 
                                            placeholder='Phone'
                                            name='phone'
                                            value={kinPhone}
                                            // onChange={handleInputChange}
                                            onChange = {(e)=>setKinPhone(e.target.value)}
                                            className="formInput sm"
                                            />
                                    </section>
                                    <section>
                                        <label>Relationship</label>
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
                                                <option value={'Friend'}>Friend</option>
                                                <option value={'Unknown'}>Unknown</option>
                                            </select>
                                    </section>
                                    <section>
                                        <label>Kin Address</label>
                                            <textarea className="formTextArea sm" type="text"name="user_additional_info" placeholder="Address here..."
                                            value={kinAddress} onChange={(e)=> setKinAddress(e.target.value)}
                                            />
                                    </section>
                                    {/* <section>
                                        <label>Gender</label>
                                    </section>
                                    <section>
                                        <label>Gender</label>
                                    </section> */}

                                </form>
                                
                            </div>
                        </div>
                        <div className="body-item">
                            <div className='header-section'>
                                <div className="icon-holder">
                                    <Wallet />
                                </div>
                                <div className="section-title">
                                    Payer Information
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>

                <div className="puprofile-button-holder">
                    <button onClick={handleUpdate}>Save</button>
                </div>

            </div>
        </div>
        
    </div>
  )
}

export default PUProfile