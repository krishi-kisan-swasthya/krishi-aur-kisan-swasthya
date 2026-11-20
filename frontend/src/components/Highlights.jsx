import React from 'react';
import { HeartPulse, Sprout, HandHeart } from 'lucide-react';

export default function Highlights({ t }) {
  return (
    <section className="quick-highlights">
      <div className="container highlights-grid">
        <div className="highlight-item">
          <div className="highlight-icon">
            <HeartPulse size={26} />
          </div>
          <div className="highlight-info">
            <h3>{t.feat1Title}</h3>
            <p>{t.feat1Desc}</p>
          </div>
        </div>

        <div className="highlight-item">
          <div className="highlight-icon">
            <Sprout size={26} />
          </div>
          <div className="highlight-info">
            <h3>{t.feat2Title}</h3>
            <p>{t.feat2Desc}</p>
          </div>
        </div>

        <div className="highlight-item">
          <div className="highlight-icon">
            <i className="fa-solid fa-cow" style={{ fontSize: '1.4rem' }}></i>
          </div>
          <div className="highlight-info">
            <h3>{t.feat3Title}</h3>
            <p>{t.feat3Desc}</p>
          </div>
        </div>

        <div className="highlight-item">
          <div className="highlight-icon">
            <HandHeart size={26} />
          </div>
          <div className="highlight-info">
            <h3>{t.feat4Title}</h3>
            <p>{t.feat4Desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
