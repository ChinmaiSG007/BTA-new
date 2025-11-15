import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import toursData from "../../tours.json";
import Button from "../common/Button";
import AnimatedTitle from "../common/AnimatedTitle";
import Balatro from "../styling/Balatro";

gsap.registerPlugin(ScrollTrigger);

const TourDetail = () => {
    const { tourSlug } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [region, setRegion] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        // Reset scroll position on mount
        window.scrollTo(0, 0);

        // Find the tour by slug
        let foundTour = null;
        let foundRegion = null;

        toursData.regions.forEach((reg) => {
            const tourMatch = reg.tours.find(
                (t) => t.name.toLowerCase().replace(/\s+/g, "-") === tourSlug
            );
            if (tourMatch) {
                foundTour = tourMatch;
                foundRegion = reg;
            }
        });

        if (foundTour && foundRegion) {
            setTour(foundTour);
            setRegion(foundRegion);
            setImageLoaded(false); // Reset image loaded state
        } else {
            // Redirect to tours page if tour not found
            navigate("/tours");
        }
    }, [tourSlug, navigate]);

    useGSAP(() => {
        if (!tour) return;

        const ctx = gsap.context(() => {
            // Animate sections on scroll - each independently
            const sections = gsap.utils.toArray(".content-section");
            sections.forEach((section) => {
                gsap.from(section, {
                    opacity: 0,
                    y: 60,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        once: true,
                    },
                });
            });
        });

        return () => ctx.revert(); // Cleanup
    }, [tour]);

    if (!tour || !region) {
        return (
            <div className="min-h-screen w-screen bg-neutral-black flex items-center justify-center">
                <div className="text-white text-2xl font-robert-regular">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-screen bg-neutral-black text-white">
            {/* Hero Section */}
            <section className="tour-hero relative h-screen flex items-center justify-center overflow-hidden bg-neutral-black">
                {/* Background Image - Base Layer */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={tour.image.startsWith('/') ? tour.image : `/${tour.image}`}
                        alt={tour.name}
                        className="w-full h-full object-cover"
                        loading="eager"
                        onLoad={() => setImageLoaded(true)}
                    />
                </div>

                {/* Balatro Overlay - Blended on top of image */}
                <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-40">
                    <Balatro
                        isRotate={false}
                        mouseInteraction={false}
                        pixelFilter={1000}
                        color1="#763919"
                        color2="#102103"
                        color3="#010b18"
                    />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-20 bg-gradient-to-b from-neutral-black/30 via-neutral-black/50 to-neutral-black pointer-events-none" />

                {/* Content Layer */}
                <div className="relative z-30 text-center px-6 max-w-5xl">
                    <div className="inline-block bg-brown-100/20 text-brown-100 px-6 py-3 rounded-full font-robert-medium text-body-small mb-6 backdrop-blur-sm border border-brown-100/30">
                        {region.name}
                    </div>

                    <h1 className="special-font hero-heading text-blue-75 mb-6">
                        {tour.name}
                    </h1>

                    <p className="text-body text-white mb-8 italic max-w-3xl mx-auto">
                        {tour.caption}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center items-center">
                        <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full text-body-small">
                            <FaClock className="inline mr-2 text-brown-100" />
                            {tour.duration}
                        </div>
                        <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full text-body-small">
                            <FaMapMarkerAlt className="inline mr-2 text-brown-100" />
                            {tour.starting}
                        </div>
                        <div className="bg-brown-100 text-black px-6 py-3 rounded-full font-robert-medium text-body-small">
                            <FaMoneyBillWave className="inline mr-2" />
                            {tour.cost}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
                    <p className="text-label text-neutral-gray animate-pulse">Scroll to discover</p>
                </div>
            </section>

            {/* Quick Info Grid */}
            <section className="info-grid py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="info-card bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-8 rounded-2xl border border-[#496156] hover:border-brown-100 transition-all duration-300">
                        <FaClock className="text-4xl text-brown-100 mb-4" />
                        <p className="text-label text-neutral-gray mb-2">Duration</p>
                        <p className="text-heading-secondary">{tour.duration}</p>
                    </div>

                    <div className="info-card bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-8 rounded-2xl border border-[#496156] hover:border-brown-100 transition-all duration-300">
                        <FaCalendarAlt className="text-4xl text-brown-100 mb-4" />
                        <p className="text-label text-neutral-gray mb-2">Period</p>
                        <p className="text-heading-secondary">{tour.period}</p>
                    </div>

                    <div className="info-card bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-8 rounded-2xl border border-[#496156] hover:border-brown-100 transition-all duration-300">
                        <FaMapMarkerAlt className="text-4xl text-brown-100 mb-4" />
                        <p className="text-label text-neutral-gray mb-2">Starting Point</p>
                        <p className="text-heading-secondary">{tour.starting}</p>
                    </div>

                    <div className="info-card bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-8 rounded-2xl border border-[#496156] hover:border-brown-100 transition-all duration-300">
                        <FaMoneyBillWave className="text-4xl text-brown-100 mb-4" />
                        <p className="text-label text-neutral-gray mb-2">Starting From</p>
                        <p className="text-heading-secondary text-brown-100">{tour.cost}</p>
                    </div>
                </div>
            </section>

            {/* Content Container */}
            <div className="content-container max-w-7xl mx-auto px-6 pb-20">
                {/* Overview Section */}
                {(tour.brief || tour.about) && (
                    <section className="content-section mb-20">
                        <AnimatedTitle
                            title="Tour <b>Overview</b>"
                            containerClass="mb-10"
                        />
                        <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm border border-[#496156] rounded-2xl p-8 md:p-12">
                            {tour.brief && (
                                <p className="text-body text-neutral-gray">
                                    {tour.brief}
                                </p>
                            )}
                            {tour.about && (
                                <p className="text-body text-neutral-gray mt-6">
                                    {tour.about}
                                </p>
                            )}
                        </div>
                    </section>
                )}

                {/* Highlights Section */}
                {tour.highlights && tour.highlights.length > 0 && (
                    <section className="content-section mb-20">
                        <AnimatedTitle
                            title="Tour <b>Highlights</b>"
                            containerClass="mb-10"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {tour.highlights.map((highlight, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-xl border border-[#496156] hover:border-brown-100/50 transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <FaCheckCircle className="text-brown-100 text-xl flex-shrink-0 mt-1" />
                                        <p className="text-body-small text-neutral-gray">
                                            {highlight}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Itinerary Section */}
                {tour.itinerary && tour.itinerary.length > 0 && (
                    <section className="content-section mb-20">
                        <AnimatedTitle
                            title="Day by Day <b>Itinerary</b>"
                            containerClass="mb-10"
                        />
                        <div className="space-y-6">
                            {tour.itinerary.map((day, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm border border-[#496156] rounded-xl p-6 md:p-8 hover:border-brown-100/50 transition-all duration-300"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="bg-brown-100 text-black rounded-full w-12 h-12 flex items-center justify-center font-robert-medium text-xl flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-heading-secondary text-brown-100 mb-3">
                                                {day.title}
                                            </h3>
                                            <p className="text-body text-neutral-gray">
                                                {day.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Inclusions & Exclusions */}
                <section className="content-section mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Inclusions */}
                        {tour.inclusions && tour.inclusions.length > 0 && (
                            <div>
                                <AnimatedTitle
                                    title="What's <b>Included</b>"
                                    containerClass="mb-6"
                                />
                                <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm border border-[#496156] rounded-2xl p-8">
                                    <ul className="space-y-4">
                                        {tour.inclusions.map((item, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <FaCheckCircle className="text-brown-100 text-lg flex-shrink-0 mt-1" />
                                                <span className="text-body-small text-neutral-gray">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Exclusions */}
                        {tour.exclusions && tour.exclusions.length > 0 && (
                            <div>
                                <AnimatedTitle
                                    title="What's <b>Not Included</b>"
                                    containerClass="mb-6"
                                />
                                <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm border border-[#496156] rounded-2xl p-8">
                                    <ul className="space-y-4">
                                        {tour.exclusions.map((item, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <FaTimesCircle className="text-red-400 text-lg flex-shrink-0 mt-1" />
                                                <span className="text-body-small text-neutral-gray">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Why Us Section */}
                {tour.whyUs && (
                    <section className="content-section mb-20">
                        <AnimatedTitle
                            title="Why Choose <b>Us?</b>"
                            containerClass="mb-10"
                        />
                        <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm border border-[#496156] rounded-2xl p-8 md:p-12">
                            <p className="text-body text-neutral-gray">
                                {tour.whyUs}
                            </p>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="content-section">
                    <div className="bg-gradient-to-br from-brown-100 to-[#8a5a3a] rounded-2xl p-12 text-center text-white border border-brown-100">
                        <h2 className="special-font text-4xl md:text-5xl mb-4">
                            Ready for the Adventure?
                        </h2>
                        <p className="text-heading-secondary mb-8">
                            Book your spot now and create memories that last a lifetime
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a href="https://wa.me/919663299663" target="_blank" rel="noopener noreferrer">
                                <Button
                                    title="Book Now on WhatsApp"
                                    leftIcon={<TiLocationArrow />}
                                    containerClass="!bg-white !text-black hover:!bg-neutral-gray transition-all duration-300"
                                />
                            </a>
                            <Link to="/tours">
                                <Button
                                    title="View All Tours"
                                    containerClass="!bg-black !text-white border border-white hover:!bg-neutral-black transition-all duration-300"
                                />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TourDetail;
