import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaInstagram,
    FaWhatsapp,
    FaChevronDown,
} from "react-icons/fa";
import DecryptedText from "../styling/DecryptedText";

gsap.registerPlugin(ScrollTrigger);

const contactCards = [
    {
        icon: <FaPhoneAlt className="w-5 h-5" />,
        label: "Call Us",
        primary: "+91 9663299663",
        secondary: "+91 7259128123",
        href: "tel:+91-9663299663",
        hrefSecondary: "tel:+91-7259128123",
    },
    {
        icon: <FaEnvelope className="w-5 h-5" />,
        label: "Email",
        primary: "info@beyondtarmacadv.com",
        href: "mailto:info@beyondtarmacadv.com",
    },
    {
        icon: <FaWhatsapp className="w-5 h-5" />,
        label: "WhatsApp",
        primary: "Send us a message",
        href: "https://api.whatsapp.com/send?phone=919663299663&text=Hello!%20I'm%20interested%20in%20learning%20more%20about%20Beyond%20Tarmac%20Adventures%20tours.",
        external: true,
    },
    {
        icon: <FaInstagram className="w-5 h-5" />,
        label: "Instagram",
        primary: "@beyondtarmacadv",
        href: "https://www.instagram.com/beyondtarmacadv/",
        external: true,
    },
];

const Contact = () => {
    const containerRef = useRef(null);
    const location = useLocation();
    const [formType, setFormType] = useState("general");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        tripInterest: "",
        message: "",
        // Tailor-made fields
        destination: "",
        numberOfDays: "",
        numberOfPeople: "",
        preferredDates: "",
        ridingExperience: "",
        vehicleType: "",
        hasPillion: false,
        specialRequirements: "",
    });
    const [formStatus, setFormStatus] = useState(null);

    // Pre-fill form if navigated from TourDetail tailor-made button
    useEffect(() => {
        if (location.state?.formType === "tailor") {
            setFormType("tailor");
            if (location.state.tourName) {
                setFormData((prev) => ({
                    ...prev,
                    specialRequirements: `Based on: ${location.state.tourName}`,
                }));
            }
            // Scroll to form
            setTimeout(() => {
                document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
            }, 300);
        }
    }, [location.state]);

    useGSAP(() => {
        gsap.fromTo(
            ".contact-card",
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.12,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".contact-cards-grid",
                    start: "top 85%",
                },
            }
        );

        gsap.fromTo(
            ".contact-form-wrapper",
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".contact-form-wrapper",
                    start: "top 80%",
                },
            }
        );

        gsap.fromTo(
            ".contact-map-wrapper",
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".contact-map-wrapper",
                    start: "top 80%",
                },
            }
        );

        gsap.fromTo(
            ".form-field",
            { opacity: 0, x: -20 },
            {
                opacity: 1,
                x: 0,
                stagger: 0.08,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".contact-form-inner",
                    start: "top 75%",
                },
            }
        );
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let lines;
        if (formType === "general") {
            lines = [
                `*New Enquiry from Website*`,
                `*Name:* ${formData.name}`,
                `*Email:* ${formData.email}`,
                formData.phone ? `*Phone:* ${formData.phone}` : null,
                formData.tripInterest ? `*Trip Interest:* ${formData.tripInterest}` : null,
                `*Message:* ${formData.message}`,
            ]
                .filter(Boolean)
                .join("\n");
        } else {
            lines = [
                `*Tailor-Made Tour Request*`,
                `*Name:* ${formData.name}`,
                `*Email:* ${formData.email}`,
                formData.phone ? `*Phone:* ${formData.phone}` : null,
                `*Destination:* ${formData.destination}`,
                `*Number of Days:* ${formData.numberOfDays}`,
                `*Number of People:* ${formData.numberOfPeople}`,
                formData.preferredDates ? `*Preferred Dates:* ${formData.preferredDates}` : null,
                formData.ridingExperience ? `*Riding Experience:* ${formData.ridingExperience}` : null,
                formData.vehicleType ? `*Vehicle:* ${formData.vehicleType}` : null,
                `*Pillion Rider:* ${formData.hasPillion ? "Yes" : "No"}`,
                formData.specialRequirements ? `*Special Requirements:* ${formData.specialRequirements}` : null,
            ]
                .filter(Boolean)
                .join("\n");
        }
        const encoded = encodeURIComponent(lines);
        window.open(
            `https://api.whatsapp.com/send?phone=919663299663&text=${encoded}`,
            "_blank",
            "noopener,noreferrer"
        );
        setFormStatus("sent");
        setTimeout(() => setFormStatus(null), 4000);
    };

    return (
        <div ref={containerRef} className="min-h-screen w-screen bg-neutral-black text-white overflow-hidden">
            {/* ===== TITLE + CARDS + ADDRESS SECTION ===== */}
            <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-32 sm:pt-36 md:pt-40 pb-6">
                <div className="text-center mb-8">
                    <DecryptedText
                        text="Get In Touch"
                        parentClassName="flex justify-center"
                        className="font-myCustomFont font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-blue-75"
                        encryptedClassName="font-myCustomFont font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-blue-75 opacity-40"
                        characters="█▓▒░▀▄▌▐"
                        animateOn="view"
                        revealDirection="start"
                        sequential
                        useOriginalCharsOnly={false}
                        speed={40}
                    />
                </div>

                {/* ===== CONTACT CAPSULES ===== */}
                <div className="contact-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {contactCards.map((card, i) => (
                        <a
                            key={i}
                            href={card.href}
                            target={card.external ? "_blank" : undefined}
                            rel={card.external ? "noopener noreferrer" : undefined}
                            className="contact-card block group"
                        >
                            <div className="relative h-full rounded-full border border-white/[0.06] bg-[#1c1c1c] px-5 py-3 overflow-hidden transition-all duration-500 hover:border-white/[0.15] hover:-translate-y-0.5">
                                {/* Subtle hover glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

                                <div className="relative z-10 flex items-center gap-3.5">
                                    {/* Monochromatic icon */}
                                    <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-white/[0.1] bg-white/[0.04] text-white/60 group-hover:bg-white/[0.08] group-hover:text-white group-hover:border-white/[0.2] transition-all duration-300">
                                        {card.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-white/40 text-[9px] uppercase tracking-[0.2em] font-general leading-none mb-0.5">
                                            {card.label}
                                        </p>
                                        <p className="text-white font-general text-xs font-medium truncate group-hover:text-brown-100 transition-colors duration-300">
                                            {card.primary}
                                        </p>
                                        {card.secondary && (
                                            <a
                                                href={card.hrefSecondary}
                                                className="text-white/40 font-general text-xs block truncate hover:text-white transition-colors"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {card.secondary}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* ===== FORM + MAP SECTION ===== */}
            <section id="contact-form" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24 md:pb-32 mt-6 md:mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Contact Form */}
                    <div className="contact-form-wrapper">
                        <div className="relative rounded-3xl border border-brown-100/20 bg-gradient-to-br from-neutral-black/80 to-[#1c2621]/60 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-[0_0_60px_rgba(137,87,59,0.08)]">
                            {/* Glow accent */}
                            <div className="absolute -top-px left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brown-100/40 to-transparent" />

                            <div className="contact-form-inner">
                                <h2 className="font-myCustomFont text-white text-2xl md:text-3xl font-bold mb-2">
                                    Send Us a Message
                                </h2>
                                <p className="text-neutral-gray font-general text-sm mb-8">
                                    Tell us about your dream trip and we'll get back to you within 24 hours.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Form Type Selector */}
                                    <div className="form-field">
                                        <label className="block text-neutral-gray text-xs uppercase tracking-widest font-general mb-2">
                                            Enquiry Type *
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setFormType("general")}
                                                className={`rounded-xl px-4 py-3 font-general text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer border ${formType === "general"
                                                    ? "bg-green-500 border-green-300 text-white"
                                                    : "bg-white/[0.04] border-white/[0.08] text-white/50 hover:bg-white/[0.06] hover:text-white/70"
                                                    }`}
                                            >
                                                General Reach Out
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFormType("tailor")}
                                                className={`rounded-xl px-4 py-3 font-general text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer border ${formType === "tailor"
                                                    ? "bg-green-500 border-green-300 text-white"
                                                    : "bg-white/[0.04] border-white/[0.08] text-white/50 hover:bg-white/[0.06] hover:text-white/70"
                                                    }`}
                                            >
                                                Tailor Made
                                            </button>
                                        </div>
                                    </div>

                                    {/* Common Fields: Name + Email */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="form-field">
                                            <label className="block text-neutral-gray text-xs uppercase tracking-widest font-general mb-2">
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Your name"
                                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white font-general text-sm placeholder:text-white/20 focus:outline-none focus:border-brown-100/50 focus:ring-1 focus:ring-brown-100/30 focus:bg-white/[0.06] transition-all duration-300"
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label className="block text-neutral-gray text-xs uppercase tracking-widest font-general mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="you@example.com"
                                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white font-general text-sm placeholder:text-white/20 focus:outline-none focus:border-brown-100/50 focus:ring-1 focus:ring-brown-100/30 focus:bg-white/[0.06] transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Common Field: Phone */}
                                    <div className="form-field">
                                        <label className="block text-neutral-gray text-xs uppercase tracking-widest font-general mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 XXXXX XXXXX"
                                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white font-general text-sm placeholder:text-white/20 focus:outline-none focus:border-brown-100/50 focus:ring-1 focus:ring-brown-100/30 focus:bg-white/[0.06] transition-all duration-300"
                                        />
                                    </div>

                                    {formType === "general" ? (
                                        <>
                                            {/* General: Trip Interest */}
                                            <div className="form-field">
                                                <label className="block text-neutral-gray text-xs uppercase tracking-widest font-general mb-2">
                                                    Interested In
                                                </label>
                                                <FormDropdown
                                                    value={formData.tripInterest}
                                                    onChange={(val) => setFormData((prev) => ({ ...prev, tripInterest: val }))}
                                                    placeholder="Select a trip"
                                                    options={[
                                                        { value: "Snow White Spiti", label: "Snow White Spiti" },
                                                        { value: "The Complete Circle", label: "The Complete Circle" },
                                                        { value: "La Himalaya", label: "La Himalaya" },
                                                        { value: "Trans himalayan", label: "Trans himalayan" },
                                                        { value: "The Moonland Tour", label: "The Moonland Tour" },
                                                        { value: "Rajasthan", label: "Rajasthan" },
                                                        { value: "Nepal", label: "Nēpālamā svāgata cha" },
                                                        { value: "North Eastern Nirvana", label: "North Eastern Nirvana" },
                                                        { value: "Southern Spice", label: "Southern Spice" },
                                                        { value: "Ride Skill Workshop", label: "Ride Skill Workshop" },
                                                    ]}
                                                />
                                            </div>

                                            {/* General: Message */}
                                            <div className="form-field">
                                                <label className="block text-neutral-gray text-xs uppercase tracking-widest font-general mb-2">
                                                    Message *
                                                </label>
                                                <textarea
                                                    name="message"
                                                    required
                                                    rows={4}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    placeholder="Tell us about your dream adventure..."
                                                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white font-general text-sm placeholder:text-white/20 focus:outline-none focus:border-brown-100/50 focus:ring-1 focus:ring-brown-100/30 focus:bg-white/[0.06] transition-all duration-300 resize-none"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* Tailor Made: Destination */}
                                            <div className="form-field">
                                                <label className="block text-neutral-gray text-xs uppercase tracking-widest font-general mb-2">
                                                    Destination / Region *
                                                </label>
                                                <FormDropdown
                                                    value={formData.destination}
                                                    onChange={(val) => setFormData((prev) => ({ ...prev, destination: val }))}
                                                    placeholder="Where do you want to ride?"
                                                    options={[
                                                        { value: "Spiti Valley", label: "Spiti Valley" },
                                                        { value: "Ladakh", label: "Ladakh" },
                                                        { value: "Himachal Pradesh", label: "Himachal Pradesh" },
                                                        { value: "Rajasthan", label: "Rajasthan" },
                                                        { value: "Nepal", label: "Nepal" },
                                                        { value: "North East India", label: "North East India" },
                                                        { value: "South India", label: "South India" },
                                                        { value: "Other", label: "Other (specify below)" },
                                                    ]}
                                                />
                                            </div>

                                            {/* Tailor Made: Days + People */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div className="form-field">
                                                    <label className="block text-neutral-gray text-xs uppercase tracking-widest font-general mb-2">
                                                        Number of Days *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="numberOfDays"
                                                        required
                                                        min="1"
                                                        max="30"
                                                        value={formData.numberOfDays}
                                                        onChange={handleChange}
                                                        placeholder="e.g. 7"
                                                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white font-general text-sm placeholder:text-white/20 focus:outline-none focus:border-brown-100/50 focus:ring-1 focus:ring-brown-100/30 focus:bg-white/[0.06] transition-all duration-300"
                                                    />
                                                </div>
                                                <div className="form-field">
                                                    <label className="block text-neutral-gray text-xs uppercase tracking-widest font-general mb-2">
                                                        Number of Riders *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="numberOfPeople"
                                                        required
                                                        min="1"
                                                        max="50"
                                                        value={formData.numberOfPeople}
                                                        onChange={handleChange}
                                                        placeholder="e.g. 4"
                                                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white font-general text-sm placeholder:text-white/20 focus:outline-none focus:border-brown-100/50 focus:ring-1 focus:ring-brown-100/30 focus:bg-white/[0.06] transition-all duration-300"
                                                    />
                                                </div>
                                            </div>

                                            {/* Tailor Made: Dates + Experience */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div className="form-field">
                                                    <label className="block text-neutral-gray text-xs uppercase tracking-widest font-general mb-2">
                                                        Preferred Dates
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="preferredDates"
                                                        value={formData.preferredDates}
                                                        onChange={handleChange}
                                                        placeholder="e.g. July 2026"
                                                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white font-general text-sm placeholder:text-white/20 focus:outline-none focus:border-brown-100/50 focus:ring-1 focus:ring-brown-100/30 focus:bg-white/[0.06] transition-all duration-300"
                                                    />
                                                </div>
                                                <div className="form-field">
                                                    <label className="block text-neutral-gray text-xs uppercase tracking-widest font-general mb-2">
                                                        Riding Experience
                                                    </label>
                                                    <FormDropdown
                                                        value={formData.ridingExperience}
                                                        onChange={(val) => setFormData((prev) => ({ ...prev, ridingExperience: val }))}
                                                        placeholder="Select level"
                                                        options={[
                                                            { value: "Beginner", label: "Beginner" },
                                                            { value: "Intermediate", label: "Intermediate" },
                                                            { value: "Experienced", label: "Experienced" },
                                                            { value: "Expert", label: "Expert" },
                                                        ]}
                                                    />
                                                </div>
                                            </div>

                                            {/* Tailor Made: Vehicle Type + Pillion */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div className="form-field">
                                                    <label className="block text-neutral-gray text-xs uppercase tracking-widest font-general mb-2">
                                                        Vehicle Type *
                                                    </label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => setFormData((prev) => ({ ...prev, vehicleType: "Bike" }))}
                                                            className={`rounded-xl px-4 py-3 font-general text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer border ${formData.vehicleType === "Bike"
                                                                ? "bg-green-500 border-green-300 text-white"
                                                                : "bg-white/[0.04] border-white/[0.08] text-white/50 hover:bg-white/[0.06] hover:text-white/70"
                                                                }`}
                                                        >
                                                            Motorcycle
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setFormData((prev) => ({ ...prev, vehicleType: "Car" }))}
                                                            className={`rounded-xl px-4 py-3 font-general text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer border ${formData.vehicleType === "Car"
                                                                ? "bg-green-500 border-green-300 text-white"
                                                                : "bg-white/[0.04] border-white/[0.08] text-white/50 hover:bg-white/[0.06] hover:text-white/70"
                                                                }`}
                                                        >
                                                            Car
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="form-field flex items-end">
                                                    <label className="flex items-center gap-3 cursor-pointer rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 w-full hover:bg-white/[0.06] transition-all duration-300">
                                                        <input
                                                            type="checkbox"
                                                            name="hasPillion"
                                                            checked={formData.hasPillion}
                                                            onChange={handleChange}
                                                            className="w-4 h-4 rounded border-white/20 accent-green-500 cursor-pointer"
                                                        />
                                                        <span className="text-white/70 font-general text-xs uppercase tracking-wider font-semibold">
                                                            Pillion Rider
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Tailor Made: Special Requirements */}
                                            <div className="form-field">
                                                <label className="block text-neutral-gray text-xs uppercase tracking-widest font-general mb-2">
                                                    Special Requirements
                                                </label>
                                                <textarea
                                                    name="specialRequirements"
                                                    rows={3}
                                                    value={formData.specialRequirements}
                                                    onChange={handleChange}
                                                    placeholder="Any specific stops, accommodation preferences, pillion riders, own bike, etc."
                                                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white font-general text-sm placeholder:text-white/20 focus:outline-none focus:border-brown-100/50 focus:ring-1 focus:ring-brown-100/30 focus:bg-white/[0.06] transition-all duration-300 resize-none"
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div className="form-field pt-2">
                                        <button
                                            type="submit"
                                            className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-green-500 px-10 py-3.5 font-general text-xs uppercase tracking-widest text-white font-semibold transition-all duration-300 hover:bg-green-300 hover:-translate-y-0.5 cursor-pointer"
                                        >
                                            <span className="relative z-10">
                                                Submit
                                            </span>
                                        </button>
                                    </div>

                                    {formStatus === "sent" && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-green-100 font-general text-sm animate-pulse"
                                        >
                                            Opening WhatsApp with your message...
                                        </motion.p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Map + Address */}
                    <div className="contact-map-wrapper flex flex-col gap-6">
                        {/* Map */}
                        <div className="flex-1 rounded-3xl border border-white/[0.06] overflow-hidden min-h-[350px] relative group">
                            <iframe
                                title="Beyond Tarmac Adventures Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d578.1083847686276!2d77.61120840931926!3d12.90552584075247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14e163287bb5%3A0x1fe11f1fc07a7a83!2sBEYOND%20TARMAC%20ADVENTURES!5e0!3m2!1sen!2sus!4v1775995887189!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: "350px" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            {/* Map overlay gradient */}
                            <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-inset ring-white/[0.06]" />
                        </div>

                        {/* Address Card */}
                        <div className="rounded-3xl border border-white/[0.06] bg-[#1c1c1c] p-6 md:p-8">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-11 h-11 rounded-full border border-white/[0.1] bg-white/[0.04] flex items-center justify-center text-white/60">
                                    <FaMapMarkerAlt className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-myCustomFont text-white text-lg font-bold mb-1">
                                        Visit Us
                                    </h3>
                                    <a
                                        href="https://maps.app.goo.gl/RHvNxfjpej3cZ3VG8"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-gray font-general text-sm leading-relaxed hover:text-brown-100 transition-colors duration-300"
                                    >
                                        Beyond Tarmac Adventures
                                        <br />
                                        92/2, 23rd Cross, 16th Main
                                        <br />
                                        BTM 2nd Stage, Bengaluru - 560076
                                    </a>
                                </div>
                            </div>

                            <div className="mt-6 pt-5 border-t border-white/[0.06] grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-general mb-1">
                                        Mon — Sat
                                    </p>
                                    <p className="text-white font-general text-sm">
                                        10:00 AM — 7:00 PM
                                    </p>
                                </div>
                                <div>
                                    <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-general mb-1">
                                        Sunday
                                    </p>
                                    <p className="text-white font-general text-sm">
                                        By Appointment
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FormDropdown = ({ value, onChange, placeholder, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    const selectedLabel = options.find((o) => o.value === value)?.label || "";

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full border border-white/[0.08] rounded-xl px-4 py-3 text-left font-general text-sm transition-all duration-300 cursor-pointer flex items-center justify-between gap-2 hover:border-white/[0.15] focus:outline-none focus:border-brown-100/50 focus:ring-1 focus:ring-brown-100/30"
                style={{ backgroundColor: '#1b1b1b' }}
            >
                <span className={selectedLabel ? "text-white" : "text-white/40"}>
                    {selectedLabel || placeholder}
                </span>
                <FaChevronDown className={`w-3 h-3 text-white/40 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-xl border border-white/[0.08] bg-[#1c1c1c] shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 font-general text-sm transition-all duration-200 cursor-pointer ${value === opt.value
                                    ? "bg-green-500/20 text-green-300 border-l-2 border-green-500"
                                    : "text-white/70 hover:bg-white/[0.06] hover:text-white border-l-2 border-transparent"
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Contact;
