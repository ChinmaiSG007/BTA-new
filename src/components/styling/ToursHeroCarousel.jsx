import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ToursHeroCarousel.css";

// Tour slider images
const SLIDER_IMAGES = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    src: `/img/images/tours/tours_image_slider/tour_slider_image_${i + 1}.jpg`,
    alt: `Tour adventure ${i + 1}`,
}));

const AUTO_PLAY_INTERVAL = 5500;

const slideVariants = {
    enter: (direction) => ({
        opacity: 0,
        scale: 1.05,
        x: direction > 0 ? 60 : -60,
    }),
    center: {
        opacity: 1,
        scale: 1,
        x: 0,
        zIndex: 1,
    },
    exit: (direction) => ({
        opacity: 0,
        scale: 0.98,
        x: direction < 0 ? 60 : -60,
        zIndex: 0,
    }),
};

const ToursHeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const progressRef = useRef(null);
    const startTimeRef = useRef(Date.now());
    const containerRef = useRef(null);

    const totalSlides = SLIDER_IMAGES.length;

    // Preload images
    useEffect(() => {
        let loaded = 0;
        const total = SLIDER_IMAGES.length;

        SLIDER_IMAGES.forEach((img) => {
            const image = new Image();
            image.src = img.src;
            image.onload = () => {
                loaded++;
                if (loaded >= Math.min(3, total)) {
                    setImagesLoaded(true);
                }
            };
            image.onerror = () => {
                loaded++;
                if (loaded >= Math.min(3, total)) {
                    setImagesLoaded(true);
                }
            };
        });

        // Fallback
        const timeout = setTimeout(() => setImagesLoaded(true), 3000);
        return () => clearTimeout(timeout);
    }, []);

    const goToSlide = useCallback(
        (index) => {
            setDirection(index > currentIndex ? 1 : -1);
            setCurrentIndex(index);
            setProgress(0);
            startTimeRef.current = Date.now();
        },
        [currentIndex]
    );

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
        setProgress(0);
        startTimeRef.current = Date.now();
    }, [totalSlides]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
        setProgress(0);
        startTimeRef.current = Date.now();
    }, [totalSlides]);

    // Auto-play with progress tracking
    useEffect(() => {
        if (isPaused || !imagesLoaded) return;

        startTimeRef.current = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTimeRef.current;
            const newProgress = Math.min(elapsed / AUTO_PLAY_INTERVAL, 1);
            setProgress(newProgress);

            if (newProgress >= 1) {
                nextSlide();
                return;
            }
            progressRef.current = requestAnimationFrame(animate);
        };

        progressRef.current = requestAnimationFrame(animate);

        return () => {
            if (progressRef.current) {
                cancelAnimationFrame(progressRef.current);
            }
        };
    }, [currentIndex, isPaused, imagesLoaded, nextSlide]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [nextSlide, prevSlide]);

    return (
        <div
            ref={containerRef}
            className="tours-hero"
        >
            {/* Background slides */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        opacity: { duration: 0.8, ease: "easeInOut" },
                        x: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                        scale: { duration: 0.8, ease: "easeInOut" },
                    }}
                    className={`tours-hero__slide ${imagesLoaded ? "tours-hero__slide--active" : ""
                        }`}
                >
                    {imagesLoaded ? (
                        <img
                            src={SLIDER_IMAGES[currentIndex].src}
                            alt={SLIDER_IMAGES[currentIndex].alt}
                            draggable={false}
                        />
                    ) : (
                        <div className="tours-hero__shimmer" />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Gradient overlays */}
            <div className="tours-hero-pattern-overlay" />
            <div className="tours-hero__overlay tours-hero__overlay--gradient" />
            <div className="tours-hero__overlay tours-hero__overlay--vignette" />

            {/* Floating particles */}
            <div className="tours-hero__particles">
                <div className="tours-hero__particle" />
                <div className="tours-hero__particle" />
                <div className="tours-hero__particle" />
            </div>

            {/* Counter badge */}
            <div className="tours-hero__counter glass">
                <span className="font-general">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
                </span>
            </div>

            {/* Main content */}
            <div className="tours-hero__content">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="tours-hero__title-card glass--subtle"
                >
                    {/* Decorative line */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "3rem" }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="h-[2px] bg-gradient-to-r from-brown-500 to-brown-300 mx-auto mb-6"
                    />

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="font-general text-[10px] sm:text-xs uppercase tracking-[0.3em] text-brown-100 mb-4"
                    >
                        Beyond Tarmac Adventures
                    </motion.p>

                    {/* Title */}
                    <h1 className="special-font hero-heading text-blue-75 mb-4 drop-shadow-2xl">
                        EPIC T<b>O</b>URS
                    </h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="font-general text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-neutral-gray/90 leading-relaxed"
                    >
                        Embark on unforgettable motorcycle journeys through the world&apos;s
                        most stunning landscapes
                    </motion.p>

                    {/* Decorative line bottom */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "3rem" }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="h-[2px] bg-gradient-to-r from-brown-300 to-brown-500 mx-auto mt-6"
                    />
                </motion.div>
            </div>

            {/* Navigation bar */}
            <div
                className="tours-hero__nav"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => {
                    setIsPaused(false);
                    startTimeRef.current = Date.now() - progress * AUTO_PLAY_INTERVAL;
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="tours-hero__nav-inner glass"
                >
                    {/* Prev arrow */}
                    <button
                        onClick={prevSlide}
                        className="tours-hero__arrow"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    {/* Dots with progress */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        {SLIDER_IMAGES.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`tours-hero__dot ${index === currentIndex
                                    ? "tours-hero__dot--active"
                                    : index < currentIndex
                                        ? "tours-hero__dot--completed"
                                        : ""
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            >
                                {/* Completed: fully filled */}
                                {index < currentIndex && (
                                    <div className="tours-hero__dot-fill" style={{ width: "100%" }} />
                                )}
                                {/* Active: animated progress fill */}
                                {index === currentIndex && (
                                    <motion.div
                                        className="tours-hero__dot-fill"
                                        initial={{ width: "0%" }}
                                        animate={{
                                            width: `${progress * 100}%`,
                                        }}
                                        transition={{ duration: 0.05, ease: "linear" }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Next arrow */}
                    <button
                        onClick={nextSlide}
                        className="tours-hero__arrow"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={16} />
                    </button>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="tours-hero__scroll"
            >
                <p className="font-general text-[10px] sm:text-xs text-neutral-gray/60 uppercase tracking-[0.2em]">
                    Scroll
                </p>
                <div className="tours-hero__scroll-line" />
            </motion.div>
        </div>
    );
};

export default ToursHeroCarousel;
