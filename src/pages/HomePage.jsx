import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import RefflesSection from '@/components/RefflesSection';
import HeroSection from '@/components/HomePage/HeroSection';
import MiddleSections from '@/components/HomePage/MiddleSections';
import TrainingSections from '@/components/HomePage/TrainingSections';
import BottomSections from '@/components/HomePage/BottomSections';
import Footer from '@/components/HomePage/Footer';
import { useLocation } from 'react-router-dom';

export const HomePage = () => {
  const location = useLocation();
  const animationRef = useRef(null);
  const timeoutRef = useRef(null);

  const NAVBAR_OFFSET = 110;

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const smoothScrollTo = (targetY, duration = 1800) => {
    stopAnimation();

    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (t) =>
      t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const scrollToSection = (sectionId, delay = 250) => {
    if (!sectionId) return;

    stopAnimation();

    timeoutRef.current = setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const targetY = window.pageYOffset + rect.top - NAVBAR_OFFSET;

      smoothScrollTo(Math.max(0, targetY), 1900);
    }, delay);
  };

  useEffect(() => {
    return () => stopAnimation();
  }, []);

  useEffect(() => {
    const sectionId = location.state?.scrollTo;
    if (!sectionId) return;

    scrollToSection(sectionId, 250);

    return () => stopAnimation();
  }, [location.state]);

  useEffect(() => {
    const queryString = location.search.substring(1);
    if (!queryString) return;

    scrollToSection(queryString, 900);

    return () => stopAnimation();
  }, [location.search]);

  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[1000px] h-[450px] bg-[#E5970C]/20 blur-[100px] rounded-full" />
        </div>

        <Navbar selectedMenu="Home" />
        <HeroSection />
        <MiddleSections />
        <TrainingSections />
        <BottomSections />
        <Footer />
      </div>
    </>
  );
};