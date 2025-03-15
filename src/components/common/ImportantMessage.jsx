import React, { useState, useEffect } from 'react';

const ImportantMessage = () => {
    const [showGuide, setShowGuide] = useState(false);

    useEffect(() => {
        // Check if first visit or last visit was more than 30 days ago
        const lastVisit = localStorage.getItem('lastVisitTimestamp');
        const currentTime = new Date().getTime();

        // Check if this is first visit or if it's been more than 30 days
        if (!lastVisit || (currentTime - parseInt(lastVisit)) > (30 * 24 * 60 * 60 * 1000)) {
            const timer = setTimeout(() => {
                setShowGuide(true);
                localStorage.setItem('lastVisitTimestamp', currentTime.toString());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);

    const closeGuide = () => {
        setShowGuide(false);
    };

    if (!showGuide) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Semi-transparent overlay that darkens everything except target */}
            <div className="absolute inset-0 bg-opacity-70" onClick={closeGuide}></div>

            {/* This creates a "spotlight" effect on the audio button */}
            <div
                className="absolute right-1 top-4 z-10"
                style={{
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.9)',
                    // border:'2px solid',
                    // borderRadius: '50%',
                    // width: '40px',
                    // height: '40px',
                    backgroundColor: 'transparent'
                }}
            >
                {/* This div is just to create the cutout effect */}
            </div>

            {/* Guide dialog box */}
            <div className="!text-white absolute right-10 top-16 z-20 w-64 rounded-lg border bg-black/10 p-4 ">
                <h3 className="mb-2 text-lg font-bold">Audio Controls</h3>
                <p className="mb-4">Click the audio icon to toggle sound on/off during your experience!</p>
                <button
                    onClick={closeGuide}
                    className="action-button"
                >
                    Got it!
                </button>
            </div>
        </div>
    );
};

export default ImportantMessage;