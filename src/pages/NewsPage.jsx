import React, { useEffect, useState } from 'react';
import { Mail, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/HomePage/Footer';

import { db } from '../config';
import moment from 'moment';
import { ReadMore } from '../components/ReadMore.jsx';
import { toast } from 'wc-toast';

const NewsPage = () => {
  // Newsletter popup
  // Before useState for showNewsletter
  const [showNewsletter, setShowNewsletter] = useState(() => {
    // Check localStorage, default true if not found
    const stored = localStorage.getItem('newsletterShown');
    return stored ? false : true;
  });

  const [email, setEmail] = useState('');

  // News
  const [showNewsDetails, setShowNewsDetails] = useState(false);
  const [articlesArray, setArticlesArray] = useState([]);

  /* ---------------------------
     Sender Newsletter Handler
  ---------------------------- */
  const [submitting, setSubmitting] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');

  const handleSubscribe = async () => {
    if (!email || !firstName || !surname) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      setSubmitting(true);

      let res= await fetch(
        'https://app-p4r2la7ira-uc.a.run.app/subscribe_newsletter',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            firstName,
            surname,
          }),
        }
      );

      res = await res.json()

      console.log('Res....',res)


      // ✅ success
      setEmail('');
      setFirstName('');
      setSurname('');
      closeNewsletter();
      toast.success('Successfully subscribed! 🎉');

    } catch (err) {
      console.error('Subscribe error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };





  /* ---------------------------
     Fetch News
  ---------------------------- */
  useEffect(() => {
    const subscribe = db
      .ref('News')
      .orderByChild('status')
      .equalTo('Published')
      .on('value', (snap) => {
        if (snap && snap.val()) {
          let arr = Object.values(snap.val());
          arr.sort((a, b) => b.id - a.id);
          setArticlesArray(arr);
        } else {
          setArticlesArray([]);
        }
      });

    return () => db.ref('News').off('value', subscribe);
  }, []);

  async function updateView() {
    await db
      .ref('News')
      .child(String(showNewsDetails.id))
      .update({ view: showNewsDetails.view + 1 });
  }

  useEffect(() => {
    if (showNewsDetails !== false) {
      updateView();
    }
  }, [showNewsDetails]);

  const closeNewsletter = () => {
    setShowNewsletter(false);
    localStorage.setItem('newsletterShown', 'true'); // mark as shown
  };


  return (
    <>
      <wc-toast></wc-toast>
      {/* ================= Newsletter Modal ================= */}
      {showNewsletter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => closeNewsletter()}
          />

          <div className="relative bg-[#151515] w-full max-w-3xl rounded-2xl p-8 md:p-12 border border-[#FAB614]/20 shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => closeNewsletter()}
              className="absolute top-4 right-4 bg-[#FAB614] hover:bg-[#E5970C] text-black rounded-full p-1.5 transition-colors"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            <div className="text-center space-y-4">
              <h2 className="text-4xl font-extrabold text-[#FAB614]">
                News & Updates
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                Stay up to date with the latest updates, insights, and tips—all in
                one place! We'll keep it fresh, relevant, and worth your time.
              </p>

              <div className="py-2 flex items-center justify-center gap-2 text-white/90 font-medium">
                <span>👉</span>
                <span>
                  Want updates straight to your inbox? Don't forget to sign up
                  for our newsletter!
                </span>
                <span>📧</span>
              </div>

              <div className="mt-8 bg-[#1E1E1E] rounded-xl p-6 md:p-8 border border-white/5 text-left">
                <h3 className="text-xl font-bold text-white mb-4">
                  Subscribe to Our Newsletter
                </h3>

                <div className="flex flex-col gap-4">
                  {/* First Name */}
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.currentTarget.value)}
                    type="text"
                    placeholder="First name"
                    className="bg-[#252525] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FAB614] transition-colors"
                  />

                  {/* Surname */}
                  <input
                    value={surname}
                    onChange={(e) => setSurname(e.currentTarget.value)}
                    type="text"
                    placeholder="Surname"
                    className="bg-[#252525] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FAB614] transition-colors"
                  />

                  {/* Email */}
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-[#252525] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FAB614] transition-colors"
                  />

                  <button
                    onClick={handleSubscribe}
                    disabled={submitting}
                    className="bg-[#FAB614] hover:bg-[#E5970C] disabled:opacity-60 text-black font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-[#FAB614]/20 transition-all duration-200"
                  >
                    {submitting ? 'Submitting...' : 'Subscribe Now'}
                  </button>
                </div>


              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= Main Page ================= */}
      <div
        className={`min-h-screen bg-black text-white overflow-x-hidden ${showNewsletter ? 'h-screen overflow-hidden' : ''
          }`}
      >
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[1000px] h-[450px] bg-[#E5970C]/20 blur-[100px] rounded-full" />
        </div>

        <Navbar selectedMenu="News" />

        <section className="relative z-10 container mx-auto px-6 py-16 mt-12">
          <div className="max-w-7xl mx-auto">

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
              <h2 className="text-4xl md:text-5xl font-bold uppercase text-[#FAB614] text-center">
                Latest News
              </h2>

              <button
                onClick={() => setShowNewsletter(true)}
                className="
      group relative inline-flex items-center gap-2
      bg-[#FAB614] text-black font-bold uppercase tracking-wide
      px-6 py-3 rounded-full
      shadow-lg shadow-[#FAB614]/30
      hover:bg-[#E5970C]
      hover:shadow-[#FAB614]/50
      transition-all duration-300
      focus:outline-none
    "
              >
                {/* Glow ring */}
                <span
                  className="
        absolute inset-0 rounded-full
        bg-[#FAB614]/40 blur-md opacity-0
        group-hover:opacity-100
        transition-opacity duration-300
      "
                />

                {/* Content */}
                <span className="relative flex items-center gap-2">
                  <Mail size={18} strokeWidth={2.5} />
                  Subscribe
                </span>
              </button>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {articlesArray.map((article) => (
                <div
                  key={article.title}
                  className="bg-white/5 rounded-xl overflow-hidden border border-[#FAB614]/20 flex flex-col"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-sm text-white/50 mb-2">
                      {article.type} • 3 min read
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {article.title}
                    </h3>

                    <p className="text-white/70 mb-4 flex-grow">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-white/50">
                        {moment(new Date(article.id)).format('DD MMM YYYY')}
                      </span>

                      <button
                        onClick={() => setShowNewsDetails(article)}
                        className="text-[#FAB614] hover:text-[#E5970C] hover:underline font-semibold uppercase text-sm tracking-wide transition-colors"
                      >
                        READ MORE »
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />

        <ReadMore
          article={showNewsDetails === false ? {} : showNewsDetails}
          isOpen={showNewsDetails}
          onClose={() => setShowNewsDetails(false)}
        />
      </div>

      {/* ===== Hidden Sender Form (Required) ===== */}
      {/* Hidden Sender form */}



    </>
  );
};

export default NewsPage;
