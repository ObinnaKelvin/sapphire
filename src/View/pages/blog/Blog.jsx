import React from 'react';
import './blog.scss';
import nopost from '../../assets/images/nopost.png'
import { Navbar } from '../../components/navigation/Navbar';
import Footer from '../../components/footer/Footer';

function Blog() {
  return (
    <div className='blog-container'>
        <Navbar />

        <div className="blog-banner">
            <div className='blog-darkOverlay'></div>
            <div className="blog-header">
                    <p>Blog Post</p>
            </div>
        </div>

        <div className="blog-nothing">
            <div className="blog-wrapper">
              <div className='blog-image'>
                <img src={nopost} alt='no post'/>
              </div>
              <div className='blog-text'>
                <p>No Posts Yet</p>
                <p>There are no blog posts available at the moment.</p>
              </div>
            </div>
        </div>

        <Footer />
        
    </div>
  )
}

export default Blog