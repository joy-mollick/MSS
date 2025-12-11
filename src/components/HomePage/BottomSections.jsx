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


import bg from '@/assets/bg.png';
import news1 from '@/assets/news1.png'; 
import news2 from '@/assets/news2.png'; 
import { Calendar, Globe } from "lucide-react";
import { Link } from 'react-router-dom';

// Bottom Sections (Patrons, News, FAQ)
const BottomSections = () => {
    
    const patrons = [
    { id: 1, logo: logo1, name: "ARRI Rental" },
    { id: 2, logo: logo2, name: "Brownian Motion" },
    { id: 3, logo: logo3, name: "Digital Orchard" },
    { id: 4, logo: logo4, name: "Focus Canning" },
    { id: 5, logo: logo5, name: "Filmsticks" },
    { id: 6, logo: logo6, name: "Fujifilm" },
    { id: 7, logo: logo7, name: "No Drama" },
    { id: 8, logo: logo8, name: "Panavision" },
    { id: 9, logo: logo9, name: "Red" },
    { id: 10, logo: logo10, name: "Suz Cruz" },
    { id: 11, logo: logo11, name: "TLS" },
    { id: 12, logo: logo12, name: "Verve" },
    { id: 13, logo: logo13, name: "Vision Artists" },
    { id: 14, logo: logo14, name: "Zeiss" },
  ];
  return (
    <>
      {/* Our Patrons */}

      <section className="bg-black py-20 w-full">
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
                <button className="w-full bg-[#FAB614] hover:bg-[#E5970C] text-black font-semibold text-xs py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Globe size={14} />
                  Visit Website
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Main CTA Button */}
        <Link to='/patrons' className="flex justify-center items-center">
            <button className="bg-gradient-to-r from-[#FAB614] to-[#E5970C] text-black font-bold text-md h-14 px-8 rounded-full shadow-[0_0_20px_rgba(229,151,12,0.3)] flex items-center gap-3 cursor-pointer hover:shadow-[0_0_30px_rgba(229,151,12,0.5)] transition-shadow">
                See All Our Supporters
            </button>
        </Link>

      </div>
    </section>

      {/* Latest News */}
      <section className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#FAB614] text-center mb-12">
            Latest News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: 'THE GREAT APP LAUNCH RAFFLE',
                excerpt: 'We\'ve been plotting, planning, and pulling strings to bring you the biggest raffle!',
                img: news1
              },
              {
                title: 'WELCOME TO OUR NEWS SECTION',
                excerpt: 'Your go-to place for updates, insights, and everything CineCertified...',
                img: news2
              }
            ].map((article) => (
              <div key={article.title} className="bg-white/5 rounded-xl overflow-hidden border border-[#FAB614]/20">
                <img src={article.img} alt={article.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <div className="text-sm text-white/50 mb-2">Article • 3 min read</div>
                  <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                  <p className="text-white/70 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">20 March 2025</span>
                    <Link to="/news" className="text-[#FAB614] hover:underline">READ MORE »</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/news" className="flex justify-center items-center">
            <button className="bg-gradient-to-r from-[#FAB614] to-[#E5970C] text-black font-bold text-md h-14 px-8 rounded-full shadow-[0_0_20px_rgba(229,151,12,0.3)] flex items-center gap-3 cursor-pointer hover:shadow-[0_0_30px_rgba(229,151,12,0.5)] transition-shadow">
              Read More News
            </button>
        </Link>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="relative z-10 container mx-auto px-6 py-16" >
        <div className="max-w-7xl mx-auto rounded-2xl border-2 border-[#FAB614] overflow-hidden relative py-20" style={{backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#FAB614] mb-8">
              Do you have ANY questions?
            </h2>
            <div className="flex justify-center items-center">
                <Link to="/faq">
            <button className="bg-gradient-to-r from-[#FAB614] to-[#E5970C] text-black font-bold text-md h-14 px-8 rounded-full shadow-[0_0_20px_rgba(229,151,12,0.3)] flex items-center gap-3 cursor-pointer hover:shadow-[0_0_30px_rgba(229,151,12,0.5)] transition-shadow">
              See Our FAQs
            </button>
                </Link>
        </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BottomSections;