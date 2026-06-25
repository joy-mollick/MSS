// ========================= Before return =========================

import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, MapPin, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AppDownloadStrip from "../components/common/AppDownloadStrip";
import NiceModal from "../components/common/NiceModal";

const LoginPage = () => {
  const navigate = useNavigate();


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


  const [form, setForm] = useState({
    email: "",
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

  const handleLogin = () => {
    if (!form.email.trim() || !form.password.trim()) {
      showNiceModal({
        type: "warning",
        title: "Missing Details",
        message: "Please enter email and password.",
      });
      return;
    }

    askLocation();

    localStorage.setItem("nwlb_logged_in", "true");
    window.dispatchEvent(new Event("nwlb_auth_change"));

    setTimeout(() => {
      showNiceModal({
        type: "info",
        title: "Login Successful",
        message: "You have been logged in successfully.",
      });
      navigate("/account");
    }, 500);
  };

  return (
    // ========================= Inside return =========================

    <div className="authPage">
      <section className="authHero">
        <div className="authHeroOverlay" />

        <div className="nwlbContainer authGrid">
          <div className="authLeft">
            <img src="/assets/logo-white.png" alt="NWLB" />

            <h1>Welcome Back</h1>

            <p>
              Login to manage your favourite listings, submit reviews, request
              quotes and grow with North West Local Business.
            </p>

            <div className="authMiniCard">
              <UserPlus size={22} />
              <span>New here?</span>
              <Link to="/signup">Create your free account</Link>
            </div>
          </div>

          <div className="authCard">
            <h2>Log In</h2>
            <p>Enter your details to continue.</p>

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

            <div className="authOptions">
              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <button type="button">Forgot Password?</button>
            </div>

            <button className="authMainBtn" onClick={handleLogin}>
              LOG IN
            </button>

            <div className="authBottomText">
              Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </section>

      <AppDownloadStrip />
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

export default LoginPage;