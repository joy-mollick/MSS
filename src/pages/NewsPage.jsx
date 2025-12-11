import React, { useState } from 'react';
import { X, Mail } from 'lucide-react'; // Added imports for icons
import Navbar from '@/components/Navbar';
import Footer from '@/components/HomePage/Footer';

import news1 from '@/assets/news1.png'; 
import news2 from '@/assets/news2.png'; 

const NewsPage = () => {
  // State to control the popup visibility
  const [showNewsletter, setShowNewsletter] = useState(false);

  return (
    <>
      <div className={`min-h-screen bg-black text-white overflow-x-hidden ${showNewsletter ? 'h-screen overflow-hidden' : ''}`}>
        {/* Background decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[1000px] h-[450px] bg-[#E5970C]/20 blur-[100px] rounded-full" />
        </div>

        <Navbar selectedMenu="News" />

        {/* Latest News */}
        <section className="relative z-10 container mx-auto px-6 py-16 mt-12">
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
                <div key={article.title} className="bg-white/5 rounded-xl overflow-hidden border border-[#FAB614]/20 flex flex-col">
                  <img src={article.img} alt={article.title} className="w-full h-64 object-cover" />
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-sm text-white/50 mb-2">Article • 3 min read</div>
                    <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                    <p className="text-white/70 mb-4 flex-grow">{article.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-white/50">20 March 2025</span>
                      {/* Changed to button to trigger popup */}
                      <button 
                        onClick={() => setShowNewsletter(true)}
                        className="text-[#FAB614] hover:text-[#E5970C] hover:underline font-semibold uppercase text-sm tracking-wide transition-colors"
                      >
                        READ MORE »
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />

        {/* NEWSLETTER POPUP MODAL */}
        {showNewsletter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowNewsletter(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-[#151515] w-full max-w-3xl rounded-2xl p-8 md:p-12 border border-[#FAB614]/20 shadow-2xl animate-in fade-in zoom-in duration-200">
              
              {/* Close Button */}
              <button 
                onClick={() => setShowNewsletter(false)}
                className="absolute top-4 right-4 bg-[#FAB614] hover:bg-[#E5970C] text-black rounded-full p-1.5 transition-colors"
              >
                <X size={20} strokeWidth={2.5} />
              </button>

              <div className="text-center space-y-4">
                <h2 className="text-4xl font-extrabold text-[#FAB614]">News & Updates</h2>
                
                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                  Stay up to date with the latest updates, insights, and tips—all in one place! We'll keep it fresh, relevant, and worth your time.
                </p>

                <div className="py-2 flex items-center justify-center gap-2 text-white/90 font-medium">
                  <span>👉</span>
                  <span>Want updates straight to your inbox? Don't forget to sign up for our newsletter!</span>
                  <span>📧</span>
                </div>

                {/* Subscribe Form Box */}
                <div className="mt-8 bg-[#1E1E1E] rounded-xl p-6 md:p-8 border border-white/5 text-left">
                  <h3 className="text-xl font-bold text-white mb-4">Subscribe to Our Newsletter</h3>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      className="flex-1 bg-[#252525] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FAB614] transition-colors"
                    />
                    <button className="bg-[#FAB614] hover:bg-[#E5970C] text-black font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-[#FAB614]/20 transition-all duration-200 whitespace-nowrap">
                      Subscribe Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default NewsPage;