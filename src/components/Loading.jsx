import React from 'react'

const Loading = () => {
    return (
        <>
            <div className='bg-dark loading-comp d-flex flex-column'>
                <div className="dot-spinner">
                    <div className="dot-spinner__dot" />
                    <div className="dot-spinner__dot" />
                    <div className="dot-spinner__dot" />
                    <div className="dot-spinner__dot" />
                    <div className="dot-spinner__dot" />
                    <div className="dot-spinner__dot" />
                    <div className="dot-spinner__dot" />
                    <div className="dot-spinner__dot" />
                </div>
                <p className='text-light pt-3'>Good things coming this way...</p>
            </div>
        </>
    )
}

export default Loading