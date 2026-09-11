import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import HeroSearch from './components/HeroSearch';
import PropertyList from './components/PropertyList';
import PropertyDetailModal from './components/PropertyDetailModal';
import PostPropertyModal from './components/PostPropertyModal';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { INITIAL_PROPERTIES } from './data/mockProperties';
import { fetchPropertiesFromApi, savePropertyToApi } from './services/api';
import { Database, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Active Filters State
  const [filters, setFilters] = useState({
    purpose: 'All',
    locality: 'All Bengaluru',
    type: 'All Types',
    maxPrice: 'ALL',
    keyword: ''
  });

  // UI Modals & Navigation
  const [selectedPropertyDetail, setSelectedPropertyDetail] = useState(null);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Load properties from Python API on initial mount & filter changes
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const apiProps = await fetchPropertiesFromApi(filters);
      if (isMounted) {
        if (apiProps && Array.isArray(apiProps)) {
          setProperties(apiProps);
          setIsBackendConnected(true);
        } else {
          // Fallback to local state if Python API offline
          setIsBackendConnected(false);
        }
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [filters]);

  // Filter Handler
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      purpose: 'All',
      locality: 'All Bengaluru',
      type: 'All Types',
      maxPrice: 'ALL',
      keyword: ''
    });
  };

  const handleSelectLocality = (loc) => {
    setFilters(prev => ({ ...prev, locality: loc }));
    scrollToSection('properties-section');
  };

  const handleAddProperty = async (newProp) => {
    // 1. Optimistic React update
    setProperties(prev => [newProp, ...prev]);

    // 2. Save to Python SQLite backend API
    await savePropertyToApi(newProp);
  };

  const handleNavTabSelect = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'properties' || tabId === 'buy' || tabId === 'rent') {
      if (tabId === 'buy') setFilters(prev => ({ ...prev, purpose: 'Buy' }));
      if (tabId === 'rent') setFilters(prev => ({ ...prev, purpose: 'Rent' }));
      scrollToSection('properties-section');
    } else if (tabId === 'about') {
      scrollToSection('about-section');
    } else if (tabId === 'contact') {
      scrollToSection('contact-section');
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Backend Status Bar */}
      <div style={{
        backgroundColor: isBackendConnected ? '#064e3b' : '#1e293b',
        color: '#ffffff',
        fontSize: '0.75rem',
        fontWeight: 600,
        padding: '4px 0',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px'
      }}>
        <Database size={13} color={isBackendConnected ? '#34d399' : '#fbbf24'} />
        <span>
          {isBackendConnected ? (
            <>Python Backend (Flask + SQLite) Connected • Real-Time Database Sync Active</>
          ) : (
            <>Python Backend (Local Storage Active)</>
          )}
        </span>
      </div>

      {/* Top Navbar */}
      <Navbar
        onOpenPostModal={() => setPostModalOpen(true)}
        onSelectTab={handleNavTabSelect}
        activeTab={activeTab}
      />

      {/* Hero & Search Engine */}
      <HeroSearch
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResultsCount={properties.length}
        onScrollToListings={() => scrollToSection('properties-section')}
      />

      {/* Property List Showcase Grid */}
      <PropertyList
        properties={properties}
        onViewDetails={(prop) => setSelectedPropertyDetail(prop)}
        onOpenPostModal={() => setPostModalOpen(true)}
        selectedLocality={filters.locality}
        onSelectLocality={handleSelectLocality}
      />

      {/* About Business Section */}
      <AboutSection
        onOpenPostModal={() => setPostModalOpen(true)}
      />

      {/* Direct Contact & Callback Section */}
      <ContactSection />

      {/* Footer */}
      <Footer
        onSelectTab={handleNavTabSelect}
        onOpenPostModal={() => setPostModalOpen(true)}
      />

      {/* Mobile Floating Action Bar */}
      <MobileBottomNav
        onOpenPostModal={() => setPostModalOpen(true)}
        onSelectTab={handleNavTabSelect}
        activeTab={activeTab}
      />

      {/* Detail View Modal */}
      {selectedPropertyDetail && (
        <PropertyDetailModal
          property={selectedPropertyDetail}
          onClose={() => setSelectedPropertyDetail(null)}
        />
      )}

      {/* Add Property Modal */}
      {postModalOpen && (
        <PostPropertyModal
          onClose={() => setPostModalOpen(false)}
          onAddProperty={handleAddProperty}
        />
      )}
    </div>
  );
}
