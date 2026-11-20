import React, { useState } from 'react';
import { CalendarCheck, ShieldCheck, CheckCircle2, Printer } from 'lucide-react';
import { getApiUrl } from '../config/api';

export default function BookingModal({
  isOpen,
  onClose,
  serviceName,
  servicePrice,
  serviceDuration
}) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    slot: '10:00 AM - 11:00 AM',
    name: '',
    phone: '',
    village: '',
    mode: 'Phone Call',
    notes: ''
  });

  const [ticketId, setTicketId] = useState('');
  const [loading, setLoading] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(getApiUrl('/api/bookings'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingData,
          serviceName,
          servicePrice,
          serviceDuration
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setTicketId(data.token);
        if (data.contactInfo?.whatsappDirect) {
          setWhatsappUrl(data.contactInfo.whatsappDirect);
        }
      } else {
        const fallbackId = '#AKK-' + Math.floor(1000 + Math.random() * 9000);
        setTicketId(fallbackId);
      }
    } catch (err) {
      console.warn('Backend offline, using fallback token:', err);
      const fallbackId = '#AKK-' + Math.floor(1000 + Math.random() * 9000);
      setTicketId(fallbackId);
    } finally {
      setLoading(false);
      setStep(2);
    }
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="booking-modal active">
      <div className="booking-overlay" onClick={handleReset}></div>
      <div className="booking-dialog">
        <div className="booking-header">
          <div className="booking-header-title">
            <CalendarCheck size={28} />
            <div>
              <h3>ऑनलाइन परामर्श बुकिंग</h3>
              <span className="booking-modal-sub">
                {serviceName} • ₹{servicePrice} ({serviceDuration})
              </span>
            </div>
          </div>
          <button className="booking-close" onClick={handleReset}>&times;</button>
        </div>

        <div className="booking-body">
          {step === 1 ? (
            <form onSubmit={handleSubmit}>
              <div className="booking-step-badge">चरण 1: समय और स्लॉट चुनें</div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="book-date">परामर्श तिथि (Date) *</label>
                  <input
                    type="date"
                    id="book-date"
                    name="date"
                    required
                    value={bookingData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="book-slot">समय स्लॉट (Time Slot) *</label>
                  <select
                    id="book-slot"
                    name="slot"
                    required
                    value={bookingData.slot}
                    onChange={handleChange}
                  >
                    <option value="10:00 AM - 11:00 AM">प्रातः 10:00 - 11:00 (सुबह)</option>
                    <option value="12:00 PM - 01:00 PM">दोपहर 12:00 - 01:00</option>
                    <option value="03:00 PM - 04:00 PM">अपराह्न 03:00 - 04:00</option>
                    <option value="05:00 PM - 06:00 PM">सायं 05:00 - 06:00 (शाम)</option>
                  </select>
                </div>
              </div>

              <div className="booking-step-badge">चरण 2: किसान का विवरण</div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="book-name">पूरा नाम (Full Name) *</label>
                  <input
                    type="text"
                    id="book-name"
                    name="name"
                    required
                    placeholder="उदा. रामेश कुमार"
                    value={bookingData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="book-phone">मोबाइल नंबर (Mobile) *</label>
                  <input
                    type="tel"
                    id="book-phone"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    placeholder="9876543210"
                    value={bookingData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="book-village">गाँव व जिला (Village & District) *</label>
                  <input
                    type="text"
                    id="book-village"
                    name="village"
                    required
                    placeholder="ग्राम, जिला"
                    value={bookingData.village}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="book-mode">परामर्श माध्यम (Mode)</label>
                  <select
                    id="book-mode"
                    name="mode"
                    value={bookingData.mode}
                    onChange={handleChange}
                  >
                    <option value="Phone Call">फ़ोन कॉल (Direct Call)</option>
                    <option value="WhatsApp Video">व्हाट्सएप वीडियो कॉल (Video Call)</option>
                    <option value="In Person VGU Jaipur">विवेकानंद ग्लोबल यूनिवर्सिटी जयपुर में व्यक्तिगत भेंट</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="book-notes">अपनी मुख्य समस्या या प्रश्न लिखें (Notes)</label>
                <textarea
                  id="book-notes"
                  name="notes"
                  rows="2"
                  placeholder="फसल का नाम, बीमारी के लक्षण या पशु की स्थिति..."
                  value={bookingData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="booking-summary-box">
                <div className="summary-line">
                  <span>कुल देय शुल्क (Total Nominal Fee):</span>
                  <strong className="summary-amount">₹{servicePrice}</strong>
                </div>
                <p className="summary-note">
                  <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  बुकिंग सुरक्षित है। विशेषज्ञ कॉल के समय विवरण सत्यापित करेंगे।
                </p>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg">
                <CheckCircle2 size={18} />
                <span>बुकिंग कन्फर्म करें</span>
              </button>
            </form>
          ) : (
            <div className="booking-success-card">
              <div className="success-icon">
                <CheckCircle2 size={54} />
              </div>
              <h3>बुकिंग सफलतापूर्वक दर्ज की गई!</h3>
              <p className="success-msg">धन्यवाद! आपका परामर्श स्लॉट आरक्षित हो गया है।</p>

              <div className="pass-ticket" id="printable-ticket">
                <div className="pass-header">
                  <img src="/assets/images/logo.jpg" alt="Logo" className="pass-logo" />
                  <div>
                    <strong>कृषि और किसान स्वास्थ्य</strong>
                    <span>परामर्श पर्ची (Digital E-Pass)</span>
                  </div>
                </div>
                <div className="pass-details">
                  <div><strong>टोकन आईडी:</strong> {ticketId}</div>
                  <div><strong>सेवा:</strong> {serviceName}</div>
                  <div><strong>किसान नाम:</strong> {bookingData.name}</div>
                  <div><strong>मोबाइल:</strong> {bookingData.phone}</div>
                  <div><strong>स्थान:</strong> {bookingData.village}</div>
                  <div><strong>तारीख:</strong> {bookingData.date}</div>
                  <div><strong>स्लॉट:</strong> {bookingData.slot}</div>
                  <div><strong>माध्यम:</strong> {bookingData.mode}</div>
                  <div><strong>शुल्क:</strong> ₹{servicePrice}</div>
                </div>
              </div>

              <div className="pass-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <button className="btn btn-secondary" onClick={() => window.print()}>
                  <Printer size={16} /> पर्ची प्रिंट करें
                </button>
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm"
                    style={{ background: '#25d366', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', padding: '10px 16px', borderRadius: '4px', fontWeight: 'bold' }}
                  >
                    <i className="fa-brands fa-whatsapp"></i> व्हाट्सएप सहायता (+91 8252663421)
                  </a>
                )}
                <button className="btn btn-outline" style={{ color: 'var(--primary)', borderColor: 'var(--primary)' }} onClick={handleReset}>
                  वापस होम पर जाएं
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
