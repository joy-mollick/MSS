// ========================= Before return =========================

import React, { useState } from "react";
import {
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
} from "lucide-react";
import AppDownloadStrip from "../components/common/AppDownloadStrip";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submitContact = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Please fill name, email and message.");
      return;
    }

    setSent(true);

    setTimeout(() => {
      setSent(false);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1800);
  };

  return (
    // ========================= Inside return =========================

    <div className="contactPage">
      <section className="contactHero">
        <div className="contactHeroOverlay" />

        <div className="nwlbContainer contactHeroContent">
          <p>WE ARE HERE TO HELP</p>
          <h1>Contact Us</h1>
          <span>
            Have a question about listings, reviews, jackpot, or local business
            promotion? Send us a message.
          </span>
        </div>
      </section>

      <section className="contactFormSection">
        <div className="nwlbContainer contactGrid">
          <div className="contactInfoPanel">
            <h2>Get in touch</h2>

            <p>
              NWLB connects people with trusted local businesses across the
              North West. Our team will get back to you as soon as possible.
            </p>

            <div className="contactInfoItem">
              <span>
                <Mail size={22} />
              </span>

              <div>
                <h3>Email</h3>
                <a href="mailto:northwestlocalbusiness@gmail.com">
                  northwestlocalbusiness@gmail.com
                </a>
              </div>
            </div>

            <div className="contactInfoItem">
              <span>
                <Phone size={22} />
              </span>

              <div>
                <h3>Phone</h3>
                <a href="tel:0780125028">0780125028</a>
              </div>
            </div>

            <div className="contactInfoItem">
              <span>
                <MapPin size={22} />
              </span>

              <div>
                <h3>Location</h3>
                <p>North West, United Kingdom</p>
              </div>
            </div>
          </div>

          <div className="contactFormCard">
            <div className="contactFormHead">
              <span>
                <Send size={24} />
              </span>

              <div>
                <h2>Send Message</h2>
                <p>Fill the form below and we will contact you.</p>
              </div>
            </div>

            <label>
              <User size={18} />
              <input
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Your Name"
              />
            </label>

            <label>
              <Mail size={18} />
              <input
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="Your Email"
              />
            </label>

            <input
              className="contactSubjectInput"
              value={form.subject}
              onChange={(e) => updateField("subject", e.target.value)}
              placeholder="Subject"
            />

            <textarea
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              placeholder="Write your message..."
            />

            <button onClick={submitContact}>SEND MESSAGE</button>
          </div>
        </div>
      </section>

      <AppDownloadStrip />

      {sent && (
        <div className="quoteSuccessOverlay">
          <div className="quoteSuccessBox">
            <CheckCircle2 size={54} />
            <h2>Message Sent</h2>
            <p>Firebase/email service will be connected later.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;