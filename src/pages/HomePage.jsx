import React, { useEffect } from 'react'
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

  useEffect(() => {
    const queryString = window.location.search.substring(1);
    if (queryString != '') {
      setTimeout(() => {
        requestAnimationFrame(() => {
          const element = document.getElementById(queryString);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        });
      }, 1100);
    }
  }, [])

  useEffect(() => {
    if (!location.state?.scrollTo) return;

    const sectionId = location.state.scrollTo;

    // wait for DOM to be ready
    requestAnimationFrame(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  }, [location]);

  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Background decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[1000px] h-[450px] bg-[#E5970C]/20 blur-[100px] rounded-full" />
        </div>
        {/* hi */}

        <Navbar selectedMenu="Home" />
        <HeroSection />
        <MiddleSections />
        <TrainingSections />
        <BottomSections />
        <Footer />
      </div>
    </>
  )
}
