import React from 'react';
import './loading.scss';
// import trakaImage from '../../assets/images/traka_logo.gif'
import Skeleton from 'react-loading-skeleton';



export const ReceiptSkeletonLoading = ({cards}) => {
    return (
        <div className="receipt-skeleton-wrapper">
            {
                Array(cards).fill(0).map((item, index) =>
                <div className='receipt-skeleton' key={index}>
                    <div className='receipt-skeleton-title'>
                        <Skeleton />
                    </div>
                    <div className='receipt-skeleton-body'>
                        <Skeleton />
                    </div>
                    <div className='receipt-skeleton-tags'>
                        <Skeleton count={2} />
                    </div>
                </div>)
            }
        </div>
    )
}