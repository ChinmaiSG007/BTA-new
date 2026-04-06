import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import DecryptedText from "./../styling/DecryptedText";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 2;
  const videoRefs = useRef([]);
  const progressRef = useRef(null);
  const loadingTimeoutRef = useRef(null);
  const kenBurnsRef = useRef(null);

  const getVideoSrc = (index) => `videos/bta-${index + 1}.mp4`;

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // Loading management
  useEffect(() => {
    setLoading(true);
    setLoadedVideos(0);

    loadingTimeoutRef.current = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (loadedVideos >= totalVideos) {
      setLoading(false);
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    }
  }, [loadedVideos]);

  // Auto-advance on video end with crossfade
  useEffect(() => {
    if (loading) return;

    const currentVideo = videoRefs.current[currentIndex];
    if (!currentVideo) return;

    const handleEnded = () => {
      const nextIndex = (currentIndex + 1) % totalVideos;
      const nextVideo = videoRefs.current[nextIndex];

      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play();

        gsap.set(nextVideo, { zIndex: 2 });
        gsap.fromTo(
          nextVideo,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.inOut",
            onComplete: () => {
              if (currentVideo) {
                gsap.set(currentVideo, { opacity: 0, zIndex: 1, scale: 1 });
                currentVideo.pause();
                currentVideo.currentTime = 0;
              }
            },
          }
        );
      }

      setCurrentIndex(nextIndex);
    };

    currentVideo.addEventListener("ended", handleEnded);

    return () => {
      currentVideo.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, loading]);

  // Progress bar tracking
  useEffect(() => {
    if (loading) return;

    const currentVideo = videoRefs.current[currentIndex];
    if (!currentVideo || !progressRef.current) return;

    let rafId;

    gsap.set(progressRef.current, { scaleX: 0 });

    const updateProgress = () => {
      if (currentVideo.duration && progressRef.current) {
        const progress = currentVideo.currentTime / currentVideo.duration;
        gsap.set(progressRef.current, { scaleX: progress });
      }
      rafId = requestAnimationFrame(updateProgress);
    };

    rafId = requestAnimationFrame(updateProgress);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [currentIndex, loading]);

  // Ken Burns (subtle slow zoom) on active video for cinematic feel
  useEffect(() => {
    if (loading) return;

    const currentVideo = videoRefs.current[currentIndex];
    if (!currentVideo) return;

    if (kenBurnsRef.current) {
      kenBurnsRef.current.kill();
    }

    kenBurnsRef.current = gsap.fromTo(
      currentVideo,
      { scale: 1 },
      { scale: 1.06, duration: 20, ease: "none" }
    );

    return () => {
      if (kenBurnsRef.current) {
        kenBurnsRef.current.kill();
      }
    };
  }, [currentIndex, loading]);

  // ScrollTrigger clip-path animation
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute h-dvh w-screen overflow-hidden loader-bg">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* Stacked video layers with crossfade */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: totalVideos }, (_, i) => (
            <video
              key={i}
              ref={(el) => (videoRefs.current[i] = el)}
              src={getVideoSrc(i)}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 size-full object-cover object-center will-change-transform"
              style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 1 }}
              autoPlay={i === 0}
              onLoadedData={handleVideoLoad}
            />
          ))}
        </div>

        {/* Cinematic gradient overlay */}
        <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

        {/* Video progress bar */}
        <div className="absolute bottom-0 left-0 z-50 h-[2px] w-full bg-white/10">
          <div
            ref={progressRef}
            className="h-full origin-left bg-brown-100/70"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          ADVENTURES
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-20 sm:mt-24 md:mt-28 px-4 sm:px-6 md:px-8 lg:px-10 md:whitespace-nowrap">
            <DecryptedText
              text="BEYOND TARMAC"
              className="special-font hero-heading text-blue-100"
              encryptedClassName="special-font hero-heading text-blue-100 opacity-40"
              characters="█▓▒░▀▄▌▐"
              animateOn="view"
              revealDirection="start"
              sequential
              useOriginalCharsOnly={false}
              speed={60}
            />

            <p className="mb-5 mt-4 sm:mt-5 max-w-xs sm:max-w-md md:max-w-lg font-robert-regular text-blue-100 text-sm sm:text-base md:text-lg">
              Navigating the Contours of the Unknown
            </p>

            <a href="#about">
              <Button
                id="watch-trailer"
                title="Discover"
                leftIcon={<TiLocationArrow />}
                containerClass="!bg-brown-100 flex-center gap-1"
              />
            </a>
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-brown-100">
        ADVENTURES
      </h1>
    </div>
  );
};

export default Hero;
