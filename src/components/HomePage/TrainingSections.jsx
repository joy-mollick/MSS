
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, Play } from "lucide-react";

import app1 from '@/assets/iPhone 13 Pro_1.png';
import app2 from '@/assets/iPhone 13 Pro_2.png';
import app3 from '@/assets/iPhone 13 Pro_3.png';
import appstore from '@/assets/appstore.png';
import playstore from '@/assets/playstore.png';
import firstAid from '@/assets/first-aid.avif';
import safety from '@/assets/safety.avif';
import icon from '@/assets/icon.png';

import {
    Home,
    FlaskConical,
    Film,
    Aperture,
    MonitorPlay,
    Disc,
    Database,
    Radio
} from 'lucide-react';
import bg from '@/assets/bg.avif';
import { Link } from "react-router-dom";

// Training and App Sections Component
const TrainingSections = () => {

    const cards = [
        {
            title: "Broadcast & Live Show",
            desc: "Live event and studio broadcast production services",
            icon: <Radio className="w-6 h-6" />
        },
        {
            title: "DIT Companies",
            desc: "On-set data handling and media management services",
            icon: <Database className="w-6 h-6" />
        },
        {
            title: "Film Lab",
            desc: "Film processing and development facilities",
            icon: <FlaskConical className="w-6 h-6" />
        },
        {
            title: "Lens Manufacturing",
            desc: "Precision optics design and assembly facilities",
            icon: <Disc className="w-6 h-6" />
        },
        {
            title: "Post Production Houses",
            desc: "Editing, color grading, and post-production facilities",
            icon: <Film className="w-6 h-6" />
        },
        {
            title: "Rental Houses",
            desc: "Equipment rental facilities and camera houses",
            icon: <Home className="w-6 h-6" />
        },
        {
            title: "Specialist Camera and Grip Houses",
            desc: "Grip equipment and rigging specialists",
            icon: <Aperture className="w-6 h-6" />
        },
        {
            title: "Virtual Production Studios",
            desc: "LED stage and real-time virtual filmmaking facilities",
            icon: <MonitorPlay className="w-6 h-6" />
        }
    ];

    return (
        <>
            {/* The CineCertified App */}
            <section className="relative z-10 container mx-auto px-6 py-16">
                <div  className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#FAB614] mb-4">
                            The CineCertified App
                        </h2>
                        <p className="text-xl text-white/90">
                            The CINECERTIFIED App gives you full control over your training progress
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        {[
                            { title: 'Trainee', subtitle: 'Track your progress and development', image: app1 },
                            { title: 'Signatory', subtitle: ' Manage and oversee a trainee’s development', image: app2 },
                            { title: 'Ambassador', subtitle: 'Support and guide the community', image: app3 }
                        ].map((app) => (
                            <div key={app.title} className="flex flex-col items-center text-center gap-4">
                                <img src={app.image} className="w-full max-w-[300px]  rounded-3xl" />
                                <h3 className="text-2xl font-bold uppercase bg-gradient-to-r from-[#FAB614] to-[#E5970C] bg-clip-text text-transparent">
                                    {app.title}
                                </h3>
                                <p className="text-white/70">{app.subtitle}</p>
                            </div>
                        ))}
                    </div>

                    <div id='FirstAid' className="flex justify-center gap-6">
                        <div className="w-40 flex items-center justify-center">
                            <a href="https://apps.apple.com/gb/app/cinecertified/id6754809670" target="_blank" rel="noopener noreferrer"><img src={appstore} alt="Apple App Store" /></a>
                        </div>
                        <div className="w-40 flex items-center justify-center">
                            <a href="https://play.google.com/store/apps/details?id=com.cine_certified" target="_blank" rel="noopener noreferrer"><img src={playstore} alt="Google Play Store" /></a>
                        </div>
                    </div>
                </div>
            </section>

            {/* First Aid Training */}
            <section  className="relative z-10 ">
                <div className=" overflow-hidden relative" style={{ backgroundImage: `url(${firstAid})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div  className="container mx-auto px-6 py-22 max-w-7xl relative z-10  flex flex-col items-center gap-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#FAB614]">
                            First Aid Training For All Film Professionals
                        </h2>

                        <p className="text-lg text-white/90 max-w-5xl leading-relaxed">
                            We’ve partnered with Train2Save to offer the most affordable First Aid courses for anyone in the industry. Whether you’re part of CINECERTIFIED or not, and whatever your department.

                            Safety comes first, and everyone should have access to it. <br />
                            We’re currently seeking investors to make this training free for trainees. Until then, CINECERTIFIED app users get a discount, and if you’re a trainee and struggling financially, get in touch — we can help.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                'HSE-approved first aid certification',
                                'Film industry-specific scenarios and training',
                                '3-year certification validity',
                                'Practical hands-on training sessions',
                                'Equipment handling safety protocols'
                            ].map((feature) => (
                                <div key={feature} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                                    <CheckCircle2 className="w-5 h-5 text-[#FAB614]" />
                                    <span className="text-white">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Link to="/booking">
                            <Button className="bg-gradient-to-r cursor-pointer from-[#FAB614] to-[#E5970C] text-black font-bold text-lg h-14 px-8 rounded-full shadow-[0_0_20px_rgba(229,151,12,0.3)] flex items-center gap-3">
                                <Calendar className="h-8 w-8" />
                                Book Training Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Safety Starts with Knowledge */}


            <section id='safety' className="relative z-10 container mx-auto px-6 py-16 mt-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

                    {/* LEFT IMAGE */}
                    <div className="w-full flex justify-center lg:justify-start">
                        <img
                            src={safety}
                            alt="Ambassadors"
                            className="
          w-[70%]
          sm:w-[80%]
          lg:w-full
          h-auto
          object-cover
        "
                        />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="flex flex-col h-full justify-between">

                        {/* TEXT CONTENT */}
                        <div className="flex flex-col gap-6">
                            <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#FAB614]">
                                Safety Starts With Knowledge
                            </h2>

                            <p className="text-2xl text-white leading-relaxed">
                                Experience and learning the right knowledge is a crucial first step to
                                building a safer film industry as a whole. We wholeheartedly support
                                the Mark Milsome Foundation's efforts and make their Health and Safety
                                course part of our key requirements for a successful camera career.
                            </p>

                            <div className="flex flex-col gap-4 mt-4">
                                {[
                                    'Special Discount for CineCertified Trainees',
                                    'CineCertified trainees will receive a special discount code when contacting the MMF about their course.',
                                ].map((text) => (
                                    <div key={text} className="flex items-start gap-3">
                                        <img src={icon} alt="Icon" className="w-8 h-8" />
                                        <p className="text-lg text-white/90">
                                            {text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* BUTTON */}
                        <a
                            href="https://mmfonlinetraining.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
          mt-8 lg:mt-0
          bg-linear-to-r from-[#FAB614] to-[#E5970C]
          text-black font-bold text-md
          h-14 px-8
          rounded-full
          shadow-[0_0_20px_rgba(229,151,12,0.3)]
          flex items-center gap-3
          mr-auto
          cursor-pointer
          hover:shadow-[0_0_30px_rgba(229,151,12,0.5)]
          transition-shadow
        "
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 1L19.8912 2.82C20.1088 2.87333 20.288 2.99333 20.4288 3.18C20.5696 3.36667 20.64 3.57333 20.64 3.8V13.78C20.64 14.7933 20.4128 15.74 19.9584 16.62C19.504 17.5 18.8736 18.22 18.0672 18.78L12 23L5.93279 18.78C5.12639 18.22 4.49599 17.5 4.04159 16.62C3.58719 15.74 3.35999 14.7933 3.35999 13.78V3.8C3.35999 3.57333 3.43039 3.36667 3.57119 3.18C3.71199 2.99333 3.89119 2.87333 4.10879 2.82L12 1ZM12 3.04L5.27999 4.6V13.78C5.27999 14.46 5.43039 15.0933 5.73119 15.68C6.03199 16.2667 6.45119 16.7467 6.98879 17.12L12 20.6L17.0112 17.12C17.5488 16.7467 17.968 16.2667 18.2688 15.68C18.5696 15.0933 18.72 14.46 18.72 13.78V4.6L12 3.04ZM16.2816 8.22L17.6256 9.64L11.52 16L7.44959 11.76L8.81279 10.34L11.52 13.18L16.2816 8.22Z"
                                    fill="black"
                                />
                            </svg>
                            Health and Safety Course – Mark Milsome Foundation
                        </a>

                    </div>

                </div>
            </section>




            {/* Ancillary Learning */}


            <section
                id="learn"
                className="relative w-full py-24 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bg})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0"></div>

                <div className="relative z-10 container mx-auto px-6 lg:px-12">

                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#FFB800] uppercase mb-6 tracking-wide">
                            Ancillary Learning
                        </h2>

                        <p className="text-gray-300 text-lg md:text-xl max-w-5xl mx-auto leading-relaxed">
                            Ancillary Learning refers to additional training or experience gained outside your immediate role:
                            extra days in related departments or environments that connect to your job indirectly. By learning
                            how other roles interact with and are affected by your work, you gain a broader understanding of
                            the filmmaking process and become a more skilled, collaborative, and well-rounded technician.
                            CINECERTIFIED camera trainees are encouraged to organise Ancillary Learning experiences of
                            their choice to gain a deeper understanding of their role.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="
            bg-[#3E2111]/80
            backdrop-blur-sm
            border border-[#6B4628]
            rounded-xl
            p-4 md:p-6
            hover:bg-[#3E2111]
            transition-colors duration-300
            flex flex-col h-full
          "
                            >
                                {/* Header Row */}
                                <div className="flex items-start gap-3 mb-4">
                                    {/* Icon */}
                                    <div className="shrink-0 text-[#FFB800] p-1 sm:p-2 rounded-lg border border-[#FFB800]/20 bg-[#FFB800]/10 flex items-center justify-center">
                                        <span className="w-6 h-6 sm:w-8 md:w-10 flex items-center justify-center">
                                            {card.icon}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="
                text-white
                font-bold
                text-sm sm:text-base md:text-lg
                leading-snug
                break-words
                overflow-hidden
              "
                                    >
                                        {card.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {card.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Button */}
                    <Link to="/ancillary-learning" className="flex justify-center items-center">
                        <button className="
        bg-linear-to-r from-[#FAB614] to-[#E5970C]
        text-black font-bold text-md
        h-14 px-8
        rounded-full
        shadow-[0_0_20px_rgba(229,151,12,0.3)]
        flex items-center gap-3
        cursor-pointer
        hover:shadow-[0_0_30px_rgba(229,151,12,0.5)]
        transition-shadow
      ">
                            Read More
                        </button>
                    </Link>

                </div>
            </section>



        </>
    );
};

export default TrainingSections;