import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const themes = [
    {
        name: "Adventure motorcycle training",
        image: "/img/images/tours/tours_image_slider/tour_slider_image_1.jpg",
    },
    {
        name: "Adventure Tour",
        image: "/img/images/tours/tours_image_slider/tour_slider_image_5.jpg",
    },
    {
        name: "Motorcycle Ramble",
        image: "/img/images/tours/tours_image_slider/tour_slider_image_3.jpg",
    },
    {
        name: "Freedom",
        image: "/img/images/tours/tours_image_slider/tour_slider_image_7.jpg",
    },
];

const periods = [
    "JUNE 2026",
    "JULY 2026",
    "AUGUST 2026",
    "SEPTEMBER 2026",
];

const ToursPopover = ({ isOpen, onClose }) => {
    const popoverRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popoverRef.current && !popoverRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
        }
        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={popoverRef}
            className="absolute top-full left-0 right-0 mt-3 mx-auto max-w-4xl shadow-2xl z-50 animate-popover-in px-4"
        >
            {/* Main Wrapper matching the 3-column layout of the drawing */}
            <div className="flex flex-col md:flex-row gap-3 p-3 rounded-[2rem] border border-white/20 bg-neutral-900/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">

                {/* Column 1: Left Container (Stacked Rectangles) */}
                <div
                    className="w-full md:w-40 shrink-0 rounded-[1.5rem] p-4 flex flex-col gap-3 shadow-inner"
                    style={{ backgroundColor: "#89573b" }}
                >
                    <h3 className="font-myCustomFont text-white text-base font-bold text-center mb-1 uppercase">
                        Period
                    </h3>
                    <div className="flex flex-col gap-2">
                        {periods.map((period) => (
                            <Link
                                key={period}
                                to="/tours"
                                onClick={onClose}
                                className="block w-full text-center py-2.5 px-3 rounded-xl bg-[#d9d4cd] text-[#33443c] font-general text-[11px] uppercase tracking-wide font-bold hover:bg-white hover:scale-[1.02] hover:shadow-md transition-all duration-200"
                            >
                                {period}
                            </Link>
                        ))}
                        <Link
                            to="/tours"
                            onClick={onClose}
                            className="block w-full text-center py-2.5 px-3 mt-1 rounded-xl bg-[#222d27] text-[#d9d4cd] font-general text-[11px] uppercase tracking-wide font-bold hover:bg-black hover:scale-[1.02] hover:shadow-md transition-all duration-200"
                        >
                            ALL DEPARTURES
                        </Link>
                    </div>
                </div>

                {/* Column 2: Middle Container (Top Banner + Cards Grid) */}
                <div className="flex-1 flex flex-col gap-3">
                    {/* Top Horizontal Banner */}
                    <div className="w-full bg-white/10 border border-white/10 rounded-2xl py-3 px-4 flex items-center justify-center shadow-sm">
                        <h3 className="font-myCustomFont text-white text-base md:text-lg font-bold tracking-wide uppercase">
                            According to our themes
                        </h3>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1">
                        {themes.map((theme) => (
                            <Link
                                key={theme.name}
                                to="/tours"
                                onClick={onClose}
                                className="flex flex-col items-center p-2 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/15 hover:-translate-y-1 transition-all duration-300 group"
                            >
                                {/* Rounded Square Image */}
                                <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 border-2 border-transparent group-hover:border-[#d9d4cd]/50 transition-colors">
                                    <img
                                        src={theme.image}
                                        alt={theme.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                {/* Two lines of text below */}
                                <span className="font-myCustomFont text-[#d9d4cd] text-xs font-semibold text-center leading-tight line-clamp-2 px-1">
                                    {theme.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Column 3: Right Container (Square Box on Top + Text Below) */}
                <div
                    className="w-full md:w-48 shrink-0 rounded-[1.5rem] p-4 flex flex-col items-center text-center shadow-inner relative overflow-hidden"
                    style={{ backgroundColor: "#33443c" }}
                >
                    <Link to="/tours" className="absolute inset-0 z-20" onClick={onClose} />
                    <div className="relative z-10 flex flex-col mb-2 w-full px-2">
                        <h4 className="font-myCustomFont text-[#c4943e] text-lg font-bold uppercase tracking-wideleading-none">
                            Tailor made
                        </h4>
                    </div>
                    {/* Top Square Element (Matching the drawing) */}
                    <div className="w-[85%] aspect-square rounded-2xl bg-[#4a5e52]/40 border border-[#4a5e52] mb-4 flex items-center justify-center overflow-hidden relative group">

                    </div>

                    {/* Text Block Below */}
                    <div className="relative z-10 flex flex-col mt-2 w-full px-2">
                        <p className="text-[#d9d4cd] text-[11px] leading-relaxed font-general">
                            Our team can help make your dream trip a reality!
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ToursPopover;