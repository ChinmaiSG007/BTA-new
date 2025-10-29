import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TiLocationArrow } from 'react-icons/ti';
import Button from '../common/Button';
import AnimatedTitle from '../common/AnimatedTitle';

const NotFound = () => {
    return (
        <div className="my-20 min-h-96 w-screen px-4 sm:px-10">
            <div className="relative rounded-lg bg-black py-24 text-blue-50 overflow-hidden">
                <div className="flex flex-col items-center text-center relative z-10 px-4">
                    <p className="mb-10 font-general text-[10px] uppercase tracking-wider">
                        Join the Journey
                    </p>

                    <AnimatedTitle
                        title="404 <br /> route not found"
                        className="special-font w-full font-zentry !text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl xl:!text-[6.2rem] !font-black !leading-[.9]"
                    />

                    {/* Main Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mb-6 sm:mb-8"
                    >
                        <p className="font-general text-base sm:text-lg md:text-xl text-neutral-gray max-w-xl sm:max-w-2xl mx-auto px-4">
                            Looks like you've ventured off the beaten path. This trail doesn't exist in our maps.
                        </p>
                    </motion.div>

                    {/* Navigation Text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="font-general text-sm sm:text-base text-neutral-darkGray mb-6 sm:mb-8 uppercase tracking-wider px-4"
                    >
                        Let's get you back on track
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
                    >
                        <Link to="/">
                            <Button
                                title="Back to Home"
                                leftIcon={<TiLocationArrow />}
                                containerClass="!bg-brown-100 hover:!bg-brown-300 flex-center gap-1 transition-all duration-300 text-black"
                            />
                        </Link>

                        <Link to="/tours">
                            <Button
                                title="Explore Tours"
                                leftIcon={<TiLocationArrow />}
                                containerClass="!bg-secondary hover:!bg-secondary-light flex-center gap-1 transition-all duration-300 text-black"
                            />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
