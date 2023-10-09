import React from 'react'
import './gallery.scss';
import nopost from '../../assets/images/nopost.png'
import Navbar from '../../components/navigation/Navbar'
import Footer from '../../components/footer/Footer'

function Gallery() {
  return (
    <div className='gallery-container'>
        <Navbar />

        <div className="gallery-banner">
            <div className='gallery-overlay'></div>
            <div className="gallery-header">
                    <p>Gallery</p>
            </div>
        </div>

        <div className="gallery-nothing">
            <div className="gallery-wrapper">
              <div className='gallery-image'>
                <img src={nopost} alt='no post'/>
              </div>
              <div className='gallery-text'>
                <p>No Media Files</p>
                <p>There are no gallery posts available at the moment.</p>
              </div>
            </div>
        </div>

        <Footer />
        
    </div>
  )
}

export default Gallery