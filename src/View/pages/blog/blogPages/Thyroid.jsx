import './blogpage.scss';
import PicCoverA from '../../../assets/images/ScaleCoker.webp';
import PicCoverB from '../../../assets/images/Hernia.webp';
import PicCoverC from '../../../assets/images/Thyroid.webp';
import { Navbar } from '../../../components/navigation/Navbar';
import { Link } from 'react-router-dom';

const Thyroid = () => {
  return (
        <div className='blogpage-container'>
                <Navbar />
    
                <div className="blogpage-wrapper">
    
                    <div className="blogpage-article">
                        <div className="cover-img-holder">
                            <img class="maincover" src={PicCoverC}/>
                        </div>
    
                        <div className="blogpage-header">
                            Understanding Hypothyroidism: A Common Thyroid Disorder
                        </div>
    
                        <div className="blogpage-content">
                            Hypothyroidism is a common thyroid disorder that occurs when the thyroid gland, a small butterfly-shaped gland located in the neck, fails to produce enough thyroid hormones. 
                            These hormones—primarily thyroxine (T4) and triiodothyronine (T3)—play a critical role in regulating the body's metabolism, energy levels, and overall hormonal balance.

                            When thyroid hormone levels are too low, many body functions slow down. Common symptoms of hypothyroidism include fatigue, weight gain, dry skin, constipation, depression, 
                            cold intolerance, and slowed heart rate. In women, it may also cause irregular menstrual cycles or fertility problems. Because these symptoms often develop gradually, 
                            the condition can go unnoticed for months or even years.

                            The most common cause of hypothyroidism worldwide is iodine deficiency, but in developed countries, it is most often caused by autoimmune diseases such as Hashimoto's thyroiditis. 
                            In this condition, the immune system mistakenly attacks the thyroid gland, reducing its ability to produce hormones. Other causes include certain medications, radiation therapy, 
                            or surgical removal of the thyroid.

                            Diagnosis involves blood tests measuring levels of thyroid-stimulating hormone (TSH) and free T4. Elevated TSH with low T4 usually confirms the condition. 
                            Treatment typically involves daily hormone replacement therapy using synthetic thyroid hormone (levothyroxine), which helps restore normal hormone levels and alleviate symptoms.

                            Early diagnosis and consistent treatment are key to managing hypothyroidism effectively. If left untreated, the condition can lead to more serious health issues such as heart problems, 
                            infertility, or myxedema—a rare, life-threatening form of severe hypothyroidism.

                            Living with hypothyroidism requires regular monitoring and a healthy lifestyle. Individuals should work closely with their healthcare provider to adjust medication as needed and ensure 
                            long-term well-being. With proper care, most people with hypothyroidism can lead healthy, normal lives.
    
                            {/* <div className="blogpage-emphasize">
                            “We can’t scale the elite. But we can scale access.”
                            </div> */}
    
    
                        </div>
                    </div>
    
                    <div className="blogpage-other-articles">
    
                        <div className="blogpage-other-header">
                            Others also viewed
                        </div>
                        
                        <Link className='link' to={'/blog/scale-elite'}>
                            <div className="blogpage-other-item">
                                <div className="other-item-small-cover">
                                    <img class="piccover" src={PicCoverA}/>
                                </div>
                                <div className="other-news-content">
        
                                    <div className="news-header">“We Can’t Scale the Elite – But We Can Scale Access” – Akinoso Olujimi’s Blueprint for Global Surgical Equality</div>
                                    <div className="news-item-type-duration-holder">
                                        <div className="news-item-type">Article</div>
                                        <div className="news-item-duration"> May 25, 2025</div>
                                    </div>
        
                                </div>
                            </div>
                        </Link>
    
                        <Link className='link' to={'/blog/hernia-occur'}>
                            <div className="blogpage-other-item">
                                <div className="other-item-small-cover">
                                    <img class="piccover" src={PicCoverB}/>
                                </div>
                                <div className="other-news-content">
        
                                    <div className="news-header">Why Hernias Occur and What Causes Them</div>
                                    <div className="news-item-type-duration-holder">
                                        <div className="news-item-type">Article</div>
                                        <div className="news-item-duration"> May 25, 2025</div>
                                    </div>
        
                                </div>
                            </div>
                        </Link>
                    </div>
    
                </div>
            
        </div>
  )
}

export default Thyroid