import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp } from 'lucide-react';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="floating-actions">
      {/* Helpline Call */}
      <a
        href="tel:+918252663421"
        className="floating-btn call-float"
        title="सीधे कॉल करें (+91 8252663421)"
        aria-label="Call Helpline"
      >
        <Phone size={22} />
        <span className="float-tooltip">हेल्पलाइन: +91 8252663421</span>
      </a>

      {/* WhatsApp Chat */}
      <a
        href="https://wa.me/918252663421?text=Namaste%20AgriHealth,%20mujhe%20krishi%20aur%20swasthya%20ke%20bare%20me%20jankari%20chahiye"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp-float"
        title="व्हाट्सएप सहायता"
        aria-label="WhatsApp Chat"
      >
        <i className="fa-brands fa-whatsapp"></i>
        <span className="float-tooltip">व्हाट्सएप सहायता</span>
      </a>

      {/* Scroll to Top */}
      <button
        className={`floating-btn scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        title="ऊपर जाएं"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
