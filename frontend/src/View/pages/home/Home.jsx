import React from 'react';
import './home.scss';
import { Navbar } from '../../components/navigation/Navbar';
import Hero from '../../components/hero/Hero';
import Services from '../../components/services/Services';
import Stats from '../../components/stats/Stats';
import WhyUs from '../../components/whyUs/WhyUs';
import { Helmet, HelmetProvider, HelmetData } from 'react-helmet-async';
import Review from '../../components/reviews/Review';
// import ReviewForm from '../../components/reviewForm/ReviewForm';
import Footer from '../../components/footer/Footer';
import SupportEngine from '../../components/supportEngine/SupportEngine';


const helmetData = new HelmetData({});


function Home() {
  return (
    <div className="home-container">
        <Helmet helmetData={helmetData}>
          <title>Sapphire Surgeons | Home Page</title>
          <meta property="og:description" name='description' content='Sapphire Surgeons are a group of highly skilled doctors that perform complex surgeries, changing the face of surgical services in Nigeria. '/>
          <link rel="canonical" href="https://www.sapphiresurgeons.com/" />
        </Helmet>
        <Navbar/>
        <Hero/>
        <Services/>
        <Stats/>
        <WhyUs />
        {/*<Review />*/}   {/*Put on hold by Sapphire Partners*/}
        {/* <ReviewForm /> */}
        <SupportEngine />
        <Footer />
    </div>
  )
}

export default Home