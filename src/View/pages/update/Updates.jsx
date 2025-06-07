import React, { useState } from 'react'
import './updates.scss';
import nopost from '../../assets/images/nopost.png'
import { Navbar } from '../../components/navigation/Navbar'
import Footer from '../../components/footer/Footer'
import vidpic1 from '../../assets/images/ProstateSentenceEnPic.webp';
import vidpic2 from'../../assets/images/ProstateSlowEnPic.webp';
import vidpic3 from'../../assets/images/SignsofColorectalCancerEnPic.webp';
import vidpic4 from'../../assets/images/Laparoscopic1.webp';
import vidpic5 from'../../assets/images/Laparoscopic2.webp'; 
import vidpic6 from'../../assets/images/FreqUrination.webp'; 
import vidpic7 from'../../assets/images/Happensurgery.webp';
import vidpic8 from'../../assets/images/Agecolorectal.webp';
import vidpic9 from'../../assets/images/ColorectalHer.webp';
import vidpic10 from'../../assets/images/RiskColorectal.webp';
import vidpic11 from'../../assets/images/ProstateScreen.webp';
import vid1 from '../../assets/videos/ProstateScreeningTest.mp4';
import vid2 from '../../assets/videos/ProstateEnlargementvsProstateCancer.mp4';
import vid3 from '../../assets/videos/SignsOfColorecalCancer.mp4';
import vid4 from '../../assets/videos/Laparoscopic1.mp4';
import vid5 from '../../assets/videos/Laparoscopic2.mp4';
import vid6 from '../../assets/videos/FrequentUrination.mp4';
import vid7 from '../../assets/videos/Aftertreatment.mp4';
import vid8 from '../../assets/videos/ColorectalHereditary.mp4';
import vid9 from '../../assets/videos/AgescreenedColorectalcancer.mp4';
import vid10 from '../../assets/videos/RiskColorectalCancer.mp4';
import media1 from'../../assets/images/record.png';
import play from'../../assets/images/play.webp';
import close from'../../assets/images/close.png';

function Updates() {
  const[currentVideo, setCurrentVideo] = useState('')

  const playVideo = (video) => {
    setCurrentVideo(video)
  }

  const closeVideo = () => {
    setCurrentVideo('')
  }


  return (
    <div className='update-container'>
        <Navbar />

        <div className="update-banner">
            <div className='update-overlay'></div>
            <div className="update-header">
                    <p>Video Updates</p>
            </div>
        </div>


        <div className="update-items-wrapper">
          
          <div className="update-item">
            <div className="update-item-cover">
              <div className="play-holder" onClick={() => playVideo(vid2)}>
                <img className='play-icon' src={play} alt="play representation" />
              </div>
              <div className="cover-overlay"></div>
              <img className='video-cover' src={vidpic1} alt="interview cover" />
            </div>
            {/* <img className='media-icon' src={media1} alt="media representation" /> */}
            <div className="update-item-description">
                <div className="video-type">
                  Interview
                </div>
                <div className="video-caption">
                "Is prostate cancer a death sentence?"
                </div>
                <div className="video-description">
                  In this video, Dr. Anyadike debunks this myth and explains 
                  how early diagnosis can save lives.
                  <br/><br/>
                  #ProstrateHealth
                  #ProstateCancerAwareness 
                  #SapphireSurgicalCentre
                </div>
                <div className="video-date"> May 25, 2025</div>
            </div>
                  
          </div>
          
          <div className="update-item">
            <div className="update-item-cover">
              <div className="play-holder" onClick={() => playVideo(vid1)}>
                <img className='play-icon' src={play} alt="play representation" />
              </div>
              <div className="cover-overlay"></div>
              <img className='video-cover' src={vidpic2} alt="interview cover" />
            </div>
            {/* <img className='media-icon' src={media1} alt="media representation" /> */}
            <div className="update-item-description">
                <div className="video-type">
                  Interview
                </div>
                <div className="video-caption">
                  “Don't let prostate issues slow you down!”
                </div>
                <div className="video-description">
                  In this 1-minute video, Dr. Chinedu Anyadike shares vital insights on prostate health.
                  <br/>
                  Watch now and stay informed!
                  <br/><br/>
                  #ProstrateHealth
                  #ProstateCancerAwareness 
                  #SapphireSurgicalCentre
                </div>
                <div className="video-date"> May 25, 2025</div>
            </div>
                  
          </div>
          
          <div className="update-item">
            <div className="update-item-cover">
              <div className="play-holder" onClick={() => playVideo(vid3)}>
                <img className='play-icon' src={play} alt="play representation" />
              </div>
              <div className="cover-overlay"></div>
              <img className='video-cover' src={vidpic3} alt="interview cover" />
            </div>
            {/* <img className='media-icon' src={media1} alt="media representation" /> */}
            <div className="update-item-description">
                <div className="video-type">
                  Interview
                </div>
                <div className="video-caption">
                  "What are the signs of Colorectal Cancer?"
                </div>
                <div className="video-description">
                  In this video, Dr. Oke explains the signs of Colorectal Cancer and how early diagnosis can save lives.
                  <br/><br/>
                  #ColonHealth
                  #ColorectalCancerAwareness
                  #SapphireSurgicalCentre
                </div>
                <div className="video-date"> May 25, 2025</div>
            </div>
                  
          </div>
          
          <div className="update-item">
            <div className="update-item-cover">
              <div className="play-holder" onClick={() => playVideo(vid6)}>
                <img className='play-icon' src={play} alt="play representation" />
              </div>
              <div className="cover-overlay"></div>
              <img className='video-cover' src={vidpic6} alt="interview cover" />
            </div>
            {/* <img className='media-icon' src={media1} alt="media representation" /> */}
            <div className="update-item-description">
                <div className="video-type">
                  Interview
                </div>
                <div className="video-caption">
                  "What does Frequent Urination show?"
                </div>
                <div className="video-description">
                  In this video, Dr. Anyadike answers questions like "Is frequent urination at night a sign of prostate cancer?", 
                  "Can a healthy looking man still have prostate cancer?"
                  <br/><br/>
                  #ProstrateHealth
                  #ProstateCancerAwareness 
                  #SapphireSurgicalCentre
                </div>
                <div className="video-date"> May 25, 2025</div>
            </div>
                  
          </div>
          
          <div className="update-item">
            <div className="update-item-cover">
              <div className="play-holder" onClick={() => playVideo(vid7)}>
                <img className='play-icon' src={play} alt="play representation" />
              </div>
              <div className="cover-overlay"></div>
              <img className='video-cover' src={vidpic7} alt="interview cover" />
            </div>
            {/* <img className='media-icon' src={media1} alt="media representation" /> */}
            <div className="update-item-description">
                <div className="video-type">
                  Interview
                </div>
                <div className="video-caption">
                  "What happens after a surgery?"
                </div>
                <div className="video-description">
                  In this video, Dr. Anyadike answers questions like 
                  "Can a patient still be affected after treatment?", <br />
                  "Are there affordable screening options available?" <br />
                  "What's recovery like after the procedure?"
                  <br/><br/>
                  #ProstrateHealth
                  #ProstateCancerAwareness 
                  #SapphireSurgicalCentre
                </div>
                <div className="video-date"> May 25, 2025</div>
            </div>
                  
          </div>
          
          <div className="update-item">
            <div className="update-item-cover">
              <div className="play-holder" onClick={() => playVideo(vid9)}>
                <img className='play-icon' src={play} alt="play representation" />
              </div>
              <div className="cover-overlay"></div>
              <img className='video-cover' src={vidpic8} alt="interview cover" />
            </div>
            {/* <img className='media-icon' src={media1} alt="media representation" /> */}
            <div className="update-item-description">
                <div className="video-type">
                  Interview
                </div>
                <div className="video-caption">
                  "At what age should Colorectal Cancer Screening be done?"
                </div>
                <div className="video-description">
                  In this one-minute video, Dr. Oke explains from his wealth of experience and backed by scientific research when Colorectal Cancer Screening should be done.
                  <br/><br/>
                  #ColonHealth
                  #ColorectalCancerAwareness
                  #SapphireSurgicalCentre
                </div>
                <div className="video-date"> May 25, 2025</div>
            </div>
                  
          </div>
          
          <div className="update-item">
            <div className="update-item-cover">
              <div className="play-holder" onClick={() => playVideo(vid8)}>
                <img className='play-icon' src={play} alt="play representation" />
              </div>
              <div className="cover-overlay"></div>
              <img className='video-cover' src={vidpic9} alt="interview cover" />
            </div>
            {/* <img className='media-icon' src={media1} alt="media representation" /> */}
            <div className="update-item-description">
                <div className="video-type">
                  Interview
                </div>
                <div className="video-caption">
                  "Is Colorectal Cancer hereditary?"
                </div>
                <div className="video-description">
                  While most colorectal cancers occur sporadically, up to 10–15% have a strong hereditary component. 
                  Understanding the genetic risk factors behind colorectal cancer is crucial for early detection and prevention.
                  <br/><br/>
                  #ColonHealth
                  #ColorectalCancerAwareness
                  #SapphireSurgicalCentre
                </div>
                <div className="video-date"> May 25, 2025</div>
            </div>
                  
          </div>
          
          <div className="update-item">
            <div className="update-item-cover">
              <div className="play-holder" onClick={() => playVideo(vid10)}>
                <img className='play-icon' src={play} alt="play representation" />
              </div>
              <div className="cover-overlay"></div>
              <img className='video-cover' src={vidpic10} alt="interview cover" />
            </div>
            {/* <img className='media-icon' src={media1} alt="media representation" /> */}
            <div className="update-item-description">
                <div className="video-type">
                  Interview
                </div>
                <div className="video-caption">
                  "Who is at risk of Colorectal Cancer?"
                </div>
                <div className="video-description">
                    Colorectal cancer is one of the most common cancers worldwide—but certain individuals face a higher risk than others.
                    In this video, Dr. Oke outlines the key risk factors.
                  <br/><br/>
                  #ColonHealth
                  #ColorectalCancerAwareness
                  #SapphireSurgicalCentre
                </div>
                <div className="video-date"> May 25, 2025</div>
            </div>
                  
          </div>
          
          <div className="update-item">
            <div className="update-item-cover">
              <div className="play-holder" onClick={() => playVideo(vid8)}>
                <img className='play-icon' src={play} alt="play representation" />
              </div>
              <div className="cover-overlay"></div>
              <img className='video-cover' src={vidpic11} alt="interview cover" />
            </div>
            {/* <img className='media-icon' src={media1} alt="media representation" /> */}
            <div className="update-item-description">
                <div className="video-type">
                  Interview
                </div>
                <div className="video-caption">
                  "What Age should men get screened of Prostate cancer?"
                </div>
                <div className="video-description">
                    Prostate cancer is one of the most common cancers in men, and early detection can make a significant difference in outcomes. 
                    But knowing when to start screening is just as important as knowing why.
                    {/* But knowing <em>when to start screening</em> is just as important as knowing <em>why</em>. */}
                  <br/><br/>
                  #ProstrateHealth
                  #ProstateCancerAwareness 
                  #SapphireSurgicalCentre
                </div>
                <div className="video-date"> May 25, 2025</div>
            </div>
                  
          </div>
          
          <div className="update-item">
            <div className="update-item-cover">
              <div className="play-holder" onClick={() => playVideo(vid4)}>
                <img className='play-icon' src={play} alt="play representation" />
              </div>
              <div className="cover-overlay"></div>
              <img className='video-cover' src={vidpic4} alt="interview cover" />
            </div>
            {/* <img className='media-icon' src={media1} alt="media representation" /> */}
            <div className="update-item-description">
                <div className="video-type">
                  Documentary
                </div>
                <div className="video-caption">
                  "Laparoscopic distal pancreatectomy for a tumor of the tail of pancreas, and resection of a small bowel 
                  gastrointestinal stromal tumor (GIST) presenting as an intussusception."
                </div>
                <div className="video-description">
                Dr. Oke demonstrates a laparoscopic anterior resection procedure for a tumor located at the rectosigmoid junction.
                This approach offers the advantages of reduced postoperative pain, quicker recovery, and shorter hospital stay, while maintaining the precision required for effective treatment.
                </div>
                <div className="video-date"> May 25, 2025</div>
            </div>
                  
          </div>
          
          <div className="update-item">
            <div className="update-item-cover">
              <div className="play-holder" onClick={() => playVideo(vid5)}>
                <img className='play-icon' src={play} alt="play representation" />
              </div>
              <div className="cover-overlay"></div>
              <img className='video-cover' src={vidpic5} alt="interview cover" />
            </div>
            {/* <img className='media-icon' src={media1} alt="media representation" /> */}
            <div className="update-item-description">
                <div className="video-type">
                  Documentary
                </div>
                <div className="video-caption">
                  "Laparoscopic anterior resection of a rectosigmoid junction tumor."
                </div>
                <div className="video-description">
                A surgical video demonstrating a laparoscopic anterior resection for a tumor located at the rectosigmoid junction. 
                In this video, Dr. Olujimi Coker walks us through this minimally invasive procedure performed to remove malignant or suspicious lesions in the lower part of the colon, ensuring both oncological safety and bowel continuity.
                </div>
                <div className="video-date"> May 25, 2025</div>
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

        {/* <div className="update-nothing">
            <div className="update-wrapper">
              <div className='update-image'>
                <img src={nopost} alt='no post'/>
              </div>
              <div className='update-text'>
                <p>No Media Files</p>
                <p>There are no update posts available at the moment.</p>
              </div>
            </div>
        </div> */}

        <Footer />
        
    </div>
  )
}

export default Updates