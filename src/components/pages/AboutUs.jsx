import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import {
    FaMountain,
    FaUsers,
    FaHandshake,
    FaHeart,
    FaRoad,
    FaMapMarkedAlt,
    FaInstagram,
} from "react-icons/fa";
import DecryptedText from "../styling/DecryptedText";

gsap.registerPlugin(ScrollTrigger);

const values = [
    {
        icon: <FaMountain className="w-5 h-5" />,
        label: "Adventure First",
    },
    {
        icon: <FaUsers className="w-5 h-5" />,
        label: "Community",
    },
    {
        icon: <FaHandshake className="w-5 h-5" />,
        label: "Trust & Safety",
    },
    {
        icon: <FaHeart className="w-5 h-5" />,
        label: "Empowerment",
    },
];

const timeline = [
    {
        year: "2015",
        title: "The Spark",
        description:
            "A group of friends set out on their first Himalayan ride from Bengaluru — an experience that planted the seed for Beyond Tarmac.",
    },
    {
        year: "2016",
        title: "First Organised Tour",
        description:
            "Officially launched the first curated Spiti Valley expedition with 8 riders and a borrowed backup vehicle.",
    },
    {
        year: "2017",
        title: "Building the Community",
        description:
            "Crossed 50 riders. Introduced Ladakh and Rajasthan circuits. Began weekend ride skill workshops in Bengaluru.",
    },
    {
        year: "2018",
        title: "Women on Wheels",
        description:
            "Launched the first all-women Himalayan tour, igniting a movement that would become central to our identity.",
    },
    {
        year: "2019",
        title: "Northeast & Beyond",
        description:
            "Expanded into the unexplored Northeast with the North Eastern Nirvana route. Crossed 200+ happy riders.",
    },
    {
        year: "2020 - 2021",
        title: "The Pause That Taught",
        description:
            "The pandemic brought the world to a halt. We used the time to redesign routes, train marshals, and plan for a stronger comeback.",
    },
    {
        year: "2022",
        title: "The Comeback",
        description:
            "Returned with 6 back-to-back sold-out tours. Introduced The Complete Circle — our most ambitious route covering Spiti & Ladakh.",
    },
    {
        year: "2023",
        title: "Crossing Borders",
        description:
            "Launched the Nepal expedition 'Nēpālamā svāgata cha.' Empowered our 300th woman rider on the trails.",
    },
    {
        year: "2024",
        title: "Southern Spice & Scale",
        description:
            "Added Southern Spice and 4×4 Spiti routes. Crossed 700+ riders and 80,000 km of trails conquered.",
    },
    {
        year: "2025",
        title: "The Road Ahead",
        description:
            "A decade of dust, sunrises, and friendships forged on mountain passes. The best chapters are yet to be written.",
    },
];

const team = [
    {
        name: "Rider One",
        role: "Founder & Lead Marshal",
        image: "img/images/gallery/trip-main/la_himalaya.jpg",
    },
    {
        name: "Rider Two",
        role: "Co-Founder & Route Architect",
        image: "img/images/gallery/trip-main/the_complete_circle.jpg",
    },
    {
        name: "Rider Three",
        role: "Head of Operations",
        image: "img/images/gallery/trip-main/snow_white_spiti.jpg",
    },
    {
        name: "Rider Four",
        role: "Women's Tour Lead",
        image: "img/images/gallery/trip-main/tale_of_three_valleys.jpg",
    },
    {
        name: "Rider Five",
        role: "Ride Skill Instructor",
        image: "img/images/gallery/trip-main/rajasthan.jpg",
    },
    {
        name: "Rider Six",
        role: "Expedition Mechanic",
        image: "img/images/gallery/trip-main/the_moonland_tour.jpg",
    },
    {
        name: "Rider Seven",
        role: "Community Manager",
        image: "img/images/gallery/trip-main/north_eastern_nirvana.jpg",
    },
    {
        name: "Rider Eight",
        role: "Content & Media",
        image: "img/images/gallery/trip-main/southern_spice.jpg",
    },
];

const AboutUs = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            ".about-story-block",
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".about-story-block",
                    start: "top 80%",
                },
            }
        );

        gsap.fromTo(
            ".timeline-item",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".timeline-grid",
                    start: "top 85%",
                },
            }
        );

        gsap.fromTo(
            ".about-value-card",
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.12,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".about-values-grid",
                    start: "top 85%",
                },
            }
        );

        gsap.fromTo(
            ".team-card",
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1,
                stagger: 0.08,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".team-grid",
                    start: "top 85%",
                },
            }
        );

        gsap.fromTo(
            ".about-mission-block",
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".about-mission-block",
                    start: "top 80%",
                },
            }
        );
    }, []);

    return (
        <div
            ref={containerRef}
            className="min-h-screen w-screen bg-neutral-black text-white overflow-hidden"
        >
            {/* ===== TITLE ===== */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-32 sm:pt-36 md:pt-40 pb-6">
                <div className="text-center mb-4">
                    <DecryptedText
                        text="About Us"
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
            </section>

            {/* ===== WHO WE ARE — Image + Text ===== */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="about-story-block grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Image */}
                    <div className="rounded-3xl border border-white/[0.06] overflow-hidden relative group min-h-[300px] lg:min-h-[400px]">
                        <img
                            src="img/DSC_5753.jpg"
                            alt="Beyond Tarmac Adventures"
                            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-inset ring-white/[0.06]" />
                    </div>

                    {/* Text */}
                    <div className="relative rounded-3xl border border-brown-100/20 bg-gradient-to-br from-neutral-black/80 to-[#1c2621]/60 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-[0_0_60px_rgba(137,87,59,0.08)]">
                        <div className="absolute -top-px left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brown-100/40 to-transparent" />

                        <h2 className="font-myCustomFont text-white text-2xl md:text-3xl font-bold mb-2">
                            Who We Are
                        </h2>
                        <p className="text-neutral-gray font-general text-sm leading-relaxed mb-4">
                            Beyond Tarmac Adventures was born from a simple belief — the best
                            journeys begin where the road ends. What started as a handful of
                            passionate riders exploring India's remote mountain passes has
                            grown into a community-driven adventure company.
                        </p>
                        <p className="text-neutral-gray font-general text-sm leading-relaxed mb-4">
                            Based in Bengaluru, we've spent years perfecting routes across the
                            Himalayas, Rajasthan's golden deserts, the lush Northeast, and the
                            spice-laden trails of Southern India. Every tour is led by
                            experienced ride marshals with backup support, ensuring safety
                            without compromising the thrill.
                        </p>
                        <p className="text-neutral-gray font-general text-sm leading-relaxed">
                            We're especially proud of empowering over 330 women riders,
                            proving that adventure knows no boundaries.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== MISSION ===== */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16 md:mt-24">
                <div className="about-mission-block relative rounded-3xl border border-white/[0.06] bg-[#1c1c1c] p-8 sm:p-10 md:p-14 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brown-500/[0.04] to-transparent rounded-3xl" />

                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/[0.1] bg-white/[0.04] text-white/60 mb-6">
                            <FaRoad className="w-5 h-5" />
                        </div>
                        <h2 className="font-myCustomFont text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                            Our Mission
                        </h2>
                        <p className="text-neutral-gray font-general text-sm md:text-base leading-relaxed mb-6">
                            To craft transformative motorcycle adventures that push boundaries,
                            build lifelong friendships, and celebrate the raw beauty of India's
                            landscapes — all while maintaining the highest standards of safety
                            and responsible tourism.
                        </p>
                        <div className="flex items-center justify-center gap-6 text-white/30 flex-wrap">
                            <div className="flex items-center gap-2">
                                <FaMapMarkedAlt className="w-4 h-4" />
                                <span className="font-general text-xs uppercase tracking-[0.15em]">
                                    10+ Routes
                                </span>
                            </div>
                            <div className="w-px h-4 bg-white/10" />
                            <div className="flex items-center gap-2">
                                <FaUsers className="w-4 h-4" />
                                <span className="font-general text-xs uppercase tracking-[0.15em]">
                                    Expert Marshals
                                </span>
                            </div>
                            <div className="w-px h-4 bg-white/10" />
                            <div className="flex items-center gap-2">
                                <FaHeart className="w-4 h-4" />
                                <span className="font-general text-xs uppercase tracking-[0.15em]">
                                    Community Led
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== OUR STORY — Timeline ===== */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16 md:mt-24">
                <div className="relative rounded-3xl border border-white/[0.06] bg-[#1c1c1c] overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
                        {/* Left — Founder */}
                        <div className="relative p-8 sm:p-10 md:p-12 lg:border-r border-white/[0.06] flex flex-col justify-center">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/[0.1] mb-6 mx-auto lg:mx-0">
                                <img
                                    src="img/images/palaksha.webp"
                                    alt="Founder"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <blockquote className="text-neutral-gray font-general text-sm leading-relaxed italic mb-6">
                                "What started as weekend rides with friends turned into a
                                decade-long mission to show people the India that exists
                                beyond the tarmac — raw, unfiltered, and breathtaking.
                                Every kilometre we've covered has a story, and every rider
                                who's joined us has become family."
                            </blockquote>
                            <div>
                                <p className="font-myCustomFont text-white text-lg font-bold">
                                    Palaksha
                                </p>
                                <p className="text-white/40 font-general text-xs uppercase tracking-[0.15em]">
                                    Founder & Lead Marshal
                                </p>
                            </div>
                        </div>

                        {/* Right — Timeline Grid */}
                        <div className="p-8 sm:p-10 md:p-12">
                            <h2 className="font-myCustomFont text-white text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-10">
                                Our Story
                            </h2>
                            <div className="timeline-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-8">
                                {timeline.map((item, i) => (
                                    <div key={i} className="timeline-item group">
                                        <p className="font-myCustomFont text-brown-100 text-xl md:text-2xl font-bold mb-1.5 group-hover:text-white transition-colors duration-300">
                                            {item.year}
                                        </p>
                                        <p className="text-white font-general text-xs font-semibold uppercase tracking-wider mb-2">
                                            {item.title}
                                        </p>
                                        <p className="text-white/40 font-general text-xs leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== VALUE CAPSULES ===== */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-12 md:mt-16">
                <div className="about-values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {values.map((v, i) => (
                        <div key={i} className="about-value-card group">
                            <div className="relative h-full rounded-full border border-white/[0.06] bg-[#1c1c1c] px-5 py-3 overflow-hidden transition-all duration-500 hover:border-white/[0.15] hover:-translate-y-0.5">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                                <div className="relative z-10 flex items-center gap-3.5">
                                    <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-white/[0.1] bg-white/[0.04] text-white/60 group-hover:bg-white/[0.08] group-hover:text-white group-hover:border-white/[0.2] transition-all duration-300">
                                        {v.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-white font-general text-xs font-medium truncate group-hover:text-brown-100 transition-colors duration-300">
                                            {v.label}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== OUR TEAM ===== */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16 md:mt-24 pb-24 md:pb-32">
                <div className="text-center mb-10">
                    <DecryptedText
                        text="Our Team"
                        parentClassName="flex justify-center"
                        className="font-myCustomFont font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-blue-75"
                        encryptedClassName="font-myCustomFont font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-blue-75 opacity-40"
                        characters="█▓▒░▀▄▌▐"
                        animateOn="view"
                        revealDirection="center"
                        sequential
                        useOriginalCharsOnly={false}
                        speed={40}
                    />
                </div>

                <div className="team-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                    {team.map((member, i) => (
                        <div
                            key={i}
                            className="team-card group relative rounded-3xl overflow-hidden border border-white/[0.06] bg-[#1c1c1c] transition-all duration-500 hover:border-white/[0.15] hover:-translate-y-1"
                        >
                            {/* Photo */}
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c] via-transparent to-transparent" />

                                {/* Social icon on hover */}
                                <div className="absolute top-3 right-3 w-8 h-8 rounded-full border border-white/[0.1] bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/0 group-hover:text-white/60 transition-all duration-300">
                                    <FaInstagram className="w-3.5 h-3.5" />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <p className="text-white font-myCustomFont text-sm font-bold truncate">
                                    {member.name}
                                </p>
                                <p className="text-white/40 font-general text-[10px] uppercase tracking-[0.2em] mt-0.5 truncate">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default AboutUs;
