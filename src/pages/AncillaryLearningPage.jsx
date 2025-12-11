import React from 'react'
import Navbar from '@/components/Navbar';
import Footer from '@/components/HomePage/Footer';
import AncillaryHero from '../components/Ancillary/AncillaryHero';

const AncillaryLearningPage = () => {
  return (
    <>
     <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[1000px] h-[450px] bg-[#E5970C]/20 blur-[100px] rounded-full" />
      </div>
      
      <Navbar selectedMenu="Ancillary Learning"/>

      <AncillaryHero />
      
      <Footer />
    </div>
    </>
  )
}


export default AncillaryLearningPage;