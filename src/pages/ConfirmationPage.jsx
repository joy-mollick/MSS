import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  MapPin,
  Clock,
  Calendar,
  User,
  Check,
  CreditCard,
  Landmark,
  Armchair,
  BookOpen,
  Lock,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import Footer from '@/components/HomePage/Footer';
import { db } from '../config';
import moment from 'moment';
import { toast } from 'wc-toast';

const ConfirmationPage = () => {

  // STEP 5: SUCCESS
  const renderStep5 = () => (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-[#FAB614] rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(250,182,20,0.4)]">
        <Check size={48} className="text-black" strokeWidth={4} />
      </div>
      <h2 className="text-4xl font-bold text-white mb-4">Thank you for booking</h2>
      <p className="text-gray-400 text-lg mb-12">We will reach out to you shortly.</p>

      <Link
        to="/"
        className="bg-[#FAB614] text-black font-bold px-16 py-4 rounded-full hover:bg-[#E5970C] transition-colors cursor-pointer"
      >
        Home
      </Link>
    </div>
  );

  // --- MAIN RETURN ---
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FAB614] selection:text-black font-sans">
      <wc-toast></wc-toast>
      <div className="container mx-auto px-4 pt-32 pb-20">

        {/* Header Navigation (Hide on Success step) */}
       

        {/* Step Content Switcher */}
        <div className="mt-12">
          {renderStep5()}
        </div>

      </div>

    </div>
  );
};



export default ConfirmationPage;