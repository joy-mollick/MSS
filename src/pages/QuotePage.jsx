// ========================= Before return =========================

import React, { useState } from "react";
import { ArrowLeft, CalendarDays, CheckCircle2, MapPin, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AppDownloadStrip from "../components/common/AppDownloadStrip";
import { listingDetailsData } from "../data/mockData";
import NiceModal from "../components/common/NiceModal";

const QuotePage = () => {


  const [niceModal, setNiceModal] = useState({
    open: false,
    type: "info",
    title: "",
    message: "",
    onPrimary: null,
  });

  const showNiceModal = ({ type = "info", title, message, onPrimary }) => {
    setNiceModal({
      open: true,
      type,
      title,
      message,
      onPrimary: onPrimary || null,
    });
  };

  const closeNiceModal = () => {
    setNiceModal({
      open: false,
      type: "info",
      title: "",
      message: "",
      onPrimary: null,
    });
  };

  const navigate = useNavigate();
  const { id } = useParams();

  const listing = listingDetailsData[id] || listingDetailsData["stf-electrical"];

  const [form, setForm] = useState({
    date: "",
    message: "",
    name: "",
    email: "",
    postcode: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submitQuote = () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {

      showNiceModal({
        type: "warning",
        title: "Missing Details",
        message: "Please fill name, email and phone number.",
      });

      return;
    }

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      navigate(`/listing/${listing.id}`);
    }, 1800);
  };

  return (
    // ========================= Inside return =========================

    <div className="quotePage">
      <section
        className="quoteHero"
        style={{
          backgroundImage: `url(${listing.cover})`,
        }}
      >
        <div className="quoteHeroOverlay" />

        <div className="nwlbContainer quoteHeroContent">
          <button onClick={() => navigate(`/listing/${listing.id}`)}>
            <ArrowLeft size={17} />
            Back to Listing
          </button>

          <h1>NWLB</h1>

          <div className="detailsSearchMini quoteMiniSearch">
            <MapPin size={18} />
            <span>{listing.postcode}</span>
            <button onClick={() => navigate("/results")}>Find</button>
          </div>
        </div>
      </section>

      <section className="quoteFormSection">
        <div className="nwlbContainer quoteMainGrid">
          <div className="quoteBusinessCard">
            <img src={listing.image} alt={listing.name} />

            <div>
              <h2>{listing.name}</h2>
              <p>{listing.tagline}</p>
            </div>
          </div>

          <div className="quoteLocationBlock">
            <h3>LOCATION</h3>
            <p>{listing.fullAddress}</p>
          </div>

          <div className="quoteDateBlock">
            <h3>PREFERRED TIME | REQUIRED</h3>

            <label>
              <CalendarDays size={17} />
              <input
                type="datetime-local"
                value={form.date}
                onChange={(e) => updateField("date", e.target.value)}
              />
            </label>
          </div>

          <div className="quoteMessageBlock">
            <h3>ADD A MESSAGE | OPTIONAL</h3>

            <textarea
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              placeholder="SEARCH ANY NUMBER"
            />
          </div>

          <div className="quoteInputs">
            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="YOUR NAME"
            />

            <input
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="YOUR EMAIL"
            />

            <input
              value={form.postcode}
              onChange={(e) => updateField("postcode", e.target.value)}
              placeholder="POST CODE"
            />

            <input
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="PHONE NUMBER"
            />

            <button onClick={submitQuote}>REQUEST A QUOTE</button>
          </div>
        </div>
      </section>

      <AppDownloadStrip />

      {submitted && (
        <div className="quoteSuccessOverlay">
          <div className="quoteSuccessBox">
            <CheckCircle2 size={54} />
            <h2>Quote Request Sent</h2>
            <p>Firebase submission will be connected later.</p>
          </div>
        </div>
      )}

      <NiceModal
        open={niceModal.open}
        type={niceModal.type}
        title={niceModal.title}
        message={niceModal.message}
        primaryText="OK"
        onClose={closeNiceModal}
        onPrimary={niceModal.onPrimary || closeNiceModal}
      />

    </div>
  );
};

export default QuotePage;