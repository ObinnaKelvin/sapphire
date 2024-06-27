import React from 'react';
import { Navbar } from '../../components/navigation/Navbar';
import './about.scss';
import light from '../../assets/images/lightbulb.png';
import value from '../../assets/images/value.png';
import mission from '../../assets/images/mission.png';
import coker from '../../assets/images/coker.jpg';
import oke from '../../assets/images/oke.jpg';
import ohene from '../../assets/images/ohene.jpg';
import anyadike from '../../assets/images/anyadike.png';
import { Helmet, HelmetProvider, HelmetData } from 'react-helmet-async';
import Footer from '../../components/footer/Footer';


const helmetData = new HelmetData({});

function AboutUs() {
  return (
    <div className="aboutUs-container">
        <Helmet helmetData={helmetData}>
        <title>Sapphire Surgeons | About Page</title>
        <meta property="og:description" name='description' content='Sapphire Surgeons are a group of highly skilled doctors that perform complex surgeries, changing the face of surgical services in Nigeria. '/>
        <link rel="canonical" href="https://www.sapphiresurgeons.com/" />
        </Helmet>
        <Navbar />
        <div className="aboutUs-banner">
            <div className='aboutUs-darkOverlay'></div>
            <div className="aboutUs-header">
                    <p>About Us</p>
            </div>
        </div>

        <div className="aboutUs-who">
            <div className="aboutUs-who-wrapper">

                <div className="aboutUs-who-we-are">
                    <div className="aboutUs-who-we-are-headerText">
                        <span>Who</span> We Are?
                    </div>
                    <div className="aboutUs-who-we-are-content">
                        <p>
                            Sapphire Partners is a healthcare solutions 
                            company leveraging on many years of international 
                            and local experience in the healthcare industry, 
                            including extensive experience in the UK and South 
                            African National Health Services, and the Nigerian 
                            healthcare industry, both in the private and public 
                            sectors.
                        </p>
                    </div>
                </div>
                <div className="aboutUs-action vision">
                    <div className="top-tag">
                        <img src={light} alt='Light bulb'/>
                    </div>
                    <div className="aboutUs-action-headerText vision">VISION</div>
                    <div className="aboutUs-action-content">
                        <p>
                            To make specialized, world-class 
                            surgical services available to everyone.
                        </p>
                        {/* <p>
                            To ease local access to these 
                            services
                        </p>
                        <p>
                            To stimulate a systemic shift 
                            towards quality improvement in 
                            the Nigerian healthcare space
                        </p> */}

                    </div>

                </div>
                <div className="aboutUs-action mission">
                    <div className="top-tag">
                        <img src={mission} alt='Mission'/>
                    </div>
                    <div className="aboutUs-action-headerText mission">MISSION</div>
                    <div className="aboutUs-action-content">
                        <p>
                            To domesticate minimal access surgery and facilitate
                            systemic changes towards healthcare quality improvement
                            in Nigeria.
                            {/* <strong>Excellence</strong>
                            <br/>The best care possible, at all times */}
                        </p>
                    </div>
                </div>
                <div className="aboutUs-action values">
                    <div className="top-tag">
                        <img src={value} alt='Values'/>
                    </div>
                    <div className="aboutUs-action-headerText value">VALUES</div>
                    <div className="aboutUs-action-content">
                        <p>
                            <strong>Safety</strong>
                            <br/>Strict adherence to international 
                            standards of injury prevention in the 
                            patient and care providers
                        </p>
                        <p>
                            <strong>Excellence</strong>
                            <br/>The best care possible, at all times
                        </p>
                        <p>
                            <strong>Patient-centered care</strong>
                            <br/>The best interests of the the patient 
                            will always be our goal
                        </p>
                        <p>
                            <strong>Integrity</strong>
                            <br/>Honesty, transparent and trustworthy
                            interactions
                        </p>

                    </div>
                </div>

            </div>
        </div>
        <div className="aboutUs-team">
            <div className="aboutUs-team-wrapper">
                <div className="aboutUs-team-headerText">
                    Meet Our Team
                </div>
                <div className="aboutUs-team-member">
                    <div className="profile-pic-holder">
                        <img src={coker} alt='Jimi Coker'/>
                        <div className="name-holder">Dr. Akinoso Olujimi Coker</div>
                    </div>
                    <div className="profile-info-holder">
                        <p>
                            <strong>
                                Dr. Akinoso Olujimi COKER. MB;BS (Ibadan), FRCS, FRCS (Gen Surg), FWACS.
                                Consultant Laparoscopic and General Surgeon with Sapphire Surgical Partners.
                            </strong>
                        </p>
                        <p>
                            Dr. Coker qualified from the College of Medicine, University of Ibadan, and completed his
                            internship at University College Hospital, Ibadan. He had his specialist surgical training in 
                            the United Kingdom with basic surgical training in Greater Manchester and higher surgical
                            training in South Yorkshire based around the Sheffield University Teaching Hospitals.  
                        </p>
                        <p>
                            He was appointed Lecturer in Surgery at University of Sheffield and Consultant General 
                            Surgeon with specialist interest in laparoscopic surgery and coloproctology at Doncaster
                            and Bassetlaw NHS Trust in January 1999. The same year he became surgical instructor to 
                            Tropical Health and Education Trust (THET - UK based charity) with annual visits to Northern 
                            Ghana for basic and emergency surgical skills courses. For ten years he provided specialist 
                            services in the Northern and Upper East regions of Ghana for patients with breast cancer, large
                            and complex thyroid swellings (goitres) amongst other things.
                        </p>
                        <p>
                            Dr Coker was the principal instructor on advanced colorectal surgery at the Nairobi Surgical 
                            Skills Centre, University of Nairobi, Kenya from 2007 – 2015 with biannual training workshops 
                            for East African surgeons. He also provided such training courses, including therapeutic 
                            gastrointestinal endoscopy in teaching hospitals across West Africa.
                        </p>
                        <p>
                            In January 2011 he left the UK for sabbatical in Lagos, Nigeria to introduce laparoscopic and 
                            colorectal surgery at Hygeia Nigeria Limited, as Chief of Surgery. In 2015 he was appointed Chief 
                            Medical Director, and Chief Executive Officer in October 2019. A post he held till June 2022.
                            Dr Coker is the President, Laparoscopic Surgery Society of Nigeria and CEO of Habevit Healthcare 
                            Consulting.
                        </p>
                        <p>
                            An experienced Consultant Surgeon of international repute, his specialist interests include advanced 
                            laparoscopic surgery for gallstones, hernias, appendicitis and colorectal cancer. He is an expert in the 
                            management of haemorrhoids, anal prolapse, complex anal fistulas and fissures. He is also highly skilled
                            in diagnostic and therapeutic colonoscopy.
                        </p>
                    </div>
                </div>
                <div className="aboutUs-team-member">
                    <div className="profile-pic-holder">
                        <img src={oke} alt='Jimi Coker'/>
                        <div className="name-holder">Dr. Olatunbosun Oke</div>
                    </div>
                    <div className="profile-info-holder">
                        <p>
                            <strong>
                            Dr. Olatunbosun Ayokunle OKE. MB;BS (Ibadan), FWACS (General Surgery),
                            Cert. Gastroenterology Surg. (SA)
                            Consultant Laparoscopic and General Surgeon with Sapphire Partners.
                            </strong>
                        </p>
                        <p>
                            Dr. Oke obtained his undergraduate degree at the prestigious College of Medicine, University
                            of Ibadan. He trained in general surgery at the Obafemi Awolowo University Teaching Hospital,
                            Ile Ife.
                        </p>
                        <p>
                            After a stint as consultant general surgeon at the Premier Specialists’ Medical Center, 
                            Victoria Island, Lagos, he traveled to South Africa for further training in surgical 
                            gastroenterology at the prestigious Groote Schuur Hospital of the University of Cape Town, 
                            and graduated as a subspeciality fellow of the South African College of Surgeons.
                        </p>
                        <p>
                            He was the European Society of Coloproctology Fellow at the Department of Colorectal 
                            Surgery, Leicester General Hospital, the United Kingdom, during which he participated in 
                            robotic colorectal operations and general colorectal procedures.
                        </p>
                        <p>
                            He joined the Department of surgery, Lagoon Hospital in 2017, rising to the position of Chief 
                            of Surgery and Clinical Lead, Iwosan Lagoon Hospital Ikoyi.
                        </p>
                        <p>
                            Dr. Oke is a highly experienced general and gastrointestinal surgeon. His special interests 
                            are general and advanced laparoscopic operations; gastrointestinal oncology; gastrointestinal 
                            endoscopy; thyroid surgery; and breast surgery. He was key to the development of standard
                            oncological pathways for patients with solid tumors at Iwosan Lagoon Hospital. He set up the
                            laparoscopic colorectal surgery practice at the hospital. Furthermore, along with his team, he
                            was the first person to perform an endoscopic thyroidectomy in Nigeria and, probably, 
                            sub-Saharan Africa.
                        </p>
                        <p>
                            He has (co-) authored and published several papers in both national and international journals.
                        </p>
                    </div>
                </div>
                <div className="aboutUs-team-member">
                    <div className="profile-pic-holder">
                        <img src={anyadike} alt='Chinedu Anyadike'/>
                        <div className="name-holder">Dr. Chinedu Anyadike</div>
                    </div>
                    <div className="profile-info-holder">
                        <p>
                            <strong>
                                Dr Chinedu Clinton ANYADIKE MBBS (Port-Harcourt), FWACS (Urology)
                                Consultant Urological Surgeon with Sapphire Partners
                            </strong>
                        </p>
                        <p>
                            Dr Anyadike graduated from the University of Port-Harcourt. His specialist 
                            training took him to hospital general Grand Yoffe where he had his first spell 
                            with endo-urology. A recipient of the Mobil Nigeria scholarship throughout
                            his undergraduate schooling
                        </p>
                        <p>
                            He is an ATLS certified urologic surgeon.
                            He also is a recipient of the Endourology International traveling Scholar award 
                            and trained in St Joseph’s Hospital Ontario Canada post- fellowship.
                        </p>
                        <p>
                            He is an advanced endo-urologic surgeon, versed in Minimal access Surgery of 
                            the Upper and Lower Urinary tract. He has performed more than 3,000 minimal 
                            access procedures. He is currently completing a post-graduate programme on 
                            “Organ Transplantation” with the 
                            University of Liverpool.
                        </p>
                        <p>
                            He holds memberships with the American Urological Association, Canadian 
                            Urological Association as well as Pan African Urological Association.
                        </p>
                        <p>
                            He has numerous publications on Urologic ailments in accomplished journals 
                            (Local and foreign) Until his present appointment, he was the Urologist with 
                            Lagoon Hospitals, he carried out the first Endoscopic Combined Intrarenal 
                            Surgery during this time.
                        </p>
                    </div>
                </div>
                <div className="aboutUs-team-member">
                    <div className="profile-pic-holder">
                        <img src={ohene} alt='Jerome Ohene'/>
                        <div className="name-holder">Dr. Jerome Oheme</div>
                    </div>
                    <div className="profile-info-holder">
                        <p>
                            <strong>
                                Dr. Jerome Eyaofun OHENE FWACS (General Surgery)
                                Consultant General and Minimally Invasive Surgeon with Sapphire Partners.
                            </strong>
                        </p>
                        <p>
                            Dr Jerome Eyaofun Ohene is a General Surgeon with interests in advanced laparoscopic and 
                            endoscopic procedures.
                        </p>
                        <p>
                            <strong>AREAS OF EXPERTISE</strong>
                            <br/>Include Basic and advanced Laparoscopic surgeries including 
                            Laparoscopic Sleeve gastrectomy for weight loss. Laparoscopic cholecystectomy. Laparoscopic 
                            Splenectomy. Laparoscopic Ant reflux procedures. Laparoscopic repair of Perforated Peptic Ulcers. 
                            Laparoscopic Surgery for GIST tumors. Laparoscopic and Percutaneous image guided drainage of 
                            Intra-abdominal abscesses; Endoscopic Balloon placement for weight loss, endoscopic treatment of 
                            variceal and non variceal upper GI bleeding, PEG tube insertions, Endoscopic mucosal resection of 
                            Colonic polyps, Stapled haemorrhoidopexy and banding of Haemorrhoids. Routine gastroscopy and 
                            Colonoscopy.
                        </p>
                        <p>
                            Open procedures: Mastectomy. Gastrectomies, Colectomies and other routine general surgery 
                            procedures.
                        </p>
                        <p>
                            <strong>PROFESSIONAL AFFILIATIONS</strong>
                            <br/>
                            1. Member of the Nigerian medical association (NMA) 
                            2. Member of the Laparoscopic Surgeons Society of Nigeria (LASSON) 
                            3. Fellow of the West African College of Surgeons (FWACS) 
                            4.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default AboutUs