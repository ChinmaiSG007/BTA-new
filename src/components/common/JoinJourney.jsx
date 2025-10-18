import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} className="w-full h-full object-cover" />
  </div>
);

const JoinJourney = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-4 sm:px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 overflow-hidden">
        {/* Left side images */}
        <div className="absolute left-0 top-0 hidden h-full w-72 sm:flex flex-col gap-4 lg:left-10 lg:w-96 xl:left-20">
          <ImageClipBox
            src="/img/images/gallery/compressedImages/DSC_5469.jpg"
            clipClass="contact-clip-path-1 h-1/2"
          />
          <ImageClipBox
            src="/img/images/gallery/compressedImages/DSC_5007.jpg"
            clipClass="contact-clip-path-2 h-1/2"
          />
        </div>

        {/* Right side images */}
        <div className="absolute right-0 top-0 hidden h-full w-72 sm:flex flex-col gap-4 lg:right-10 lg:w-96 xl:right-20">
          <ImageClipBox
            src="/img/images/gallery/compressedImages/DSC_5025.jpg"
            clipClass="contact-clip-path-1 h-1/2"
          />
          <ImageClipBox
            src="/img/images/gallery/compressedImages/DSC_5315.jpg"
            clipClass="sword-man-clip-path h-1/2"
          />
        </div>

        <div className="flex flex-col items-center text-center relative z-10 px-4">
          <p className="mb-10 font-general text-[10px] uppercase tracking-wider">
            Join the Journey
          </p>

          <AnimatedTitle
            title="let&#39;s chart the <b>u</b>nknown <br /> and explore <br /> new horizons together."
            className="special-font w-full font-zentry !text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl xl:!text-[6.2rem] !font-black !leading-[.9]"
          />
        </div>
      </div>
    </div>
  );
};

export default JoinJourney;
