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
            className="absolute top-full left-0 right-0 mt-2 mx-auto max-w-5xl rounded-2xl bg-[#f5f0eb] shadow-2xl border border-[#e0d6cc] overflow-hidden z-50 animate-popover-in"
        >
            <div className="flex flex-col md:flex-row">
                {/* Left: Depending on the period */}
                <div className="p-5 md:p-6 md:border-r border-b md:border-b-0 border-[#e0d6cc] md:w-[200px] shrink-0">
                    <h3 className="font-myCustomFont text-[#33443c] text-base md:text-lg font-bold italic mb-4 leading-tight">
                        Depending on the period
                    </h3>
                    <div className="flex flex-row flex-wrap md:flex-col gap-2">
                        {periods.map((period) => (
                            <Link
                                key={period}
                                to="/tours"
                                onClick={onClose}
                                className="px-4 py-2 rounded-full bg-[#d9d4cd] text-[#33443c] font-general text-[11px] uppercase tracking-wide font-semibold hover:bg-[#ccc5bc] transition-colors duration-200 text-left whitespace-nowrap cursor-pointer"
                            >
                                {period}
                            </Link>
                        ))}
                        <Link
                            to="/tours"
                            onClick={onClose}
                            className="px-4 py-2 rounded-full bg-[#33443c] text-white font-general text-[11px] uppercase tracking-wide font-semibold hover:bg-[#3d5349] transition-colors duration-200 text-left whitespace-nowrap cursor-pointer"
                        >
                            ALL DEPARTURES
                        </Link>
                    </div>
                </div>

                {/* Middle: According to our themes */}
                <div className="p-5 md:p-6 flex-1">
                    <h3 className="font-myCustomFont text-[#33443c] text-base md:text-lg font-bold mb-5 leading-tight">
                        According to our themes
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                        {themes.map((theme) => (
                            <Link
                                key={theme.name}
                                to="/tours"
                                onClick={onClose}
                                className="flex flex-col items-center gap-3 group cursor-pointer"
                            >
                                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-[3px] border-[#c9bfb3] group-hover:border-[#89573b] transition-colors duration-300">
                                    <img
                                        src={theme.image}
                                        alt={theme.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <span className="font-myCustomFont text-[#33443c] text-sm md:text-base font-bold text-center leading-tight">
                                    {theme.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right: Tailor-made */}
                <div className="m-3 md:m-4 md:w-[200px] shrink-0">
                    <div
                        className="relative h-full min-h-[180px] md:min-h-0 rounded-xl overflow-hidden flex flex-col justify-end p-5 cursor-pointer"
                        style={{
                            backgroundColor: "#33443c",
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0C40 22 20 40 0 40M80 0C80 44 44 80 0 80M120 0C120 66 66 120 0 120M160 0C160 88 88 160 0 160M200 0C200 110 110 200 0 200M200 40C178 40 160 58 160 80M200 80C178 80 160 98 160 120M200 120C178 120 160 138 160 160M200 160C178 160 160 178 160 200M160 40C160 62 142 80 120 80M160 80C160 102 142 120 120 120M160 120C160 142 142 160 120 160M160 160C160 182 142 200 120 200M120 40C120 62 102 80 80 80M120 80C120 102 102 120 80 120M120 120C120 142 102 160 80 160M120 160C120 182 102 200 80 200M80 40C80 62 62 80 40 80M80 80C80 102 62 120 40 120M80 120C80 142 62 160 40 160M80 160C80 182 62 200 40 200M40 40C40 62 22 80 0 80M40 80C40 102 22 120 0 120M40 120C40 142 22 160 0 160M40 160C40 182 22 200 0 200' fill='none' stroke='%234a5e52' stroke-width='1' opacity='0.5'/%3E%3C/svg%3E")`,
                            backgroundSize: "200px 200px",
                        }}
                        onClick={() => onClose()}
                    >
                        <Link to="/tours" className="absolute inset-0 z-10" onClick={onClose} />
                        <h4 className="font-myCustomFont text-[#c4943e] text-xl md:text-2xl font-bold italic mb-2 leading-tight">
                            Tailor-made
                        </h4>
                        <p className="text-[#d9d4cd] text-sm leading-snug font-general">
                            Our team can help make your dream trip a reality!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToursPopover;
