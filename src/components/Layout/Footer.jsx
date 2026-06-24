import React from "react";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="siteFooter">
      <div className="nwlbContainer footerGrid">
        <div>
          <img className="footerLogo" src="/assets/logo-white.png" alt="NWLB" />
          <p className="footerText">
            North West Local Business helps people find local services,
            independent businesses, reviews, offers and trusted contacts.
          </p>

          <div className="footerSocials">
            <span>
              <Facebook size={18} />
            </span>
            <span>
              <Instagram size={18} />
            </span>
            <span>
              <Linkedin size={18} />
            </span>
          </div>
        </div>

        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/favourites">Favourite</Link>
          <Link to="/news">Learn</Link>
          <Link to="/login">Join</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div>
          <h4>Legal</h4>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-conditions">Terms & Conditions</Link>
        </div>

        <div>
          <h4>Contact</h4>

          <p className="footerContact">
            <Mail size={16} />
            northwestlocalbusiness@gmail.com
          </p>

          <p className="footerContact">
            <Phone size={16} />
            0780125028
          </p>

          <p className="footerContact">
            <MapPin size={16} />
            North West, United Kingdom
          </p>
        </div>
      </div>

      <div className="footerBottom">
        © {new Date().getFullYear()} North West Local Business. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;