import React from 'react';
import { Package, Plus, Filter, Download, Edit2, Trash2, ExternalLink } from 'lucide-react';

const Products = () => {
    const products = [
        { id: 'PRD001', name: 'Premium Espresso Beans', category: 'Coffee', stock: 124, price: '$24.00', status: 'In Stock' },
        { id: 'PRD002', name: 'Ceramic Pour Over Set', category: 'Equipment', stock: 45, price: '$45.00', status: 'Low Stock' },
        { id: 'PRD003', name: 'Organic Green Tea', category: 'Tea', stock: 0, price: '$18.50', status: 'Out of Stock' },
        { id: 'PRD004', name: 'Digital Scale Pro', category: 'Equipment', stock: 89, price: '$32.00', status: 'In Stock' },
        { id: 'PRD005', name: 'Ethiopian Single Origin', category: 'Coffee', stock: 67, price: '$28.00', status: 'In Stock' },
    ];

    return (
        <div className="products-view animate-fade-in">
            <div className="view-actions">
                <div className="search-filter">
                    <div className="filter-group">
                        <Filter size={18} />
                        <span>Filter</span>
                    </div>
                    <button className="btn-outline">
                        <Download size={18} />
                        Export CSV
                    </button>
                </div>
                <button className="btn-primary">
                    <Plus size={18} />
                    Add Product
                </button>
            </div>

            <div className="table-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item.id}>
                                <td className="font-mono text-muted">{item.id}</td>
                                <td className="font-bold">{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.stock}</td>
                                <td className="font-bold">{item.price}</td>
                                <td>
                                    <span className={`status-pill ${item.status.toLowerCase().replace(' ', '-')}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <div className="action-buttons">
                                        <button className="icon-btn-small" title="Edit"><Edit2 size={16} /></button>
                                        <button className="icon-btn-small" title="View"><ExternalLink size={16} /></button>
                                        <button className="icon-btn-small text-danger" title="Delete"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .products-view {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .view-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .search-filter {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: white;
          border: 1px solid var(--border-color);
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .btn-outline {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: white;
          border: 1px solid var(--border-color);
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: var(--transition);
        }

        .btn-outline:hover {
          background: var(--bg-main);
        }

        .btn-primary {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--primary);
          color: white;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .table-card {
          background: white;
          border: 1px solid var(--border-color);
        }

        .status-pill {
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .status-pill.in-stock { background: #dcfce7; color: #166534; }
        .status-pill.low-stock { background: #fef9c3; color: #854d0e; }
        .status-pill.out-of-stock { background: #fee2e2; color: #991b1b; }

        .action-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .text-danger {
          color: #ef4444 !important;
        }

        .text-danger:hover {
          background: #fee2e2 !important;
        }
      `}</style>
        </div>
    );
};

export default Products;
