import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TiLocationArrow } from "react-icons/ti";
import { FaClock, FaMoneyBillWave, FaStar, FaTimes } from "react-icons/fa";
import toursData from "../../tours.json";

const UpcomingTourModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Find the first upcoming tour from data
    const upcomingTour = useMemo(() => {
        for (const region of toursData.regions) {
            const tour = region.tours.find((t) => t.isUpcomingTour);
            if (tour) return { ...tour, regionName: region.name };
        }
        return null;
    }, []);

    useEffect(() => {
        if (!upcomingTour) return;
        const timer = setTimeout(() => setIsOpen(true), 2000);
        return () => clearTimeout(timer);
    }, [upcomingTour]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    if (!upcomingTour) return null;

    const tourSlug = upcomingTour.name.toLowerCase().replace(/\s+/g, "-");
    const highlights = upcomingTour.highlights ? upcomingTour.highlights.slice(0, 4) : [];
    const formattedDuration = upcomingTour.duration.replace(
        /(\d+)\s*days?\s*(?:and|&)?\s*(\d+)\s*nights?/i,
        "$1d / $2n"
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6"
                    onClick={() => setIsOpen(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 30 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-sm sm:max-w-md lg:max-w-2xl max-h-[95vh] sm:max-h-[90vh] rounded-3xl overflow-y-auto shadow-2xl bg-[#1c1c1c] border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors duration-200 cursor-pointer"
                            aria-label="Close"
                        >
                            <FaTimes className="text-sm" />
                        </button>

                        {/* Announcement Header */}
                        <div className="bg-brown-500/20 border-b border-brown-500/30 px-6 py-3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-brown-500 animate-pulse" />
                            <span className="text-brown-300 text-xs font-general uppercase tracking-widest">
                                Upcoming Tour Announcement
                            </span>
                        </div>

                        {/* Image Section */}
                        <div className="relative h-40 sm:h-48 md:h-56 w-full overflow-hidden">
                            <img
                                src={upcomingTour.image.startsWith("/") ? upcomingTour.image : `/${upcomingTour.image}`}
                                alt={upcomingTour.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-black/30 to-transparent" />

                            {/* Badges on Image */}
                            <div className="absolute top-4 left-4 flex items-center gap-2">
                                <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
                                    {upcomingTour.regionName}
                                </span>
                                <span className="px-3 py-1 bg-amber-500/30 backdrop-blur-md border border-amber-300/40 rounded-full text-[10px] sm:text-xs font-general uppercase tracking-wider text-white">
                                    Upcoming Tour
                                </span>
                            </div>

                            {/* Title over image */}
                            <div className="absolute bottom-4 left-6 right-6">
                                <h2 className="font-myCustomFont text-3xl sm:text-4xl text-white leading-none drop-shadow-lg">
                                    {upcomingTour.name}
                                </h2>
                                <p className="text-gray-300 text-sm font-general mt-1 line-clamp-1">
                                    {upcomingTour.caption}
                                </p>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                            {/* Highlights */}
                            <div>
                                <h3 className="text-brown-500 text-xs font-bold uppercase tracking-widest mb-2 sm:mb-3">
                                    Highlights
                                </h3>
                                <ul className="grid grid-cols-1 gap-2">
                                    {highlights.map((highlight, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                                            <FaStar className="text-brown-500 mt-1 flex-shrink-0 text-[10px]" />
                                            <span className="line-clamp-1">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Stats Row */}
                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 py-3 sm:py-4 border-t border-b border-white/10">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <FaClock className="text-brown-500 text-sm" />
                                    <span className="text-sm font-medium">Duration:</span>
                                    <span className="text-white font-myCustomFont text-sm">{formattedDuration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <FaMoneyBillWave className="text-brown-500 text-sm" />
                                    <span className="text-sm font-medium">Starting at:</span>
                                    <span className="text-white font-myCustomFont text-sm">{upcomingTour.cost}</span>
                                </div>
                            </div>

                            {/* Period Info */}
                            <p className="text-gray-400 text-xs font-general uppercase tracking-wider leading-relaxed">
                                <span className="block sm:inline">Period: {upcomingTour.period}</span> <span className="hidden sm:inline">&nbsp;·&nbsp;</span> <span className="block sm:inline">Starting from {upcomingTour.starting}</span>
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    to={`/tours/${tourSlug}`}
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 py-3 bg-white text-black font-general text-center rounded-xl hover:bg-brown-500 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
                                >
                                    <span>VIEW DETAILS</span>
                                    <TiLocationArrow className="text-lg" />
                                </Link>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 py-3 bg-white/5 text-gray-300 font-general text-center rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                                >
                                    MAYBE LATER
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default UpcomingTourModal;
