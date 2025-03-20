import About from "../common/About";
import Hero from "../common/Hero";
import Features from "../common/Features";
import Story from "../common/Story";
import Contact from "../common/Contact";
import CircularGallery from "../styling/CircularGallery";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <Hero />
            <About />
            <Features />
            <div style={{ height: '800px', position: 'relative', marginBottom: '16rem' }}>
                <h3 className='section-heading'>Gallery</h3>
                <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
                <Link to={'/gallery'} className='flex flex-col justify-center items-center gap-4'>
                    <button className='action-button'>See more</button>
                </Link>
            </div>
            {/* <Story /> */}
            <Contact />
        </div>
    )
}

export default Home