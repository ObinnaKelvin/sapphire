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

function App() {
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
          <Route path='/pay-later' element={<PayLater />}/>
          <Route path='/pay-now' element={<PayNow />}/>
          <Route path='/patient-portal' element={<Pportal />}/>
          <Route path='/patient-portal/profile' element={<PUProfile />}/>
          <Route path='/patient-portal/auth/:userId' element={<AuthOTP />}/>
          <Route path='/staff-portal' element={<Sportal />}/>
          <Route path='/staff-portal/create-appointment' element={<Sappointment />}/>
          <Route path='/staff-portal/patient' element={<Patient />}/>
        </Routes>
    </Router>
  );
}

export default App;
