import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaMotorcycle, FaMountain, FaAward, FaGlobeAsia, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DecryptedText from "../styling/DecryptedText";

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

const sliderImages = [
    "img/images/Founder_slider_1.jpeg",
    "img/images/Founder_slider_2.jpeg",
    "img/images/Founder_slider_3.jpeg",
    "img/images/Founder_slider_4.jpeg",
];

const FounderSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const imageVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 1.1,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 }
            }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9,
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 }
            }
        })
    };

    return (
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-24 mb-24 md:mt-32">
            <div className="text-center mb-16">
                <DecryptedText
                    text="Meet the Founder"
                    parentClassName="flex justify-center"
                    className="font-myCustomFont font-black text-4xl sm:text-5xl md:text-6xl uppercase text-blue-50"
                    encryptedClassName="font-myCustomFont font-black text-4xl sm:text-5xl md:text-6xl uppercase text-blue-50 opacity-40"
                    characters="█▓▒░▀▄▌▐"
                    animateOn="view"
                    revealDirection="center"
                    sequential
                    useOriginalCharsOnly={false}
                    speed={40}
                />
            </div>

            <div className="founder-story-block grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
                {/* Carousel Image */}
                <div className="relative rounded-[2.5rem] overflow-hidden group min-h-[400px] lg:min-h-[550px] shadow-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-xl">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.img
                            key={currentIndex}
                            src={sliderImages[currentIndex]}
                            custom={direction}
                            variants={imageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            alt={`Palaksha - Achievements ${currentIndex + 1}`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                    {/* Founder Name */}
                    <div className="absolute bottom-8 left-8 right-8 z-20">
                        <h3 className="font-myCustomFont text-3xl font-bold text-white mb-2 drop-shadow-md">Palaksha</h3>
                        <p className="text-brown-100 font-general text-sm uppercase tracking-widest bg-black/40 inline-block px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                            Founder
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/10 hover:bg-black/50 transition-all hover:scale-110"
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/10 hover:bg-black/50 transition-all hover:scale-110"
                    >
                        <FaChevronRight className="w-4 h-4" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-8 right-8 flex gap-2 z-20">
                        {sliderImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex
                                        ? "w-8 bg-brown-500"
                                        : "w-2 bg-white/40 hover:bg-white/80"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Text Block */}
                <div className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#1c1c1c]/90 to-[#141414]/90 backdrop-blur-xl p-8 sm:p-10 md:p-12 shadow-2xl h-full flex flex-col justify-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brown-500/10 rounded-full blur-[80px] pointer-events-none" />
                    <FaQuoteLeft className="text-white/5 w-16 h-16 absolute top-8 right-8" />

                    <h2 className="font-myCustomFont text-white text-3xl md:text-4xl font-bold mb-8 relative z-10">
                        A Life Less Ordinary
                    </h2>

                    <div className="space-y-6 relative z-10">
                        <p className="text-neutral-300 font-general text-base leading-relaxed">
                            Before Beyond Tarmac Adventures became a reality, Palaksha was just another rider with an insatiable wanderlust. Staring at maps and dreaming of high-altitude passes, he realized that his heart didn't belong in a cubicle, but out there on the rugged trails of the Himalayas.
                        </p>
                        <p className="text-neutral-300 font-general text-base leading-relaxed">
                            He sold his comfort zone, packed his saddlebags, and spent years mapping uncharted territories. From the freezing winds of Spiti to the unforgiving terrains of Zanskar, every scar on his motorcycle tells a story of survival, passion, and immense respect for nature.
                        </p>
                        <p className="text-neutral-300 font-general text-base leading-relaxed">
                            Today, Palaksha isn't just a tour leader; he is a mentor, a storyteller, and a brother to the hundreds of riders who have experienced the magic of the mountains with him.
                        </p>
                    </div>
                </div>
            </div>

            {/* Milestones */}
            <div className="mt-20">
                <div className="text-center mb-12">
                    <h2 className="font-myCustomFont text-white text-2xl md:text-3xl font-bold uppercase mb-4 tracking-wider">
                        The Journey So Far
                    </h2>
                    <div className="w-20 h-1 bg-brown-500 mx-auto rounded-full mb-6"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {milestones.map((item, index) => (
                        <div key={index} className="relative rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-8 hover:bg-white/[0.05] transition-colors duration-500 group overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brown-500/10 rounded-full blur-2xl group-hover:bg-brown-500/20 transition-all duration-500"></div>

                            <div className="absolute top-6 right-6 p-4 rounded-full bg-white/5 text-brown-500 group-hover:bg-brown-500 group-hover:text-white transition-colors duration-300">
                                {item.icon}
                            </div>

                            <h3 className="font-myCustomFont text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/40 to-white/5 mb-6 group-hover:from-white/80 group-hover:to-white/20 transition-all duration-300 pt-10">
                                {item.year}
                            </h3>
                            <h4 className="font-myCustomFont text-xl font-bold text-white mb-3">
                                {item.title}
                            </h4>
                            <p className="text-neutral-400 font-general text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FounderSection;
