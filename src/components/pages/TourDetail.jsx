import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import toursData from "../../tours.json";
import Button from "../common/Button";
import AnimatedTitle from "../common/AnimatedTitle";
import Balatro from "../styling/Balatro";
import DecryptedText from "../styling/DecryptedText";
import ScrollTimeline from "../styling/ScrollTimeline";

gsap.registerPlugin(ScrollTrigger);

const TourDetail = () => {
    const { tourSlug } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [region, setRegion] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showLogoScreen, setShowLogoScreen] = useState(true);

    // Hide navbar during HUD loading screen
    useEffect(() => {
        const navEl = document.querySelector('nav')?.closest('.fixed');
        if (navEl) {
            if (showLogoScreen) {
                navEl.style.opacity = '0';
                navEl.style.pointerEvents = 'none';
                navEl.style.visibility = 'hidden';
            } else {
                navEl.style.opacity = '';
                navEl.style.pointerEvents = '';
                navEl.style.visibility = '';
            }
        }
        return () => {
            if (navEl) {
                navEl.style.opacity = '';
                navEl.style.pointerEvents = '';
                navEl.style.visibility = '';
            }
        };
    }, [showLogoScreen]);

    useEffect(() => {
        // Reset scroll position on mount
        window.scrollTo(0, 0);

        // Show logo screen on mount
        setShowLogoScreen(true);

        // Find the tour by slug
        let foundTour = null;
        let foundRegion = null;

        toursData.regions.forEach((reg) => {
            const tourMatch = reg.tours.find(
                (t) => t.name.toLowerCase().replace(/\s+/g, "-") === tourSlug
            );
            if (tourMatch) {
                foundTour = tourMatch;
                foundRegion = reg;
            }
        });

        if (foundTour && foundRegion) {
            setTour(foundTour);
            setRegion(foundRegion);
            setImageLoaded(false); // Reset image loaded state

            // Hide logo screen after 4 seconds
            const logoTimer = setTimeout(() => {
                setShowLogoScreen(false);
            }, 4000); // 4 seconds for HUD display

            return () => {
                clearTimeout(logoTimer);
            };
        } else {
            // Redirect to tours page if tour not found
            navigate("/tours");
        }
    }, [tourSlug, navigate]);

    useGSAP(() => {
        if (!tour) return;

        const ctx = gsap.context(() => {
            // Animate sections on scroll - each independently
            const sections = gsap.utils.toArray(".content-section");
            sections.forEach((section) => {
                gsap.from(section, {
                    opacity: 0,
                    y: 60,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        once: true,
                    },
                });
            });
        });

        return () => ctx.revert(); // Cleanup
    }, [tour]);

    if (!tour || !region) {
        return (
            <div className="flex-center absolute h-dvh w-screen overflow-hidden loader-bg">
                {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
                <div className="three-body">
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                    <div className="three-body__dot"></div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* HUD Interface Loading Screen - HALO Style */}
            <AnimatePresence mode="wait">
                {showLogoScreen && tour && region && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] bg-black/50 overflow-hidden"
                    >
                        {/* Subtle vignette */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />

                        {/* HUD Frame - Top edge lines */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                        <div className="absolute top-4 left-8 right-8 h-[1px] bg-cyan-400/20" />

                        {/* HUD Frame - Bottom edge lines */}
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                        <div className="absolute bottom-4 left-8 right-8 h-[1px] bg-cyan-400/20" />

                        {/* Top Center - Mission Info Bar */}
                        <motion.div
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="absolute top-[4%] sm:top-[6%] md:top-[8%] left-0 right-0 z-20 flex flex-col items-center justify-center"
                        >
                            {/* Energy bar frame */}
                            <div className="w-[400px] max-w-[80vw] h-8 relative">
                                <svg viewBox="0 0 400 32" className="w-full h-full">
                                    <polygon
                                        points="20,0 380,0 400,16 380,32 20,32 0,16"
                                        fill="rgba(0,0,0,0.7)"
                                        stroke="rgba(34,211,238,0.5)"
                                        strokeWidth="1"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-cyan-400 font-mono text-xs tracking-[0.3em]">
                                        {tour.name.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            {/* Sub info */}
                            <div className="text-center mt-2">
                                <span className="text-cyan-400/60 font-mono text-[10px] tracking-wider">
                                    EXPEDITION // {region.id.toUpperCase()}
                                </span>
                            </div>
                        </motion.div>

                        {/* Center - Rotating Logo with Rings */}
                        <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-0">
                            <motion.div
                                className="relative aspect-square w-[65vw] sm:w-[65vw] md:w-[55vw] lg:w-[45vw] xl:w-[38vw] 2xl:w-[32vw] max-w-[550px] min-w-[240px]"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
                            >

                                {/* Middle ring with enhanced segments */}
                                <motion.div
                                    className="absolute inset-[12%] rounded-full shadow-inner border sm:border-2"
                                    style={{
                                        background: 'conic-gradient(from 0deg, rgba(34, 211, 238, 0.15) 0deg, transparent 45deg, rgba(251, 146, 60, 0.15) 90deg, transparent 135deg, rgba(34, 211, 238, 0.15) 180deg, transparent 225deg, rgba(251, 146, 60, 0.15) 270deg, transparent 315deg, rgba(34, 211, 238, 0.15) 360deg)',
                                        borderColor: 'rgba(34, 211, 238, 0.4)',
                                        boxShadow: 'inset 0 0 10px rgba(34, 211, 238, 0.2), 0 0 10px rgba(34, 211, 238, 0.1)'
                                    }}
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Energy pulse rings */}
                                <motion.div
                                    className="absolute inset-[18%] rounded-full border border-cyan-400/30"
                                    animate={{
                                        scale: [1, 1.08, 1],
                                        opacity: [0.3, 0.6, 0.3]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                />

                                <motion.div
                                    className="absolute inset-[20%] rounded-full border border-orange-400/20"
                                    animate={{
                                        scale: [1, 1.04, 1],
                                        opacity: [0.4, 0.7, 0.4]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                />

                                {/* Inner circle with logo and enhanced effects */}
                                <div className="absolute inset-[24%] sm:inset-[22%] rounded-full bg-gradient-to-br from-orange-500/20 via-cyan-500/20 to-orange-500/20 backdrop-blur-sm border border-cyan-400/60 sm:border-2 flex items-center justify-center overflow-hidden shadow-xl sm:shadow-2xl shadow-cyan-500/30">
                                    {/* Animated radial gradient */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-radial from-cyan-500/30 via-transparent to-transparent"
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.4, 0.7, 0.4],
                                        }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    />

                                    {/* Secondary pulse */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-radial from-orange-500/20 via-transparent to-transparent"
                                        animate={{
                                            scale: [1.5, 1, 1.5],
                                            opacity: [0.2, 0.5, 0.2],
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    />

                                    {/* Rotating energy lines */}
                                    <motion.div
                                        className="absolute inset-0"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    >
                                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                                        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />
                                    </motion.div>

                                    {tour.monoLogo ? (
                                        <motion.img
                                            src={tour.monoLogo}
                                            alt="Tour Logo"
                                            className="w-[95%] sm:w-[95%] h-auto relative z-10 drop-shadow-lg"
                                            animate={{
                                                filter: [
                                                    'drop-shadow(0 0 8px rgba(34, 211, 238, 0.5))',
                                                    'drop-shadow(0 0 16px rgba(34, 211, 238, 0.7))',
                                                    'drop-shadow(0 0 8px rgba(34, 211, 238, 0.5))'
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        />
                                    ) : (
                                        <motion.span
                                            className="relative z-10 font-myCustomFont text-cyan-400 text-2xl sm:text-3xl md:text-4xl text-center px-4 uppercase drop-shadow-lg"
                                            animate={{
                                                textShadow: [
                                                    '0 0 8px rgba(34, 211, 238, 0.5)',
                                                    '0 0 16px rgba(34, 211, 238, 0.7)',
                                                    '0 0 8px rgba(34, 211, 238, 0.5)'
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            {tour.name}
                                        </motion.span>
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        {/* TOP LEFT - Coordinates */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="absolute top-[18%] sm:top-[16%] md:top-[15%] left-4 sm:left-8 md:left-16"
                        >
                            <div className="space-y-0.5">
                                <div className="text-cyan-400/60 font-mono text-[10px] tracking-wider uppercase">Coordinates</div>
                                <div className="text-cyan-400 font-mono text-sm">32.24°N</div>
                                <div className="text-cyan-400 font-mono text-sm">78.03°E</div>
                            </div>
                            <div className="mt-3 space-y-0.5">
                                <div className="text-cyan-400/60 font-mono text-[10px] tracking-wider uppercase">Altitude</div>
                                <div className="text-cyan-400 font-mono text-sm">3,800M</div>
                            </div>
                        </motion.div>

                        {/* TOP RIGHT - Tour Stats */}
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="absolute top-[18%] sm:top-[16%] md:top-[15%] right-4 sm:right-8 md:right-16 text-right"
                        >
                            <div className="space-y-0.5">
                                <div className="text-cyan-400/60 font-mono text-[10px] tracking-wider uppercase">Duration</div>
                                <div className="text-cyan-400 font-mono text-sm">{tour.duration.toUpperCase()}</div>
                            </div>
                            <div className="mt-3 space-y-0.5">
                                <div className="text-cyan-400/60 font-mono text-[10px] tracking-wider uppercase">Cost</div>
                                <div className="text-cyan-400 font-mono text-sm">{tour.cost}</div>
                            </div>
                        </motion.div>

                        {/* BOTTOM LEFT - Radar */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="absolute bottom-[18%] sm:bottom-[16%] md:bottom-[15%] left-4 sm:left-8 md:left-16"
                        >
                            <div className="text-cyan-400/60 font-mono text-[10px] tracking-wider text-left uppercase mb-2">
                                Terrain Scan
                            </div>
                            <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36">
                                {/* Radar background with glow */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-black/80 to-black/95 border border-cyan-400/40 shadow-lg shadow-cyan-400/10" />

                                {/* Outer glow effect */}
                                <div className="absolute inset-0 rounded-full bg-cyan-400/5 blur-sm" />

                                {/* Radar circles - more refined */}
                                <div className="absolute inset-3 rounded-full border border-cyan-400/30" />
                                <div className="absolute inset-6 rounded-full border border-cyan-400/25" />
                                <div className="absolute inset-9 rounded-full border border-cyan-400/20" />

                                {/* Radar cross lines - more subtle */}
                                <div className="absolute top-1/2 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                                <div className="absolute left-1/2 top-3 bottom-3 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />

                                {/* Diagonal cross lines for authenticity */}
                                <div
                                    className="absolute top-1/2 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent origin-center"
                                    style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }}
                                />
                                <div
                                    className="absolute top-1/2 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent origin-center"
                                    style={{ transform: 'translate(-50%, -50%) rotate(-45deg)' }}
                                />

                                {/* Radar sweep with improved gradient */}
                                <motion.div
                                    className="absolute inset-0 rounded-full overflow-hidden"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                >
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(34, 211, 238, 0.4) 20deg, rgba(34, 211, 238, 0.2) 40deg, transparent 60deg)',
                                            filter: 'blur(1px)'
                                        }}
                                    />
                                </motion.div>

                                {/* Scanning line (sweep indicator) */}
                                <motion.div
                                    className="absolute top-1/2 left-1/2 origin-left"
                                    style={{
                                        width: '50%',
                                        height: '2px',
                                        background: 'linear-gradient(to right, rgba(34, 211, 238, 0.8), transparent)',
                                        transformOrigin: 'left center'
                                    }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Center point with glow */}
                                <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="absolute inset-0 bg-cyan-400 rounded-full blur-sm" />
                                    <div className="absolute inset-0 bg-cyan-400 rounded-full" />
                                </div>

                                {/* Blips with better positioning and effects */}
                                <motion.div
                                    className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2"
                                    style={{ top: '28%', left: '65%' }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-cyan-400 rounded-full"
                                        animate={{
                                            opacity: [1, 0.3, 1],
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 bg-cyan-400 rounded-full blur-sm"
                                        animate={{ opacity: [0.5, 0.2, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </motion.div>

                                <motion.div
                                    className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2"
                                    style={{ top: '58%', left: '30%' }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-cyan-400 rounded-full"
                                        animate={{
                                            opacity: [0.3, 1, 0.3],
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 bg-cyan-400 rounded-full blur-sm"
                                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                                    />
                                </motion.div>

                                <motion.div
                                    className="absolute w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2"
                                    style={{ top: '72%', left: '68%' }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-cyan-400 rounded-full"
                                        animate={{
                                            opacity: [0.4, 0.8, 0.4],
                                            scale: [1, 1.3, 1]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 bg-cyan-400 rounded-full blur-sm"
                                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                    />
                                </motion.div>

                                {/* Corner markers for tech aesthetic */}
                                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-cyan-400/50" />
                                <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-cyan-400/50" />
                                <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-cyan-400/50" />
                                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-cyan-400/50" />
                            </div>
                        </motion.div>

                        {/* BOTTOM RIGHT - Region Info */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="absolute bottom-[18%] sm:bottom-[16%] md:bottom-[15%] right-4 sm:right-8 md:right-16 text-right"
                        >
                            <div className="space-y-0.5">
                                <div className="text-cyan-400/60 font-mono text-[10px] tracking-wider uppercase">Region</div>
                                <div className="text-cyan-400 font-mono text-sm">{region.name.toUpperCase()}</div>
                            </div>
                            <div className="mt-3 flex items-center gap-2 justify-end">
                                <motion.div
                                    className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                                <span className="text-cyan-400 font-mono text-[10px] uppercase">System Ready</span>
                            </div>
                        </motion.div>

                        {/* BOTTOM CENTER - Loading Bar */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="absolute bottom-[4%] sm:bottom-[6%] md:bottom-[8%] left-0 right-0 flex justify-center"
                        >
                            <div className="w-56 md:w-72">
                                <div className="flex justify-between items-center mb-0.5 text-center">
                                    <span className="text-cyan-400/60 font-mono text-[10px] uppercase">Loading</span>
                                    <motion.span
                                        className="text-cyan-400 font-mono text-[10px] uppercase"
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    >
                                        Initializing...
                                    </motion.span>
                                </div>
                                <div className="h-0.5 bg-cyan-400/20 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-cyan-400"
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 3.5, ease: "easeInOut" }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Scan line effect */}
                        <motion.div
                            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none"
                            animate={{ y: ['0vh', '100vh'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showLogoScreen ? 0 : 1 }}
                transition={{ duration: 0.6, delay: 0, ease: "easeInOut" }}
                className="min-h-screen w-screen bg-neutral-black text-white pt-20"
            >
                {/* Hero Section */}
                <section className="tour-hero relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-black pt-20 sm:pt-24">
                    {/* Balatro Overlay - Blended on top of image */}
                    <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-40">
                        <Balatro
                            isRotate={false}
                            mouseInteraction={false}
                            pixelFilter={1000}
                            color1="#763919"
                            color2="#102103"
                            color3="#010b18"
                        />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 z-20 bg-gradient-to-b from-neutral-black/30 via-neutral-black/50 to-neutral-black pointer-events-none" />

                    {/* Content Layer */}
                    <div className="relative z-30 text-center px-6 max-w-5xl">
                        <div className="inline-block bg-brown-100/20 text-brown-100 px-6 py-3 rounded-full font-robert-medium text-body-small mb-6 backdrop-blur-sm border border-brown-100/30">
                            {region.name}
                        </div>

                        {/* Main Logo - only shown when tour has a logo image */}
                        {tour.mainLogo && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: showLogoScreen ? 0 : 1,
                                    scale: showLogoScreen ? 0.8 : 1
                                }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0,
                                    ease: [0.43, 0.13, 0.23, 0.96]
                                }}
                                className="w-[60vw] sm:w-[50vw] md:w-[40vw] lg:w-[35vw] xl:w-[30vw] max-w-lg mx-auto mb-6"
                            >
                                <img
                                    src={tour.mainLogo}
                                    alt={tour.name}
                                    className="w-full h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                    loading="eager"
                                />
                            </motion.div>
                        )}

                        {/* Tour Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: showLogoScreen ? 0 : 1,
                                y: showLogoScreen ? 20 : 0
                            }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mb-4"
                        >
                            {!showLogoScreen && (
                                <DecryptedText
                                    text={tour.name}
                                    parentClassName="flex justify-center"
                                    className="font-myCustomFont font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase text-blue-75"
                                    encryptedClassName="font-myCustomFont font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase text-blue-75 opacity-40"
                                    characters="█▓▒░▀▄▌▐"
                                    animateOn="view"
                                    revealDirection="start"
                                    sequential
                                    useOriginalCharsOnly={false}
                                    speed={60}
                                />
                            )}
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showLogoScreen ? 0 : 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-body text-white mb-8 italic max-w-3xl mx-auto"
                        >
                            {tour.caption}
                        </motion.p>
                    </div>
                </section>

                {/* Quick Info Grid */}
                <section className="info-grid py-20 px-6 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="info-card bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-8 rounded-2xl border border-[#496156] hover:border-brown-100 transition-all duration-300">
                            <FaClock className="text-4xl text-brown-100 mb-4" />
                            <p className="text-label text-neutral-gray mb-2">Duration</p>
                            <p className="text-heading-secondary">{tour.duration}</p>
                        </div>

                        <div className="info-card bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-8 rounded-2xl border border-[#496156] hover:border-brown-100 transition-all duration-300">
                            <FaCalendarAlt className="text-4xl text-brown-100 mb-4" />
                            <p className="text-label text-neutral-gray mb-2">Period</p>
                            <p className="text-heading-secondary">{tour.period}</p>
                        </div>

                        <div className="info-card bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-8 rounded-2xl border border-[#496156] hover:border-brown-100 transition-all duration-300">
                            <FaMapMarkerAlt className="text-4xl text-brown-100 mb-4" />
                            <p className="text-label text-neutral-gray mb-2">Starting Point</p>
                            <p className="text-heading-secondary">{tour.starting}</p>
                        </div>

                        <div className="info-card bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-8 rounded-2xl border border-[#496156] hover:border-brown-100 transition-all duration-300">
                            <FaMoneyBillWave className="text-4xl text-brown-100 mb-4" />
                            <p className="text-label text-neutral-gray mb-2">Starting From</p>
                            <p className="text-heading-secondary text-brown-100">{tour.cost}</p>
                        </div>
                    </div>
                </section>

                {/* Content Container */}
                <div className="content-container max-w-7xl mx-auto px-6 pb-20">
                    {/* Tour Map Section */}
                    <section className="content-section mb-20">
                        <div className="mb-10 section-heading">
                            <DecryptedText
                                text="Tour Route"
                                parentClassName="flex justify-center"
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-50"
                                encryptedClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-50 opacity-40"
                                characters="█▓▒░▀▄▌▐"
                                animateOn="view"
                                revealDirection="center"
                                sequential
                                useOriginalCharsOnly={false}
                                speed={40}
                                initialDelay={500}
                            />
                        </div>
                        <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm border border-[#496156] rounded-2xl p-4 md:p-8 overflow-hidden">
                            <img
                                src="/img/images/tours/map_images/snow_white_spiti_map.png"
                                alt="Tour Route Map"
                                className="w-full h-auto rounded-xl"
                            />
                        </div>
                    </section>
                    {/* Overview Section */}
                    {(tour.brief || tour.about) && (
                        <section className="content-section mb-20">
                            <div className="mb-10 section-heading">
                                <DecryptedText
                                    text="Tour Overview"
                                    parentClassName="flex justify-center"
                                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-50"
                                    encryptedClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-50 opacity-40"
                                    characters="█▓▒░▀▄▌▐"
                                    animateOn="view"
                                    revealDirection="center"
                                    sequential
                                    useOriginalCharsOnly={false}
                                    speed={40}
                                    initialDelay={500}
                                />
                            </div>
                            <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm border border-[#496156] rounded-2xl p-8 md:p-12">
                                {tour.brief && (
                                    <p className="text-body text-neutral-gray">
                                        {tour.brief}
                                    </p>
                                )}
                                {tour.about && (
                                    <p className="text-body text-neutral-gray mt-6">
                                        {tour.about}
                                    </p>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Highlights Section */}
                    {tour.highlights && tour.highlights.length > 0 && (
                        <section className="content-section mb-20">
                            <div className="mb-10 section-heading">
                                <DecryptedText
                                    text="Tour Highlights"
                                    parentClassName="flex justify-center"
                                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-50"
                                    encryptedClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-50 opacity-40"
                                    characters="█▓▒░▀▄▌▐"
                                    animateOn="view"
                                    revealDirection="center"
                                    sequential
                                    useOriginalCharsOnly={false}
                                    speed={40}
                                    initialDelay={500}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {tour.highlights.map((highlight, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-xl border border-[#496156] hover:border-brown-100/50 transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            <FaCheckCircle className="text-brown-100 text-xl flex-shrink-0 mt-1" />
                                            <p className="text-body-small text-neutral-gray">
                                                {highlight}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Itinerary Section - Scroll Timeline */}
                    {tour.itinerary && tour.itinerary.length > 0 && (
                        <section className="content-section mb-20">
                            <div className="mb-10 section-heading">
                                <DecryptedText
                                    text="Day by Day Itinerary"
                                    parentClassName="flex justify-center"
                                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-50"
                                    encryptedClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-50 opacity-40"
                                    characters="█▓▒░▀▄▌▐"
                                    animateOn="view"
                                    revealDirection="center"
                                    sequential
                                    useOriginalCharsOnly={false}
                                    speed={40}
                                    initialDelay={500}
                                />
                            </div>
                            <ScrollTimeline
                                items={tour.itinerary.map((day, index) => ({
                                    title: day.title,
                                    description: day.description || null,
                                }))}
                            />
                        </section>
                    )}

                    {/* Inclusions & Exclusions */}
                    <section className="content-section mb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Inclusions */}
                            {tour.inclusions && tour.inclusions.length > 0 && (
                                <div>
                                    <div className="mb-6 section-heading">
                                        <DecryptedText
                                            text="What's Included"
                                            parentClassName="flex justify-center"
                                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-50"
                                            encryptedClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-50 opacity-40"
                                            characters="█▓▒░▀▄▌▐"
                                            animateOn="view"
                                            revealDirection="center"
                                            sequential
                                            useOriginalCharsOnly={false}
                                            speed={40}
                                            initialDelay={500}
                                        />
                                    </div>
                                    <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm border border-[#496156] rounded-2xl p-8">
                                        <ul className="space-y-4">
                                            {tour.inclusions.map((item, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <FaCheckCircle className="text-brown-100 text-lg flex-shrink-0 mt-1" />
                                                    <span className="text-body-small text-neutral-gray">
                                                        {item}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Exclusions */}
                            {tour.exclusions && tour.exclusions.length > 0 && (
                                <div>
                                    <div className="mb-6 section-heading">
                                        <DecryptedText
                                            text="What's Not Included"
                                            parentClassName="flex justify-center"
                                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-50"
                                            encryptedClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-50 opacity-40"
                                            characters="█▓▒░▀▄▌▐"
                                            animateOn="view"
                                            revealDirection="center"
                                            sequential
                                            useOriginalCharsOnly={false}
                                            speed={40}
                                            initialDelay={500}
                                        />
                                    </div>
                                    <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm border border-[#496156] rounded-2xl p-8">
                                        <ul className="space-y-4">
                                            {tour.exclusions.map((item, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <FaTimesCircle className="text-red-400 text-lg flex-shrink-0 mt-1" />
                                                    <span className="text-body-small text-neutral-gray">
                                                        {item}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Why Us Section */}
                    {tour.whyUs && (
                        <section className="content-section mb-20">
                            <div className="mb-10 section-heading">
                                <DecryptedText
                                    text="Why Choose Us?"
                                    parentClassName="flex justify-center"
                                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-50"
                                    encryptedClassName="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-50 opacity-40"
                                    characters="█▓▒░▀▄▌▐"
                                    animateOn="view"
                                    revealDirection="center"
                                    sequential
                                    useOriginalCharsOnly={false}
                                    speed={40}
                                    initialDelay={500}
                                />
                            </div>
                            <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm border border-[#496156] rounded-2xl p-8 md:p-12">
                                <p className="text-body text-neutral-gray">
                                    {tour.whyUs}
                                </p>
                            </div>
                        </section>
                    )}

                    {/* CTA Section */}
                    <section className="content-section">
                        <div className="bg-gradient-to-br from-brown-100 to-[#8a5a3a] rounded-2xl p-6 sm:p-8 md:p-12 text-center text-white border border-brown-100">
                            <h2 className="font-myCustomFont text-3xl sm:text-4xl md:text-5xl mb-4">
                                Ready for the Adventure?
                            </h2>
                            <p className="text-heading-secondary mb-8 !font-general text-sm sm:text-base">
                                Book your spot now and create memories that last a lifetime
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a href="https://wa.me/919663299663" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                    <Button
                                        title="Book Now on WhatsApp"
                                        leftIcon={<TiLocationArrow />}
                                        containerClass="!bg-white !text-black hover:!bg-neutral-gray transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
                                    />
                                </a>
                                <Link to="/tours" className="w-full sm:w-auto">
                                    <Button
                                        title="View All Tours"
                                        containerClass="!bg-black !text-white border border-white hover:!bg-neutral-black transition-all duration-300 w-full sm:w-auto"
                                    />
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </motion.div>
        </>
    );
};

export default TourDetail;
