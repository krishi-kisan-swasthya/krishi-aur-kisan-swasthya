import React, { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { galleryData } from '../data/siteData';

export default function Gallery({ t, lang, onOpenLightbox }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = activeFilter === 'all'
    ? galleryData
    : galleryData.filter(item => item.category === activeFilter);

  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">{t.galTag}</span>
          <h2 className="section-title">{t.galTitle}</h2>
          <div className="section-divider"></div>
          <p className="section-lead">{t.galLead}</p>
        </div>

        {/* Gallery Tabs */}
        <div className="gallery-tabs">
          <button
            className={`gallery-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            {t.filterAll}
          </button>
          <button
            className={`gallery-tab ${activeFilter === 'farming' ? 'active' : ''}`}
            onClick={() => setActiveFilter('farming')}
          >
            {t.filterFarming}
          </button>
          <button
            className={`gallery-tab ${activeFilter === 'cattle' ? 'active' : ''}`}
            onClick={() => setActiveFilter('cattle')}
          >
            {t.filterCattle}
          </button>
          <button
            className={`gallery-tab ${activeFilter === 'health' ? 'active' : ''}`}
            onClick={() => setActiveFilter('health')}
          >
            {t.filterHealth}
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.map(item => {
            const title = lang === 'hi' ? item.titleHi : item.titleEn;
            const caption = lang === 'hi' ? item.captionHi : item.captionEn;

            return (
              <div
                key={item.id}
                className="gallery-item"
                onClick={() => onOpenLightbox(item.image, caption)}
              >
                <img src={item.image} alt={title} loading="lazy" />
                <div className="gallery-overlay">
                  <span className="gallery-badge">
                    {item.category === 'farming' ? 'खेती' : item.category === 'cattle' ? 'पशुपालन' : 'स्वास्थ्य'}
                  </span>
                  <h4>{title}</h4>
                  <div className="zoom-icon">
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
