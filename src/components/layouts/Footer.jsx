import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { regions } from "../../tours.json";


const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-green-700/60 text-white pt-16 pb-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Mission */}
          <div className="lg:col-span-1 w-full mb-5">
            <Link to="/" className="mb-4">
              <img src='img/images/Logo.png' alt="Beyond Tarmac Adventures Logo" className="h-40 w-auto" />
            </Link>
            <p className="font-myCustomFont text-2xl font-bold text-white">Beyond Tarmac Adventures</p>
            <p className="text-neutral-300 mb-4">
              Follow Beyond Tarmac Adventures On Social Media
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/beyondtarmacadv/" aria-label="Instagram" className="text-neutral-300 hover:text-violet-600" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://wa.me/message/NJYBTN2P5LYTO1?src=qr" aria-label="WhatsApp" className="text-neutral-300 hover:text-green-600" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.088.54 4.083 1.562 5.844L0 24l6.398-1.523C8.131 23.46 10.069 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.797 0-3.548-.478-5.09-1.38l-.364-.211-3.8.905.848-3.698-.236-.38A9.934 9.934 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm4.85-7.333c-.26-.13-1.536-.762-1.774-.847-.24-.087-.4-.13-.568.13-.168.26-.65.847-.797 1.023-.147.173-.294.193-.544.064-.25-.13-1.056-.4-2.012-1.277-.743-.655-1.25-1.47-1.4-1.717-.148-.26-.016-.385.11-.507.115-.116.252-.296.379-.444.126-.147.168-.26.252-.434.084-.173.042-.324-.02-.458-.063-.13-.585-1.412-.803-1.936-.211-.507-.43-.437-.568-.444-.147-.007-.315-.009-.484-.009a.93.93 0 00-.671.316c-.23.253-.887.865-.887 2.107s.91 2.448 1.036 2.622c.126.17 1.793 2.732 4.354 3.824 1.682.722 2.344.787 3.184.664.513-.076 1.505-.615 1.717-1.211.212-.595.212-1.106.147-1.211-.064-.103-.23-.167-.48-.292z" />
                </svg>
              </a>
              {/* <a href="https://youtube.com" aria-label="YouTube" className="text-neutral-300 hover:text-primary-400" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a> */}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-medium mb-4">Our Tours</h4>
            <ul className="space-y-2">
              {regions.map((region) => (
                region.tours.map((tour, index) => {
                  const tourSlug = tour.name.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <li key={`${region.id}-${index}`}>
                      <Link
                        to={`/tours/${tourSlug}`}
                        className="text-neutral-300 hover:text-white transition-colors duration-200"
                      >
                        {tour.name}
                      </Link>
                    </li>
                  );
                })
              ))}
            </ul>
          </div>

          {/* Other Useful Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Other Useful Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/ride-skill-workshop"
                  className="text-neutral-300 hover:text-white transition-colors duration-200"
                >
                  Women Only / RSW
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/know-your-guide"
                  className="text-neutral-300 hover:text-white transition-colors duration-200"
                >
                  Know Your Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-neutral-300 hover:text-white transition-colors duration-200"
                >
                  Blog
                </Link>
              </li> */}
              <li>
                <Link
                  to="/faq"
                  className="text-neutral-300 hover:text-white transition-colors duration-200"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/travel-tips"
                  className="text-neutral-300 hover:text-white transition-colors duration-200"
                >
                  Travel Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start group hover:text-[#b87b58]">
                <svg className="w-5 h-5 text-primary-400 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <a
                  href="https://maps.app.goo.gl/RHvNxfjpej3cZ3VG8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 "
                >
                  Beyond Tarmac Adventures 92/2, 23rd cross, 16th main BTM 2nd stage, Benagluru- 560076
                </a>
              </li>
              <li className="flex items-start group hover:text-[#b87b58]">
                <svg className="w-5 h-5 text-primary-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href="tel:+91-9663299663"
                  className="text-neutral-300 "
                >
                  +91 9663299663
                </a>
              </li>
              <li className="flex items-start group hover:text-[#b87b58]">
                <svg className="w-5 h-5 text-primary-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a
                  href="tel:+91-7259128123"
                  className="text-neutral-300 "
                >
                  +91 7259128123
                </a>
              </li>
              <li className="flex items-start group hover:text-[#b87b58]">
                <svg className="w-5 h-5 text-primary-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:info@beyondtarmacadv.com"
                  className="text-neutral-300 "
                >
                  info@beyondtarmacadv.com
                </a>
              </li>
              <li className="flex items-start group hover:text-[#b87b58]">
                <svg className="w-5 h-5 text-primary-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-neutral-300  cursor-default">
                  Monday-Friday: 9AM-5PM<br />Saturday: 10AM-2PM<br />Sunday: Closed
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-neutral-700 text-neutral-400 text-sm text-center">
          <p>© {currentYear} Beyond Tarmac Adventures. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/faq" className="hover:text-white">FAQ</Link>
            <Link to="/travel-tips" className="hover:text-white">Travel Tips</Link>
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
