import React, { useState, useRef } from 'react';
import { MapPin, Globe, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const AncillaryHero = () => {
  const [activeTab, setActiveTab] = useState('Rental Houses');
  const carouselRef = useRef(null); // Ref for horizontal scrolling of facilities
  const cardRef = useRef(null);     // Ref for scrolling to the card on tab click

  const tabs = [
    "Broadcast & Live Show",
    "DIT Companies", "Film Lab",
    "Lens Manufacturing", "Post Production Houses",
    "Rental Houses",
    "Specialist Camera and Grip Houses", "Virtual Production Studios"
  ];

  // Data for all sections based on screenshots
  const allData = {
    "Broadcast & Live Show": {
      title: "Broadcast and Live TV",
      description: "Broadcast and Live TV Production Companies offer services as well as equipment for live television shows and events.",
      learningPoints: [
        "What are the main differences between broadcast and film crew working environments?",
        "What are the main roles in a broadcast gallery/control room?",
        "What are the roles in the studio floor room when shooting indoor productions?",
        "How are live broadcasts planned?",
        "What is a MCR (Master Control Room) and what happens there?",
        "What are some of the most encountered terms in broadcast?",
        "What are the usual terms directors use when talking to the camera operators in live shows?",
        "What does broadcast signal and transmission mean and how does television get to peoples houses?",
        "What is a vision broadcast engineer and what is their role?",
        "What is an OB(Outside Broadcast) truck and what happens in there during a live show?",
        "Why are rehearsals very important in broadcast?",
        "What is contingency and what does a fail-over test entail?",
        "What are the usual career pathways and progressions in broadcast?"
      ],
      facilities: [
        { name: "BBC Studios", location: "Bristol", url: "https://www.bbcstudios.com" },
        { name: "Cymru Broadcast Centre", location: "Cardiff", url: "https://cymrubroadcastcentre.com" },
        { name: "Dock10", location: "Greater Manchester", url: "https://www.dock10.co.uk" },
        { name: "Gravity Media", location: "London", url: "https://www.gravitymedia.com" },
        { name: "Hotcam Ltd", location: "London", url: "https://www.hotcam.tv" },
        { name: "IMG Studios", location: "London", url: "https://www.img.com" },
        { name: "NEP", location: "Berkshire", url: "https://www.nepgroup.co.uk" },
        { name: "QTV", location: "Glasgow", url: "https://qtv.media" },
        { name: "Timeline Television Ltd", location: "London", url: "https://www.timeline.tv" },
        { name: "Verve Media / Verve.film", location: "London", url: "https://verve.film" }
      ]

    },
    "DIT Companies": {
      title: "DIT Companies",
      description: "A DIT company specialises in managing on-set digital imaging workflows, providing services such as data management, colour control, and image quality assurance throughout production.",
      learningPoints: [
        "What happens to the camera media once it leaves the camera, and how do you ensure it's safely backed up and verified?",
        "How do you manage colour on set, and why is colour consistency important across different cameras and monitors?",
        "What software and tools do you use to check image quality, exposure, and metadata before the footage goes to post-production?",
        "How do you work with the DOP to establish and maintain the intended look of the film during shooting?",
        "What is a LUT, and how is it used in the on-set workflow to maintain creative intent?",
        "How do you decide on a LUT before a project?",
        "What information do you need from the camera team to set up your workflow correctly at the start of each shoot day?",
        "How do you label, track, and organise media to avoid confusion or data loss when multiple cameras or units are shooting?",
        "How do you communicate with post-production teams, and what data or reports do they rely on from you?",
        "What is important when changing or handing over media?",
        "What should a camera trainee understand about exposure, white balance, and file naming to make your job smoother and ensure a reliable workflow?",
        "How has the DIT role evolved with new camera formats, colour pipelines, and virtual production environments?"
      ],
      facilities: [
        { name: "CineArk", location: "Cardiff & London", url: "https://cineark.wales" },
        { name: "Digital Orchard Group", location: "London", url: "https://www.digitalorchardgroup.com" },
        { name: "London Commercial DITs", location: "London", url: "https://www.londoncommercialdits.co.uk" },
        { name: "Mission Digital", location: "London", url: "https://www.missiondigital.co.uk" },
        { name: "Notorious DIT", location: "London", url: "https://notorious-dit.co.uk" },
        { name: "Rebel Colour Ltd", location: "London", url: "https://www.rebelcolour.co.uk" },
        { name: "We Love Hue Ltd", location: "London", url: "https://welovehue.co.uk" }
      ]
    },
    "Film Lab": {
      title: "Film Lab",
      description: "A film laboratory is a specialised facility where motion picture film is chemically processed, developed, and finished into viewable or projectable images, often also providing digital scanning and archival services.",
      learningPoints: [
        "What happens to the film when it is delivered to a lab?",
        "What is the difference between a camera roll and a lab roll?",
        "What information is important on a film can?",
        "How do the technicians know where the end of the film is in the dark?",
        "Why does the lab need the camera reports?",
        "What are the parts of the film development process? What are the different chemicals in the baths that the film passes through?",
        "What is an \"ultrasonic cleaner\"?",
        "What is a \"telecine\"? How does it work?",
        "Why does the telecine operator need the camera reports?",
        "Who are the different people who work at a film lab, and what are their roles?",
        "How are rushes synced?",
        "What is the \"digital intermediate\" process?",
        "How is grain and noise removed from rushes?",
        "How can effects be added by using the physical celluloid?"
      ],
      facilities: [
        { name: "Cinelab Film & Digital", location: "London", url: "https://www.cinelab.co.uk/" },
        { name: "Kodak", location: "London", url: "https://www.kodak.com/en/" }
      ]
    },
    "Lens Manufacturing": {
      title: "Lens Manufacturing",
      description: "Lens manufacturing is the precise process of designing, shaping, polishing, coating, and assembling optical glass or other materials to create camera lenses that accurately focus and transmit light for imaging.",
      learningPoints: [
        "How is a lens manufactured?",
        "What are the different elements that make up a lens? What is their importance within the lens structure?",
        "How is the speed of a lens determined?",
        "How do anamorphic lenses work, and how are they built?",
        "How does the lens coating affect the image?",
        "How does a lens manufacturer decide on the optical design and coatings that give a lens its specific look or character?",
        "What materials are used to make lens elements, and how does glass composition affect colour, contrast, and sharpness?",
        "How are lenses polished, aligned, and tested to achieve accurate focus and minimal distortion?",
        "What are the tolerances in lens assembly, and how do small variations impact image quality or matching between lenses?",
        "How does the process differ between designing spherical, anamorphic, and zoom lenses?",
        "What testing equipment or charts do you use to measure resolution, colour consistency, and breathing?",
        "How do you calibrate focus and back focus for different camera mounts or sensor sizes?",
        "What kind of maintenance or servicing do professional lenses require to stay reliable on set?",
        "How do digital sensors and modern workflows influence lens design compared to the film era?",
        "What should a camera trainee look for when checking a lens before use — and what are signs it might need recalibration or repair?",
        "How would manufacturer recommend adjusting lenses to temperatures or transporting them correctly?"
      ],
      facilities: [
        { name: "Atlas Lens Co. (USA)", location: "Glendale", url: "https://atlaslensco.com/pages/about-atlas" },
        { name: "Cooke Optics", location: "Leicester", url: "https://www.cookeoptics.com" },
        { name: "Hawke Optics (UK)", location: "Ipswich", url: "https://www.hawkeoptics.com" },
        { name: "Leica (Germany)", location: "Wetzlar", url: "https://www.leica-camera.com" },
        { name: "True Lens Services", location: "Barwell (Leicestershire)", url: "https://www.truelens.co.uk" },
        { name: "Zeiss (Germany)", location: "Oberkochen", url: "https://www.zeiss.com" }
      ]
    },
    "Post Production Houses": {
      title: "Post Production Houses",
      description: "A post-production house manages the editing, sound, colour and visual effects stages of a film or television project after filming is complete.",
      learningPoints: [
        "What are the roles and responsibilities of the different members of the Post production team?",
        "Why is the clapperboard important in labelling and finding rushes?",
        "What does a usual day look like for each role?",
        "How are rushes synced using the clapperboard?",
        "Who syncs the rushes?",
        "How is timecode useful in syncing rushes and editing?",
        "What information do the VFX department need?",
        "What happens to Camera Report Sheets?",
        "How are rushes ingested and what happens with them then?",
        "What is colour grading and how do camera sheets help this process?"
      ],
      facilities: [
        { name: "Clear Cut", location: "London & Birmingham", url: "https://www.clearcut.cc" },
        { name: "Coda Post Production", location: "London", url: "https://codapostproduction.com" },
        { name: "Dock10 (Post)", location: "Greater Manchester", url: "https://www.dock10.co.uk/postproduction" },
        { name: "Gelert Post Production", location: "Cardiff", url: "http://gelert.tv" },
        { name: "Gorilla Post Production", location: "Cardiff", url: "http://gorillagroup.tv" },
        { name: "Gravity House (Gravity Media)", location: "London", url: "https://www.gravityhouse.london" },
        { name: "Molinare", location: "London", url: "https://molinare.co.uk" },
        { name: "Pinewood Post", location: "London", url: "https://pinewoodgroup.com" },
        { name: "Savalas Post", location: "Glasgow", url: "https://savalas.co.uk/" },
        { name: "The Mill", location: "London", url: "https://www.themill.com" },
        { name: "True North Post", location: "Leeds", url: "https://www.truenorthpost.tv" }
      ]
    },
    "Rental Houses": {
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
        { name: "ARRI Rental UK", location: "London", url: "https://www.arrirental.com" },
        { name: "Cameraworks", location: "London", url: "https://www.cameraworks.co.uk/" },
        { name: "Emmyland", location: "London", url: "https://www.emmyland.com" },
        { name: "Focus Canning", location: "London", url: "https://www.focus-canning.com" },
        { name: "FOMO Rentals", location: "London", url: "https://www.fomorentals.co.uk/" },
        { name: "MCX Films", location: "London", url: "https://www.mcxfilms.com/" },
        { name: "Media Dog Hire", location: "Birmingham / Manchester / Glasgow", url: "https://www.mediadoghire.com/" },
        { name: "No Drama", location: "Newcastle upon Tyne", url: "https://no-drama.co.uk" },
        { name: "Panavision UK", location: "London", url: "https://uk.panavision.com" },
        { name: "Progressive Broadcast Hire", location: "Glasgow", url: "https://progressive.camera/" },
        { name: "ProVision Equipment Hire", location: "Leeds, Manchester & London", url: "https://provisionequipment.tv/" },
        { name: "S+O Media", location: "London", url: "https://somedia.tv/" },
        { name: "Sunbelt Rentals", location: "London", url: "https://www.sunbeltrentals.co.uk/sectors/film-tv/" },
        { name: "VI Rentals", location: "Cardiff", url: "https://www.virental.co.uk/" },
        { name: "VMI", location: "London", url: "https://vmi.tv/contact/" }
      ]

    },
    "Specialist Camera and Grip Houses": {
      title: "Specialist Camera and Grip Houses",
      description: "Specialist camera and grip facilities provide customized equipment and technical expertise for complex or high-end shots. These companies focus on precision movement, aerial, underwater, and stabilized filming supporting productions that require creativity, innovation, and technical mastery. They often work alongside camera rental houses and production teams to design bespoke rigs or deliver unique visual solutions that standard equipment cannot achieve.",
      learningPoints: [
        "What do specialist and grip houses provide?",
        "What are some examples of cranes used regularly on sets?",
        "What does a headtech do?",
        "How are logistics and safety managed?",
        "What rigging knowledge is good to know about as a camera trainee/ assistant to make the process more efficient when working with grips?",
        "What is the process for drone filming? What qualifications and insurances do you need depending on the type of drones provided?",
        "What are some of the common mistakes or overlooked things when deciding to shoot underwater?",
        "How is underwater filming equipment prepared and tested before shooting starts?",
        "Why is it important to make sure to check in with the specialised operator before handling equipment used by them?",
        "Why is it always good to ask a specialist in the field before planning a shot?",
        "How do specialist departments slot into the main shoot when being called in for a day?",
        "What specialist gear would an assistant trained in the field need for the job at hand?"
      ],
      facilities: [
        { name: "CineAero", location: "Birmingham", url: "https://www.cineaero.com/" },
        { name: "CineArray", location: "London", url: "https://www.cine-array.com/" },
        { name: "Fifth Eye Crew", location: "London", url: "https://www.fiftheyecrew.co.uk/" },
        { name: "Love High Speed", location: "London", url: "https://www.lovehighspeed.com/" },
        { name: "Marzano Films", location: "Andover", url: "https://www.marzanofilms.com/" },
        { name: "Optical Support", location: "London", url: "https://www.opticalsupport.com" },
        { name: "T-Stop Aerials", location: "Bristol & Leeds", url: "https://www.tstopaerials.com/" },
        { name: "The Grip Company (TGC)", location: "London", url: "https://thegripcompany.co.uk/" },
        { name: "The Helicopter Girls", location: "Andover", url: "https://thehelicoptergirls.com/about-us" },
        { name: "The Underwater Company", location: "Somerset", url: "http://www.theunderwatercompany.co.uk/" }
      ]

    },
    "Virtual Production Studios": {
      title: "Virtual Production Studios",
      description: "Virtual production is a filmmaking process that combines live-action footage with real-time computer-generated environments, allowing filmmakers to see and adjust visual effects on set during shooting.",
      learningPoints: [
        "How does exposure behave differently when shooting LED screens compared to traditional sets or chroma backdrops?",
        "What role does lens calibration play in ensuring that virtual backgrounds align accurately with physical camera movement?",
        "What additional equipment might you be handed in the camera department when working on a virtual production stage?",
        "How does camera tracking integrate with the virtual environment to maintain correct perspective, focus distance, and lens metadata in real time?",
        "What challenges do rolling shutter sensors present when filming LED volumes, and how can they be mitigated?",
        "How does the choice of focal length and depth of field affect the believability of a blended physical-virtual scene?",
        "What communication is needed between the camera team and the Unreal Engine operator (or VP technician) before changing camera position or lens?",
        "What communication is needed between the camera team and the Unreal Engine operator (or VP technician) before changing camera position or lens?",
        "In what ways do camera movement and grip coordination (e.g., cranes, dollies, stabilisers) influence real-time rendering and tracking accuracy?",
        "What monitoring tools allow the DOP, operator, and director to see both the live plate and the virtual background during shooting?",
        "How can the camera department collaborate with VFX and data teams to ensure metadata from the shoot supports post-production continuity and compositing?"
      ],
      facilities: [
        { name: "ARRI Stage London", location: "London", url: "https://www.arri.com/en/solutions/virtual-production/arri-stage-london" },
        { name: "Fivefold Studios", location: "Bridgend (Wales)", url: "https://www.fivefoldstudios.co.uk" },
        { name: "Garden Studios", location: "London", url: "https://gardenstudios.io" },
        { name: "Production Park", location: "Wakefield (North England)", url: "https://www.productionpark.co.uk" },
        { name: "PYTCH Virtual Venue", location: "Bristol, UK", url: "https://pytch.co.uk/the-virtual-venue-virtual-production-bristol/" },
        { name: "RecodeXR Studio", location: "Manchester", url: "https://recode-xr-studio.com" },
        { name: "Silvertown Studios", location: "London", url: "https://www.silvertownstudios.co.uk" },
        { name: "Solent University", location: "Southampton", url: "https://www.solent.ac.uk" },
        { name: "Tungsten Media", location: "Leeds", url: "https://tungstenmedia.co.uk" }
      ]
    }
  };

  const currentData = allData[activeTab];

  // Scroll Handler for Carousel
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      const container = carouselRef.current;

      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Handler for Tab Click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Scroll to the card section
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border ${activeTab === tab
                ? 'bg-[#FAB614]/20 border-[#FAB614] text-[#FAB614]'
                : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content Card - Ref attached here for scrolling */}
        <div ref={cardRef} className="bg-[#1A1A1A] max-w-5xl lg:max-w-5xl mx-auto border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl scroll-mt-24">

          <div className="mb-5">
            <h3 className="text-3xl font-bold text-[#FAB614] mb-2">{currentData.title}</h3>
            <p className="text-gray-300 text-lg">{currentData.description}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-bold text-white mb-4">Key Learning Points</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {currentData.learningPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 min-w-[20px]">
                    <img src='./icon.png' alt="icon" width={20} height={20} className="text-[#FAB614]" />
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
                  onClick={() => scrollCarousel('left')}
                  className="w-8 h-8 rounded-full bg-[#FAB614]/20 flex items-center justify-center text-[#FAB614] hover:bg-[#FAB614] hover:text-black transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => scrollCarousel('right')}
                  className="w-8 h-8 rounded-full bg-[#FAB614]/20 flex items-center justify-center text-[#FAB614] hover:bg-[#FAB614] hover:text-black transition-colors cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Scroll Container */}
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {currentData.facilities.map((facility, index) => (
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