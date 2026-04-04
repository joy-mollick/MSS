import React, {
  memo,
  useCallback,
  useState,
  lazy,
  Suspense,
} from "react";
import setting1 from "@/assets/setting1.png";
import setting2 from "@/assets/setting2.png";
import setting3 from "@/assets/setting3.png";
import why1 from "@/assets/why1.png";
import why2 from "@/assets/why2.png";
import why3 from "@/assets/why3.png";
import why4 from "@/assets/why4.png";
import icon from "@/assets/icon.png";
import amb from "@/assets/amb.avif";
import video from "@/assets/video.jpg";

const VideoModal = lazy(() =>
  import("../VideoModal").then((module) => ({
    default: module.VideoModal,
  }))
);

const WHY_ITEMS = [
  {
    image: why1,
    number: "01",
    title: "Breakdown of Skills",
    description:
      "We have deconstructed the role of the camera trainee into twelve distinct Camera Skills",
  },
  {
    image: why2,
    number: "02",
    title: "Peer-Assessed Logbook",
    description:
      "Senior camera crew sign off a trainee's progress at distinct stages throughout their training",
  },
  {
    image: why3,
    number: "03",
    title: "Industry Support",
    description:
      "The framework helps camera trainees know what questions to ask, as well as aid trainers to understand what guidance to offer",
  },
  {
    image: why4,
    number: "04",
    title: "Future Focus",
    description:
      "Once the logbook has been completed, the trainee undertakes a final assessment and becomes CINECERTIFIED",
  },
];

const STANDARDS_ITEMS = [
  {
    name: "ACO",
    description:
      "Association of Camera Operators - Advancing camera operation excellence",
    img: setting1,
  },
  {
    name: "GBCT",
    description:
      "The Guild of British Camera Technicians - Setting professional standards for camera",
    img: setting2,
  },
  {
    name: "GTC",
    description:
      "The Guild of Television Camera Professionals - Leading television production standards",
    img: setting3,
  },
];

const AMBASSADOR_POINTS = [
  "Mentor and guide camera trainees through their development",
  "Support trainers in delivering standardized education",
  "Maintain industry standards and best practices",
  "Volunteer their time to develop the next generation",
  "Provide ongoing support and career guidance",
  "Bring the camera community together",
];

const WhyItemCard = memo(function WhyItemCard({ item }) {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div className="mb-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-32 h-32 object-contain"
          width={128}
          height={128}
          draggable={false}
        />
      </div>

      <div className="text-5xl font-bold text-[#FAB614] mb-2">
        {item.number}
      </div>

      <h3 className="text-2xl font-bold text-[#FAB614] mb-3">
        {item.title}
      </h3>

      <p className="text-base text-white/80 leading-relaxed">
        {item.description}
      </p>
    </div>
  );
});

const StandardCard = memo(function StandardCard({ org }) {
  return (
    <div
      className="
        bg-gradient-to-br from-[#8B4513]/30 to-[#654321]/30
        rounded-xl
        p-4 md:p-5
        border border-[#FAB614]/20
        flex flex-col items-start
        w-full
        max-w-[320px]
      "
    >
      <img
        src={org.img}
        alt={org.name}
        className="w-full h-auto object-contain mb-4"
        draggable={false}
      />

      <h3 className="text-2xl font-bold text-white mb-2">
        {org.name}
      </h3>

      <p className="text-white/70 text-sm">
        {org.description}
      </p>
    </div>
  );
});

const AmbassadorPoint = memo(function AmbassadorPoint({ text }) {
  return (
    <div className="flex items-start gap-3">
      <img
        src={icon}
        alt="Icon"
        className="w-8 h-8 flex-shrink-0"
        width={32}
        height={32}
        draggable={false}
      />
      <p className="text-lg text-white/90">{text}</p>
    </div>
  );
});

const MiddleSections = () => {
  const [show, setShow] = useState(false);

  const handleOpen = useCallback(() => {
    setShow(true);
  }, []);

  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setShow(true);
    }
  }, []);

  return (
    <>
      {/* Why We Built This */}
      <section className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#FAB614] text-center mb-12">
            Why We Built This
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_ITEMS.map((item) => (
              <WhyItemCard key={item.number} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {show && (
        <Suspense fallback={null}>
          <VideoModal isOpen={show} onClose={handleClose} />
        </Suspense>
      )}

      {/* Video Section */}
      <section className="relative z-10 container mx-auto px-6 py-16">
        <div
          style={{ cursor: "pointer" }}
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Open video"
          className="
            max-w-7xl mx-auto
            rounded-2xl overflow-hidden
            relative
            h-[280px]
            sm:h-[350px]
            md:h-[600px]
          "
        >
          <img
            src={video}
            alt="Video Background"
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            draggable={false}
          />
        </div>
      </section>

      {/* Setting Standards */}
      <section
        id="professional-development"
        className="relative z-10 container mx-auto px-6 py-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#FAB614] mb-6">
              Setting Standards
            </h2>

            <p className="text-xl text-white/90 max-w-4xl mx-auto">
              CINECERTIFIED aims to gradually add all camera department grades to the
              Logbook App framework. We are working in partnership with the ACO, GBCT
              and GTC to ensure that the appropriate training standards are met
              nationally.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {STANDARDS_ITEMS.map((org) => (
              <StandardCard key={org.name} org={org} />
            ))}
          </div>
        </div>
      </section>

      {/* Ambassadors */}
      <section className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12">
          <div className="flex flex-col gap-6 flex-1">
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#FAB614]">
              Who Are Ambassadors?
            </h2>

            <p className="text-2xl text-white leading-relaxed">
              Ambassadors are experienced crew members who volunteer their time to support
              camera crew within the app. They act as guides and can answer questions
              through the Ambassador hub.
            </p>

            <div className="flex flex-col gap-4 mt-4">
              {AMBASSADOR_POINTS.map((text) => (
                <AmbassadorPoint key={text} text={text} />
              ))}
            </div>

            <div className="mt-4 p-6 rounded-xl border border-white/10 bg-[#FAB614]/5 backdrop-blur-sm">
              <div className="flex items-start gap-3 mb-2">
                <div className="mt-1 flex items-center justify-center w-5 h-5 rounded-full border border-[#FAB614] text-[#FAB614]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>

                <p className="text-lg font-medium text-[#FAB614]">
                  Interested in becoming an ambassador?
                </p>
              </div>

              <p className="text-white/60 pl-8">
                If you share our vision and want to help shape the future of training,
                get in touch at{" "}
                <a
                  href="mailto:ambassadors@cinecertified.org"
                  className="text-white/80 underline underline-offset-4 hover:text-[#FAB614] transition-colors"
                >
                  ambassadors@cinecertified.org
                </a>
              </p>
            </div>
          </div>

          <div className="relative flex-shrink-0 w-full lg:w-auto flex justify-center">
            <img
              src={amb}
              alt="Ambassadors"
              className="
                w-[60%]
                sm:w-[70%]
                lg:w-[500px]
                h-auto
              "
              draggable={false}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(MiddleSections);