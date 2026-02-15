import React, { useState, useEffect } from 'react';
import { Save, Globe, RefreshCcw } from 'lucide-react';

const Settings = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchUrl();
    }, []);

    const fetchUrl = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/get-url');
            const data = await response.json();
            setUrl(data.url);
        } catch (error) {
            console.error('Error fetching URL:', error);
            setMessage({ type: 'error', text: 'Không thể tải cấu hình từ server.' });
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('http://localhost:5000/api/save-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Đã lưu cấu hình thành công!' });
            } else {
                setMessage({ type: 'error', text: 'Lỗi khi lưu cấu hình.' });
            }
        } catch (error) {
            console.error('Error saving URL:', error);
            setMessage({ type: 'error', text: 'Không thể kết nối đến server Python.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="settings-view animate-fade-in">
            <div className="settings-card">
                <div className="card-header">
                    <Globe size={24} className="text-secondary" />
                    <h3>Cấu hình Hệ thống</h3>
                </div>

                <form onSubmit={handleSave} className="settings-form">
                    <div className="form-group">
                        <label htmlFor="embedUrl">Liên kết trang nhúng (Embed URL)</label>
                        <div className="input-with-icon">
                            <Globe size={18} className="input-icon" />
                            <input
                                id="embedUrl"
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com"
                                required
                                className="settings-input"
                            />
                        </div>
                        <p className="input-hint">Nhập URL của trang web bạn muốn nhúng vào mục "Web Tra".</p>
                    </div>

                    {message.text && (
                        <div className={`alert ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="submit" className="btn-save" disabled={loading}>
                            {loading ? <RefreshCcw size={18} className="animate-spin" /> : <Save size={18} />}
                            {loading ? 'Đang lưu...' : 'Lưu cấu hình'}
                        </button>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .settings-view {
                    max-width: 800px;
                    margin: 0 auto;
                }

                .settings-card {
                    background: white;
                    border: 1px solid var(--border-color);
                    padding: 2rem;
                    box-shadow: var(--shadow-sm);
                }

                .card-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid var(--border-color);
                }

                .settings-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                label {
                    font-weight: 600;
                    font-size: 0.95rem;
                    color: var(--primary);
                }

                .input-with-icon {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .input-icon {
                    position: absolute;
                    left: 12px;
                    color: var(--text-muted);
                }

                .settings-input {
                    width: 100%;
                    padding: 12px 12px 12px 40px;
                    border: 1px solid var(--border-color);
                    outline: none;
                    font-family: inherit;
                    font-size: 1rem;
                    transition: var(--transition);
                }

                .settings-input:focus {
                    border-color: var(--accent);
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }

                .input-hint {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                }

                .alert {
                    padding: 12px;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .alert.success {
                    background: #dcfce7;
                    color: #166534;
                    border-left: 4px solid #22c55e;
                }

                .alert.error {
                    background: #fee2e2;
                    color: #991b1b;
                    border-left: 4px solid #ef4444;
                }

                .btn-save {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 24px;
                    background: var(--primary);
                    color: white;
                    border: none;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: var(--transition);
                }

                .btn-save:hover:not(:disabled) {
                    background: var(--primary-light);
                }

                .btn-save:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Settings;
