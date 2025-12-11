import React from 'react'
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HomePage/HeroSection';
import MiddleSections from '@/components/HomePage/MiddleSections';
import TrainingSections from '@/components/HomePage/TrainingSections';
import BottomSections from '@/components/HomePage/BottomSections';
import Footer from '@/components/HomePage/Footer';

export const HomePage = () => {
  return (
    <>
     <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[1000px] h-[450px] bg-[#E5970C]/20 blur-[100px] rounded-full" />
      </div>
      {/* hi */}
      
      <Navbar selectedMenu="Home"/>
      <HeroSection />
      <MiddleSections />
      <TrainingSections />
      <BottomSections />
      <Footer />
    </div>
    </>
  )
}
