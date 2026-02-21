import About from "../common/About";
import Hero from "../common/Hero";
import Features from "../common/Features";
import Story from "../common/Story";
import JoinJourney from "../common/JoinJourney";
import CircularGallery from "../styling/CircularGallery";
import Blogs from "../common/Blogs";
import Testimonials from "../common/Testimonials";
import { Link } from "react-router-dom";
import Button from "./../common/Button";
import DecryptedText from "../styling/DecryptedText";
import UpcomingTourModal from "../common/UpcomingTourModal";

const Home = () => {
    return (
        <div>
            <UpcomingTourModal />
            <Hero />
            <About />
            <Features />
            <div style={{ height: '800px', position: 'relative', marginBottom: '16rem' }}>
                <h3 className='section-heading'>
                    <DecryptedText
                        text="Gallery"
                        parentClassName="mb-8"
                        className="font-myCustomFont font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase leading-[.9]"
                        encryptedClassName="font-myCustomFont font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase text-blue-50 opacity-40 leading-[.9]"
                        characters="█▓▒░▀▄▌▐"
                        animateOn="view"
                        revealDirection="start"
                        sequential
                        useOriginalCharsOnly={false}
                        speed={80}
                    />
                </h3>
                <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
                <Link to={'/gallery'} className='flex flex-col justify-center items-center gap-4'>
                    <Button title="See more" containerClass="text-black mt-10 cursor-pointer" />
                </Link>
            </div>
            <Blogs />
            <Testimonials />
            <JoinJourney />
        </div>
    )
}

export default Home