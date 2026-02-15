import React from 'react';
import {
    LayoutDashboard,
    Users,
    Settings,
    Package,
    BarChart3,
    LogOut,
    ChevronRight,
    ShieldCheck
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'inventory', label: 'Inventory', icon: Package },
        { id: 'users', label: 'Staff Management', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <ShieldCheck size={28} className="text-accent" />
                <span className="sidebar-logo">ADMIN PRO</span>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                    >
                        <item.icon size={20} />
                        <span className="nav-label">{item.label}</span>
                        {activeTab === item.id && <ChevronRight size={14} className="active-indicator" />}
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="nav-item logout-btn">
                    <LogOut size={20} />
                    <span className="nav-label">Logout</span>
                </button>
            </div>

            <style jsx>{`
        .sidebar {
          width: var(--sidebar-width);
          height: 100vh;
          background: var(--primary);
          color: white;
          position: fixed;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          border-right: 1px solid rgba(255,255,255,0.05);
        }

        .sidebar-header {
          height: var(--header-height);
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .sidebar-logo {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1.5rem 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 1rem;
          background: transparent;
          border: none;
          color: #94a3b8;
          width: 100%;
          cursor: pointer;
          transition: var(--transition);
          position: relative;
          font-size: 0.9rem;
          font-weight: 500;
          text-align: left;
        }

        .nav-item:hover {
          color: white;
          background: rgba(255,255,255,0.05);
        }

        .nav-item.active {
          color: white;
          background: var(--accent);
        }

        .nav-label {
          flex: 1;
        }

        .active-indicator {
          opacity: 0.8;
        }

        .sidebar-footer {
          padding: 1rem 0.75rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .logout-btn:hover {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .text-accent {
          color: var(--accent);
        }
      `}</style>
        </aside>
    );
};

export default Sidebar;
