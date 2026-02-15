import React from 'react';
import {
    TrendingUp,
    Users,
    Package,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical
} from 'lucide-react';

const Dashboard = () => {
    const stats = [
        { label: 'Total Revenue', value: '$45,231.89', trend: '+20.1%', positive: true, icon: DollarSign },
        { label: 'Active Staff', value: '24', trend: '+12%', positive: true, icon: Users },
        { label: 'Inventory Items', value: '432', trend: '-2%', positive: false, icon: Package },
        { label: 'Conversion Rate', value: '3.4%', trend: '+4.5%', positive: true, icon: TrendingUp },
    ];

    const recentUsers = [
        { id: '101', name: 'Nguyen Van A', email: 'vanc@example.com', status: 'Active', role: 'Staff' },
        { id: '102', name: 'Tran Thi B', email: 'thib@example.com', status: 'Pending', role: 'Manager' },
        { id: '103', name: 'Le Van C', email: 'levanc@example.com', status: 'Active', role: 'Staff' },
        { id: '104', name: 'Pham Van D', email: 'phamd@example.com', status: 'Inactive', role: 'Viewer' },
        { id: '105', name: 'Hoang Thi E', email: 'hoange@example.com', status: 'Active', role: 'Manager' },
    ];

    return (
        <div className="dashboard-content animate-fade-in">
            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-header">
                            <span className="stat-label">{stat.label}</span>
                            <div className="stat-icon-wrapper">
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <div className="stat-body">
                            <h3 className="stat-value">{stat.value}</h3>
                            <div className={`stat-trend ${stat.positive ? 'positive' : 'negative'}`}>
                                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                <span>{stat.trend}</span>
                                <span className="text-muted" style={{ marginLeft: '4px' }}>vs last month</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Table Section */}
            <div className="content-section">
                <div className="section-header">
                    <h3 className="section-title">Staff Overview</h3>
                    <button className="btn-primary square">Add New Staff</button>
                </div>

                <div className="table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="font-mono text-muted">{user.id}</td>
                                    <td className="font-bold">{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <span className={`status-badge ${user.status.toLowerCase()}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button className="icon-btn-small">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
        .dashboard-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border: 1px solid var(--border-color);
          transition: var(--transition);
        }

        .stat-card:hover {
          box-shadow: var(--shadow-md);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .stat-icon-wrapper {
          width: 40px;
          height: 40px;
          background: var(--bg-main);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .stat-value {
          font-size: 1.875rem;
          margin-bottom: 0.5rem;
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .stat-trend.positive { color: #10b981; }
        .stat-trend.negative { color: #ef4444; }

        .content-section {
          background: white;
          border: 1px solid var(--border-color);
        }

        .section-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .section-title {
          font-size: 1.1rem;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-primary:hover {
          background: var(--primary-light);
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table th {
          padding: 1rem 1.5rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border-color);
        }

        .admin-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.9rem;
        }

        .admin-table tr:last-child td {
          border-bottom: none;
        }

        .font-mono { font-family: monospace; }
        .font-bold { font-weight: 600; }

        .status-badge {
          padding: 4px 8px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .status-badge.active { background: #dcfce7; color: #166534; }
        .status-badge.pending { background: #fef9c3; color: #854d0e; }
        .status-badge.inactive { background: #fee2e2; color: #991b1b; }

        .icon-btn-small {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
        }

        .icon-btn-small:hover {
          background: var(--bg-main);
          color: var(--primary);
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
