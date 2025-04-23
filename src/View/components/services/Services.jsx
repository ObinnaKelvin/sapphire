import React from 'react';
import './services.scss';
import scapel from '../../assets/svg/scalpel.svg';
import kidney from '../../assets/svg/kidney.svg';
import bariatric from '../../assets/svg/bariatric-surgery.svg';
import intestine from '../../assets/svg/intestine.svg';
import thyroid from '../../assets/svg/thyroid.svg';
import breast from '../../assets/svg/breasts.svg';
import endoscope from '../../assets/svg/endoscope.svg';
import oncology from '../../assets/svg/oncology.svg';
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

const servicesVariants = {
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

const servicesItemVariants = {
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

const Services = () => {
  return (
    <motion.div className='services-container'>
        <div className="services-wrapper">
            <div className="services-header">
                <motion.div className="spikes" variants={spikesVariants} initial='initial' whileInView="animate">
                    <div className="spike spikeOne"></div>
                    <div className="spike spikeTwo"></div>
                    <div className="spike spikeThree"></div>
                </motion.div>
                <div className="services-header-text">
                    Our Specialist Services
                </div>
            </div>
            <motion.div className="services-items" initial='initial' variants={servicesVariants} whileInView='animate'>
                <motion.div className="services-item"  initial='initial' variants={servicesItemVariants} whileInView='animate'>
                    <div className="img-holder">
                        <img src={scapel} alt='scapel for surgery'/>
                    </div>
                    <p>Minimal Access Surgery</p>
                </motion.div>
                <motion.div className="services-item" initial='initial' variants={servicesItemVariants} whileInView='animate'>
                    <div className="img-holder">
                        <img src={kidney} alt='Urology surgery'/>
                    </div>
                    <p>Urological Surgery</p>
                </motion.div>
                <motion.div className="services-item" initial='initial' variants={servicesItemVariants} whileInView='animate'>
                    <div className="img-holder">
                        <img src={bariatric} alt='Bariatric surgery'/>
                    </div>
                    <p>Bariatric Surgery</p>
                </motion.div>
                <motion.div className="services-item" initial='initial' variants={servicesItemVariants} whileInView='animate'>
                    <div className="img-holder">
                    <img src={intestine} alt='Gastrointestinal surgery'/>
                    </div>
                    <p>Gastrointestinal Surgery</p>
                </motion.div>
                <motion.div className="services-item" initial='initial' variants={servicesItemVariants} whileInView='animate'>
                    <div className="img-holder">
                        <img src={thyroid} alt='Thyroid surgery'/>
                    </div>
                    <p>Thyroid Surgery</p>
                </motion.div>
                <motion.div className="services-item" initial='initial' variants={servicesItemVariants} whileInView='animate'>
                    <div className="img-holder">
                        <img src={breast} alt='Breast surgery'/>
                    </div>
                    <p>Breast Surgery</p>
                </motion.div>
                <motion.div className="services-item" initial='initial' variants={servicesItemVariants} whileInView='animate'>
                    <div className="img-holder">
                        <img src={endoscope} alt='Diagnostic and Therapeutic Endoscopy'/>
                    </div>
                    <p>Diagnostic and Therapeutic Endoscopy</p>
                </motion.div>
                <motion.div className="services-item" initial='initial' variants={servicesItemVariants} whileInView='animate'>
                    <div className="img-holder">
                        <img src={oncology} alt='Surgical Oncology'/>
                    </div>
                    <p>Surgical Oncology</p>
                </motion.div>
            </motion.div>
        </div>

    </motion.div>
  )
}

export default Services