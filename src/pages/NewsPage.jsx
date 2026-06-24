// ========================= Before return =========================

import React from "react";
import { ArrowRight, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppDownloadStrip from "../components/common/AppDownloadStrip";
import Stars from "../components/common/Stars";
import { latestNews } from "../data/mockData";

const NewsPage = () => {
  const navigate = useNavigate();

  return (
    // ========================= Inside return =========================

    <div className="newsPage">
      <section className="newsTopSection">
        <div className="nwlbContainer">
          <h1>New & Entertainment</h1>

          <div className="newsFeatureBanner">
            <div>
              <p>
                <span />
                Shopping
              </p>

              <h2>NWLB Leaflet Distribution</h2>
            </div>

            <Stars rating={4} size={30} />
          </div>

          <div className="featureDots newsDots">
            <button className="dot active" />
            <button className="dot" />
            <button className="dot" />
          </div>
        </div>
      </section>

      <section className="newsCategorySection">
        <div className="nwlbContainer">
          <div className="newsCategoryBlock">
            <h2>Entertainment</h2>

            <button
              className="newsWideCard"
              onClick={() => navigate(`/news/${latestNews[0].id}`)}
            >
              <img src="/assets/entertainment-cover.jpg" alt="Entertainment" />

              <div>
                <h3>{latestNews[0].title}</h3>
                <p>{latestNews[0].excerpt}</p>

                <span>
                  Read More
                  <ArrowRight size={17} />
                </span>
              </div>
            </button>
          </div>

          <div className="newsCategoryBlock">
            <h2>Charity</h2>

            <button
              className="newsWideCard"
              onClick={() => navigate(`/news/${latestNews[1].id}`)}
            >
              <img src="/assets/charity-cover.jpg" alt="Charity" />

              <div>
                <h3>{latestNews[1].title}</h3>
                <p>{latestNews[1].excerpt}</p>

                <span>
                  Read More
                  <ArrowRight size={17} />
                </span>
              </div>
            </button>
          </div>

          <div className="newsCategoryBlock">
            <h2>New Business</h2>

            <button
              className="newsWideCard"
              onClick={() => navigate(`/news/${latestNews[2].id}`)}
            >
              <img src="/assets/business-cover.jpg" alt="New Business" />

              <div>
                <h3>{latestNews[2].title}</h3>
                <p>{latestNews[2].excerpt}</p>

                <span>
                  Read More
                  <ArrowRight size={17} />
                </span>
              </div>
            </button>
          </div>

          <div className="allNewsGridTitle">
            <p>
              <Newspaper size={18} />
              ALL ARTICLES
            </p>

            <h2>Latest from NWLB</h2>
          </div>

          <div className="newsSmallGrid pageNewsGrid">
            {latestNews.map((item) => (
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

      <AppDownloadStrip />
    </div>
  );
};

export default NewsPage;