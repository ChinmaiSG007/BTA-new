import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TiLocationArrow } from 'react-icons/ti';
import Button from '../common/Button';
import AnimatedTitle from '../common/AnimatedTitle';
import Balatro from '../styling/Balatro';

const NotFound = () => {
    return (
        <div className="relative min-h-screen w-screen flex items-center justify-center bg-neutral-black overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <Balatro
                    isRotate={false}
                    mouseInteraction={true}
                    pixelFilter={1000}
                    color1="#763919"
                    color2="#102103"
                    color3="#010b18"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-black/40 via-neutral-black/60 to-neutral-black/80" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Glowing Card Effect */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative rounded-3xl border border-brown-100/30 bg-gradient-to-br from-neutral-black/80 to-neutral-black/60 backdrop-blur-xl p-8 sm:p-12 lg:p-16 shadow-[0_0_50px_rgba(137,87,59,0.2)]"
                >
                    {/* Animated Glow Border */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brown-100/0 via-brown-100/20 to-brown-100/0 opacity-50 blur-xl animate-pulse" />
                    <div className="flex flex-col items-center text-center relative z-10">
                        {/* 404 Number with Special Effect */}
                        <div className="mb-6 sm:mb-8">
                            <AnimatedTitle
                                title="404"
                                containerClass="special-font w-full font-zentry !text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl xl:!text-[6.2rem] !font-black !leading-[.9]"
                            />
                            <AnimatedTitle
                                title="route not found"
                                containerClass="special-font !text-xl !font-black !leading-[.9]"
                            />
                        </div>
                        {/* Main Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="mb-6 sm:mb-8"
                        >
                            <p className="text-white font-general text-base sm:text-lg md:text-xl text-neutral-gray max-w-xl sm:max-w-2xl mx-auto px-4">
                                Looks like you've ventured off the beaten path. This trail doesn't exist in our maps,
                                but don't worry — every great adventure has a few detours.
                            </p>
                        </motion.div>

                        {/* Decorative Divider */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="w-32 h-1 bg-gradient-to-r from-transparent via-brown-100 to-transparent mb-8"
                        />

                        {/* Navigation Text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="text-white font-general text-sm sm:text-base text-neutral-darkGray mb-8 uppercase tracking-widest"
                        >
                            Let's get you back on track
                        </motion.p>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
                        >
                            <Link to="/">
                                <Button
                                    title="Back to Home"
                                    leftIcon={<TiLocationArrow />}
                                    containerClass="!bg-brown-100 hover:!bg-brown-300 hover:scale-105 flex-center gap-1 transition-all duration-300 text-black shadow-lg hover:shadow-brown-100/50"
                                />
                            </Link>

                            <Link to="/tours">
                                <Button
                                    title="Explore Tours"
                                    leftIcon={<TiLocationArrow />}
                                    containerClass="!bg-blue-75 hover:!bg-blue-50 hover:scale-105 flex-center gap-1 transition-all duration-300 text-black shadow-lg hover:shadow-blue-75/50"
                                />
                            </Link>

                            <Link to="/gallery">
                                <Button
                                    title="View Gallery"
                                    leftIcon={<TiLocationArrow />}
                                    containerClass="border-2 border-brown-100 bg-transparent hover:bg-brown-100/10 hover:scale-105 flex-center gap-1 transition-all duration-300 text-brown-100 shadow-lg"
                                />
                            </Link>
                        </motion.div>

                        {/* Additional Help Text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                            className="text-white font-general text-xs sm:text-sm text-neutral-darkGray mt-12 italic"
                        >
                            "Not all those who wander are lost... but this page definitely is."
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
