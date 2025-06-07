import './blogpage.scss';
import PicCoverA from '../../../assets/images/ScaleCoker.webp';
import PicCoverB from '../../../assets/images/Hernia.webp';
import PicCoverC from '../../../assets/images/Thyroid.webp';
import { Navbar } from '../../../components/navigation/Navbar';
import { Link } from 'react-router-dom';

function Hernia() {
  return (
    <div className='blogpage-container'>
            <Navbar />

            <div className="blogpage-wrapper">

                <div className="blogpage-article">
                    <div className="cover-img-holder">
                        <img class="maincover" src={PicCoverB}/>
                    </div>

                    <div className="blogpage-header">
                        Why Hernias Occur and What Causes Them
                    </div>

                    <div className="blogpage-content">
                            A hernia is a medical condition that happens when an organ, usually part of the intestine, pushes through a weak spot in the surrounding muscle or tissue wall. 
                            Though often not immediately life-threatening, hernias do not heal on their own and can lead to serious complications if left untreated.

                            Hernias occur due to a combination of muscle weakness and physical strain. Muscle weakness can be present at birth (congenital) or develop later in life as muscles weaken with age. 
                            Factors such as poor nutrition, smoking, and certain chronic diseases can also contribute to the weakening of abdominal muscles. Strain, on the other hand, comes from activities or 
                            conditions that increase pressure inside the abdomen. Common examples include heavy lifting, chronic coughing or sneezing, straining during bowel movements due to constipation, and pregnancy.

                            There are several types of hernias, with inguinal hernias being the most common. These typically affect men and occur in the groin area. Other types include umbilical hernias (around the belly button), 
                            hiatal hernias (upper stomach pushing into the chest), and incisional hernias (through a scar from previous surgery).

                            Certain risk factors increase the likelihood of developing a hernia. These include obesity, a family history of hernias, smoking, chronic coughing, and physical occupations that involve heavy lifting. 
                            In some cases, hernias may develop slowly over time, while in others, they can appear suddenly.

                            Understanding why hernias occur is essential for prevention. Strengthening core muscles, maintaining a healthy weight, quitting smoking, and using proper lifting techniques can all help reduce risk. 
                            If you notice a bulge or feel pain in your abdomen or groin—especially when coughing, lifting, or standing—seek medical advice promptly. Early diagnosis and treatment can prevent complications and lead to better health outcomes.

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

                    <Link className='link' to={'/blog/thyroid-disorder'}>  
                        <div className="blogpage-other-item">
                            <div className="other-item-small-cover">
                                <img class="piccover" src={PicCoverC}/>
                            </div>
                            <div className="other-news-content">

                                <div className="news-header">“Understanding Hypothyroidism: A Common Thyroid Disorder”</div>
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

export default Hernia