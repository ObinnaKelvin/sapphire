import React from 'react';
import { Link } from 'react-router-dom';
import './buttons.scss';
import { CalendarClock } from 'lucide-react';
import bot from '../../assets/images/bot.gif';

export const AddButton = () => {
    return (
      <div className='add-container'>
          <Link className="add-link" to="/staff-portal/create-appointment">
            <div className="add-button">
                {/* + */}
                {/* <Camera size={12} /> */}
                <CalendarClock size={24} />
            </div>
          </Link>
      </div>
    )
  }

  export const NotificationBot = () => {
      return (
        <div className='notificationBot-container'>
            {/* <Link className="add-link" to="/staff-portal/create-appointment"> */}
              {/* <div className="notificationBot-wrapper">
                  <img src={bot}/>
              </div> */}
            {/* </Link> */}

            <img src={bot}/>
        </div>
      )
  }

  export const ChatUsButton = () => {
      return (
        <div className='chatusbutton-container'>
          
        </div>
      )
  }