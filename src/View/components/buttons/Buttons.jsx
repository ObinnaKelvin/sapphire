import React from 'react';
import { Link } from 'react-router-dom';
import './buttons.scss';
import { CalendarClock } from 'lucide-react';

export const AddButton = () => {
    return (
      <div className='add-container'>
          <Link className="add-link" to="/create-appointment">
            <div className="add-button">
                {/* + */}
                {/* <Camera size={12} /> */}
                <CalendarClock size={24} />
            </div>
          </Link>
      </div>
    )
  }