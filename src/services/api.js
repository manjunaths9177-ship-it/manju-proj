const API_BASE = 'http://localhost:5000/api';

export async function fetchPropertiesFromApi(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.locality && filters.locality !== 'All Bengaluru') params.append('locality', filters.locality);
    if (filters.type && filters.type !== 'All Types') params.append('type', filters.type);
    if (filters.purpose && filters.purpose !== 'All') params.append('purpose', filters.purpose);
    if (filters.maxPrice && filters.maxPrice !== 'ALL') params.append('max_price', filters.maxPrice);
    if (filters.keyword && filters.keyword.trim() !== '') params.append('search', filters.keyword.trim());

    const res = await fetch(`${API_BASE}/properties?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('Python Backend API call failed, falling back:', error.message);
    return null; // Signals caller to fallback to local state
  }
}

export async function savePropertyToApi(propertyData) {
  try {
    const res = await fetch(`${API_BASE}/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(propertyData)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn('Failed to save to Python backend:', error.message);
    return null;
  }
}

export async function submitInquiryToApi(inquiryData) {
  try {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn('Failed to submit inquiry to Python backend:', error.message);
    return null;
  }
}
