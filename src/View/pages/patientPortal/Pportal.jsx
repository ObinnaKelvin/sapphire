import React, { useState, useEffect } from 'react';
import './pportal.scss';
import { Navbar, PatientNavbar, PatientNavbarMobile } from '../../components/navigation/Navbar';
import { LayoutPanelLeft, AlignLeft, Search, ChevronRight, History } from 'lucide-react'
import { PatientAppointments, PatientTransaction } from '../../components/modal/Modal';
import axios from 'axios';
import numeral from 'numeral';
import { format } from 'date-fns'//transform the dates to readable formats
import { ClimbingBoxLoading, ReceiptSkeletonLoading } from '../../components/loading/Loading';
import { formatDate } from '../../utils/formatDate';
import { NoAppointments } from '../../components/404/404';

function Pportal() {

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [modalOpen, setModalOpen] = useState(false);
    const [greet, setGreet] = useState('');
    const [isLoading, setIsLoading] = useState(null);
    const [query, setQuery] = useState("");
    const [tab, setTab] = useState("upcoming");
    const [appointments, setAppointments] = useState([
        // {
        //     "_id": "65931728012c4956644df995",
        //     "appointmentId": 5,
        //     "patientId": 2,
        //     "patientNo": 1011000001,
        //     "staffId": null,
        //     "firstname": "Obinna",
        //     "lastname": "Okere",
        //     "gender": "Male",
        //     "mobile": 7035858557,
        //     "email": "okereobinna11@gmail.com",
        //     "notes": "I have headaches.",
        //     "referralTypeId": null,
        //     "referToDoctor": null,
        //     "authorizationNo": null,
        //     "service": "Bariatric Surgery",
        //     "tariff": 2000000,
        //     "appointmentDate": "2024-01-01T23:00:00.000Z",
        //     "appointmentStatus": 9,
        //     "paymentStatus": "Pending",
        //     "active": 1,
        //     "encodedDate": "2024-01-01T18:24:57.211Z",
        //     "invoiceId": null,
        //     "payerId": 1,
        //     "payerCategoryId": 1,
        //     "createdAt": "2024-01-01T19:48:56.020Z",
        //     "updatedAt": "2024-01-01T19:48:56.020Z",
        //     "__v": 0
        // }
    ])
    const [currentAppt, setCurrentAppt] = useState(
    //     {
    //     "_id": "65931728012c4956644df995",
    //     "appointmentId": 5,
    //     "patientId": 2,
    //     "patientNo": 1011000001,
    //     "staffId": null,
    //     "firstname": "Obinna",
    //     "lastname": "Okere",
    //     "gender": "Male",
    //     "mobile": "07035858557",
    //     "email": "okereobinna11@gmail.com",
    //     "notes": "I have headaches.",
    //     "referralTypeId": null,
    //     "referToDoctor": null,
    //     "authorizationNo": null,
    //     "service": "Bariatric Surgery",
    //     "tariff": 2000000,
    //     "appointmentDate": "2024-01-01T23:00:00.000Z",
    //     "appointmentStatus": 9,
    //     "paymentStatus": "Pending",
    //     "active": 1,
    //     "encodedDate": "2024-01-01T18:24:57.211Z",
    //     "invoiceId": null,
    //     "payerId": 1,
    //     "payerCategoryId": 1,
    //     "createdAt": "2024-01-01T19:48:56.020Z",
    //     "updatedAt": "2024-01-01T19:48:56.020Z",
    //     "__v": 0
    // }
    )
    
    const [upcomingAppointments, setUpcomingAppointments] = useState([])
    const [pastAppointments, setPastAppointments] = useState([])


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
    
    const displayAppointment = (item) => {
        setCurrentAppt(item);
    }   

    const closeAppointment = () => {
        setCurrentAppt('');
    }

    useEffect(() => {
        handleGreet();
        loadAppointmentData()
        loadUpcomingAppointmentData()
        loadPastAppointmentData()
    }, [])


    const loadAppointmentData = async() => {
        setIsLoading(true);
        //await axios.get(`http://localhost:9000/api/appointments/findByEmail/${currentUser.email}`) //LOCAL ENVIRONMENT
        await axios.get(`https://sapphire-api.onrender.com/api/appointments/findByEmail/${currentUser.email}`) //PRODUCTION
        //.then(response => console.log(response.data))
        .then(response => setAppointments(response.data))
        //console.log(appointments)
        setIsLoading(false);
    }

    const search = (data) => {
        return data.filter((item) => item.service.toLowerCase().includes(query))
    }

    const loadUpcomingAppointmentData = async() => {
        setIsLoading(true);
        //await axios.get(`http://localhost:9000/api/appointments/findByEmail/${currentUser.email}`) //LOCAL ENVIRONMENT
        await axios.get(`https://sapphire-api.onrender.com/api/appointments/findByEmailByAppointDateGTE/${currentUser.email}`) //PRODUCTION
        //.then(response => console.log(response.data))
        .then(response => setUpcomingAppointments(response.data))
        //console.log(appointments)
        setIsLoading(false);
    }

    const loadPastAppointmentData = async() => {
        setIsLoading(true);
        //await axios.get(`http://localhost:9000/api/appointments/findByEmail/${currentUser.email}`) //LOCAL ENVIRONMENT
        await axios.get(`https://sapphire-api.onrender.com/api/appointments/findByEmailByAppointDateLT/${currentUser.email}`) //PRODUCTION
        //.then(response => console.log(response.data))
        .then(response => setPastAppointments(response.data))
        //console.log(appointments)
        setIsLoading(false);
    }


  return (
    <div className="pportal-container">
        <Navbar />
        <div className="pportal-wrapper">
            <div className="pportal-sidenav">
                <PatientNavbar />
            </div>
            <div className="pportal-mobile">
                <PatientNavbarMobile />
            </div>
            <div className="pportal-body">
                <div className="pportal-body-header">
                    <div className="name-space">
                        Hi {currentUser.firstname}, {greet}
                    </div>
                    <div className="search-bar">
                        <div className="search-icon">
                            <Search />
                        </div>
                        <input 
                            type="text" 
                            // placeholder='Search Order no. or Service name'
                            placeholder='Search Service name'
                            // name='email'
                            // value={email}
                            // onChange={handleInputChange}
                            onChange = {(e)=>setQuery(e.target.value)}
                            className="formInput"
                        />
                    </div>
                    <div className="sorting">
                        <div className="sorting-grid">
                            <LayoutPanelLeft size={17} />
                        </div>
                        <div className="sorting-list">
                            <AlignLeft size={17} />
                        </div>
                    </div>
                </div>
                <div className="pportal-tabs">
                    <div className="pportal-tabs-wrapper">
                        <div className={`pportal-tabs-item ${tab == "upcoming" && "active"}`} onClick={() => setTab("upcoming")}>Upcoming</div>
                        <div className={`pportal-tabs-item ${tab == "past" && "active"}`} onClick={() => setTab("past")}><History size={20} />Past</div>
                    </div>

                </div>
                <div className="pportal-body-body">
                    
                        {
                            isLoading && <ClimbingBoxLoading />
                        }
                    <div className="booking-wrapper">

                        {
                            tab == "upcoming" &&
                            search(upcomingAppointments).map(data=>{
                                return (
                                        <div className="booking-item" key={data.appointmentId}>
                                            <div className="booking-orderno">SAPP-{data.appointmentId}</div>
                                            <div className="booking-service">{data.service}</div>
                                            <div className="booking-date">{formatDate(data.appointmentDate)}</div>
                                            {/* <div className="booking-date">{`${format(new Date(data.appointmentDate), "MMM do, yyy")}`}</div> */}
                                            <div className="booking-amount">₦{numeral(data.tariff).format()}</div>
                                            <div className={`booking-status ${data.paymentStatus.toLowerCase()}`}>{data.paymentStatus}</div>
                                            <div className="booking-modal" onClick={() => displayAppointment(data)}><ChevronRight size={15} /></div>
                                            {/* <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 3</PatientTransaction> */}
                                        </div>
                                        )

                                }
                            )
                        }

                        {/* {
                            tab == "upcoming" &&
                            <NoAppointments />
                        } */}

                        
                        { tab == "past" &&
                            
                            // appointments.map(data=>{
                            search(pastAppointments).map(data=>{
                                return (
                                        <div className="booking-item" key={data.appointmentId}>
                                            <div className="booking-orderno">SAPP-{data.appointmentId}</div>
                                            <div className="booking-service">{data.service}</div>
                                            <div className="booking-date">{formatDate(data.appointmentDate)}</div>
                                            {/* <div className="booking-date">{`${format(new Date(data.appointmentDate), "MMM do, yyy")}`}</div> */}
                                            <div className="booking-amount">₦{numeral(data.tariff).format()}</div>
                                            <div className={`booking-status ${data.paymentStatus.toLowerCase()}`}>{data.paymentStatus}</div>
                                            <div className="booking-modal" onClick={() => displayAppointment(data)}><ChevronRight size={15} /></div>
                                            {/* <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 3</PatientTransaction> */}
                                        </div>
                                        )

                                }
                            )
                        }
                        {/* <div className="booking-item">
                            <div className="booking-orderno">#02</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status pending">Pending</div>
                            <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div>
                            <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 2</PatientTransaction>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#03</div>
                            <div className="booking-service">Bariatric Surgery</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦500,000</div>
                            <div className="booking-status success">Success</div>
                            <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div>
                            <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 3</PatientTransaction>
                        </div>
                        <div className="booking-item">
                            <div className="booking-orderno">#12</div>
                            <div className="booking-service">Consultation</div>
                            <div className="booking-date">Oct 31st 2023, 02:34pm</div>
                            <div className="booking-amount">₦30,000</div>
                            <div className="booking-status pending">Pending</div>
                            <div className="booking-modal" onClick={() => setModalOpen(true)}><ChevronRight size={15} /></div>
                            <PatientTransaction open={modalOpen} onClose={() => {setModalOpen(false); console.log(modalOpen)}}>Hey! I'm inside 12</PatientTransaction>
                        </div> */}

                        <PatientAppointments item={currentAppt} onClose={()=>closeAppointment()} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Pportal