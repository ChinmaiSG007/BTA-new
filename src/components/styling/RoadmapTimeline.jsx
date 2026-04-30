import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { submitToSheets } from "../../utils/submitToSheets";

/*
 * RoadmapTimeline – serpentine road with itinerary stops
 *
 * 2 items per road row. Markers at ~30% and ~70% of each straight segment.
 * Stems alternate up/down. Text labels beside each badge.
 */

const RoadmapTimeline = ({ items = [], tourId = "", tourName = "" }) => {
    const containerRef = useRef(null);

    /* ---------- Gate ---------- */
    const VISIBLE_COUNT = 4;
    const storageKey = tourId ? `roadmap_unlocked_${tourId}` : null;
    const [unlocked, setUnlocked] = useState(() => {
        if (!storageKey) return false;
        try { return localStorage.getItem(storageKey) === "true"; } catch { return false; }
    });
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    /* Only render visible items — locked data NEVER enters the DOM */
    const displayItems = unlocked ? items : items.slice(0, VISIBLE_COUNT);
    const hasHiddenItems = items.length > VISIBLE_COUNT && !unlocked;

    const handleFormChange = useCallback((field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }, []);

    const validateForm = useCallback(() => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            errors.email = "Enter a valid email";
        }
        if (!formData.phone.trim()) {
            errors.phone = "Phone number is required";
        } else if (!/^\+?[\d\s-]{7,15}$/.test(formData.phone.trim())) {
            errors.phone = "Enter a valid phone number";
        }
        return errors;
    }, [formData]);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const errors = validateForm();
            if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
            setSubmitting(true);
            setSubmitError(false);

            const success = await submitToSheets({
                sheet: "tours",
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                tour: tourName || tourId || "",
            });

            if (success) {
                setUnlocked(true);
                if (storageKey) {
                    try { localStorage.setItem(storageKey, "true"); } catch { /* quota */ }
                }
                setShowModal(false);
            } else {
                setSubmitError(true);
            }
            setSubmitting(false);
        },
        [validateForm, formData, tourName, tourId, storageKey]
    );

    /* ---------- Scroll-based progress ---------- */
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 90%", "end 30%"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60, damping: 25, restDelta: 0.001,
    });

    /* ---------- Layout constants ---------- */
    const svgWidth = 800;
    const roadWidth = 44;
    const turnRadius = 70;
    const padding = turnRadius + roadWidth / 2 + 10;
    const laneLeft = padding;
    const laneRight = svgWidth - padding;
    const rowSpacing = 240;
    const stemLength = 55;
    const badgeRadius = 15;
    const itemsPerRow = 2;

    /* Road uses displayItems — only shows what's unlocked */
    const totalRows = Math.ceil(displayItems.length / itemsPerRow);
    /* When locked, extend the road 1 extra row so it trails off into the unlock card */
    const roadRows = hasHiddenItems ? totalRows + 1 : totalRows;

    /* ---------- SVG dimensions ---------- */
    const topPad = 60;
    const bottomPad = 220;
    const svgHeight = topPad + Math.max(0, roadRows - 1) * rowSpacing + bottomPad;

    /* ---------- Build serpentine path (uses roadRows so road extends past stops when locked) ---------- */
    const serpentinePath = useMemo(() => {
        if (roadRows === 0) return "";
        let d = "";
        let y = topPad;

        for (let r = 0; r < roadRows; r++) {
            const goesRight = r % 2 === 0;
            const startX = goesRight ? laneLeft : laneRight;
            const endX = goesRight ? laneRight : laneLeft;

            if (r === 0) d += `M ${startX} ${y}`;
            d += ` L ${endX} ${y}`;

            if (r < roadRows - 1) {
                const nextY = y + rowSpacing;
                const cp1y = y + rowSpacing * 0.15;
                const cp2y = nextY - rowSpacing * 0.15;
                if (goesRight) {
                    const cx = endX + turnRadius;
                    d += ` C ${cx} ${cp1y}, ${cx} ${cp2y}, ${endX} ${nextY}`;
                } else {
                    const cx = endX - turnRadius;
                    d += ` C ${cx} ${cp1y}, ${cx} ${cp2y}, ${endX} ${nextY}`;
                }
                y = nextY;
            }
        }
        return d;
    }, [roadRows, laneLeft, laneRight, rowSpacing, topPad, turnRadius]);

    /* ---------- Stop positions ---------- */
    const stopPositions = useMemo(() => {
        const positions = [];
        let y = topPad;
        const midX = svgWidth / 2;

        for (let r = 0; r < totalRows; r++) {
            const goesRight = r % 2 === 0;
            const startIdx = r * itemsPerRow;
            const rowItemCount = Math.min(itemsPerRow, displayItems.length - startIdx);

            for (let j = 0; j < rowItemCount; j++) {
                const globalIdx = startIdx + j;
                const t = rowItemCount === 1 ? 0.3 : j === 0 ? 0.25 : 0.75;
                let x;
                if (goesRight) { x = laneLeft + t * (laneRight - laneLeft); }
                else { x = laneRight - t * (laneRight - laneLeft); }

                positions.push({
                    x, y, stemDir: 1, goesRight, index: globalIdx, isLeftSide: x < midX,
                });
            }
            if (r < totalRows - 1) y += rowSpacing;
        }
        return positions;
    }, [displayItems.length, totalRows, laneLeft, laneRight, topPad, rowSpacing, itemsPerRow, svgWidth]);

    /* ---------- Scroll progress ---------- */
    const dashOffset = useTransform(smoothProgress, [0, 1], [1, 0]);

    const stopProgressFractions = useMemo(() => {
        if (stopPositions.length === 0) return [];
        return stopPositions.map(({ index }) => {
            const row = Math.floor(index / itemsPerRow);
            const j = index % itemsPerRow;
            const tInRow = j === 0 ? 0.25 : 0.75;
            const straightFrac = 0.8 / totalRows;
            const curveFrac = 0.2 / Math.max(1, totalRows - 1);
            const rowStart = row * (straightFrac + curveFrac);
            return rowStart + tInRow * straightFrac;
        });
    }, [stopPositions, totalRows, itemsPerRow]);

    /* ---------- Highlight cards ---------- */
    const [passedProgress, setPassedProgress] = useState(0);

    useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (v) => setPassedProgress(v));
        return unsubscribe;
    }, [smoothProgress]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const cards = container.querySelectorAll(".roadmap-card");
        cards.forEach((card, i) => {
            const threshold = stopProgressFractions[i] ?? 1;
            if (passedProgress >= threshold) {
                card.style.borderColor = "rgba(212,165,116,0.45)";
                card.style.boxShadow = "0 0 18px rgba(212,165,116,0.15), inset 0 0 12px rgba(212,165,116,0.04)";
                card.style.background = "rgba(30,26,22,0.85)";
            } else {
                card.style.borderColor = "rgba(212,165,116,0.15)";
                card.style.boxShadow = "none";
                card.style.background = "rgba(26,26,26,0.7)";
            }
        });
    }, [passedProgress, stopProgressFractions, displayItems]);

    if (!items || items.length === 0) return null;

    /* =========== Input field helper =========== */
    const inputStyle = {
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(212,165,116,0.15)",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
    };
    const focusHandlers = {
        onFocus: (e) => {
            e.target.style.borderColor = "rgba(212,165,116,0.4)";
            e.target.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.2), 0 0 0 2px rgba(212,165,116,0.1)";
        },
        onBlur: (e) => {
            e.target.style.borderColor = "rgba(212,165,116,0.15)";
            e.target.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.2)";
        },
    };

    return (
        <section className="relative py-8" ref={containerRef}>
            <div className="relative w-full max-w-4xl mx-auto px-2 sm:px-4">
                {/* SVG road */}
                <svg
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className="w-full h-auto"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ overflow: "visible" }}
                >
                    <defs>
                        <filter id="roadShadow" x="-10%" y="-10%" width="120%" height="120%">
                            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
                        </filter>
                        <linearGradient id="roadProgress" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#d4a574" />
                            <stop offset="100%" stopColor="#b8834a" />
                        </linearGradient>
                    </defs>

                    {/* 1. Shadow */}
                    <path d={serpentinePath} fill="none" stroke="#0a0a0a" strokeWidth={roadWidth + 14} strokeLinecap="round" strokeLinejoin="round" filter="url(#roadShadow)" opacity="0.4" />
                    {/* 2. Road edge */}
                    <path d={serpentinePath} fill="none" stroke="#3a3a3a" strokeWidth={roadWidth + 8} strokeLinecap="round" strokeLinejoin="round" />
                    {/* 3. Road surface */}
                    <path d={serpentinePath} fill="none" stroke="#444444" strokeWidth={roadWidth} strokeLinecap="round" strokeLinejoin="round" />
                    {/* 4. Subtle edge highlight */}
                    <path d={serpentinePath} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={roadWidth + 2} strokeLinecap="round" strokeLinejoin="round" />
                    <path d={serpentinePath} fill="none" stroke="#444444" strokeWidth={roadWidth - 2} strokeLinecap="round" strokeLinejoin="round" />
                    {/* 5. Center dashed line */}
                    <path d={serpentinePath} fill="none" stroke="#d4a574" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="16 12" opacity="0.7" />
                    {/* 6. Scroll-progress glow */}
                    <motion.path d={serpentinePath} fill="none" stroke="url(#roadProgress)" strokeWidth={roadWidth - 10} strokeLinecap="round" strokeLinejoin="round" pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: dashOffset }} opacity="0.45" />

                    {/* ---- Road dots + Stems + Badges + Text Cards ---- */}
                    {stopPositions.map(({ x, y, stemDir, index, isLeftSide }) => {
                        const stemStartY = y + stemDir * (roadWidth / 2 + 2);
                        const stemEndY = y + stemDir * (roadWidth / 2 + stemLength);
                        const badgeCY = stemEndY + stemDir * (badgeRadius + 4);
                        const realItem = displayItems[index];
                        const cardTitle = realItem?.title;
                        const cardOnRight = !isLeftSide;
                        const cardW = 185;
                        const cardH = 90;
                        const cardGap = 10;
                        const foX = cardOnRight ? x + badgeRadius + cardGap : x - badgeRadius - cardGap - cardW;
                        const foY = badgeCY - cardH / 2;

                        return (
                            <g key={index}>
                                <circle cx={x} cy={y} r="6" fill="#d4a574" stroke="#2a2a2a" strokeWidth="2.5" />
                                <circle cx={x} cy={y} r="2.5" fill="#2a2a2a" />
                                <line x1={x} y1={stemStartY} x2={x} y2={stemEndY} stroke="#888" strokeWidth="2" strokeLinecap="round" />
                                <circle cx={x} cy={badgeCY} r={badgeRadius + 6} fill="none" stroke="#d4a574" strokeWidth="0" opacity="0" className="badge-glow" />
                                <circle cx={x} cy={badgeCY} r={badgeRadius} fill="#d4a574" stroke="#1a1a1a" strokeWidth="2.5" />
                                <text x={x} y={badgeCY + 5} textAnchor="middle" fill="#1a1a1a" fontSize="14" fontWeight="bold" fontFamily="'General Sans', sans-serif">
                                    {index + 1}
                                </text>
                                {cardTitle && (
                                    <foreignObject x={foX} y={foY} width={cardW} height={cardH} overflow="visible">
                                        <div
                                            xmlns="http://www.w3.org/1999/xhtml"
                                            className="roadmap-card"
                                            style={{
                                                padding: "8px 10px", borderRadius: "8px",
                                                border: "1px solid rgba(212,165,116,0.15)",
                                                background: "rgba(26,26,26,0.7)",
                                                backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
                                                textAlign: cardOnRight ? "left" : "right",
                                                height: "100%", display: "flex", flexDirection: "column", justifyContent: "center",
                                                transition: "border-color 0.4s, box-shadow 0.4s, background 0.4s",
                                            }}
                                        >
                                            <p style={{ fontSize: "10px", color: "#d4a574", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: 1, fontFamily: "'General Sans', sans-serif", margin: "0 0 4px 0" }}>
                                                Day {index + 1}
                                            </p>
                                            <p style={{ color: "#e5e5e5", fontSize: "12px", lineHeight: 1.4, fontFamily: "'General Sans', sans-serif", margin: 0 }}>
                                                {cardTitle}
                                            </p>
                                        </div>
                                    </foreignObject>
                                )}
                            </g>
                        );
                    })}
                    {/* Fade gradient at end of road when locked */}
                    {hasHiddenItems && (
                        <rect
                            x="0" y={svgHeight - bottomPad - rowSpacing * 0.3}
                            width={svgWidth} height={rowSpacing + bottomPad}
                            fill="url(#roadFade)"
                        />
                    )}
                    {hasHiddenItems && (
                        <defs>
                            <linearGradient id="roadFade" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgb(27,27,27)" stopOpacity="0" />
                                <stop offset="40%" stopColor="rgb(27,27,27)" stopOpacity="0.7" />
                                <stop offset="100%" stopColor="rgb(27,27,27)" stopOpacity="1" />
                            </linearGradient>
                        </defs>
                    )}
                </svg>
            </div>

            {/* ──── Unlock CTA Card — overlaps the fading road ──── */}
            {hasHiddenItems && (
                <div className="relative z-10 max-w-2xl mx-auto -mt-40 sm:-mt-48 px-4">
                    <div
                        className="relative rounded-3xl overflow-hidden border border-white/[0.08]"
                        style={{
                            background: "linear-gradient(145deg, rgba(35,30,25,0.85) 0%, rgba(20,18,16,0.95) 100%)",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.4), 0 0 30px rgba(212,165,116,0.05)",
                        }}
                    >
                        <div className="px-6 sm:px-10 py-8 sm:py-10 text-center">
                            {/* Lock icon */}
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-full" style={{ background: "rgba(212,165,116,0.12)", border: "1px solid rgba(212,165,116,0.25)" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#d4a574" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="font-myCustomFont text-white text-xl sm:text-2xl font-bold mb-2">
                                Unlock Full Itinerary
                            </h3>
                            <p className="text-neutral-400 font-general text-sm mb-6 max-w-md mx-auto">
                                You've seen the first {Math.min(VISIBLE_COUNT, items.length)} days. Enter your details to unlock the complete{" "}
                                <span className="text-[#d4a574] font-semibold">{items.length}-day</span> journey.
                            </p>

                            <motion.button
                                onClick={() => { setSubmitError(false); setShowModal(true); }}
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#d4a574] text-[#1a1a1a] font-bold text-sm font-general tracking-wide cursor-pointer transition-shadow duration-300 hover:shadow-lg hover:shadow-[#d4a574]/20"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                                </svg>
                                View Full Itinerary
                            </motion.button>
                        </div>
                    </div>
                </div>
            )}

            {/* ========== Lead Capture Modal (Portaled) ========== */}
            {createPortal(
                <AnimatePresence>
                    {showModal && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                            style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
                            onClick={() => setShowModal(false)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                                transition={{ duration: 0.3, type: "spring", damping: 25 }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full max-w-md rounded-2xl overflow-hidden"
                                style={{
                                    border: "1px solid rgba(212,165,116,0.25)",
                                    background: "linear-gradient(145deg, rgba(35,30,25,0.95) 0%, rgba(20,18,16,0.97) 100%)",
                                    boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,165,116,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
                                    backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                                }}
                            >
                                {/* Modal header */}
                                <div className="relative px-6 pt-6 pb-4" style={{ borderBottom: "1px solid rgba(212,165,116,0.1)" }}>
                                    <h3 className="text-lg sm:text-xl font-bold text-white font-general">Unlock Full Itinerary</h3>
                                    <p className="text-sm text-neutral-400 mt-1 font-general">Enter your details to view the complete day-by-day plan.</p>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                                        aria-label="Close modal"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Modal form */}
                                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                                    <div>
                                        <label className="block text-xs text-[#d4a574]/70 font-general mb-1.5 uppercase tracking-wider font-semibold">Full Name</label>
                                        <input type="text" value={formData.name} onChange={(e) => handleFormChange("name", e.target.value)} placeholder="John Doe"
                                            className="w-full px-4 py-2.5 rounded-lg text-white text-sm font-general placeholder:text-neutral-500 focus:outline-none transition-all"
                                            style={inputStyle} {...focusHandlers} />
                                        {formErrors.name && <p className="text-red-400 text-xs mt-1 font-general">{formErrors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs text-[#d4a574]/70 font-general mb-1.5 uppercase tracking-wider font-semibold">Email Address</label>
                                        <input type="email" value={formData.email} onChange={(e) => handleFormChange("email", e.target.value)} placeholder="john@example.com"
                                            className="w-full px-4 py-2.5 rounded-lg text-white text-sm font-general placeholder:text-neutral-500 focus:outline-none transition-all"
                                            style={inputStyle} {...focusHandlers} />
                                        {formErrors.email && <p className="text-red-400 text-xs mt-1 font-general">{formErrors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs text-[#d4a574]/70 font-general mb-1.5 uppercase tracking-wider font-semibold">Phone Number</label>
                                        <input type="tel" value={formData.phone} onChange={(e) => handleFormChange("phone", e.target.value)} placeholder="+91 98765 43210"
                                            className="w-full px-4 py-2.5 rounded-lg text-white text-sm font-general placeholder:text-neutral-500 focus:outline-none transition-all"
                                            style={inputStyle} {...focusHandlers} />
                                        {formErrors.phone && <p className="text-red-400 text-xs mt-1 font-general">{formErrors.phone}</p>}
                                    </div>
                                    <button type="submit" disabled={submitting}
                                        className="w-full py-3 rounded-lg bg-[#d4a574] text-[#1a1a1a] font-bold text-sm sm:text-base font-general tracking-wide hover:bg-[#c4955a] transition-colors disabled:opacity-60 cursor-pointer"
                                        style={{ boxShadow: "0 4px 15px rgba(212,165,116,0.25)" }}>
                                        {submitting ? "Unlocking…" : "View Full Itinerary"}
                                    </button>
                                </form>

                                {submitError && (
                                    <p className="px-6 pb-4 text-red-400 text-sm font-general text-center animate-pulse">
                                        Something went wrong. Please try again.
                                    </p>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
};

export default RoadmapTimeline;
