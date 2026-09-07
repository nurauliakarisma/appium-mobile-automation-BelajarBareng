# 📱 Mobile Automation Testing - BelajarBareng

Proyek otomasi pengujian aplikasi mobile Android **BelajarBareng** menggunakan framework **WebdriverIO (WDIO)** dan **Appium** dengan driver **UiAutomator2**. 

Proyek ini menerapkan arsitektur modular **Page Object Pattern (Locators, Test Data, Utilities, Specs)** yang tersusun rapi memisahkan **Skenario Positif (Positive Cases)**, **Skenario Negatif (Negative Cases)**, **Login Manual User Valid**, **Auto-Generated Data Unik**, dan integrasi **Allure Reporting**.

---

## 📑 Daftar Isi

- [📂 Struktur Direktori Proyek](#-struktur-direktori-proyek)
- [🛠️ Prasyarat (Prerequisites)](#️-prasyarat-prerequisites)
- [🚀 Instalasi & Setup](#-instalasi--setup)
- [🔄 Alur Urutan Pengujian (Sequential Flow)](#-alur-urutan-pengujian-sequential-flow)
  - [1. Tahap 1: Login Manual User Valid](#1-tahap-1-login-manual-user-valid)
  - [2. Tahap 2: Registrasi dengan Auto-Generate (Tanpa Angka)](#2-tahap-2-registrasi-dengan-auto-generate-tanpa-angka)
  - [3. Tahap 3: Skenario Positif (Login Akun Baru & Posting)](#3-tahap-3-skenario-positif-login-akun-baru--posting)
  - [4. Tahap 4: Skenario Negatif (Validasi Error & Field Kosong)](#4-tahap-4-skenario-negatif-validasi-error--field-kosong)
- [▶️ Perintah Menjalankan Pengujian](#️-perintah-menjalankan-pengujian)
- [📊 Menghasilkan & Membuka Allure Report](#-menghasilkan--membuka-allure-report)
- [🔍 Panduan Appium Inspector](#-panduan-appium-inspector)
- [🚫 Standar Git & File yang Diabaikan (.gitignore)](#-standar-git--file-yang-diabaikan-gitignore)

---

## 📂 Struktur Direktori Proyek

```
Appium_Mobile_Automation_BelajarBareng/
├── app/
│   └── app-release.apk            # File APK aplikasi BelajarBareng
├── dumps/
│   ├── login_dump.xml             # Hierarki UI (XML Dump) layar Login
│   └── home_dump.xml              # Hierarki UI (XML Dump) layar Beranda / Postingan
├── test/
│   ├── data/                      # 📁 Data Pengujian (Test Data)
│   │   ├── auth.data.js           # Dataset Positif (Manual & Dinamis) & Negatif (Invalid)
│   │   └── post.data.js           # Data konten teks postingan
│   ├── locators/                  # 📁 Selector Elemen (Locators)
│   │   ├── login.locator.js       # Selector elemen form login
│   │   ├── register.locator.js    # Selector elemen form registrasi
│   │   └── home.locator.js        # Selector elemen beranda & form posting
│   ├── utils/                     # 📁 Helper & Utilitas
│   │   ├── generator.util.js      # Generator akun unik 100% huruf (tanpa angka)
│   │   └── scroll.util.js         # Gestur scroll W3C Actions
│   └── specs/                     # 📁 Skenario Pengujian (Specs)
│       ├── full_test_sequence.spec.js # 🌟 Master Suite: Manual -> Regis -> Positif -> Negatif
│       ├── positive/              # 🟢 Folder Positive Test Cases
│       │   ├── register_positive.spec.js  # Registrasi dengan data valid
│       │   ├── login_positive.spec.js     # Login Manual (aulia1@gmail.com) & Dinamis
│       │   └── post_positive.spec.js      # Buat postingan & verifikasi feed
│       ├── negative/              # 🔴 Folder Negative Test Cases
│       │   ├── register_negative.spec.js  # Registrasi email invalid & field kosong
│       │   └── login_negative.spec.js     # Login password salah, unreg email, & field kosong
│       └── e2e_register_login_post.spec.js # Skenario E2E (Registrasi -> Login -> Posting)
├── .gitignore                     # Konfigurasi file yang dikecualikan dari Git
├── package.json                   # Dependencies & npm scripts
├── README.md                      # Dokumentasi lengkap proyek
└── wdio.conf.js                   # Konfigurasi WebdriverIO & Allure Reporter
```

---

## 🛠️ Prasyarat (Prerequisites)

1. **Node.js**: Versi LTS (v18.x atau lebih baru).
2. **Java Development Kit (JDK)**: Versi 11 atau 17.
3. **Android SDK**: `ANDROID_HOME` dan `adb` telah terdaftar di Environment Variables.
4. **Device Android / Emulator**:
   - Fisik (USB Debugging / Wireless Debugging aktif) atau Emulator (Android Studio AVD).
   - Cek koneksi device:
     ```bash
     adb devices
     ```
5. **Appium UiAutomator2 Driver**:
   ```bash
   npx appium driver install uiautomator2
   ```

---

## 🚀 Instalasi & Setup

```bash
npm install
```

---

## 🔄 Alur Urutan Pengujian (Sequential Flow)

File pengujian urutan lengkap berada di: [`test/specs/full_test_sequence.spec.js`](file:///c:/Users/qcris/OneDrive/Documents/Digital%20Skola/Appium_Mobile_Automation_BelajarBareng/test/specs/full_test_sequence.spec.js).

### 1. Tahap 1: Login Manual User Valid
* Menggunakan data kredensial valid tetap:
  - **Email**: `aulia1@gmail.com`
  - **Password**: `@Aulia1`
* **Alur**: Memasukkan email & password $\to$ Klik Login $\to$ **Assert**: Berhasil masuk ke beranda & scroll feed.

### 2. Tahap 2: Registrasi dengan Auto-Generate (Tanpa Angka)
* Menggunakan `generator.util.js` untuk membuat nama unik murni huruf (contoh: `melatibchdfabc`).
* Data otomatis disimpan ke file sesi.
* **Alur**: Masuk form register $\to$ isi username, email, password $\to$ scroll $\to$ submit $\to$ **Assert**: Kembali ke halaman login.

### 3. Tahap 3: Skenario Positif (Login Akun Baru & Posting)
* **Login Akun Baru**: Membaca user yang baru saja didaftarkan pada Tahap 2 $\to$ submit login $\to$ **Assert**: Masuk ke beranda.
* **Buat Postingan**: Mengisi teks postingan $\to$ klik Posting $\to$ scroll down $\to$ **Assert**: Postingan berhasil tampil di feed.

### 4. Tahap 4: Skenario Negatif (Validasi Error & Field Kosong)
* **Negatif Login**: Uji coba login menggunakan **Password Salah** $\to$ **Assert**: Sistem menolak login dan tetap berada di halaman login.
* **Negatif Registrasi**: Uji coba registrasi dengan **Format Email Tidak Valid** $\to$ **Assert**: Sistem menahan pengguna tetap di layar registrasi.

---

## ▶️ Perintah Menjalankan Pengujian

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run test:sequence` | **🌟 MENJALANKAN URUTAN LENGKAP: Manual Login ➡️ Regis Generate ➡️ Positif Flow ➡️ Negatif Flow** |
| `npm run test:positive` | 🟢 Menjalankan Semua Skenario Positif (Register, Login Manual, Posting) |
| `npm run test:negative` | 🔴 Menjalankan Semua Skenario Negatif (Login & Register Invalid) |
| `npm run test:login:manual` | Menjalankan khusus **Login Manual** (`aulia1@gmail.com`) |
| `npm run test:e2e` | Menjalankan skenario E2E (*Registrasi $\to$ Login $\to$ Posting*) |
| `npm run report` | Menghasilkan & membuka visual **Allure Report** di browser |

---

## 📊 Menghasilkan & Membuka Allure Report

```bash
# 1. Generate dan Buka Laporan Visual Sekaligus:
npm run report

# 2. Buka Laporan yang Sudah Ada:
npm run allure:open
```

Dashboard Allure Report akan menampilkan statistik lengkap pengujian berurutan, log langkah per langkah, durasi, dan status kelulusan.

---

## 🔍 Panduan Appium Inspector

1. Jalankan server: `npx appium`
2. Buka Appium Inspector dengan JSON Capabilities:
   ```json
   {
     "platformName": "Android",
     "appium:automationName": "UiAutomator2",
     "appium:deviceName": "Android Device",
     "appium:app": "C:\\Users\\qcris\\OneDrive\\Documents\\Digital Skola\\Appium_Mobile_Automation_BelajarBareng\\app\\app-release.apk",
     "appium:appPackage": "com.example.belajar_bareng",
     "appium:appActivity": "com.example.belajar_bareng.MainActivity",
     "appium:autoGrantPermissions": true,
     "appium:newCommandTimeout": 3600
   }
   ```
3. Klik **Start Session**.

---

## 🚫 Standar Git & File yang Diabaikan (`.gitignore`)

* `node_modules/`: Dependensi library.
* `allure-results/` & `allure-report/`: Laporan pengujian dinamis lokal.
* `test/data/session_user.json`: File data runtime sesi sementara.
* `*.xml` *(kecuali `dumps/*.xml`)*: File XML dump sementara saat debugging.
* `*.log`: Log debug npm/yarn.
* `.DS_Store`, `Thumbs.db`, `.vscode/`, `.idea/`: File bawaan OS dan editor.
