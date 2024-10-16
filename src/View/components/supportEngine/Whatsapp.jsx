import React from 'react'
import wa from '../../assets/images/waicon.png'

const Whatsapp = props => {

  return (
    <div 
      className={`whatsapp-container ${props.showMenu ?  'show' : 'hide'} `}
      >
        <a href='https://wa.me/2349010002302?text=I%20like%20to%20know%20more%20about%20Sapphire%20Hospitals'
          target='blank'
        >
          <img 
              className='waIcon'
              src={wa}
              alt='whatsapp chat feature'
          />
        </a>
        
    </div>
  )
}

export default Whatsapp