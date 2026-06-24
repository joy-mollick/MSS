// ========================= Before return =========================

import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Heart,
  MapPin,
  Maximize2,
  Minimize2,
  Phone,
  Star,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBox from "../components/common/SearchBox";
import Stars from "../components/common/Stars";
import AppDownloadStrip from "../components/common/AppDownloadStrip";
import { listingResults } from "../data/mockData";

const ResultScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mapExpanded, setMapExpanded] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  const searchParams = useMemo(() => {
    const params = new URLSearchParams(location.search);

    return {
      keyword: params.get("keyword") || "",
      postcode: params.get("postcode") || "",
    };
  }, [location.search]);

  const filteredListings = useMemo(() => {
    const keyword = searchParams.keyword.trim().toLowerCase();

    if (!keyword) return listingResults;

    const found = listingResults.filter((item) => {
      return (
        item.name.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.address.toLowerCase().includes(keyword)
      );
    });

    return found.length > 0 ? found : listingResults;
  }, [searchParams.keyword]);

  const handleListingPress = (id) => {
    navigate(`/listing/${id}`);
  };

  return (
    // ========================= Inside return =========================

    <div className="resultPage">
      {/* ================= Hero Search ================= */}
      <section className="resultHero">
        <div className="resultHeroOverlay" />

        <div className="nwlbContainer resultHeroContent">
          <button className="resultBackBtn" onClick={() => navigate("/")}>
            <ArrowLeft size={18} />
            Back to Home
          </button>

          <h1>Find Local Business</h1>

          <p>
            Search results for{" "}
            <strong>{searchParams.keyword || "local business"}</strong>
            {searchParams.postcode ? (
              <>
                {" "}
                near <strong>{searchParams.postcode}</strong>
              </>
            ) : null}
          </p>

          <SearchBox
            defaultKeyword={searchParams.keyword}
            defaultPostcode={searchParams.postcode}
          />
        </div>
      </section>

      {/* ================= Results Main ================= */}
      <section className="resultsMainSection">
        <div className="nwlbContainer">
          <div className="resultsTopBar">
            <div>
              <p>SEARCH RESULT</p>
              <h2>{filteredListings.length} Businesses Found</h2>
            </div>

            <button
              className="mapToggleBtn"
              onClick={() => {
                setMapExpanded((prev) => !prev);
                setSelectedListing(null);
              }}
            >
              {mapExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              {mapExpanded ? "Minimise Map" : "Enlarge Map"}
            </button>
          </div>

          {/* ================= Map ================= */}
          <div className={mapExpanded ? "mockMap expanded" : "mockMap"}>
            <img src="/assets/map-preview.jpg" alt="Map" />

            <div className="mockMapOverlay" />

            {filteredListings.map((item) => (
              <button
                key={item.id}
                className={
                  selectedListing?.id === item.id
                    ? "mapPin activeMapPin"
                    : "mapPin"
                }
                style={{
                  left: item.mapPosition.left,
                  top: item.mapPosition.top,
                }}
                onClick={() => setSelectedListing(item)}
              >
                <MapPin size={22} fill="#ffffff" />
              </button>
            ))}

            {selectedListing && (
              <div
                className="mapPopup"
                style={{
                  left: selectedListing.mapPosition.left,
                  top: selectedListing.mapPosition.top,
                }}
              >
                <button
                  className="mapPopupClose"
                  onClick={() => setSelectedListing(null)}
                >
                  <X size={14} />
                </button>

                <img src={selectedListing.image} alt={selectedListing.name} />

                <div>
                  <p>{selectedListing.category}</p>
                  <h3>{selectedListing.name}</h3>
                  <span>{selectedListing.address}</span>

                  <div className="mapPopupRating">
                    <Star size={15} fill="#ffb800" color="#ffb800" />
                    {selectedListing.rating}
                  </div>

                  <button onClick={() => handleListingPress(selectedListing.id)}>
                    View Listing
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ================= Listing Cards ================= */}
          <div className="resultCardsList">
            {filteredListings.map((item) => (
              <article key={item.id} className="resultCard">
                <button
                  className="resultCardImage"
                  onClick={() => handleListingPress(item.id)}
                >
                  <img src={item.image} alt={item.name} />
                </button>

                <div className="resultCardContent">
                  <button
                    className="resultCardTitle"
                    onClick={() => handleListingPress(item.id)}
                  >
                    {item.name}
                  </button>

                  <p className="resultAddress">{item.address}</p>

                  <div className="resultMetaRow">
                    <span>
                      <MapPin size={22} />
                      {item.distance}
                    </span>

                    <span>
                      <Star size={22} />
                      {item.rating}
                    </span>

                    {item.statusText ? (
                      <strong className="openStatus">{item.statusText}</strong>
                    ) : (
                      <strong>{item.serveArea}</strong>
                    )}
                  </div>

                  <div className="resultActionRow">
                    <button onClick={() => navigate(`/quote/${item.id}`)}>
                      QUOTE
                    </button>

                    <a href={`tel:${item.phone}`}>
                      <Phone size={16} />
                      CALL
                    </a>
                  </div>
                </div>

                <button className="resultHeartBtn">
                  <Heart
                    size={34}
                    fill={item.isFavourite ? "#6f9bd5" : "transparent"}
                    color="#6f9bd5"
                  />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AppDownloadStrip />
    </div>
  );
};

export default ResultScreen;