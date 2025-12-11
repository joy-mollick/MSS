import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // Import icons
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ selectedMenu = 'Home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = ['Home', 'About', 'Professional Development', 'Ancillary Learning', 'Patrons', 'News', 'FAQ'];

  // Map menu items to their routes and section IDs
  const sectionMap = {
    'Home': { path: '/', section: null },
    'About': { path: '/', section: 'about' },
    'Professional Development': { path: '/', section: 'professional-development' },
    'Ancillary Learning': { path: '/ancillary-learning', section: null },
    'Patrons': { path: '/patrons', section: null },
    'News': { path: '/news', section: null },
    'FAQ': { path: '/faq', section: null }
  };

  // Handle navigation with section scrolling
  const handleNavigation = (item) => {
    const { path, section } = sectionMap[item];
    
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
    } else {
      navigate(path);
    }
  };

  // Handle logo click - go to home and scroll to top
  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300  backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          
          {/* 1. Logo */}
          <button onClick={handleLogoClick} className="flex-shrink-0 z-50 bg-none border-none cursor-pointer">
            <img
              src="./logo.png"
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