import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TiLocationArrow } from "react-icons/ti";
import { FaClock, FaCalendarAlt, FaMoneyBillWave, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import toursData from "../../tours.json";
import DecryptedText from "../styling/DecryptedText";
import Balatro from "../styling/Balatro";

const Tours = () => {
    const [activeRegion, setActiveRegion] = useState("all");
    const [filteredTours, setFilteredTours] = useState([]);

    // Flatten and prepare tour data
    const allTours = toursData.regions.flatMap((region) =>
        region.tours.map((tour) => ({
            ...tour,
            regionId: region.id,
            regionName: region.name,
        }))
    );

    useEffect(() => {
        if (activeRegion === "all") {
            setFilteredTours(allTours);
        } else {
            setFilteredTours(allTours.filter((tour) => tour.regionId === activeRegion));
        }
    }, [activeRegion]);

    return (
        <div className="min-h-screen w-screen bg-neutral-black text-white">
            {/* Hero Intro Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background with gradient overlay like home page */}
                <div className="absolute inset-0 bg-neutral-black">
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-black/60 via-neutral-black/80 to-neutral-black z-10" />
                </div>

                <Balatro
                    isRotate={false}
                    mouseInteraction={true}
                    pixelFilter={1000}
                    color1="#763919"
                    color2="#102103"
                    color3="#010b18"
                />

                <div className="tours-intro relative z-20 text-center px-6">
                    <h1 className="special-font hero-heading text-blue-75 mb-6">
                        EPIC TOURS
                    </h1>
                    <p className="font-robert-regular text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-neutral-gray leading-relaxed mb-8">
                        Embark on unforgettable motorcycle journeys through the world's most stunning landscapes
                    </p>
                </div>
                <div className="absolute bottom-20 w-full px-6 z-20">
                    <div className="flex gap-4 justify-center items-center">
                        <TiLocationArrow className="text-brown-100 text-3xl sm:text-4xl animate-bounce" />
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                        <p className="font-general text-xs sm:text-sm text-neutral-gray uppercase tracking-widest animate-pulse">Scroll to explore</p>
                    </div>
                </div>
            </section>

            {/* Tours Grid Section */}
            <section className="relative tours-grid px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-32 mt-20 z-30">
                <div className="section-heading text-center mb-12">
                    <DecryptedText
                        text="Choose Your Adventure"
                        parentClassName="flex justify-center"
                        className="font-myCustomFont font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-blue-75"
                        encryptedClassName="font-myCustomFont font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-blue-75 opacity-40"
                        characters="█▓▒░▀▄▌▐"
                        animateOn="view"
                        revealDirection="start"
                        sequential
                        useOriginalCharsOnly={false}
                        speed={40}
                    />
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    <FilterButton
                        label="All Expeditions"
                        isActive={activeRegion === "all"}
                        onClick={() => setActiveRegion("all")}
                    />
                    {toursData.regions.map((region) => (
                        <FilterButton
                            key={region.id}
                            label={region.name}
                            isActive={activeRegion === region.id}
                            onClick={() => setActiveRegion(region.id)}
                        />
                    ))}
                </div>

                {/* Dynamic Grid - Single Column */}
                <motion.div
                    layout
                    className="flex flex-col gap-8 md:gap-12"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredTours.map((tour) => (
                            <TourCard key={tour.id} tour={tour} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredTours.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 text-gray-500"
                    >
                        No tours found for this region.
                    </motion.div>
                )}
            </section>
        </div>
    );
};

const FilterButton = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 overflow-hidden group ${isActive ? "text-white" : "text-gray-400 hover:text-white"
            }`}
    >
        {isActive && (
            <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-brown-500"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
        )}
        {!isActive && (
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
        )}
        <span className="relative z-10 uppercase">{label}</span>
    </button>
);

const TourCard = ({ tour }) => {
    const tourSlug = tour.name.toLowerCase().replace(/\s+/g, "-");
    const highlights = tour.highlights ? tour.highlights.slice(0, 4) : [];

    // Format duration: "9 Days and 8 Nights" -> "9D/8N"
    const formattedDuration = tour.duration.replace(/(\d+)\s*days?\s*(?:and|&)?\s*(\d+)\s*nights?/i, "$1d / $2n");

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="group relative w-full rounded-3xl overflow-hidden cursor-pointer shadow-2xl bg-[#1c1c1c]"
        >
            <Link to={`/tours/${tourSlug}`} className="block w-full">
                {/* 
                    Container Aspect Ratio:
                    - Mobile: Taller (3:4) to fit content vertically
                    - Desktop: Wider (21:9 or similar) for cinematic look
                */}
                <div className="relative h-[600px] md:h-[450px] w-full overflow-hidden">

                    {/* Background Image */}
                    <motion.img
                        src={tour.image.startsWith('/') ? tour.image : `/${tour.image}`}
                        alt={tour.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 md:opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                    {/* Top Badge */}
                    <div className="absolute top-6 left-6 z-20">
                        <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                            {tour.regionName}
                        </span>
                    </div>

                    {/* Content Container */}
                    <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end z-20">

                        {/* Title & Caption - Moves up on desktop hover */}
                        <div className="transform transition-all duration-500 md:group-hover:-translate-y-4 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 md:bg-transparent md:border-transparent md:backdrop-blur-none md:group-hover:bg-white/5 md:group-hover:border-white/10 md:group-hover:backdrop-blur-md">
                            <h2 className="font-myCustomFont text-4xl md:text-5xl text-white mb-3 leading-none drop-shadow-lg group-hover:text-brown-300 transition-colors duration-300">
                                {tour.name}
                            </h2>
                            <p className="text-gray-200 text-sm md:text-base font-general line-clamp-2 md:max-w-2xl group-hover:text-white transition-colors duration-300">
                                {tour.caption}
                            </p>
                        </div>

                        {/* 
                            Details Section:
                            - Mobile: Always visible
                            - Desktop: Hidden by default, slides up on hover
                        */}
                        <div className="mt-6 md:mt-0 md:grid md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                            <div className="overflow-hidden">
                                {/* Glass Container for Details */}
                                <div className="md:mt-4 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col md:flex-row gap-6 md:gap-10">

                                    {/* Highlights List */}
                                    <div className="flex-1">
                                        <h3 className="text-brown-500 text-xs font-bold uppercase tracking-widest mb-3">Highlights</h3>
                                        <ul className="space-y-2">
                                            {highlights.map((highlight, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-gray-200 text-sm">
                                                    <FaStar className="text-brown-500 mt-1 flex-shrink-0 text-[10px]" />
                                                    <span className="line-clamp-1">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Stats & Action */}
                                    <div className="flex flex-col gap-4 min-w-[200px]">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <FaClock className="text-brown-500" />
                                                    <span className="text-sm font-medium">Duration</span>
                                                </div>
                                                <span className="text-white font-myCustomFont">{formattedDuration}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <FaMoneyBillWave className="text-brown-500" />
                                                    <span className="text-sm font-medium">Cost</span>
                                                </div>
                                                <span className="text-white font-myCustomFont">{tour.cost}</span>
                                            </div>
                                        </div>

                                        <div className="w-full py-3 bg-white text-black font-general text-center rounded-xl hover:bg-brown-500 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 mt-auto">
                                            <span>VIEW DETAILS</span>
                                            <TiLocationArrow className="text-lg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default Tours;
