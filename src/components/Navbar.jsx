import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';

import donateIconActive from '@/assets/active_donate.svg';
import donateIconInactive from '@/assets/inactive_donate.svg';

const NAV_ITEMS = [
  'Home',
  'About',
  'Professional Development',
  'Ancillary Learning',
  'Patrons',
  'Trainee Database',
];

const SECTION_MAP = {
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

const ROUTE_MENU_MAP = {
  '/': 'Home',
  '/ancillary-learning': 'Ancillary Learning',
  '/patrons': 'Patrons',
  '/news': 'News',
  '/faq': 'FAQ',
  '/booking': 'Professional Development',
  '/trainees': 'Trainee Database',
  '/donation': 'Donation',
};

const HEADER_STYLE = {
  WebkitBackdropFilter: 'blur(12px)',
  backdropFilter: 'blur(12px)',
  transform: 'translateZ(0)',
  WebkitTransform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
};

const DESKTOP_NAV_STYLE = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.06)',
  boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
};

const GOLD_BUTTON_STYLE = {
  background: 'linear-gradient(180deg, #F8C52B 0%, #E9A700 100%)',
  color: '#000000',
  boxShadow: '0 10px 24px rgba(233,167,0,0.22)',
  border: '2px solid transparent',
};

const DONATION_INACTIVE_STYLE = {
  background: '#000000',
  color: '#FFFFFF',
  border: '2px solid #E9A700',
  boxShadow: '0 0 0 1px rgba(233,167,0,0.04) inset',
};

const DONATION_TEXT_STYLE = {
  fontSize: '17px',
  fontWeight: 800,
};

const DONATION_BUTTON_EXTRA_STYLE = {
  minWidth: '166px',
  letterSpacing: '-0.02em',
  transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, filter 0.3s ease',
  willChange: 'transform',
  transform: 'translateZ(0)',
};

const MOBILE_DONATION_BUTTON_STYLE = {
  transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, filter 0.3s ease',
  willChange: 'transform',
  transform: 'translateZ(0)',
};

const ICON_STYLE = {
  width: '26px',
  height: '26px',
  objectFit: 'contain',
  display: 'block',
  flexShrink: 0,
};

const logoStyle = {
  display: 'block',
  transform: 'translateZ(0)',
  WebkitTransform: 'translateZ(0)',
};

const Navbar = ({ selectedMenu = 'Home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const activeMenu = useMemo(() => {
    return (
      location.state?.active ||
      ROUTE_MENU_MAP[location.pathname] ||
      selectedMenu ||
      ''
    );
  }, [location.state, location.pathname, selectedMenu]);

  const donationActive = useMemo(() => {
    return activeMenu === 'Donation' || location.pathname === '/donation';
  }, [activeMenu, location.pathname]);

  useEffect(() => {
    const img1 = new Image();
    const img2 = new Image();
    img1.src = donateIconActive;
    img2.src = donateIconInactive;
  }, []);
/*
  useEffect(() => {
    if (!location.state?.scrollTo) return;

    let raf1;
    let raf2;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const el = document.getElementById(location.state.scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    return () => {
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [location.state]);
  */

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname]);

  const handleNavigation = useCallback((item) => {
    const target = SECTION_MAP[item];
    if (!target) return;

    const { path, section } = target;

    if (item === 'Home') {
      navigate('/', { state: { active: 'Home' } });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (section) {
      navigate('/', {
        state: { active: item, scrollTo: section },
      });
    } else {
      navigate(path, { state: { active: item } });
    }
  }, [navigate]);

  const handleLogoClick = useCallback(() => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMenuAndNavigate = useCallback((item) => {
    handleNavigation(item);
    setIsMobileMenuOpen(false);
  }, [handleNavigation]);

  const donationButtonStyle = donationActive
    ? { ...GOLD_BUTTON_STYLE, ...DONATION_BUTTON_EXTRA_STYLE }
    : { ...DONATION_INACTIVE_STYLE, ...DONATION_BUTTON_EXTRA_STYLE };

  const mobileDonationButtonStyle = donationActive
    ? { ...GOLD_BUTTON_STYLE, ...MOBILE_DONATION_BUTTON_STYLE }
    : { ...DONATION_INACTIVE_STYLE, ...MOBILE_DONATION_BUTTON_STYLE };

  const currentDonateIcon = donationActive ? donateIconActive : donateIconInactive;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={HEADER_STYLE}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={handleLogoClick}
            className="flex-shrink-0 z-50 bg-none border-none cursor-pointer"
            style={{
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <img
              src={logo}
              alt="CineCertified Logo"
              className="h-10 md:h-12 w-auto object-contain"
              style={logoStyle}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </button>

          <nav
            className="hidden xl:flex items-center gap-1.5 rounded-full px-2.5 py-1.5"
            style={DESKTOP_NAV_STYLE}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigation(item)}
                className={`px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap ${
                  item === activeMenu
                    ? 'bg-[#FAB614] text-black shadow-[0_0_15px_rgba(250,182,20,0.35)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                style={{
                  transition: 'background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handleNavigation('Donation')}
              className="hidden xl:inline-flex items-center justify-center gap-3 h-[54px] px-[24px] rounded-full font-bold text-[18px] hover:brightness-110"
              style={donationButtonStyle}
            >
              <img
                src={currentDonateIcon}
                alt="Donation"
                style={ICON_STYLE}
                loading="eager"
                decoding="async"
              />
              <span
                className="leading-none"
                style={DONATION_TEXT_STYLE}
              >
                Donation
              </span>
            </button>

            <button
              onClick={toggleMenu}
              className="xl:hidden text-white p-2 hover:bg-white/10 rounded-lg z-50 focus:outline-none"
              aria-label="Toggle menu"
              style={{
                transition: 'background-color 0.25s ease, color 0.25s ease',
                WebkitTapHighlightColor: 'transparent',
              }}
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
        className="xl:hidden absolute top-[100%] left-0 w-full bg-black border-b border-white/10 shadow-2xl"
        style={{
          opacity: isMobileMenuOpen ? 1 : 0,
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
          transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-8px)',
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          transition: 'opacity 0.26s ease, transform 0.26s ease, visibility 0.26s ease',
          willChange: 'opacity, transform',
          WebkitTransform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        <div className="flex flex-col px-6 py-6 gap-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => closeMenuAndNavigate(item)}
              className={`text-lg font-medium py-2 border-b border-white/5 text-left ${
                item === activeMenu ? 'text-[#FAB614]' : 'text-gray-300'
              }`}
              style={{
                transition: 'color 0.25s ease, background-color 0.25s ease',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => closeMenuAndNavigate('Donation')}
            className="cursor-pointer w-full xl:hidden h-[58px] px-8 rounded-full flex items-center justify-center gap-3 font-bold text-md hover:brightness-110"
            style={mobileDonationButtonStyle}
          >
            <img
              src={currentDonateIcon}
              alt="Donation"
              style={ICON_STYLE}
              loading="eager"
              decoding="async"
            />
            <span className="leading-none text-[17px] font-extrabold">
              Donation
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;