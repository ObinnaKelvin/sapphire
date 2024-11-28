import { useState } from 'react'
// import { styles } from './styles'
import './supportEngine.scss';
import chat from '../../assets/images/chat.png'

const Avatar = (props) => {

    const [hovered, setHovered] = useState(false)

    return (
        <div className='avatar-container'
            onClick={() => props.onClick && props.onClick()}
        
        >
            <div 
                className={`transition-3 avatarHello ${hovered ? 'hovered' : 'nothovered'}`}
            >
                Live Chat
            
            </div>

            <div
                className='chatWithMeButton pulse'
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                // style={{
                //     ...styles.chatWithMeButton,
                //     ...{border: hovered ? '1px solid #f9f0ff' : '4px solid #7a39e0' }
                // }}
            >
                <img 
                    className='chatIcon'
                    src={chat}
                    alt='chat feature'
                    // style={{
                    //     ...styles.chatIcon,
                    // }} 
                />
            </div>
        </div>
    )
}

export default Avatar