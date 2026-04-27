import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import {
    FaMotorcycle,
    FaMountain,
    FaCompass,
    FaQuoteLeft,
    FaAward,
    FaGlobeAsia,
} from "react-icons/fa";
import DecryptedText from "../styling/DecryptedText";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
    {
        icon: <FaMotorcycle className="w-5 h-5" />,
        year: "2010",
        title: "First Himalayan Ride",
        description: "A solo trip on a 350cc motorcycle that changed everything.",
    },
    {
        icon: <FaMountain className="w-5 h-5" />,
        year: "2015",
        title: "Scaling Spiti",
        description: "Conquered some of the toughest terrains, realizing the dream of Beyond Tarmac.",
    },
    {
        icon: <FaAward className="w-5 h-5" />,
        year: "2020",
        title: "Master Marshal",
        description: "Officially certified in advanced adventure riding and wilderness first aid.",
    },
    {
        icon: <FaGlobeAsia className="w-5 h-5" />,
        year: "2024",
        title: "100k+ Kilometers",
        description: "Crossed 100,000 km of leading groups across the Himalayas and beyond.",
    },
];

const Founder = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            ".founder-story-block",
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".founder-story-block",
                    start: "top 80%",
                },
            }
        );

        gsap.fromTo(
            ".milestone-card",
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".milestones-grid",
                    start: "top 85%",
                },
            }
        );

        gsap.fromTo(
            ".philosophy-block",
            { opacity: 0, scale: 0.95 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".philosophy-block",
                    start: "top 80%",
                },
            }
        );
    }, []);

    return (
        <div
            ref={containerRef}
            className="min-h-screen w-screen bg-neutral-black text-white overflow-hidden pb-24"
        >
            {/* ===== TITLE ===== */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-32 sm:pt-36 md:pt-40 pb-6">
                <div className="text-center mb-4">
                    <DecryptedText
                        text="Meet the Founder"
                        parentClassName="flex justify-center"
                        className="font-myCustomFont font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-blue-75"
                        encryptedClassName="font-myCustomFont font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-blue-75 opacity-40"
                        characters="█▓▒░▀▄▌▐"
                        animateOn="view"
                        revealDirection="center"
                        sequential
                        useOriginalCharsOnly={false}
                        speed={40}
                    />
                </div>
            </section>

            {/* ===== THE MAN BEHIND THE HELMET ===== */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-8 md:mt-12">
                <div className="founder-story-block grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Image */}
                    <div className="relative rounded-3xl border border-white/[0.06] overflow-hidden group min-h-[400px] lg:min-h-[500px]">
                        <img
                            src="img/images/palaksha.webp"
                            alt="Palaksha - Founder"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-black via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <h3 className="font-myCustomFont text-3xl font-bold text-white mb-1">Palaksha</h3>
                            <p className="text-brown-100 font-general text-sm uppercase tracking-widest">Founder & Chief Explorer</p>
                        </div>
                    </div>

                    {/* Text */}
                    <div className="relative rounded-3xl border border-brown-100/20 bg-gradient-to-br from-[#1c1c1c] to-[#141414] p-8 sm:p-10 md:p-12 shadow-[0_0_60px_rgba(137,87,59,0.05)]">
                        <FaQuoteLeft className="text-white/10 w-12 h-12 absolute top-6 right-6" />
                        <h2 className="font-myCustomFont text-white text-2xl md:text-3xl font-bold mb-6">
                            A Life Less Ordinary
                        </h2>
                        <p className="text-neutral-gray font-general text-sm md:text-base leading-relaxed mb-5">
                            Before Beyond Tarmac Adventures became a reality, Palaksha was just another rider with an insatiable wanderlust. Staring at maps and dreaming of high-altitude passes, he realized that his heart didn't belong in a cubicle, but out there on the rugged trails of the Himalayas.
                        </p>
                        <p className="text-neutral-gray font-general text-sm md:text-base leading-relaxed mb-5">
                            He sold his comfort zone, packed his saddlebags, and spent years mapping uncharted territories. From the freezing winds of Spiti to the unforgiving terrains of Zanskar, every scar on his motorcycle tells a story of survival, passion, and immense respect for nature.
                        </p>
                        <p className="text-neutral-gray font-general text-sm md:text-base leading-relaxed">
                            Today, Palaksha isn't just a tour leader; he is a mentor, a storyteller, and a brother to the hundreds of riders who have experienced the magic of the mountains with him.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== PHILOSOPHY ===== */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16 md:mt-24">
                <div className="philosophy-block relative rounded-3xl border border-white/[0.06] bg-[#1c1c1c] p-8 sm:p-12 md:p-16 overflow-hidden text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-brown-500/[0.05] to-transparent rounded-3xl" />
                    
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-brown-100/30 bg-brown-100/10 text-brown-100 mb-8">
                            <FaCompass className="w-8 h-8" />
                        </div>
                        <h2 className="font-myCustomFont text-white text-3xl md:text-4xl lg:text-5xl font-black mb-6 uppercase tracking-wide">
                            The Rider's Philosophy
                        </h2>
                        <blockquote className="text-xl md:text-2xl text-white/80 font-general italic leading-relaxed mb-8">
                            "We don't ride to escape life, we ride so life doesn't escape us. The mountain doesn't care what bike you ride; it only cares about the size of your heart."
                        </blockquote>
                        <div className="flex items-center justify-center gap-4 text-neutral-gray">
                            <div className="h-px w-12 bg-white/20" />
                            <span className="font-myCustomFont uppercase tracking-widest text-sm text-brown-100">Palaksha</span>
                            <div className="h-px w-12 bg-white/20" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== MILESTONES ===== */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-16 md:mt-24">
                <div className="text-center mb-12">
                    <h2 className="font-myCustomFont text-white text-3xl md:text-4xl font-bold uppercase mb-4">
                        The Journey So Far
                    </h2>
                    <p className="text-neutral-gray font-general max-w-2xl mx-auto text-sm md:text-base">
                        A quick look at the milestones that shaped the rider and the company.
                    </p>
                </div>

                <div className="milestones-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {milestones.map((item, index) => (
                        <div key={index} className="milestone-card relative rounded-3xl border border-white/[0.06] bg-[#1c1c1c] p-8 hover:bg-[#252525] transition-colors duration-300 group">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300 transform group-hover:scale-110">
                                {item.icon}
                            </div>
                            <h3 className="font-myCustomFont text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/40 to-white/5 mb-4 group-hover:from-brown-100/60 group-hover:to-brown-100/10 transition-all duration-300">
                                {item.year}
                            </h3>
                            <h4 className="font-myCustomFont text-lg font-bold text-white mb-2">
                                {item.title}
                            </h4>
                            <p className="text-neutral-gray font-general text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Founder;
