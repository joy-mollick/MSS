// ========================= Before return =========================

import React, { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Facebook,
  Globe,
  Heart,
  Instagram,
  Linkedin,
  MapPin,
  MessageSquareText,
  MoreHorizontal,
  Phone,
  Send,
  Star,
  Youtube,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AppDownloadStrip from "../components/common/AppDownloadStrip";
import Stars from "../components/common/Stars";
import { listingDetailsData, mockReviews } from "../data/mockData";

const ListingDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const listing = listingDetailsData[id] || listingDetailsData["stf-electrical"];

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [copied, setCopied] = useState(false);

  const reviewStats = useMemo(() => {
    return {
      total: mockReviews.length,
      five: "100%",
      four: "0%",
      three: "0%",
      two: "0%",
      one: "0%",
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(listing.fullAddress);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabPress = (tab) => {
    if (tab === "call") {
      window.location.href = `tel:${listing.phone}`;
      return;
    }

    if (tab === "quote") {
      navigate(`/quote/${listing.id}`);
      return;
    }

    if (tab === "website") {
      window.open(listing.website, "_blank");
      return;
    }

    setActiveTab(tab);
  };

  const submitReview = () => {
    if (!reviewEmail.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!reviewMessage.trim()) {
      alert("Please write your review.");
      return;
    }

    if (!selectedRating) {
      alert("Please select rating.");
      return;
    }

    if (verifiedEmail !== reviewEmail.trim()) {
      setShowVerifyModal(true);
      return;
    }

    alert("Review submitted successfully. Firebase will be connected later.");
    setReviewMessage("");
    setSelectedRating(0);
  };

  const verifyOtp = () => {
    if (otp.trim().length < 4) {
      alert("Please enter verification code.");
      return;
    }

    setVerifiedEmail(reviewEmail.trim());
    setShowVerifyModal(false);
    setOtp("");
    alert("Email verified. Now press submit again.");
  };

  return (
    // ========================= Inside return =========================

    <div className="listingDetailsPage">
      {/* ================= Hero ================= */}
      <section
        className="listingHero"
        style={{
          backgroundImage: `url(${listing.cover})`,
        }}
      >
        <div className="listingHeroOverlay" />

        <div className="nwlbContainer listingHeroContent">
          <button className="detailsBackBtn" onClick={() => navigate(-1)}>
            <ArrowLeft size={17} />
            Back
          </button>

          <div className="listingHeroGrid">
            <div>
              <h1>NWLB</h1>

              <div className="detailsSearchMini">
                <MapPin size={18} />
                <span>{listing.postcode}</span>
                <button onClick={() => navigate("/results")}>Find</button>
              </div>

              <div className="listingRatingLine">
                <span>{listing.name}</span>
                <Stars rating={listing.rating} size={18} />
                <strong>{listing.rating}</strong>
              </div>

              <h2>{listing.name}</h2>
            </div>

            <div className="listingLogoCircle">
              <img src="/assets/logo-blue.png" alt="NWLB" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= Action Tabs ================= */}
      <section className="listingActionSection">
        <div className="nwlbContainer">
          <div className="listingActionTabs">
            <button
              className={activeTab === "favourite" ? "listingTab active" : "listingTab"}
              onClick={() => handleTabPress("favourite")}
            >
              <Heart size={44} />
              <span>FAVORITE</span>
            </button>

            <button className="listingTab" onClick={() => handleTabPress("call")}>
              <Phone size={44} />
              <span>CALL</span>
            </button>

            <button className="listingTab" onClick={() => handleTabPress("quote")}>
              <MoreHorizontal size={44} />
              <span>QUOTE</span>
            </button>

            <button className="listingTab" onClick={() => handleTabPress("website")}>
              <Globe size={44} />
              <span>WEBSITE</span>
            </button>

            <button
              className={activeTab === "review" ? "listingTab active" : "listingTab"}
              onClick={() => handleTabPress("review")}
            >
              <MessageSquareText size={44} />
              <span>REVIEW</span>
            </button>
          </div>
        </div>
      </section>

      {activeTab === "review" ? (
        <section className="reviewOnlySection">
          <div className="nwlbContainer reviewLayout">
            <ReviewSummary reviewStats={reviewStats} />

            <div className="reviewScrollBox">
              <h3>Scroll Down</h3>
              <ArrowDown size={58} />
              <div className="qrBox">
                <span>SCAN FOR THE MAGAZINE</span>
                <div className="fakeQr" />
              </div>
            </div>
          </div>

          <ReviewsList />

          <ReviewForm
            reviewEmail={reviewEmail}
            setReviewEmail={setReviewEmail}
            reviewMessage={reviewMessage}
            setReviewMessage={setReviewMessage}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            submitReview={submitReview}
            verifiedEmail={verifiedEmail}
          />
        </section>
      ) : (
        <section className="listingOverviewSection">
          <div className="nwlbContainer listingOverviewGrid">
            <div className="overviewLeft">
              <img className="listingMapImage" src={listing.mapImage} alt="Map" />

              <div className="phoneAndReviewRow">
                <div>
                  <h3>Phone Number</h3>
                  <a href={`tel:${listing.phone}`}>{listing.phone}</a>
                </div>

                <button onClick={() => setActiveTab("review")}>ADD REVIEW</button>
              </div>

              <div className="socialBlock">
                <h3>Social Media</h3>

                <div className="socialIconsRow">
                  <a href={listing.socials.facebook}>
                    <Facebook size={42} />
                  </a>
                  <a href={listing.socials.linkedin}>
                    <Linkedin size={42} />
                  </a>
                  <a href={listing.socials.instagram}>
                    <Instagram size={42} />
                  </a>
                  <a href={listing.socials.youtube}>
                    <Youtube size={42} />
                  </a>
                </div>
              </div>

              <div className="descriptionBlock">
                <h3>Description</h3>
                <p>{listing.description}</p>
                <p>{listing.description2}</p>
              </div>

              <div className="openingBlock">
                <h3>Opening Hours</h3>

                <div className="openingGrid">
                  <div>
                    {listing.openingHours.map((item) => (
                      <span key={item.day}>{item.day}</span>
                    ))}
                  </div>

                  <div>
                    {listing.openingHours.map((item) => (
                      <span key={item.day}>{item.time}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <aside className="overviewRight">
              <h3>{listing.name}</h3>
              <p>{listing.fullAddress}</p>
              <strong>{listing.distance} away</strong>

              <button className="copyMagazineBtn" onClick={handleCopy}>
                {copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}
                {copied ? "COPIED" : "COPY LINK"}
              </button>

              <div className="scrollDownBox">
                <h4>Scroll Down</h4>
                <ArrowDown size={62} />
              </div>
            </aside>
          </div>

          <ReviewsList compact />
        </section>
      )}

      <AppDownloadStrip />

      {showVerifyModal && (
        <div className="verifyModalOverlay">
          <div className="verifyModal">
            <button className="verifyClose" onClick={() => setShowVerifyModal(false)}>
              ×
            </button>

            <div className="verifyIcon">
              <Send size={34} />
            </div>

            <h2>Verify Your Email</h2>

            <p>
              We need to verify <strong>{reviewEmail}</strong> before submitting
              your review. OTP API will be connected later.
            </p>

            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter verification code"
            />

            <button onClick={verifyOtp}>Verify Email</button>

            <small>For UI testing, enter any 4 digit code.</small>
          </div>
        </div>
      )}
    </div>
  );
};

const ReviewSummary = ({ reviewStats }) => {
  return (
    <div className="reviewSummary">
      <div className="reviewSummaryHead">
        <h2>Total Reviews -</h2>
        <strong>{reviewStats.total}</strong>
      </div>

      <div className="reviewBars">
        <div>
          <Stars rating={5} size={20} color="#5f86b9" />
          <b>100% - 4</b>
        </div>

        <div>
          <Stars rating={4} size={20} color="#5f86b9" />
          <b>0% - 0</b>
        </div>

        <div>
          <Stars rating={3} size={20} color="#5f86b9" />
          <b>0% - 0</b>
        </div>

        <div>
          <Stars rating={2} size={20} color="#5f86b9" />
          <b>0% - 0</b>
        </div>

        <div>
          <Stars rating={1} size={20} color="#5f86b9" />
          <b>0% - 0</b>
        </div>
      </div>
    </div>
  );
};

const ReviewsList = ({ compact = false }) => {
  return (
    <div className={compact ? "nwlbContainer reviewsList compactReviews" : "nwlbContainer reviewsList"}>
      {mockReviews.map((item) => (
        <article key={item.id} className="reviewCard">
          <div className="reviewCardTop">
            <h3>{item.name}</h3>
            <Stars rating={item.rating} size={23} color="#5f86b9" />
          </div>

          <p>{item.message}</p>
          <span>{item.date}</span>
        </article>
      ))}
    </div>
  );
};

const ReviewForm = ({
  reviewEmail,
  setReviewEmail,
  reviewMessage,
  setReviewMessage,
  selectedRating,
  setSelectedRating,
  submitReview,
  verifiedEmail,
}) => {
  return (
    <div className="nwlbContainer reviewFormBox">
      <h2>LEAVE US SOME FEEDBACK</h2>

      <input
        value={reviewEmail}
        onChange={(e) => setReviewEmail(e.target.value)}
        placeholder="YOUR EMAIL"
      />

      {verifiedEmail && verifiedEmail === reviewEmail.trim() ? (
        <div className="verifiedBadge">
          <CheckCircle2 size={17} />
          Email verified
        </div>
      ) : null}

      <div className="messageInputWrap">
        <textarea
          value={reviewMessage}
          onChange={(e) => setReviewMessage(e.target.value)}
          placeholder="HOW DID WE DO?"
        />

        <button onClick={submitReview}>SUBMIT</button>
      </div>

      <div className="reviewStarPicker">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} onClick={() => setSelectedRating(star)}>
            <Star
              size={32}
              fill={star <= selectedRating ? "#5f86b9" : "#a8adb6"}
              color={star <= selectedRating ? "#5f86b9" : "#a8adb6"}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListingDetailsPage;