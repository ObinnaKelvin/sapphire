import { useEffect, useRef, useState } from 'react'
import './supportEngine.scss'
import Avatar from './Avatar'
import Whatsapp from './Whatsapp'
import { LiveChat, SupportWindow } from './LiveChat'

function SupportEngine() {

    const wrapperRef = useRef(null)
    const [formVisible, setFormVisible] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showWindow, setShowWindow] = useState(false)

    
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowWindow(false)
                    // setVisible(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    
    useOutsideAlerter(wrapperRef);


  return (
    <div className='supportengine-container'  ref={wrapperRef}>

        {/* Live Chat Development Suspended */}
        {/* {
            showWindow &&
            <SupportWindow 
                // showWindow={showWindow}
                onClick={() => {setShowWindow(false); setShowMenu(!showMenu)}}
            />
        }

        <LiveChat  
            showMenu={showMenu}
            chatForm={formVisible}
            onClick={() => setShowWindow(true)}
        /> */}

        <Whatsapp 
            showMenu={showMenu}
        />
        
        <Avatar 
            onClick={() => setShowMenu(!showMenu)}
        />

    </div>
  )
}

export default SupportEngine