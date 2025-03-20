import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import ScrollVelocity from "./../styling/ScrollerVelocity"
import TiltedCard from "../styling/TiltedCard";
import SpotlightCard from "../styling/SpotlightCard";
import CountUp from "../styling/CountUp";

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

      <div className="bg-white/90 mb-12 backdrop-blur-sm shadow-lg rounded-3xl mx-12 p-8 max-w-[80vw]">
        <h1 className="mb-8 !text-black section-heading">
          DNA OF BEYOND TARMAC ADVENTURES
        </h1>
        <div className="grid grid-cols-2 gap-7 md:grid-cols-4 md:grid-rows-2">
          {DnaItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center" >
              <div className="overflow-hidden rounded mb-2 ">
                <img src={item.image} alt={item.heading} className="w-full h-full mb-4 hover:scale-125 duration-500 rounded-lg object-cover " />
              </div>
              <h3 className="text-2xl font-myCustomFont">{item.heading}</h3>
              <p className="text-gray-800">{item.body}</p>
            </div>
          ))}

        </div>
      </div>


      <div className="section-card bg-[#edff66]/30 flex md:flex-row flex-col items-center gap-5 mb-8">
        <TiltedCard
          imageSrc="img/images/palaksha.webp"
          altText="Palaksha"
          captionText="PALI"
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="300px"
          imageWidth="300px"
          rotateAmplitude={12}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <p className="bg-white/70 px-2 text-black rounded tilted-card-demo-text">
              Meet your Guide: Palaksha
            </p>
          }
        />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Meet your Guide: Palaksha</h1>
          <p className=" text-justify">Palaksha fondly known as <strong>"Pali"</strong> is the mad hatter of the pack, motorcycle collector, off-road enthusiast & dirt track guy. He is one of those guys who chose motorcycling as a part of his life and made it his profession. Owning, Riding and Working on his 20 odd motorcycles (albeit few rare ones) alone is testament to his passion for motorcycles. Pali is WAFA Certified and has a rich experience in leading 35 motorcycle tours pan India. His quick wit and perspicacious nature and impeccable decision making has ensured successful completion of all the tours led by him. Our lead road captain's knowledge of Geographies and Motorcycles is immense and it shows in the stories experienced and shared by our clients. He is insatiably curious, open minded and goes beyond the call of duty to get things done!</p>
        </div>
      </div>

      <div className="section-card bg-[#8566ff]/30 flex md:flex-row flex-col items-center gap-5 mb-8">
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.5)">
          <img src="img/images/16.svg" alt="" />
        </SpotlightCard>
        <div className="p-4">
          <p className="section-small-heading mb-4">
            ABOUT
          </p>
          <h1 className="text-2xl font-bold mb-4">Unleashing the Spirit of Adventure: Beyond Tarmac's Guided Motorcycle Tours</h1>
          <p className=" text-justify">Beyond Tarmac was born from the fervent dedication of a collective of motorcycle aficionados, united by an unbridled passion for the art of motorcycling. As trailblazers in the South Indian motorcycle scene, we have established a formidable presence nationwide, distinguishing ourselves as pioneers in the industry. For over six years, we have orchestrated meticulously curated guided motorcycle tours, each journey meticulously crafted to deliver unforgettable experiences on the open road. With a track record of over 780+ delighted clients, our commitment to excellence and unwavering dedication to our craft continue to propel us forward, shaping the landscape of motorcycle touring in India.</p>
        </div>
      </div>

      <div className="text-white flex md:flex-row flex-col items-center gap-5 justify-between">
        <div>
          <CountUp
            from={0}
            to={83310}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text text-4xl font-bold" />
          <p>Kilometers done</p>
        </div>
        <div>
          <CountUp
            from={0}
            to={780}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text text-4xl font-bold" />
          <p>Clients
            Served</p>
        </div>
        <div>
          <CountUp
            from={0}
            to={330}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text text-4xl font-bold" />
          <p>Women
            Trained</p>
        </div>
      </div>
    </div>
  </section>
);

export default Features;
