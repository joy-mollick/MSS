import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // Import icons
import { Link } from 'react-router-dom';

const Navbar = ({ selectedMenu = 'Home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['Home', 'About', 'Professional Development', 'Ancillary Learning', 'Patrons', 'News', 'FAQ'];

  // Toggle function
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300  backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          
          {/* 1. Logo */}
          <Link to="/" className="flex-shrink-0 z-50">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/ede79040027d7dc059545c7584737b9c2edd8cd7?width=488"
              alt="CineCertified Logo"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>
          
          {/* 2. Desktop Navigation (Hidden on Mobile) */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
            {navItems.map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  item === selectedMenu
                    ? 'bg-[#FAB614] text-black shadow-[0_0_15px_rgba(250,182,20,0.4)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item}
              </Link>
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
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              className={`text-lg font-medium py-2 border-b border-white/5 ${
                item === selectedMenu ? 'text-[#FAB614]' : 'text-gray-300'
              }`}
            >
              {item}
            </Link>
          ))}
          
          {/* Mobile CTA Button (Since desktop button is hidden) */}
          <div className="pt-4">
            <button className="bg-linear-to-r from-[#FAB614] to-[#E5970C] text-black font-bold text-md h-14 px-8 rounded-full shadow-[0_0_20px_rgba(229,151,12,0.3)] flex items-center gap-3 cursor-pointer hover:shadow-[0_0_30px_rgba(229,151,12,0.5)] transition-shadow">
              Trainee Database
                        </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;