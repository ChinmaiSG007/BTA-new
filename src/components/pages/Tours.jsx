import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TiLocationArrow } from "react-icons/ti";
import { FaClock, FaCalendarAlt, FaMoneyBillWave, FaMapMarkerAlt, FaStar, FaChevronDown } from "react-icons/fa";
import toursData from "../../tours.json";
import ToursHeroCarousel from "../styling/ToursHeroCarousel";

// Extract unique months from tour periods for date filter
const getMonthsFromPeriod = (period) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months.filter((m) => period.toLowerCase().includes(m.toLowerCase()));
};

const Tours = () => {
    const [searchParams] = useSearchParams();
    const [activeRegion, setActiveRegion] = useState("all");
    const [activeMonth, setActiveMonth] = useState("all");
    const [filteredTours, setFilteredTours] = useState([]);

    // Apply month filter from URL search params on mount
    useEffect(() => {
        const monthParam = searchParams.get("month");
        if (monthParam) {
            setActiveMonth(monthParam);
        }
    }, [searchParams]);

    // Flatten and prepare tour data
    const allTours = toursData.regions.flatMap((region) =>
        region.tours.map((tour) => ({
            ...tour,
            regionId: region.id,
            regionName: region.name,
        }))
    );

    // Get unique months from all tours, in calendar order
    const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const availableMonths = [...new Set(allTours.flatMap((t) => getMonthsFromPeriod(t.period)))]
        .sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));

    useEffect(() => {
        let result = allTours;
        if (activeRegion !== "all") {
            result = result.filter((tour) => tour.regionId === activeRegion);
        }
        if (activeMonth !== "all") {
            result = result.filter((tour) => {
                const tourMonths = getMonthsFromPeriod(tour.period);
                return tourMonths.includes(activeMonth);
            });
        }
        setFilteredTours(result);
    }, [activeRegion, activeMonth]);

    return (
        <div className="min-h-screen w-screen bg-neutral-black text-white">
            {/* Hero Carousel Section */}
            <ToursHeroCarousel />

            {/* Tours Grid Section */}
            <section className="relative tours-grid px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-32 mt-8 z-30">

                {/* Filter Capsules */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-4">
                    {/* Region Filter */}
                    <CapsuleDropdown
                        icon={<FaMapMarkerAlt className="w-4 h-4" />}
                        label="Region"
                        value={activeRegion}
                        onChange={setActiveRegion}
                        isActive={activeRegion !== "all"}
                        options={[
                            { value: "all", label: "All Regions" },
                            ...toursData.regions.map((r) => ({ value: r.id, label: r.name })),
                        ]}
                    />

                    {/* Month Filter */}
                    <CapsuleDropdown
                        icon={<FaCalendarAlt className="w-4 h-4" />}
                        label="Month"
                        value={activeMonth}
                        onChange={setActiveMonth}
                        isActive={activeMonth !== "all"}
                        options={[
                            { value: "all", label: "All Months" },
                            ...availableMonths.map((m) => ({ value: m, label: m })),
                        ]}
                    />
                </div>

                {/* Reset Filter */}
                {(activeRegion !== "all" || activeMonth !== "all") && (
                    <div className="flex justify-center mb-16">
                        <button
                            type="button"
                            onClick={() => { setActiveRegion("all"); setActiveMonth("all"); }}
                            className="font-general text-xs text-white/40 hover:text-white uppercase tracking-wider transition-colors duration-300 flex items-center gap-1.5 cursor-pointer"
                        >
                            <span className="text-sm">✕</span> Reset Filters
                        </button>
                    </div>
                )}

                {(activeRegion === "all" && activeMonth === "all") && (
                    <div className="mb-16" />
                )}

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

const CapsuleDropdown = ({ icon, label, value, onChange, options, isActive }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    const selectedLabel = options.find((o) => o.value === value)?.label || "";

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full group"
            >
                <div className={`relative h-full rounded-full bg-[#1c1c1c] px-5 py-3 transition-all duration-500 hover:border-white/[0.15] hover:-translate-y-0.5 border ${isActive ? "border-brown-300" : "border-white/[0.06]"
                    }`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full pointer-events-none" />
                    <div className="relative z-10 flex items-center gap-3.5">
                        <div className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 ${isActive
                            ? "border-brown-300 bg-brown-500/20 text-brown-100"
                            : "border-white/[0.1] bg-white/[0.04] text-white/60 group-hover:bg-white/[0.08] group-hover:text-white group-hover:border-white/[0.2]"
                            }`}>
                            {icon}
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                            <p className="text-white/40 text-[9px] uppercase tracking-[0.2em] font-general leading-none mb-0.5">{label}</p>
                            <p className={`font-general text-xs font-medium truncate ${isActive ? "text-brown-100" : "text-white"}`}>{selectedLabel}</p>
                        </div>
                        <FaChevronDown className={`w-3 h-3 text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </div>
                </div>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-white/[0.08] bg-[#1c1c1c] backdrop-blur-xl shadow-2xl overflow-hidden">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-5 py-3 font-general text-xs font-medium transition-all duration-200 cursor-pointer ${value === opt.value
                                ? "bg-green-500/20 text-green-300 border-l-2 border-green-500"
                                : "text-white/70 hover:bg-white/[0.06] hover:text-white border-l-2 border-transparent"
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

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
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${tour.isSoldOut ? 'grayscale-[40%] brightness-75' : ''}`}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 md:opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                    {/* Top Badges */}
                    <div className="absolute top-6 left-6 z-20 flex flex-wrap items-center gap-2">
                        <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                            {tour.regionName}
                        </span>
                        {tour.isUpcomingTour && (
                            <span className="px-3 py-1.5 bg-amber-500/30 backdrop-blur-md border border-amber-300/40 rounded-full text-[10px] sm:text-xs font-general uppercase tracking-wider text-white">
                                Upcoming Tour
                            </span>
                        )}
                    </div>

                    {/* Sold Out Banner */}
                    {tour.isSoldOut && (
                        <div className="absolute top-6 right-0 sm:top-8 sm:right-0 z-20">
                            <div className="relative bg-red-600/60 border border-red-600 text-white font-bold uppercase tracking-wider text-[10px] sm:text-xs px-6 sm:px-8 py-1.5 sm:py-2 shadow-lg shadow-red-600/40"
                                style={{
                                    clipPath: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)',
                                }}>
                                <span className="ml-1">Sold Out</span>
                            </div>
                        </div>
                    )}

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

                                        {tour.isSoldOut ? (
                                            <div className="w-full py-3 bg-red-600/20 text-red-400 font-general text-center rounded-xl border border-red-500/30 flex items-center justify-center gap-2 mt-auto cursor-not-allowed">
                                                <span>SOLD OUT</span>
                                            </div>
                                        ) : (
                                            <div className="w-full py-3 bg-white text-black font-general text-center rounded-xl hover:bg-brown-500 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 mt-auto">
                                                <span>VIEW DETAILS</span>
                                                <TiLocationArrow className="text-lg" />
                                            </div>
                                        )}
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
