import React, { useState } from 'react';
import { X, MapPin, BedDouble, Bath, Maximize2, Compass, ShieldCheck, Phone, MessageSquare, Mail, Calendar, CheckCircle2, UserCheck, Send } from 'lucide-react';
import EmiCalculator from './EmiCalculator';
import { submitInquiryToApi } from '../services/api';

export default function PropertyDetailModal({ property, onClose }) {
  const [selectedImage, setSelectedImage] = useState(property.image);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!property) return null;

  const whatsappText = encodeURIComponent(
    `Hi SLN Properties, I want to inquire about: "${property.title}" (${property.priceDisplay}) in ${property.locality}, Bengaluru.`
  );

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Submit inquiry to Python SQLite database
    await submitInquiryToApi({
      propertyId: property.id,
      name: inquiryName,
      phone: inquiryPhone,
      locality: property.locality,
      message: inquiryMsg
    });

    setTimeout(() => {
      setSubmitted(false);
      setInquiryName('');
      setInquiryPhone('');
      setInquiryMsg('');
    }, 4000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          sticky: 'top',
          backgroundColor: '#ffffff',
          zIndex: 10
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-gold">For {property.purpose}</span>
              <span className="badge badge-navy">{property.type}</span>
              {property.verified && <span className="badge badge-emerald"><ShieldCheck size={12} /> SLN Verified</span>}
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
              {property.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#0f172a'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '1.5rem' }}>
          {/* Main Photo Preview */}
          <div style={{ position: 'relative', height: '360px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem', backgroundColor: '#0f172a' }}>
            <img
              src={selectedImage}
              alt={property.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              backgroundColor: '#0f172a',
              color: '#fbbf24',
              padding: '8px 18px',
              borderRadius: '10px',
              fontSize: '1.4rem',
              fontWeight: 800,
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
              border: '1px solid rgba(251, 191, 36, 0.3)'
            }}>
              {property.priceDisplay}
            </div>
          </div>

          {/* Thumbnails Gallery */}
          {property.gallery && property.gallery.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '1.5rem', paddingBottom: '4px' }}>
              {property.gallery.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setSelectedImage(imgUrl)}
                  style={{
                    width: '80px',
                    height: '60px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: selectedImage === imgUrl ? '2px solid #d97706' : '2px solid transparent',
                    opacity: selectedImage === imgUrl ? 1 : 0.7,
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>
          )}

          {/* Key Overview Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={20} color="#d97706" />
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>LOCALITY</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{property.locality}</div>
              </div>
            </div>

            {property.bhk > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BedDouble size={20} color="#d97706" />
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>BEDROOMS</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{property.bhk} BHK</div>
                </div>
              </div>
            )}

            {property.baths > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bath size={20} color="#d97706" />
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>BATHROOMS</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{property.baths} Baths</div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Maximize2 size={20} color="#d97706" />
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>SUPER AREA</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{property.areaSqft} Sq.Ft</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Compass size={20} color="#d97706" />
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>FACING</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{property.facing || 'East'}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              About This Property
            </h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                Key Amenities & Features
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
                {property.amenities.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', backgroundColor: '#f1f5f9', borderRadius: '8px', fontSize: '0.88rem', fontWeight: 600, color: '#1e293b' }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EMI Calculator Component */}
          {property.purpose === 'Buy' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <EmiCalculator defaultAmount={property.price} />
            </div>
          )}

          {/* Agent Contact & Inquiry Form Box */}
          <div style={{
            backgroundColor: '#0f172a',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid #d97706'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#fbbf24', textTransform: 'uppercase', fontWeight: 700 }}>
                  SLN PROPERTIES REPRESENTATIVE
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <UserCheck size={20} color="#059669" /> Manjunath S. & Partner
                </div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                  Bengaluru Real Estate Specialists
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={`tel:${property.agentPhone}`}
                  className="btn btn-emerald"
                  style={{ gap: '6px' }}
                >
                  <Phone size={16} /> Call +91 {property.agentPhone}
                </a>

                <a
                  href={`https://wa.me/91${property.agentPhone}?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ gap: '6px' }}
                >
                  <MessageSquare size={16} /> WhatsApp Chat
                </a>
              </div>
            </div>

            {/* Quick Callback Form */}
            {submitted ? (
              <div style={{ backgroundColor: 'rgba(5, 150, 105, 0.2)', border: '1px solid #059669', borderRadius: '8px', padding: '1rem', textAlign: 'center', color: '#d1fae5' }}>
                <CheckCircle2 size={32} style={{ marginBottom: '6px' }} />
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>Inquiry Saved to Python SQLite Database!</div>
                <div style={{ fontSize: '0.85rem' }}>Manjunath S will reach out to you at {inquiryPhone} shortly.</div>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fbbf24' }}>
                  Request Instant Site Visit / Call Back
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    style={{ padding: '10px', borderRadius: '6px', border: 'none', fontSize: '0.9rem' }}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Your Phone Number *"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    style={{ padding: '10px', borderRadius: '6px', border: 'none', fontSize: '0.9rem' }}
                  />
                </div>
                <textarea
                  rows="2"
                  placeholder="When would you like to schedule a site visit?"
                  value={inquiryMsg}
                  onChange={(e) => setInquiryMsg(e.target.value)}
                  style={{ padding: '10px', borderRadius: '6px', border: 'none', fontSize: '0.9rem', resize: 'none' }}
                />
                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  <Send size={16} /> Submit Callback Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
