import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
    // For now, we'll use static data since Google Maps API requires server-side setup
    // You'll need to set up a backend API to fetch Google reviews securely
    const reviews = [
        {
            id: 1,
            name: "Sample Reviewer 1",
            rating: 5,
            text: "Amazing experience! The Ladakh trip was unforgettable. Beyond Tarmac Adventures made everything seamless.",
            date: "2024-10-15",
            avatar: "https://ui-avatars.com/api/?name=Sample+Reviewer+1&background=89573b&color=fff"
        },
        {
            id: 2,
            name: "Sample Reviewer 2",
            rating: 5,
            text: "Professional team, well-organized tours. Highly recommend for anyone looking for motorcycle adventures!",
            date: "2024-09-20",
            avatar: "https://ui-avatars.com/api/?name=Sample+Reviewer+2&background=89573b&color=fff"
        },
        {
            id: 3,
            name: "Sample Reviewer 3",
            rating: 5,
            text: "Best adventure of my life! The guides were knowledgeable and the routes were breathtaking.",
            date: "2024-08-10",
            avatar: "https://ui-avatars.com/api/?name=Sample+Reviewer+3&background=89573b&color=fff"
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
                    <AnimatedTitle
                        title="What Our <b>Riders</b> Say"
                        containerClass="mt-5 text-center mb-16"
                    />

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
                                <div className="relative h-full rounded-2xl border border-brown-100/30 bg-white/50 backdrop-blur-sm p-6 transition-all duration-500 hover:border-brown-100 hover:shadow-[0_0_20px_rgba(137,87,59,0.2)] hover:-translate-y-2">

                                    {/* Star Rating */}
                                    <div className="flex gap-1 mb-4">
                                        {renderStars(review.rating)}
                                    </div>

                                    {/* Review Text */}
                                    <p className="font-general text-neutral-darkGray mb-6 leading-relaxed">
                                        "{review.text}"
                                    </p>

                                    {/* Reviewer Info */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-brown-100/20">
                                        <img
                                            src={review.avatar}
                                            alt={review.name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <p className="font-semibold text-neutral-black">
                                                {review.name}
                                            </p>
                                            <p className="text-sm text-neutral-darkGray">
                                                {new Date(review.date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
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
