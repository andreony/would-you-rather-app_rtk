import React from 'react'

export default function ProgressBar ({percentage}) {
    return (
        <div className="progress x-2rem">
            <div 
                className="progress-bar position-relative bg-info" 
                role="progressbar" 
                style={{
                    width: `${percentage}%`
                }} 
                aria-valuenow={percentage} 
                aria-valuemin="0" 
                aria-valuemax="100">
                <div className="proc-text">{percentage}%</div>
            </div>
        </div>
    )
}