import './newsfeeds.scss';
import paperIcon from '../../assets/images/newspaperfolded.webp';
import PicCoverA from '../../assets/images/ScaleCoker.webp';
import PicCoverB from '../../assets/images/Hernia.webp';
import PicCoverC from '../../assets/images/Thyroid.webp';
import playButton from '../../assets/images/play.webp';
import clock from '../../assets/images/clock.webp';
import { Link } from 'react-router-dom';


function NewsFeeds() {
  return (
    <div className='newsfeeds-container'>

        <div className='newsfeeds-wrapper'>
            <div className="newsfeeds-header">
                <div className="icon">
                    <img src={paperIcon} alt='This shows a header video content'/>
                </div>
                <div className="newsfeeds-header-text">
                    News Feeds
                </div>
            </div>

            <div className="newsfeeds-items">

                <div className="newsfeeds-item">
                    <div className="img-holder">
                        <img class="piccover" src={PicCoverA}/>
                        {/* <div className="dark-overlay"></div> */}
                        {/* <div className="play-button-holder">
                            <img src={playButton}/>
                        </div> */}
                    </div>
                    <div className="caption-holder">
                        <div className="news-type">Article</div>
                        <div className="news-read-duration">
                            <img src={clock} /> 
                            <div>6 mins read</div>
                        </div>
                        <div className="news-caption">"We Can’t Scale the Elite – But We Can Scale Access” – Akinoso Olujimi’s Blueprint for Global Surgical Equality"</div>
                        <div className="news-description">
                            When we talk about innovation in surgery, we often picture cutting-edge robotics or AI-assisted imaging. 
                            But Dr.Akinoso invites us to think bigger—and more human.
                        </div>
                        <div className="news-date"> May 25, 2025</div>
                        <div className="news-continue">{`Continue Reading >>>`}</div>
                    </div>

                </div>


                <div className="newsfeeds-item">
                    <div className="img-holder">
                        <img class="piccover" src={PicCoverB}/>
                        <div className="dark-overlay"></div>
                        <div className="play-button-holder">
                            <img src={playButton}/>
                        </div>
                    </div>
                    <div className="caption-holder">
                        <div className="news-type">Article</div>
                        <div className="news-read-duration">
                            <img src={clock} /> 
                            <div>6 mins read</div>
                        </div>
                        <div className="news-caption">“Why Hernias Occur and What Causes Them”</div>
                        <div className="news-description">
                        A hernia is a medical condition that happens when an organ, usually part of the intestine, 
                        pushes through a weak spot in the surrounding muscle or tissue wall. Though often not immediately life-threatening, hernias do not heal on their own and can lead to serious complications if left untreated.
                        </div>
                        <div className="news-date"> May 25, 2025</div>
                        <div className="news-continue">{`Continue Reading >>>`}</div>
                    </div>

                </div>


                <div className="newsfeeds-item">
                    <div className="img-holder">
                        <img class="piccover" src={PicCoverC}/>
                        <div className="dark-overlay"></div>
                        <div className="play-button-holder">
                            <img src={playButton}/>
                        </div>
                    </div>
                    <div className="caption-holder">
                        <div className="news-type">Article</div>
                        <div className="news-read-duration">
                            <img src={clock} /> 
                            <div>6 mins read</div>
                        </div>
                        <div className="news-caption">"Understanding Hypothyroidism: A Common Thyroid Disorder"</div>
                        <div className="news-description">
                            Hypothyroidism is a common thyroid disorder that occurs when the thyroid gland, 
                            a small butterfly-shaped gland located in the neck, fails to produce enough thyroid hormones.
                        </div>
                        <div className="news-date"> May 25, 2025</div>
                        <div className="news-continue">{`Continue Reading >>>`}</div>
                    </div>

                </div>

            </div>

            <div className="newsfeeds-more-button">
                <Link  className='link' to={'/blog'}>
                    <div className="read-more-button"> Read More </div>
                </Link>
            </div>
            
        </div>
        
    </div>
  )
}

export default NewsFeeds