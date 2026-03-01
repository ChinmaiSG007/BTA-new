import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = ({
    threshold = 300,
    right = 96, // Sits to the left of ScrollToTop (24 + 60 + 12 gap)
    bottom = 24,
    size = 60,
    bgColor = "rgba(0, 0, 0, 0.6)",
    iconColor = "#25D366", // WhatsApp green
    zIndex = 49,
    borderRadius = 50,
    shadow = true,
    phoneNumber = "919876543210",
    message = "Hello! I'm interested in learning more about your tours.",
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        toggleVisibility();

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [threshold]);

    const handleClick = () => {
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
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
                        ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{
                        position: "fixed",
                        bottom: bottom,
                        right: right,
                        zIndex: zIndex,
                    }}
                >
                    <motion.button
                        className="whatsapp-button relative overflow-hidden"
                        onClick={handleClick}
                        aria-label="Contact us on WhatsApp"
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
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                            }}
                        />

                        {/* WhatsApp Icon */}
                        <motion.div
                            style={{ zIndex: 2, position: "relative" }}
                        >
                            <FaWhatsapp
                                style={{
                                    color: iconColor,
                                }}
                                size={size * 0.75}
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

export default WhatsAppButton;