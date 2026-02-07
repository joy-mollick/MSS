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


import bg from '@/assets/bg.avif';
import news1 from '@/assets/news1.avif';
import news2 from '@/assets/news2.avif';
import { Calendar, Globe } from "lucide-react";
import { Link } from 'react-router-dom';
import { db } from '../../config';
import { useEffect, useState } from 'react';
import { ReadMore } from '../ReadMore';
import moment from 'moment';

// Bottom Sections (Patrons, News, FAQ)
const BottomSections = () => {

  const [articlesArray, setArticlesArray] = useState([])

  useEffect(() => {
    const subscribe = db.ref('News').orderByChild('status').equalTo('Published').on('value', (snap) => {
      if (snap != undefined && snap.val() != null) {
        let arr = Object.values(snap.val())
        arr.sort(function (a, b) {
          return b.id - a.id
        })
        let temp = [{}, {}]
        temp[0] = arr[0]
        temp[1] = arr[1]
        setArticlesArray([...temp])
      }
      else if (snap != undefined) {
        setArticlesArray([])
      }
    })
    return () => subscribe()
  }, [])

  const [showNewsDetails, setShowNewsDetails] = useState(false)

  async function updateView() {
    await db.ref('News').child(String(showNewsDetails.id)).update({ view: showNewsDetails.view + 1 })
  }

  useEffect(() => {
    if (showNewsDetails != false) {
      updateView()
    }
  }, [showNewsDetails])

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
  return (
    <>
      {/* Our Patrons */}
      <ReadMore article={showNewsDetails == false ? {} : showNewsDetails} isOpen={showNewsDetails} onClose={() => setShowNewsDetails(false)} />

      {/* our patrons */}
    

      <section className="bg-black py-20 w-full">
        <div id="patrons" className="container mx-auto px-4">

          {/* Section Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#FAB614] text-center mb-16 uppercase tracking-wider">
            Our Patrons
          </h2>

          {/* Patrons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
            {patrons.map((patron) => (
              <div
                key={patron.id}
                className="
            border border-[#FAB614]
            rounded-xl
            p-3 md:p-4
            flex flex-col justify-between
            hover:bg-[#FAB614]/5
            transition-colors duration-300
          "
              >
                {/* Logo Area */}
                <div className="h-20 md:h-24 flex items-center justify-center mb-6">
                  <img
                    src={patron.logo}
                    alt={patron.name}
                    className="max-h-full max-w-full object-contain"
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
                    className="
                w-full
                bg-[#FAB614]
                hover:bg-[#E5970C]
                text-black
                font-semibold
                text-xs
                py-2
                rounded-lg
                flex items-center justify-center gap-2
                transition-colors
              "
                  >
                    <Globe size={14} />
                    Visit Website
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Main CTA Button */}
          <Link to="/patrons" className="flex justify-center items-center">
            <button className="
        bg-gradient-to-r from-[#FAB614] to-[#E5970C]
        text-black font-bold text-md
        h-14 px-8
        rounded-full
        shadow-[0_0_20px_rgba(229,151,12,0.3)]
        flex items-center gap-3
        cursor-pointer
        hover:shadow-[0_0_30px_rgba(229,151,12,0.5)]
        transition-shadow
      ">
              See All Our Supporters
            </button>
          </Link>

        </div>
      </section>


      {/* Latest News */}
      <section id='news' className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#FAB614] text-center mb-12">
            Latest News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {articlesArray.map((article) => (
              <div key={article.title} className="bg-white/5 rounded-xl overflow-hidden border border-[#FAB614]/20">
                <img src={article.image} alt={article.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <div className="text-sm text-white/50 mb-2">Article • 3 min read</div>
                  <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                  <p className="text-white/70 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">{moment(new Date(article.id)).format('DD MMM YYYY')}</span>
                    <Link onClick={() => setShowNewsDetails(article)} className="text-[#FAB614] hover:underline">READ MORE »</Link>
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
      <section id='faq' className="relative z-10 container mx-auto px-6 py-16" >
        <div className="max-w-7xl mx-auto rounded-2xl border-2 border-[#FAB614] overflow-hidden relative py-20" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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