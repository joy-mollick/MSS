import React from 'react'
import Navbar from '@/components/Navbar';
import Footer from '@/components/HomePage/Footer';

import logo1 from '@/assets/logos/logo1.png'; // ARRI Rental
import logo2 from '@/assets/logos/logo2.png'; // Brownian Motion
import logo3 from '@/assets/logos/logo3.png'; // Digital Orchard
import logo4 from '@/assets/logos/logo4.png'; // Focus Canning
import logo5 from '@/assets/logos/logo5.png'; // Filmsticks
import logo6 from '@/assets/logos/logo6.png'; // Fujifilm
import logo7 from '@/assets/logos/logo7.png'; // No Drama
import logo8 from '@/assets/logos/logo8.png'; // Panavision
import logo9 from '@/assets/logos/logo9.png'; // Red
import logo10 from '@/assets/logos/logo10.png'; // Suz Cruz
import logo11 from '@/assets/logos/logo11.png'; // TLS
import logo12 from '@/assets/logos/logo12.png'; // Verve
import logo13 from '@/assets/logos/logo13.png'; // Vision Artists
import logo14 from '@/assets/logos/logo14.png'; // Zeiss

import { Calendar, Globe } from "lucide-react";

const PatronsPage = () => {
  const patrons = [
      { id: 1, logo: logo1, name: "ARRI Rental", website: "https://www.arrirental.com/en" },
      { id: 2, logo: logo2, name: "Brownian Motion", website: "https://www.brownianmotion.co.uk/" },
      { id: 3, logo: logo3, name: "Digital Orchard", website: "https://digitalorchardgroup.com/" },
      { id: 4, logo: logo4, name: "Focus Canning", website: "https://www.focus-canning.com/" },
      { id: 5, logo: logo5, name: "Filmsticks", website: "https://www.filmsticks.co/?srsltid=AfmBOopBaXUpGrEt9jx5V7barYC3C5yIsZY6H0LUWdAUi_y6eujfzYcD" },
      { id: 6, logo: logo6, name: "Fujifilm", website: "https://www.fujifilm.com/uk/en" },
      { id: 7, logo: logo7, name: "No Drama", website: "https://no-drama.co.uk/" },
      { id: 8, logo: logo8, name: "Panavision", website: "https://uk.panavision.com/" },
      { id: 9, logo: logo9, name: "Red", website: "https://www.red.com/" },
      { id: 10, logo: logo10, name: "Suz Cruz", website: "https://www.suzcruz.co.uk/" },
      { id: 11, logo: logo11, name: "TLS", website: "https://www.truelens.co.uk/" },
      { id: 12, logo: logo12, name: "Verve", website: "https://verve.film/" },
      { id: 13, logo: logo13, name: "Vision Artists", website: "https://www.visionartists.co.uk/" },
      { id: 14, logo: logo14, name: "Zeiss", website: "https://www.zeiss.co.uk/corporate/home.html" },
    ];

  const supporters = [
    "ACO", "Atlas Lens Co.", "Bebob", "Bectu Camera Branch", "Bright Tangerine",
    "Brownian Motion", "Cameraworks", "CineAero", "CineArk", "CineArray",
    "Cinelab Film & Digital", "CineParts", "Cooke Optics", "CVP", "Digital Orchard",
    "Easyrig", "Emmyland", "Film Crew Apparel", "FilmFix", "Filmsticks",
    "FocusBug", "Focus Canning", "FOG Creative", "FOMO Rentals / FOMO House", "Forty One Thirty",
    "Fujifilm UK", "Future In Film", "GBCT", "Gravy Crew", "Grip Factory Munich (GFM)",
    "GTC", "Hawk UK", "The Helicopter Girls", "Holistic Grips", "Irwin Blake",
    "KitStart", "Kodak", "Leitz", "London Commercial DITs", "Mark Milsome Foundation",
    "MCX Films", "Mission Digital", "No Drama", "Notorious DIT", "One Stop Films",
    "Optical Support", "Orchard Crew", "Panavision", "Progressive Broadcast Hire", "Rebel Colour",
    "RED Digital Cinema", "Rexy Gaming", "RSVP", "S+O Media", "Sea Star Rental",
    "Second Reef", "Shoot Blue", "Somerset Film", "SONY", "Sunbelt Rentals",
    "SuzCruz", "T-Stop Aerials", "Tentacle Sound", "TheCallSheet.co.uk", "The Grip Company (TGC)",
    "The Underwater Company", "Tiffen Filters", "True Lens Services (TLS)", "VERVE.film", "Vision Artists Diary Service",
    "VMI", "We Love Hue", "Women Behind The Camera", "ZEISS", "121 Diary",
    "24-7 Drama", "Case Design", "Holdan", "Hydra Distribution", "Marzano Films",
    "Hamas Cases", "That's A Wrap (TAW)", "Mr. Helix", "Screen Sisters", "British Cinematographer"
  ];
  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Background decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[1000px] h-[450px] bg-[#E5970C]/20 blur-[100px] rounded-full" />
        </div>

        <Navbar selectedMenu="Patrons" />

        {/* Our Patrons */}

        <section className="bg-black py-20 w-full mt-12">
          <div className="container mx-auto px-4">

            {/* Section Heading */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#FAB614] text-center mb-16 uppercase tracking-wider">
              Our Patrons
            </h2>

            {/* Patrons Grid - Using Flex wrap to center the last row automatically */}
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              {patrons.map((patron) => (
                <div
                  key={patron.id}
                  className="w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(16.66%-1.5rem)] min-w-[200px] border border-[#FAB614] rounded-xl p-4 flex flex-col justify-between hover:bg-[#FAB614]/5 transition-colors duration-300"
                >
                  {/* Logo Area */}
                  <div className="h-24 flex items-center justify-center mb-6">
                    <img
                      src={patron.logo}
                      alt={patron.name}
                      className="max-h-full max-w-full object-contain "
                    />
                  </div>

                  {/* Card Meta & Action */}
                  <div className="mt-auto space-y-3">

                    {/* Info Row */}
                    <div className="flex items-center justify-between text-[10px] text-[#FAB614]/80">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>Patron since 2025</span>
                      </div>
                      <span className="bg-[#FAB614]/20 px-2 py-0.5 rounded text-[#FAB614] border border-[#FAB614]/30">
                        Patron
                      </span>
                    </div>

                    {/* Visit Website Button */}
                <a 
                  href={patron.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#FAB614] hover:bg-[#E5970C] text-black font-semibold text-xs py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Globe size={14} />
                  Visit Website
                </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="bg-black max-w-5xl md:max-w-6xl mx-auto py-4 w-full">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#FAB614] uppercase tracking-wider mb-6">
            Our Supporters
          </h2>
          <p className="text-white/80 text-lg max-w-4xl mx-auto leading-relaxed">
            CineCertified is an initiative representing the camera department in the UK film, television and advertising sectors, built with the support of a wide array of companies:
          </p>
        </div>

        {/* Supporters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {supporters.map((supporter, index) => (
            <div 
              key={index}
              className="group relative bg-[#1A1A1A] border border-[#FAB614]/30 rounded-lg p-4 flex items-center justify-center text-center h-16 hover:border-[#FAB614] hover:bg-[#FAB614]/10 transition-all duration-300 cursor-default"
            >
              <span className="text-white text-sm font-medium group-hover:text-[#FAB614] transition-colors">
                {supporter}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>

        <Footer />
      </div>
    </>
  )
}


export default PatronsPage;