import React, { useState, useEffect, useRef} from 'react'
import './patient.scss';
import { Navbar, StaffNavbar, StaffNavbarMobile } from '../../components/navigation/Navbar'
import { AddButton } from '../../components/buttons/Buttons'
import cancel from '../../assets/images/cross.png'
import { useNavigate } from "react-router-dom";
import { AtSign, CalendarRange, Camera, Phone, Search, User, User2, UserPlus2, ClipboardList, Siren, Users, Wallet, AlertCircle} from 'lucide-react';
import { Calendar } from 'react-date-range';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from 'date-fns'//transform the dates to readable formats
import axios from 'axios';
import { Country, State, City }  from 'country-state-city';
import { ClimbingBoxLoading } from '../../components/loading/Loading';
import CountUp from 'react-countup'
import { NoRecords } from '../../components/404/404';

const Patient = () => {
    const [title, setTitle] = useState('');
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    // const[date, setDate] = useState()
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('')
    const [religion, setReligion] = useState('')
    const [openDate, setOpenDate] = useState(false)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('');
    const [cityDataList, setCityDataList] = useState([]);
    const [maritalStatus, setMaritalStatus] = useState('');
    const [state, setState] = useState('');
    const [stateData, setStateData] = useState([]);
    const [country, setCountry] = useState('');
    const [countryData, setCountryData] = useState([]);
    const [countryDataAbbrv, setCountryDataAbbrv] = useState('');
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
    const [isRequired, setIsRequired] = useState(false);
    const currentCountry = JSON.parse(localStorage.getItem('currentCountry'));
    const currentState = JSON.parse(localStorage.getItem('currentState'));
    const [loading, setLoading] = useState(null);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const currentStaff = JSON.parse(localStorage.getItem('staff'));
    const [patientList, setPatientList] = useState([]);
    
    const navigate = useNavigate();

    //We add a listener effect that activates 'false' which 
    // invokes the 'inactive' property to the dropdowns
    let formRef = useRef();
    const [modalOpen, setModalOpen] = useState(false);
    const [greet, setGreet] = useState('');
    const [patientToggle, setPatientToggle] = useState(1);
    const [query, setQuery] = useState("");
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
        if (title && firstname && middlename && lastname && phone && email && gender && 
            dob && maritalStatus && religion && country && state && address && kinName &&
            kinPhone && kinRelationship && kinAddress && emName && emPhone && emRelationship &&
            emAddress) {
                //await axios.post('http://localhost:9000/api/patients/', { //LOCAL
                await axios.post('https://sapphire-api.onrender.com/api/patients/', {  //PRODUCTION
                title:title,
                firstName: firstname,
                middleName: middlename,
                lastName: lastname,
                mobile: phone,
                email: email,
                gender:gender,
                dateOfBirth: dob,
                maritalStatus: maritalStatus,
                religion:religion,
                address: address,
                city:city,
                state: state,
                country: country,
                kinName: kinName,
                kinPhone: kinPhone,
                kinRelationship: kinRelationship,
                kinAddress: kinAddress,
                emergencyName:emName,
                emergencyPhone:emPhone,
                emergencyRelationship:emRelationship,
                emergencyAddress:emAddress,
                encodedBy: currentStaff.id,
                encodedDate: encodedDate,
                lastUpdatedBy: currentStaff.user_id,
                lastUpdatedDate: encodedDate
            })
            .then(response => console.log(response))
            navigate("/staff-portal/patient")
            setIsRequired(false)
            setPatientToggle(2)

        }  else {
            setIsRequired(true)
        }
    }

    // useEffect(() => {
    //     calculateAge(dob);
    // }, [dob])

    // const loadCountryData = async () => {
    //     await axios.get('http://battuta.medunes.net/api/country/all/?key=00000000000000000000000000000000')
    //     .then(response => console.log(response))
    // }
    
    const loadCountryData = async () => {
        try {
            const ctry = Country.getAllCountries()
            setCountryData(ctry)
            //console.log("countryData", countryData)
        } catch (error) {
            console.log(error)
        }
    }

    const getCountryValue = (e) => {
        const countryChosen = e.target.children[e.target.selectedIndex].getAttribute('item-abbrv')
        setCountryDataAbbrv(countryChosen)
        setCountry(e.target.value);
        //console.log("countryChosen", countryChosen)
    }

    const loadStateData = async() => {
        if(countryDataAbbrv) {//This runs when country is selected. 
            try {
                const stateRec = await State.getStatesOfCountry(`${countryDataAbbrv}`)
                setStateData(stateRec)
                console.log(stateRec)
            } catch (error) {
                console.log(error)
            }
        } 
        else { //This runs when country is not selected. Loads up from saved country
            try {
                const currentCountry = JSON.parse(localStorage.getItem('currentCountry'));
                const countryCode = await currentCountry.isoCode //currentCountry is from local storage
                const stateRec = await State.getStatesOfCountry(`${countryCode}`)
                setStateData(stateRec)
                console.log("stateRec", stateRec)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const loadCityData = async () => {
        setLoading(true)
        // if(`${currentCountry} && ${currentCountry?.name ==='Nigeria'} `) {
        if(`${currentCountry?.name ==='Nigeria'} `) {
            try {
                // const city = await City.getCitiesOfState('NG', 'FC')
                //const upperCaseState = state.toUpperCase()
                // const upperCaseState = stateDataDetails.name.toUpperCase()
                const upperCaseState = currentState.name.toUpperCase()
                const city = await axios.get(`https://nigeria-states-towns-lga.onrender.com/api/${state == "Abuja Federal Capital Territory"? "FCT" : upperCaseState}/towns`)
                setCityDataList(city.data)
                localStorage.setItem('cityData', JSON.stringify(city));
                console.log("city", city.data)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const city = City.getCitiesOfState(`${currentCountry.isoCode}`, `${currentState.isoCode}`)
                setCityDataList(city)
                //const city = City.getCitiesOfState(`${countryDataDetails.isoCode}`, `${stateDataDetails.isoCode}`)
                //setCityData(city);
                localStorage.setItem('cityData', JSON.stringify(city.data));
                //const upperCaseState = state.toUpperCase()
                //const upperCaseState = stateDataDetails.name.toUpperCase()
                //const city = await axios.get(`https://nigeria-states-towns-lga.onrender.com/api/${state == "Abuja Federal Capital Territory"? "FCT" : upperCaseState}/towns`)
                console.log("city", city)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
    }

    const loadPatientList = async() => {
        setLoading(true)
        //await axios.get(`http://localhost:9000/api/patients/`) //LOCAL ENVIRONMENT
        await axios.get(`https://sapphire-api.onrender.com/api/patients/`) //PRODUCTION
        .then(response => setPatientList(response.data))
        //.then(response => console.log(response.data))
        setLoading(false);

    }

    const search = (data) => {
        return data.filter((item) => item.firstName.toLowerCase().includes(query))
    }


    useEffect(() => {
        handleGreet();
        //loadCountryData()
    }, [])

    useEffect(() => {
        loadCountryData()
        loadStateData()
    }, [countryData])


    useEffect(() => {
        loadStateData()
    }, [countryDataAbbrv])

    useEffect(() => {
        loadCityData()
    }, [])

    useEffect(() => {
        loadPatientList()
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
                        Hi {`${currentUser.firstname}`}, {greet}
                    </div>

                    <div className="patient-toggle">
                        <div className={`patient-item ${patientToggle === 1 ? "active" : "inactive"}`} onClick={() => setPatientToggle(1)}>
                            <UserPlus2 />
                            <span>New Patient</span>
                        </div>
                        <div className={`patient-item ${patientToggle === 2 ? "active" : "inactive"}`} onClick={() => setPatientToggle(2)}>
                            <Users />
                            <span>Patient List (<CountUp end={patientList?.length} />)</span>
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
                                placeholder='Search First Name'
                                // name='email'
                                // value={email}
                                // onChange={handleInputChange}
                                onChange = {(e)=>setQuery(e.target.value)}
                                className="formInput"
                            />
                        </div>
                    }
                </div>

                <div className="patient-body-body">

                    {
                        patientToggle ===  1 &&
                        <div className="patient-create-wrapper">
                            <div className="left-items">
                                <div className="body-item">
                                    { isRequired && <div className="error_msg">
                                        <AlertCircle /> Mandatory fields are required!
                                    </div>}
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
                                                <select className = {`formSelect sm ${isRequired && "required"}`} name="user_sex" onChange={(e)=>setTitle(e.target.value)} value={title}>
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
                                                    className={`formInput sm ${isRequired && "required"}`}
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
                                                    className={`formInput sm ${isRequired && "required"}`}
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
                                                    className={`formInput sm ${isRequired && "required"}`}
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
                                                    className={`formInput sm ${isRequired && "required"}`}
                                                />
                                            </section>
        
                                            <section>
                                                <label>Gender</label>
                                                <select className = {`formSelect sm ${isRequired && "required"}`} name="user_sex" onChange={(e)=>setGender(e.target.value)} value={gender}>
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
                                                    onChange = {(e)=>setPhone(e.target.value)}
                                                    className={`formInput sm ${isRequired && "required"}`}
                                                />
                                            </section>
        
                                            <section>
                                                <label>Date Of Birth</label>
                                                <input 
                                                type="date" 
                                                placeholder='Date Of Birth'
                                                name='dob'
                                                value={dob}
                                                onChange = {(e)=>setDob(e.target.value)}
                                                className={`formInput sm ${isRequired && "required"}`}
                                                />
                                            </section>
                                            
                                            <section>
                                                <label>Marital Status</label>
                                                <select className = {`formSelect sm ${isRequired && "required"}`} name="user_sex" onChange={(e)=>setMaritalStatus(e.target.value)} value={maritalStatus}>
                                                    <option>-  Select Marital Status  -</option>
                                                    <option value={'Single'}>Single</option>
                                                    <option value={'Married'}>Married</option>
                                                    <option value={'Widowed'}>Widowed</option>
                                                    <option value={'Divorced'}>Divorced</option>
                                                    <option value={'Separated'}>Separated</option>
                                                </select>
                                            </section>
                                            
                                            <section>
                                                <label>Country</label>
                                                <select className = {`formSelect sm ${isRequired && "required"}`} name="user_sex" onChange={getCountryValue} value={country}>
                                                    <option>- Select Country -</option>
                                                    {
                                                        countryData.map(item=>{
                                                            return (
                                                                    <option value={item.name} item-abbrv={item.isoCode}>{item.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </section>
                                            
                                            <section>
                                                <label>State</label>
                                                <select className = {`formSelect sm ${isRequired && "required"}`} name="user_sex" onChange={(e)=>setState(e.target.value)} value={state}>
                                                    <option>- Select State -</option>
                                                    {/* <option value={'Lagos'}>Lagos</option> */}
                                                    {
                                                        stateData.map(item => {
                                                            return (
                                                                <option value={item.name}>{item.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </section>
        
                                            <section>
                                                <label>City</label>
                                                <select className = "formSelect sm" name="user_sex" onChange={(e)=>setCity(e.target.value)} value={city}>
                                                    <option>- Select City -</option>
                                                    <option value={'Ogba'}>Ogba</option>
                                                    <option value={'Alimosho'}>Alimosho</option>
                                                    <option value={'Alimosho'}>Ikeja</option>
                                                    {/* {
                                                        cityDataFull.map((item, index) => {
                                                            return (
                                                                <option value={item.name}>{item.name}</option>
                                                            )
                                                        })
                                                    } */}
                                                </select>
                                            </section>
        
                                            <section>
                                                <label>Religion</label>
                                                <select className = {`formSelect sm ${isRequired && "required"}`} name="user_religion" onChange={(e)=>setReligion(e.target.value)} value={religion}>
                                                    <option>-  Select Religion  -</option>
                                                    <option value={'Christianity'}>Christianity</option>
                                                    <option value={'Islam'}>Islam</option>
                                                    <option value={'Traditional'}>Traditional</option>
                                                    <option value={'Unknown'}>Unknown</option>
                                                </select>
                                            </section>
                                            
                                            <section>
                                                <label>Address</label>
                                                <textarea className= {`formTextArea sm ${isRequired && "required"}`}  type="text"name="user_additional_info" placeholder="Address here..."
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
                                                    className={`formInput sm ${isRequired && "required"}`}
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
                                                    className={`formInput sm ${isRequired && "required"}`}
                                                />
                                            </section>
        
                                            <section>
                                                <label>Relationship</label>
                                                    <select className = {`formSelect lg ${isRequired && "required"}`} name="user_sex" onChange={(e)=>setEmRelationship(e.target.value)} value={emRelationship}>
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
                                                <textarea className= {`formTextArea sm ${isRequired && "required"}`} type="text"name="user_additional_info" placeholder="Address here..."
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
                                                        onChange = {(e)=>setKinName(e.target.value)}
                                                        className= {`formInput sm ${isRequired && "required"}`}
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
                                                    className= {`formInput sm ${isRequired && "required"}`}
                                                    />
                                            </section>
                                            <section>
                                                <label>Relationship</label>
                                                    <select className = {`formSelect sm ${isRequired && "required"}`} name="user_sex" onChange={(e)=>setKinRelationship(e.target.value)} value={kinRelationship}>
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
                                                    <textarea className= {`formTextArea sm ${isRequired && "required"}`} type="text"name="user_additional_info" placeholder="Address here..."
                                                    value={kinAddress} onChange={(e)=> setKinAddress(e.target.value)}
                                                    />
                                            </section>
        
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
                            <div className="patient-button-holder">
                                <button onClick={handleSubmit}>Save</button>
                            </div>
                        </div>

                    }

                    {
                        patientToggle ===  2 &&
                        <div className="patient-list-wrapper"> 
                    
                                {
                                    loading && <ClimbingBoxLoading />
                                }

                                {
                                    search(patientList).map(data => {
                                        return(  
                                            <div className="patient-item">
                                                <div className="patient-user"><span><User2 size={16} /></span>{data.firstName} {data.lastName} <em>({data.gender})</em></div>
                                                <div className="patient-phone"><span><Phone size={16} /></span>{data.mobile}</div>
                                                <div className="patient-age"><span><CalendarRange size={16}/></span>?? Years</div>
                                                <div className="patient-payer"><span><Wallet size={16}/></span>Private</div>
                                                <div className="patient-email"><span><AtSign size={16}/></span>{data.email}</div>
                                            </div>
                                        )
                                    })
                                }   
                                {
                                    !loading && patientList.length === 0 && patientToggle ===  2 && <NoRecords />
                                } 
                            {/* <div className="patient-item">
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
                            </div> */}
    
                        </div>
                    }


                </div>

            </div>

        </div>
        
    </div>
  )
}

export default Patient