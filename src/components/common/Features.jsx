import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FaMotorcycle, FaCertificate, FaRoute, FaInstagram } from "react-icons/fa";
import ScrollVelocity from "./../styling/ScrollerVelocity"
import TiltedCard from "../styling/TiltedCard";
import SpotlightCard from "../styling/SpotlightCard";
import CountUp from "../styling/CountUp";
import DecryptedText from "../styling/DecryptedText";

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


const Features = () => (
  <section className="pb-24">
    <div className="container mx-auto px-3 md:px-10">
      <ScrollVelocity
        texts={['Beyond', 'Tarmac', 'Adventures']}
        velocity={10}
        className="text-blue-50 hero-heading"
      />
      <div className="px-5 py-32 text-center">
        <p className="section-small-heading mb-4">
          INTRO
        </p>
        <p className="mb-6 font-circular-web text-lg text-blue-50">
          Ignite Your Passion: Beyond Tarmac's Unparalleled Motorcycle Adventures
        </p>
        <p className="mb-4 font-circular-web text-lg text-blue-50 opacity-50">
          Founded by a collective of passionate motorcycle enthusiasts, Beyond Tarmac is among the select few source companies in South India with a nationwide presence. For over six years, we've curated unforgettable guided motorcycle tours, boasting a track record of over 780+ satisfied clients.
        </p>
        <p className="font-circular-web text-lg text-blue-50 opacity-50">
          "Join us on a journey like no other with Beyond Tarmac, where every twist of the throttle leads to exhilarating discoveries and unforgettable memories. Join us and experience the true essence of motorcycling freedom."
        </p>
      </div>

      <div className="section-card bg-[#33443c]/30 backdrop-blur-lg border border-white/20 mb-8 overflow-hidden">
        <h1 className="mb-6 sm:mb-8  section-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
          DNA OF BEYOND TARMAC ADVENTURES
        </h1>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-7 lg:grid-cols-4 lg:grid-rows-2">
          {DnaItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center" >
              <div className="bg-[#e4e4e4] overflow-hidden rounded-xl mb-2 w-full aspect-square">
                <img src={item.image} alt={item.heading} className="w-full h-full object-cover hover:scale-125 duration-500 rounded-lg" />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-myCustomFont mb-1 text-white">{item.heading}</h3>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base">{item.body}</p>
            </div>
          ))}

        </div>
      </div>


      <div className="section-card bg-brown-100/20 backdrop-blur-lg border border-white/20 mb-8 overflow-hidden">
        <div className="flex md:flex-row flex-col items-center md:items-stretch">
          {/* Image Section */}
          <div className="md:w-2/5 w-full relative overflow-hidden">
            <div className="absolute top-4 left-4 z-10 bg-brown-100/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <p className="text-black font-myCustomFont text-sm uppercase tracking-wider">Lead Road Captain</p>
            </div>
            <TiltedCard
              imageSrc="img/images/palaksha.webp"
              altText="Palaksha"
              captionText="PALI"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="500px"
              imageWidth="100%"
              rotateAmplitude={8}
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={false}
            />
          </div>

          {/* Content Section */}
          <div className="md:w-3/5 w-full p-6 sm:p-8 md:p-10 flex flex-col justify-center">
            <div className="mb-4">
              <p className="section-small-heading text-brown-100 mb-2">YOUR GUIDE</p>

              <DecryptedText text="Palaksha Shadaksharappa"
                className="text-3xl sm:text-4xl md:text-5xl font-myCustomFont text-blue-50 mb-2"
                encryptedClassName="text-3xl sm:text-4xl md:text-5xl font-myCustomFont text-blue-50 mb-2"
                characters="█▓▒░▀▄▌▐"
                animateOn="view"
                revealDirection="start"
                sequential
                useOriginalCharsOnly={false}
                speed={30}
              />
              <p className="text-md font-general italic">Founder Beyond Tarmac Adventures</p>
            </div>

            <div className="space-y-4 text-blue-50/90 font-circular-web text-sm sm:text-base leading-relaxed">
              <p>
                Palaksha, fondly known as <span className="text-brown-100 font-semibold">"Pali"</span>, is the mad hatter of the pack—a motorcycle collector, off-road enthusiast, and dirt track specialist who transformed his passion into his profession.
              </p>
              <p>
                With a remarkable collection of <span className="text-brown-100 font-semibold">20+ motorcycles</span> (including rare gems), Pali is <span className="text-brown-100 font-semibold">WAFA Certified</span> and has successfully led <span className="text-brown-100 font-semibold">35+ motorcycle tours</span> across India.
              </p>
              <p>
                His quick wit, perspicacious nature, and impeccable decision-making ensure every journey's success. With an immense knowledge of geographies and motorcycles, Pali is insatiably curious, open-minded, and goes beyond the call of duty to make every ride unforgettable.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                <FaMotorcycle className="text-brown-100 text-base sm:text-lg" />
                <p className="text-xs sm:text-sm text-blue-50 font-circular-web">20+ Motorcycles</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                <FaCertificate className="text-brown-100 text-base sm:text-lg" />
                <p className="text-xs sm:text-sm text-blue-50 font-circular-web">WAFA Certified</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                <FaRoute className="text-brown-100 text-base sm:text-lg" />
                <p className="text-xs sm:text-sm text-blue-50 font-circular-web">35+ Tours Led</p>
              </div>
              <a href="https://www.instagram.com/palaksha_shadaksharappa" target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 hover:bg-white/20 transition-all duration-300">
                <FaInstagram className="text-brown-100 text-base sm:text-lg" />
                <p className="text-xs sm:text-sm text-blue-50 font-circular-web">@palaksha_shadaksharappa</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="section-card bg-[#33443c]/30 flex md:flex-row flex-col items-center gap-5 mb-8">
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.5)">
          <img src="img/images/16.svg" alt="Beyond Tarmac Adventures Logo" />
        </SpotlightCard>
        <div className="p-4">
          <p className="section-small-heading mb-4">
            ABOUT
          </p>
          <h1 className="text-2xl font-bold mb-4">Unleashing the Spirit of Adventure: Beyond Tarmac's Guided Motorcycle Tours</h1>
          <p className=" text-justify">Beyond Tarmac was born from the fervent dedication of a collective of motorcycle aficionados, united by an unbridled passion for the art of motorcycling. As trailblazers in the South Indian motorcycle scene, we have established a formidable presence nationwide, distinguishing ourselves as pioneers in the industry. For over six years, we have orchestrated meticulously curated guided motorcycle tours, each journey meticulously crafted to deliver unforgettable experiences on the open road. With a track record of over 780+ delighted clients, our commitment to excellence and unwavering dedication to our craft continue to propel us forward, shaping the landscape of motorcycle touring in India.</p>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
