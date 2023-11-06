import React, { useState } from 'react';
import ReactDom from 'react-dom'
import './modal.scss'

// function Modal() {
//   return (
//     <div>Modal</div>
//   )
// }

// export default Modal

export const PatientTransaction = ({children, open, onClose }) => {
    // const [isOpen, setIsOpen] = useState(false);
    if(open === false) return null;


    return ReactDom.createPortal (
        <>
            <div className='ptransact-overlay'></div>
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