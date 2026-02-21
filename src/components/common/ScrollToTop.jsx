import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";

const ScrollToTop = ({
    threshold = 300,
    right = 24,
    bottom = 24,
    size = 60,
    bgColor = "rgba(0, 0, 0, 0.6)", // Dark semi-transparent
    textColor = "white",
    zIndex = 50,
    borderRadius = 50,
    shadow = true,
    smoothScroll = true,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Handle scroll event
    useEffect(() => {
        const toggleVisibility = () => {
            const scrolled = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxScroll) * 100;

            setScrollProgress(progress);

            if (scrolled > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        // Call once to set initial state
        toggleVisibility();

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [threshold]);

    // Scroll to top function
    const scrollToTop = () => {
        if (smoothScroll) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } else {
            window.scrollTo(0, 0);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1] // cubic-bezier for smooth animation
                    }}
                    style={{
                        position: "fixed",
                        bottom: bottom,
                        right: right,
                        zIndex: zIndex,
                    }}
                >
                    <motion.button
                        className="scroll-to-top-button relative overflow-hidden"
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            width: size,
                            height: size,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: borderRadius,
                            cursor: "pointer",
                            boxShadow: shadow
                                ? "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset"
                                : "none",
                            position: "relative",
                        }}
                    >
                        {/* Background circle for contrast */}
                        <div
                            style={{
                                position: "absolute",
                                width: size - 8,
                                height: size - 8,
                                borderRadius: "50%",
                                backgroundColor: "rgba(0, 0, 0, 0.4)",
                            }}
                        />

                        {/* Circular progress ring */}
                        <svg
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                transform: "rotate(-90deg)",
                                zIndex: 1,
                            }}
                        >
                            {/* Background circle */}
                            <circle
                                cx={size / 2}
                                cy={size / 2}
                                r={(size - 8) / 2}
                                stroke="#fffff"
                                strokeWidth="3"
                                fill="none"
                            />
                            {/* Progress circle */}
                            <circle
                                cx={size / 2}
                                cy={size / 2}
                                r={(size - 8) / 2}
                                stroke="#b87b58"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * ((size - 8) / 2)}`}
                                strokeDashoffset={`${2 * Math.PI * ((size - 8) / 2) * (1 - scrollProgress / 100)}`}
                                style={{
                                    filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))",
                                    transition: "stroke-dashoffset 0.3s ease-out",
                                }}
                            />
                        </svg>

                        {/* Arrow Icon */}
                        <motion.div
                            style={{ zIndex: 2, position: "relative" }}
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <IoIosArrowUp
                                style={{
                                    color: textColor,
                                    filter: "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4))"
                                }}
                                size={size * 0.45}
                            />
                        </motion.div>

                        {/* Hover glow effect */}
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
                                borderRadius: borderRadius,
                                opacity: 0,
                            }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;