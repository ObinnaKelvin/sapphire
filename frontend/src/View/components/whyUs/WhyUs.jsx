import React from 'react';
import './whyus.scss';
import safe from '../../assets/images/shield.png';
import value from '../../assets/images/gold-ingots.png';
import expert from '../../assets/images/surgeon.png';
import { motion } from "framer-motion";


const spikesVariants = {
    // initial: {
    //     x: -100,
    //     opacity: 0
    // },
    initial: {
        x: 0,
        opacity: 0,
        rotate: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        rotate: 35.277,
        transition: {
            duration: 1.5
        }
    }
}

const whyVariants = {
    initial: {
        x: -100,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            staggerChildren: 0.5
        }
    }
}

const whyItemVariants = {
    initial: {
        x: -100,
        opacity: 0
    },
    
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1.5
        }
    }
}

function WhyUs() {
  return (
    <motion.div className='whyus-container'>
        <div className="whyus-wrapper">
            <div className="whyus-header">
                <motion.div className="spikes" variants={spikesVariants} initial='initial' whileInView="animate">
                    <div className="spike spikeOne"></div>
                    <div className="spike spikeTwo"></div>
                    <div className="spike spikeThree"></div>
                </motion.div>
                <div className="whyus-header-text">
                    Why People <span>Choose</span> Us?
                </div>
            </div>

            <motion.div className="whyus-items" initial='initial' variants={whyVariants} whileInView='animate'>
                <motion.div className="whyus-item" initial='initial' variants={whyItemVariants} whileInView='animate'>
                    <div className="toppane"></div>
                    <div className="img-holder">
                        <img src={safe} alt='scapel for surgery'/>
                    </div>
                    <p>Safety</p>
                    <span>
                        Reputation for outcomes comparable to international 
                        standards.
                    </span>
                </motion.div>
                <motion.div className="whyus-item" initial='initial' variants={whyItemVariants} whileInView='animate'>
                    <div className="toppane"></div>
                    <div className="img-holder">
                        <img src={value} alt='Urology surgery'/>
                    </div>
                    <p>Value</p>
                    <span>
                        Guaranteed value for money.
                    </span>
                </motion.div>
                <motion.div className="whyus-item" initial='initial' variants={whyItemVariants} whileInView='animate'>
                    <div className="toppane"></div>
                    <div className="img-holder">
                        <img src={expert} alt='Bariatric surgery'/>
                    </div>
                    <p>Experts</p>
                    <span>
                        Access to some of the most 
                        highly experienced surgeons 
                        in the country.
                    </span>
                </motion.div>
            </motion.div>

        </div>
    </motion.div>
  )
}

export default WhyUs