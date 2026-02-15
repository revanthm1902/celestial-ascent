import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#020408',
                color: '#f0f0f0',
                textAlign: 'center',
                fontFamily: "'Inter', sans-serif",
                padding: '2rem'
            }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem',
                    fontFamily: "'Cinzel', serif",
                    color: '#ffd700',
                    textShadow: '0 0 20px rgba(255, 215, 0, 0.4)'
                }}>Coming Soon</h1>
                <p style={{ maxWidth: '400px', lineHeight: '1.6', color: '#9ca3af' }}>
                    The mobile experience is currently being forged in the stars.
                    Please access via desktop for the full experience.
                </p>
            </div>
        </React.StrictMode>,
    )
} else {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )
}
