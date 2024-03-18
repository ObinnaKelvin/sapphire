import React from 'react';
import './home.scss';
import { Navbar } from '../../components/navigation/Navbar';
import Hero from '../../components/hero/Hero';
import Services from '../../components/services/Services';
import Stats from '../../components/stats/Stats';
import WhyUs from '../../components/whyUs/WhyUs';
import Review from '../../components/reviews/Review';
// import ReviewForm from '../../components/reviewForm/ReviewForm';
import Footer from '../../components/footer/Footer';

function Home() {
  return (
    <div className="home-container">
        <Navbar/>
        <Hero/>
        <Services/>
        <Stats/>
        <WhyUs />
        {/*<Review />*/}   {/*Put on hold by Sapphire Partners*/}
        {/* <ReviewForm /> */}
        <Footer />
    </div>
  )
}

export default Home