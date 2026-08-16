/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MarketplaceView } from './components/MarketplaceView';
import { ForSellersView } from './components/ForSellersView';
import { AboutView } from './components/AboutView';
import { BlogView } from './components/BlogView';
import { ContactView } from './components/ContactView';
import { AdminPanel } from './components/AdminPanel';
import { ProductModal } from './components/ProductModal';
import { GiftMessageModal } from './components/GiftMessageModal';
import { CartDrawer } from './components/CartDrawer';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="min-h-[calc(100vh-200px)]">
      {activeTab === 'home' && (
        <>
          <HeroSection />
          <MarketplaceView />
        </>
      )}

      {activeTab === 'marketplace' && <MarketplaceView />}
      {activeTab === 'sellers' && <ForSellersView />}
      {activeTab === 'about' && <AboutView />}
      {activeTab === 'blog' && <BlogView />}
      {activeTab === 'contact' && <ContactView />}
      {activeTab === 'admin' && <AdminPanel />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#FCFCFA] text-stone-800 flex flex-col selection:bg-[#2D5A27]/20 selection:text-[#2D5A27]">
        <Header />
        <MainContent />
        <Footer />
        
        {/* Interactive Modals and Drawers */}
        <ProductModal />
        <GiftMessageModal />
        <CartDrawer />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
