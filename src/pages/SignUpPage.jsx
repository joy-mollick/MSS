// ========================= Before return =========================

import React, { useState } from "react";
import {
  Building2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AppDownloadStrip from "../components/common/AppDownloadStrip";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const askLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Location is not supported on this device.");
      return;
    }

    setLocationStatus("Requesting location permission...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        localStorage.setItem("nwlb_user_location", JSON.stringify(locationData));
        setLocationStatus("Location saved successfully.");
      },
      () => {
        setLocationStatus("Location permission skipped.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const handleSignUp = () => {
    if (!form.fullName.trim() || !form.email.trim() || !form.password.trim()) {
      alert("Please fill name, email and password.");
      return;
    }

    askLocation();

    navigate("/verify-email", {
      state: {
        from: "signup",
        pendingUser: form,
      },
    });
  };

  return (
    // ========================= Inside return =========================

    <div className="authPage">
      <section className="authHero signupHero">
        <div className="authHeroOverlay" />

        <div className="nwlbContainer authGrid">
          <div className="authLeft">
            <img src="/assets/logo-white.png" alt="NWLB" />

            <h1>Create Account</h1>

            <p>
              Join NWLB to save favourites, verify your email, request quotes,
              submit reviews and prepare your business listing.
            </p>

            <div className="authMiniCard">
              <Mail size={22} />
              <span>Already joined?</span>
              <Link to="/login">Login to your account</Link>
            </div>
          </div>

          <div className="authCard">
            <h2>Sign Up</h2>
            <p>Email verification is required before account activation.</p>

            <label className="authInput">
              <User size={18} />
              <input
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                placeholder="Full Name"
              />
            </label>

            <label className="authInput">
              <Building2 size={18} />
              <input
                value={form.businessName}
                onChange={(e) => updateField("businessName", e.target.value)}
                placeholder="Business Name optional"
              />
            </label>

            <label className="authInput">
              <Mail size={18} />
              <input
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="Email Address"
                type="email"
              />
            </label>

            <label className="authInput">
              <Phone size={18} />
              <input
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="Phone Number optional"
              />
            </label>

            <label className="authInput">
              <Lock size={18} />
              <input
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </label>

            <button className="locationAskBtn" type="button" onClick={askLocation}>
              <MapPin size={17} />
              Allow Location
            </button>

            {locationStatus ? (
              <div className="locationStatusText">{locationStatus}</div>
            ) : null}

            <p className="termsAgreeText">
              By creating an account, you agree to our{" "}
              <Link to="/terms-conditions">Terms & Conditions</Link> and{" "}
              <Link to="/privacy-policy">Privacy Policy</Link>.
            </p>

            <button className="authMainBtn" onClick={handleSignUp}>
              CONTINUE TO VERIFY EMAIL
            </button>

            <div className="authBottomText">
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </div>
        </div>
      </section>

      <AppDownloadStrip />
    </div>
  );
};

export default SignUpPage;