import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/HomePage/Footer';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FAB614] selection:text-black font-sans flex flex-col">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#FAB614] uppercase tracking-wider mb-8">
            Privacy Policy
          </h1>
          {/* Content will go here */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPage;