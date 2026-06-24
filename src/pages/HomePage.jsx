import React, { useEffect, useState } from "react";
import {
  BadgePoundSterling,
  Edit3,
  Handshake,
  ListChecks,
  MapPin,
  Megaphone,
  Newspaper,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/common/SearchBox";
import Stars from "../components/common/Stars";
import AppDownloadStrip from "../components/common/AppDownloadStrip";
import {
  businessOwnerSteps,
  featuredBusinesses,
  latestNews,
} from "../data/mockData";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % featuredBusinesses.length);
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  const feature = featuredBusinesses[activeFeature];

  return (
    <div className="homePage">
      {/* ================= Hero ================= */}
      <section className="homeHero">
        <div className="heroOverlay" />

        <div className="nwlbContainer heroContent">
          <div className="heroTopLabel">GET FOUND ONLINE</div>

          <h1>
            NORTH WEST LOCAL <br />
            BUSINESS
          </h1>

          <SearchBox />

          <div className="heroBenefits">
            <div>
              <ListChecks size={34} />
              <span>
                NORTH WEST’S BEST <br />
                LOCAL DIRECTORY
              </span>
            </div>

            <div>
              <Handshake size={38} />
              <span>
                EASILY FIND <br />
                LOCAL BUSINESS
              </span>
            </div>

            <div>
              <BadgePoundSterling size={36} />
              <span>
                WIN MONTHLY <br />
                CASH PRIZE
              </span>
            </div>
          </div>

          <div className="featuredRowTitle">
            <h2>Feature Business</h2>
            <button onClick={() => navigate("/results")}>See All</button>
          </div>

          <button
            className="heroFeatureCard"
            onClick={() => navigate(`/listing/${feature.id}`)}
          >
            <img src={feature.image} alt={feature.name} />

            <div className="featureInfo">
              <p>
                <span />
                {feature.category}
              </p>

              <h3>{feature.name}</h3>

              <div className="distance">
                Distance: <strong>{feature.distance}</strong>
              </div>

              <small>{feature.address}</small>
            </div>

            <Stars rating={feature.rating} size={23} />
          </button>

          <div className="featureDots">
            {featuredBusinesses.map((_, index) => (
              <button
                key={index}
                className={index === activeFeature ? "dot active" : "dot"}
                onClick={() => setActiveFeature(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <AppDownloadStrip />

      {/* ================= Business Owner Steps ================= */}
      <section className="ownerSection">
        <div className="nwlbContainer">
          <div className="ownerHead">
            <p>ATTENTION BUSINESS OWNER</p>
            <h2>Click here to get your free listing</h2>
          </div>

          <div className="ownerCards">
            {businessOwnerSteps.map((item, index) => {
              const icons = [
                <ListChecks size={38} />,
                <Edit3 size={38} />,
                <Megaphone size={38} />,
              ];

              return (
                <button
                  key={item.id}
                  className="ownerCard"
                  onClick={() => navigate("/signup")}
                >
                  <div className="ownerIcon">{icons[index]}</div>

                  <div className="ownerNumber">{item.id}</div>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>

                  <span className="ownerGlow" />
                </button>
              );
            })}
          </div>

          <div className="jackpotCenter">
            <button className="jackpotBtn" onClick={() => navigate("/terms-conditions")}>
              LIVE JACKPOT
            </button>
          </div>
        </div>
      </section>

      {/* ================= News ================= */}
      <section className="newsHomeSection">
        <div className="nwlbContainer">
          <div className="newsTitleRow">
            <div>
              <p>
                <Newspaper size={18} />
                NEWS
              </p>
              <h2>Most Recent Articles</h2>
            </div>

            <button onClick={() => navigate("/news")}>View All</button>
          </div>

          <div className="newsMainGrid">
            <button
              className="newsLeadImage"
              onClick={() => navigate(`/news/${latestNews[0].id}`)}
            >
              <img src={latestNews[0].image} alt={latestNews[0].title} />
            </button>

            <div className="newsLeadContent">
              <span>{latestNews[0].category}</span>
              <h3>{latestNews[0].title}</h3>
              <p>{latestNews[0].excerpt}</p>
              <small>{latestNews[0].date}</small>

              <button onClick={() => navigate("/news")}>READ MORE</button>
            </div>
          </div>

          <div className="newsSmallGrid">
            {latestNews.slice(1).map((item) => (
              <button
                key={item.id}
                className="newsSmallCard"
                onClick={() => navigate(`/news/${item.id}`)}
              >
                <img src={item.image} alt={item.title} />

                <div className="newsTag">{item.category}</div>

                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <small>{item.date}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="homeFinalCta">
        <div className="nwlbContainer finalCtaBox">
          <div>
            <p>
              <Sparkles size={18} />
              READY TO BE FOUND?
            </p>
            <h2>Add your local business today.</h2>
          </div>

          <button onClick={() => navigate("/signup")}>Start Free Listing</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;