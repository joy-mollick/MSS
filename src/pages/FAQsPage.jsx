import React, { useState } from 'react';
import { Minus, Plus, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/HomePage/Footer';
import icon from '@/assets/icon.png'

import bg from '@/assets/bg.avif';

// Reusable Accordion Item Component
const FAQItem = ({ question, answer, isOpen, onClick, listItems }) => {
    return (
        <div className="border-b border-white/10 last:border-0 py-6 group">
            <button
                onClick={onClick}
                className="w-full flex items-start justify-between text-left gap-4 hover:opacity-80 transition-opacity"
            >
                <h4 className="text-xl md:text-2xl font-medium text-white group-hover:text-[#FAB614] transition-colors">
                    {question}
                </h4>
                <div className="shrink-0 mt-1">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-[#FAB614] text-[#FAB614]' : 'border-white/30 text-white/50'}`}>
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                </div>
            </button>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
            >
                <div className="text-gray-300 text-lg leading-relaxed pr-12">
                    {answer}
                    {listItems && (
                        <ul className="mt-4 space-y-3">
                            {listItems.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-1 shrink-0 text-[#FAB614]">
                                        {/* <CheckCircle2 size={18} /> */}
                                        <img src={icon} alt="Check Icon" width={30} />
                                    </div>
                                    <span className="text-gray-300 text-base">{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

const FAQsPage = () => {
    // State to track which FAQ is open (one per section or global)
    // Using a simplified approach: storing the ID of the open question
    const [openId, setOpenId] = useState(null);

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id);
    };

    // --- DATA ---
    const generalFAQs = [
        {
            id: 'g1',
            question: "What is the CineCertified framework?",
            answer: "A structured training framework for UK camera trainees, based on the SODOTO learning model, peer-reviewed assessments and minimum experience requirements. It promotes self-driven learning and sets a new benchmark for competency in the camera department."
        },
        {
            id: 'g2',
            question: "Why work with the CineCertified framework?",
            answer: "It ensures that all camera trainees meet a consistent and high standard. You will help to shape a better industry and uphold the UK camera crew's strong reputation."
        },
        {
            id: 'g3',
            question: "How does the CineCertified App work?",
            answer: "Watch the induction video to get a good understanding of how the CineCertified Digital Logbook App works."
        },
        {
            id: 'g4',
            question: "What is an \"appropriate level of knowledge\"?",
            answer: "This refers to the standard of understanding that a camera trainee should demonstrate at each stage of learning. Trainees request assessment only after logging the required amount of on-set experience and being tested on their understanding of the Key Learning Points. Trainers are responsible for ensuring that the trainee meets these standards before signing them off."
        },
        {
            id: 'g5',
            question: "How long does it take to complete the Digital Logbook App?",
            answer: "To apply for a final assessment, trainees must complete these minimum requirements:",
            listItems: [
                "Peer-assessed sign off of all camera skills",
                "18 months experience",
                "200 logged working days as a camera trainee",
                "10 days of \"Ancillary Learning\" – at a rental house or alternative",
                "5 references from experienced technicians",
                "Completion of the outlined Professional Development Skills"
            ]
        },
        {
            id: 'g6',
            question: "Is this an official qualification?",
            answer: "No. This is a peer-reviewed record of achievement, demonstrating competency and professionalism, backed by industry professionals. This allows the framework to be free for trainees."
        },
        {
            id: 'g7',
            question: "Does this replace existing camera trainee schemes or camera courses?",
            answer: "No. We always encourage a trainee to choose how they learn best. The logbook is designed to complement any training scheme by tracking progress and promoting self-driven learning."
        }
    ];

    const traineeFAQs = [
        {
            id: 't1',
            question: "What does the CineCertified Digital Logbook App cost?",
            answer: "Nothing. The framework is free for all Camera Trainees. All you have to do is download it and sign up."
        },
        {
            id: 't2',
            question: "I am already a trainee. Can I backlog my experience?",
            answer: "Yes, absolutely! You can backlog all the days you've done on a professional set and start progressing straight away!"
        },
        {
            id: 't3',
            question: "Does CineCertified help me get work?",
            answer: "No, we aren't a diary service and don't provide work. We provide a learning framework for the skills and knowledge you need on a professional set."
        },
        {
            id: 't4',
            question: "Can the same person sign me off for more than one / all camera skills?",
            answer: "No. The twelve camera skills are divided into three stages: \"see\", \"do\" and \"teach\" – each requiring a different signatory. This means that a minimum of three, and a maximum of thirty-six, different people can sign off a trainee on all camera skills. We encourage camera trainees to work with many different people to learn a variety of different working styles."
        },
        {
            id: 't5',
            question: "What if I can't get dedicated time for training on set?",
            answer: "Film sets can be unpredictable. Be proactive: study independently so that you are ready with meaningful questions when time allows. If you feel that you are not being given a fair chance to learn, speak to an ambassador for support."
        },
        {
            id: 't6',
            question: "Does the Final Assessment cost anything?",
            answer: "Of course not! We are striving to make everyone's life easier and strongly believe that one's financial situation shouldn't determine whether a trainee can access knowledge or succeed in their career."
        },
        {
            id: 't7',
            question: "Does this qualify me as a Clapper Loader?",
            answer: "No. The logbook prepares camera trainees to step up into the role through a structured, peer-reviewed framework. We eventually plan to adapt the structure into a Second AC Logbook which will continue training from the Camera Trainee Logbook."
        }
    ];

    const signatoryFAQs = [
        {
            id: 's1',
            question: "I am a Focus Puller/ 2nd AC. How Can we get involved?",
            answer: "You can sign up to be a signatory or an ambassador or both. Learn how you can help your trainees to learn and progress."
        },
        {
            id: 's2',
            question: "What does an Ambassador do?",
            answer: "Ambassadors are experienced crew members who volunteer their time to support camera trainees within the app. They act as guides and can answer questions through the Ambassador hub."
        },
        {
            id: 's3',
            question: "What does a Signatory do?",
            answer: "A Signatory is an appropriately skilled crew member (2nd AC or Focus Puller), who supervises trainees learning on set and tests them on skills before signing them off."
        },
        {
            id: 's4',
            question: "Can you sign off a camera trainee who you only work with briefly?",
            answer: "Yes – you can sign off any trainee as long as you are confident that they have reached the required learning standard. Any signatory must adhere to the rules of conduct outlined in the \"Declaration for Signatories\", which is displayed when sign-off is requested."
        },
        {
            id: 's5',
            question: "What if I don't have time to assess a trainee's abilities?",
            answer: "Don't sign them off. Work together to find a better time where you can assess them properly. Signing off a trainee means that you vouch for their ability; misrepresentation of this undermines the CineCertified framework."
        },
        {
            id: 's6',
            question: "What is the Camera Trainee Database?",
            answer: "The Trainee Database lists all the UK camera trainees using the CineCertified framework. Professional crews can use it to find recommendations and crew their next job."
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-[#FAB614] selection:text-black">
            {/* Background decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[1000px] h-[450px] bg-[#E5970C]/20 blur-[100px] rounded-full" />
        </div>
            <Navbar selectedMenu="FAQ" />

            {/* Hero / Header */}
            <div className="pt-32 pb-12 text-center container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#FAB614] text-center mb-6">
                    Frequently Asked Questions
                </h2>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                    Everything you need to know about the CineCertified framework, the App, and how to get involved.
                </p>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 pb-12 max-w-6xl space-y-24">

                {/* SECTION 1: GENERAL (DO YOU HAVE MORE QUESTIONS?) */}
                <section>
                    <h2 className="text-3xl font-bold text-[#FAB614] mb-8 border-b border-[#FAB614]/20 pb-4 inline-block">
                        DO YOU HAVE MORE QUESTIONS?
                    </h2>
                    <div className="bg-[#111] rounded-2xl p-6 md:p-10 border border-white/5 shadow-2xl">
                        {generalFAQs.map((faq) => (
                            <FAQItem
                                key={faq.id}
                                {...faq}
                                isOpen={openId === faq.id}
                                onClick={() => toggleFAQ(faq.id)}
                            />
                        ))}
                    </div>
                </section>


                {/* SECTION 2: FOR SIGNATORIES */}
                <section>
                    <h2 className="text-3xl font-bold text-[#FAB614] mb-8 border-b border-[#FAB614]/20 pb-4 inline-block">
                        FOR SIGNATORIES
                    </h2>
                    <div className="bg-white/5 rounded-2xl p-6 md:p-10 border border-white/5 shadow-2xl">
                        <div className="mb-6 text-[#FAB614] font-semibold text-sm uppercase tracking-widest">
                            Focus Puller / Clapper Loader
                        </div>
                        {signatoryFAQs.map((faq) => (
                            <FAQItem
                                key={faq.id}
                                {...faq}
                                isOpen={openId === faq.id}
                                onClick={() => toggleFAQ(faq.id)}
                            />
                        ))}
                    </div>
                </section>

                {/* SECTION 3: FOR TRAINEES */}
                <section>
                    <h2 className="text-3xl font-bold text-[#FAB614] mb-8 border-b border-[#FAB614]/20 pb-4 inline-block">
                        FOR TRAINEES
                    </h2>
                    <div className="bg-[#111] rounded-2xl p-6 md:p-10 border border-white/5 shadow-2xl">
                        {traineeFAQs.map((faq) => (
                            <FAQItem
                                key={faq.id}
                                {...faq}
                                isOpen={openId === faq.id}
                                onClick={() => toggleFAQ(faq.id)}
                            />
                        ))}
                    </div>
                </section>

            </div>

            <section className="relative z-10 container max-w-6xl mx-auto px-6 py-16" >
                <div className="max-w-7xl mx-auto rounded-2xl border-2 border-[#FAB614] overflow-hidden relative py-20" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="relative z-10 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#FAB614] mb-8">
                            Still Have More Questions?
                        </h2>
                        <p className='text-gray-300 text-lg leading-relaxed  mb-8'>
                            Can't find what you're looking for? Send us your question and help us improve our FAQ section. <br /> Your questions help us understand what we need to be clearer on answering.
                        </p>
                        <div className="flex justify-center items-center">
                            <button className="bg-gradient-to-r from-[#FAB614] to-[#E5970C] text-black font-bold text-md h-14 px-8 rounded-full shadow-[0_0_20px_rgba(229,151,12,0.3)] flex items-center gap-3 cursor-pointer hover:shadow-[0_0_30px_rgba(229,151,12,0.5)] transition-shadow">
                                <Mail />
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default FAQsPage;