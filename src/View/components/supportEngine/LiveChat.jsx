import React from 'react'
import * as SiIcons from 'react-icons/si';

function LiveChat(props) {
  return (
    <div className={`livechat-container ${props.showMenu ?  'show' : 'hide'} `}>
        {/* LiveChat */}
        <SiIcons.SiLivechat style={{width: '25px',height: '25px'}} className='liveIcon' />
    </div>
  )
}

export default LiveChat