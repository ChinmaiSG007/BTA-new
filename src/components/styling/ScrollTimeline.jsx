import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ScrollTimeline = ({ items = [] }) => {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        if (!containerRef.current || items.length === 0) return;

        const ctx = gsap.context(() => {
            items.forEach((_, index) => {
                const stepElement = document.querySelector(
                    `#timeline-step-${index}`
                );
                if (!stepElement) return;

                ScrollTrigger.create({
                    trigger: stepElement,
                    start: "top center+=100",
                    end: "bottom center",
                    onEnter: () => setActiveIndex(index),
                    onEnterBack: () => setActiveIndex(index),
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, [items]);

    if (!items || items.length === 0) return null;

    return (
        <section className="relative py-16" ref={containerRef}>
            {/* Timeline Container */}
            <div className="relative max-w-5xl mx-auto px-4">
                {/* Central Timeline Line - Background */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-neutral-800 -translate-x-1/2" />

                {/* Central Timeline Line - Progress (Active) */}
                <motion.div
                    className="absolute left-1/2 top-0 w-[2px] bg-brown-100 -translate-x-1/2 origin-top"
                    style={{ height: lineHeight }}
                />

                {/* Timeline Steps */}
                <div className="relative">
                    {items.map((item, index) => {
                        const isEven = index % 2 === 0;
                        const isActive = index <= activeIndex;
                        const isCurrentActive = index === activeIndex;

                        return (
                            <div
                                key={index}
                                id={`timeline-step-${index}`}
                                className="relative"
                            >
                                {/* === BADGE SECTION === */}
                                <div className="flex justify-center">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 25,
                                        }}
                                        className="relative z-10"
                                    >
                                        <div
                                            className={`
                                                relative flex items-center gap-2 px-5 py-2.5 rounded-full
                                                transition-all duration-500 ease-out
                                                ${isActive
                                                    ? "bg-brown-100 shadow-lg shadow-brown-100/20"
                                                    : "bg-neutral-900 border border-neutral-700"
                                                }
                                            `}
                                        >
                                            <span
                                                className={`
                                                    font-mono text-sm font-semibold tracking-wide
                                                    ${isActive ? "text-black" : "text-neutral-500"}
                                                `}
                                            >
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <span
                                                className={`
                                                    font-mono text-sm
                                                    ${isActive ? "text-black/60" : "text-neutral-600"}
                                                `}
                                            >
                                                —
                                            </span>
                                            <span
                                                className={`
                                                    font-mono text-sm font-semibold tracking-wider
                                                    ${isActive ? "text-black" : "text-neutral-500"}
                                                `}
                                            >
                                                D{index + 1}
                                            </span>

                                            {/* Pulse ring for current active */}
                                            {isCurrentActive && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full border-2 border-brown-100"
                                                    initial={{ scale: 1, opacity: 0.6 }}
                                                    animate={{ scale: 1.4, opacity: 0 }}
                                                    transition={{
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        ease: "easeOut",
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* === LINE SEGMENT + CONTENT === */}
                                <div className="relative min-h-[180px] md:min-h-[200px]">
                                    {/* Content positioned to the side */}
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            x: isEven ? 30 : -30,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            x: 0,
                                        }}
                                        viewport={{ once: true, margin: "-30px" }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.25, 0.1, 0.25, 1],
                                            delay: 0.15,
                                        }}
                                        className={`
                                            absolute top-12 
                                            w-[42%]
                                            ${isEven
                                                ? "right-[54%] text-right pr-6"
                                                : "left-[54%] text-left pl-6"
                                            }
                                        `}
                                    >
                                        {/* Horizontal connector line */}
                                        <div
                                            className={`
                                                absolute top-3 h-[2px] w-6
                                                transition-colors duration-500
                                                ${isActive ? "bg-brown-100/60" : "bg-neutral-700"}
                                                ${isEven ? "right-0 translate-x-full" : "left-0 -translate-x-full"}
                                            `}
                                        />

                                        {/* Title */}
                                        <h3
                                            className={` section-heading
                                                text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-wide leading-tight
                                                transition-colors duration-500
                                                ${isActive ? "text-white" : "text-neutral-600"}
                                            `}
                                        >
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        {/* {item.description && (
                                            <p
                                                className={` font-myCustomFont
                                                    mt-3 text-sm md:text-base leading-relaxed
                                                    transition-colors duration-500
                                                    ${isActive ? "text-neutral-400" : "text-neutral-600"}
                                                `}
                                            >
                                                {item.description}
                                            </p>
                                        )} */}
                                    </motion.div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Final line segment after last item */}
                    <div className="h-8" />
                </div>
            </div>
        </section>
    );
};

export default ScrollTimeline;
