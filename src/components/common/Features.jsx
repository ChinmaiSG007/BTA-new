import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import ScrollVelocity from "./../styling/ScrollerVelocity"
import TiltedCard from "../styling/TiltedCard";
import SpotlightCard from "../styling/SpotlightCard";
import CountUp from "../styling/CountUp";

const Features = () => (
  <section className="  pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <ScrollVelocity
        texts={['Beyond', 'Tarmac', 'Adventures']}
        velocity={10}
        className="text-blue-50 hero-heading"
      />
      <div className="px-5 py-32">
        <p className="mb-6 font-circular-web text-lg text-blue-50">
          Ignite Your Passion: Beyond Tarmac's Unparalleled Motorcycle Adventures
        </p>
        <p className="mb-4 max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Founded by a collective of passionate motorcycle enthusiasts, Beyond Tarmac is among the select few source companies in South India with a nationwide presence. For over six years, we've curated unforgettable guided motorcycle tours, boasting a track record of over 780+ satisfied clients.
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          "Join us on a journey like no other with Beyond Tarmac, where every twist of the throttle leads to exhilarating discoveries and unforgettable memories. Join us and experience the true essence of motorcycling freedom."
        </p>
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
