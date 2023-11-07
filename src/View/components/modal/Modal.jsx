import React, { useState } from 'react';
import ReactDom from 'react-dom'
import './modal.scss'


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