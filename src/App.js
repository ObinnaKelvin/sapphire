import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './View/pages/home/Home';
import AboutUs from './View/pages/about/AboutUs';
import Blog from './View/pages/blog/Blog';
import Gallery from './View/pages/gallery/Gallery'
import Contact from './View/pages/contactus/ContactUs'
import Booking from './View/pages/booking/Booking'
import './App.scss'
import Plogin from "./View/pages/patientLogin/Plogin";
import Slogin from "./View/pages/staffLogin/Slogin";
import PayLater from "./View/pages/payLater/PayLater";
import PayNow from "./View/pages/payNow/PayNow";
import Pportal from "./View/pages/patientPortal/Pportal";
import Sportal from "./View/pages/staffPortal/Sportal";
import Sappointment from "./View/pages/staffAppointment/Sappointment";
import Patient from "./View/pages/patient/Patient";
import AuthOTP from "./View/pages/auth/AuthOTP";
import PUProfile from "./View/pages/patientUserProfile/PUProfile";
import Notifications from "./View/pages/notifications/Notifications";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {

  const [socket, setSocket] = useState(null); //1
  // const patient = JSON.parse(localStorage.getItem('patient'));

  //const socketHolder = JSON.parse(localStorage.getItem('socket'));
  
    useEffect(() => {

        setSocket(io("http://localhost:4000")) //1
        //localStorage.setItem('socket', JSON.stringify(io("http://localhost:4000")))
        console.log(socket)
    }, [])

    // useEffect(() => {

    //    socket.emit("newSocket", {

    //    })
    //     // console.log(socket)
    // }, [])


  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about-us' element={<AboutUs />}/>
          <Route path='/blog' element={<Blog />}/>
          <Route path='/gallery' element={<Gallery />}/>
          <Route path='/contact-us' element={<Contact />}/>
          <Route path='/book-appointment' element={<Booking />}/>
          <Route path='/patient-login' element={<Plogin />}/>
          <Route path='/staff-login' element={<Slogin />}/>
          <Route path='/pay-later' element={<PayLater socket={socket}/>}/>
          <Route path='/pay-now' element={<PayNow />}/>
          <Route path='/patient-portal' element={<Pportal />}/>
          <Route path='/patient-portal/profile' element={<PUProfile />}/>
          <Route path='/portal/auth/:userId' element={<AuthOTP />}/>
          <Route path='/staff-portal' element={<Sportal />}/>
          <Route path='/staff-portal/create-appointment' element={<Sappointment />}/>
          <Route path='/staff-portal/patient' element={<Patient />}/>
          <Route path='/staff-portal/notifications' element={<Notifications socket={socket} />}/>
        </Routes>
    </Router>
  );
}

export default App;
