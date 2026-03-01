import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaMoneyBillWave, FaPlay, FaPause } from 'react-icons/fa';
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
    const [isPlaying, setIsPlaying] = useState(true); // User's master switch
    const [direction, setDirection] = useState(0);

    // Performance optimization: Use MotionValue for progress to avoid re-renders
    const progress = useMotionValue(0);

    const currentTour = tours[currentIndex];
    const AUTO_PLAY_DURATION = 5000;
    const RADIUS = 18;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    // Transform progress (0-100) to strokeDashoffset (CIRCUMFERENCE-0)
    const strokeDashoffset = useTransform(progress, [0, 100], [CIRCUMFERENCE, 0]);

    // Animation frame loop for smooth progress
    useAnimationFrame((time, delta) => {
        if (isPlaying && tours.length > 1) {
            const currentProgress = progress.get();
            // Calculate increment based on delta time (ms)
            const increment = (delta / AUTO_PLAY_DURATION) * 100;
            const newProgress = currentProgress + increment;

            if (newProgress >= 100) {
                progress.set(0);
                handleNext();
            } else {
                progress.set(newProgress);
            }
        }
    });

    // Reset progress when index changes manually (handled in navigation functions)
    // But we also need to ensure it stays 0 if we just switched.
    // The handleNext/Prev functions set it to 0.

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        if (tours.length <= 1) return;
        setDirection(1);
        progress.set(0); // Reset progress immediately
        setCurrentIndex((prev) => (prev + 1) % tours.length);
    };

    const handlePrev = () => {
        if (tours.length <= 1) return;
        setDirection(-1);
        progress.set(0); // Reset progress immediately
        setCurrentIndex((prev) => (prev - 1 + tours.length) % tours.length);
    };

    const handleDotClick = (index) => {
        if (index === currentIndex) return;
        setDirection(index > currentIndex ? 1 : -1);
        progress.set(0); // Reset progress immediately
        setCurrentIndex(index);
    };

    // Shared swipe handler used by both image and text area
    const handleSwipe = (event, info) => {
        if (tours.length <= 1) return;
        const swipeThreshold = 50;
        if (info.offset.x < -swipeThreshold) {
            handleNext();
        } else if (info.offset.x > swipeThreshold) {
            handlePrev();
        }
    };

    // Animation variants
    const imageVariants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 1.2,
            rotateY: direction > 0 ? 45 : -45,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.8, ease: "easeOut" },
                rotateY: { duration: 0.6, ease: "easeOut" }
            }
        },
        exit: (direction) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.9,
            rotateY: direction < 0 ? 45 : -45,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 }
            }
        }),
    };

    const contentContainerVariants = {
        enter: { opacity: 0 },
        center: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const itemVariants = {
        enter: { opacity: 0, y: 20 },
        center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
    };

    if (!tours || tours.length === 0) {
        return <div className="text-white text-center py-20">No tours available</div>;
    }

    return (
        <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 perspective-1000">
            <div className="relative bg-neutral-900/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl min-h-[600px] md:min-h-[700px] flex flex-col md:flex-row">

                {/* Image Section (Top on mobile, Left on desktop) */}
                <div className="relative w-full md:w-3/5 h-[350px] md:h-auto overflow-hidden group z-10 cursor-grab active:cursor-grabbing">
                    <div className="w-full h-full relative">
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.div
                                key={currentTour.id}
                                className="absolute inset-0 w-full h-full"
                                custom={direction}
                                variants={imageVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={handleSwipe}
                            >
                                <img
                                    src={currentTour.image}
                                    alt={currentTour.name}
                                    className="w-full h-full object-cover"
                                    draggable={false}
                                />
                                {/* Subtle Zoom Effect on Image */}
                                <motion.div
                                    className="absolute inset-0 bg-black/10"
                                    animate={{ scale: [1, 1.05] }}
                                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Image Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/90 pointer-events-none" />

                        {/* Region Tag (Top Left) */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 z-20">
                            <motion.span
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="px-5 py-2 bg-black/40 backdrop-blur-md border border-white/60 rounded-full text-white text-sm font-myCustomFont tracking-widest uppercase shadow-lg whitespace-nowrap"
                            >
                                {currentTour.region}
                            </motion.span>
                        </div>
                    </div>
                </div>

                {/* Content Section (Bottom on mobile, Right on desktop) */}
                {/* 
                    FIX: Wrapped with motion.div with drag="x" so the text panel
                    is also swipeable, matching the image panel behaviour.
                    dragConstraints={left:0,right:0} + dragElastic=0 prevents
                    any visible movement — only the onDragEnd swipe fires.
                    pointer-events on interactive children are unaffected.
                */}
                <motion.div
                    className="w-full md:w-2/5 relative z-20 flex flex-col cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0}
                    onDragEnd={handleSwipe}
                >
                    {/* Enhanced Glass Background for Text Area */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl border-l border-white/10 pointer-events-none" />

                    {/* Subtle Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                            backgroundSize: '24px 24px'
                        }}
                    />

                    <div className="relative h-full p-5 sm:p-8 md:p-12 flex flex-col justify-center pb-16 sm:pb-8 md:pb-12">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brown-500/20 rounded-full blur-[100px] pointer-events-none" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTour.id}
                                variants={contentContainerVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="flex flex-col gap-5 sm:gap-8 relative"
                            >
                                <motion.div variants={itemVariants} className="relative">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-myCustomFont leading-[0.9] mb-4 sm:mb-6 tracking-tight drop-shadow-lg">
                                        {currentTour.name}
                                    </h2>
                                    {/* Improved Underline */}
                                    <div className="h-1 sm:h-1.5 w-24 sm:w-32 bg-gradient-to-r from-brown-500 via-brown-400 to-transparent rounded-full shadow-[0_0_15px_rgba(172,110,74,0.5)]" />
                                </motion.div>

                                <motion.p variants={itemVariants} className="text-gray-300 font-general text-sm sm:text-base md:text-lg leading-relaxed line-clamp-2 sm:line-clamp-3">
                                    {currentTour.caption}
                                </motion.p>

                                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-6">
                                    <div className="flex items-start gap-3 text-gray-300 group/item">
                                        <div className="p-2.5 bg-white/5 rounded-xl text-brown-300 group-hover/item:bg-brown-500 group-hover/item:text-white transition-colors duration-300 border border-white/5 group-hover/item:border-brown-400/50">
                                            <FaClock size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Duration</span>
                                            <span className="text-sm font-medium text-white">{currentTour.duration}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 text-gray-300 group/item">
                                        <div className="p-2.5 bg-white/5 rounded-xl text-brown-300 group-hover/item:bg-brown-500 group-hover/item:text-white transition-colors duration-300 border border-white/5 group-hover/item:border-brown-400/50">
                                            <FaCalendarAlt size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Period</span>
                                            <span className="text-sm font-medium text-white">{currentTour.period}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 text-gray-300 group/item">
                                        <div className="p-2.5 bg-white/5 rounded-xl text-brown-300 group-hover/item:bg-brown-500 group-hover/item:text-white transition-colors duration-300 border border-white/5 group-hover/item:border-brown-400/50">
                                            <FaMapMarkerAlt size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Start</span>
                                            <span className="text-sm font-medium text-white">{currentTour.starting}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 text-gray-300 group/item">
                                        <div className="p-2.5 bg-white/5 rounded-xl text-brown-300 group-hover/item:bg-brown-500 group-hover/item:text-white transition-colors duration-300 border border-white/5 group-hover/item:border-brown-400/50">
                                            <FaMoneyBillWave size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Cost</span>
                                            <span className="text-sm font-medium text-white">{currentTour.cost}</span>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants} className="pt-4 sm:pt-6 flex items-center gap-4 sm:gap-6">
                                    <Link to="/tours" onClick={(e) => e.stopPropagation()}>
                                        <Button
                                            title="View Details"
                                            containerClass="!bg-brown-500 !text-white hover:!bg-brown-600 transition-all duration-300 !px-8 !py-4 !text-sm !font-bold !tracking-wider"
                                        />
                                    </Link>

                                    {/* Persistent Play/Pause Toggle Button */}
                                    <div className="relative w-10 h-10 flex items-center justify-center">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle
                                                cx="20"
                                                cy="20"
                                                r={RADIUS}
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                fill="transparent"
                                                className="text-white/10"
                                            />
                                            {/* Progress Ring - always visible, animates when playing */}
                                            <motion.circle
                                                cx="20"
                                                cy="20"
                                                r={RADIUS}
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                fill="transparent"
                                                strokeDasharray={CIRCUMFERENCE}
                                                style={{ strokeDashoffset }}
                                                className="text-brown-500"
                                            />
                                        </svg>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                                            className="absolute inset-0 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10"
                                            aria-label={isPlaying ? "Pause" : "Play"}
                                        >
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={isPlaying ? "pause" : "play"}
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {isPlaying ? (
                                                        <FaPause size={12} />
                                                    ) : (
                                                        <FaPlay size={12} className="ml-0.5" />
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 md:justify-start md:left-12 md:bottom-12">
                            {tours.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => { e.stopPropagation(); handleDotClick(index); }}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${index === currentIndex
                                        ? 'w-10 bg-gradient-to-r from-brown-500 to-brown-300'
                                        : 'w-2 bg-white/20 hover:bg-white/40 hover:w-4'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}