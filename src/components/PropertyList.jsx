import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import { BENGALURU_LOCALITIES } from '../data/mockProperties';
import { SlidersHorizontal, Building2, PlusCircle } from 'lucide-react';

export default function PropertyList({
  properties,
  onViewDetails,
  onOpenPostModal,
  selectedLocality,
  onSelectLocality
}) {
  const [sortBy, setSortBy] = useState('latest');

  // Sort logic
  const sortedProperties = [...properties].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <section id="properties-section" style={{ padding: '3.5rem 0', backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              SLN Verified Portfolio
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>
              Featured Properties in Bengaluru
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 600, color: '#475569' }}>
              <SlidersHorizontal size={16} /> Sort By:
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#0f172a',
                outline: 'none'
              }}
            >
              <option value="latest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Quick Locality Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '2rem',
          scrollbarWidth: 'thin'
        }}>
          {BENGALURU_LOCALITIES.slice(0, 9).map(locality => {
            const isActive = selectedLocality === locality;
            return (
              <button
                key={locality}
                onClick={() => onSelectLocality(locality)}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: isActive ? '1px solid #d97706' : '1px solid #cbd5e1',
                  backgroundColor: isActive ? '#0f172a' : '#ffffff',
                  color: isActive ? '#fbbf24' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {locality}
              </button>
            );
          })}
        </div>

        {/* Properties Grid */}
        {sortedProperties.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {sortedProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '2px dashed #cbd5e1'
          }}>
            <Building2 size={48} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              No Properties Found Matching Criteria
            </h3>
            <p style={{ color: '#64748b', maxWidth: '450px', margin: '0 auto 1.5rem auto' }}>
              We couldn't find any listings matching your active filters. Try adjusting your locality or budget search.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                className="btn btn-outline"
                onClick={() => onSelectLocality('All Bengaluru')}
              >
                Show All Bengaluru Properties
              </button>
              <button
                className="btn btn-primary"
                onClick={onOpenPostModal}
              >
                <PlusCircle size={18} /> Post A Property Now
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
