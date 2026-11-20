import React from 'react';
import { Award, Crown, Milk, Leaf, ShieldAlert, Dumbbell, Scale, FileText, Wheat } from 'lucide-react';

export default function OurCattle({ t, onOpenBookingModal }) {
  return (
    <section className="section cattle-section" id="cattle">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">{t.cattleTag}</span>
          <h2 className="section-title">{t.cattleTitle}</h2>
          <div className="section-divider"></div>
          <p className="section-lead">{t.cattleLead}</p>
        </div>

        {/* Cattle Showcase Row */}
        <div className="cattle-showcase">
          {/* Cow Card */}
          <div className="cattle-card">
            <div className="cattle-card-img-wrap">
              <img src="/assets/images/cow.jpg" alt="Indian Sahiwal Dairy Cow" className="cattle-card-img" />
              <div className="cattle-badge">
                <Award size={16} /> <span>{t.cowBadge}</span>
              </div>
            </div>
            <div className="cattle-card-content">
              <h3 className="cattle-name">{t.cowH}</h3>
              <p className="cattle-desc">"{t.cowP}"</p>

              <div className="cattle-features">
                <div className="c-feat">
                  <Milk size={22} />
                  <div>
                    <strong>{t.cowF1T}</strong>
                    <span>{t.cowF1D}</span>
                  </div>
                </div>
                <div className="c-feat">
                  <Leaf size={22} />
                  <div>
                    <strong>{t.cowF2T}</strong>
                    <span>{t.cowF2D}</span>
                  </div>
                </div>
                <div className="c-feat">
                  <ShieldAlert size={22} />
                  <div>
                    <strong>{t.cowF3T}</strong>
                    <span>{t.cowF3D}</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => onOpenBookingModal("Cattle Health Advisory")}
                >
                  <FileText size={17} />
                  <span>{t.btnCowAdvisory}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Buffalo Card */}
          <div className="cattle-card reverse-on-desktop">
            <div className="cattle-card-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80"
                alt="Murrah Buffalo"
                className="cattle-card-img"
              />
              <div className="cattle-badge bg-black-badge">
                <Crown size={16} /> <span>{t.bufBadge}</span>
              </div>
            </div>
            <div className="cattle-card-content">
              <h3 className="cattle-name">{t.bufH}</h3>
              <p className="cattle-desc">"{t.bufP}"</p>

              <div className="cattle-features">
                <div className="c-feat">
                  <Milk size={22} />
                  <div>
                    <strong>{t.bufF1T}</strong>
                    <span>{t.bufF1D}</span>
                  </div>
                </div>
                <div className="c-feat">
                  <Dumbbell size={22} />
                  <div>
                    <strong>{t.bufF2T}</strong>
                    <span>{t.bufF2D}</span>
                  </div>
                </div>
                <div className="c-feat">
                  <Scale size={22} />
                  <div>
                    <strong>{t.bufF3T}</strong>
                    <span>{t.bufF3D}</span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => onOpenBookingModal("Buffalo Nutrition & Dairy Chart")}
                >
                  <Wheat size={17} />
                  <span>{t.btnBufAdvisory}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cattle Care Tips */}
        <div className="cattle-tips-grid">
          <div className="tip-card">
            <div className="tip-num">01</div>
            <h4>{t.tip1H}</h4>
            <p>{t.tip1P}</p>
          </div>
          <div className="tip-card">
            <div className="tip-num">02</div>
            <h4>{t.tip2H}</h4>
            <p>{t.tip2P}</p>
          </div>
          <div className="tip-card">
            <div className="tip-num">03</div>
            <h4>{t.tip3H}</h4>
            <p>{t.tip3P}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
