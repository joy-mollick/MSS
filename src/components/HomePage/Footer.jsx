import bg2 from '@/assets/bg3.avif';
import blackLogo from '@/assets/black-logo.png';
import appstore from '@/assets/appstore.png';
import playstore from '@/assets/playstore.png';

import { Mail, Instagram, Linkedin, Facebook, Twitter, Youtube } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const footerNavMap = {
    Home: { section: null },
    About: { section: 'about' },
    'Professional Development': { section: 'FirstAid' },
    'Ancillary Learning': { section: 'learn' },
    Patrons: { section: 'patrons' },
    News: { section: 'news' },
    FAQ: { section: 'faq' },
  };

  const handleNavigation = (item) => {
    const config = footerNavMap[item];
    if (!config) return;

    if (item === 'Home') {
      navigate('/', { state: { active: 'Home' } });
      window.scrollTo(0, 0);
      return;
    }

    navigate('/', {
      state: {
        active: item,
        scrollTo: config.section,
      },
    });
  };

  return (
    <footer
      className="pb-8 relative mt-20 text-black overflow-hidden"
      style={{
        backgroundImage: `url(${bg2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <img src={blackLogo} alt="CineCertified Logo" className="h-10 w-50 object-contain" />
            <p className="text-lg">
              CineCertified is supported by a large number of industry bodies and freelance professionals
            </p>

            <div className="flex gap-4">
              <a
                href="https://apps.apple.com/gb/app/cinecertified/id6754809670"
                target="_blank"
                rel="noopener noreferrer"
                className="w-40"
              >
                <img src={appstore} alt="Apple App Store" />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.cine_certified"
                target="_blank"
                rel="noopener noreferrer"
                className="w-40"
              >
                <img src={playstore} alt="Google Play Store" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold">CineCertified</h3>
            <nav className="flex flex-col gap-2">
              {Object.keys(footerNavMap).map((link) => (
                <button
                  key={link}
                  onClick={() => handleNavigation(link)}
                  className="hover:underline flex items-center gap-2 text-left"
                >
                  <span>→</span> {link}
                </button>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold">Support</h3>
            <Link to="/privacypolicy" className="hover:underline flex items-center gap-2">
              <span>→</span> Privacy Policy
            </Link>
            <Link to="/termsandconditions" className="hover:underline flex items-center gap-2">
              <span>→</span> Terms & Conditions
            </Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold">Contact</h3>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-black/80 flex items-center justify-center">
                <Mail className="text-[#FAB614] w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold">Information</h4>
                <a
                  href="mailto:info@cinecertified.org"
                  className="text-sm hover:text-[#FAB614]"
                >
                  info@cinecertified.org
                </a>
              </div>
            </div>

            <div className="flex gap-3 mt-2">
              <a href="https://www.instagram.com/cinecertified/?hl=en" target="_blank" rel="noreferrer" className="social">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/in/cinecertified-cic-ab1585311/?originalSubdomain=uk" target="_blank" rel="noreferrer" className="social">
                <Linkedin size={18} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61578410152396" target="_blank" rel="noreferrer" className="social">
                <Facebook size={18} />
              </a>
              <a href="https://www.youtube.com/@CineCertified" target="_blank" rel="noreferrer" className="social">
                <Youtube size={18} />
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-black py-4 text-center text-white">
        <p className="text-sm">Copyright © 2026 | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
