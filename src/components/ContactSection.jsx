import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send, CheckCircle2 } from 'lucide-react';
import { submitInquiryToApi } from '../services/api';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    locality: 'Indiranagar',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Save inquiry to Python SQLite database
    await submitInquiryToApi({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      locality: formData.locality,
      message: formData.message
    });

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', locality: 'Indiranagar', message: '' });
    }, 4000);
  };

  return (
    <section id="contact-section" style={{ padding: '4.5rem 0', backgroundColor: '#0f172a', color: '#ffffff' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem auto' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            Get In Touch
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.5px' }}>
            Contact SLN Properties Bengaluru
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.02rem' }}>
            Looking to buy, sell, or rent property in Bengaluru? Reach out to Manjunath S & team for personalized guidance.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          
          {/* Left Contact Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Phone Card */}
            <div style={{
              backgroundColor: '#1e293b',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(5, 150, 105, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Phone size={24} color="#059669" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>CALL OUR AGENT DIRECTLY</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>+91 9742568746</div>
                  <div style={{ fontSize: '0.78rem', color: '#059669' }}>Available 8:00 AM - 9:00 PM IST</div>
                </div>
              </div>
              <a href="tel:9742568746" className="btn btn-emerald btn-sm" style={{ flexShrink: 0 }}>
                Call Now
              </a>
            </div>

            {/* Email Card */}
            <div style={{
              backgroundColor: '#1e293b',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(217, 119, 6, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Mail size={24} color="#fbbf24" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>OFFICIAL EMAIL ADDRESS</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', wordBreak: 'break-all' }}>
                    manjunaths9177@gmail.com
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Send inquiries & property details</div>
                </div>
              </div>
              <a href="mailto:manjunaths9177@gmail.com" className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>
                Email Us
              </a>
            </div>

            {/* WhatsApp Card */}
            <div style={{
              backgroundColor: '#1e293b',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(37, 211, 102, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MessageSquare size={24} color="#25D366" />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>WHATSAPP QUICK CHAT</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#25D366' }}>Instant WhatsApp Support</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Receive property photos & brochures</div>
                </div>
              </div>
              <a
                href="https://wa.me/919742568746?text=Hello%20SLN%20Properties,%20I%20would%20like%20to%20inquire%20about%20real%20estate%20in%20Bengaluru."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-emerald btn-sm"
                style={{ flexShrink: 0, backgroundColor: '#25D366' }}
              >
                WhatsApp
              </a>
            </div>

            {/* Address */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <MapPin size={24} color="#d97706" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                <strong style={{ color: '#ffffff' }}>SLN Properties Head Office:</strong> Bengaluru, Karnataka, India. Serving all major zones including East, South, North & Central Bengaluru.
              </div>
            </div>

          </div>

          {/* Right Contact Form */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '2rem',
            color: '#0f172a',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '4px' }}>
              Send Us A Message
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Fill in your details below and Manjunath S will call you back within 30 minutes.
            </p>

            {submitted ? (
              <div style={{ backgroundColor: '#d1fae5', border: '1px solid #059669', color: '#047857', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                <CheckCircle2 size={40} style={{ marginBottom: '8px' }} />
                <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Inquiry Saved in Python SQLite Database!</div>
                <div style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                  Thank you for reaching out to SLN Properties. We will contact you at {formData.phone} shortly.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="97425XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Preferred Bengaluru Locality
                  </label>
                  <select
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem', fontWeight: 600 }}
                  >
                    <option value="Indiranagar">Indiranagar</option>
                    <option value="Whitefield">Whitefield</option>
                    <option value="Koramangala">Koramangala</option>
                    <option value="HSR Layout">HSR Layout</option>
                    <option value="Yelahanka">Yelahanka</option>
                    <option value="Electronic City">Electronic City</option>
                    <option value="Jayanagar">Jayanagar</option>
                    <option value="Other">Other Area in Bengaluru</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Requirement Details / Message
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Tell us what type of property you are looking for (Budget, BHK, Buy/Rent)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', resize: 'none' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '6px' }}>
                  <Send size={18} /> Request Call Back Now
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
