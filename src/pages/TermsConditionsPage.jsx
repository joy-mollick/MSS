// ========================= Before return =========================

import React from "react";
import { BadgePoundSterling } from "lucide-react";

const TermsConditionsPage = () => {
  return (
    // ========================= Inside return =========================

    <div className="legalPage">
      <section className="legalHero termsHero">
        <div className="nwlbContainer legalHeroContent">
          <span>
            <BadgePoundSterling size={18} />
            NWLB PRIZE DRAW
          </span>

          <h1>Terms & Conditions</h1>

          <p>Updated: Dec 23 - Vs1.0</p>
        </div>
      </section>

      <section className="legalBodySection">
        <div className="nwlbContainer legalCard">
          <h2>Free Prize Draw Terms And Conditions</h2>

          <p>
            The prize draw will commence shortly. By participating in the prize
            draw, you agree to these terms and conditions. The prize draw is
            administered by North West Local Business LTD.
          </p>

          <h3>Eligibility</h3>

          <ul>
            <li>Participants must be 18 years old or above.</li>
            <li>Only one entry per person is allowed.</li>
            <li>
              Apple and Google are not involved in any way with the contest or
              sweepstakes.
            </li>
          </ul>

          <h3>The Prize</h3>

          <p>
            This is a cash prize draw funded by local businesses advertising
            with us. The prize fund may vary monthly. Winners will be chosen
            randomly.
          </p>

          <p>
            Announcements of prize amounts and draw dates will be made on our
            app, website and official social media channels.
          </p>

          <h3>How to Enter</h3>

          <p>
            Entry to the prize draw requires downloading our app. Your email
            address will serve as your single entry and will enable you to
            participate in each monthly draw.
          </p>

          <p>
            Monthly email notifications may be sent to you, supporting our local
            businesses through email marketing initiatives.
          </p>

          <h3>Draw Date Announcements</h3>

          <p>Draw dates will be announced on:</p>

          <ul>
            <li>Our App: North West Local Business</li>
            <li>Website: www.Northwestlocalbusiness.co.uk</li>
            <li>Facebook: Northwest Local Business, Bargain Bay Liverpool/Merseyside</li>
            <li>
              Instagram: Liverpool Local Business, Manchester Local Business,
              Cheshire Local Business, Halton Local Business, Wirral Local
              Business, Lancashire Local Business
            </li>
            <li>YouTube Channel: Northwest Local Business</li>
            <li>TikTok: Northwest Local Business</li>
          </ul>

          <h3>Winner Announcement</h3>

          <p>
            Winners will receive immediate notification via the provided email.
            We will make up to three attempts to contact the winner via email.
          </p>

          <p>
            Monthly winners will be updated on our app. Prize funds will be held
            for a maximum of 180 days from the draw date, pending the
            winner&apos;s contact via the provided email address.
          </p>

          <p>
            Please regularly check your email, including your spam folder, for
            communications from us.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsConditionsPage;