import React, { useEffect, useState } from 'react';
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';

import donateIconActive from '@/assets/active_donate.svg';
import donateIconInactive from '@/assets/inactive_donate.svg';

const Navbar = ({ selectedMenu = 'Home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    'Home',
    'About',
    'Professional Development',
    'Ancillary Learning',
    'Patrons',
    'Trainee Database',
  ];

  const sectionMap = {
    Home: { path: '/', section: null },
    About: { path: '/', section: 'about' },
    'Professional Development': { path: '/', section: 'FirstAid' },
    'Ancillary Learning': { path: '/', section: 'learn' },
    Patrons: { path: '/', section: 'patrons' },
    'Trainee Database': { path: '/trainees', section: null },
    News: { path: '/', section: 'news' },
    FAQ: { path: '/', section: 'faq' },
    Donation: { path: '/donation', section: null },
  };

  const routeMenuMap = {
    '/': 'Home',
    '/ancillary-learning': 'Ancillary Learning',
    '/patrons': 'Patrons',
    '/news': 'News',
    '/faq': 'FAQ',
    '/booking': 'Professional Development',
    '/trainees': 'Trainee Database',
    '/donation': 'Donation',
  };

  const activeMenu =
    location.state?.active ||
    routeMenuMap[location.pathname] ||
    selectedMenu ||
    '';

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }
  }, [location]);

  function handleNavigation(item) {
    const { path, section } = sectionMap[item];

    if (item === 'Home') {
      navigate('/', { state: { active: 'Home' } });
      window.scrollTo(0, 0);
      return;
    }

    if (section) {
      navigate('/', {
        state: { active: item, scrollTo: section },
      });
    } else {
      navigate(path, { state: { active: item } });
    }
  }

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const donationActive =
    activeMenu === 'Donation' || location.pathname === '/donation';

  const goldButtonStyle = {
    background: 'linear-gradient(180deg, #F8C52B 0%, #E9A700 100%)',
    color: '#000000',
    boxShadow: '0 10px 24px rgba(233,167,0,0.22)',
    border: '2px solid transparent',
  };

  const donationInactiveStyle = {
    background: '#000000',
    color: '#FFFFFF',
    border: '2px solid #E9A700',
    boxShadow: '0 0 0 1px rgba(233,167,0,0.04) inset',
  };

  const DonateIcon = ({ active = false, className = "w-8 h-8" }) => {
    return (
      <img
        src={active ? donateIconActive : donateIconInactive}
        alt="Donation"
        className={className}
        style={{
          width: '26px',
          height: '26px',
          objectFit: 'contain',
          display: 'block',
          flexShrink: 0,
        }}
      />
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={handleLogoClick}
            className="flex-shrink-0 z-50 bg-none border-none cursor-pointer"
          >
            <img
              src={logo}
              alt="CineCertified Logo"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </button>

          <nav
            className="hidden xl:flex items-center gap-1.5 rounded-full px-2.5 py-1.5"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
            }}
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigation(item)}
                className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${item === activeMenu
                  ? 'bg-[#FAB614] text-black shadow-[0_0_15px_rgba(250,182,20,0.35)]'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handleNavigation('Donation')}
              className="hidden xl:inline-flex items-center justify-center gap-3 h-[54px] px-[24px] rounded-full font-bold text-[18px] transition-all duration-300 hover:brightness-110"
              style={{
                ...(donationActive ? goldButtonStyle : donationInactiveStyle),
                minWidth: '166px',
                letterSpacing: '-0.02em',
              }}
            >
              <DonateIcon active={donationActive} className="w-8 h-8" />
              <span
                className="leading-none"
                style={{
                  fontSize: '17px',
                  fontWeight: 800,
                }}
              >
                Donation
              </span>
            </button>

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

      <div
        className={`xl:hidden absolute top-[100%] left-0 w-full bg-black border-b border-white/10 shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
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
              className={`text-lg font-medium py-2 border-b border-white/5 text-left ${item === activeMenu ? 'text-[#FAB614]' : 'text-gray-300'
                }`}
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => {
              handleNavigation('Donation');
              setIsMobileMenuOpen(false);
            }}
            className="cursor-pointer w-full xl:hidden h-[58px] px-8 rounded-full flex items-center justify-center gap-3 font-bold text-md transition-all duration-300 hover:brightness-110"
            style={donationActive ? goldButtonStyle : donationInactiveStyle}
          >
            <DonateIcon active={donationActive} className="w-8 h-8" />
            <span className="leading-none text-[17px] font-extrabold">Donation</span>
          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;