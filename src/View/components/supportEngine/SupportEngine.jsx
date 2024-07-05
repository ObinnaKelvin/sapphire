import { useState } from 'react'
import './supportEngine.scss'
import Avatar from './Avatar'
import Whatsapp from './Whatsapp'
import LiveChat from './LiveChat'

function SupportEngine() {

    const [visible, setVisible] = useState(false)
    const [showMenu, setShowMenu] = useState(false)


  return (
    <div className='supportengine-container'>

        <LiveChat  
            showMenu={showMenu}
        />

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