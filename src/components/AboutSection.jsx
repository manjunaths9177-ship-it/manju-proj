import React from 'react';
import { Building2, ShieldCheck, Users, Award, CheckCircle2, Phone } from 'lucide-react';

export default function AboutSection({ onOpenPostModal }) {
  return (
    <section id="about-section" style={{ padding: '4.5rem 0', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
          
          {/* Left Visual Box */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
              border: '4px solid #ffffff'
            }}>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80"
                alt="SLN Properties Team Bengaluru"
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Float Stats Badge */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-10px',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              padding: '1.25rem 1.5rem',
              borderRadius: '16px',
              boxShadow: 'var(--shadow-xl)',
              border: '2px solid #d97706',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Award size={36} color="#fbbf24" />
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fbbf24', lineHeight: 1 }}>15+ Years</div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600 }}>Bengaluru Market Expertise</div>
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              About SLN Properties
            </div>
            
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.25, marginBottom: '1.25rem', letterSpacing: '-0.5px' }}>
              Your Trusted Real Estate Partner Across Bengaluru
            </h2>

            <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Founded by <strong>Manjunath S.</strong> and partner, <strong>SLN Properties</strong> is a premier Bengaluru-based real estate advisory firm. We specialize in buying, selling, and renting premium residential apartments, independent villas, BDA/BBMP approved plots, and commercial office spaces across Silicon Valley's top localities.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>100% Clear Titles</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Thorough legal document verification</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>Direct Negotiation</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Transparent pricing with zero hidden charges</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>Home Loan Guidance</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Tie-ups with SBI, HDFC, ICICI banks</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <CheckCircle2 size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>Free Site Visits</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Guided visits at your convenience</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <a href="tel:9742568746" className="btn btn-secondary btn-lg">
                <Phone size={18} color="#fbbf24" /> Speak with Manjunath S
              </a>

              <button className="btn btn-outline btn-lg" onClick={onOpenPostModal}>
                Sell Property With Us
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
