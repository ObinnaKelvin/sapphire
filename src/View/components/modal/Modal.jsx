import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom'
import './modal.scss'
import naira from '../../assets/images/naira-black.png'
import numeral from "numeral";
import { format } from 'date-fns'//transform the dates to readable formats
import { formatDate } from '../../utils/formatDate';
import { Country, State, City }  from 'country-state-city';
import axios from 'axios';
import { AtSign, CalendarRange, Camera, Phone, Search, User, User2, UserPlus2, ClipboardList, Siren, Users, Wallet, AlertCircle, XCircle } from 'lucide-react';
import { ClimbingBoxLoading } from '../loading/Loading';
import { religionsData } from '../../pages/patientUserProfile/religionsData';


export const PatientTransaction = ({children, open, onClose, id }) => {

    if(!open) return null;


    return ReactDom.createPortal (
        <>
            <div className='ptransact-overlay' />
            {/* <div className='ptransact-container'> */}
            <div className={open?`ptransact-container` : `ptransact-container inactive`}>
                Hi Modal
                {children}
                <button onClick={onClose}>Close</button>
                <div onClick={onClose}>CloseIt</div>
            </div>
        </>,
        document.getElementById("modal")
    )
}

export const PatientAppointments = ({item, onClose}) => {

    return (
        item &&
        <div className={ item ? `pappointments-container` : `pappointments-container inactive`} onClick={onClose}>
            <div className="pappointments-item">

                <div className="pappointments-item-header">
                    <div className="tariff"><img src={naira}/>{numeral(item.tariff).format()}</div>
                    <div className="appt-status"></div>
                </div>

                <div className="pappointments-item-description">
                        <div className="pappointments-item-description-item">
                            <div className="central">Appointment Details</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Transaction Amount</div>
                            <div className="right">{item.tariff}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Transaction Date</div>
                            <div className="right">{formatDate(item.encodedDate)}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Appointment ID</div>
                            <div className="right">SAPP-{item.appointmentId}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Service</div>
                            <div className="right">{item.service}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Appointment Date</div>
                            <div className="right">{`${format(new Date(item.appointmentDate), "MMM do, yyy")}`}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Customer</div>
                            <div className="right">{item.firstname} {item.lastname}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Gender</div>
                            <div className="right">{item.gender}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Mobile</div>
                            <div className="right">{item.mobile}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Appointment Status</div>
                            <div className="right">{item.appointmentStatus}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Reference Number</div>
                            <div className="right">{item.referenceNo}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Transaction Status</div>
                            <div className="right">{item.paymentStatus}</div>
                        </div>
                        <div className="pappointments-item-description-item">
                            <div className="left">Notes</div>
                            <div className="right"><em>{item.notes}</em></div>
                        </div>
                </div>

            </div>
        </div>
    )
}

export const PatientRegInfo = ({item, onClose}) => {
    const [patientId, setPatientId] = useState('');
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
    const [emr_maidenname, setEmr_maidenname] = useState('');
    const [emr_gender, setEmr_gender] = useState('');
    const [emr_tel, setEmr_tel] = useState('');
    const [emr_birthplace, setEmr_birthplace] = useState('');
    const [emr_occupation, setEmr_occupation] = useState('');
    const [emr_workplace, setEmr_workplace] = useState('');
    const [emr_kinOccupation, setEmr_kinOccupation] = useState('');
    const [emr_stateCode, setEmr_stateCode] = useState('');
    const [emr_nationalityId, setEmr_nationalityId] = useState('');
    const [emr_religionId, setEmr_religionId] = useState('');
    const [isRequired, setIsRequired] = useState(false);
    const currentCountry = JSON.parse(localStorage.getItem('currentCountry'));
    const currentState = JSON.parse(localStorage.getItem('currentState'));
    const [loading, setLoading] = useState(null);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const currentStaff = JSON.parse(localStorage.getItem('staff'));
    const [patientList, setPatientList] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [isFullyRegistered, setIsFullyRegistered] = useState();


    
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

    const getReligionValue = (e) => {
        const religionChosen = e.target.children[e.target.selectedIndex].getAttribute('item-id')
        setEmr_religionId(religionChosen)
        setReligion(e.target.value)
        console.log("religion >>", e.target.value)
    }

    const loadPatientRecord = async (item) => {
        try {
            setIsLoading(true);
            await axios.get(`https://sapphire-api.onrender.com/api/patients/find/${item.email}`) //PRODUCTION;
            // .then(response => console.log(response.data))
            .then(response => {
                setPatientId(response.data[0].patientId)
                setTitle(response.data[0].title)
                setFirstname(response.data[0].firstName)
                setLastname(response.data[0].lastName)
                setMiddlename(response.data[0].middleName)
                setEmail(response.data[0].email)
                setGender(response.data[0].gender)
                setPhone(response.data[0].mobile)
                setDob(response.data[0].dateOfBirth)
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
                setEmr_maidenname(response.data[0].emr_maidenname)
                setEmr_gender(response.data[0].emr_gender)
                setEmr_tel(response.data[0].emr_tel)
                setEmr_birthplace(response.data[0].emr_birthplace)
                setEmr_occupation(response.data[0].emr_occupation)
                setEmr_workplace(response.data[0].emr_workplace)
                setEmr_kinOccupation(response.data[0].emr_kinOccupation)
                setEmr_stateCode(response.data[0].emr_stateCode)
                setEmr_nationalityId(response.data[0].emr_nationalityId)
                setEmr_religionId(response.data[0].emr_religionId)
                setIsFullyRegistered(response.data[0].isFullyRegistered)
            })
            // console.log(item)
            setIsLoading(false);

        } catch (error) {
            console.log("Can't load Patient Reg Info", error)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (title && firstname && middlename && lastname && phone && email && gender && 
            dob && maritalStatus && religion && country && state && address && kinName &&
            kinPhone && kinRelationship && kinAddress && emName && emPhone && emRelationship &&
            emAddress) {
                //await axios.post('http://localhost:9000/api/patients/', { //LOCAL
                await axios.put(`https://sapphire-api.onrender.com/api/patients/${patientId}`, {  //PRODUCTION
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
            // navigate("/staff-portal/patient")
            setIsRequired(false)
            //setPatientToggle(2)

        }  else {
            setIsRequired(true)
        }
    }


    useEffect(() => {
        loadPatientRecord(item)
    }, [item])  
    
    useEffect(() => {
        loadCountryData()
        loadStateData()
    }, [countryData])

    return (
        // <div className={ item ? `patreginfo-container` : `patreginfo-container inactive`} onClick={onClose}>
        <div className={ item ? `patreginfo-container` : `patreginfo-container inactive`}>
            <div className="patreginfo-item">
                <div className="patient-reg-panel">
                    <div className="left">
                        {`${item?.firstName} ${item?.lastName}`}
                    </div>
                    <div className="right">
                        <XCircle size={25} className='closeicon'onClick={onClose}/>
                    </div>
                </div>
                {
                    loading ? <ClimbingBoxLoading /> :

                    <div className="patient-reg-wrapper">
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
                                                <option value={'Alhaji'}>Alhaji</option>
                                                <option value={'Alhaja'}>Alhaja</option>
                                                <option value={'Chief'}>Chief</option>
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
                                                <option value={'Ikeja'}>Ikeja</option>
                                                <option value={'Ajah'}>Ajah</option>
                                                <option value={'Apapa'}>Apapa</option>
                                                <option value={'Lagos Island'}>Lagos Island</option>
                                                <option value={'Ikorodu'}>Ikorodu</option>
                                                <option value={'Oshodi'}>Oshodi</option>
                                                <option value={'Others'}>Others</option>
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
                                            <select className = {`formSelect sm ${isRequired && "required"}`} name="user_religion" onChange={getReligionValue} value={religion}>
                                                <option>-  Select Religion  -</option>
                                                {/* <option value={'Christianity'}>Christianity</option>
                                                <option value={'Islam'}>Islam</option>
                                                <option value={'Traditional'}>Traditional</option>
                                                <option value={'Unknown'}>Unknown</option> */}
                                                {

                                                    religionsData.map(item => {
                                                    return (
                                                        <option value={item.rel_name} item-id={item.rel_id}>{item.rel_name}</option>
                                                    )
                                                    })
                                                }
                                            </select>
                                        </section>
                                    
                                        {
                                            maritalStatus == "Married" && gender == "Female" && 
                                            <section>
                                                <label>Maiden Name</label>
                                                <input 
                                                    type="text" 
                                                    placeholder='Maiden name'
                                                    name='emr_maidenname'
                                                    value={emr_maidenname}
                                                    onChange = {(e)=>setEmr_maidenname(e.target.value)}
                                                    className="formInput md"
                                                />
                                            </section>
                                        }
                                    
                                        <section>
                                            <label>Birth Place</label>
                                            <input 
                                                type="text" 
                                                placeholder='Birth Place'
                                                name='emr_birthplace'
                                                value={emr_birthplace}
                                                onChange = {(e)=>setEmr_birthplace(e.target.value)}
                                                className="formInput md"
                                            />
                                        </section>
                                        
                                        <section>
                                            <label>Telephone</label>
                                            <input 
                                                type="tel" 
                                                placeholder='Telephone'
                                                name='emr_tel'
                                                value={emr_tel}
                                                onChange = {(e)=>setEmr_tel(e.target.value)}
                                                className="formInput md"
                                            />
                                        </section>
                                        
                                        <section>
                                            <label>Occupation</label>
                                            <input 
                                                type="text" 
                                                placeholder='Occupation'
                                                name='emr_occupation'
                                                value={emr_occupation}
                                                onChange = {(e)=>setEmr_occupation(e.target.value)}
                                                className="formInput md"
                                            />
                                        </section>
                                        
                                        <section>
                                            <label>Work Place</label>
                                            <input 
                                                type="text" 
                                                placeholder='Work Place'
                                                name='emr_workplace'
                                                value={emr_workplace}
                                                onChange = {(e)=>setEmr_workplace(e.target.value)}
                                                className="formInput md"
                                            />
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
                                            <label>Kin Occupation</label>
                                                <input 
                                                type="text" 
                                                placeholder='Occupation'
                                                name='occupation'
                                                value={emr_kinOccupation}
                                                onChange = {(e)=>setEmr_kinOccupation(e.target.value)}
                                                className="formInput sm"
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
                        {/* <div className="patient-button-holder">
                            <button onClick={handleSubmit}>Save</button>
                        </div> */}
                    </div>
                }

            </div>
        </div>
    )
}