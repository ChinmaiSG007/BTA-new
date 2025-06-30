// src/components/TripCarousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import toursData from './../../tours.json';
import { Link } from 'react-router-dom';

// Flatten all tours from imported JSON data
const tours = toursData.regions.flatMap(region => region.tours);

export default function TripCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(0);
    const autoPlayRef = useRef(null);
    const pauseTimeoutRef = useRef(null);

    const currentTour = tours[currentIndex];

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
        setCurrentIndex((prev) => (prev + 1) % tours.length);
    };

    const handlePrev = () => {
        if (tours.length <= 1) return;
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + tours.length) % tours.length);
    };

    const handlePillClick = (index) => {
        if (index === currentIndex) return;
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
        pauseAutoPlay();
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
        <div className="relative w-full h-screen overflow-hidden">
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
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 pb-32 font-general">
                {/* Watermark Name */}
                <AnimatePresence mode="wait">
                    <motion.h1
                        key={`watermark-${currentTour.id}`}
                        layoutId="watermark"
                        className="absolute text-[1.5rem] sm:text-[3.5rem] md:text-[6rem] lg:text-[7rem] xl:text-[8rem] font-extrabold text-white/10 select-none pointer-events-none whitespace-nowrap font-myCustomFont"
                        style={{ top: '52%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '90vw', whiteSpace: 'nowrap' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {currentTour.name}
                    </motion.h1>
                </AnimatePresence>

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
                        className={`relative ${tours.length > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
                    >
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-2 shadow-2xl border border-white/20">
                            <img
                                src={currentTour.image}
                                alt={currentTour.name}
                                className="w-72 sm:w-80 md:w-96 lg:w-[28rem] h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-2xl"
                                draggable={false}
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Tour Information */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`info-${currentTour.id}`}
                        className="mt-8 text-center max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight font-myCustomFont">
                            {currentTour.name}
                        </h2>
                        <p className="text-lg sm:text-xl text-white/90 mb-6 leading-relaxed px-4">
                            {currentTour.caption}
                        </p>

                        {/* Tour Details */}
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base text-white/80">
                            <div className="flex items-center gap-2">
                                <FaClock className="w-4 h-4 text-blue-400" />
                                <span>{currentTour.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCalendarAlt className="w-4 h-4 text-green-400" />
                                <span>{currentTour.period}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="w-4 h-4 text-red-400" />
                                <span>Starts in {currentTour.starting}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaDollarSign className="w-4 h-4 text-yellow-400" />
                                <span>{currentTour.cost}</span>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows - Only show if more than 1 tour */}
            {tours.length > 1 && (
                <>
                    <button
                        onClick={() => { handlePrev(); pauseAutoPlay(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                        aria-label="Previous tour"
                    >
                        <FaChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={() => { handleNext(); pauseAutoPlay(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                        aria-label="Next tour"
                    >
                        <FaChevronRight className="w-6 h-6" />
                    </button>
                </>
            )}

            {/* Modern Pills Navigation - Only show if more than 1 tour */}
            {tours.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-white/10 backdrop-blur-lg rounded-full px-3 py-3 shadow-2xl border border-white/20">
                        <div className="flex items-center gap-2 relative">
                            {/* Active pill background */}
                            <motion.div
                                className="absolute bg-brown-100 rounded-full shadow-lg"
                                layoutId="activePillTripCarousel"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    left: `${currentIndex * 48}px`, // 40px width + 8px gap
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30
                                }}
                            />

                            {tours.map((tour, index) => (
                                <button
                                    key={tour.id}
                                    onClick={() => handlePillClick(index)}
                                    className={`relative z-10 w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center text-xs font-semibold ${index === currentIndex
                                        ? 'text-white scale-110'
                                        : 'text-white/60 hover:text-white/80 hover:scale-105'
                                        }`}
                                    aria-label={`Go to ${tour.name}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Progress Indicator */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 border border-white/20">
                    <span className="text-white/80 text-sm font-medium">
                        {currentIndex + 1} / {tours.length}
                    </span>
                </div>
            </div>

            {/* Learn More Button */}
            <div className="absolute top-56 left-1/2 -translate-x-1/2 z-20">
                <Link
                    to="/tours"
                    className="inline-flex items-center py-3 bg-white/50 backdrop-blur-lg px-4 border border-white/20 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                    Learn More
                </Link>
            </div>
        </div>
    );
}