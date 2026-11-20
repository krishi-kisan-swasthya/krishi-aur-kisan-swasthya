import React from 'react';
import { Activity, Brain, Leaf, Users, CheckCircle2, Stethoscope, Smile } from 'lucide-react';

export default function AboutUs({ t }) {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">{t.aboutTag}</span>
          <h2 className="section-title">{t.aboutTitle}</h2>
          <div className="section-divider"></div>
          <p className="section-lead">{t.aboutLead}</p>
        </div>

        <div className="about-grid">
          {/* Card 1 */}
          <div className="about-card card-hover">
            <div className="card-icon-box bg-green-light">
              <Activity size={28} />
            </div>
            <h3>{t.card1H}</h3>
            <p>{t.card1P}</p>
            <ul className="about-list">
              <li><CheckCircle2 size={16} /> <span>{t.c1I1}</span></li>
              <li><CheckCircle2 size={16} /> <span>{t.c1I2}</span></li>
              <li><CheckCircle2 size={16} /> <span>{t.c1I3}</span></li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="about-card card-hover">
            <div className="card-icon-box bg-amber-light">
              <Brain size={28} />
            </div>
            <h3>{t.card2H}</h3>
            <p>{t.card2P}</p>
            <ul className="about-list">
              <li><CheckCircle2 size={16} /> <span>{t.c2I1}</span></li>
              <li><CheckCircle2 size={16} /> <span>{t.c2I2}</span></li>
              <li><CheckCircle2 size={16} /> <span>{t.c2I3}</span></li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="about-card card-hover">
            <div className="card-icon-box bg-emerald-light">
              <Leaf size={28} />
            </div>
            <h3>{t.card3H}</h3>
            <p>{t.card3P}</p>
            <ul className="about-list">
              <li><CheckCircle2 size={16} /> <span>{t.c3I1}</span></li>
              <li><CheckCircle2 size={16} /> <span>{t.c3I2}</span></li>
              <li><CheckCircle2 size={16} /> <span>{t.c3I3}</span></li>
            </ul>
          </div>

          {/* Card 4 */}
          <div className="about-card card-hover">
            <div className="card-icon-box bg-blue-light">
              <Users size={28} />
            </div>
            <h3>{t.card4H}</h3>
            <p>{t.card4P}</p>
            <ul className="about-list">
              <li><CheckCircle2 size={16} /> <span>{t.c4I1}</span></li>
              <li><CheckCircle2 size={16} /> <span>{t.c4I2}</span></li>
              <li><CheckCircle2 size={16} /> <span>{t.c4I3}</span></li>
            </ul>
          </div>
        </div>

        {/* Video Guidance Section (Original Site Videos) */}
        <div className="video-showcase-box" id="videos">
          <div className="video-box-header">
            <div>
              <span className="sub-badge">{t.videoBadge}</span>
              <h3>{t.videoHeading}</h3>
            </div>
            <p>{t.videoSub}</p>
          </div>

          <div className="video-grid">
            {/* Video 1 */}
            <div className="video-card">
              <div className="video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/DViA3VPunx4"
                  title="Physical Health and Safety for Farmers"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-card-body">
                <span className="video-tag">
                  <Stethoscope size={15} /> <span>{t.v1Tag}</span>
                </span>
                <h4>{t.v1Title}</h4>
                <p>{t.v1Desc}</p>
              </div>
            </div>

            {/* Video 2 */}
            <div className="video-card">
              <div className="video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/MaFv-SMgHb0"
                  title="Mental Health and Well-being for Farmers"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-card-body">
                <span className="video-tag">
                  <Smile size={15} /> <span>{t.v2Tag}</span>
                </span>
                <h4>{t.v2Title}</h4>
                <p>{t.v2Desc}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
