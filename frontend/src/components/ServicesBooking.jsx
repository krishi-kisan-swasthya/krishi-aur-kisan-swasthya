import React from 'react';
import { Clock, CalendarCheck, ShoppingCart, HeartHandshake } from 'lucide-react';
import { servicesData } from '../data/siteData';

export default function ServicesBooking({ t, onOpenBookingModal, onAddToCart }) {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">{t.servTag}</span>
          <h2 className="section-title">{t.servTitle}</h2>
          <div className="section-divider"></div>
          <p className="section-lead">{t.servLead}</p>
        </div>

        <div className="services-grid">
          {servicesData.map(service => {
            const title = t[service.titleKey] || service.id;
            const desc = t[service.descKey] || '';

            return (
              <div
                key={service.id}
                className={`service-card ${service.isPopular ? 'featured-service' : ''}`}
              >
                {service.isPopular && (
                  <div className="featured-badge">{t.badgePopular}</div>
                )}
                
                <div className="service-image-box">
                  <img src={service.image} alt={title} className="service-img" />
                  <span className="service-duration">
                    <Clock size={13} /> {service.duration}
                  </span>
                </div>

                <div className="service-body">
                  <div className="service-price-tag">₹{service.price}</div>
                  <h3 className="service-title">{title}</h3>
                  <p className="service-desc">{desc}</p>

                  <div className="service-meta">
                    <span>{service.expert}</span>
                    <span>{service.mode}</span>
                  </div>

                  <div className="service-actions" style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => onOpenBookingModal(title, service.price, service.duration)}
                    >
                      <CalendarCheck size={16} />
                      <span>{t.btnBookNow}</span>
                    </button>
                    <button
                      className="btn btn-outline"
                      style={{ borderColor: 'var(--primary)', color: 'var(--primary)', padding: '10px 14px' }}
                      title="कार्ट में जोड़ें"
                      onClick={() => onAddToCart(service, title)}
                    >
                      <ShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Camp Banner */}
        <div className="free-camp-banner">
          <div className="camp-icon">
            <HeartHandshake size={48} />
          </div>
          <div className="camp-content">
            <h4>{t.freeCampH}</h4>
            <p>{t.freeCampP}</p>
          </div>
          <a href="#contact" className="btn btn-secondary">
            <span>{t.btnInquire}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
