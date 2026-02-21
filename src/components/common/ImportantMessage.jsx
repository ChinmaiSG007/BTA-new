import React, { useState, useEffect } from 'react';

const ImportantMessage = () => {
    const [showGuide, setShowGuide] = useState(false);

    useEffect(() => {
        // Check if first visit or last visit was more than 30 days ago
        const lastVisit = localStorage.getItem('lastVisitTimestamp');
        const currentTime = new Date().getTime();

        // Check if this is first visit or if it's been more than 3 days
        if (!lastVisit || (currentTime - parseInt(lastVisit)) > (3 * 24 * 60 * 60 * 1000)) {
            const timer = setTimeout(() => {
                setShowGuide(true);
                localStorage.setItem('lastVisitTimestamp', currentTime.toString());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);

    // Auto-close when user scrolls out of hero section
    useEffect(() => {
        if (!showGuide) return;

        const handleScroll = () => {
            // Close popup if scrolled more than 50% of viewport height
            if (window.scrollY > window.innerHeight * 0.5) {
                setShowGuide(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showGuide]);

    const closeGuide = () => {
        setShowGuide(false);
    };

    if (!showGuide) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* This creates a "spotlight" effect on the audio button */}
            <div
                className="absolute right-4 sm:right-8 top-5 sm:top-6"
                style={{
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.85)',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    backgroundColor: 'transparent'
                }}
                onClick={closeGuide}
            >
            </div>

            {/* Guide dialog box */}
            <div className="text-white absolute right-4 sm:right-10 top-20 z-20 w-64 rounded-lg border border-white/30 bg-black/80 p-4 backdrop-blur-md">
                <h3 className="mb-2 text-lg font-bold">Audio Controls</h3>
                <p className="mb-4 text-gray-200">Click the audio icon to toggle sound on/off during your experience!</p>
                <button
                    onClick={closeGuide}
                    className="w-full py-2 px-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Got it!
                </button>
            </div>
        </div>
    );
};

export default ImportantMessage;