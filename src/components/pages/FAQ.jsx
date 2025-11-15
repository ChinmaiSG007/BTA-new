import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";
import { FaChevronDown } from "react-icons/fa";
import AnimatedTitle from "../common/AnimatedTitle";
import Balatro from "../styling/Balatro";

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
    const containerRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(null);

    useGSAP(() => {
        // Animate FAQ items on scroll
        gsap.fromTo(".faq-item",
            {
                opacity: 0,
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".faq-container",
                    start: "top 80%",
                },
            }
        );
    }, []);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "Is India the land where we'll roam, with motorcycles as our trusty comb?",
            answer: "Indeed, India's vast and diverse terrain, with mountains, deserts, and fields of grain"
        },
        {
            question: "Are the roads as wild as they say, with twists and turns along the way?",
            answer: "Oh yes, the roads will challenge your art, with hairpin bends and climbs that start."
        },
        {
            question: "What is the deal with all these weird ride types?",
            answer: `Each expedition has a very different terrain so we have created the following classifications:

Easy Rider – relatively flat terrain with no off-roading.

Avid Explorer – Hilly or mountainous terrain with limited off-roading for those who want it.

Road Warrior – Mountainous terrain and some mandatory off-roading sections, e.g. gravel & dirt roads, some streams.

All our rides can be handled by a rider with limited to no off-road experience. You will be amazed at what you are capable of.`
        },
        {
            question: "Can I ride as pillion?",
            answer: "Yes, only if you bring a rider along with you. But if you are thinking of riding pillion on other motorbikes, we are afraid that you cannot."
        },
        {
            question: "I have no prior experience riding in Himalayas or riding Royal Enfield?",
            answer: "Do not worry about that If you know riding any bike then you can easily ride here as well. We will also give you a day to get adopted with the new bike and environment. We will also guide you about the driving rules in India and Himalayas. Apart from this a tour leader will lead the group."
        },
        {
            question: "Do you provide custom tour for the groups?",
            answer: "Yes, we do provide custom tour for a group. For custom tour contact us or email us."
        },
        {
            question: "What if there is a medical emergency?",
            answer: "Our tour leads are WAFA (Wilderness advanced first aid) / WFR (Wilderness first responders) with sufficient knowledge to get you out of any complicated situations. A Comprehensive medical & first aid kit (including bottled oxygen) will be with us all the time. However, for an emergency which requires hospital care, we must rely on the nearest available medical facility in the region, under the circumstances."
        },
        {
            question: "Will I encounter any surprises on the road, like monkeys stealing my snacks?",
            answer: "Monkey business is always a possibility! Keep your snacks secure and your camera ready for unexpected encounters with India's mischievous wildlife. Who knows, you might just capture the next viral sensation!"
        },
        {
            question: "Are Indian roads as chaotic as they seem in the movies?",
            answer: "Think of it as a thrilling rollercoaster ride without the safety harness! Yes, Indian roads can be bustling with activity, but with a mix of patience, defensive driving, and a good playlist, you will navigate the chaos like a seasoned Bollywood stunt double"
        },
        {
            question: "What types of motorcycles are suitable for touring in India?",
            answer: "Adventure touring bikes, cruisers, and dual-sport motorcycles are popular choices for touring in India due to their comfort, reliability, and ability to handle various terrains."
        },
        {
            question: "Are there any cultural norms I should respect while touring in India?",
            answer: "Respect local customs and traditions by dressing modestly, observing traffic rules, and refraining from honking unnecessarily. Always seek permission before taking photographs of people or religious sites."
        },
        {
            question: "What is the best time of year for motorcycle touring in India?",
            answer: "The best time for motorcycle touring varies by region. While the summer months (April to June) are ideal for riding in the Himalayas, winter (October to March) is perfect for exploring South India and coastal regions."
        },
        {
            question: "Can I travel solo on a motorcycle tour in India, or is it safer to join a group?",
            answer: "Both options are viable, depending on your comfort level and experience. Solo travel allows for more flexibility and independence, while joining a group tour provides camaraderie and support, especially for first-time visitors to India."
        }
    ];

    return (
        <div ref={containerRef} className="min-h-screen w-screen bg-neutral-black text-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background with gradient overlay */}
                <div className="absolute inset-0 bg-neutral-black">
                    <div className="absolute inset-0 bg-gradient-to-b from-neutral-black/60 via-neutral-black/80 to-neutral-black z-10" />
                </div>

                <Balatro
                    isRotate={false}
                    mouseInteraction={true}
                    pixelFilter={1000}
                    color1="#763919"
                    color2="#102103"
                    color3="#010b18"
                />

                <div className="relative z-20 text-center px-6">
                    <h1 className="special-font hero-heading text-blue-75 mb-6">
                        FREQUENTLY ASKED QUESTIONS
                    </h1>
                    <p className="text-body max-w-4xl mx-auto text-neutral-gray mb-8">
                        Whether you're a new customer looking to learn more about what we offer or a long-time user seeking clarification on specific topics, this page has clear and concise information about Beyond Tarmac Adventures.
                    </p>
                </div>

                <div className="absolute bottom-20 w-full px-6 z-20">
                    <div className="flex gap-4 justify-center items-center">
                        <TiLocationArrow className="text-brown-100 text-3xl sm:text-4xl animate-bounce" />
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                        <p className="text-label text-neutral-gray animate-pulse">Scroll to explore</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-container py-20 px-6 max-w-5xl mx-auto">
                <AnimatedTitle
                    title="Your <b>Questions</b> Answered"
                    containerClass="mb-12 text-center"
                />

                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="faq-item bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm rounded-2xl border border-[#496156] overflow-hidden transition-all duration-300 hover:border-brown-100/50"
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className={`w-full px-6 py-5 flex items-center justify-between text-left transition-all duration-300 hover:bg-brown-100/10  ${openIndex === index ? 'bg-[#1c2621]' : ''}`}
                            >
                                <h3 className="!font-myCustomFont text-heading-secondary text-white pr-4">
                                    {faq.question}
                                </h3>
                                <FaChevronDown
                                    className={`text-brown-100 text-xl flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-6 pb-5 pt-2">
                                    <p className="!font-general text-body text-neutral-gray whitespace-pre-line">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center">
                    <p className="text-heading-secondary text-neutral-gray mb-6">
                        Still have questions?
                    </p>
                    <a href="https://wa.me/919663299663" target="_blank" rel="noopener noreferrer">
                        <button className="bg-brown-100 text-white px-8 py-4 rounded-full font-general font-semibold text-lg hover:bg-brown-300 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
                            Contact Us on WhatsApp
                            <TiLocationArrow className="text-xl" />
                        </button>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
