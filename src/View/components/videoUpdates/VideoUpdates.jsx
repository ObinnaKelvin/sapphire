import './videoupdates.scss';
import videoIcon from '../../assets/svg/video-icon-edit.svg';
import PicCoverA from '../../assets/images/ProstateSentenceEnPic.webp';
import PicCoverB from '../../assets/images/ProstateSlowEnPic.webp';
import PicCoverC from '../../assets/images/SignsofColorectalCancerEnPic.webp';
import playButton from '../../assets/images/play.webp';
import { Link } from 'react-router-dom';

function VideoUpdates() {
  return (
        <div className='videoupdates-container'>
    
            <div className='videoupdates-wrapper'>
                <div className="videoupdates-header">
                    <div className="icon">
                        <img src={videoIcon} alt='This shows a header video content'/>
                    </div>
                    <div className="videoupdates-header-text">
                        Video Updates
                    </div>
                </div>
    
                <div className="videoupdates-video-items">
    
                    <div className="videoupdates-video-item">
                        <div className="img-holder">
                            <img class="piccover" src={PicCoverA}/>
                            <div className="dark-overlay"></div>
                            <div className="play-button-holder">
                                <img src={playButton}/>
                            </div>
                        </div>
                        <div className="caption-holder">
                            <div className="video-type">Interview</div>
                            <div className="video-caption">"Is prostate cancer a death sentence?"</div>
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
    
    
                    <div className="videoupdates-video-item">
                        <div className="img-holder">
                            <img class="piccover" src={PicCoverB}/>
                            <div className="dark-overlay"></div>
                            <div className="play-button-holder">
                                <img src={playButton}/>
                            </div>
                        </div>
                        <div className="caption-holder">
                            <div className="video-type">Interview</div>
                            <div className="video-caption">“Don't let prostate issues slow you down!”</div>
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
    
    
                    <div className="videoupdates-video-item">
                        <div className="img-holder">
                            <img class="piccover" src={PicCoverC}/>
                            <div className="dark-overlay"></div>
                            <div className="play-button-holder">
                                <img src={playButton}/>
                            </div>
                        </div>
                        <div className="caption-holder">
                            <div className="video-type">Interview</div>
                            <div className="video-caption">"What are the signs of Colorectal Cancer?"</div>
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
    
                </div>
    
                <div className="videoupdates-more-button">
                    <Link  className='link' to={'/updates'}>
                        <div className="view-more-button"> View More </div>
                    </Link>
                </div>
                
            </div>
            
        </div>
  )
}

export default VideoUpdates