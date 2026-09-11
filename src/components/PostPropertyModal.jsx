import React, { useState } from 'react';
import { X, PlusCircle, Building, MapPin, IndianRupee, Image, CheckCircle } from 'lucide-react';
import { BENGALURU_LOCALITIES, PROPERTY_TYPES } from '../data/mockProperties';

export default function PostPropertyModal({ onClose, onAddProperty }) {
  const [title, setTitle] = useState('');
  const [locality, setLocality] = useState('Indiranagar');
  const [purpose, setPurpose] = useState('Buy');
  const [type, setType] = useState('Apartment');
  const [rawPrice, setRawPrice] = useState('');
  const [bhk, setBhk] = useState(3);
  const [baths, setBaths] = useState(2);
  const [areaSqft, setAreaSqft] = useState(1500);
  const [facing, setFacing] = useState('East');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [amenitiesInput, setAmenitiesInput] = useState('24/7 Security, Lift, Parking, Power Backup');
  const [agentPhone, setAgentPhone] = useState('9742568746');
  const [agentEmail, setAgentEmail] = useState('manjunaths9177@gmail.com');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const priceNum = Number(rawPrice) || 10000000;
    
    // Format Display Price
    let priceDisplayStr = `₹ ${priceNum.toLocaleString('en-IN')}`;
    if (purpose === 'Rent') {
      priceDisplayStr = `₹ ${priceNum.toLocaleString('en-IN')} / mo`;
    } else if (priceNum >= 10000000) {
      priceDisplayStr = `₹ ${(priceNum / 10000000).toFixed(2)} Cr`;
    } else if (priceNum >= 100000) {
      priceDisplayStr = `₹ ${(priceNum / 100000).toFixed(2)} Lakhs`;
    }

    const defaultImg = imageUrl.trim() || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80';

    const newProp = {
      id: `sln-user-${Date.now()}`,
      title: title || `SLN ${bhk} BHK Property in ${locality}`,
      locality: locality,
      city: 'Bengaluru',
      price: priceNum,
      priceDisplay: priceDisplayStr,
      type: type,
      purpose: purpose,
      bhk: Number(bhk),
      baths: Number(baths),
      areaSqft: Number(areaSqft),
      facing: facing,
      possession: 'Ready to Move',
      verified: true,
      featured: true,
      image: defaultImg,
      gallery: [defaultImg],
      description: description || `Newly listed ${type} located in prime ${locality}, Bengaluru. Managed by SLN Properties. Clear titles and instant possession.`,
      amenities: amenitiesInput.split(',').map(s => s.trim()).filter(Boolean),
      agentName: 'Manjunath S',
      agentPhone: agentPhone || '9742568746',
      agentEmail: agentEmail || 'manjunaths9177@gmail.com',
      createdAt: new Date().toISOString()
    };

    onAddProperty(newProp);
    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        {/* Header */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          backgroundColor: '#0f172a',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <PlusCircle size={22} color="#fbbf24" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>List Your Property in Bengaluru</h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Form */}
        <div style={{ padding: '1.5rem' }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <CheckCircle size={56} color="#059669" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Property Added Successfully!
              </h3>
              <p style={{ color: '#64748b' }}>
                Your property is now listed live on SLN Properties for buyers in Bengaluru.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Purpose & Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Listing Purpose *
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 600 }}
                  >
                    <option value="Buy">For Sale (Buy)</option>
                    <option value="Rent">For Rent</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Property Category *
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 600 }}
                  >
                    {PROPERTY_TYPES.filter(t => t !== 'All Types').map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Property Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SLN Luxury 3 BHK Duplex Villa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem' }}
                />
              </div>

              {/* Locality & Price */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Locality in Bengaluru *
                  </label>
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontWeight: 600 }}
                  >
                    {BENGALURU_LOCALITIES.filter(l => l !== 'All Bengaluru').map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Price (INR ₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 18500000 for 1.85 Cr"
                    value={rawPrice}
                    onChange={(e) => setRawPrice(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.92rem' }}
                  />
                </div>
              </div>

              {/* BHK, Baths, Area */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    BHK (Bedrooms)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={bhk}
                    onChange={(e) => setBhk(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={baths}
                    onChange={(e) => setBaths(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                    Area (Sq.Ft)
                  </label>
                  <input
                    type="number"
                    min="100"
                    value={areaSqft}
                    onChange={(e) => setAreaSqft(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Image URL (Optional - leave blank for default photo)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Property Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Mention key details like near Metro, Vastu, BDA approved, modular kitchen..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', resize: 'none' }}
                />
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="button" className="btn btn-outline" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <PlusCircle size={18} /> Publish Property
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
