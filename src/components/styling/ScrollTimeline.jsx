import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "./ScrollTimeline.css";

gsap.registerPlugin(ScrollTrigger);

const ScrollTimeline = ({ items = [] }) => {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);

    const visibleItems = expanded ? items : items.slice(0, 4);
    const hasMoreItems = items.length > 4 && !expanded;

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
        if (!containerRef.current || visibleItems.length === 0) return;

        const stepElements = containerRef.current.querySelectorAll(
            "[data-timeline-step]"
        );

        const ctx = gsap.context(() => {
            stepElements.forEach((stepElement, index) => {
                ScrollTrigger.create({
                    trigger: stepElement,
                    start: "top center+=80",
                    end: "bottom center",
                    onEnter: () => setActiveIndex(index),
                    onEnterBack: () => setActiveIndex(index),
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, [items, expanded, visibleItems]);

    if (!items || items.length === 0) return null;

    return (
        <section className="relative py-16" ref={containerRef}>
            <div className="relative max-w-5xl mx-auto px-4">
                <div className="absolute left-1/2 top-0 bottom-0 w-10 -translate-x-1/2 rounded-full bg-neutral-900/75 shadow-[inset_0_0_25px_rgba(0,0,0,0.6)]" />
                <div className="absolute left-1/2 top-0 bottom-0 w-4 -translate-x-1/2 rounded-full bg-neutral-800" />
                <motion.div
                    className="absolute left-1/2 top-0 w-4 -translate-x-1/2 rounded-full bg-brown-100"
                    style={{ height: lineHeight }}
                />

                <div className="relative space-y-12">
                    {visibleItems.map((item, index) => {
                        const isEven = index % 2 === 0;
                        const isCurrentActive = index === activeIndex;
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                data-timeline-step
                                className="relative min-h-[190px] md:min-h-[220px]"
                            >
                                <div className="absolute left-1/2 top-6 -translate-x-1/2 z-20">
                                    <div
                                        className={`relative flex h-12 w-12 items-center justify-center rounded-full border-4 transition-all duration-500 ${
                                            isCurrentActive
                                                ? "border-brown-100 bg-brown-100 text-black shadow-[0_0_35px_rgba(212,165,116,0.25)]"
                                                : "border-neutral-700 bg-neutral-950 text-neutral-500"
                                        }`}
                                    >
                                        <span className="font-mono text-sm uppercase tracking-[0.35em]">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-30px" }}
                                    transition={{
                                        duration: 0.55,
                                        ease: [0.25, 0.1, 0.25, 1],
                                        delay: 0.1,
                                    }}
                                    className={`absolute top-12 w-[42%] ${
                                        isEven
                                            ? "right-[54%] text-right pr-6"
                                            : "left-[54%] text-left pl-6"
                                    }`}
                                >
                                    <div
                                        className={`absolute top-6 h-2 w-10 rounded-full transition-colors duration-500 ${
                                            isCurrentActive ? "bg-brown-100" : "bg-neutral-700"
                                        } ${isEven ? "right-0 translate-x-full" : "left-0 -translate-x-full"}`}
                                    />

                                    <div
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter" || event.key === " ") {
                                                setOpenIndex(isOpen ? null : index);
                                            }
                                        }}
                                        className={`relative overflow-hidden rounded-[2rem] border p-6 transition-all duration-500 ease-out ${
                                            isCurrentActive
                                                ? "border-brown-100 bg-neutral-900/95 shadow-[0_18px_50px_rgba(212,165,116,0.14)]"
                                                : "border-neutral-700 bg-[#0f1012]/90 hover:border-brown-100/40 hover:bg-neutral-900/80"
                                        } cursor-pointer`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`text-xs font-semibold uppercase tracking-[0.35em] ${
                                                            isCurrentActive
                                                                ? "text-brown-100"
                                                                : "text-neutral-500"
                                                        }`}
                                                    >
                                                        DAY {index + 1}
                                                    </span>
                                                </div>
                                                <h3
                                                    className={`text-lg md:text-xl font-semibold uppercase leading-tight transition-colors duration-500 ${
                                                        isCurrentActive
                                                            ? "text-white"
                                                            : "text-neutral-300"
                                                    }`}
                                                >
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-neutral-500 transition-colors duration-300">
                                                <span>{isOpen ? "Collapse" : "Expand"}</span>
                                                <span className="text-brown-100">›</span>
                                            </div>
                                        </div>

                                        <motion.div
                                            initial={{ maxHeight: 0, opacity: 0 }}
                                            animate={isOpen ? { maxHeight: 400, opacity: 1 } : { maxHeight: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            {item.description && (
                                                <p className="mt-4 text-sm leading-7 text-neutral-400">
                                                    {item.description}
                                                </p>
                                            )}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>

                {hasMoreItems && (
                    <div className="mt-12 flex justify-center">
                        <button
                            type="button"
                            onClick={() => setExpanded(true)}
                            className="rounded-full border border-brown-100/40 bg-neutral-900/85 px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition duration-300 hover:bg-brown-100/10"
                        >
                            View full roadmap
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ScrollTimeline;
