// ========================= Before return =========================

import React, { useMemo } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Eye,
  MapPin,
  Share2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AppDownloadStrip from "../components/common/AppDownloadStrip";
import { latestNews } from "../data/mockData";

const EntertainmentDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const article = useMemo(() => {
    return latestNews.find((item) => item.id === id) || latestNews[0];
  }, [id]);

  return (
    // ========================= Inside return =========================

    <div className="articleDetailsPage">
      <section className="articleHero">
        <div className="nwlbContainer">
          <button className="articleBackBtn" onClick={() => navigate("/news")}>
            <ArrowLeft size={17} />
            Back to News
          </button>

          <h1>New & Entertainment</h1>
        </div>
      </section>

      <section
        className="articleImageHero"
        style={{
          backgroundImage: `url(${article.image})`,
        }}
      >
        <div className="articleImageOverlay" />

        <div className="nwlbContainer articleImageContent">
          <span>{article.category}</span>

          <h2>{article.title}</h2>

          <div className="articleMeta">
            <p>
              <CalendarDays size={15} />
              {article.date}
            </p>

            <p>
              <Clock size={15} />5 min read
            </p>

            <p>
              <Eye size={15} />
              No Distance
            </p>
          </div>
        </div>
      </section>

      <article className="nwlbContainer articleBody">
        <div className="articleIntro">
          As the morning sun hits the pavement in Islington, there&apos;s a
          palpable shift in the air. The familiar sound of shutters rising
          isn&apos;t just routine—it&apos;s the rhythm of a resurgence.
        </div>

        <p>
          For decades, the narrative surrounding the British high street has
          been one of decline. Major retailers retreating, boarded-up windows,
          and the relentless march of e-commerce. Yet, look closer at
          neighborhoods across the capital and beyond, and you&apos;ll find a
          different story being written—one of resilience, community, and
          curated craft.
        </p>

        <p>
          Local councils have begun to recognise that the value of a town centre
          isn&apos;t measured solely in transaction volume, but in social
          capital. New initiatives to support independent cafes, artisan
          bakeries, and experience-led retail spaces are transforming dormant
          rows into vibrant hubs of activity.
        </p>

        <div className="articleQuoteGrid">
          <blockquote>
            “It&apos;s not just about buying coffee or bread. It&apos;s about
            the accidental conversations, the sense of place, and knowing the
            name of the person behind the counter.”
            <span>— Sarah Jenkins, Urban Planner</span>
          </blockquote>

          <figure>
            <img src="/assets/news-main.jpg" alt="Local business" />
            <figcaption>
              The new wave of minimalist spaces prioritizes community
              interaction.
            </figcaption>
          </figure>
        </div>

        <p>
          This shift towards &apos;slow retail&apos; mirrors a broader cultural
          movement. We are seeing a return to quality over quantity, connection
          over convenience. The shops surviving and thriving are those that
          offer something the internet cannot: a sensory experience.
        </p>

        <p>
          As we move into the winter months, the focus remains on
          sustainability. Local businesses are banding together to create
          seasonal events that draw crowds not for discounts, but for the
          atmosphere. It is a bold reimagining of what the UK high street can
          be—less of a marketplace, more of a meeting place.
        </p>

        <div className="articleFooterMeta">
          <span>Posted in</span>
          <strong>Local News</strong>
          <strong>London</strong>

          <button>
            <Share2 size={16} />
            Share Article
          </button>
        </div>
      </article>

      <AppDownloadStrip />
    </div>
  );
};

export default EntertainmentDetailsPage;