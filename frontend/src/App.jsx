import React, { useState } from 'react';
import { translations } from './data/translations';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import AboutUs from './components/AboutUs';
import OurCattle from './components/OurCattle';
import HealthWellness from './components/HealthWellness';
import ServicesBooking from './components/ServicesBooking';
import Gallery from './components/Gallery';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import CartDrawer from './components/CartDrawer';
import FloatingButtons from './components/FloatingButtons';

export default function App() {
  const [lang, setLang] = useState('hi');
  const t = translations[lang] || translations.hi;

  // Cart State
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Booking Modal State
  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    serviceName: 'General Advisory',
    servicePrice: 50,
    serviceDuration: '1 hr'
  });

  // Lightbox Modal State
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    image: '',
    caption: ''
  });

  // Handlers
  const openBookingModal = (serviceName = 'General Advisory', servicePrice = 50, serviceDuration = '1 hr') => {
    setBookingModal({
      isOpen: true,
      serviceName,
      servicePrice,
      serviceDuration
    });
  };

  const closeBookingModal = () => {
    setBookingModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleAddToCart = (service, title) => {
    setCartItems(prev => [
      ...prev,
      {
        id: service.id,
        title: title,
        price: service.price,
        duration: service.duration
      }
    ]);
    setCartOpen(true);
  };

  const handleRemoveCartItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleCartCheckout = () => {
    setCartOpen(false);
    if (cartItems.length > 0) {
      const firstItem = cartItems[0];
      openBookingModal(firstItem.title, firstItem.price, firstItem.duration);
    } else {
      openBookingModal();
    }
  };

  const openLightbox = (image, caption) => {
    setLightbox({
      isOpen: true,
      image,
      caption
    });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, image: '', caption: '' });
  };

  return (
    <div className="app-container">
      {/* Top Contact Bar */}
      <TopBar lang={lang} setLang={setLang} t={t} />

      {/* Main Sticky Navbar */}
      <Navbar
        t={t}
        cartCount={cartItems.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenBookingModal={() => openBookingModal(t.s2Title, 50, '1 hr')}
      />

      <main>
        {/* Hero Section */}
        <Hero
          t={t}
          onOpenBookingModal={() => openBookingModal(t.s2Title, 50, '1 hr')}
        />

        {/* Feature Highlights Banner */}
        <Highlights t={t} />

        {/* About Us & Video Awareness */}
        <AboutUs t={t} />

        {/* Our Cattle (Cows & Buffaloes) */}
        <OurCattle
          t={t}
          onOpenBookingModal={(service) => openBookingModal(service, 50, '45 min')}
        />

        {/* Farmer Health & Occupational Safety */}
        <HealthWellness t={t} />

        {/* Services & Online Booking */}
        <ServicesBooking
          t={t}
          onOpenBookingModal={(name, price, dur) => openBookingModal(name, price, dur)}
          onAddToCart={handleAddToCart}
        />

        {/* Photo Gallery */}
        <Gallery
          t={t}
          lang={lang}
          onOpenLightbox={openLightbox}
        />

        {/* Contact Form & Info */}
        <ContactSection t={t} />
      </main>

      {/* Modern Footer */}
      <Footer t={t} />

      {/* Floating Action Buttons */}
      <FloatingButtons />

      {/* Booking Appointment Modal */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        onClose={closeBookingModal}
        serviceName={bookingModal.serviceName}
        servicePrice={bookingModal.servicePrice}
        serviceDuration={bookingModal.serviceDuration}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCartCheckout}
      />

      {/* Image Lightbox Modal */}
      {lightbox.isOpen && (
        <div className="lightbox-modal active">
          <div className="lightbox-overlay" onClick={closeLightbox}></div>
          <div className="lightbox-content">
            <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
            <img src={lightbox.image} alt={lightbox.caption} className="lightbox-img" />
            <div className="lightbox-caption">{lightbox.caption}</div>
          </div>
        </div>
      )}
    </div>
  );
}
