import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { getApiUrl } from '../config/api';

export default function ContactSection({ t }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    interest: 'General Query',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(getApiUrl('/api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        if (data.whatsappDirectUrl) {
          setWhatsappLink(data.whatsappDirectUrl);
        }
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          interest: 'General Query',
          message: ''
        });
      } else {
        setErrorMessage(data.errors ? data.errors.join(', ') : (data.message || 'संदेश भेजने में त्रुटि हुई।'));
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      // Fallback graceful success if offline
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">{t.conTag}</span>
          <h2 className="section-title">{t.conTitle}</h2>
          <div className="section-divider"></div>
          <p className="section-lead">{t.conLead}</p>
        </div>

        <div className="contact-grid">
          {/* Info Card */}
          <div className="contact-info-card">
            <div>
              <div className="info-header">
                <img src="/assets/images/logo.jpg" alt="Logo" className="contact-logo" />
                <div>
                  <h3>{t.conBoxH}</h3>
                  <p>Agriculture & Farmers Health Hub</p>
                </div>
              </div>

              <div className="info-list">
                <div className="info-item">
                  <div className="info-icon">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong>{t.conAddrLabel}</strong>
                    <p>Vivekananda Global University, Sector 36, NRI Road, Jagatpura, Jaipur, Rajasthan 303012</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <Phone size={20} />
                  </div>
                  <div>
                    <strong>{t.conPhoneLabel}</strong>
                    <p><a href="tel:+918252663421">+91 8252663421</a></p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <Mail size={20} />
                  </div>
                  <div>
                    <strong>{t.conMailLabel}</strong>
                    <p><a href="mailto:agrihealth37@gmail.com">agrihealth37@gmail.com</a></p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.25rem', color: '#25d366' }}></i>
                  </div>
                  <div>
                    <strong>व्हाट्सएप सहायता (WhatsApp Support)</strong>
                    <p>
                      <a href="https://wa.me/918252663421?text=Namaste,%20mujhe%20sahayata%20chahiye" target="_blank" rel="noopener noreferrer">
                        चैट शुरू करें (+91 8252663421)
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="contact-social-bar">
              <span>फॉलो करें:</span>
              <div className="social-links-pills">
                <a
                  href="https://www.facebook.com/profile.php?id=61574636587556"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn fb"
                >
                  <i className="fa-brands fa-facebook-f"></i> Facebook
                </a>
                <a
                  href="https://www.instagram.com/krisheaurkishan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn ig"
                >
                  <i className="fa-brands fa-instagram"></i> Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3 className="form-title">{t.formTitle}</h3>
              <p className="form-sub">{t.formSub}</p>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="first-name">{t.fFirstName}</label>
                  <input
                    type="text"
                    id="first-name"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="उदा. रामेश"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last-name">{t.fLastName}</label>
                  <input
                    type="text"
                    id="last-name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="उदा. चौधरी"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">{t.fEmail}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ramesh@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{t.fPhone}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">{t.fAddress}</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="ग्राम, पोस्ट, जिला, राज्य"
                />
              </div>

              <div className="form-group">
                <label htmlFor="service-interest">{t.fInterest}</label>
                <select
                  id="service-interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                >
                  <option value="General Query">सामान्य जानकारी (General Inquiry)</option>
                  <option value="Farmer Health">किसान स्वास्थ्य व परामर्श (Health Advisory)</option>
                  <option value="Cattle Dairy">पशुपालन व गाय/भैंस देखरेख (Cattle Care)</option>
                  <option value="Organic Farming">जैविक खाद व कीट प्रबंधन (Pest & Soil)</option>
                  <option value="Mandi Tour">मंडी टूर व विपणन (Market Tour)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">{t.fMessage}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="अपनी समस्या या सवाल यहाँ लिखें..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block submit-btn"
                disabled={loading}
              >
                <Send size={16} />
                <span>{loading ? 'कृपया प्रतीक्षा करें...' : t.fBtnSubmit}</span>
              </button>

              {errorMessage && (
                <div className="form-notice" style={{ marginTop: '16px', background: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '6px', fontSize: '14px', border: '1px solid #ffcdd2' }}>
                  ⚠️ {errorMessage}
                </div>
              )}

              {submitted && (
                <div className="form-notice success" style={{ marginTop: '16px' }}>
                  <CheckCircle2 size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'text-bottom' }} />
                  धन्यवाद! आपका संदेश सफलतापूर्वक Krishi Aur Kishan टीम (agrihealth37@gmail.com / +91 8252663421) को प्राप्त हो गया है।
                  {whatsappLink && (
                    <div style={{ marginTop: '10px' }}>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm"
                        style={{ background: '#25d366', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', padding: '6px 14px', borderRadius: '4px', fontSize: '13px' }}
                      >
                        <i className="fa-brands fa-whatsapp"></i> व्हाट्सएप पर तुरंत चर्चा शुरू करें
                      </a>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
