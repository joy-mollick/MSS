import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/HomePage/Footer';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FAB614] selection:text-black font-sans flex flex-col">
      {/* Background decoration */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[1000px] h-[450px] bg-[#E5970C]/20 blur-[100px] rounded-full" />
        </div>
      <Navbar />

      <div className="flex-grow container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#FAB614] uppercase tracking-wider mb-8">
              Privacy Policy
            </h1>
          </div>

          {/* Privacy Content */}
          <div className="text-gray-300 space-y-6 leading-relaxed text-lg">
            
            <p>
              This Privacy Policy applies between you, the Use of this Website, and CineCertified, the owner and provider of this Website. CineCertified takes the privacy of your information very seriously. This Privacy Policy applies to our use of any and all Data collected by us or provided by you in relation to your use of the Website.
            </p>

            <p className="font-semibold text-white">Please read this Privacy Policy carefully.</p>

            {/* Definitions */}
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Definitions and Interpretations</h2>
            
            <p>1. In this Privacy Policy, the following definitions are used:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong className="text-white">Data</strong> – collectively all information that you submit to CineCertified via the Website. This definition incorporates, where applicable, the definitions provided in the Data Protection Laws;</li>
              <li><strong className="text-white">Data Protection Laws</strong> – any applicable law relating to the processing of personal Data, including but not limited to the GDPR, and any national implementing and supplementary laws, regulations and secondary legislation;</li>
              <li><strong className="text-white">GDPR</strong> – the UK General Data Protection Regulation;</li>
              <li><strong className="text-white">User or you</strong> – any third party that accesses the Website and is not either (i) employed by CineCertified and acting in the course of their employment or (ii) engaged as a consultant or otherwise providing services to CineCertified and accessing the Website in connection with the provision of such services; and</li>
              <li><strong className="text-white">Website</strong> – the website that you are currently using, <a href="https://www.cinecertified.org" className="text-[#FAB614] hover:underline">www.cinecertified.org</a>, and any sub-domains of this site unless expressly excluded by their own terms and conditions.</li>
            </ul>

            <p>2. In this Privacy Policy, unless the context requires a different interpretation:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>the singular includes the plural and vice-versa;</li>
              <li>references to sub-clauses, clauses, schedules or appendices are to sub-clauses, clauses, schedules or appendices of this Privacy Policy;</li>
              <li>a reference to a person includes firms, companies, government entities, trusts and partnerships;</li>
              <li>“including” is understood to mean “including without limitation”;</li>
              <li>reference to any statutory provision includes any modification or amendment of it;</li>
              <li>the headings and sub-headings do not form part of this Privacy Policy.</li>
            </ul>

            {/* Scope */}
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Scope of this Privacy Policy</h2>
            <p>
              3. This Privacy Policy applies only to the actions of CineCertified and Users with respect to this Website. It does not extend to any websites that can be accessed from this Website including, but not limited to, any links we may provide to social media websites.
            </p>
            <p>
              4. For purposes of the applicable Data Protection Laws, CineCertified is the “data controller”. This means that CineCertified determines the purposes for which, and the manner in which, your Data is processed.
            </p>

            {/* Data Collected */}
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Data Collected</h2>
            <p>5. We may collect the following Data, which includes personal Data, from you:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>name;</li>
              <li>date of birth;</li>
              <li>gender;</li>
              <li>job title;</li>
              <li>contact information such as email addresses and telephone numbers;</li>
              <li>demographic information such as postcode, preferences and interests;</li>
              <li>in each case, in accordance with this Privacy Policy.</li>
            </ul>

            {/* How We Collect Data */}
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">How We Collect Data</h2>
            <p>6. We collect Data in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>data is given to us by you; and</li>
              <li>data is collected automatically.</li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-6 mb-2">Data That is Given to Us by You</h3>
            <p>7. CineCertified will collect your Data in a number of ways, for example:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>when you contact us through the Website, by telephone, post, e-mail or through any other means;</li>
              <li>in each case, in accordance with this Privacy Policy.</li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-6 mb-2">Data That is Collected Automatically</h3>
            <p>8. To the extent that you access the Website, we will collect your Data automatically, for example:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>we automatically collect some information about your visit to the Website. This information helps us to make improvements to Website content and navigation, and includes your IP address, the date, times and frequency with which you access the Website and the way you use and interact with its content.</li>
            </ul>

            {/* Keeping Data Secure */}
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Keeping Data Secure</h2>
            <p>9. We will use technical and organisational measures to safeguard your Data, for example:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>access to your account is controlled by a password and a user name that is unique to you.</li>
              <li>we store your Data on secure servers.</li>
            </ul>
            <p>
              10. Technical and organisational measures to deal with any suspected data breach. If you suspect any misuse or loss of unauthorised access to your Data, please let us know immediately by contacting us via this e-mail address: <a href="mailto:info@cinecertified.org" className="text-[#FAB614] hover:underline">info@cinecertified.org</a>.
            </p>
            <p>
              11. If you want detailed information from Get Safe Online on how to protect your information and your computers and devices against fraud, identity theft, viruses and many other online problems, please visit <a href="https://www.getsafeonline.org" target="_blank" rel="noopener noreferrer" className="text-[#FAB614] hover:underline">www.getsafeonline.org</a>. Get Safe Online is supported by HM Government and leading businesses.
            </p>

            {/* Data Retention */}
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Data Retention</h2>
            <p>
              12. Unless a longer retention period is required or permitted by law, we will only hold your Data on our systems for the period necessary to fulfil the purposes outlined in this Privacy Policy or until you request that the Data be deleted.
            </p>
            <p>
              13. Even if we delete your Data, it may persist on backup or archival media for legal, tax or regulatory purposes.
            </p>

            {/* Your Rights */}
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Your Rights</h2>
            <p>14. You have the following rights in relation to your Data:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong className="text-white">Right to access</strong> – the right to request (i) copies of the information we hold about you at any time, or (ii) that we modify, update or delete such information. If we provide you with access to the information we hold about you, we will not charge you for this, unless your request is “manifestly unfounded or excessive.” Where we are legally permitted to do so, we may refuse your request. If we refuse your request, we will tell you the reasons why.</li>
              <li><strong className="text-white">Right to correct</strong> – the right to have your Data rectified if it is inaccurate or incomplete.</li>
              <li><strong className="text-white">Right to erase</strong> – the right to request that we delete or remove your Data from our systems.</li>
              <li><strong className="text-white">Right to restrict our use of your Data</strong> – the right to “block” us from using your Data or limit the way in which we can use it.</li>
              <li><strong className="text-white">Right to data portability</strong> – the right to request that we move, copy or transfer your Data.</li>
              <li><strong className="text-white">Right to object</strong> – the right to object to our use of your Data including where we use it for our legitimate interests.</li>
            </ul>

            <p>
              15. To make enquiries, exercise any of your rights set out above, or withdraw your consent to the processing of your Data (where consent is our legal basis for processing your Data), please contact us via this e-mail address: <a href="mailto:info@cinecertified.org" className="text-[#FAB614] hover:underline">info@cinecertified.org</a>.
            </p>
            <p>
              16. If you are not satisfied with the way a complaint you make in relation to your Data is handled by us, you may be able to refer your complaint to the relevant data protection authority. For the UK, this is the Information Commissioner’s Office (ICO). The ICO’s contact details can be found on their website at <a href="https://ico.org.uk/" target="_blank" rel="noopener noreferrer" className="text-[#FAB614] hover:underline">https://ico.org.uk/</a>.
            </p>
            <p>
              17. It is important that the Data we hold about you is accurate and current. Please keep us informed if your Data changes during the period for which we hold it.
            </p>

            {/* Links to Other Websites */}
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Links to Other Websites</h2>
            <p>
              18. This Website may, from time to time, provide links to other websites. We have no control over such websites and are not responsible for the content of these websites. This Privacy Policy does not extend to your use of such websites. You are advised to read the Privacy Policy or statement of other websites prior to using them.
            </p>

            {/* Changes of Business Ownership and Control */}
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Changes of Business Ownership and Control</h2>
            <p>
              19. CineCertified may, from time to time, expand or reduce our business and this may involve the sale and/or the transfer of control of all or part of CineCertified. Data provided by Users will, where it is relevant to any part of our business so transferred, be transferred along with that part and the new owner or newly controlling party will, under the terms of this Privacy Policy, be permitted to use the Data for the purposes for which it was originally supplied to us.
            </p>
            <p>
              20. We may also disclose Data to a prospective purchaser of our business or any part of it.
            </p>
            <p>
              21. In the above instances, we will take steps with the aim of ensuring your privacy is protected.
            </p>

            {/* General */}
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">General</h2>
            <p>
              22. You may not transfer any of your rights under this Privacy Policy to any other person. We may transfer our rights under this Privacy Policy where we reasonably believe your rights will not be affected.
            </p>
            <p>
              23. If any court of competent authority finds that any provision of this Privacy Policy (or part of any provision) is invalid, illegal or unenforceable, that provision or part-provision will, to the extent required, be deemed to be deleted, and the validity and enforceability of the other provisions of this Privacy Policy will not be affected.
            </p>
            <p>
              24. Unless otherwise agreed, no delay, act or omission by a party in exercising any right or remedy will be deemed a waiver of that, or any other, right or remedy.
            </p>
            <p>
              25. This Agreement will be governed by and interpreted according to the law of England and Wales. All disputes arising under the Agreement will be subject to the exclusive jurisdiction of the English and Welsh courts.
            </p>

            {/* Changes to This Privacy Policy */}
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>
              26. CineCertified reserves the right to change this Privacy Policy as we may deem necessary from time to time or as may be required by law. Any changes will be immediately posted on the Website and you are deemed to have accepted the terms of the Privacy Policy on your first use of the Website following the alterations.
            </p>
            <p className="mt-4">
              You may contact CineCertified by email at <a href="mailto:info@cinecertified.org" className="text-[#FAB614] hover:underline">info@cinecertified.org</a>
            </p>

            {/* Attribution */}
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Attribution</h2>
            <p>
              27. This Privacy Policy was created on 25 September 2024.
            </p>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPage;