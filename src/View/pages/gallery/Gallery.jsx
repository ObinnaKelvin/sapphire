import React, { useState } from 'react'
import './gallery.scss';
import nopost from '../../assets/images/nopost.png'
import { Navbar } from '../../components/navigation/Navbar'
import Footer from '../../components/footer/Footer'
import vidpic1 from '../../assets/images/Laparoscopic1.PNG';
import vidpic2 from'../../assets/images/Laparoscopic2.PNG';
import vid1 from '../../assets/videos/Laparoscopic1.mp4';
import vid2 from '../../assets/videos/Laparoscopic2.mp4';
import media1 from'../../assets/images/record.png';
import play from'../../assets/images/play.png';
import close from'../../assets/images/close.png';

function Gallery() {
  const[currentVideo, setCurrentVideo] = useState('')

  const playVideo = (video) => {
    setCurrentVideo(video)
  }

  const closeVideo = () => {
    setCurrentVideo('')
  }


  return (
    <div className='gallery-container'>
        <Navbar />

        <div className="gallery-banner">
            <div className='gallery-overlay'></div>
            <div className="gallery-header">
                    <p>Gallery</p>
            </div>
        </div>


        <div className="gallery-items-wrapper">
          
          <div className="gallery-item">
            <div className="gallery-item-cover">
              <div className="play-holder" onClick={() => playVideo(vid1)}>
                <img className='play-icon' src={play} alt="play representation" />
              </div>
              <div className="cover-overlay"></div>
              <img className='video-cover' src={vidpic1} alt="interview cover" />
            </div>
            <img className='media-icon' src={media1} alt="media representation" />
            <div className="gallery-item-description">
                <div className="caption">
                  Laparoscopy
                </div>
                <div className="text">
                  Laparoscopic distal pancreatectomy for a tumor of the tail of pancreas, and resection of a small bowel 
                  gastrointestinal stromal tumor (GIST) presenting as an intussusception.
                </div>
            </div>
                  
          </div>
          
          <div className="gallery-item">
            <div className="gallery-item-cover">
              <div className="play-holder" onClick={() => playVideo(vid2)}>
                <img className='play-icon' src={play} alt="play representation" />
              </div>
              <div className="cover-overlay"></div>
              <img className='video-cover' src={vidpic2} alt="interview cover" />
            </div>
            <img className='media-icon' src={media1} alt="media representation" />
            <div className="gallery-item-description">
                <div className="caption">
                  Laparoscopy
                </div>
                <div className="text">
                  Laparoscopic anterior resection of a rectosigmoid junction tumor.
                </div>
            </div>
          </div>
          

        </div>


        <div className={currentVideo ? `video-player-wrapper`: `video-player-wrapper inactive`} onClick={() => closeVideo()}>
          <div className={currentVideo ? `video-player`: `video-player inactive`}>
            <div className="close-wrapper" onClick={() => closeVideo()}>
              <img src={close} className='close-btn'/>
            </div>
            <video width="100%" src={currentVideo} controls autoPlay></video>
          </div>
        </div>

        {/* <div className="gallery-nothing">
            <div className="gallery-wrapper">
              <div className='gallery-image'>
                <img src={nopost} alt='no post'/>
              </div>
              <div className='gallery-text'>
                <p>No Media Files</p>
                <p>There are no gallery posts available at the moment.</p>
              </div>
            </div>
        </div> */}

        <Footer />
        
    </div>
  )
}

export default Gallery