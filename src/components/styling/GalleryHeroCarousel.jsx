import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DecryptedText from "./DecryptedText";
import "./ToursHeroCarousel.css";
import { TiLocationArrow } from "react-icons/ti";

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

const GalleryHeroCarousel = ({ images }) => {
    // Show top 15 images to avoid heavy loading
    const carouselImages = images.slice(0, 15);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const progressRef = useRef(null);
    const startTimeRef = useRef(Date.now());
    const containerRef = useRef(null);

    const totalSlides = carouselImages.length;

    // Preload images
    useEffect(() => {
        let loaded = 0;
        const total = carouselImages.length;

        carouselImages.forEach((img) => {
            const image = new Image();
            image.src = img;
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
    }, [carouselImages]);

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
            style={{ height: "100vh", height: "100dvh" }}
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
                    className={`tours-hero__slide ${imagesLoaded ? "tours-hero__slide--active" : ""}`}
                >
                    {imagesLoaded ? (
                        <img
                            src={carouselImages[currentIndex]}
                            alt={`Gallery image ${currentIndex + 1}`}
                            draggable={false}
                        />
                    ) : (
                        <div className="tours-hero__shimmer" />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Gradient overlays */}
            <div className="tours-hero__overlay tours-hero__overlay--gradient" style={{ background: "linear-gradient(to bottom, rgba(27, 27, 27, 0.5) 0%, rgba(27, 27, 27, 0.1) 30%, rgba(27, 27, 27, 0.1) 45%, rgba(27, 27, 27, 0.6) 70%, rgba(27, 27, 27, 1) 95%, rgba(27, 27, 27, 1) 100%)" }} />
            <div className="tours-hero__overlay tours-hero__overlay--vignette" />

            {/* Floating particles */}
            <div className="tours-hero__particles">
                <div className="tours-hero__particle" />
                <div className="tours-hero__particle" />
                <div className="tours-hero__particle" />
            </div>

            {/* Main content */}
            <div className="tours-hero__content" style={{ zIndex: 20 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center relative z-20"
                >
                    <div className="section-heading">
                        <DecryptedText
                            text="OUR GALLERY"
                            parentClassName="flex justify-center"
                            className="special-font hero-heading text-blue-75 mb-6 drop-shadow-2xl"
                            encryptedClassName="special-font hero-heading text-blue-75 mb-6 opacity-40"
                            characters="█▓▒░▀▄▌▐"
                            animateOn="view"
                            revealDirection="start"
                            sequential
                            useOriginalCharsOnly={false}
                            speed={40}
                        />
                    </div>
                    <p className="font-robert-regular text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-neutral-gray leading-relaxed mb-8 drop-shadow-lg">
                        Explore our adventures through this immersive 3D gallery experience
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-20 w-full px-6 z-30">
                <div className="flex gap-4 justify-center items-center">
                    <TiLocationArrow className="text-brown-100 text-3xl sm:text-4xl animate-bounce" />
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                    <p className="font-general text-xs sm:text-sm text-neutral-gray uppercase tracking-widest animate-pulse mt-4">Scroll to explore</p>
                </div>
            </div>
        </div>
    );
};

export default GalleryHeroCarousel;
