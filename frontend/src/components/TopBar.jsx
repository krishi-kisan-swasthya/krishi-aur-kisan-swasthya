import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function TopBar({ lang, setLang, t }) {
  return (
    <header className="top-bar" id="top-bar">
      <div className="container top-bar-container">
        <div className="top-bar-left">
          <a href="tel:+918252663421" className="top-item" title="Call Helpline">
            <Phone size={15} />
            <span>+91 8252663421</span>
          </a>
          <a href="mailto:agrihealth37@gmail.com" className="top-item" title="Send Email">
            <Mail size={15} />
            <span>agrihealth37@gmail.com</span>
          </a>
          <span className="top-item hide-on-mobile">
            <MapPin size={15} />
            <span>{t.topLocation}</span>
          </span>
        </div>

        <div className="top-bar-right">
          {/* Language Switcher */}
          <div className="lang-switch-box">
            <button
              className={`lang-btn ${lang === 'hi' ? 'active' : ''}`}
              onClick={() => setLang('hi')}
              aria-label="Switch to Hindi"
            >
              हिन्दी
            </button>
            <span className="lang-divider">|</span>
            <button
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              aria-label="Switch to English"
            >
              English
            </button>
          </div>

          {/* Social Links */}
          <div className="top-socials">
            <a
              href="https://www.facebook.com/profile.php?id=61574636587556"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/krisheaurkishan"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://wa.me/918252663421?text=Namaste%20AgriHealth,%20mujhe%20sahayata%20chahiye"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-top"
              title="WhatsApp"
              aria-label="WhatsApp"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
