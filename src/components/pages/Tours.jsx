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

const TourCard = ({ tour, index }) => {
    const cardRef = useRef(null);
    const glowRef = useRef(null);

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
            className="tour-card relative group rounded-3xl border border-[#496156] bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#89573b] hover:shadow-[0_0_40px_rgba(137,87,59,0.4)]"
        >
            {/* Magic Bento Glow Effect */}
            <div
                ref={glowRef}
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500"
                style={{ zIndex: 0 }}
            />

            {/* Image Section */}
            <div className="relative z-10 w-full h-[300px] sm:h-[400px] overflow-hidden">
                <img
                    src={tour.image.startsWith('/') ? tour.image : `/${tour.image}`}
                    alt={tour.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Region Badge with GlassSurface */}
                <div className="absolute top-6 left-6">
                    <GlassSurface
                        displace={5}
                        distortionScale={350}
                        redOffset={15}
                        greenOffset={35}
                        blueOffset={55}
                        brightness={60}
                        opacity={0.8}
                        mixBlendMode="screen"
                        width={"100%"}
                        height={40}
                        className="px-4 py-2"
                    >
                        <span className="text-white text-sm font-semibold whitespace-nowrap">
                            {tour.regionName}
                        </span>
                    </GlassSurface>
                </div>

                {/* Price Badge with GlassSurface */}
                <div className="absolute top-6 right-6">
                    <GlassSurface
                        width="auto"
                        height={40}
                        displace={0.3}
                        distortionScale={450}
                        redOffset={5}
                        greenOffset={5}
                        blueOffset={5}
                        borderRadius={20}
                        brightness={95}
                        opacity={0.95}
                        blur={6}
                        className="px-5 py-2"
                    >
                        <span className="text-[#1c2621] font-bold text-lg whitespace-nowrap">
                            {tour.cost}
                        </span>
                    </GlassSurface>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative z-10 p-6 sm:p-8 space-y-6">
                {/* Tour Name with myCustomFont */}
                <h2 className="font-myCustomFont text-3xl sm:text-4xl md:text-5xl text-brown-100 group-hover:text-white transition-colors duration-300 leading-tight">
                    {tour.name}
                </h2>

                {/* Caption */}
                <p className="text-lg sm:text-xl text-neutral-gray font-general italic leading-relaxed">
                    {tour.caption}
                </p>

                {/* Highlights Section - Display ALL highlights */}
                {tour.highlights && tour.highlights.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-brown-100 uppercase tracking-wider">
                            Tour Highlights
                        </h3>
                        <ul className="space-y-2.5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {tour.highlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-neutral-gray text-sm">
                                    <TiLocationArrow className="text-brown-100 mt-1 flex-shrink-0 text-base" />
                                    <span className="leading-relaxed">{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Explore Button */}
                <Link to={`/tours/${tourSlug}`} className="block pt-4">
                    <Button
                        title="Explore Tour"
                        leftIcon={<TiLocationArrow className="mr-2" />}
                        containerClass="!bg-brown-100 text-white hover:!bg-brown-300 transition-all duration-300 w-full flex items-center justify-center"
                    />
                </Link>
            </div>
        </div>
    );
};

export default Tours;
