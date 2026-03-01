import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AnimatedTitle from "../common/AnimatedTitle";
import Button from "../common/Button";
import Balatro from "../styling/Balatro";

gsap.registerPlugin(ScrollTrigger);

const RideSkillWorkshop = () => {
    const containerRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useGSAP(() => {
        // Animate sections on scroll
        gsap.fromTo(".rsw-section",
            {
                opacity: 0,
                y: 50,
            },
            {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".rsw-content",
                    start: "top 80%",
                },
            }
        );

        // Animate itinerary cards
        gsap.fromTo(".itinerary-card",
            {
                opacity: 0,
                x: -50,
            },
            {
                opacity: 1,
                x: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".itinerary-section",
                    start: "top 70%",
                },
            }
        );

        // Animate inclusion/exclusion lists
        gsap.fromTo(".list-item",
            {
                opacity: 0,
                x: -20,
            },
            {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".inclusions-section",
                    start: "top 80%",
                },
            }
        );
    }, []);

    // RSW Gallery Images
    const rswGalleryImages = [
        '/img/images/gallery/Ride/RideSkill (1).webp',
        '/img/images/gallery/Ride/RideSkill (2).webp',
        '/img/images/gallery/Ride/RideSkill (3).webp',
        '/img/images/gallery/Ride/RideSkill (4).webp',
        '/img/images/gallery/Ride/RideSkill (5).webp',
        '/img/images/gallery/Ride/RideSkill (6).webp',
        '/img/images/gallery/Ride/rideskillworkshop.webp',
        '/img/images/gallery/Ride/rideskillworkshop2.webp',
    ];

    const itinerary = {
        day1: [
            { time: "06:30 - 07:30", activity: "Pickup from respective locations" },
            { time: "09:30 - 10:00", activity: "Reach campsite, breakfast" },
            { time: "10:00 - 11:00", activity: "Introduction & breaking the ice" },
            { time: "11:00 - 13:00", activity: "Theory & know how of the motorcycle" },
            { time: "13:00 - 14:00", activity: "Understanding height & weight of the motorcycle" },
            { time: "14:00 - 15:00", activity: "Lunch & rest" },
            { time: "15:00 - 18:00", activity: "Hands-on riding exercises" },
            { time: "19:30 - 20:30", activity: "Safety session on gears" },
            { time: "20:30 - 21:30", activity: "Snacks / Barbeque & Dinner" },
        ],
        day2: [
            { time: "08:00 - 09:30", activity: "Recap of previous day & lifting motorcycle exercise" },
            { time: "09:30 - 10:00", activity: "Breakfast" },
            { time: "10:00 - 11:00", activity: "Riding time" },
            { time: "11:00 - 13:00", activity: "Gear shifting & Riding time" },
            { time: "13:00 - 14:00", activity: "Start stops & Riding time" },
            { time: "14:00 - 15:00", activity: "Lunch & rest" },
            { time: "15:00 - 17:30", activity: "'Shivajinagar' exercise & more riding time" },
            { time: "17:30 - 20:00", activity: "Drive back & drop in the respective locations" },
        ],
    };

    const inclusions = [
        "Stays on triple sharing in rooms",
        "Breakfast, lunch & dinner during the course",
        "Travel to and from the Dirt park (pickup/drop at your locations)",
        "Different models of Royal Enfield Motorcycles and fuel for the riding sessions",
        "Arm & Knee guards",
    ];

    const exclusions = [
        "Anything and everything that's not listed under the 'Inclusions' section",
    ];

    const paymentPolicy = [
        "Complete payment to be made at the time of booking",
        "A participant is eligible for a 100% refund of the amount paid if she cancels the slot 10 day(s) before the scheduled event",
        "A participant forfeits 100% of the amount paid if she cancels the slot within 10 days of the scheduled event",
        "Beyond Tarmac Adv will hold the right to cancel/reschedule the event in case of unforeseen circumstances like government lockdowns, inclement weather, civil unrest and other acts of god. In such cases, the participants will be issued a voucher equivalent to the amount paid that can be redeemed against any future tour/events hosted by Beyond tarmac adv. These vouchers will not be transferable under any circumstances",
    ];

    // Carousel navigation functions
    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % rswGalleryImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? rswGalleryImages.length - 1 : prev - 1
        );
    };

    // Lightbox functions
    const openLightbox = (index) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };

    const nextLightboxImage = () => {
        setLightboxIndex((prev) => (prev + 1) % rswGalleryImages.length);
    };

    const prevLightboxImage = () => {
        setLightboxIndex((prev) =>
            prev === 0 ? rswGalleryImages.length - 1 : prev - 1
        );
    };

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (!isLightboxOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextLightboxImage();
            if (e.key === 'ArrowLeft') prevLightboxImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, lightboxIndex]);

    return (
        <div ref={containerRef} className="min-h-screen w-screen bg-neutral-black text-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24">
                {/* Background with gradient overlay */}
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

                <div className="relative z-20 text-center px-6">
                    <h1 className="special-font hero-heading text-blue-75 mb-6">
                        RIDE SKILL WORKSHOP
                    </h1>
                    <p className="font-myCustomFont text-2xl sm:text-3xl md:text-4xl text-brown-100 mb-4 italic">
                        A Basic Riding Course for Women
                    </p>
                    <div className="inline-block font-myCustomFont bg-[#65402b] text-white px-8 py-4 rounded-full text-xl sm:text-2xl mt-4">
                        ₹8,999 + 5% GST
                    </div>
                </div>

                <div className="absolute bottom-20 w-full px-6 z-20">
                    <div className="flex gap-4 justify-center items-center">
                        <TiLocationArrow className="text-brown-100 text-3xl sm:text-4xl animate-bounce" />
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                        <p className="text-label text-neutral-gray animate-pulse">Scroll to explore</p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="rsw-content max-w-7xl mx-auto px-6 py-20 space-y-20">
                {/* About RSW Section */}
                <section className="rsw-section">
                    <AnimatedTitle
                        title="About <b>RSW</b>"
                        containerClass="mb-8"
                    />

                    {/* Image */}
                    <div className="mb-8 rounded-3xl overflow-hidden">
                        <img
                            src="/img/images/gallery/Ride/rideskillworkshop.webp"
                            alt="Ride Skill Workshop"
                            className="w-full h-[400px] sm:h-[700px] object-cover"
                        />
                    </div>

                    <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-8 rounded-2xl border border-[#496156]">
                        <p className="text-body text-neutral-gray">
                            RSW is a dynamic workshop tailored for women eager to learn motorcycles. Includes theory, hands on sessions & tons of riding hours. From basics like balancing the motorcycle to gear shifts to advanced handling techniques, in a supportive environment, gain confidence, make new connections, and ignite your passion for two-wheel adventures.
                        </p>
                        <p className="text-heading-secondary text-brown-100 mt-6 italic">
                            Join us to rev up your skills and break barriers!
                        </p>
                    </div>
                </section>

                {/* Itinerary Section */}
                <section className="rsw-section itinerary-section">
                    <AnimatedTitle
                        title="Workshop <b>Itinerary</b>"
                        containerClass="mb-8"
                    />

                    {/* Day 1 */}
                    <div className="itinerary-card mb-12">
                        <div className="bg-[#65402b] text-white px-6 py-3 rounded-t-2xl">
                            <h3 className="font-myCustomFont text-heading-primary">Day 1</h3>
                            <p className="text-body-small opacity-90 mt-1">
                                All participants will be picked up from respective locations and driven to our trail park which is around 80 kms from Bengaluru.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm border border-[#496156] border-t-0 rounded-b-2xl p-6">
                            <div className="space-y-4">
                                {itinerary.day1.map((item, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pb-4 border-b border-neutral-gray/20 last:border-b-0">
                                        <div className="text-brown-100 font-robert-medium min-w-[140px] text-sm sm:text-base">
                                            {item.time}
                                        </div>
                                        <div className="text-body-small text-neutral-gray">
                                            {item.activity}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Day 2 */}
                    <div className="itinerary-card">
                        <div className="bg-[#65402b] text-white px-6 py-3 rounded-t-2xl">
                            <h3 className="font-myCustomFont text-heading-primary">Day 2</h3>
                            <p className="text-body-small opacity-90 mt-1">
                                Start the day early with a 'Self defense workshop' by 3 time national medalist in Muay Thai & Kick-boxing Ms. Josita Francis.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm border border-[#496156] border-t-0 rounded-b-2xl p-6">
                            <div className="space-y-4">
                                {itinerary.day2.map((item, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pb-4 border-b border-neutral-gray/20 last:border-b-0">
                                        <div className="text-brown-100 font-robert-medium min-w-[140px] text-sm sm:text-base">
                                            {item.time}
                                        </div>
                                        <div className="text-body-small text-neutral-gray">
                                            {item.activity}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Us Section */}
                <section className="rsw-section">
                    <AnimatedTitle
                        title="Why Choose <b>Us?</b>"
                        containerClass="mb-8"
                    />
                    <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-8 rounded-2xl border border-[#496156]">
                        <p className="text-body text-neutral-gray">
                            Beyond Tarmac Adventures - born from passion for Motorcycles. We are one of the very few source companies in South India to have their presence across the country. Our dedicated team, seasoned riders themselves have successfully catered to 780+ clients, with which we bring a wealth of experience and passion to every ride. Our reviews attest to the unforgettable adventures we deliver, blending scenic routes with camaraderie. From winding mountain roads to hidden gems, we craft experiences that resonate with the spirit of exploration.
                        </p>
                    </div>
                </section>

                {/* Inclusions and Exclusions Section */}
                <section className="rsw-section inclusions-section">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Inclusions */}
                        <div className="flex flex-col">
                            <AnimatedTitle
                                title="<b>Inclusions</b>"
                                containerClass="mb-6"
                            />
                            <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-2xl border border-[#496156] flex-1">
                                <ul className="space-y-3">
                                    {inclusions.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-neutral-gray">
                                            <span className="text-brown-100 text-xl flex-shrink-0">✓</span>
                                            <span className="text-body-small">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Exclusions */}
                        <div className="flex flex-col">
                            <AnimatedTitle
                                title="<b>Exclusions</b>"
                                containerClass="mb-6"
                            />
                            <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-2xl border border-[#496156] flex-1">
                                <ul className="space-y-3">
                                    {exclusions.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-neutral-gray">
                                            <span className="text-brown-100 text-xl flex-shrink-0">✗</span>
                                            <span className="text-body-small">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Payment and Cancellation Policy */}
                <section className="rsw-section">
                    <AnimatedTitle
                        title="Payment & <b>Cancellation Policy</b>"
                        containerClass="mb-8"
                    />
                    <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-8 rounded-2xl border border-[#496156]">
                        <ul className="space-y-4">
                            {paymentPolicy.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-neutral-gray">
                                    <span className="text-brown-100 font-robert-medium min-w-[24px]">{index + 1}.</span>
                                    <span className="text-body-small">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* CTA Button */}
                <section className="rsw-section text-center">
                    <a href="https://wa.me/919663299663" target="_blank" rel="noopener noreferrer" className="inline-block">
                        <Button
                            title="Book Your Slot Now"
                            containerClass="text-black hover:!bg-brown-300 transition-all duration-300"
                        />
                    </a>
                </section>
            </div>

            {/* Gallery Section - Modern Grid */}
            <section className="rsw-section py-20 bg-gradient-to-b from-neutral-black to-[#1c2621]/20">
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatedTitle
                        title="Workshop <b>Gallery</b>"
                        containerClass="mb-12 text-center"
                    />

                    {/* Image Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {rswGalleryImages.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => openLightbox(index)}
                                className="group relative aspect-square overflow-hidden rounded-xl border-2 border-[#496156] bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 cursor-pointer transition-all duration-300 hover:border-brown-100 hover:scale-105"
                            >
                                <img
                                    src={image}
                                    alt={`Workshop ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-4xl">
                                        +
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-white text-4xl hover:text-brown-100 transition-colors z-50"
                        aria-label="Close lightbox"
                    >
                        ×
                    </button>

                    {/* Image Counter */}
                    <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full font-robert-medium z-50">
                        {lightboxIndex + 1} / {rswGalleryImages.length}
                    </div>

                    {/* Main Image */}
                    <div
                        className="relative max-w-7xl max-h-[90vh] mx-auto px-20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={rswGalleryImages[lightboxIndex]}
                            alt={`Workshop Gallery ${lightboxIndex + 1}`}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        />
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            prevLightboxImage();
                        }}
                        className="absolute left-6 top-1/2 -translate-y-1/2 bg-brown-100/90 hover:bg-brown-100 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-50"
                        aria-label="Previous image"
                    >
                        <FaChevronLeft className="text-2xl" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            nextLightboxImage();
                        }}
                        className="absolute right-6 top-1/2 -translate-y-1/2 bg-brown-100/90 hover:bg-brown-100 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-50"
                        aria-label="Next image"
                    >
                        <FaChevronRight className="text-2xl" />
                    </button>

                    {/* Keyboard hint */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                        Use arrow keys to navigate • ESC to close
                    </div>
                </div>
            )}
        </div>
    );
};

export default RideSkillWorkshop;
