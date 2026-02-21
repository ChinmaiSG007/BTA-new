import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import TripCarousel from "./TripCarousel";
import DecryptedText from "../styling/DecryptedText";
import CountUp from "../styling/CountUp";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen mt-20">
      <div className="container mx-auto px-3 md:px-10">
        <div className="bg-brown-100/20 backdrop-blur-lg rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 shadow-2xl border border-white/20">
          <div className="section-heading text-center mb-8 sm:mb-10 md:mb-12">
            <DecryptedText
              text="OUR JOURNEY IN NUMBERS"
              parentClassName="flex justify-center"
              className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-50"
              encryptedClassName=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-blue-50 opacity-40"
              characters="█▓▒░▀▄▌▐"
              animateOn="view"
              revealDirection="center"
              sequential
              useOriginalCharsOnly={false}
              speed={40}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            <div className="text-center p-6 sm:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/10 hover:scale-105 transition-all duration-300 shadow-lg">
              <CountUp
                from={0}
                to={330}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text text-4xl sm:text-5xl md:text-6xl font-myCustomFont text-blue-50 mb-3" />
              <p className="text-base sm:text-lg md:text-xl text-blue-50 font-general uppercase tracking-wide">Women Empowered</p>
              <div className="mt-4 h-1 w-20 bg-brown-100 mx-auto rounded-full"></div>
            </div>
            <div className="text-center p-6 sm:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/10 hover:scale-105 transition-all duration-300 shadow-lg">
              <CountUp
                from={0}
                to={780}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text text-4xl sm:text-5xl md:text-6xl font-myCustomFont text-blue-50 mb-3" />
              <p className="text-base sm:text-lg md:text-xl text-blue-50 font-general uppercase tracking-wide">Happy Clients Served</p>
              <div className="mt-4 h-1 w-20 bg-brown-100 mx-auto rounded-full"></div>
            </div>
            <div className="text-center p-6 sm:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/10 hover:scale-105 transition-all duration-300 shadow-lg sm:col-span-2 lg:col-span-1">
              <CountUp
                from={0}
                to={83310}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text text-4xl sm:text-5xl md:text-6xl font-myCustomFont text-blue-50 mb-3" />
              <p className="text-base sm:text-lg md:text-xl text-blue-50 font-general uppercase tracking-wide">Kilometers Conquered</p>
              <div className="mt-4 h-1 w-20 bg-brown-100 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="section-small-heading">
          EXPLORE WITH US!
        </p>
        <TripCarousel />
        <DecryptedText
          text="Navigating the Contours of the Unknown"
          parentClassName="mt-4 text-center"
          className="font-myCustomFont font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white"
          encryptedClassName="font-myCustomFont font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-white opacity-40"
          characters="█▓▒░▀▄▌▐"
          animateOn="view"
          revealDirection="start"
          sequential
          useOriginalCharsOnly={false}
          speed={30}
        />

        <div className="section-subtext">
          <p className="text-gray-500">
            Exploring these ever-chasing contours, fosters a deeper understanding of ourselves and the world around us.
          </p>
          <p>This journey of Discovery describes Beyond Tarmac.</p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/DSC_5753.jpg"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
