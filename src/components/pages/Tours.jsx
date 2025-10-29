import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";
import toursData from "../../tours.json";
import AnimatedTitle from "../common/AnimatedTitle";
import Button from "../common/Button";

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
        <div className="min-h-screen w-screen bg-[#1b1b1b] text-white">
            {/* Hero Intro Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1b1b1b]/50 to-[#1b1b1b] z-10" />
                    <img
                        src="/img/images/gallery/compressedImages/DSC_6452.jpg"
                        alt="Adventure Background"
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>

                <div className="tours-intro relative z-20 text-center px-6">
                    <h1 className="special-font text-6xl md:text-8xl lg:text-9xl text-[#edff66] mb-6">
                        EPIC TOURS
                    </h1>
                    <p className="font-robert-regular text-xl md:text-2xl max-w-3xl mx-auto text-blue-100 mb-8">
                        Embark on unforgettable motorcycle journeys through the world's most stunning landscapes
                    </p>
                    <div className="flex gap-4 justify-center">
                        <TiLocationArrow className="text-[#edff66] text-4xl animate-bounce" />
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
                    <p className="text-sm text-blue-100 animate-pulse">Scroll to explore</p>
                </div>
            </section>

            {/* Instructions Section */}
            <section className="instructions-container py-20 px-6 max-w-7xl mx-auto">
                <AnimatedTitle
                    title="How It <b>Works</b>"
                    containerClass="mt-5 text-center mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {instructions.map((instruction, index) => (
                        <div
                            key={index}
                            className="instruction-card bg-gradient-to-br from-[#2a2a2a] to-[#1b1b1b] p-8 rounded-2xl border border-[#edff66]/20 hover:border-[#edff66] transition-all duration-300 hover:scale-105"
                        >
                            <div className="text-6xl mb-4">{instruction.icon}</div>
                            <h3 className="text-2xl font-bold text-[#edff66] mb-3">
                                {instruction.title}
                            </h3>
                            <p className="text-blue-100 font-robert-regular">
                                {instruction.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

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

            {/* Tours Grid */}
            <section className="tours-grid py-20 px-6 max-w-7xl mx-auto mb-20">
                <AnimatedTitle
                    title="Our <b>Expeditions</b>"
                    containerClass="mt-5 text-center mb-16"
                />

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

    const tourSlug = tour.name.toLowerCase().replace(/\s+/g, "-");

    return (
        <div
            ref={cardRef}
            className={`tour-card flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 items-center group`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Media Section */}
            <div className="w-full lg:w-1/2 relative overflow-hidden rounded-2xl">
                <div className="aspect-video relative">
                    {/* Fallback Image */}
                    <img
                        src={tour.image.startsWith('/') ? tour.image : `/${tour.image}`}
                        alt={tour.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Video Overlay - can be added later */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute top-4 right-4 bg-[#edff66] text-black px-4 py-2 rounded-full font-bold">
                        {tour.cost}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2 space-y-6">
                <div className="inline-block bg-[#edff66]/20 text-[#edff66] px-4 py-2 rounded-full text-sm font-semibold">
                    {tour.regionName}
                </div>

                <h2 className="special-font text-4xl md:text-5xl lg:text-6xl text-[#edff66] group-hover:text-white transition-colors duration-300">
                    {tour.name}
                </h2>

                <p className="text-xl md:text-2xl text-blue-100 font-robert-regular italic">
                    {tour.caption}
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#2a2a2a] p-4 rounded-lg">
                        <p className="text-sm text-gray-400">Duration</p>
                        <p className="text-lg font-semibold text-white">{tour.duration}</p>
                    </div>
                    <div className="bg-[#2a2a2a] p-4 rounded-lg">
                        <p className="text-sm text-gray-400">Period</p>
                        <p className="text-lg font-semibold text-white">{tour.period}</p>
                    </div>
                    <div className="bg-[#2a2a2a] p-4 rounded-lg">
                        <p className="text-sm text-gray-400">Starting From</p>
                        <p className="text-lg font-semibold text-white">{tour.starting}</p>
                    </div>
                    <div className="bg-[#2a2a2a] p-4 rounded-lg">
                        <p className="text-sm text-gray-400">Cost</p>
                        <p className="text-lg font-semibold text-[#edff66]">{tour.cost}</p>
                    </div>
                </div>

                <Link to={`/tours/${tourSlug}`}>
                    <Button
                        title="Explore Tour"
                        leftIcon={<TiLocationArrow />}
                        containerClass="!bg-[#edff66] text-black hover:!bg-white transition-all duration-300 w-full justify-center"
                    />
                </Link>
            </div>
        </div>
    );
};

export default Tours;
