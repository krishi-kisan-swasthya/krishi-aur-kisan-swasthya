import React from 'react';
import { ChevronRight, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <img src="/assets/images/logo.jpg" alt="Logo" className="footer-logo" />
            <div>
              <h4>{t.brandHindi}</h4>
              <span>{t.brandEn}</span>
            </div>
          </div>
          <p className="footer-about">{t.footerAbout}</p>
          <div className="footer-socials">
            <a
              href="https://www.facebook.com/profile.php?id=61574636587556"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/krisheaurkishan"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://wa.me/918252663421"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a href="mailto:agrihealth37@gmail.com" title="Email">
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col links-col">
          <h4 className="footer-heading">{t.footerQuickLinks}</h4>
          <ul className="footer-links">
            <li><a href="#home"><ChevronRight size={14} /> <span>{t.navHome}</span></a></li>
            <li><a href="#about"><ChevronRight size={14} /> <span>{t.navAbout}</span></a></li>
            <li><a href="#cattle"><ChevronRight size={14} /> <span>{t.navCattle}</span></a></li>
            <li><a href="#wellness"><ChevronRight size={14} /> <span>{t.navWellness}</span></a></li>
            <li><a href="#services"><ChevronRight size={14} /> <span>{t.navServices}</span></a></li>
            <li><a href="#gallery"><ChevronRight size={14} /> <span>{t.navGallery}</span></a></li>
            <li><a href="#contact"><ChevronRight size={14} /> <span>{t.navContact}</span></a></li>
          </ul>
        </div>

        {/* Services Column */}
        <div className="footer-col services-col">
          <h4 className="footer-heading">{t.footerServices}</h4>
          <ul className="footer-links">
            <li><a href="#services"><ChevronRight size={14} /> Farmers Market Tour (₹50)</a></li>
            <li><a href="#services"><ChevronRight size={14} /> Nutrition Consultation (₹50)</a></li>
            <li><a href="#services"><ChevronRight size={14} /> Pest Control Consultation (₹50)</a></li>
            <li><a href="#cattle"><ChevronRight size={14} /> Cattle Nutrition & Milk Guide</a></li>
            <li><a href="#wellness"><ChevronRight size={14} /> Free Rural Health Checkup</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">{t.footerContact}</h4>
          <p>
            <MapPin size={18} />
            <span>Vivekananda Global University, Sector 36, NRI Road, Jagatpura, Jaipur, Rajasthan 303012</span>
          </p>
          <p>
            <Phone size={18} />
            <a href="tel:+918252663421">+91 8252663421</a>
          </p>
          <p>
            <Mail size={18} />
            <a href="mailto:agrihealth37@gmail.com">agrihealth37@gmail.com</a>
          </p>
          <p>
            <Clock size={18} />
            <span>प्रातः 09:00 - सायं 06:00 (सोमवार - शनिवार)</span>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>© 2026 <strong>कृषि और किसान स्वास्थ्य</strong> (Agriculture And Farmers Health). सर्वाधिकार सुरक्षित।</p>
          <p className="footer-credit">सहयोग: विवेकानंद ग्लोबल यूनिवर्सिटी, जयपुर (Rajasthan)</p>
        </div>
      </div>
    </footer>
  );
}
