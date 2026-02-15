import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';

const Header = ({ activeTab }) => {
    return (
        <header className="header">
            <div className="header-left">
                <h2 className="tab-title">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
            </div>

            <div className="header-right">
                <div className="search-bar">
                    <Search size={18} className="text-muted" />
                    <input type="text" placeholder="Search systems..." className="search-input" />
                </div>

                <div className="header-actions">
                    <button className="icon-btn">
                        <Bell size={20} />
                        <span className="notification-badge"></span>
                    </button>

                    <div className="user-profile">
                        <div className="user-info">
                            <span className="user-name">Admin User</span>
                            <span className="user-role">System Administrator</span>
                        </div>
                        <div className="avatar">
                            <User size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .header {
          height: var(--header-height);
          background: white;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 900;
        }

        .tab-title {
          font-size: 1.5rem;
          color: var(--primary);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-main);
          padding: 8px 16px;
          width: 300px;
          border-bottom: 2px solid transparent;
          transition: var(--transition);
        }

        .search-bar:focus-within {
          background: white;
          border-color: var(--accent);
          box-shadow: var(--shadow-sm);
        }

        .search-input {
          border: none;
          background: transparent;
          outline: none;
          font-family: inherit;
          font-size: 0.9rem;
          width: 100%;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .icon-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .icon-btn:hover {
          color: var(--primary);
        }

        .notification-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid white;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-left: 1.5rem;
          border-left: 1px solid var(--border-color);
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .user-name {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .user-role {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .avatar {
          width: 40px;
          height: 40px;
          background: var(--bg-main);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          border: 1px solid var(--border-color);
        }
      `}</style>
        </header>
    );
};

export default Header;
