import { TiLocationArrow } from 'react-icons/ti';
import TiltedCard from '../styling/TiltedCard';

const Blogs = () => {
    const blogPost = {
        title: "1600 KM of Ladakh Himalayan Adventure",
        subtitle: "Crossing the valley of Fear to Freedom",
        author: "Ashok Kumar E R",
        excerpt: "Let me start by saying this: If someone had told me a few months ago that I'd be riding 1600 kilometers through the bone-rattling roads of Ladakh on a 450cc Bullet, I would have laughed, probably choked on my coffee, and then gone back to my comfortable desk. After all, my last stint on a bike was 25 years ago on a Hero Honda Splendor—which, by the way, is basically the bicycle of motorcycles. But there I was, hurtling over rocky roads, dodging mountain goats, and trying to remember how on earth I signed up for this.....",
        image: "/img/images/gallery/reviews/1725868671888.png",
        link: "https://www.linkedin.com/pulse/1600-km-ladakh-himalayan-adventure-crossing-valley-fear-e-r-lpxkc/"
    };

    return (
        <div className="pb-24">
            <div className="container mx-auto px-3 md:px-10">
                <div className="section-card bg-brown-100/20 backdrop-blur-lg border border-white/20 mb-8 overflow-hidden">
                    <div className="flex md:flex-row flex-col items-center md:items-stretch">
                        {/* Image Section */}
                        <div className="md:w-1/2 w-full relative overflow-hidden">
                            <TiltedCard
                                imageSrc={blogPost.image}
                                altText={blogPost.title}
                                containerHeight="100%"
                                containerWidth="100%"
                                imageHeight="500px"
                                imageWidth="100%"
                                rotateAmplitude={8}
                                scaleOnHover={1.1}
                                showMobileWarning={false}
                                showTooltip={false}
                                displayOverlayContent={false}
                            />
                        </div>

                        {/* Content Section */}
                        <div className="md:w-1/2 w-full p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                            <div className="mb-4">
                                <p className="section-small-heading text-brown-100 mb-2">BLOGS</p>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-myCustomFont text-blue-50 mb-2">
                                    {blogPost.title}
                                </h1>
                                <p className="text-lg sm:text-xl text-brown-100 font-general">{blogPost.subtitle}</p>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm sm:text-base text-blue-50/70 font-circular-web">
                                    By <span className="text-brown-100 font-semibold">{blogPost.author}</span>
                                </p>
                            </div>

                            <div className="space-y-4 text-blue-50/90 font-circular-web text-sm sm:text-base leading-relaxed">
                                <p className="text-justify">
                                    {blogPost.excerpt}
                                </p>
                            </div>

                            <a
                                href={blogPost.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center gap-2 bg-white hover:bg-brown-300 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:gap-4 shadow-lg w-fit"
                            >
                                <span className="font-general">Read Full Story</span>
                                <TiLocationArrow className="text-xl transition-transform duration-300" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
