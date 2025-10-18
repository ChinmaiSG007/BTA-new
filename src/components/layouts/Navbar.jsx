import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { Link } from "react-router-dom";

import Button from "../common/Button";
import ImportantMessage from "../common/ImportantMessage";

const navItems = ["Gallery", "Women only", "FAQ", "Travel Tips", "Know your Guide", "Blogs", "Contact"];

const NavBar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [navButtontheme, setNavButtontheme] = useState('white')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

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
      navContainerRef.current.classList.remove("floating-nav");
      setNavButtontheme('white')
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
      setNavButtontheme('black')
      setIsMobileMenuOpen(false); // Close mobile menu on scroll down
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
      setNavButtontheme('black')
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

  return (
    <>
      <div
        ref={navContainerRef}
        className="glass-nav fixed bg-black/30 text-blue-50 inset-x-2 sm:inset-x-4 md:inset-x-6 top-2 sm:top-4 z-50 h-14 sm:h-16 transition-all duration-700"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between px-3 sm:px-4 py-2">
            {/* Logo and Product button */}
            <div className="flex items-center gap-2 sm:gap-4 md:gap-7">
              <Link to={"/"}>
                <img
                  src={navButtontheme === 'white' ? "/img/images/logo2.png" : "/img/images/logo1.png"}
                  alt="logo"
                  className="w-20 sm:w-24 md:w-28"
                />
              </Link>
              <Link to={"/tours"} className="hidden sm:block">
                <Button
                  id="product-button"
                  title="Tours"
                  rightIcon={<TiLocationArrow />}
                  containerClass="border bg-white/10 backdrop-blur-glass md:flex hidden items-center justify-center gap-1"
                />
              </Link>
            </div>

            {/* Navigation Links and Audio Button */}
            <div className="flex h-full items-center gap-2 sm:gap-4">
              {/* Desktop Navigation */}
              <div className="hidden lg:block">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={`/${item.trim().toLowerCase().replace(/\s+/g, "-")}`}
                    className="nav-hover-btn text-xs lg:text-sm"
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Important Message - Hidden on small screens */}
              <div className="hidden sm:block">
                <ImportantMessage />
              </div>

              {/* Audio Button */}
              <div
                onClick={toggleAudioIndicator}
                className="ml-2 sm:ml-4 md:ml-8 border-2 border-white p-1.5 sm:p-2 rounded-full z-50 ring-2 sm:ring-4 ring-white/30 animate-pulse hover:cursor-pointer"
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
                        backgroundColor: navButtontheme
                      }}
                    />
                  ))}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden ml-2 p-2 rounded-lg bg-white/10 backdrop-blur-glass border border-white/20"
                aria-label="Toggle menu"
              >
                <div className="w-4 h-3 flex flex-col justify-between">
                  <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                  <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>
              </button>
            </div>
          </nav>
        </header>
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
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`/${item.trim().toLowerCase().replace(/\s+/g, "-")}`}
                  className="nav-hover-btn text-left"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ color: navButtontheme }}
                >
                  {item}
                </a>
              ))}
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
