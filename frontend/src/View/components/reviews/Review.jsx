import React from 'react'
import './review.scss';
import woman from '../../assets/images/woman.png';
import man from '../../assets/images/man1.png';
import girl from '../../assets/images/woman1.png';
import rating from '../../assets/images/rating.png';
import quote from '../../assets/images/quote.png';

const Review = () => {
  return (
    <div className='review-container'>
        <div className="review-wrapper">
            <div className="review-header">
                <div className="spikes">
                    <div className="spike spikeOne"></div>
                    <div className="spike spikeTwo"></div>
                    <div className="spike spikeThree"></div>
                </div>
                <div className="review-header-text">
                    Our <span>Satisfied</span> Patients Are Our Best Ads
                </div>
            </div>

            <div className="review-items">
                <div className="review-item">
                    <div className="img-holder">
                        <img src={woman} alt='scapel for surgery'/>
                    </div>
                    <div className="quote">
                        <img src={quote} alt='Quotation'/>
                    </div>
                    <p>Sandra Obidi</p>
                    <div className="ratings">
                        <img src={rating} alt='ratings'/>
                    </div>
                    <span>
                        “I think this is the best surgical 
                        experience I have had since my last 
                        childbirth”
                    </span>
                </div>
                <div className="review-item">
                    <div className="img-holder">
                        <img src={man} alt='Urology surgery'/>
                    </div>
                    <div className="quote">
                        <img src={quote} alt='Quotation'/>
                    </div>
                    <p>John Ephraim</p>
                    <div className="ratings">
                        <img src={rating} alt='ratings'/>
                    </div>
                    <span>
                        “I think this is the best surgical 
                        experience I have had since my last 
                        childbirth”
                    </span>
                </div>
                <div className="review-item">
                    <div className="img-holder">
                        <img src={girl} alt='Bariatric surgery'/>
                    </div>
                    <div className="quote">
                        <img src={quote} alt='Quotation'/>
                    </div>
                    <p>Mary Hansen</p>
                    <div className="ratings">
                        <img src={rating} alt='ratings'/>
                    </div>
                    <span>
                        “The surgeon helped me find the best 
                        treatment to my age-long illness. 
                        When I had the surgery I felt much 
                        more better.”
                    </span>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Review