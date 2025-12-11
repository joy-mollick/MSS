
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, Play } from "lucide-react";

import icon from '@/assets/icon.png';
import hero from '@/assets/hero.png';

// Hero and About Section Component
const HeroSection = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="mt-8 md:mt-16 relative z-10 container mx-auto px-6 pt-16 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight uppercase">
            <span className="text-[#FAB614]">For Camera Crew, </span>
            <span className="text-white">By Camera Crew</span>
          </h1>
          
          <div className="max-w-5xl">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              <span className="font-bold">A Professional, Peer-Reviewed Camera Training Framework- Built for the Future of Film & TV</span>
              <br />
              Welcome to a new era of camera department training. More certainty, more consistency of standards, and more access to learning.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 container mx-auto px-6 pt-24 py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12">
          <div className="relative flex-shrink-0 w-full lg:w-auto">
            <img
              src={hero}
              alt="Camera Crew"
              className="rounded-2xl w-full lg:w-[483px] h-auto"
            />
          </div>
          <div className="flex flex-col gap-6 flex-1">
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#FAB614]">
              About CineCertified
            </h2>
            
            <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
              CineCertified is backed by leading camera organisations, rental houses, and crew across the UK film, TV, and advertising sectors.
            </p>
            
            <div className="flex flex-col gap-4 mt-4">
              {[
                'Standardises nationwide training through an easy-to-use app',
                'Uses the SODOTO method for stronger knowledge retention',
                'Gives trainees a clear overview of progress with a manageable end goal',
                'Provides ongoing support across the UK, including remote regions',
                'Lifts industry safety training and standards'
              ].map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <img src={icon} alt="Icon" className="w-8 h-8" />
                  <p className="text-lg md:text-xl text-white/90">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;