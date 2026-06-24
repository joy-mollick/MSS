// ========================= Before return =========================

import React from "react";
import { ShieldCheck } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    // ========================= Inside return =========================

    <div className="legalPage">
      <section className="legalHero">
        <div className="nwlbContainer legalHeroContent">
          <span>
            <ShieldCheck size={18} />
            NWLB LEGAL
          </span>

          <h1>Privacy Policy</h1>

          <p>Last updated: December 15, 2023</p>
        </div>
      </section>

      <section className="legalBodySection">
        <div className="nwlbContainer legalCard">
          <h2>Privacy Policy for NWLB</h2>

          <p>
            This Privacy Policy describes our policies and procedures on the
            collection, use and disclosure of your information when you use the
            service. It also explains your privacy rights and how the law
            protects you.
          </p>

          <p>
            We use personal data to provide and improve the service. By using
            the service, you agree to the collection and use of information in
            accordance with this Privacy Policy.
          </p>

          <h3>Information We Collect</h3>

          <p>
            While using our service, we may ask you to provide certain
            personally identifiable information that can be used to contact or
            identify you. Usage data may also be collected automatically.
          </p>

          <p>
            Usage data may include your device&apos;s IP address, browser type,
            browser version, pages visited, time and date of visit, time spent
            on pages, unique device identifiers and other diagnostic data.
          </p>

          <h3>Information Collected While Using the Application</h3>

          <p>
            With your prior permission, the application may collect pictures and
            other information from your device&apos;s camera and photo library.
            This information is used to provide features of the service, improve
            the service and customise the user experience.
          </p>

          <h3>How We Use Your Personal Data</h3>

          <p>We may use personal data for the following purposes:</p>

          <ul>
            <li>To provide and maintain our service.</li>
            <li>To manage your account and registration.</li>
            <li>To contact you by email, phone, SMS or app notifications.</li>
            <li>
              To provide news, special offers and information about goods,
              services or events.
            </li>
            <li>To manage your requests.</li>
            <li>For business transfers and service improvements.</li>
          </ul>

          <h3>Sharing Your Information</h3>

          <p>
            We may share personal information with service providers, affiliates,
            business partners, other users when you interact in public areas, or
            with your consent.
          </p>

          <h3>Retention of Your Personal Data</h3>

          <p>
            We retain personal data only for as long as necessary for the
            purposes set out in this policy, including legal obligations,
            dispute resolution and enforcement of agreements and policies.
          </p>

          <h3>Delete Your Personal Data</h3>

          <p>
            You have the right to delete or request assistance in deleting the
            personal data we have collected about you. You may update, amend or
            delete your information from your account settings where available,
            or contact us directly.
          </p>

          <h3>Security</h3>

          <p>
            The security of your personal data is important to us. However, no
            method of transmission over the internet or electronic storage is
            100% secure. We strive to use commercially acceptable means to
            protect your information.
          </p>

          <h3>Children&apos;s Privacy</h3>

          <p>
            Our service does not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from anyone
            under the age of 13.
          </p>

          <h3>Links to Other Websites</h3>

          <p>
            Our service may contain links to websites not operated by us. We
            strongly advise you to review the privacy policy of every site you
            visit.
          </p>

          <h3>Changes to This Privacy Policy</h3>

          <p>
            We may update this Privacy Policy from time to time. Changes are
            effective when they are posted on this page.
          </p>

          <h3>Contact Us</h3>

          <p>
            If you have any questions about this Privacy Policy, you can contact
            us by email:
          </p>

          <a
            className="legalEmail"
            href="mailto:northwestlocalbusiness@gmail.com"
          >
            northwestlocalbusiness@gmail.com
          </a>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;