/*
  <div className="container mx-auto px-4 mt-12 mb-20 flex flex-col md:flex-row justify-between items-center gap-6">

               
                <button className="flex items-center gap-2 bg-[#FAB614] text-black font-bold text-sm px-6 py-3 rounded-full hover:bg-[#E5970C] transition-colors">
                    <span>Item per page: 15</span>
                    <ChevronDown size={16} strokeWidth={3} />
                </button>

                
                <div className="flex items-center gap-2">

                    {/* Prev Button */}
                    <button className="flex items-center gap-1 bg-[#FAB614] text-black font-bold text-sm px-5 py-3 rounded-full hover:bg-[#E5970C] transition-colors disabled:opacity-50">
                        <ChevronLeft size={16} strokeWidth={3} />
                        <span>Prev</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-2 mx-2">
                        <button className="w-10 h-10 rounded-full bg-[#FAB614] text-black font-bold text-sm flex items-center justify-center hover:bg-[#E5970C] transition-colors">
                            1
                        </button>

                        {/* Active Page Style (White Background) */}
                        <button className="w-10 h-10 rounded-full bg-white text-black font-bold text-sm flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            2
                        </button>

                        <button className="w-10 h-10 rounded-full bg-[#FAB614] text-black font-bold text-sm flex items-center justify-center hover:bg-[#E5970C] transition-colors">
                            3
                        </button>
                        <button className="w-10 h-10 rounded-full bg-[#FAB614] text-black font-bold text-sm flex items-center justify-center hover:bg-[#E5970C] transition-colors">
                            4
                        </button>
                        <button className="w-10 h-10 rounded-full bg-[#FAB614] text-black font-bold text-sm flex items-center justify-center hover:bg-[#E5970C] transition-colors">
                            5
                        </button>
                    </div>

                    {/* Next Button */}
                    <button className="flex items-center gap-1 bg-[#FAB614] text-black font-bold text-sm px-5 py-3 rounded-full hover:bg-[#E5970C] transition-colors">
                        <span>Next</span>
                        <ChevronRight size={16} strokeWidth={3} />
                    </button>

                </div>
            </div>

*/

  {/* NEWSLETTER POPUP MODAL */}
        {showNewsletter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowNewsletter(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-[#151515] w-full max-w-3xl rounded-2xl p-8 md:p-12 border border-[#FAB614]/20 shadow-2xl animate-in fade-in zoom-in duration-200">

              {/* Close Button */}
              <button
                onClick={() => setShowNewsletter(false)}
                className="absolute top-4 right-4 bg-[#FAB614] hover:bg-[#E5970C] text-black rounded-full p-1.5 transition-colors"
              >
                <X size={20} strokeWidth={2.5} />
              </button>

              <div className="text-center space-y-4">
                <h2 className="text-4xl font-extrabold text-[#FAB614]">News & Updates</h2>

                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  Stay up to date with the latest updates, insights, and tips—all in one place! We'll keep it fresh, relevant, and worth your time.
                </p>

                <div className="py-2 flex items-center justify-center gap-2 text-white/90 font-medium">
                  <span>👉</span>
                  <span>Want updates straight to your inbox? Don't forget to sign up for our newsletter!</span>
                  <span>📧</span>
                </div>

                {/* Subscribe Form Box */}
                <div className="mt-8 bg-[#1E1E1E] rounded-xl p-6 md:p-8 border border-white/5 text-left">
                  <h3 className="text-xl font-bold text-white mb-4">Subscribe to Our Newsletter</h3>

                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 bg-[#252525] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FAB614] transition-colors"
                    />
                    <button className="bg-[#FAB614] hover:bg-[#E5970C] text-black font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-[#FAB614]/20 transition-all duration-200 whitespace-nowrap">
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

           {/* Left Col: Payment Details */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Payment Details</h3>

          <div className="mb-6">
            <span className="text-sm text-gray-400 mb-2 block">Payment Method</span>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 border border-[#FAB614] text-[#FAB614] py-3 rounded-lg bg-[#FAB614]/10 cursor-pointer">
                <CreditCard size={18} /> Credit Card
              </button>
              <button className="flex items-center justify-center gap-2 border border-white/20 text-gray-400 py-3 rounded-lg hover:border-white/40 cursor-pointer">
                <Landmark size={18} /> PayPal
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Expiry Date</label>
                <input type="text" placeholder="MM/YY" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">CVV</label>
                <input type="text" placeholder="123" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Cardholder Name</label>
              <input type="text" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-bold text-white mb-4">Billing Address</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">First Name</label>
                <input type="text" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Last Name</label>
                <input type="text" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <label className="text-sm text-gray-300">Address</label>
              <input type="text" placeholder="123 Main Street" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">City</label>
                <input type="text" placeholder="London" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Postcode</label>
                <input type="text" placeholder="SW1A 1AA" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
              </div>
            </div>
          </div>
        </div>















import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // Import icons
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';

[


  
  "Post Production Houses",
  "Rental Houses",
  "Specialist Camera and Grip Houses",
  "Virtual Production Studios"
]

const Navbar = ({ selectedMenu = 'Home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = ['Home', 'About', 'Professional Development', 'Ancillary Learning', 'Patrons', 'News', 'FAQ'];

  // Map menu items to their routes and section IDs
  const sectionMap = {
    'Home': { path: '/', section: null },
    'About': { path: '/', section: 'about' },
    'Professional Development': { path: '/', section: 'FirstAid' },
    'Ancillary Learning': { path: '/', section: 'learn' },
    'Patrons': { path: '/patrons', section: null },
    'News': { path: '/news', section: null },
    'FAQ': { path: '/faq', section: null }
  };

  // Handle navigation with section scrolling
  const handleNavigation = (item) => {
    const { path, section } = sectionMap[item];
    if (item === 'Home') {
      navigate(path);
      // Home always goes to top and navigates to /
     // navigate(path);
      window.scrollTo(0, 0);
    } else if (section) {
      // If we're already on the home page, just scroll to the section
      if (window.location.pathname === '/' || window.location.pathname === '/CineCertifiedWebsite/') {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home and then scroll to section
       // navigate(path);
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      navigate(path);
    }
  };

  // Handle logo click - go to home and scroll to top
  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  // Toggle function
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300  backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          
          {/* 1. Logo */}
          <button onClick={handleLogoClick} className="flex-shrink-0 z-50 bg-none border-none cursor-pointer">
            <img
              src={logo}
              alt="CineCertified Logo"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </button>
          
          {/* 2. Desktop Navigation (Hidden on Mobile) */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigation(item)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  item === selectedMenu
                    ? 'bg-[#FAB614] text-black shadow-[0_0_15px_rgba(250,182,20,0.4)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* 3. Actions (Desktop Button + Mobile Toggle) */}
          <div className="flex items-center gap-4">
            {/* Desktop CTA Button */}
            <Link to="/trainees" >
            <Button to="/trainees" className="cursor-pointer hidden xl:flex bg-gradient-to-r from-[#FAB614] to-[#E5970C] text-black font-bold text-md px-6 py-6 rounded-full hover:brightness-110 transition-all shadow-[0_0_20px_rgba(229,151,12,0.3)]">
              Trainee Database
            </Button>
            </Link>
            
            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={toggleMenu}
              className="xl:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors z-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-8 h-8 text-[#FAB614]" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Overlay */}
      {/* We use conditional rendering based on state */}
      <div 
        className={`xl:hidden absolute top-[100%] left-0 w-full bg-black border-b border-white/10 shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100 py-6" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col px-6 gap-4">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                handleNavigation(item);
                setIsMobileMenuOpen(false);
              }}
              className={`text-lg font-medium py-2 border-b border-white/5 text-left ${
                item === selectedMenu ? 'text-[#FAB614]' : 'text-gray-300'
              }`}
            >
              {item}
            </button>
          ))}
          
          {/* Mobile CTA Button (Since desktop button is hidden) */}
          <Link to="/trainees" className='mt-4 w-full'>
            <button className="cursor-pointer w-full xl:hidden bg-gradient-to-r from-[#FAB614] to-[#E5970C] text-black font-bold text-md h-14 px-8 rounded-full hover:brightness-110 transition-all shadow-[0_0_20px_rgba(229,151,12,0.3)]">
              Trainee Database
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;















import bg2 from '@/assets/bg3.avif';
import blackLogo from '@/assets/black-logo.png';

import appstore from '@/assets/appstore.png';
import playstore from '@/assets/playstore.png';
import { Mail, Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    // Map footer nav items to their routes and section IDs
    const footerNavMap = {
        'Home': { path: '/', section: null },
        'About': { path: '/', section: 'about' },
        'Professional Development': { path: '/', section: 'FirstAid' },
        'Ancillary Learning': { path: '/', section: 'learn' },
        'Patrons': { path: '/', section: 'patrons' },
        'News': { path: '/', section: 'news' },
        'FAQ': { path: '/', section: 'faq' }
    };

    // Handle navigation with section scrolling
    const handleNavigation = (item) => {
        const config = footerNavMap[item];
        if (!config) return;

        const { path, section } = config;

        if (section) {
            // If we're already on the home page, just scroll to the section
            if (window.location.pathname === '/' || window.location.pathname === '/CineCertifiedWebsite/') {
                const element = document.getElementById(section);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Navigate to home and then scroll to section
                navigate(path);
                setTimeout(() => {
                    const element = document.getElementById(section);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        } else if (item === 'Home') {
            // Home scrolls to top
            navigate(path);
            window.scrollTo(0, 0);
        } else {
            navigate(path);
        }
    };

    return (
        <footer className="pb-8 relative mt-20 text-black overflow-hidden" style={{ backgroundImage: `url(${bg2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div className="flex flex-col gap-4">
                        <img src={blackLogo} alt="CineCertified Logo" className="h-10 w-50 object-contain" />
                        <p className="text-lg">
                            CineCertified is supported by a large number of industry bodies and freelance professionals
                        </p>
                        <div className="flex gap-4">
                            <div className="w-40 flex items-center justify-center">
                                <a href="https://apps.apple.com/gb/app/cinecertified/id6754809670" target="_blank" rel="noopener noreferrer"><img src={appstore} alt="Apple App Store" /></a>
                            </div>
                            <div className="w-40 flex items-center justify-center">
                                <a href="https://play.google.com/store/apps/details?id=com.cine_certified" target="_blank" rel="noopener noreferrer"><img src={playstore} alt="Google Play Store" /></a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-2xl font-semibold">CineCertified</h3>
                        <nav className="flex flex-col gap-2">
                            {['Home', 'About', 'Professional Development', 'Ancillary Learning', 'Patrons', 'News', 'FAQ'].map((link) => (
                                <button
                                    key={link}
                                    onClick={() => handleNavigation(link)}
                                    className="hover:underline flex items-center gap-2 text-left cursor-pointer"
                                >
                                    <span>→</span> {link}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-2xl font-semibold">Support</h3>
                        <nav className="flex flex-col gap-2">
                            <Link to="/privacypolicy" className="hover:underline flex items-center gap-2">
                                <span>→</span> Privacy Policy
                            </Link>
                            <Link to="/termsandconditions" className="hover:underline flex items-center gap-2">
                                <span>→</span> Terms & Conditions
                            </Link>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-2xl font-semibold">Contact</h3>

                        {/* Email Section */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-black/80 flex items-center justify-center shrink-0">
                                <Mail className="text-[#FAB614] w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold leading-tight">Information</h4>
                                <a href="mailto:Info@CineCertified.co.uk" className="text-sm hover:text-[#FAB614] transition-colors">
                                    Info@CineCertified.co.uk
                                </a>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-3 mt-2">
                            {[Instagram, Linkedin, Facebook, Twitter].map((Icon, i) => (
                                <a
                                    onClick={() => {
                                        if (i == 0) {
                                            window.location.href='https://www.instagram.com/cinecertified/?hl=en'
                                        }
                                        else if (i == 1) {
                                            window.location.href='https://www.linkedin.com/in/cinecertified-cic-ab1585311/?originalSubdomain=uk'
                                        }
                                        else if (i == 2) {
                                            window.location.href='https://www.facebook.com/profile.php?id=61578410152396'
                                        }
                                        else if (i == 3) {
                                            window.location.href='https://www.facebook.com/profile.php?id=61578410152396'
                                        }
                                    }}
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-black/80 flex items-center justify-center text-[#FAB614] hover:bg-[#FAB614] hover:text-black transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            <div className="mx-auto bg-black py-4 border-t border-black/20 text-center text-white">
                <p className="text-sm">Copyright © 2025 | All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;