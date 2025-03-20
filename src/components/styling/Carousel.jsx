import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import "./Carousel.css";
import { Link } from "react-router-dom";

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
    tripData,
    baseWidth = 350,
    autoplay = true,
    autoplayDelay = 3000,
    pauseOnHover = true,
    loop = true,
    round = false,
    tripName
}) {
    // Handle empty or single item cases
    const hasSingleItem = tripData.length <= 1;

    const containerPadding = 16;
    const itemWidth = baseWidth - containerPadding * 2;
    const trackItemOffset = itemWidth + GAP;

    const carouselItems = hasSingleItem ? tripData : (loop ? [...tripData, tripData[0]] : tripData);
    const [currentIndex, setCurrentIndex] = useState(0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const containerRef = useRef(null);
    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener("mouseenter", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);
            return () => {
                container.removeEventListener("mouseenter", handleMouseEnter);
                container.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    useEffect(() => {
        // Don't autoplay if there's only one item
        if (autoplay && !hasSingleItem && (!pauseOnHover || !isHovered)) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => {
                    if (prev === tripData.length - 1 && loop) {
                        return prev + 1;
                    }
                    if (prev === carouselItems.length - 1) {
                        return loop ? 0 : prev;
                    }
                    return prev + 1;
                });
            }, autoplayDelay);
            return () => clearInterval(timer);
        }
    }, [
        autoplay,
        autoplayDelay,
        isHovered,
        loop,
        tripData.length,
        carouselItems.length,
        pauseOnHover,
        hasSingleItem,
    ]);

    const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationComplete = () => {
        if (loop && !hasSingleItem && currentIndex === carouselItems.length - 1) {
            setIsResetting(true);
            x.set(0);
            setCurrentIndex(0);
            setTimeout(() => setIsResetting(false), 50);
        }
    };

    const handleDragEnd = (_, info) => {
        // Disable drag for single item
        if (hasSingleItem) return;

        const offset = info.offset.x;
        const velocity = info.velocity.x;
        if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
            if (loop && currentIndex === tripData.length - 1) {
                setCurrentIndex(currentIndex + 1); // Go to clone.
            } else {
                setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
            }
        } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
            if (loop && currentIndex === 0) {
                setCurrentIndex(tripData.length - 1);
            } else {
                setCurrentIndex((prev) => Math.max(prev - 1, 0));
            }
        }
    };

    // Disable drag for single item
    const dragProps = hasSingleItem ? { drag: false } : (loop ? {} : {
        dragConstraints: {
            left: -trackItemOffset * (carouselItems.length - 1),
            right: 0,
        },
    });

    return (
        <div
            ref={containerRef}
            className={`carousel-container ${round ? "round" : ""} backdrop-blur-sm`}
            style={{
                width: `${baseWidth}px`,
                ...(round && { height: `${baseWidth}px`, borderRadius: "50%" }),
            }}
        >
            <motion.div
                className="carousel-track"
                drag={hasSingleItem ? false : "x"}
                {...dragProps}
                style={{
                    width: itemWidth,
                    gap: `${GAP}px`,
                    perspective: 1000,
                    perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
                    x,
                }}
                onDragEnd={handleDragEnd}
                animate={{ x: hasSingleItem ? 0 : -(currentIndex * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationComplete={handleAnimationComplete}
            >
                {carouselItems.map((item, index) => {
                    const range = [
                        -(index + 1) * trackItemOffset,
                        -index * trackItemOffset,
                        -(index - 1) * trackItemOffset,
                    ];
                    const outputRange = [90, 0, -90];
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const rotateY = hasSingleItem ? 0 : useTransform(x, range, outputRange, { clamp: false });
                    return (
                        <motion.div
                            key={index}
                            className={`carousel-item ${round ? "round" : ""}`}
                            style={{
                                width: itemWidth,
                                height: round ? itemWidth : "100%",
                                rotateY: rotateY,
                                ...(round && { borderRadius: "50%" }),
                            }}
                            transition={effectiveTransition}
                        >
                            <h2 className="section-mini-heading p-4 text-center w-full">{tripName}</h2>
                            <div className="p-4">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="carousel-item-content">
                                <div className="section-mini-heading mb-2">{item.name}</div>
                                <p className="carousel-item-description mb-4 font-myCustomFont text-sm">{item.caption}</p>
                                <ul className="mb-4">
                                    <li className="carousel-item-description">Duration: {item.duration}</li>
                                    <li className="carousel-item-description">Period: {item.period}</li>
                                    <li className="carousel-item-description">Starting point: {item.starting}</li>
                                    <li className="carousel-item-description">Cost: {item.cost}</li>
                                </ul>
                                <Link to={"/tour"} className="action-button">DETAILS</Link>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
            {/* Only show indicators if there's more than one item */}
            {!hasSingleItem && (
                <div className={`carousel-indicators-container ${round ? "round" : ""}`}>
                    <div className="carousel-indicators">
                        {tripData.map((_, index) => (
                            <motion.div
                                key={index}
                                className={`carousel-indicator ${currentIndex % tripData.length === index ? "active" : "inactive"}`}
                                animate={{
                                    scale: currentIndex % tripData.length === index ? 1.2 : 1,
                                }}
                                onClick={() => setCurrentIndex(index)}
                                transition={{ duration: 0.15 }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}