import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const centerSections = [
    {
        name: "Do Your Own Adventure",
        icon: "/img/images/icons/do your own adventure.png",
        link: "/tours",
    },
    {
        name: "Adventure on Wheels",
        icon: "/img/images/icons/adventure on 4 wheels.png",
        link: "/tours",
    },
    {
        name: "Work With Us",
        icon: "/img/images/icons/work with us.png",
        link: "/tours",
    },
];

const periods = [
    "JUNE 2026",
    "JULY 2026",
    "AUGUST 2026",
    "SEPTEMBER 2026",
];

const periodToMonth = {
    "JUNE 2026": "June",
    "JULY 2026": "July",
    "AUGUST 2026": "August",
    "SEPTEMBER 2026": "September",
};

const ToursPopover = ({ isOpen, onClose, anchorRef }) => {
    const popoverRef = useRef(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (!isOpen) return;
        const isMobile = window.innerWidth < 640;
        if (isMobile) {
            setPosition({
                top: 70,
                left: 16,
            });
        } else if (anchorRef?.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            const popoverWidth = Math.min(600, window.innerWidth - 32);
            const left = Math.max(16, Math.min(rect.left, window.innerWidth - popoverWidth - 16));
            setPosition({
                top: rect.bottom + 8,
                left,
            });
        }
    }, [isOpen, anchorRef]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(e.target) &&
                !(anchorRef?.current && anchorRef.current.contains(e.target))
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose, anchorRef]);

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

    // Center tile colors: dark grey tones
    const tileBgs = ["bg-[#2a2a2a]", "bg-[#333333]", "bg-[#2a2a2a]"];
    const tileHovers = [
        "hover:bg-[#353535]",
        "hover:bg-[#3e3e3e]",
        "hover:bg-[#353535]",
    ];

    return (
        <div
            ref={popoverRef}
            className="fixed z-[60] animate-popover-in w-[calc(100vw-2rem)] max-w-[600px]"
            style={{ top: position.top, left: position.left }}
        >
            {/* Main Wrapper — dark grey with low opacity */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-2xl sm:rounded-[2rem] backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

                {/* Column 1: Fixed Departures — dark grey */}
                <div className="w-full sm:w-[175px] shrink-0 rounded-xl sm:rounded-[1.25rem] p-3 sm:p-4 flex flex-col gap-2 sm:gap-2.5 bg-[#2a2a2a]">
                    <div className="flex justify-center mb-0.5">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-[#1f1f1f]/60 p-1.5 sm:p-2 flex items-center justify-center">
                            <img
                                src="/img/images/icons/fixed departures.png"
                                alt="Fixed Departures"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                    <h3 className="font-myCustomFont text-[#e0e0e0] text-xs sm:text-sm font-bold text-center uppercase">
                        Fixed Departures
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-1.5">
                        {periods.map((period) => (
                            <Link
                                key={period}
                                to={`/tours?month=${periodToMonth[period]}`}
                                onClick={onClose}
                                className="block w-full text-center py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg bg-[#e0e0e0] text-[#1a1a1a] font-general text-[10px] sm:text-[11px] uppercase tracking-wide font-bold hover:bg-[#f0f0f0] hover:scale-[1.02] hover:shadow-md transition-all duration-200"
                            >
                                {period}
                            </Link>
                        ))}
                        <Link
                            to="/tours"
                            onClick={onClose}
                            className="block w-full text-center py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg bg-[#111111] text-[#e0e0e0] font-general text-[10px] sm:text-[11px] uppercase tracking-wide font-bold hover:bg-[#0a0a0a] hover:scale-[1.02] hover:shadow-md transition-all duration-200 col-span-2 sm:col-span-1 mt-0.5"
                        >
                            ALL DEPARTURES
                        </Link>
                    </div>
                </div>

                {/* Column 2: Center — grey tiles */}
                <div className="flex-1 flex flex-col gap-2 sm:gap-2.5">
                    {/* Banner */}
                    <div className="w-full bg-[#1f1f1f]/90 rounded-lg sm:rounded-xl py-2 sm:py-2.5 px-3 sm:px-4 flex items-center justify-center">
                        <h3 className="font-myCustomFont text-[#e0e0e0] text-xs sm:text-sm md:text-base font-bold tracking-wide uppercase">
                            According to our themes
                        </h3>
                    </div>

                    {/* 3 Grey Tiles */}
                    <div className="grid grid-cols-3 sm:grid-cols-1 gap-1.5 sm:gap-2 flex-1">
                        {centerSections.map((section, index) => (
                            <Link
                                key={section.name}
                                to={section.link}
                                onClick={onClose}
                                className={`flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 p-2 sm:px-4 sm:py-3.5 rounded-lg sm:rounded-xl transition-all duration-300 group ${tileBgs[index]} ${tileHovers[index]} hover:-translate-y-0.5 hover:shadow-lg`}
                            >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-md sm:rounded-lg bg-[#3a3a3a]/50 p-1.5 sm:p-2 flex items-center justify-center group-hover:bg-[#3a3a3a]/80 group-hover:scale-105 transition-all duration-300">
                                    <img
                                        src={section.icon}
                                        alt={section.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="font-myCustomFont text-[#e0e0e0] text-[9px] sm:text-xs font-semibold text-center sm:text-left leading-tight line-clamp-2 uppercase tracking-wide">
                                    {section.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Column 3: Tailor Made — dark grey */}
                <div className="w-full sm:w-[155px] shrink-0 rounded-xl sm:rounded-[1.25rem] p-3 sm:p-4 flex flex-col items-center text-center relative overflow-hidden bg-[#2a2a2a]">
                    <Link to="/contact" state={{ formType: "tailor" }} className="absolute inset-0 z-20" onClick={onClose} />
                    <div className="relative z-10 flex flex-col mb-2 w-full">
                        <h4 className="font-myCustomFont text-[#e0e0e0] text-base sm:text-lg font-bold uppercase tracking-wide leading-none">
                            Tailor Made
                        </h4>
                    </div>
                    <div className="relative z-10 w-[65%] sm:w-[85%] aspect-square rounded-lg sm:rounded-xl bg-[#1f1f1f]/50 mb-2 sm:mb-3 flex items-center justify-center">
                        <img
                            src="/img/images/icons/Tailor made.png"
                            alt="Tailor Made"
                            className="w-3/4 h-3/4 object-contain"
                        />
                    </div>
                    <div className="relative z-10 flex flex-col w-full px-1">
                        <p className="text-[#b0b0b0] text-[10px] sm:text-[11px] leading-relaxed font-general">
                            Our team can help make your dream trip a reality!
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ToursPopover;