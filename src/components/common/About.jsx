import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import TripCarousel from "./TripCarousel";

gsap.registerPlugin(ScrollTrigger);
const DnaItems = [
  {
    image: 'img/images/DNA1.webp',
    heading: 'CONNECTION',
    body: 'Ride, Bond and Belong'
  },
  {
    image: 'img/images/DNA2.webp',
    heading: 'EXPLORATION',
    body: 'Uncharted paths, Endless dicoveries'
  },
  {
    image: 'img/images/DNA3.webp',
    heading: 'COMMUNITY',
    body: 'Your motorcycle fam awaits'
  },
  {
    image: 'img/images/DNA4.webp',
    heading: 'ADVENTURE',
    body: 'Daring you to push your boundaries'
  },
  {
    image: 'img/images/DNA5.webp',
    heading: 'CURIOSITY',
    body: 'The inner explorer, questioning everything'
  },
  {
    image: 'img/images/DNA6.webp',
    heading: 'CULTURE',
    body: 'Immerse, Experience, Connect'
  },
  {
    image: 'img/images/DNA7.webp',
    heading: 'SUPPORT',
    body: 'We\'ve got your back, every mile'
  },
  {
    image: 'img/images/DNA8.webp',
    heading: 'UNBOUNDED',
    body: 'Where exploration knows no bounds'
  },
]

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
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <TripCarousel />
        <div className="bg-white/40 backdrop-blur-sm shadow-lg rounded-3xl mx-12 p-8 max-w-[80vw]">
          <h1 className="mb-8 text-center text-3xl font-bold">
            DNA OF BEYOND TARMAC ADVENTURES
          </h1>
          <div className="grid grid-cols-2 gap-7 md:grid-cols-4 md:grid-rows-2">
            {DnaItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center" >
                <div className="overflow-hidden rounded mb-2">
                  <img src={item.image} alt={item.heading} className="w-full h-full mb-4 hover:scale-125 duration-500 rounded-lg object-cover " />
                </div>
                <h3 className="text-2xl font-semibold">{item.heading}</h3>
                <p className="text-gray-800">{item.body}</p>
              </div>
            ))}

          </div>
        </div>
        <p className="font-general text-sm uppercase md:text-[10px]">
          EXPLORE WITH US!
        </p>

        <AnimatedTitle
          title="Navigating the Contours of the Unknown"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
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
