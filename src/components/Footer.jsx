import React from 'react';
import { Building2, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

export default function Footer({ onSelectTab, onOpenPostModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: '#020617', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '3.5rem', paddingBottom: '2.5rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', marginBottom: '3rem' }}>
          
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                border: '2px solid #d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Building2 size={20} color="#d97706" />
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
                SLN <span style={{ color: '#d97706' }}>PROPERTIES</span>
              </div>
            </div>
            
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#64748b', marginBottom: '1.25rem' }}>
              Bengaluru's trusted real estate consultancy for residential apartments, independent houses, villas, plots, and commercial properties.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                <Phone size={15} color="#d97706" /> +91 9742568746
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                <Mail size={15} color="#d97706" /> manjunaths9177@gmail.com
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                <MapPin size={15} color="#d97706" /> Bengaluru, Karnataka
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onSelectTab('home'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onSelectTab('properties'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Browse All Properties</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onSelectTab('buy'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Buy Property</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onSelectTab('rent'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Rent Property</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenPostModal(); }} style={{ color: '#fbbf24', textDecoration: 'none', fontWeight: 600 }}>Post Your Property (Free)</a></li>
            </ul>
          </div>

          {/* Col 3: Popular Localities */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem' }}>
              Bengaluru Localities
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
              <li>Indiranagar Properties</li>
              <li>Whitefield Villas & Apartments</li>
              <li>Koramangala Ready Homes</li>
              <li>HSR Layout Flats</li>
              <li>Yelahanka BDA Plots</li>
              <li>Electronic City Office Spaces</li>
            </ul>
          </div>

          {/* Col 4: Founder Note */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '1rem' }}>
              SLN Management
            </h4>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>Manjunath S & Partner</div>
              <div style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: 600, marginBottom: '6px' }}>Founders & Managing Directors</div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Dedicated to providing honest, transparent real estate consultation across Bengaluru with complete legal assistance.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '1.5rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.8rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} <strong>SLN Properties</strong>. All rights reserved. Managed by Manjunath S.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 12px',
              color: '#cbd5e1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8rem'
            }}
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
