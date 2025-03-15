import About from "../common/About";
import Hero from "../common/Hero";
import Features from "../common/Features";
import Story from "../common/Story";
import Contact from "../common/Contact";
import CircularGallery from "../styling/CircularGallery";

const Home = () => {
    return (
        <div>
            <Hero />
            <About />
            <Features />
            <div style={{ height: '600px', position: 'relative' }}>
                <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
            </div>
            <Story />
            <Contact />
        </div>
    )
}

export default Home