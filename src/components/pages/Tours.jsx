import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";
import toursData from "../../tours.json";
import AnimatedTitle from "../common/AnimatedTitle";
import Button from "../common/Button";
import Balatro from "../styling/Balatro";
import GlassSurface from "../styling/GlassSurface";

gsap.registerPlugin(ScrollTrigger);

const Tours = () => {
    const [activeRegion, setActiveRegion] = useState("all");

    const allTours = toursData.regions.flatMap((region) =>
        region.tours.map((tour) => ({
            ...tour,
            regionId: region.id,
            regionName: region.name,
        }))
    );

    const filteredTours =
        activeRegion === "all"
            ? allTours
            : allTours.filter((tour) => tour.regionId === activeRegion);

    useGSAP(() => {
        // Animate intro section
        gsap.from(".tours-intro", {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
        });


        // Animate tour cards on scroll
        gsap.fromTo(".tour-card",
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".tours-grid",
                    start: "top 70%",
                },
            }
        );
    }, [filteredTours]);


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


            {/* Tours Grid */}
            <section className="tours-grid py-20 px-6 max-w-7xl mx-auto mb-20">
                <AnimatedTitle
                    title="Our <b>Expeditions</b>"
                    containerClass="mt-5 text-center mb-16"
                />

                {/* Filter Section */}
                <section className="py-10 px-6 max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={() => setActiveRegion("all")}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeRegion === "all"
                                ? "bg-[#b87b58] text-[#1c2621]"
                                : "bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
                                }`}
                        >
                            All Tours
                        </button>
                        {toursData.regions.map((region) => (
                            <button
                                key={region.id}
                                onClick={() => setActiveRegion(region.id)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeRegion === region.id
                                    ? "bg-[#b87b58] text-[#1c2621]"
                                    : "bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
                                    }`}
                            >
                                {region.name}
                            </button>
                        ))}
                    </div>
                </section>

                {filteredTours.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-2xl text-gray-400">No tours found for this region.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                        {filteredTours.map((tour, index) => (
                            <TourCard key={tour.id} tour={tour} index={index} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

const TourCard = ({ tour }) => {
    const cardRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useGSAP(() => {
        if (cardRef.current) {
            gsap.fromTo(cardRef.current,
                {
                    opacity: 0,
                    y: 100,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top 90%",
                        once: true,
                    },
                }
            );
        }
    }, []);

    const tourSlug = tour.name.toLowerCase().replace(/\s+/g, "-");
    const displayedHighlights = isExpanded ? tour.highlights : tour.highlights?.slice(0, 4);

    return (
        <div
            ref={cardRef}
            className="tour-card group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-[#1c2621]/60 via-[#1c2621]/40 to-[#1b1b1b]/60 border border-[#496156]/40 hover:border-brown-100/60 transition-all duration-500 hover:-translate-y-2"
            style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
        >
            {/* Glassmorphism shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Image Section */}
            <div className="relative w-full h-[280px] sm:h-[320px] overflow-hidden">
                <img
                    src={tour.image.startsWith('/') ? tour.image : `/${tour.image}`}
                    alt={tour.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c2621]/95 via-[#1c2621]/50 to-transparent" />

                {/* Region Badge with GlassSurface */}
                <div className="absolute top-4 left-4">
                    <GlassSurface
                        width="auto"
                        height={32}
                        borderRadius={16}
                        brightness={40}
                        opacity={0.85}
                        blur={10}
                        className="px-4 py-1.5"
                    >
                        <span className="text-white text-xs font-semibold uppercase tracking-wide whitespace-nowrap">
                            {tour.regionName}
                        </span>
                    </GlassSurface>
                </div>

                {/* Price Badge with GlassSurface */}
                <div className="absolute bottom-4 right-4">
                    <GlassSurface
                        width="auto"
                        height={40}
                        borderRadius={20}
                        brightness={95}
                        opacity={0.95}
                        blur={8}
                        className="px-5 py-2"
                    >
                        <span className="text-white font-bold text-lg whitespace-nowrap">
                            {tour.cost}
                        </span>
                    </GlassSurface>
                </div>
            </div>

            {/* Content Section with Glassmorphism */}
            <div className="relative p-6 space-y-4 bg-gradient-to-b from-transparent to-[#1c2621]/30">
                {/* Tour Name */}
                <h2 className="font-myCustomFont text-2xl sm:text-3xl text-brown-100 group-hover:text-white transition-colors duration-300 leading-tight drop-shadow-lg">
                    {tour.name}
                </h2>

                {/* Caption */}
                <p className="text-base text-neutral-gray font-general leading-relaxed line-clamp-2">
                    {tour.caption}
                </p>

                {/* Highlights Section with Glass Background */}
                {tour.highlights && tour.highlights.length > 0 && (
                    <div className="space-y-3 pt-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-semibold text-brown-100 uppercase tracking-wider">
                                Highlights
                            </h3>
                            {tour.highlights.length > 4 && (
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="text-xs text-brown-100 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/10"
                                >
                                    {isExpanded ? 'Show Less' : `+${tour.highlights.length - 4} More`}
                                </button>
                            )}
                        </div>
                        <ul className="space-y-2">
                            {displayedHighlights?.map((highlight, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-neutral-gray text-xs">
                                    <span className="text-brown-100 mt-0.5 flex-shrink-0">•</span>
                                    <span className="leading-relaxed">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Explore Button with Glassmorphism */}
                <Link to={`/tours/${tourSlug}`} className="block pt-4">
                    <button className="w-full border border-brown-100/90 hover:text-brown-100 backdrop-blur-sm text-brown-100/90 font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                        <span>Explore Tour</span>
                        <TiLocationArrow className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Tours;
