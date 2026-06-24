// ========================= Before return =========================

import React from "react";
import { Heart, MapPin, Phone, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppDownloadStrip from "../components/common/AppDownloadStrip";
import SearchBox from "../components/common/SearchBox";
import Stars from "../components/common/Stars";
import { listingResults } from "../data/mockData";

const FavouritesPage = () => {
  const navigate = useNavigate();

  const favourites = listingResults.filter((item) => item.isFavourite);

  return (
    // ========================= Inside return =========================

    <div className="favouritesPage">
      <section className="innerPageHero lightHero">
        <div className="nwlbContainer innerHeroContent">
          <p>YOUR SAVED BUSINESSES</p>
          <h1>Favourite Listings</h1>
          <span>
            Keep your preferred local businesses saved and access them quickly.
          </span>

          <div className="innerSearchWrap">
            <SearchBox compact />
          </div>
        </div>
      </section>

      <section className="favouritesListSection">
        <div className="nwlbContainer">
          <div className="favouriteFeaturedCard">
            <div>
              <p>
                <span />
                Shopping
              </p>

              <h2>NWLB Leaflet Distribution</h2>
            </div>

            <Stars rating={4} size={30} />
          </div>

          <div className="featureDots favouriteDots">
            <button className="dot active" />
            <button className="dot" />
            <button className="dot" />
          </div>

          <h2 className="sectionTitle favouriteTitle">Saved Favourite</h2>

          <div className="resultCardsList">
            {favourites.map((item) => (
              <article key={item.id} className="resultCard favouriteResultCard">
                <button
                  className="resultCardImage"
                  onClick={() => navigate(`/listing/${item.id}`)}
                >
                  <img src={item.image} alt={item.name} />
                </button>

                <div className="resultCardContent">
                  <button
                    className="resultCardTitle"
                    onClick={() => navigate(`/listing/${item.id}`)}
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

                    <strong>{item.serveArea || item.category}</strong>
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
                  <Heart size={34} fill="#6f9bd5" color="#6f9bd5" />
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

export default FavouritesPage;