import React, { useState, useRef } from 'react';
import { MapPin, Globe, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const AncillaryHero = () => {
  const [activeTab, setActiveTab] = useState('Rental Houses');
  const scrollContainerRef = useRef(null);

  const tabs = [
    "Rental Houses", "Film Lab", "Post Production Houses", 
    "Specialist Camera and Grip Houses", "Virtual Production Studios", 
    "Lens Manufacturing", "DIT Companies", "Broadcast & Live Show"
  ];

  const rentalHouseData = {
    title: "Rental Houses",
    description: "Equipment rental facilities and camera houses providing professional gear for film and television productions",
    learningPoints: [
      "How is equipment booked? What is discussed on the phone when booking equipment?",
      "Who are the people in the engineering department? What do they do?",
      "What is the turnaround time of equipment?",
      "Who are client contacts? What do they do?",
      "Who are client contacts? What do they do?", 
      "Who are prep technicians and/or crew support staff? What do they do?",
      "What happens in the dispatch area? How do drivers know what jobs to collect?"
    ],
    facilities: [
      { name: "24/7 Drama", location: "London", url: "https://www.24-7drama.com" },
      { name: "ARRI Rental UK", location: "Uxbridge, Middlesex", url: "https://www.arrirental.com/" },
      { name: "Cameraworks", location: "London", url: "https://www.cameraworks.co.uk/" },
      { name: "Emmyland", location: "London", url: "https://www.emmyland.com/" },
      { name: "Focus 24", location: "London", url: "#" },
      { name: "Panavision", location: "London", url: "https://www.panavision.com/" },
    ]
  };

  // Scroll Handler
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Width of card + gap
      const container = scrollContainerRef.current;
      
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="bg-black py-20 w-full text-white mt-12">
      <div className="container mx-auto px-4">
        
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#FAB614] text-center mb-12 uppercase tracking-wide">
          Ancillary Learning
        </h2>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${
                activeTab === tab
                  ? 'bg-[#FAB614]/20 border-[#FAB614] text-[#FAB614]'
                  : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content Card */}
        <div className="bg-[#1A1A1A] max-w-5xl lg:max-w-5xl mx-auto border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl">
          
          <div className="mb-5">
            <h3 className="text-3xl font-bold text-[#FAB614] mb-2">{rentalHouseData.title}</h3>
            <p className="text-gray-300 text-lg">{rentalHouseData.description}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-bold text-white mb-4">Key Learning Points</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {rentalHouseData.learningPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 min-w-[20px]">
                     <CheckCircle2 size={18} className="text-[#FAB614]" />
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Available Facilities - Horizontal Scroll Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-white">Available Facilities</h4>
              
              {/* Carousel Controls */}
              <div className="flex gap-2">
                <button 
                  onClick={() => scroll('left')}
                  className="w-8 h-8 rounded-full bg-[#FAB614]/20 flex items-center justify-center text-[#FAB614] hover:bg-[#FAB614] hover:text-black transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="w-8 h-8 rounded-full bg-[#FAB614]/20 flex items-center justify-center text-[#FAB614] hover:bg-[#FAB614] hover:text-black transition-colors cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Scroll Container */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {rentalHouseData.facilities.map((facility, index) => (
                <div 
                  key={index} 
                  className="min-w-[280px] w-[280px] bg-black/40 border border-white/10 rounded-xl p-5 hover:border-[#FAB614]/50 transition-colors group shrink-0"
                >
                  <h5 className="font-bold text-white text-lg mb-4 truncate">{facility.name}</h5>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-[#FAB614]/20 p-1 rounded text-[#FAB614] shrink-0">
                        <MapPin size={12} />
                      </div>
                      <span className="text-xs text-[#FAB614] font-medium truncate">{facility.location}</span>
                    </div>
                    
                    <a href={facility.url} className="flex items-center gap-2 group-hover:opacity-100 opacity-80 transition-opacity">
                      <div className="bg-[#FAB614]/20 p-1 rounded text-[#FAB614] shrink-0">
                        <Globe size={12} />
                      </div>
                      <span className="text-xs text-[#FAB614] font-medium truncate">
                        {facility.url}
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AncillaryHero;