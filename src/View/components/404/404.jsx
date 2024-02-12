import React from 'react';
import './404.scss';
import box from '../../assets/images/open-box.png'


export const NoRecords = () => {
    return (
        <div className="noRecords-container">
            <div className="noRecords-wrapper">
                <img src={box} alt='no record found box' />
                <span>No records found</span>
            </div>
        </div>
    )
}