import React from 'react';
import { CalendarPlus, PlayCircle } from 'lucide-react';

export default function Hero({ t, onOpenBookingModal }) {
  return (
    <section className="hero-section" id="home">
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge animate-fade-down">
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="hero-title animate-fade-up">
            <span className="hero-title-en">{t.heroTitleEn}</span>
            <span className="hero-title-hi">{t.heroTitleHi}</span>
          </h1>

          <p className="hero-subtitle animate-fade-up delay-1">
            "{t.heroDesc}"
          </p>

          <div className="hero-buttons animate-fade-up delay-2">
            <button
              className="btn btn-primary btn-lg shadow-glow"
              onClick={() => onOpenBookingModal()}
            >
              <CalendarPlus size={20} />
              <span>{t.heroBtnBook}</span>
            </button>
            <a href="#cattle" className="btn btn-outline btn-lg">
              <i className="fa-solid fa-cow"></i>
              <span>{t.heroBtnCattle}</span>
            </a>
            <a href="#videos" className="btn btn-glass btn-lg">
              <PlayCircle size={20} />
              <span>{t.heroBtnVideo}</span>
            </a>
          </div>

          {/* Trust Stats Bar */}
          <div className="hero-stats animate-fade-up delay-3">
            <div className="stat-card">
              <div className="stat-number">15,000+</div>
              <div className="stat-label">{t.statFarmers}</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">{t.statCamps}</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <div className="stat-number">₹50</div>
              <div className="stat-label">{t.statFee}</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">{t.statHelpline}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
