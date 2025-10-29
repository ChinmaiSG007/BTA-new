import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaMoneyBillWave } from "react-icons/fa";
import toursData from "../../tours.json";
import Button from "../common/Button";
import AnimatedTitle from "../common/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const TourDetail = () => {
    const { tourSlug } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [region, setRegion] = useState(null);

    useEffect(() => {
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
        } else {
            // Redirect to tours page if tour not found
            navigate("/tours");
        }
    }, [tourSlug, navigate]);

    useGSAP(() => {
        if (tour) {
            // Hero animation
            gsap.from(".tour-hero", {
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            // Stagger info cards
            gsap.from(".info-card", {
                opacity: 0,
                y: 50,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".info-grid",
                    start: "top 80%",
                },
            });

            // Animate sections
            gsap.from(".content-section", {
                opacity: 0,
                y: 80,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".content-container",
                    start: "top 70%",
                },
            });
        }
    }, [tour]);

    if (!tour || !region) {
        return (
            <div className="min-h-screen w-screen bg-[#1b1b1b] flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    const itinerary = generateItinerary(tour);
    const highlights = generateHighlights(tour);
    const inclusions = generateInclusions();
    const exclusions = generateExclusions();

    return (
        <div className="min-h-screen w-screen bg-[#1b1b1b] text-white">
            {/* Hero Section */}
            <section className="tour-hero relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1b1b1b]/50 to-[#1b1b1b] z-10" />
                    <img
                        src={tour.image.startsWith('/') ? tour.image : `/${tour.image}`}
                        alt={tour.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-20 text-center px-6 max-w-5xl">
                    <div className="inline-block bg-[#edff66]/20 text-[#edff66] px-6 py-3 rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
                        {region.name}
                    </div>

                    <h1 className="special-font text-5xl md:text-7xl lg:text-9xl text-[#edff66] mb-6 drop-shadow-2xl">
                        {tour.name}
                    </h1>

                    <p className="font-robert-regular text-2xl md:text-3xl text-white mb-8 italic">
                        {tour.caption}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center items-center text-lg">
                        <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
                            <FaClock className="inline mr-2 text-[#edff66]" />
                            {tour.duration}
                        </div>
                        <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
                            <FaMapMarkerAlt className="inline mr-2 text-[#edff66]" />
                            {tour.starting}
                        </div>
                        <div className="bg-[#edff66] text-black px-6 py-3 rounded-full font-bold">
                            <FaMoneyBillWave className="inline mr-2" />
                            {tour.cost}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
                    <p className="text-sm text-blue-100 animate-pulse">Scroll to discover</p>
                </div>
            </section>

            {/* Quick Info Grid */}
            <section className="info-grid py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="info-card bg-gradient-to-br from-[#2a2a2a] to-[#1b1b1b] p-8 rounded-2xl border border-[#edff66]/20 hover:border-[#edff66] transition-all duration-300">
                        <FaClock className="text-4xl text-[#edff66] mb-4" />
                        <p className="text-sm text-gray-400 mb-2">Duration</p>
                        <p className="text-2xl font-bold">{tour.duration}</p>
                    </div>

                    <div className="info-card bg-gradient-to-br from-[#2a2a2a] to-[#1b1b1b] p-8 rounded-2xl border border-[#edff66]/20 hover:border-[#edff66] transition-all duration-300">
                        <FaCalendarAlt className="text-4xl text-[#edff66] mb-4" />
                        <p className="text-sm text-gray-400 mb-2">Period</p>
                        <p className="text-2xl font-bold">{tour.period}</p>
                    </div>

                    <div className="info-card bg-gradient-to-br from-[#2a2a2a] to-[#1b1b1b] p-8 rounded-2xl border border-[#edff66]/20 hover:border-[#edff66] transition-all duration-300">
                        <FaMapMarkerAlt className="text-4xl text-[#edff66] mb-4" />
                        <p className="text-sm text-gray-400 mb-2">Starting Point</p>
                        <p className="text-2xl font-bold">{tour.starting}</p>
                    </div>

                    <div className="info-card bg-gradient-to-br from-[#2a2a2a] to-[#1b1b1b] p-8 rounded-2xl border border-[#edff66]/20 hover:border-[#edff66] transition-all duration-300">
                        <FaMoneyBillWave className="text-4xl text-[#edff66] mb-4" />
                        <p className="text-sm text-gray-400 mb-2">Starting From</p>
                        <p className="text-2xl font-bold text-[#edff66]">{tour.cost}</p>
                    </div>
                </div>
            </section>

            {/* Content Container */}
            <div className="content-container max-w-7xl mx-auto px-6 pb-20">
                {/* Overview Section */}
                <section className="content-section mb-20">
                    <AnimatedTitle
                        title="Tour <b>Overview</b>"
                        containerClass="mb-10"
                    />
                    <div className="bg-[#2a2a2a] rounded-2xl p-8 md:p-12">
                        <p className="text-lg md:text-xl text-blue-100 leading-relaxed font-robert-regular">
                            {getOverview(tour)}
                        </p>
                    </div>
                </section>

                {/* Highlights Section */}
                <section className="content-section mb-20">
                    <AnimatedTitle
                        title="Tour <b>Highlights</b>"
                        containerClass="mb-10"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {highlights.map((highlight, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-[#2a2a2a] to-[#1b1b1b] p-6 rounded-xl border border-[#edff66]/10 hover:border-[#edff66]/50 transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="text-3xl">{highlight.icon}</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#edff66] mb-2">
                                            {highlight.title}
                                        </h3>
                                        <p className="text-blue-100 font-robert-regular">
                                            {highlight.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Itinerary Section */}
                <section className="content-section mb-20">
                    <AnimatedTitle
                        title="Day by Day <b>Itinerary</b>"
                        containerClass="mb-10"
                    />
                    <div className="space-y-6">
                        {itinerary.map((day, index) => (
                            <div
                                key={index}
                                className="bg-[#2a2a2a] rounded-xl p-6 md:p-8 hover:bg-[#3a3a3a] transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#edff66] text-black rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-[#edff66] mb-3">
                                            {day.title}
                                        </h3>
                                        <p className="text-blue-100 font-robert-regular leading-relaxed">
                                            {day.description}
                                        </p>
                                        {day.distance && (
                                            <p className="text-sm text-gray-400 mt-2">
                                                Distance: {day.distance}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Inclusions & Exclusions */}
                <section className="content-section mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Inclusions */}
                        <div>
                            <AnimatedTitle
                                title="What's <b>Included</b>"
                                containerClass="mb-6"
                            />
                            <div className="bg-[#2a2a2a] rounded-2xl p-8">
                                <ul className="space-y-4">
                                    {inclusions.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="text-[#edff66] text-xl">✓</span>
                                            <span className="text-blue-100 font-robert-regular">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Exclusions */}
                        <div>
                            <AnimatedTitle
                                title="What's <b>Not Included</b>"
                                containerClass="mb-6"
                            />
                            <div className="bg-[#2a2a2a] rounded-2xl p-8">
                                <ul className="space-y-4">
                                    {exclusions.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="text-red-500 text-xl">✗</span>
                                            <span className="text-blue-100 font-robert-regular">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="content-section">
                    <div className="bg-gradient-to-br from-[#edff66] to-[#d4e659] rounded-2xl p-12 text-center text-black">
                        <h2 className="special-font text-4xl md:text-5xl mb-4">
                            Ready for the Adventure?
                        </h2>
                        <p className="text-xl mb-8 font-robert-regular">
                            Book your spot now and create memories that last a lifetime
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button
                                title="Book Now"
                                leftIcon={<TiLocationArrow />}
                                containerClass="!bg-black !text-white hover:!bg-[#2a2a2a] transition-all duration-300"
                            />
                            <Link to="/tours">
                                <Button
                                    title="View All Tours"
                                    containerClass="!bg-white !text-black hover:!bg-gray-200 transition-all duration-300"
                                />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

// Helper functions to generate content
function getOverview(tour) {
    const overviews = {
        "Snow White Spiti": "Experience the mystical winter wonderland of Spiti Valley in its most pristine form. This premium expedition takes you through snow-laden landscapes, frozen rivers, and ancient monasteries perched on mountain cliffs. Witness the surreal beauty of the Himalayas in winter, a season when the valley transforms into a white paradise accessible only to the most adventurous souls.",
        "Tale of Three Valleys": "Embark on an epic trans-Himalayan journey through three distinct valleys, each with its unique character and charm. From the lush green landscapes to barren high-altitude deserts, this expedition showcases the incredible diversity of the Himalayan ecosystem. Navigate challenging mountain passes, interact with local communities, and witness landscapes that seem from another world.",
        "The Moonland Tour": "Discover why Spiti is called the 'Middle Land' - a place that exists between India and Tibet, reality and dreams. This journey takes you through landscapes so surreal, they've earned the name 'Moonland'. Ride through ancient villages, cross crystal-clear rivers, and camp under star-studded skies in one of the world's least populated regions.",
        "The Complete Circle": "Take the classic Ladakh route with an exciting twist! This comprehensive expedition covers all the iconic destinations while adding unique experiences that set it apart. From the magnetic hills to double-humped camels in Nubra Valley, from pristine Pangong Lake to ancient monasteries, this is Ladakh in its full glory.",
        "La Himalaya": "Chart the uncharted on this exclusive expedition to remote corners of the Himalayas. This journey is designed for those who seek more than just scenic beauty - it's about discovering hidden gems, interacting with remote communities, and riding paths less traveled. Experience the Himalayas like never before.",
        "Rajashtan": "Ride through the land of kings, where every fort tells a story and every city breathes history. This expedition combines the thrill of motorcycling with the rich cultural heritage of Rajasthan. From the pink city of Jaipur to the blue city of Jodhpur, from golden dunes to majestic palaces, experience royal India on two wheels.",
        "Nēpālamā svāgata cha": "Welcome to Nepal! Journey through the land of the Himalayas, where spirituality meets adventure. Ride through diverse landscapes from the Terai plains to high mountain passes, witness the grandeur of the world's tallest peaks, and immerse yourself in the warmth of Nepali culture and hospitality.",
        "North Eastern Nirvana": "Touch the edge of India in this unique expedition through the mystical Northeast. Ride through the seven sister states, each offering distinct cultures, cuisines, and landscapes. From the living root bridges of Meghalaya to the monasteries of Arunachal Pradesh, this journey showcases India's incredible diversity."
    };

    return overviews[tour.name] || `Join us for an unforgettable motorcycle expedition through ${tour.name}. ${tour.caption}. This carefully crafted journey promises adventure, stunning landscapes, and memories that will last a lifetime.`;
}

function generateHighlights(tour) {
    const commonHighlights = [
        { icon: "🏔️", title: "Breathtaking Landscapes", description: "Ride through some of the most stunning terrains on Earth" },
        { icon: "🏍️", title: "Expert-Led Expedition", description: "Professional guides with years of experience in the region" },
        { icon: "🏕️", title: "Comfortable Stays", description: "Carefully selected accommodations ensuring comfort after long rides" },
        { icon: "📸", title: "Photography Opportunities", description: "Capture memories at the most photogenic locations" },
        { icon: "🍜", title: "Local Cuisine", description: "Savor authentic regional delicacies throughout the journey" },
        { icon: "🤝", title: "Cultural Immersion", description: "Interact with local communities and learn about their traditions" },
    ];

    return commonHighlights;
}

function generateItinerary(tour) {
    const days = parseInt(tour.duration.split(" ")[0]) || 10;
    const itinerary = [];

    itinerary.push({
        title: "Arrival & Briefing",
        description: `Arrive in ${tour.starting}. Meet your fellow riders and crew. Bike allocation, safety briefing, and welcome dinner. Get ready for the adventure ahead!`,
        distance: null
    });

    for (let i = 2; i < days; i++) {
        itinerary.push({
            title: `Day ${i}: Journey Continues`,
            description: `Ride through spectacular landscapes, cross mountain passes, and explore local attractions. Experience the unique culture and natural beauty of the region. Evening relaxation and group dinner.`,
            distance: "200-250 km"
        });
    }

    itinerary.push({
        title: `Departure Day`,
        description: `Final breakfast together. Share stories and memories. Departure from ${tour.starting}. Until we ride again!`,
        distance: null
    });

    return itinerary;
}

function generateInclusions() {
    return [
        "Accommodation on twin/triple sharing basis",
        "All meals (Breakfast, Lunch & Dinner)",
        "Royal Enfield motorcycles (Himalayan/Classic 350)",
        "Fuel for the entire journey",
        "Experienced ride captain and support staff",
        "Backup vehicle throughout the tour",
        "All permits and entry fees",
        "Basic medical kit and oxygen cylinders",
        "Mechanic support with tools and spares"
    ];
}

function generateExclusions() {
    return [
        "Travel to and from the starting point",
        "Personal expenses and tips",
        "Any monument entry fees not mentioned",
        "Medical and travel insurance",
        "Any extra meals or beverages",
        "Room heater charges (if applicable)",
        "Any costs arising from unforeseen circumstances",
        "GST (5% applicable on total cost)"
    ];
}

export default TourDetail;
