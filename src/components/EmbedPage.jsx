import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const EmbedPage = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUrl = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/get-url');
                const data = await response.json();
                setUrl(data.url);
            } catch (error) {
                console.error('Error fetching URL:', error);
                setUrl('https://web-tra.pages.dev/'); // Fallback
            } finally {
                setLoading(false);
            }
        };

        fetchUrl();
    }, []);

    if (loading) {
        return (
            <div className="embed-loading">
                <Loader2 className="animate-spin" size={48} color="#3b82f6" />
                <p>Đang tải trang web...</p>
                <style jsx>{`
                    .embed-loading {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: calc(100vh - var(--header-height));
                        gap: 1rem;
                        color: var(--text-muted);
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
    }

    return (
        <div className="embed-container animate-fade-in">
            <iframe
                src={url}
                title="Web Tra Embedded"
                className="embed-iframe"
                frameBorder="0"
                allowFullScreen
            ></iframe>

            <style jsx>{`
                .embed-container {
                    width: 100%;
                    height: calc(100vh - var(--header-height));
                    background: white;
                    overflow: hidden;
                    position: relative;
                }

                .embed-iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                    display: block;
                }
            `}</style>
        </div>
    );
};

export default EmbedPage;
