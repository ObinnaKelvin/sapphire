import React, { useState, useEffect} from 'react'
import { Navbar, StaffNavbar, StaffNavbarMobile } from '../../components/navigation/Navbar'
import './reports.scss'
import * as MdIcons from 'react-icons/md';
import * as PiIcons from 'react-icons/pi';
import { AllPatientsReport } from '../../components/modal/Modal';

function Reports() {

  const staffUser = JSON.parse(localStorage.getItem('staff'));
  const [greet, setGreet] = useState('');
  const [showReport, setShowReport] = useState(0);


  const closeReport = () => {
    setShowReport(0)
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
    <div className="reports-container">
        <Navbar />

        <div className="reports-wrapper">
            <div className="reports-sidenav">
                {/* <PatientNavbar /> */}
                <StaffNavbar  />
            </div>
            <div className="reports-mobile">
                {/* <PatientNavbarMobile /> */}
                <StaffNavbarMobile  />
            </div>

            <div className="reports-body">

              <div className="reports-body-header">
                  <div className="page-title">
                      Reports
                  </div>
                  <div className="name-space">
                      Hi {staffUser.firstname}, {greet}
                  </div>
              </div>

              <div className="reports-body-body">

                <div className="reports-menu-header">
                    <div className="reports-menu-header-item">
                        All Reports
                    </div>
                </div>

                <div className={`reports-menu-wrapper `}>

                    <div className="reports-item" onClick={() => setShowReport(1)}>
                        <div className="icon">
                            <PiIcons.PiUsersThreeBold  style={{width: '35px',height: '35px'}} />
                        </div>
                        <div className="description">
                            Patients
                        </div>
                    </div>

                    {
                        showReport === 1 && 

                        <AllPatientsReport onClose={()=>closeReport()}/>
                    }
                </div>

              </div>




            </div>



        </div>

    </div>
  )
}

export default Reports