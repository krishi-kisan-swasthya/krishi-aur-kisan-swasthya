import React, { useState } from 'react';
import { CalendarCheck, Stethoscope } from 'lucide-react';

export default function Navbar({ t, cartCount, onOpenCart, onOpenBookingModal }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(prev => !prev);
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="container nav-container">
          <a href="#home" className="brand-logo" id="brand-logo">
            <img src="/assets/images/logo.jpg" alt="Logo" className="brand-img" />
            <div className="brand-text">
              <span className="brand-hindi">{t.brandHindi}</span>
              <span className="brand-en">{t.brandEn}</span>
            </div>
          </a>

          {/* Desktop Nav Menu */}
          <ul className="nav-menu">
            <li><a href="#home" className="nav-link">{t.navHome}</a></li>
            <li><a href="#about" className="nav-link">{t.navAbout}</a></li>
            <li><a href="#cattle" className="nav-link">{t.navCattle}</a></li>
            <li><a href="#wellness" className="nav-link">{t.navWellness}</a></li>
            <li><a href="#services" className="nav-link">{t.navServices}</a></li>
            <li><a href="#gallery" className="nav-link">{t.navGallery}</a></li>
            <li><a href="#contact" className="nav-link">{t.navContact}</a></li>
          </ul>

          {/* Nav Actions */}
          <div className="nav-actions">
            {/* Cart / Bookings Drawer Toggle */}
            <button
              className="cart-btn"
              onClick={onOpenCart}
              aria-label="View Booking Cart"
              title="परामर्श कार्ट (Booking Cart)"
            >
              <CalendarCheck size={20} />
              <span className="cart-badge">{cartCount}</span>
            </button>

            {/* CTA Button */}
            <button
              className="btn btn-primary nav-cta-btn"
              onClick={() => onOpenBookingModal()}
            >
              <Stethoscope size={16} />
              <span>{t.navCta}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className="hamburger"
              onClick={toggleMobile}
              aria-label="Toggle navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-brand">
            <img src="/assets/images/logo.jpg" alt="Logo" className="drawer-logo" />
            <span>{t.brandHindi}</span>
          </div>
          <button className="drawer-close" onClick={closeMobile} aria-label="Close menu">&times;</button>
        </div>
        <ul className="drawer-links">
          <li><a href="#home" className="drawer-link" onClick={closeMobile}>{t.navHome}</a></li>
          <li><a href="#about" className="drawer-link" onClick={closeMobile}>{t.navAbout}</a></li>
          <li><a href="#cattle" className="drawer-link" onClick={closeMobile}>{t.navCattle}</a></li>
          <li><a href="#wellness" className="drawer-link" onClick={closeMobile}>{t.navWellness}</a></li>
          <li><a href="#services" className="drawer-link" onClick={closeMobile}>{t.navServices}</a></li>
          <li><a href="#gallery" className="drawer-link" onClick={closeMobile}>{t.navGallery}</a></li>
          <li><a href="#contact" className="drawer-link" onClick={closeMobile}>{t.navContact}</a></li>
        </ul>
        <div className="drawer-contact-info">
          <p><i className="fa-solid fa-phone"></i> +91 8252663421</p>
          <p><i className="fa-solid fa-envelope"></i> agrihealth@gmail.com</p>
          <p><i className="fa-solid fa-location-dot"></i> VGU, Jaipur, Rajasthan</p>
        </div>
      </div>
      {mobileOpen && <div className="drawer-backdrop" onClick={closeMobile}></div>}
    </>
  );
}
