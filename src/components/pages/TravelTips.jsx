import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TiLocationArrow } from "react-icons/ti";
import AnimatedTitle from "../common/AnimatedTitle";
import Balatro from "../styling/Balatro";

gsap.registerPlugin(ScrollTrigger);

const TravelTips = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Animate sections on scroll
        gsap.fromTo(".tips-section",
            {
                opacity: 0,
                y: 50,
            },
            {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".tips-container",
                    start: "top 80%",
                },
            }
        );

        // Animate kit items
        gsap.fromTo(".kit-item",
            {
                opacity: 0,
                x: -20,
            },
            {
                opacity: 1,
                x: 0,
                stagger: 0.05,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".kit-list-section",
                    start: "top 80%",
                },
            }
        );
    }, []);

    const northIndiaKitList = [
        { item: "HELMET", importance: "ESSENTIAL", description: "A helmet must be always worn when on the bike." },
        { item: "JACKET", importance: "ESSENTIAL", description: "A riding jacket that features a removable lining is highly recommended. This is ideal as it allows adjustment of kit according to temperature changes during the day." },
        { item: "BOOTS", importance: "RECOMMENDED", description: "Sturdy, over the ankle, boots are good. Off-road boots are highly recommended as they offer the best lower leg protection due to a sturdier construction." },
        { item: "GLOVES", importance: "ESSENTIAL", description: "" },
        { item: "SUNGLASSES", importance: "ESSENTIAL", description: "" },
        { item: "BASIC FIRST AID KIT", importance: "ESSENTIAL", description: "Include a sufficient supply of any personal medication. Items that may be very useful include rehydration salt sachets, paracetamol, pain killers, antiseptic cream, and sticking plasters." },
        { item: "SUN BLOCK", importance: "ESSENTIAL", description: "A high factor is strongly recommended." },
        { item: "SCARF / BANDANA", importance: "RECOMMENDED", description: "" },
        { item: "FLEECE / PULLOVER", importance: "RECOMMENDED", description: "" },
        { item: "THERMAL BASE-LAYER", importance: "RECOMMENDED", description: "Basically, thermal underwear! It is worth purchasing a base layer specifically designed for outdoor pursuits as it will have properties built in to keep moisture away from the body and keep the wearer dry and warm. Separate top and bottoms rather than an all-in-one suit are recommended." },
        { item: "WATERPROOFS", importance: "ESSENTIAL", description: "The changeable conditions in the Himalayas mean that there is the very real possibility of rain or even snow during the tour. A lightweight waterproof suit serves a dual purpose – it keeps the rain out but can also act as an extra insulation against wind and cold. Suits are available as either a one or a two-piece, both of which have their advantages. For example, the one-piece is more watertight, whereas the two-piece can be worn as separate items and is easier to put on and remove." },
        { item: "HYDRATION PACK", importance: "RECOMMENDED", description: "This is the best way to carry drinking water; the pack is carried in a purpose-made rucksack and the water fed through a drinking tube. This enables the rider to keep hydrated without the need to remove the helmet. The rucksack can also be used to carry small items of kit." },
        { item: "TOWEL", importance: "", description: "" },
        { item: "TRAINERS OR SANDALS", importance: "", description: "" },
        { item: "T-SHIRTS", importance: "", description: "" },
        { item: "TROUSERS", importance: "", description: "" },
        { item: "SWIMWEAR", importance: "", description: "" },
        { item: "TORCH", importance: "", description: "A head torch is very useful." },
        { item: "WASH BAG", importance: "", description: "for soiled/wet clothes" },
    ];

    const southIndiaKitList = [
        { item: "HELMET", importance: "ESSENTIAL", description: "A helmet must be always worn when on the bike." },
        { item: "JACKET", importance: "ESSENTIAL", description: "A riding jacket that features a removable lining is highly recommended. This is ideal as it allows adjustment of kit according to temperature changes during the day." },
        { item: "BOOTS", importance: "RECOMMENDED", description: "Sturdy, over the ankle, boots are good. Off-road boots are highly recommended as they offer the best lower leg protection due to a sturdier construction." },
        { item: "GLOVES", importance: "ESSENTIAL", description: "" },
        { item: "SUNGLASSES", importance: "ESSENTIAL", description: "" },
        { item: "BASIC FIRST AID KIT", importance: "ESSENTIAL", description: "Include a sufficient supply of any personal medication. Items that may be very useful include rehydration salt sachets, paracetamol, pain killers, antiseptic cream, and sticking plasters." },
        { item: "SUN BLOCK", importance: "ESSENTIAL", description: "A high factor is strongly recommended." },
        { item: "SCARF / BANDANA", importance: "RECOMMENDED", description: "" },
        { item: "PULLOVER / JACKET FOR THE NIGHTS", importance: "RECOMMENDED", description: "" },
        { item: "HYDRATION PACK", importance: "RECOMMENDED", description: "This is the best way to carry drinking water; the pack is carried in a purpose-made rucksack and the water fed through a drinking tube. This enables the rider to keep hydrated without the need to remove the helmet. The rucksack can also be used to carry small items of kit." },
        { item: "TOWEL", importance: "", description: "" },
        { item: "TRAINERS OR SANDALS", importance: "", description: "" },
        { item: "T-SHIRTS", importance: "", description: "" },
        { item: "TROUSERS", importance: "", description: "" },
        { item: "SWIMWEAR", importance: "", description: "" },
        { item: "TORCH", importance: "", description: "A head torch is very useful." },
        { item: "WASH BAG", importance: "", description: "for soiled/wet clothes" },
    ];

    const travelInsuranceCoverage = [
        "Personal Accident",
        "Medical Expenses",
        "Loss of Luggage & Personal Effect",
        "Loss of Travel Documents",
        "Baggage Delay",
        "Travel Delay",
        "Missed Departure",
        "Flight Overbooked",
        "Hijack Inconvenience",
        "Travel Cancellation",
        "Loss of Money/ Valuables",
        "...and other types of coverage as well."
    ];

    const notCovered = [
        "Declared or undeclared war or any act of war, invasion, act of foreign enemy, and other war terms",
        "Loss or destruction of goods due to radiation",
        "Suicide/Self harm/ or any intentional acts by the insured person that provoked homicide or assault personnel or military personnel of any country or international authority, whether full-time service or as a volunteer",
        "The Insured Person engaging in, practising for or taking part in training in any speed contest, any professional competition or sports, and participating in Hazardous adventure"
    ];

    return (
        <div ref={containerRef} className="min-h-screen w-screen bg-neutral-black text-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24">
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
                        TRAVEL TIPS
                    </h1>
                    <p className="text-body max-w-4xl mx-auto text-neutral-gray leading-relaxed mb-8">
                        Travel Tips for Beyond Tarmac's Thrilling Motorcycle Adventures
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

            {/* Main Content */}
            <div className="tips-container max-w-7xl mx-auto px-6 py-20 space-y-20">
                {/* NORTH INDIA Section */}
                <section className="tips-section">
                    <AnimatedTitle
                        title="<b>NORTH INDIA</b>"
                        containerClass="mb-12 text-center"
                    />

                    {/* North India Image */}
                    <div className="mb-12 rounded-3xl overflow-hidden">
                        <img
                            src="/img/images/gallery/compressedImages/DSC_5469.jpg"
                            alt="North India Motorcycle Adventure"
                            className="w-full h-[400px] sm:h-[500px] object-cover"
                        />
                    </div>

                    {/* Road Tripping */}
                    <div className="mb-8">
                        <h3 className="!font-myCustomFont text-heading-primary text-brown-100 mb-4">Road Tripping</h3>
                        <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-2xl border border-[#496156]">
                            <p className="text-body text-neutral-gray">
                                The road can be your best friend or your worst enemy, so we advise you to always ride keeping in mind your safety, and of other people travelling with you. It is best to stick to your side of the road, avoid overtaking, keep in pace with the group and follow hand signals from the road captain. The terrain gamut goes from excellent tarmac to dirt, large stream crossings, steep inclines and declines, sand, gravel, one lane paths, mountain passes, and loads of dust, but all this is not without its own fun.
                            </p>
                        </div>
                    </div>

                    {/* High Altitude */}
                    <div className="mb-8">
                        <h3 className="!font-myCustomFont text-heading-primary text-brown-100 mb-4">High Altitude</h3>
                        <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-2xl border border-[#496156]">
                            <p className="text-body text-neutral-gray">
                                Elevations range from 3300 metres at its lowest (Leh) to 4000 + metres at most parts so it is safe to say you will be riding and staying at high attitudes. The possibility of AMS or Acute Mountain Sickness is something you must prepare for. We recommend consulting your doctor with regards to any allergies you may have to medication used for AMS. Avoid physical activity on Day 1 and monitor your body for any signs of discomfort. Avoid drinking alcohol on the trip as it aggravates underlying symptoms of AMS. Getting a good night's rest every night, eating garlic with your food or raw and staying well hydrated are requisite to keep AMS at bay.
                            </p>
                        </div>
                    </div>

                    {/* Facilities */}
                    <div className="mb-8">
                        <h3 className="!font-myCustomFont text-heading-primary text-brown-100 mb-4">Facilities</h3>
                        <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-2xl border border-[#496156]">
                            <p className="text-body text-neutral-gray">
                                We will be spending our nights in comfortable hotels and nature camps for the duration of the trip. Power cuts are not very uncommon and connectivity to phone and internet are sketchy to non-existent in some parts. Whilst we provide all meals, snacks, beverages, and alcohol during the trip are on your tab. Make sure all your electronic devices are charged and maybe a spare battery and data cards for your camera are good idea.
                            </p>
                        </div>
                    </div>

                    {/* Temperature */}
                    <div className="mb-8">
                        <h3 className="!font-myCustomFont text-heading-primary text-brown-100 mb-4">Temperature</h3>
                        <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-2xl border border-[#496156]">
                            <p className="text-body text-neutral-gray">
                                Average day time temperature would be between 15- 25 Deg C with bright sunshine and crystal-clear blue skies. Though the weather can change unexpectedly on this route. Night time temperatures will plummet 15 deg to about 5 – 6 Deg C. just before dawn.
                            </p>
                        </div>
                    </div>

                    {/* Kit List - North India */}
                    <div className="kit-list-section">
                        <h3 className="!font-myCustomFont text-heading-primary text-brown-100 mb-6">Kit List</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {northIndiaKitList.map((kit, index) => (
                                <div
                                    key={index}
                                    className="kit-item bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-4 rounded-xl border border-[#496156]"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-brown-100 text-lg">•</span>
                                        <div>
                                            <h4 className="font-robert-medium text-white">
                                                {kit.item}
                                                {kit.importance && (
                                                    <span className={`ml-2 text-xs px-2 py-1 rounded ${kit.importance === 'ESSENTIAL' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                                                        }`}>
                                                        {kit.importance}
                                                    </span>
                                                )}
                                            </h4>
                                            {kit.description && (
                                                <p className="text-body-small text-neutral-gray mt-1">
                                                    {kit.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SOUTH INDIA Section */}
                <section className="tips-section">
                    <AnimatedTitle
                        title="<b>SOUTH INDIA</b>"
                        containerClass="mb-12 text-center"
                    />

                    {/* South India Image */}
                    <div className="mb-12 rounded-3xl overflow-hidden">
                        <img
                            src="/img/images/gallery/compressedImages/DSC_5015.jpg"
                            alt="South India Motorcycle Adventure"
                            className="w-full h-[400px] sm:h-[500px] object-cover"
                        />
                    </div>

                    {/* Road Tripping */}
                    <div className="mb-8">
                        <h3 className="!font-myCustomFont text-heading-primary text-brown-100 mb-4">Road Tripping</h3>
                        <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-2xl border border-[#496156]">
                            <p className="text-body text-neutral-gray">
                                The road can be your best friend or your worst enemy, so we advise you to always ride keeping in mind your safety, and of other people travelling with you. It is best to stick to your side of the road, avoid overtaking, keep in pace with the group and follow hand signals from the road captain. The terrain gamut goes from excellent tarmac to instance of some dirt/off roads, two lane highways, one lane paths, Ghat roads, and loads of dust, but all this is not without its own fun.
                            </p>
                        </div>
                    </div>

                    {/* Facilities */}
                    <div className="mb-8">
                        <h3 className="!font-myCustomFont text-heading-primary text-brown-100 mb-4">Facilities</h3>
                        <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-2xl border border-[#496156]">
                            <p className="text-body text-neutral-gray">
                                We will be spending our nights in comfortable hotels and home stays for the duration of the trip. Phone and internet may not be available in some areas but this is not constant. Whilst we provide all meals. The snacks, beverages, and alcohol during the trip are on your tab. Make sure all your electronic devices are charged and maybe a spare battery and data cards for your camera are good idea.
                            </p>
                        </div>
                    </div>

                    {/* Temperature */}
                    <div className="mb-8">
                        <h3 className="!font-myCustomFont text-heading-primary text-brown-100 mb-4">Temperature</h3>
                        <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-2xl border border-[#496156]">
                            <p className="text-body text-neutral-gray">
                                The winter season in India is the ideal time to visit the south, as the humidity is relatively low, day temperatures do not climb too high and the nights are pleasant and cool to cold in some areas. Some occasional light rain showers are not uncommon in certain areas; though rare. The temperature in the day can climb up to 30 degrees centigrade and in the nights, it drops to a pleasant 17 – 25 degrees. In some cases, it can drop a little lower.
                            </p>
                        </div>
                    </div>

                    {/* Kit List - South India */}
                    <div className="kit-list-section">
                        <h3 className="!font-myCustomFont text-heading-primary text-brown-100 mb-6">Kit List</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {southIndiaKitList.map((kit, index) => (
                                <div
                                    key={index}
                                    className="kit-item bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-4 rounded-xl border border-[#496156]"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-brown-100 text-lg">•</span>
                                        <div>
                                            <h4 className="font-robert-medium text-white">
                                                {kit.item}
                                                {kit.importance && (
                                                    <span className={`ml-2 text-xs px-2 py-1 rounded ${kit.importance === 'ESSENTIAL' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                                                        }`}>
                                                        {kit.importance}
                                                    </span>
                                                )}
                                            </h4>
                                            {kit.description && (
                                                <p className="text-body-small text-neutral-gray mt-1">
                                                    {kit.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Medical Requirement Section */}
                <section className="tips-section">
                    <AnimatedTitle
                        title="Medical <b>Requirement</b>"
                        containerClass="mb-8"
                    />
                    <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-8 rounded-2xl border border-[#496156]">
                        <p className="text-body text-neutral-gray">
                            You should be up to date on routine vaccinations while travelling to any destination. Some vaccines may also be required for travel. These vaccines include measles-mumps-rubella (MMR) vaccine, diphtheria-tetanus-pertussis vaccine, varicella (chickenpox) vaccine, polio vaccine, and your yearly flu shot. Latest updates on vaccinations can be obtained from your local clinic or hospital.
                        </p>
                    </div>
                </section>

                {/* Travel Insurance Section */}
                <section className="tips-section">
                    <AnimatedTitle
                        title="Travel <b>Insurance</b>"
                        containerClass="mb-8"
                    />

                    <div className="mb-8">
                        <p className="text-body text-neutral-gray mb-6">
                            What sort of protection/coverage does a travel insurance for Motorcycling in India cover for you? Some of the coverage that you should expect is as below:
                        </p>

                        <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-2xl border border-[#496156] mb-8">
                            <h4 className="!font-myCustomFont text-heading-secondary text-brown-100 mb-4">Coverage Includes:</h4>
                            <ul className="space-y-2">
                                {travelInsuranceCoverage.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-body-small text-neutral-gray">
                                        <span className="text-brown-100">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-[#1c2621]/40 to-[#1b1b1b]/40 backdrop-blur-sm p-6 rounded-2xl border border-[#496156]">
                            <h4 className="!font-myCustomFont text-heading-secondary text-brown-100 mb-4">Examples that might NOT be covered:</h4>
                            <ul className="space-y-3">
                                {notCovered.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3 text-body-small text-neutral-gray">
                                        <span className="text-red-400">✗</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <p className="text-body !font-general text-neutral-gray mt-6 italic">
                            For more information on the inclusions & exclusions of travel insurance coverage, contact your travel agent.
                        </p>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="tips-section text-center">
                    <p className="text-heading-secondary text-neutral-gray mb-6">
                        Ready for your adventure?
                    </p>
                    <a href="https://wa.me/919663299663" target="_blank" rel="noopener noreferrer">
                        <button className="bg-brown-100 text-white px-8 py-4 rounded-full font-general text-lg hover:bg-brown-300 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
                            Contact Us on WhatsApp
                            <TiLocationArrow className="text-xl" />
                        </button>
                    </a>
                </section>
            </div>
        </div>
    );
};

export default TravelTips;
