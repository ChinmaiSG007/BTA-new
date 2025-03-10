import About from "../common/About";
import Hero from "../common/Hero";
import Features from "../common/Features";
import Story from "../common/Story";
import Contact from "../common/Contact";
import { useEffect } from "react";
import ImportantMessage from "../common/ImportantMessage";


const Home = () => {
    //Auido Guide
    useEffect(() => {
        console.log("CSG")
    }, []);

    return (
        <div>
            <Hero />
            <About />
            <Features />
            <Story />
            <Contact />
        </div>
    )
}

export default Home