# 📱 Mobile Automation Testing - BelajarBareng

Proyek otomasi pengujian aplikasi mobile Android **BelajarBareng** menggunakan framework **WebdriverIO (WDIO)** dan **Appium** dengan driver **UiAutomator2**. 

Proyek ini menerapkan arsitektur modular **Page Object Pattern (Locators, Test Data, Utilities, Specs)** yang tersusun rapi memisahkan **Skenario Positif (Positive Cases)**, **Skenario Negatif (Negative Cases)**, **Login Manual User Valid**, **Auto-Generated Data Unik**, dan integrasi **Allure Reporting**.

---

## 📑 Daftar Isi

- [📂 Struktur Direktori Proyek](#-struktur-direktori-proyek)
- [🛠️ Prasyarat (Prerequisites)](#️-prasyarat-prerequisites)
- [🚀 Instalasi & Setup](#-instalasi--setup)
- [🧪 Pembagian Skenario Uji (Test Cases)](#-pembagian-skenario-uji-test-cases)
  - [🟢 1. Skenario Positif (Positive Cases)](#-1-skenario-positif-positive-cases)
  - [🔴 2. Skenario Negatif (Negative Cases)](#-2-skenario-negatif-negative-cases)
  - [🌟 3. Skenario End-to-End (E2E Flow)](#-3-skenario-end-to-end-e2e-flow)
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
│       ├── positive/              # 🟢 Folder Positive Test Cases
│       │   ├── register_positive.spec.js  # Registrasi dengan data valid
│       │   ├── login_positive.spec.js     # Login Manual (aulia1@gmail.com) & Dinamis
│       │   └── post_positive.spec.js      # Buat postingan & verifikasi feed
│       ├── negative/              # 🔴 Folder Negative Test Cases
│       │   ├── register_negative.spec.js  # Registrasi email invalid & field kosong
│       │   └── login_negative.spec.js     # Login password salah, unreg email, & field kosong
│       └── e2e_register_login_post.spec.js # 🌟 Skenario E2E (Registrasi -> Login -> Posting)
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

## 🧪 Pembagian Skenario Uji (Test Cases)

### 🟢 1. Skenario Positif (Positive Cases)

* **Registrasi Positif (`test/specs/positive/register_positive.spec.js`)**:
  - Mendaftarkan user baru dengan **nama unik 100% murni huruf tanpa angka** (contoh: `melatibchdfabc`).
  - Mengisi form, scroll ke tombol Register, submit, dan memastikan sistem kembali ke halaman Login.
* **Login Positif (`test/specs/positive/login_positive.spec.js`)**:
  - **Kasus 1 (Login Manual)**: Menggunakan user valid tetap `email: aulia1@gmail.com` dan `password: @Aulia1`.
  - **Kasus 2 (Login Dinamis)**: Menggunakan akun yang baru saja di-generate dari sesi registrasi.
  - **Assertion**: Memverifikasi Header Beranda `"Belajar Bareng"` dan Form Postingan berhasil dimuat.
* **Posting Positif (`test/specs/positive/post_positive.spec.js`)**:
  - Login dengan user valid $\to$ Mengisi teks postingan $\to$ Submit $\to$ Scroll ke bawah dan memastikan postingan tampil di feed.

---

### 🔴 2. Skenario Negatif (Negative Cases)

* **Login Negatif (`test/specs/negative/login_negative.spec.js`)**:
  - **Kasus 1**: Gagal login saat memasukkan **Password Salah** (`SalahPassword123!`).
  - **Kasus 2**: Gagal login dengan **Email yang Belum Terdaftar** (`emailtidakada_xyz999@gmail.com`).
  - **Kasus 3**: Gagal login saat **Semua Field Dikosongkan**.
  - **Assertion**: Memverifikasi sistem menolak login dan tetap berada di halaman login (tidak masuk ke beranda).
* **Registrasi Negatif (`test/specs/negative/register_negative.spec.js`)**:
  - **Kasus 1**: Gagal registrasi saat memasukkan **Format Email Tidak Valid** (tanpa domain / `@`).
  - **Kasus 2**: Gagal registrasi saat **Semua Field Dikosongkan**.
  - **Assertion**: Memverifikasi form registrasi menolak proses pendaftaran dan tetap berada di layar registrasi.

---

### 🌟 3. Skenario End-to-End (E2E Flow)

File: [`test/specs/e2e_register_login_post.spec.js`](file:///c:/Users/qcris/OneDrive/Documents/Digital%20Skola/Appium_Mobile_Automation_BelajarBareng/test/specs/e2e_register_login_post.spec.js)
1. **Langkah 1**: Registrasi akun baru (Auto-generated unique name tanpa angka $\to$ disimpan otomatis ke sesi).
2. **Langkah 2**: Login menggunakan akun yang baru saja didaftarkan tersebut $\to$ validasi assertion beranda.
3. **Langkah 3**: Buat postingan dengan akun tersebut $\to$ submit $\to$ scroll feed & validasi.

---

## ▶️ Perintah Menjalankan Pengujian

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run test:e2e` | **🌟 Menjalankan Alur Lengkap E2E (Registrasi $\to$ Login $\to$ Posting)** |
| `npm run test:positive` | **🟢 Menjalankan Semua Skenario Positif (Register, Login Manual, Posting)** |
| `npm run test:negative` | **🔴 Menjalankan Semua Skenario Negatif (Login Invalid, Register Invalid)** |
| `npm run test:login:manual` | Menjalankan pengujian Login Manual (user valid `aulia1@gmail.com`) |
| `npm run test:login:negative` | Menjalankan pengujian Login Negatif (password salah, unreg email) |
| `npm run test:register:positive` | Menjalankan pengujian Registrasi Positif (user baru unik) |
| `npm run test:register:negative` | Menjalankan pengujian Registrasi Negatif (email invalid, field kosong) |
| `npm run test:mobile` | Menjalankan seluruh test suite |

---

## 📊 Menghasilkan & Membuka Allure Report

```bash
# 1. Generate dan Buka Laporan Visual Sekaligus:
npm run report

# 2. Buka Laporan yang Sudah Ada:
npm run allure:open
```

Dashboard Allure Report akan menampilkan statistik lengkap pengujian positif dan negatif beserta durasi dan log pengujian.

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
