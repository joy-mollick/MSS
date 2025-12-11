import React, { useState } from 'react';
import { 
  ChevronLeft, 
  MapPin, 
  Clock, 
  Calendar, 
  User, 
  Check, 
  CreditCard, 
  Landmark,
  Armchair
} from 'lucide-react';
import { Link } from 'react-router-dom'; 

import Navbar from '@/components/Navbar';
import Footer from '@/components/HomePage/Footer';

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [bookingData, setBookingData] = useState({
    location: null,
    course: null,
    details: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      role: '',
      notes: ''
    }
  });

  // --- MOCK DATA ---
  const locations = [
    { id: 'lon', name: 'London', count: 3 },
    { id: 'man', name: 'Manchester', count: 2 },
    { id: 'bir', name: 'Birmingham', count: 2 },
    { id: 'edi', name: 'Edinburgh', count: 2 },
    { id: 'bri', name: 'Bristol', count: 1 },
    { id: 'lee', name: 'Leeds', count: 1 },
  ];

  const courses = [
    { 
      id: 1, 
      date: 'March 15, 2025', 
      time: '9:00 AM - 5:00 PM', 
      price: 75, 
      location: 'Central London Training Centre', 
      instructor: 'Sarah Mitchell', 
      enrolled: 8, 
      totalSpots: 12 
    },
    { 
      id: 2, 
      date: 'March 22, 2025', 
      time: '9:00 AM - 5:00 PM', 
      price: 75, 
      location: 'Central London Training Centre', 
      instructor: 'Mike Ross', 
      enrolled: 5, 
      totalSpots: 12 
    },
    { 
      id: 3, 
      date: 'April 05, 2025', 
      time: '9:00 AM - 5:00 PM', 
      price: 75, 
      location: 'Central London Training Centre', 
      instructor: 'Sarah Mitchell', 
      enrolled: 0, 
      totalSpots: 12 
    },
  ];

  // --- HANDLERS ---
  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const updateDetails = (e) => {
    setBookingData({
      ...bookingData,
      details: { ...bookingData.details, [e.target.name]: e.target.value }
    });
  };

  // --- RENDER STEPS ---

  // STEP 1: SELECT LOCATION
  const renderStep1 = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-xl text-gray-300 mb-2">Select Your Location</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setBookingData({ ...bookingData, location: loc })}
            className={`text-left p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
              bookingData.location?.id === loc.id
                ? 'bg-[#FAB614] border-[#FAB614] text-black'
                : 'bg-[#1A1A1A] border-white/10 text-white hover:border-[#FAB614]/50'
            }`}
          >
            <h3 className="text-lg font-bold mb-1">{loc.name}</h3>
            <p className={`text-sm ${bookingData.location?.id === loc.id ? 'text-black/80' : 'text-gray-400'}`}>
              {loc.count} courses available
            </p>
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handleNext}
          disabled={!bookingData.location}
          className="bg-[#FAB614] text-black font-bold px-12 py-4 rounded-full hover:bg-[#E5970C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  );

  // STEP 2: SELECT COURSE (UPDATED CARD DESIGN)
  const renderStep2 = () => (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl text-gray-300">
            Training Courses in {bookingData.location?.name || 'London'}
        </h2>
      </div>

      <div className="space-y-6">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 md:p-8 hover:border-[#FAB614]/30 transition-all duration-300 shadow-lg"
          >
            {/* Card Header: Date & Price */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">{course.date}</h3>
                </div>
                <div className="text-right">
                    <span className="block text-2xl font-bold text-[#FAB614]">£{course.price}</span>
                    <span className="block text-sm text-gray-400">Per Person</span>
                </div>
            </div>

            {/* Card Details: Vertical List */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 text-gray-300">
                    <Clock size={20} className="text-[#FAB614] shrink-0" />
                    <span className="text-lg">{course.time}</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-300">
                    <MapPin size={20} className="text-[#FAB614] shrink-0" />
                    <span className="text-lg">{course.location}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                    <User size={20} className="text-[#FAB614] shrink-0" />
                    <span className="text-lg">Instructor: {course.instructor}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                    <Armchair size={20} className="text-[#FAB614] shrink-0" />
                    <span className="text-lg">
                        Availability: <span className="text-green-500">{course.enrolled}/{course.totalSpots} enrolled</span>
                    </span>
                </div>
            </div>

            {/* Full Width Button */}
            <button 
                onClick={() => {
                  setBookingData({ ...bookingData, course: course });
                  handleNext();
                }}
                className="w-full bg-[#FAB614] text-black font-semibold py-2 rounded-full hover:bg-[#E5970C] transition-colors text-lg cursor-pointer shadow-[0_4px_14px_0_rgba(250,182,20,0.39)] hover:shadow-[0_6px_20px_rgba(250,182,20,0.23)] hover:-translate-y-0.5 transform"
            >
                Select This Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // STEP 3: BOOKING DETAILS
  const renderStep3 = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl text-gray-300">Booking Details</h2>
      </div>

      {/* Selected Course Summary Header */}
      <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 mb-8">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
                <span className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2 block">Selected Course</span>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-white"><Clock size={14} className="text-[#FAB614]"/> {bookingData.course?.date} • {bookingData.course?.time}</div>
                    <div className="flex items-center gap-2 text-white"><MapPin size={14} className="text-[#FAB614]"/> {bookingData.course?.location}</div>
                    <div className="flex items-center gap-2 text-white"><User size={14} className="text-[#FAB614]"/> {bookingData.course?.instructor}</div>
                </div>
            </div>
            <div className="text-right mt-4 md:mt-0">
                <span className="text-[#FAB614] font-bold text-2xl">£{bookingData.course?.price}</span>
                <span className="block text-xs text-gray-400">Per Person</span>
            </div>
         </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">First Name *</label>
          <input 
            type="text" name="firstName" placeholder="First Name" 
            className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none"
            onChange={updateDetails}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Last Name *</label>
          <input 
            type="text" name="lastName" placeholder="Last Name" 
            className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none"
            onChange={updateDetails}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Email Address *</label>
          <input 
            type="email" name="email" placeholder="Enter your Email" 
            className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none"
            onChange={updateDetails}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Phone Number *</label>
          <input 
            type="tel" name="phone" placeholder="Enter your phone number" 
            className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none"
            onChange={updateDetails}
          />
        </div>
        <div className="space-y-2 md:col-span-1">
          <label className="text-sm text-gray-300">Company/Production *</label>
          <input 
            type="text" name="company" placeholder="Enter your company or production name" 
            className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none"
            onChange={updateDetails}
          />
        </div>
        <div className="space-y-2 md:col-span-1">
          <label className="text-sm text-gray-300">Role in Camera Department *</label>
          <select 
             name="role"
             className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none cursor-pointer"
             onChange={updateDetails}
          >
            <option value="">Select your role</option>
            <option value="trainee">Camera Trainee</option>
            <option value="loader">Clapper Loader</option>
          </select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm text-gray-300">Additional Notes</label>
          <textarea 
            name="notes" placeholder="Any additional information or special requirements (max 500 characters)" 
            className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#FAB614] outline-none h-32 resize-none"
            onChange={updateDetails}
          ></textarea>
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handleNext}
          className="bg-[#FAB614] text-black font-bold px-12 py-4 rounded-full hover:bg-[#E5970C] transition-colors text-lg cursor-pointer"
        >
          Submit Booking
        </button>
      </div>
    </div>
  );

  // STEP 4: PAYMENT
  const renderStep4 = () => {
    // Calculate totals
    const fee = bookingData.course?.price || 0;
    const vat = fee * 0.2;
    const total = fee + vat;

    return (
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Col: Payment Details */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Payment Details</h3>
          
          <div className="mb-6">
            <span className="text-sm text-gray-400 mb-2 block">Payment Method</span>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 border border-[#FAB614] text-[#FAB614] py-3 rounded-lg bg-[#FAB614]/10 cursor-pointer">
                <CreditCard size={18} /> Credit Card
              </button>
              <button className="flex items-center justify-center gap-2 border border-white/20 text-gray-400 py-3 rounded-lg hover:border-white/40 cursor-pointer">
                <Landmark size={18} /> PayPal
              </button>
            </div>
          </div>

          <div className="space-y-4">
             <div className="space-y-2">
                <label className="text-sm text-gray-300">Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-sm text-gray-300">Expiry Date</label>
                  <input type="text" placeholder="MM/YY" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
               </div>
               <div className="space-y-2">
                  <label className="text-sm text-gray-300">CVV</label>
                  <input type="text" placeholder="123" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
               </div>
             </div>
             <div className="space-y-2">
                <label className="text-sm text-gray-300">Cardholder Name</label>
                <input type="text" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
             </div>
          </div>

          <div className="mt-8">
             <h4 className="text-lg font-bold text-white mb-4">Billing Address</h4>
             <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                    <label className="text-sm text-gray-300">First Name</label>
                    <input type="text" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-300">Last Name</label>
                    <input type="text" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
                </div>
             </div>
             <div className="space-y-2 mb-4">
                <label className="text-sm text-gray-300">Address</label>
                <input type="text" placeholder="123 Main Street" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm text-gray-300">City</label>
                    <input type="text" placeholder="London" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-gray-300">Postcode</label>
                    <input type="text" placeholder="SW1A 1AA" className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-[#FAB614]" />
                </div>
             </div>
          </div>
        </div>

        {/* Right Col: Order Summary */}
        <div className="bg-[#111] border border-white/10 rounded-xl p-8 h-fit">
          <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
          
          <div className="bg-[#1A1A1A] rounded-lg p-4 mb-6">
            <h4 className="text-[#FAB614] font-bold mb-2">First Aid Training</h4>
            <div className="space-y-2 text-sm text-gray-300">
               <div className="flex items-center gap-2"><Calendar size={14}/> {bookingData.course?.date} • {bookingData.course?.time}</div>
               <div className="flex items-center gap-2"><MapPin size={14}/> {bookingData.course?.location}</div>
               <div className="flex items-center gap-2"><User size={14}/> Instructor: {bookingData.course?.instructor}</div>
            </div>
          </div>

          <div className="mb-6">
             <h4 className="text-white font-bold mb-3">Attendee Details</h4>
             <div className="bg-[#1A1A1A] rounded-lg p-4 space-y-1 text-sm text-gray-400">
                <p>Name: <span className="text-white">{bookingData.details.firstName} {bookingData.details.lastName}</span></p>
                <p>Email: <span className="text-white">{bookingData.details.email}</span></p>
                <p>Phone: <span className="text-white">{bookingData.details.phone}</span></p>
             </div>
          </div>

          <div className="border-t border-white/10 pt-4 mb-6 space-y-2">
             <div className="flex justify-between text-gray-300">
                <span>Course Fee</span>
                <span>£{fee.toFixed(2)}</span>
             </div>
             <div className="flex justify-between text-gray-300">
                <span>VAT (20%)</span>
                <span>£{vat.toFixed(2)}</span>
             </div>
             <div className="flex justify-between text-[#FAB614] font-bold text-xl mt-4 pt-4 border-t border-white/10">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
             </div>
          </div>

          <button 
             onClick={handleNext}
             className="w-full bg-[#FAB614] text-black font-bold py-4 rounded-lg hover:bg-[#E5970C] transition-colors mb-4 cursor-pointer"
          >
             Pay £{total.toFixed(2)}
          </button>
          
          <div className="flex items-center justify-center gap-2 text-xs text-green-500">
             <CheckCircle2 size={12} />
             <span>Your payment information is secure and encrypted</span>
          </div>
        </div>
      </div>
    );
  };

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
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        
        {/* Header Navigation (Hide on Success step) */}
        {currentStep < 5 && (
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={currentStep === 1 ? () => {} : handleBack}
              className={`flex items-center gap-2 text-white hover:text-[#FAB614] transition-colors cursor-pointer ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}
            >
              <ChevronLeft size={20} />
              <span className="font-medium">Back</span>
            </button>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white absolute left-1/2 -translate-x-1/2">
              Book <span className="text-[#FAB614]">First Aid</span> Training
            </h1>
            <div className="w-16"></div> {/* Spacer for centering */}
          </div>
        )}

        {/* Step Content Switcher */}
        <div className="mt-12">
           {currentStep === 1 && renderStep1()}
           {currentStep === 2 && renderStep2()}
           {currentStep === 3 && renderStep3()}
           {currentStep === 4 && renderStep4()}
           {currentStep === 5 && renderStep5()}
        </div>

      </div>

      <Footer />
    </div>
  );
};

// Helper for security icon
const CheckCircle2 = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

export default BookingPage;