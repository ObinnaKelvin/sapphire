import React, {useState} from 'react'
import * as SiIcons from 'react-icons/si';
import * as RxIcons from 'react-icons/rx';
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons'
import supportIcon from '../../assets/images/supporticon.png'

export const LiveChat = (props) => {
  return (
    <div 
      className={`livechat-container ${props.showMenu ?  'show' : 'hide'} `}
      onClick={ () => props.onClick && props.onClick()}
    >
        {/* LiveChat */}
        <SiIcons.SiLivechat style={{width: '25px',height: '25px'}} className='liveIcon' />
    </div>
  )
}

export const SupportWindow = (props) => {  

  
  return (
    <div className="supportwindow-container">

      <div 
        className="closeWindow"
        onClick={ () => props.onClick && props.onClick()}
        
      >
        <RxIcons.RxCaretDown style={{width: '35px',height: '35px'}} />
      </div>

      <EmailForm />

    </div>
  )
}

export const EmailForm = (props) => {  
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
  }


  return (
    <div className="emailform-container">
      <div className="emailform-stripe"></div>
      <div className={`loading-wrapper ${loading ? 'active' : 'inactive'}`}>
        <LoadingOutlined className={`transition-5 loading-icon ${loading ? '.active' : 'inactive'}`}/>
      </div>
      <div className="emailform-toptext">
        <div className="left">
          <img src={supportIcon} alt='support'/>
        </div>
        <div className="right">Chat with a<br/> <span>Support Agent</span></div>
      </div>

      <form 
          // onSubmit={e => handleSubmit(e)}
      >
          <input 
              placeholder='Your Email'
              onChange={e => setEmail(e.target.value)}
              className='emailInput'
          />
      </form>

      <div className='bottomText'>
          Enter your email<br/> to get started.
      </div>

        {/* I'm Email */}
    </div>
  )
}

// export default LiveChat