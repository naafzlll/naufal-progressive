import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  // Deteksi status koneksi internet
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Tangkap event install PWA
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Cek apakah sudah diinstall
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">⚡ PWA</div>
        <h1>My Progressive Web App</h1>
        <p className="subtitle">Pemrograman Web Lanjut — React PWA</p>
      </header>

      <main className="App-main">

        {/* Status Koneksi */}
        <div className={`status-card ${isOnline ? 'online' : 'offline'}`}>
          <span className="status-dot"></span>
          <span>{isOnline ? '🟢 Online — Terhubung ke internet' : '🔴 Offline — Mode Tanpa Internet'}</span>
        </div>

        {/* Tombol Install */}
        {!isInstalled && installPrompt && (
          <div className="install-card">
            <h2>📲 Install Aplikasi</h2>
            <p>Install aplikasi ini ke perangkat Anda untuk akses cepat!</p>
            <button className="install-btn" onClick={handleInstall}>
              Tambahkan ke Homescreen
            </button>
          </div>
        )}

        {isInstalled && (
          <div className="install-card installed">
            <p>✅ Aplikasi sudah terinstall di perangkat Anda!</p>
          </div>
        )}

        {/* Fitur PWA */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Service Worker</h3>
            <p>Caching otomatis aset aplikasi untuk performa lebih cepat dan dukungan offline.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Web Manifest</h3>
            <p>Metadata aplikasi: nama, ikon, warna tema, dan tampilan standalone.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📵</div>
            <h3>Offline Support</h3>
            <p>Aplikasi tetap dapat diakses meskipun koneksi internet tidak tersedia.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📲</div>
            <h3>Installable</h3>
            <p>Dapat diinstall ke homescreen perangkat mobile maupun desktop.</p>
          </div>
        </div>

        {/* Panduan Pengujian */}
        <div className="info-card">
          <h2>🔍 Cara Menguji PWA</h2>
          <ol>
            <li>Buka <strong>Chrome DevTools</strong> (F12)</li>
            <li>Pilih tab <strong>Application</strong></li>
            <li>Cek <strong>Manifest</strong> — pastikan semua field terisi</li>
            <li>Cek <strong>Service Workers</strong> — pastikan status "Activated"</li>
            <li>Jalankan <strong>Lighthouse Audit</strong> (Ctrl+Shift+P → "Lighthouse")</li>
          </ol>
        </div>

      </main>

      <footer className="App-footer">
        <p>Dibuat untuk praktikum Pemrograman Web Lanjut &mdash; PWA dengan React</p>
      </footer>
    </div>
  );
}

export default App;
