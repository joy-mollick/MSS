// ========================= Before return =========================

import React, { useRef, useState } from "react";
import {
  Camera,
  CheckCircle2,
  Facebook,
  Globe,
  Instagram,
  LocateFixed,
  Save,
  Star,
  Youtube,
} from "lucide-react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useNavigate, useParams } from "react-router-dom";
import AppDownloadStrip from "../components/common/AppDownloadStrip";
import ConfirmModal from "../components/common/ConfirmModal";
import { listingDetailsData } from "../data/mockData";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const keywordInitial = Array.from({ length: 10 }).map((_, index) => ({
  id: index + 1,
  keyword: "",
  topThree: "no",
  postcode: index === 1 ? "L31 5NQ" : "",
  distance: "",
  mapPoint: null,
}));

const markerIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const AddEditListingPage = ({ mode = "add" }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const existing = listingDetailsData[id] || listingDetailsData["stf-electrical"];
  const isEdit = mode === "edit";

  const [step, setStep] = useState("details");
  const [nextConfirmOpen, setNextConfirmOpen] = useState(false);
  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false);

  const [profilePreview, setProfilePreview] = useState(isEdit ? existing.image : "");
  const [coverPreview, setCoverPreview] = useState(isEdit ? existing.cover : "");

  const [form, setForm] = useState({
    businessName: isEdit ? existing.name : "",
    address1: isEdit ? existing.fullAddress : "",
    address2: "",
    city: "Liverpool",
    postcode: isEdit ? existing.postcode : "",
    country: "United Kingdom",
    website: isEdit ? existing.website : "",
    email: isEdit ? existing.email : "",
    phone: isEdit ? existing.phone : "",
    description: isEdit ? existing.description : "",
    facebook: "",
    youtube: "",
    tiktok: "",
    twitter: "",
    snapchat: "",
    instagram: "",
    whatsapp: "",
    soundcloud: "",
    googleReview: "",
    tripAdvisor: "",
    yelp: "",
    facebookReview: "",
  });

  const [keywords, setKeywords] = useState(keywordInitial);
  const [mapCenter, setMapCenter] = useState([53.4808, -2.2426]);

  const updateField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateKeyword = (id, key, value) => {
    setKeywords((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [key]: value,
            }
          : item
      )
    );
  };

  const handleImagePick = (event, type) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    if (type === "profile") {
      setProfilePreview(previewUrl);
      return;
    }

    setCoverPreview(previewUrl);
  };

  const useDeviceLocation = (keywordId) => {
    if (!navigator.geolocation) {
      alert("Location is not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const point = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setMapCenter([point.lat, point.lng]);
        updateKeyword(keywordId, "mapPoint", point);
        localStorage.setItem("nwlb_user_location", JSON.stringify(point));
      },
      () => {
        alert("Could not get device location. Please allow location permission.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const validateDetails = () => {
    if (!form.businessName.trim()) {
      alert("Please enter business name.");
      return false;
    }

    if (!form.postcode.trim()) {
      alert("Please enter post code.");
      return false;
    }

    if (!form.email.trim()) {
      alert("Please enter email.");
      return false;
    }

    if (!form.phone.trim()) {
      alert("Please enter phone number.");
      return false;
    }

    return true;
  };

  const handleNextPress = () => {
    if (!validateDetails()) return;
    setNextConfirmOpen(true);
  };

  const goKeywordStep = () => {
    setNextConfirmOpen(false);
    setStep("keywords");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const finishListing = () => {
    setSaveConfirmOpen(false);
    alert(isEdit ? "Listing updated. Firebase later." : "Listing added. Firebase later.");
    navigate("/account");
  };

  return (
    // ========================= Inside return =========================

    <div className="addEditListingPage">
      <section className="addListingTitleBar">
        <h1>
          {step === "details"
            ? isEdit
              ? "Edit Listing"
              : "Add Listing"
            : "Keywords"}
        </h1>
      </section>

      {step === "details" ? (
        <section className="addListingFormSection">
          <div className="nwlbContainer addListingForm">
            <input
              ref={profileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleImagePick(e, "profile")}
            />

            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleImagePick(e, "cover")}
            />

            <div className="listingImageUploadRow">
              <button
                type="button"
                className={
                  profilePreview
                    ? "profileUploadCircle hasImage"
                    : "profileUploadCircle"
                }
                onClick={() => profileInputRef.current?.click()}
              >
                {profilePreview ? (
                  <img src={profilePreview} alt="Business" />
                ) : (
                  <span>
                    {form.businessName
                      ? form.businessName
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)
                      : "BN"}
                  </span>
                )}

                <Camera size={20} />
              </button>

              <button
                type="button"
                className={coverPreview ? "coverUploadBox hasImage" : "coverUploadBox"}
                onClick={() => coverInputRef.current?.click()}
              >
                {coverPreview ? (
                  <img src={coverPreview} alt="Cover" />
                ) : (
                  <span>Cover Photo</span>
                )}

                <Camera size={22} />
              </button>
            </div>

            <FormInput
              label="Business Name"
              value={form.businessName}
              onChange={(value) => updateField("businessName", value)}
              placeholder="Your Business Name"
            />

            <FormInput
              label="Address 1"
              value={form.address1}
              onChange={(value) => updateField("address1", value)}
              placeholder="Your Address 1"
            />

            <FormInput
              label="Address 2"
              value={form.address2}
              onChange={(value) => updateField("address2", value)}
              placeholder="Your Address 2"
            />

            <FormInput
              label="City"
              value={form.city}
              onChange={(value) => updateField("city", value)}
              placeholder="Your City"
            />

            <FormInput
              label="Post Code"
              value={form.postcode}
              onChange={(value) => updateField("postcode", value)}
              placeholder="Your Post Code"
            />

            <FormInput
              label="Country"
              value={form.country}
              onChange={(value) => updateField("country", value)}
              placeholder="Your Country"
            />

            <FormInput
              label="Website URL"
              value={form.website}
              onChange={(value) => updateField("website", value)}
              placeholder="Your Link"
            />

            <FormInput
              label="Email"
              value={form.email}
              onChange={(value) => updateField("email", value)}
              placeholder="Your Email"
            />

            <FormInput
              label="Phone Number"
              value={form.phone}
              onChange={(value) => updateField("phone", value)}
              placeholder="Your Phone Number"
            />

            <div className="addFormGroup">
              <label>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Description"
              />
            </div>

            <div className="addListingTwoCol">
              <div>
                <h3>Social Media Link</h3>

                <SocialInput
                  icon={<Facebook size={15} />}
                  value={form.facebook}
                  onChange={(value) => updateField("facebook", value)}
                  placeholder="Facebook Link"
                />

                <SocialInput
                  icon={<Youtube size={15} />}
                  value={form.youtube}
                  onChange={(value) => updateField("youtube", value)}
                  placeholder="Youtube Link"
                />

                <SocialInput
                  icon={<Globe size={15} />}
                  value={form.tiktok}
                  onChange={(value) => updateField("tiktok", value)}
                  placeholder="Tiktok Link"
                />

                <SocialInput
                  icon={<Globe size={15} />}
                  value={form.twitter}
                  onChange={(value) => updateField("twitter", value)}
                  placeholder="Twitter Link"
                />

                <SocialInput
                  icon={<Globe size={15} />}
                  value={form.snapchat}
                  onChange={(value) => updateField("snapchat", value)}
                  placeholder="Snap Link"
                />

                <SocialInput
                  icon={<Instagram size={15} />}
                  value={form.instagram}
                  onChange={(value) => updateField("instagram", value)}
                  placeholder="Instagram Link"
                />

                <SocialInput
                  icon={<Globe size={15} />}
                  value={form.whatsapp}
                  onChange={(value) => updateField("whatsapp", value)}
                  placeholder="WhatsApp Number"
                />

                <SocialInput
                  icon={<Globe size={15} />}
                  value={form.soundcloud}
                  onChange={(value) => updateField("soundcloud", value)}
                  placeholder="Sound Cloud Link"
                />
              </div>

              <div className="reviewLinksBox improvedReviewLinks">
                <div className="reviewLinksHeader">
                  <span>
                    <Star size={18} />
                  </span>

                  <div>
                    <h3>Review Links</h3>
                    <p>Add external review sources for stronger trust.</p>
                  </div>
                </div>

                <SocialInput
                  icon={<Globe size={15} />}
                  value={form.googleReview}
                  onChange={(value) => updateField("googleReview", value)}
                  placeholder="Google Review Link"
                />

                <SocialInput
                  icon={<Globe size={15} />}
                  value={form.tripAdvisor}
                  onChange={(value) => updateField("tripAdvisor", value)}
                  placeholder="TripAdvisor Link"
                />

                <SocialInput
                  icon={<Globe size={15} />}
                  value={form.yelp}
                  onChange={(value) => updateField("yelp", value)}
                  placeholder="Yelp Link"
                />

                <SocialInput
                  icon={<Facebook size={15} />}
                  value={form.facebookReview}
                  onChange={(value) => updateField("facebookReview", value)}
                  placeholder="Facebook Review Link"
                />
              </div>
            </div>

            <div className="openingEditor">
              <h3>Opening & Closing</h3>

              {days.map((day) => (
                <div className="openingEditRow" key={day}>
                  <label>{day}</label>

                  <div className="openingCheckLine">
                    <span>
                      <input type="checkbox" />
                      closed
                    </span>
                  </div>

                  <div className="openingTimeLine">
                    <span>
                      <input type="checkbox" />
                      open
                    </span>

                    <input placeholder="From" />
                    <select>
                      <option>Am</option>
                      <option>Pm</option>
                    </select>

                    <input placeholder="To" />
                    <select>
                      <option>Am</option>
                      <option>Pm</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <button className="listingSaveBtn" onClick={handleNextPress}>
              <Save size={18} />
              NEXT
            </button>
          </div>
        </section>
      ) : (
        <section className="keywordFormSection">
          <div className="nwlbContainer keywordFormWrap">
            <div className="keywordTopArea">
              <p className="keywordIntro">
                Add keywords so customers can find your business easily.
              </p>

              <div className="keywordQrBox">
                <span>SCAN FOR THE MAGAZINE</span>
                <div className="fakeQr" />
              </div>
            </div>

            {keywords.map((item, index) => {
              const price =
                index < 3 ? "(free)" : "£0.70 per month";

              return (
                <div className="keywordItem" key={item.id}>
                  <div className="keywordItemHeader">
                    <h3>
                      Keyword {item.id} <span>{price}</span>
                    </h3>
                  </div>

                  <input
                    value={item.keyword}
                    onChange={(e) =>
                      updateKeyword(item.id, "keyword", e.target.value)
                    }
                    placeholder="Enter Keyword"
                  />

                  <p>Do you want to be number 1?</p>

                  <div className="keywordRadioRow">
                    <label>
                      yes
                      <input
                        type="radio"
                        checked={item.topThree === "yes"}
                        onChange={() =>
                          updateKeyword(item.id, "topThree", "yes")
                        }
                      />
                    </label>

                    <label>
                      No
                      <input
                        type="radio"
                        checked={item.topThree === "no"}
                        onChange={() =>
                          updateKeyword(item.id, "topThree", "no")
                        }
                      />
                    </label>
                  </div>

                  {item.id === 2 && (
                    <div className="keywordPostcodeGrid">
                      <div>
                        <label>Postcode</label>
                        <input
                          value={item.postcode}
                          onChange={(e) =>
                            updateKeyword(item.id, "postcode", e.target.value)
                          }
                          placeholder="Postcode"
                        />
                      </div>

                      <div>
                        <label>Advertising Distance</label>
                        <select
                          className="prettySelect"
                          value={item.distance}
                          onChange={(e) =>
                            updateKeyword(item.id, "distance", e.target.value)
                          }
                        >
                          <option value="">Select Option</option>
                          <option>This location only</option>
                          <option>2 miles</option>
                          <option>5 miles</option>
                          <option>10 miles</option>
                        </select>
                      </div>

                      <div className="keywordMapBox">
                        <div className="mapHelperBar">
                          <span>
                            {item.mapPoint
                              ? `Selected: ${item.mapPoint.lat.toFixed(
                                  5
                                )}, ${item.mapPoint.lng.toFixed(5)}`
                              : "Click on the map to choose a point"}
                          </span>

                          <button
                            type="button"
                            onClick={() => useDeviceLocation(item.id)}
                          >
                            <LocateFixed size={15} />
                            Use Device Location
                          </button>
                        </div>

                        <MapContainer
                          center={mapCenter}
                          zoom={7}
                          scrollWheelZoom
                          className="leafletKeywordMap"
                        >
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />

                          <KeywordMapClick
                            onClick={(point) => {
                              updateKeyword(item.id, "mapPoint", point);
                              setMapCenter([point.lat, point.lng]);
                            }}
                          />

                          {item.mapPoint && (
                            <Marker
                              position={[item.mapPoint.lat, item.mapPoint.lng]}
                              icon={markerIcon}
                            />
                          )}
                        </MapContainer>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="keywordButtonRow">
              <button className="keywordBackBtn" onClick={() => setStep("details")}>
                Back
              </button>

              <button
                className="keywordConfirmBtn"
                onClick={() => setSaveConfirmOpen(true)}
              >
                <CheckCircle2 size={18} />
                CONFIRM
              </button>
            </div>
          </div>
        </section>
      )}

      <AppDownloadStrip />

      <ConfirmModal
        open={nextConfirmOpen}
        type="success"
        title="Continue to Keywords?"
        message="Your business details look ready. Do you want to continue to the keyword setup step?"
        confirmText="Yes, Continue"
        cancelText="Review Again"
        onCancel={() => setNextConfirmOpen(false)}
        onConfirm={goKeywordStep}
      />

      <ConfirmModal
        open={saveConfirmOpen}
        type="success"
        title={isEdit ? "Update Listing?" : "Submit Listing?"}
        message={
          isEdit
            ? "Are you sure you want to save these listing and keyword changes?"
            : "Are you sure you want to submit this listing with selected keywords?"
        }
        confirmText={isEdit ? "Yes, Update" : "Yes, Submit"}
        cancelText="Cancel"
        onCancel={() => setSaveConfirmOpen(false)}
        onConfirm={finishListing}
      />
    </div>
  );
};

const KeywordMapClick = ({ onClick }) => {
  useMapEvents({
    click(event) {
      onClick({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    },
  });

  return null;
};

const FormInput = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="addFormGroup">
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

const SocialInput = ({ icon, value, onChange, placeholder }) => {
  return (
    <label className="socialInput">
      {icon}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
};

export default AddEditListingPage;