import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";

const ScrollToTop = ({
    threshold = 300,
    right = 20,
    bottom = 20,
    size = 40,
    bgColor = "#6366f1", // Indigo color
    textColor = "white",
    zIndex = 50,
    borderRadius = 9999, // Fully rounded
    shadow = true,
    smoothScroll = true,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    // Handle scroll event
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
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
                <motion.button
                    className="scroll-to-top-button"
                    onClick={scrollToTop}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                    aria-label="Scroll to top"
                    style={{
                        position: "fixed",
                        bottom: bottom,
                        right: right,
                        width: size,
                        height: size,
                        backgroundColor: bgColor,
                        color: textColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                        borderRadius: borderRadius,
                        cursor: "pointer",
                        zIndex: zIndex,
                        boxShadow: shadow ? "0 4px 10px rgba(0, 0, 0, 0.15)" : "none",
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <IoIosArrowUp style={{ color: '#000' }} size={size * 0.5} />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;