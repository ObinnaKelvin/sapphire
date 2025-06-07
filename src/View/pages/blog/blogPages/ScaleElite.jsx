import './blogpage.scss';
import PicCoverA from '../../../assets/images/ScaleCoker.webp';
import PicCoverB from '../../../assets/images/Hernia.webp';
import PicCoverC from '../../../assets/images/Thyroid.webp';
import { Navbar } from '../../../components/navigation/Navbar';
import { Link } from 'react-router-dom';

function ScaleElite() {
  return (
    <div className='blogpage-container'>
            <Navbar />

            <div className="blogpage-wrapper">

                <div className="blogpage-article">
                    <div className="cover-img-holder">
                        <img class="maincover" src={PicCoverA}/>
                    </div>

                    <div className="blogpage-header">
                        “We Can’t Scale the Elite – But We Can Scale Access” 
                        – Akinoso Olujimi’s Blueprint for Global Surgical Equality.
                    </div>

                    <div className="blogpage-content">
                        When we talk about innovation in surgery, we often picture cutting-edge robotics or AI-assisted imaging. 
                        But Dr.Akinoso invites us to think bigger—and more human.

                        <div className="blogpage-emphasize">
                        “We can’t scale the elite. But we can scale access.”
                        </div>

                        That line stayed with me long after our conversation ended. At IRCAD, Dr.Akinoso is championing a different kind of transformation. 
                        One that doesn’t just make surgery safer or more precise—but more equitable. His vision is bold: to dismantle the geographic lottery 
                        that determines who gets life-saving care and who doesn’t. He sees simulation training as a powerful equalizer.

                        <div className="blogpage-emphasize">
                            “When a young surgeon in Ghana or Indonesia can practice on the same simulator as one in Paris, something profound happens. 
                            You start erasing borders. You level the field—not in theory, but in capability.”
                        </div>

                        This isn't charity. It’s infrastructure. IRCAD isn’t just a center of excellence—it’s becoming a global distribution system for competence. 
                        And that shift—from centralization to decentralization—is what makes access scalable.

                        <div className="blogpage-emphasize">
                            “The best training is adaptable. It doesn’t demand a perfect environment. It prepares you for imperfect ones.”
                        </div>

                        What’s compelling about Dr.Akinoso's philosophy is how grounded it is in systems thinking. He’s not interested in sending over experts or brief missions. 
                        He’s interested in creating local engines of competence—where training, assessment, and iteration are continuous.

                        <div className="blogpage-emphasize">
                            “We used to think excellence had to be imported. But if you give people the tools, the mentorship, and the feedback loop—they build it themselves.”
                        </div>

                        Dr.Akinoso’s approach is a rebuke to the idea that quality must be centralized. Instead, it’s a call to distribute excellence without diluting it.

                        <div className="blogpage-emphasize">
                            “We’re not just scaling skill—we’re scaling confidence. We’re scaling dignity.”
                        </div>

                        In a world increasingly defined by inequality, Dr.Akinoso’s work is a reminder that some of the most meaningful innovations are not those that dazzle with 
                        complexity—but those that deliver fairness. If the future of surgery is truly global, then Dr.Akinoso is one of the architects. And his blueprint starts 
                        with one radical belief: that great surgery should depend on your skill—not your zip code


                    </div>
                </div>

                <div className="blogpage-other-articles">

                    <div className="blogpage-other-header">
                        Others also viewed
                    </div>

                    <Link className='link' to={'/blog/hernia-occur'}>
                        <div className="blogpage-other-item">
                            <div className="other-item-small-cover">
                                <img class="piccover" src={PicCoverB}/>
                            </div>
                            <div className="other-news-content">

                                <div className="news-header">“Why Hernias Occur and What Causes Them”</div>
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

export default ScaleElite