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

gsap.registerPlugin(ScrollTrigger);

const Tours = () => {
    const [activeRegion, setActiveRegion] = useState("all");
    const containerRef = useRef(null);

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

    console.log("All Tours:", allTours);
    console.log("Filtered Tours:", filteredTours);

    useGSAP(() => {
        // Animate intro section
        gsap.from(".tours-intro", {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
        });

        // Animate instruction cards
        gsap.fromTo(".instruction-card",
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".instructions-container",
                    start: "top 80%",
                },
            }
        );

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

    const instructions = [
        {
            icon: "🏍️",
            title: "Choose Your Adventure",
            description: "Browse through our curated motorcycle expeditions across breathtaking terrains",
        },
        {
            icon: "📅",
            title: "Pick Your Dates",
            description: "Select from various departure dates that suit your schedule",
        },
        {
            icon: "✨",
            title: "Book & Ride",
            description: "Reserve your spot and get ready for the journey of a lifetime",
        },
    ];

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
                    <div className="flex gap-4 justify-center items-center">
                        <TiLocationArrow className="text-brown-100 text-3xl sm:text-4xl animate-bounce" />
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
                    <p className="font-general text-xs sm:text-sm text-neutral-gray uppercase tracking-widest animate-pulse">Scroll to explore</p>
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
                                ? "bg-[#edff66] text-black"
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
                                    ? "bg-[#edff66] text-black"
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
                    <div className="space-y-20">
                        {filteredTours.map((tour, index) => (
                            <TourCard key={tour.id} tour={tour} index={index} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

const TourCard = ({ tour, index }) => {
    const cardRef = useRef(null);
    const glowRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

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

    // Magic Bento Effect
    useEffect(() => {
        const card = cardRef.current;
        const glow = glowRef.current;
        if (!card || !glow) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            glow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(137, 87, 59, 0.15), transparent 40%)`;
        };

        const handleMouseEnter = () => {
            glow.style.opacity = '1';
        };

        const handleMouseLeave = () => {
            glow.style.opacity = '0';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const tourSlug = tour.name.toLowerCase().replace(/\s+/g, "-");

    return (
        <div
            ref={cardRef}
            className={`tour-card relative flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 items-center group rounded-2xl border border-[#496156] bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-6 sm:p-8 transition-all duration-500 hover:border-[#89573b] hover:shadow-[0_0_30px_rgba(137,87,59,0.3)]`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Magic Bento Glow Effect */}
            <div
                ref={glowRef}
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500"
                style={{ zIndex: 0 }}
            />

            {/* Card Content - wrapped in relative z-10 */}
            <div className="relative z-10 w-full lg:w-1/2 overflow-hidden rounded-2xl">
                <div className="aspect-video relative">
                    {/* Fallback Image */}
                    <img
                        src={tour.image.startsWith('/') ? tour.image : `/${tour.image}`}
                        alt={tour.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Video Overlay - can be added later */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute top-4 right-4 bg-brown-100 text-white px-4 py-2 rounded-full font-bold">
                        {tour.cost}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative z-10 w-full lg:w-1/2 space-y-6">
                <div className="inline-block bg-brown-100/20 text-brown-100 px-4 py-2 rounded-full text-sm font-semibold border border-brown-100/30">
                    {tour.regionName}
                </div>

                <h2 className="special-font text-4xl md:text-5xl lg:text-6xl text-brown-100 group-hover:text-white transition-colors duration-300">
                    {tour.name}
                </h2>

                <p className="text-xl md:text-2xl text-neutral-gray font-robert-regular italic">
                    {tour.caption}
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary-dark/50 p-4 rounded-lg border border-secondary-light/30">
                        <p className="text-sm text-neutral-darkGray">Duration</p>
                        <p className="text-lg font-semibold text-white">{tour.duration}</p>
                    </div>
                    <div className="bg-secondary-dark/50 p-4 rounded-lg border border-secondary-light/30">
                        <p className="text-sm text-neutral-darkGray">Period</p>
                        <p className="text-lg font-semibold text-white">{tour.period}</p>
                    </div>
                    <div className="bg-secondary-dark/50 p-4 rounded-lg border border-secondary-light/30">
                        <p className="text-sm text-neutral-darkGray">Starting From</p>
                        <p className="text-lg font-semibold text-white">{tour.starting}</p>
                    </div>
                    <div className="bg-secondary-dark/50 p-4 rounded-lg border border-secondary-light/30">
                        <p className="text-sm text-neutral-darkGray">Cost</p>
                        <p className="text-lg font-semibold text-brown-100">{tour.cost}</p>
                    </div>
                </div>

                <Link to={`/tours/${tourSlug}`}>
                    <Button
                        title="Explore Tour"
                        leftIcon={<TiLocationArrow />}
                        containerClass="!bg-brown-100 text-white hover:!bg-brown-300 transition-all duration-300 w-full justify-center"
                    />
                </Link>
            </div>
        </div>
    );
};

export default Tours;
