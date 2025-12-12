

import bg2 from '@/assets/bg3.avif';
import blackLogo from '@/assets/black-logo.png';

import appstore from '@/assets/appstore.png';
import playstore from '@/assets/playstore.png';
import { Mail, Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    // Map footer nav items to their routes and section IDs
    const footerNavMap = {
        'Home': { path: '/', section: null },
        'About': { path: '/', section: 'about' },
        'Ambassador': { path: '/', section: null },
        'Learning': { path: '/ancillary-learning', section: null },
        'Patrons': { path: '/patrons', section: null },
        'FAQ': { path: '/faq', section: null }
    };

    // Handle navigation with section scrolling
    const handleNavigation = (item) => {
        const config = footerNavMap[item];
        if (!config) return;

        const { path, section } = config;
        
        if (section) {
            // If we're already on the home page, just scroll to the section
            if (window.location.pathname === '/' || window.location.pathname === '/CineCertifiedWebsite/') {
                const element = document.getElementById(section);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Navigate to home and then scroll to section
                navigate(path);
                setTimeout(() => {
                    const element = document.getElementById(section);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        } else if (item === 'Home') {
            // Home scrolls to top
            navigate(path);
            window.scrollTo(0, 0);
        } else {
            navigate(path);
        }
    };

    return (
        <footer className="pb-8 relative mt-20 text-black overflow-hidden" style={{ backgroundImage: `url(${bg2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div className="flex flex-col gap-4">
                        <img src={blackLogo} alt="CineCertified Logo" className="h-10 w-50 object-contain" />
                        <p className="text-lg">
                            CineCertified is supported by a large number of industry bodies and freelance professionals
                        </p>
                        <div className="flex gap-4">
                            <div className="w-40 flex items-center justify-center">
                                <a href="https://apps.apple.com/gb/app/cinecertified/id6754809670" target="_blank" rel="noopener noreferrer"><img src={appstore} alt="Apple App Store" /></a>
                            </div>
                            <div className="w-40 flex items-center justify-center">
                                <a href="https://play.google.com/store/apps/details?id=com.cine_certified" target="_blank" rel="noopener noreferrer"><img src={playstore} alt="Google Play Store" /></a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-2xl font-semibold">CineCertified</h3>
                        <nav className="flex flex-col gap-2">
                            {['Home', 'About', 'Ambassador', 'Learning', 'Patrons', 'FAQ'].map((link) => (
                                <button 
                                    key={link} 
                                    onClick={() => handleNavigation(link)}
                                    className="hover:underline flex items-center gap-2 text-left cursor-pointer"
                                >
                                    <span>→</span> {link}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-2xl font-semibold">Support</h3>
                        <nav className="flex flex-col gap-2">
                            <Link to="/privacypolicy" className="hover:underline flex items-center gap-2">
                                <span>→</span> Privacy Policy
                            </Link>
                            <Link to="/termsandconditions" className="hover:underline flex items-center gap-2">
                                <span>→</span> Terms & Conditions
                            </Link>
                        </nav>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-2xl font-semibold">Contact</h3>

                        {/* Email Section */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-black/80 flex items-center justify-center shrink-0">
                                <Mail className="text-[#FAB614] w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold leading-tight">Information</h4>
                                <a href="mailto:Info@CineCertified.co.uk" className="text-sm hover:text-[#FAB614] transition-colors">
                                    Info@CineCertified.co.uk
                                </a>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-3 mt-2">
                            {[Instagram, Linkedin, Facebook, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-black/80 flex items-center justify-center text-[#FAB614] hover:bg-[#FAB614] hover:text-black transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            <div className="mx-auto bg-black py-4 border-t border-black/20 text-center text-white">
                <p className="text-sm">Copyright © 2025 | All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;