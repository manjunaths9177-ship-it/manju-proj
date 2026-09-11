import React from 'react';
import { Search, MapPin, Building, IndianRupee, ShieldCheck, CheckCircle2, PhoneCall } from 'lucide-react';
import { BENGALURU_LOCALITIES, PROPERTY_TYPES } from '../data/mockProperties';

export default function HeroSearch({
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount,
  onScrollToListings
}) {
  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(135deg, rgba(15,23,42,0.92) 0%, rgba(30,41,59,0.85) 100%), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '4rem 0 5rem 0',
      color: '#ffffff'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Trust Pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', backgroundColor: 'rgba(217, 119, 6, 0.2)', border: '1px solid rgba(217, 119, 6, 0.4)', marginBottom: '1.25rem' }}>
          <ShieldCheck size={16} color="#fbbf24" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fbbf24' }}>
            Trusted Bengaluru Real Estate Consultants
          </span>
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: '2.5rem',
          lineHeight: 1.15,
          fontWeight: 800,
          marginBottom: '1rem',
          maxWidth: '850px',
          letterSpacing: '-0.5px'
        }}>
          Find Your Perfect Home & Property in <span style={{ color: '#fbbf24' }}>Bengaluru</span>
        </h1>
        
        <p style={{
          fontSize: '1.1rem',
          color: '#cbd5e1',
          maxWidth: '680px',
          marginBottom: '2rem',
          fontWeight: 400
        }}>
          Explore verified Apartments, Independent Villas, Residential Plots, and Commercial Spaces managed directly by <strong>SLN Properties</strong>.
        </p>

        {/* Search Box Card */}
        <div className="glass-panel" style={{
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          color: '#0f172a'
        }}>
          {/* Purpose Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
            {['All', 'Buy', 'Rent'].map(purpose => (
              <button
                key={purpose}
                onClick={() => onFilterChange('purpose', purpose)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: filters.purpose === purpose ? '#d97706' : '#f1f5f9',
                  color: filters.purpose === purpose ? '#ffffff' : '#475569',
                  transition: 'all 0.2s'
                }}
              >
                {purpose === 'All' ? 'All Properties' : purpose === 'Buy' ? 'For Sale' : 'For Rent'}
              </button>
            ))}
          </div>

          {/* Filter Inputs Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            marginBottom: '1rem'
          }}>
            {/* Locality */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                <MapPin size={14} color="#d97706" /> Locality in Bengaluru
              </label>
              <select
                value={filters.locality}
                onChange={(e) => onFilterChange('locality', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  outline: 'none'
                }}
              >
                {BENGALURU_LOCALITIES.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                <Building size={14} color="#d97706" /> Property Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => onFilterChange('type', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  outline: 'none'
                }}
              >
                {PROPERTY_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                <IndianRupee size={14} color="#d97706" /> Budget Range
              </label>
              <select
                value={filters.maxPrice}
                onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  outline: 'none'
                }}
              >
                <option value="ALL">Any Price</option>
                <option value="50000">Under ₹50,000 / mo (Rent)</option>
                <option value="10000000">Under ₹1.00 Crore</option>
                <option value="20000000">Under ₹2.00 Crores</option>
                <option value="30000000">Under ₹3.00 Crores</option>
                <option value="50000000">Under ₹5.00 Crores</option>
              </select>
            </div>

            {/* Search Keyword */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px', textTransform: 'uppercase' }}>
                <Search size={14} color="#d97706" /> Search Keyword
              </label>
              <input
                type="text"
                placeholder="e.g. 3 BHK, Gated, BDA..."
                value={filters.keyword}
                onChange={(e) => onFilterChange('keyword', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: '#0f172a',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Search Trigger Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
            <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
              Showing <strong style={{ color: '#0f172a' }}>{totalResultsCount}</strong> matching properties in Bengaluru
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn btn-outline btn-sm"
                onClick={onResetFilters}
                style={{ fontSize: '0.85rem' }}
              >
                Reset Filters
              </button>
              <button
                className="btn btn-primary"
                onClick={onScrollToListings}
              >
                <Search size={18} /> View Matching Properties
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginTop: '2.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.08)', padding: '12px 16px', borderRadius: '12px', backdropFilter: 'blur(5px)' }}>
            <CheckCircle2 size={24} color="#fbbf24" />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>100% Legal Verification</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Title deeds checked by legal team</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.08)', padding: '12px 16px', borderRadius: '12px', backdropFilter: 'blur(5px)' }}>
            <CheckCircle2 size={24} color="#059669" />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Direct Contact</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Connect directly with Manjunath S</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.08)', padding: '12px 16px', borderRadius: '12px', backdropFilter: 'blur(5px)' }}>
            <PhoneCall size={24} color="#38bdf8" />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Call +91 9742568746</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Available for instant site visits</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
