import React from 'react';

const EmbedPage = () => {
    return (
        <div className="embed-container animate-fade-in">
            <iframe
                src="https://web-tra.pages.dev/"
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
