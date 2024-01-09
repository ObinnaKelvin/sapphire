import React from 'react';
import './loading.scss';
import trakaImage from '../../assets/images/traka_logo.gif'
import Skeleton from 'react-loading-skeleton';



export const ReceiptSkeletonLoading = ({cards}) => {
    return (
        <div className="incidence-skeleton-wrapper">
            {
                Array(cards).fill(0).map((item, index) =>
                <div className='incidence-skeleton' key={index}>
                    <div className='incidence-skeleton-title'>
                        <Skeleton />
                    </div>
                    <div className='incidence-skeleton-body'>
                        <Skeleton />
                    </div>
                    <div className='incidence-skeleton-tags'>
                        <Skeleton count={2} />
                    </div>
                </div>)
            }
        </div>
    )
}