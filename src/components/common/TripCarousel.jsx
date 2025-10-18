// src/components/TripCarousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import toursData from './../../tours.json';
import { Link } from 'react-router-dom';
import Button from "./Button";

// Flatten all tours from imported JSON data and preserve region info
const tours = toursData.regions.flatMap(region =>
    region.tours.map(tour => ({
        ...tour,
        region: region.name
    }))
);

export default function TripCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(0);
    const [bubbleStartIndex, setBubbleStartIndex] = useState(0);
    const [hoveredPill, setHoveredPill] = useState(null);
    const autoPlayRef = useRef(null);
    const pauseTimeoutRef = useRef(null);

    const currentTour = tours[currentIndex];
    const maxVisibleBubbles = 6;
    const showBubbleNavigation = tours.length > maxVisibleBubbles;

    // Auto-play functionality
    useEffect(() => {
        if (isAutoPlaying && tours.length > 1) {
            autoPlayRef.current = setInterval(() => {
                handleNext();
            }, 4000);
        }
        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isAutoPlaying, currentIndex]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
            if (pauseTimeoutRef.current) {
                clearTimeout(pauseTimeoutRef.current);
            }
        };
    }, []);

    // Pause auto-play temporarily when user interacts
    const pauseAutoPlay = () => {
        setIsAutoPlaying(false);
        if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current);
        }
        pauseTimeoutRef.current = setTimeout(() => {
            setIsAutoPlaying(true);
        }, 6000);
    };

    const handleNext = () => {
        if (tours.length <= 1) return;
        setDirection(1);
        const nextIndex = (currentIndex + 1) % tours.length;
        setCurrentIndex(nextIndex);

        // Auto-adjust bubble view
        if (showBubbleNavigation) {
            if (nextIndex >= bubbleStartIndex + maxVisibleBubbles) {
                setBubbleStartIndex(nextIndex - maxVisibleBubbles + 1);
            } else if (nextIndex < bubbleStartIndex) {
                setBubbleStartIndex(nextIndex);
            }
        }
    };

    const handlePrev = () => {
        if (tours.length <= 1) return;
        setDirection(-1);
        const prevIndex = (currentIndex - 1 + tours.length) % tours.length;
        setCurrentIndex(prevIndex);

        // Auto-adjust bubble view
        if (showBubbleNavigation) {
            if (prevIndex < bubbleStartIndex) {
                setBubbleStartIndex(prevIndex);
            } else if (prevIndex >= bubbleStartIndex + maxVisibleBubbles) {
                setBubbleStartIndex(prevIndex - maxVisibleBubbles + 1);
            }
        }
    };

    const handlePillClick = (index) => {
        if (index === currentIndex) return;
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
        pauseAutoPlay();

        // Auto-adjust bubble view to show the selected tour
        if (showBubbleNavigation) {
            if (index < bubbleStartIndex) {
                setBubbleStartIndex(index);
            } else if (index >= bubbleStartIndex + maxVisibleBubbles) {
                setBubbleStartIndex(index - maxVisibleBubbles + 1);
            }
        }
    };

    const handleBubbleNext = () => {
        if (bubbleStartIndex + maxVisibleBubbles < tours.length) {
            setBubbleStartIndex(prev => prev + 1);
        }
    };

    const handleBubblePrev = () => {
        if (bubbleStartIndex > 0) {
            setBubbleStartIndex(prev => prev - 1);
        }
    };

    const handleSwipe = (event, info) => {
        if (tours.length <= 1) return;
        if (Math.abs(info.offset.x) > 100) {
            if (info.offset.x > 0) {
                handlePrev();
            } else {
                handleNext();
            }
            pauseAutoPlay();
        }
    };

    // Animation variants
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
    };

    const backgroundVariants = {
        enter: { opacity: 0 },
        center: { opacity: 0.3 },
        exit: { opacity: 0 },
    };

    // Handle edge case where tours array might be empty
    if (!tours || tours.length === 0) {
        return (
            <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                <div className="text-white text-xl">No tours available</div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen max-h-screen overflow-hidden">
            {/* Blurred Background */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`bg-${currentTour.id}`}
                    className="absolute inset-0 bg-cover bg-center filter blur-lg"
                    style={{
                        backgroundImage: `url(${currentTour.image})`,
                        opacity: 0.5
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                />
            </AnimatePresence>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-full overflow-y-auto overflow-x-hidden px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-24 sm:pb-28 md:pb-32 lg:pb-24 font-general gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {/* Watermark Name */}
                <AnimatePresence mode="wait">
                    <motion.h1
                        key={`watermark-${currentTour.id}`}
                        layoutId="watermark"
                        className="absolute text-[1.2rem] sm:text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] xl:text-[6.5rem] font-extrabold text-white/10 select-none pointer-events-none font-myCustomFont overflow-hidden"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            maxWidth: '95vw',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {currentTour.name}
                    </motion.h1>
                </AnimatePresence>

                {/* Region Name */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`region-${currentTour.id}`}
                        className="flex-shrink-0 lg:mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-white/10 backdrop-blur-lg rounded-full px-4 sm:px-6 py-1.5 sm:py-2 border border-white/20 max-w-[90vw]">
                            <span className="text-white/90 text-xs sm:text-sm md:text-base font-medium truncate block">
                                {currentTour.region}
                            </span>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Image and Content Container - Side by Side on Desktop */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 sm:gap-5 lg:gap-8 xl:gap-12 w-full max-w-7xl flex-shrink-0">
                    {/* Main Image Card */}
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentTour.id}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30, duration: 0.6 },
                                opacity: { duration: 0.4 },
                                scale: { duration: 0.4 }
                            }}
                            drag={tours.length > 1 ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleSwipe}
                            className={`relative flex-shrink-0 max-w-[90vw] lg:max-w-none ${tours.length > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
                        >
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 shadow-2xl border border-white/20">
                                <img
                                    src={currentTour.image}
                                    alt={currentTour.name}
                                    className="w-64 sm:w-72 md:w-80 lg:w-[22rem] xl:w-[26rem] h-40 sm:h-48 md:h-56 lg:h-[16rem] xl:h-[18rem] object-cover rounded-xl sm:rounded-2xl"
                                    draggable={false}
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Tour Information */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`info-${currentTour.id}`}
                            className="text-center lg:text-left max-w-4xl lg:max-w-md xl:max-w-lg w-full flex-shrink-0 px-2 sm:px-4 lg:px-0 flex flex-col justify-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 sm:mb-3 tracking-tight font-myCustomFont px-2 lg:px-0">
                                {currentTour.name}
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg lg:text-base xl:text-lg text-white/90 mb-4 sm:mb-5 leading-relaxed px-2 sm:px-4 lg:px-0 line-clamp-3 lg:line-clamp-4">
                                {currentTour.caption}
                            </p>

                            {/* Tour Details - Vertical Stack */}
                            <div className="flex flex-col items-center lg:items-start gap-2 sm:gap-2.5 text-xs sm:text-sm md:text-base text-white/90 mb-4 sm:mb-5">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20 w-full max-w-[280px] sm:max-w-[300px] lg:max-w-full justify-center lg:justify-start">
                                    <FaClock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                                    <span className="text-center lg:text-left truncate">{currentTour.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20 w-full max-w-[280px] sm:max-w-[300px] lg:max-w-full justify-center lg:justify-start">
                                    <FaCalendarAlt className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                                    <span className="text-center lg:text-left truncate">{currentTour.period}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20 w-full max-w-[280px] sm:max-w-[300px] lg:max-w-full justify-center lg:justify-start">
                                    <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 flex-shrink-0" />
                                    <span className="text-center lg:text-left truncate">Starts in <span className="font-bold">{currentTour.starting}</span></span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20 w-full max-w-[280px] sm:max-w-[300px] lg:max-w-full justify-center lg:justify-start">
                                    <FaDollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                                    <span className="text-center lg:text-left font-semibold truncate">{currentTour.cost}</span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Explore All Tours Button - Outside AnimatePresence so it stays persistent */}
                <Link to="/tours">
                    <Button title="Explore all Tours" containerClass="text-black mt-10 cursor-pointer" />
                </Link>
            </div>
            {/* Navigation Arrows - Only show if more than 1 tour */}
            {tours.length > 1 && (
                <>
                    <button
                        onClick={() => { handlePrev(); pauseAutoPlay(); }}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                        aria-label="Previous tour"
                    >
                        <FaChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <button
                        onClick={() => { handleNext(); pauseAutoPlay(); }}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                        aria-label="Next tour"
                    >
                        <FaChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </>
            )}

            {/* Modern Pills Navigation - Only show if more than 1 tour */}
            {tours.length > 1 && (
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] max-w-[95vw]">
                    <div className="bg-white/10 backdrop-blur-lg rounded-full px-2 sm:px-3 py-2 sm:py-2.5 shadow-2xl border border-white/20 flex items-center gap-2 relative">
                        {/* Previous Bubble Navigation Button */}
                        {showBubbleNavigation && (
                            <button
                                onClick={handleBubblePrev}
                                disabled={bubbleStartIndex === 0}
                                className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${bubbleStartIndex === 0
                                    ? 'opacity-30 cursor-not-allowed'
                                    : 'hover:bg-white/20 cursor-pointer'
                                    }`}
                                aria-label="Previous tours"
                            >
                                <FaChevronLeft className="w-3 h-3 text-white" />
                            </button>
                        )}

                        {/* Pills Container */}
                        <div className="overflow-visible relative">
                            <div className="flex items-center gap-1.5 sm:gap-2 relative">
                                {/* Active pill background */}
                                <motion.div
                                    className="absolute bg-brown-100 rounded-full shadow-lg w-8 h-8 sm:w-9 sm:h-9"
                                    layoutId="activePillTripCarousel"
                                    animate={{
                                        left: typeof window !== 'undefined' && window.innerWidth >= 640
                                            ? `${(currentIndex - bubbleStartIndex) * 44}px` // sm breakpoint: 36px width + 8px gap
                                            : `${(currentIndex - bubbleStartIndex) * 38}px`  // mobile: 32px width + 6px gap
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30
                                    }}
                                />

                                {/* Tour Pills */}
                                {tours
                                    .slice(
                                        bubbleStartIndex,
                                        showBubbleNavigation ? bubbleStartIndex + maxVisibleBubbles : tours.length
                                    )
                                    .map((tour, relativeIndex) => {
                                        const actualIndex = bubbleStartIndex + relativeIndex;
                                        const isHovered = hoveredPill === actualIndex;
                                        return (
                                            <div key={tour.id} className="relative">
                                                {/* Tooltip - Positioned above */}
                                                {isHovered && (
                                                    <div
                                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none z-[200]"
                                                    >
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                            transition={{ duration: 0.15 }}
                                                            className="whitespace-nowrap"
                                                        >
                                                            <div className="bg-gray-900 text-white text-xs sm:text-sm px-3 py-2 rounded-lg shadow-2xl border border-white/40">
                                                                <div className="font-semibold">{tour.name}</div>
                                                                <div className="text-[10px] sm:text-xs text-white/70 mt-0.5">{tour.region}</div>
                                                            </div>
                                                            {/* Tooltip Arrow */}
                                                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px]">
                                                                <div className="w-2.5 h-2.5 bg-gray-900 border-r border-b border-white/40 rotate-45"></div>
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                )}

                                                <button
                                                    onClick={() => handlePillClick(actualIndex)}
                                                    onMouseEnter={() => setHoveredPill(actualIndex)}
                                                    onMouseLeave={() => setHoveredPill(null)}
                                                    className={`relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-300 flex items-center justify-center text-xs font-semibold flex-shrink-0 ${actualIndex === currentIndex
                                                        ? 'text-white scale-110'
                                                        : 'text-white/60 hover:text-white/80 hover:scale-105'
                                                        }`}
                                                    aria-label={`Go to ${tour.name}`}
                                                >
                                                    {actualIndex + 1}
                                                </button>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>                        {/* Next Bubble Navigation Button */}
                        {showBubbleNavigation && (
                            <button
                                onClick={handleBubbleNext}
                                disabled={bubbleStartIndex + maxVisibleBubbles >= tours.length}
                                className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${bubbleStartIndex + maxVisibleBubbles >= tours.length
                                    ? 'opacity-30 cursor-not-allowed'
                                    : 'hover:bg-white/20 cursor-pointer'
                                    }`}
                                aria-label="Next tours"
                            >
                                <FaChevronRight className="w-3 h-3 text-white" />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}