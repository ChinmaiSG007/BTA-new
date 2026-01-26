import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DecryptedText from '../styling/DecryptedText';
import { FaStar, FaUser } from 'react-icons/fa';

const Testimonials = () => {
    const [expandedReviews, setExpandedReviews] = useState({});
    const CHAR_LIMIT = 200;

    const toggleExpand = (id) => {
        setExpandedReviews(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const truncateText = (text, limit, isExpanded) => {
        if (isExpanded || text.length <= limit) return text;
        return text.slice(0, limit) + '...';
    };

    // For now, we'll use static data since Google Maps API requires server-side setup
    // You'll need to set up a backend API to fetch Google reviews securely
    const reviews = [
        {
            id: 1,
            name: "aaron mendonza",
            rating: 5,
            text: "I came to know Pali through a very close friend of mine. Riding in Spiti and Ladakh was always on the bucket list, and Pali came well recommended. When you go to an unknown and unpredictable region, you want someone dependable and trustworthy. Pali and his team deliver this in spades. They are a close-knit team of good riders, level-headed adults and fun people to be around. Ours was a 16day trip through Spiti and Ladakh. Pali’s experience and knowledge of the area are on display from day 1. His wife Joe (our medic), his friend and partner Suraj, Rounak, Thomas, and Pankaj - without these invaluable people, this ride would have been boring and quite difficult. The routes chosen were a mix of great Tarmac, and as the name goes, “Beyond Tarmac”. The places to stay are well chosen, food is good and never leaves you wanting. The days are planned to accommodate experienced and in-experienced riders. They instilled a confidence in me to power through sections I otherwise believed myself to be incapable of riding through. And this is another aspect of riding with them. There were several instances when they stepped out of their way to help us riders, even repairing a couple of bikes to get them through the entire journey. I have built friendships on this ride to last a lifetime, and I’ve come away with the finest of memories. I would do these rides and trips with Beyond Tarmac at every possible opportunity.",
            date: "2024-10-15",
            avatar: ""
        },
        {
            id: 2,
            name: "Prajwal Chandrashekar",
            rating: 5,
            text: "Embarking on the Ladakh adventure with Beyond Tarmac and Mr. Palaksha Shadaksharappa was an experience beyond compare. From the meticulously planned itinerary to the seamless execution, every detail was perfect. Traversing the majestic peaks and serene valleys of Ladakh, we covered Leh, the breathtaking Khardung La, the enchanting Aryan Valley, the remote Padum, the stunning Nubra Valley, and the rugged terrains of Gonbo Rangjon, Fotu La, Hambuting La, Panikhar, Gulmatungo, and Rangdum. Crossing the serene passes of Singe La, Sirsir La, and Wan La, exploring vibrant Turtuk, gazing at the awe-inspiring Drang-Drung Glacier, reaching Thang - the northernmost village of India, marvelling at the mighty Siachen, the challenging Chang La, the pristine Pangong Lake, and finally conquering Umling La - the highest motorable road in the world, every mile was a testament to nature's grandeur and our relentless spirit. Mr. Palaksha Shadaksharappa's expertise, passion, and dedication ensured that our journey was not just about reaching destinations, but about experiencing the magic of each moment. Kudos to Beyond Tarmac for orchestrating such an unforgettable adventure. Highly recommended for any thrill-seeker looking to explore the uncharted! #BeyondTarmac #EpicAdventure #LadakhDiaries #BikeLife #UnforgettableJourney #PeakLife",
            date: "2024-09-20",
            avatar: ""
        },
        {
            id: 3,
            name: "Pavan R",
            rating: 5,
            text: "An adventure across 14 days and it was excellent, safe, super fun all thanks to Pali and team of Beyond Tarmac. Pali and team not only ensured the safety across all aspects of the trips but had the best of the accommodation and planning . Thank you Pali, Pankaj and Prameet for the excellent adventure and taking care of our team like family !",
            date: "2024-08-10",
            avatar: ""
        }
    ];

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar
                key={index}
                className={`${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                size={20}
            />
        ));
    };

    return (
        <div className="py-20 bg-gradient-to-b from-neutral-black/5 to-transparent">
            <div className="container mx-auto px-3 md:px-10">
                <div className="px-5">
                    <div className="mt-5 text-center mb-16 section-heading">
                        <DecryptedText
                            text="What Our Riders Say"
                            parentClassName="flex justify-center"
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-blue-50"
                            encryptedClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-blue-50 opacity-40"
                            characters="█▓▒░▀▄▌▐"
                            animateOn="view"
                            revealDirection="center"
                            sequential
                            useOriginalCharsOnly={false}
                            speed={40}
                        />
                    </div>

                    {/* Google Business Link */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <a
                            href="https://www.google.com/maps/place/BEYOND+TARMAC+ADVENTURES/@12.9055677,77.6108996,19z/data=!4m8!3m7!1s0x3bae14e163287bb5:0x1fe11f1fc07a7a83!8m2!3d12.9055664!4d77.6115433!9m1!1b1!16s%2Fg%2F11hgp56w6g?entry=ttu&g_ep=EgoyMDI1MTExMi4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-general border text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            <FaStar className="text-yellow-400" />
                            <span>View All Reviews on Google</span>
                        </a>
                    </motion.div>

                    {/* Reviews Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative h-full rounded-2xl border border-brown-100/30 bg-[#1a1a1a]/80 backdrop-blur-sm p-6 transition-all duration-500 hover:border-brown-100 hover:shadow-[0_0_20px_rgba(137,87,59,0.4)] hover:-translate-y-2">

                                    {/* Star Rating */}
                                    <div className="flex gap-1 mb-4">
                                        {renderStars(review.rating)}
                                    </div>

                                    {/* Review Text */}
                                    <div className="mb-6">
                                        <motion.div
                                            initial={false}
                                            animate={{
                                                maxHeight: expandedReviews[review.id] ? '1000px' : '120px'
                                            }}
                                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <p className="font-general text-blue-50/90 leading-relaxed">
                                                "{review.text}"
                                            </p>
                                        </motion.div>
                                        {review.text.length > CHAR_LIMIT && (
                                            <button
                                                onClick={() => toggleExpand(review.id)}
                                                className="mt-2 text-brown-100 hover:text-brown-100/80 font-semibold text-sm transition-colors duration-300 flex items-center gap-1"
                                            >
                                                <span>{expandedReviews[review.id] ? 'Read less' : 'Read more'}</span>
                                                <motion.span
                                                    animate={{ rotate: expandedReviews[review.id] ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="inline-block"
                                                >
                                                    ▼
                                                </motion.span>
                                            </button>
                                        )}
                                    </div>

                                    {/* Reviewer Info */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-brown-100/20">
                                        <div className="w-12 h-12 rounded-full bg-brown-100/20 flex items-center justify-center">
                                            {review.avatar ? (
                                                <img
                                                    src={review.avatar}
                                                    alt={review.name}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <FaUser className="text-brown-100 text-xl" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-blue-50">
                                                {review.name}
                                            </p>
                                            <p className="text-sm text-blue-50/60">
                                                Google Review
                                            </p>
                                        </div>
                                    </div>

                                    {/* Google Icon */}
                                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Note about dynamic reviews */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="mt-12 text-center"
                    >
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
