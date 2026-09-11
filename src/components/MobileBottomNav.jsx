import React from 'react';
import { Home, Search, PlusCircle, Phone, MessageSquare } from 'lucide-react';

export default function MobileBottomNav({ onOpenPostModal, onSelectTab, activeTab }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      boxShadow: '0 -4px 15px rgba(0,0,0,0.08)',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: '62px',
      padding: '4px 0'
    }} className="mobile-bottom-bar">
      <style>{`
        @media (min-width: 768px) {
          .mobile-bottom-bar { display: none !important; }
        }
      `}</style>

      {/* Home */}
      <button
        onClick={() => onSelectTab('home')}
        style={{
          background: 'none',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: activeTab === 'home' ? '#d97706' : '#64748b',
          fontSize: '0.7rem',
          fontWeight: activeTab === 'home' ? 700 : 500,
          cursor: 'pointer'
        }}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      {/* Search/Properties */}
      <button
        onClick={() => onSelectTab('properties')}
        style={{
          background: 'none',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: activeTab === 'properties' ? '#d97706' : '#64748b',
          fontSize: '0.7rem',
          fontWeight: activeTab === 'properties' ? 700 : 500,
          cursor: 'pointer'
        }}
      >
        <Search size={20} />
        <span>Search</span>
      </button>

      {/* Post (+ Gold Center Button) */}
      <button
        onClick={onOpenPostModal}
        style={{
          background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
          border: 'none',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          marginTop: '-18px',
          boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4)',
          cursor: 'pointer'
        }}
        aria-label="Post Property"
      >
        <PlusCircle size={26} />
      </button>

      {/* Call Agent */}
      <a
        href="tel:9742568746"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: '#059669',
          fontSize: '0.7rem',
          fontWeight: 600,
          textDecoration: 'none'
        }}
      >
        <Phone size={20} />
        <span>Call</span>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/919742568746?text=Hello%20SLN%20Properties,%20I%20am%20looking%20for%20property%20assistance%20in%20Bengaluru."
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: '#25D366',
          fontSize: '0.7rem',
          fontWeight: 600,
          textDecoration: 'none'
        }}
      >
        <MessageSquare size={20} />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
