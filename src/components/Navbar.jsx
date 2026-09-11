import React, { useState } from 'react';
import { Home, Building2, Phone, PlusCircle, Menu, X, Mail, MapPin } from 'lucide-react';

export default function Navbar({ onOpenPostModal, onSelectTab, activeTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'properties', label: 'Browse Properties' },
    { id: 'buy', label: 'Buy' },
    { id: 'rent', label: 'Rent' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (id) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div style={{
        backgroundColor: '#0f172a',
        color: '#94a3b8',
        fontSize: '0.8rem',
        padding: '6px 0',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} color="#d97706" /> Bengaluru, Karnataka
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Mail size={13} color="#d97706" /> manjunaths9177@gmail.com
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="tel:9742568746" style={{ color: '#fbbf24', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Phone size={13} /> +91 9742568746
            </a>
            <span style={{ color: '#059669', fontWeight: 600 }}>• Verified Bengaluru Properties</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              border: '2px solid #d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(217, 119, 6, 0.2)'
            }}>
              <Building2 size={24} color="#d97706" />
            </div>
            <div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', lineHeight: 1 }}>
                SLN <span style={{ color: '#d97706' }}>PROPERTIES</span>
              </div>
              <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Real Estate Partners • Bengaluru
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'none', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <style>{`
              @media (min-width: 900px) {
                .desktop-nav { display: flex !important; }
                .mobile-toggle { display: none !important; }
              }
            `}</style>
            <button 
              onClick={() => handleNavClick('home')}
              style={{
                background: 'none',
                border: 'none',
                fontWeight: activeTab === 'home' ? 700 : 600,
                color: activeTab === 'home' ? '#d97706' : '#334155',
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              Home
            </button>
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontWeight: activeTab === link.id ? 700 : 600,
                  color: activeTab === link.id ? '#d97706' : '#334155',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'color 0.2s'
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              className="btn btn-primary btn-sm"
              onClick={onOpenPostModal}
              style={{ borderRadius: '8px' }}
            >
              <PlusCircle size={16} /> Post Property
            </button>
            
            <a 
              href="tel:9742568746" 
              className="btn btn-outline btn-sm"
              style={{ display: 'none', gap: '6px' }}
              className="desktop-call-btn"
            >
              <style>{`
                @media (min-width: 640px) {
                  .desktop-call-btn { display: inline-flex !important; }
                }
              `}</style>
              <Phone size={15} color="#059669" /> Call +91 9742568746
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              style={{
                background: 'none',
                border: 'none',
                color: '#0f172a',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '100px',
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          borderBottom: '2px solid var(--accent-gold)',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 899,
          padding: '1.5rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <button
            onClick={() => handleNavClick('home')}
            style={{
              textAlign: 'left',
              padding: '10px 12px',
              fontSize: '1rem',
              fontWeight: 700,
              background: activeTab === 'home' ? '#fffbe6' : 'transparent',
              color: activeTab === 'home' ? '#d97706' : '#0f172a',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Home
          </button>
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                textAlign: 'left',
                padding: '10px 12px',
                fontSize: '1rem',
                fontWeight: 600,
                background: activeTab === link.id ? '#fffbe6' : 'transparent',
                color: activeTab === link.id ? '#d97706' : '#0f172a',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {link.label}
            </button>
          ))}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px', marginTop: '4px' }}>
            <a 
              href="tel:9742568746"
              className="btn btn-emerald"
              style={{ width: '100%', marginBottom: '8px' }}
            >
              <Phone size={18} /> Call Agent: +91 9742568746
            </a>
            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPostModal();
              }}
            >
              <PlusCircle size={18} /> List Your Property Free
            </button>
          </div>
        </div>
      )}
    </>
  );
}
