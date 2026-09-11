import React from 'react';
import { MapPin, BedDouble, Bath, Maximize2, Compass, ShieldCheck, Phone, MessageSquare, ArrowRight } from 'lucide-react';

export default function PropertyCard({ property, onViewDetails }) {
  const whatsappText = encodeURIComponent(
    `Hello SLN Properties, I am interested in property: "${property.title}" (${property.priceDisplay}) in ${property.locality}, Bengaluru. Please send me more details.`
  );

  return (
    <div className="animate-fade-in" style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    }}>
      <style>{`
        .property-card-wrapper:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>

      {/* Image Preview Container */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', backgroundColor: '#0f172a' }}>
        <img
          src={property.image}
          alt={property.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          loading="lazy"
        />

        {/* Purpose Tag */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <span className={`badge ${property.purpose === 'Rent' ? 'badge-navy' : 'badge-gold'}`}>
            For {property.purpose}
          </span>
          {property.verified && (
            <span className="badge badge-emerald">
              <ShieldCheck size={12} /> Verified
            </span>
          )}
        </div>

        {/* Type Badge */}
        <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
          <span style={{
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.78rem',
            fontWeight: 700,
            backdropFilter: 'blur(4px)'
          }}>
            {property.type}
          </span>
        </div>

        {/* Price Tag Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          backgroundColor: '#0f172a',
          color: '#fbbf24',
          padding: '6px 14px',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: 800,
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          border: '1px solid rgba(251, 191, 36, 0.3)'
        }}>
          {property.priceDisplay}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Locality */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
          <MapPin size={14} color="#d97706" />
          <span>{property.locality}, Bengaluru</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          color: '#0f172a',
          lineHeight: 1.3,
          marginBottom: '0.75rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {property.title}
        </h3>

        {/* Specs Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          padding: '10px 0',
          borderTop: '1px solid #f1f5f9',
          borderBottom: '1px solid #f1f5f9',
          marginBottom: '1rem',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          margin: '0 0 1rem 0'
        }}>
          {property.bhk > 0 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>
                <BedDouble size={14} /> BHK
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>{property.bhk} Bed</div>
            </div>
          )}

          {property.baths > 0 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>
                <Bath size={14} /> Bath
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>{property.baths} Bath</div>
            </div>
          )}

          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>
              <Maximize2 size={14} /> Area
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>{property.areaSqft} sqft</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onViewDetails(property)}
            style={{ width: '100%', justifyContent: 'space-between', borderRadius: '8px' }}
          >
            <span>View Full Specifications</span>
            <ArrowRight size={15} />
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <a
              href={`tel:${property.agentPhone}`}
              className="btn btn-outline btn-sm"
              style={{ borderRadius: '8px', fontSize: '0.8rem', gap: '4px' }}
            >
              <Phone size={14} color="#059669" /> Call Now
            </a>

            <a
              href={`https://wa.me/91${property.agentPhone}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-emerald btn-sm"
              style={{ borderRadius: '8px', fontSize: '0.8rem', gap: '4px' }}
            >
              <MessageSquare size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
