import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState, useCallback } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { Link } from "react-router-dom";

import Button from "../common/Button";
import ImportantMessage from "../common/ImportantMessage";
import GlassSurface from "../styling/GlassSurface";

const navItems = ["Gallery", "RSW", "Contact"];

const NavBar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [navButtontheme, setNavButtontheme] = useState('white')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBackgroundLight, setIsBackgroundLight] = useState(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const navElementsRef = useRef([]);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Function to detect if background is light
  const detectBackgroundBrightness = useCallback(() => {
    if (!navContainerRef.current) {
      return;
    }

    try {
      // Get the navbar position
      const navRect = navContainerRef.current.getBoundingClientRect();
      const centerY = navRect.top + navRect.height / 2;

      // Sample multiple points across the width, behind the navbar
      const samplePoints = [
        { x: window.innerWidth * 0.25, y: centerY + 10 },
        { x: window.innerWidth * 0.5, y: centerY + 10 },
        { x: window.innerWidth * 0.75, y: centerY + 10 },
      ];

      let totalBrightness = 0;
      let validSamples = 0;

      // Hide navbar temporarily to check background
      const originalVisibility = navContainerRef.current.style.visibility;
      const originalPointerEvents = navContainerRef.current.style.pointerEvents;
      navContainerRef.current.style.visibility = 'hidden';
      navContainerRef.current.style.pointerEvents = 'none';

      samplePoints.forEach((point, index) => {
        const element = document.elementFromPoint(point.x, point.y);

        if (element) {
          const styles = window.getComputedStyle(element);
          let bgColor = styles.backgroundColor;

          // If transparent, check parent elements
          let currentElement = element;
          let attempts = 0;
          while ((!bgColor || bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') && currentElement.parentElement && attempts < 10) {
            currentElement = currentElement.parentElement;
            bgColor = window.getComputedStyle(currentElement).backgroundColor;
            attempts++;
          }

          // Parse RGB values
          const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1]);
            const g = parseInt(rgbMatch[2]);
            const b = parseInt(rgbMatch[3]);

            // Calculate relative luminance using the formula
            const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
            totalBrightness += brightness;
            validSamples++;
          }
        }
      });

      // Restore navbar visibility
      navContainerRef.current.style.visibility = originalVisibility;
      navContainerRef.current.style.pointerEvents = originalPointerEvents;

      if (validSamples > 0) {
        const avgBrightness = totalBrightness / validSamples;
        // Consider background light if average brightness is above 128 (midpoint of 0-255)
        setIsBackgroundLight(avgBrightness > 128);
      } else {
      }
    } catch (error) {
      console.error('Error detecting background brightness:', error);
    }
  }, []);

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      setIsMobileMenuOpen(false); // Close mobile menu on scroll down
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  useEffect(() => {
    if (isBackgroundLight) {
      setNavButtontheme('black');
      // Smooth transition using GSAP
      gsap.to(navContainerRef.current, {
        '--text-color': 'black',
        duration: 0.6,
        ease: 'power2.inOut'
      });
    } else {
      setNavButtontheme('white');
      // Smooth transition using GSAP
      gsap.to(navContainerRef.current, {
        '--text-color': 'white',
        duration: 0.6,
        ease: 'power2.inOut'
      });
    }
  }, [isBackgroundLight]);

  // Detect background brightness on scroll and mount
  useEffect(() => {
    // Call immediately
    detectBackgroundBrightness();
  }, [currentScrollY, detectBackgroundBrightness]);

  // Initial detection on mount
  useEffect(() => {
    const timeoutId = setTimeout(detectBackgroundBrightness, 300);
    return () => clearTimeout(timeoutId);
  }, [detectBackgroundBrightness]);

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-2 sm:inset-x-4 md:inset-x-6 top-2 sm:top-4 z-50 h-14 sm:h-16"
        style={{
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <GlassSurface
          displace={5}
          distortionScale={350}
          redOffset={15}
          greenOffset={35}
          blueOffset={55}
          brightness={60}
          opacity={0.8}
          mixBlendMode="screen"
          width={"100%"}
          className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between px-3 sm:px-4 py-2">
            {/* Left Section: Logo and Tours Button */}
            <div className="flex items-center gap-2 sm:gap-4 md:gap-7">
              <Link to={"/"}>
                <img
                  src={isBackgroundLight ? "/img/images/logo1.png" : "/img/images/logo2.png"}
                  alt="logo"
                  className="w-20 sm:w-24 md:w-28"
                  style={{
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    filter: isBackgroundLight ? 'brightness(1)' : 'brightness(1)'
                  }}
                />
              </Link>
              <Link to={"/tours"} className="hidden sm:block">
                <Button
                  id="product-button"
                  title="Tours"
                  rightIcon={<TiLocationArrow />}
                  containerClass={`border backdrop-blur-glass md:flex hidden items-center justify-center gap-1 transition-all duration-500 ${isBackgroundLight
                    ? 'bg-black/20 border-black/30 text-black'
                    : 'bg-white/10 border-white/30 text-white'
                    }`}
                />
              </Link>
            </div>

            {/* Middle Section: Navigation Links (left-aligned) */}
            <div className="hidden lg:flex items-center gap-2 sm:gap-4 flex-1">
              {navItems.map((item, index) => {
                const href = item === "RSW" ? "/ride-skill-workshop" : `/${item.trim().toLowerCase().replace(/\s+/g, "-")}`;
                return (
                  <a
                    key={index}
                    href={href}
                    className="nav-hover-btn text-xs lg:text-sm"
                    style={{
                      color: navButtontheme,
                      transition: 'color 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {item}
                  </a>
                );
              })}

              {/* Important Message */}
              <div className="hidden sm:block">
                <ImportantMessage />
              </div>
            </div>

            {/* Right Section: Audio Button and Mobile Menu */}
            <div className="flex h-full items-center gap-2 sm:gap-4">
              {/* Audio Button */}
              <div
                onClick={toggleAudioIndicator}
                className={`border-2 p-1.5 sm:p-2 rounded-full z-50 ring-2 sm:ring-4 animate-pulse hover:cursor-pointer transition-all duration-500 ${isBackgroundLight
                  ? 'border-black ring-black/30'
                  : 'border-white ring-white/30'
                  }`}
              >
                <button className="flex items-center space-x-0.5">
                  <audio
                    ref={audioElementRef}
                    className="hidden"
                    src="/audio/loop.mp3"
                    loop
                  />
                  {[1, 2, 3, 4].map((bar) => (
                    <div
                      key={bar}
                      className={clsx("indicator-line", {
                        active: isIndicatorActive,
                      })}
                      style={{
                        animationDelay: `${bar * 0.1}s`,
                        backgroundColor: navButtontheme,
                        transition: 'background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    />
                  ))}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden ml-2 p-2 rounded-lg backdrop-blur-glass transition-all duration-500 ${isBackgroundLight
                  ? 'bg-black/10 border border-black/20'
                  : 'bg-white/10 border border-white/20'
                  }`}
                aria-label="Toggle menu"
              >
                <div className="w-4 h-3 flex flex-col justify-between">
                  <span className={`block h-0.5 w-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} style={{ backgroundColor: navButtontheme }}></span>
                  <span className={`block h-0.5 w-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: navButtontheme }}></span>
                  <span className={`block h-0.5 w-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} style={{ backgroundColor: navButtontheme }}></span>
                </div>
              </button>
            </div>
          </nav>
        </GlassSurface>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`absolute top-20 left-4 right-4 backdrop-blur-lg rounded-2xl border p-6 ${navButtontheme === 'white'
              ? 'bg-black/90 border-white/20 text-white'
              : 'bg-white/90 border-black/20 text-black'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Tours Button */}
            <Link to={"/tours"} className="block sm:hidden mb-4">
              <Button
                id="mobile-tours-button"
                title="Tours"
                rightIcon={<TiLocationArrow />}
                containerClass="w-full border bg-white/10 backdrop-blur-glass flex items-center justify-center gap-1"
              />
            </Link>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-1">
              {navItems.map((item, index) => {
                const href = item === "RSW" ? "/ride-skill-workshop" : `/${item.trim().toLowerCase().replace(/\s+/g, "-")}`;
                return (
                  <a
                    key={index}
                    href={href}
                    className="nav-hover-btn text-left"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      color: navButtontheme,
                      transition: 'color 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {item}
                  </a>
                );
              })}
            </div>

            {/* Mobile Important Message */}
            <div className="mt-6 sm:hidden">
              <ImportantMessage />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
