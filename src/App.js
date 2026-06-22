import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Menangani status online/offline
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Menangani instalasi PWA
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  // Data Portofolio (bisa kamu sesuaikan nanti)
  const projects = [
    { id: 1, title: 'Aplikasi Manajemen Tugas', desc: 'Aplikasi berbasis web untuk mengatur *deadline* kuliah.', tech: 'React, Firebase' },
    { id: 2, title: 'E-Commerce Sederhana', desc: 'Platform toko online dengan integrasi *payment gateway*.', tech: 'Node.js, Express, MongoDB' },
    { id: 3, title: 'Web Progressive (PWA)', desc: 'Proyek pembuatan PWA dengan fitur *offline-first*.', tech: 'React, Service Worker' },
  ];

  return (
    <div className="portfolio-container">
      {/* Status Bar PWA */}
      <div className={`status-bar ${isOnline ? 'online' : 'offline'}`}>
        <span className="dot"></span>
        {isOnline ? 'Online — Terhubung ke internet' : 'Offline — Berjalan dalam mode lokal'}
      </div>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="profile-badge">⚡ Portofolio</div>
          <h1>Saya Naufal 2403040066</h1>
          <p className="subtitle">Mata Kuliah Pemrograman Web Lanjut </p>
          
          {/* Tombol Install PWA tetap dipertahankan */}
          {deferredPrompt && (
            <button className="btn-install" onClick={handleInstallClick}>
              📲 Tambahkan ke Homescreen
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Tentang Saya */}
        <section className="section">
          <h2>About Me</h2>
          <p>halo.</p>
        </section>

        {/* Daftar Proyek */}
        <section className="section">
          <h2>latihan</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <span className="tech-badge">{project.tech}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Naufal. Built with React PWA.</p>
      </footer>
    </div>
  );
}

export default App;