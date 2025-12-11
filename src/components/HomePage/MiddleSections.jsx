
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, Play } from "lucide-react";
import setting1 from '@/assets/setting1.png';
import setting2 from '@/assets/setting2.png';
import setting3 from '@/assets/setting3.png';
import why1 from '@/assets/why1.png';
import why2 from '@/assets/why2.png';
import why3 from '@/assets/why3.png';
import why4 from '@/assets/why4.png';
import icon from '@/assets/icon.png';
import amb from '@/assets/amb.png';
import video from '@/assets/video.png';

// Why We Built, Video, Standards, Ambassadors Component
const MiddleSections = () => {
    return (
        <>

            {/* Why We Built This */}
            <section className="relative z-10 container mx-auto px-6 py-16">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#FAB614] text-center mb-12">
                        Why We Built This
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                image: why1,
                                number: '01',
                                title: 'Breakdown of Skills',
                                description: 'We have deconstructed the role of the camera trainee into twelve distinct Camera Skills'
                            },
                            {
                                image: why2,
                                number: '02',
                                title: 'Peer-Assessed Logbook',
                                description: 'Senior camera crew sign off a trainee\'s progress at distinct stages throughout their training'
                            },
                            {
                                image: why3,
                                number: '03',
                                title: 'Industry Support',
                                description: 'The framework helps camera trainees know what questions to ask, as well as aid trainers to understand what guidance to offer'
                            },
                            {
                                image: why4,
                                number: '04',
                                title: 'Future Focus',
                                description: 'Once the logbook has been completed, the trainee undertakes a final assessment and becomes CINECERTIFIED'
                            }
                        ].map((item) => (
                            <div key={item.number} className="flex flex-col items-center text-center gap-2">
                                {/* Image Icon Section */}
                                <div className="mb-4">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-32 h-32 object-contain"
                                    />
                                </div>

                                {/* Number Section */}
                                <div className="text-5xl font-bold text-[#FAB614] mb-2">
                                    {item.number}
                                </div>

                                {/* Title Section */}
                                <h3 className="text-2xl font-bold text-[#FAB614] mb-3">
                                    {item.title}
                                </h3>

                                {/* Description Section */}
                                <p className="text-base text-white/80 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="relative z-10 container mx-auto px-6 py-16">
                <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden relative h-[500px] md:h-[600px]">
                    <img
                        src={video}
                        alt="Video Background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* Setting Standards */}
            <section id="professional-development" className="relative z-10 container mx-auto px-6 py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#FAB614] mb-6">
                            Setting Standards
                        </h2>
                        <p className="text-xl text-white/90 max-w-4xl mx-auto">
                            CINECERTIFIED aims to gradually add all camera department grades to the Logbook App framework. We are working in partnership with the ACO, GBCT and GTC to ensure that the appropriate training standards are met nationally.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'ACO', description: 'Association of Camera Operators - Advancing camera operation excellence', img: setting1 },
                            { name: 'GBCT', description: 'The Guild of British Camera Technicians - Setting professional standards for camera', img: setting2 },
                            { name: 'GTC', description: 'The Guild of Television Camera Professionals - Leading television production standards', img: setting3 }
                        ].map((org) => (
                            <div key={org.name} className="bg-gradient-to-br from-[#8B4513]/30 to-[#654321]/30 rounded-xl p-6 border border-[#FAB614]/20">
                                <img src={org.img} alt={org.name} />
                                <h3 className="text-2xl font-bold text-white my-2">{org.name}</h3>
                                <p className="text-white/70">{org.description}</p>
                            </div>
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
                            Ambassadors are experienced crew members who volunteer their time to support camera crew within the app. They act as guides and can answer questions through the Ambassador hub.
                        </p>

                        <div className="flex flex-col gap-4 mt-4">
                            {[
                                'Mentor and guide camera trainees through their development',
                                'Support trainers in delivering standardized education',
                                'Maintain industry standards and best practices',
                                'Volunteer their time to develop the next generation',
                                'Provide ongoing support and career guidance',
                                'Bring the camera community together'
                            ].map((text) => (
                                <div key={text} className="flex items-start gap-3">
                                    <img src={icon} alt="Icon" className="w-8 h-8" />
                                    <p className="text-lg text-white/90">{text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 p-6 rounded-xl border border-white/10 bg-[#FAB614]/5 backdrop-blur-sm">
                            <div className="flex items-start gap-3 mb-2">
                                {/* Icon: Circle with Chevron */}
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

                                {/* Heading */}
                                <p className="text-lg font-medium text-[#FAB614]">
                                    Interested in becoming an ambassador?
                                </p>
                            </div>

                            {/* Body Text */}
                            <p className="text-white/60 pl-8">
                                If you share our vision and want to help shape the future of training, get in touch at{' '}
                                <a
                                    href="mailto:ambassadors@cinecertified.org"
                                    className="text-white/80 underline underline-offset-4 hover:text-[#FAB614] transition-colors"
                                >
                                    ambassadors@cinecertified.org
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="relative flex-shrink-0 w-full lg:w-auto">
                        <img
                            src={amb}
                            alt="Ambassadors"
                            className="w-full lg:w-[500px] h-auto"
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default MiddleSections;  