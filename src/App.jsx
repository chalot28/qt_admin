import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Products from './components/Products';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="admin-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        <Header activeTab={activeTab} />

        <div className="content-body">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'inventory' && <Products />}
          {activeTab !== 'dashboard' && activeTab !== 'inventory' && (
            <div className="animate-fade-in text-center" style={{ padding: '4rem' }}>
              <h3 className="text-muted">Module "{activeTab}" is coming soon.</h3>
              <p className="text-muted">Developing professional admin interface...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
