import React, { useState } from 'react';
import { Sun, Shield, Activity, HeartHandshake, ChevronDown, Hospital } from 'lucide-react';

export default function HealthWellness({ t }) {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const accordionItems = [
    {
      title: t.acc1Title,
      desc: t.acc1Desc,
      icon: <Sun size={20} className="text-warning" style={{ color: '#f59e0b' }} />
    },
    {
      title: t.acc2Title,
      desc: t.acc2Desc,
      icon: <Shield size={20} style={{ color: '#1e5f38' }} />
    },
    {
      title: t.acc3Title,
      desc: t.acc3Desc,
      icon: <Activity size={20} style={{ color: '#059669' }} />
    },
    {
      title: t.acc4Title,
      desc: t.acc4Desc,
      icon: <HeartHandshake size={20} style={{ color: '#dc2626' }} />
    }
  ];

  return (
    <section className="section wellness-section" id="wellness">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">{t.wellTag}</span>
          <h2 className="section-title">{t.wellTitle}</h2>
          <div className="section-divider"></div>
          <p className="section-lead">{t.wellLead}</p>
        </div>

        <div className="wellness-layout">
          <div className="wellness-media">
            <img
              src="/assets/images/health-camp.jpg"
              alt="Rural Health Camp Vivekananda Global University"
              className="wellness-img"
            />
            <div className="wellness-floating-card">
              <Hospital size={32} />
              <div>
                <strong>निशुल्क स्वास्थ्य शिविर</strong>
                <span>विवेकानंद ग्लोबल यूनिवर्सिटी, जयपुर सहयोग</span>
              </div>
            </div>
          </div>

          <div className="wellness-accordion">
            {accordionItems.map((item, idx) => (
              <div
                key={idx}
                className={`accordion-item ${activeAccordion === idx ? 'active' : ''}`}
              >
                <button
                  className="accordion-header"
                  onClick={() => setActiveAccordion(prev => prev === idx ? -1 : idx)}
                >
                  <span>
                    {item.icon}
                    <span>{item.title}</span>
                  </span>
                  <ChevronDown className="chevron-icon" size={18} />
                </button>
                <div className="accordion-body">
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
