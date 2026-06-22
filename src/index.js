import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ✅ Aktifkan Service Worker untuk mendukung offline caching
// Ganti register() menjadi unregister() jika ingin menonaktifkan
serviceWorkerRegistration.register();

// Opsional: kirim data performa ke analitik
reportWebVitals();
