# My PWA App — Pemrograman Web Lanjut

Aplikasi Progressive Web App (PWA) menggunakan React.

## 🚀 Cara Menjalankan

### 1. Install dependensi
```bash
npm install
```

### 2. Jalankan di mode development
```bash
npm start
```
Buka [http://localhost:3000](http://localhost:3000) di browser.

> ⚠️ **Catatan:** Service Worker hanya aktif di mode **production** (`npm run build`).  
> Di mode development, fitur offline tidak akan berfungsi.

---

## 📦 Build untuk Produksi

```bash
npm run build
```

Folder `build/` berisi semua file siap deploy, termasuk service worker dan manifest.

---

## 🌐 Deploy ke Netlify

1. Push proyek ke GitHub
2. Buka [https://app.netlify.com](https://app.netlify.com)
3. Klik **New site from Git** → pilih repo
4. Isi konfigurasi:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
5. Klik **Deploy Site**

---

## 🔍 Cara Menguji PWA

1. Buka Chrome DevTools (F12)
2. Pilih tab **Application**
3. Klik **Manifest** — pastikan semua field terisi
4. Klik **Service Workers** — pastikan status "Activated and running"
5. Jalankan **Lighthouse Audit:**
   - Tekan `Ctrl + Shift + P`
   - Ketik "Lighthouse"
   - Generate report

---

## 📁 Struktur Proyek

```
my-pwa-app/
├── public/
│   ├── index.html          # HTML utama
│   ├── manifest.json       # Metadata PWA
│   └── icons/
│       ├── icon-192x192.png  # Ikon homescreen
│       └── icon-512x512.png  # Ikon splash screen
├── src/
│   ├── index.js            # Entry point + register SW
│   ├── index.css           # Global styles
│   ├── App.js              # Komponen utama
│   ├── App.css             # Styles komponen
│   ├── service-worker.js   # Service Worker (Workbox)
│   ├── serviceWorkerRegistration.js  # Helper registrasi SW
│   └── reportWebVitals.js  # Pengukuran performa
├── generate-icons.js       # Script generator ikon
├── netlify.toml            # Konfigurasi Netlify
└── package.json
```

---

## 📲 Install ke Homescreen (Mobile)

1. Buka aplikasi di Chrome mobile
2. Ketuk menu **⋮** (tiga titik)
3. Pilih **"Add to Home screen"**
4. Konfirmasi install

---

## ✅ Fitur PWA yang Diimplementasikan

- [x] Web App Manifest
- [x] Service Worker dengan Workbox
- [x] Offline Support (cache-first strategy)
- [x] Installable (Add to Homescreen)
- [x] Deteksi status online/offline
- [x] Responsive design
