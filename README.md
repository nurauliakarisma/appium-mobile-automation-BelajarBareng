# 📱 Appium Mobile Automation - BelajarBareng

Proyek otomasi pengujian aplikasi mobile Android **BelajarBareng** menggunakan framework **WebdriverIO (WDIO)** dan **Appium** dengan driver **UiAutomator2**. Proyek ini menerapkan arsitektur modular yang memisahkan **Locators**, **Test Data**, **Helper / Utilities**, dan **Test Cases (Specs)**, serta terintegrasi penuh dengan **Allure Reporting**.

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
│   ├── data/                      # 📁 Direktori Data Pengujian (Test Data)
│   │   ├── auth.data.js           # Generator data dinamis & manajemen penyimpanan session
│   │   ├── session_user.json      # File penyimpanan user hasil generate registrasi
│   │   └── post.data.js           # Data konten teks postingan
│   ├── locators/                  # 📁 Direktori Selector Elemen (Locators)
│   │   ├── login.locator.js       # Selector elemen form login
│   │   ├── register.locator.js    # Selector elemen form registrasi
│   │   └── home.locator.js        # Selector elemen beranda & form posting
│   ├── utils/                     # 📁 Direktori Helper / Utility
│   │   ├── generator.util.js      # Generator data unik murni huruf (tanpa angka)
│   │   └── scroll.util.js         # Fungsi gestur scroll (scroll down, scroll to bottom)
│   └── specs/                     # 📁 Direktori Test Case / Skenario Pengujian
│       ├── e2e_register_login_post.spec.js # 🌟 Skenario E2E (Registrasi -> Login -> Posting)
│       ├── register.spec.js       # Skenario Registrasi Otomatis (Unik Tanpa Angka) + Scroll
│       ├── login.spec.js          # Skenario Login menggunakan akun hasil registrasi + Assertion
│       └── post.spec.js           # Skenario Buat Postingan menggunakan akun hasil registrasi
├── allure-results/                # File output mentah hasil pengujian Allure
├── allure-report/                 # Dashboard visual HTML Allure Report
├── .gitignore                     # Konfigurasi file yang diabaikan Git
├── package.json                   # Dependencies & npm scripts
├── README.md                      # Dokumentasi lengkap proyek
└── wdio.conf.js                   # Konfigurasi WebdriverIO & Allure Reporter
```

---

## 🛠️ Prasyarat (Prerequisites)

1. **Node.js**: Versi LTS (v18.x atau lebih baru).
2. **Java Development Kit (JDK)**: Versi 11 atau 17.
3. **Android SDK**: `ANDROID_HOME` dan `adb` sudah terdaftar di Environment Variables.
4. **Device Android / Emulator**:
   - Fisik (USB Debugging / Wireless Debugging aktif) atau Emulator.
   - Pastikan device terdeteksi:
     ```bash
     adb devices
     ```
5. **Appium UiAutomator2 Driver**:
   ```bash
   npx appium driver install uiautomator2
   ```

---

## 🚀 Instalasi

```bash
npm install
```

---

## 📋 Alur Integrasi Data & Skenario Pengujian

### 🔄 Alur End-to-End (`test/specs/e2e_register_login_post.spec.js`)
1. **Registrasi Akun Baru**:
   - Otomatis membuat username & email unik tanpa angka (contoh: `melatibchdfabc`, `melatibchdfabc@gmail.com`).
   - Data user yang di-generate langsung **disimpan secara otomatis** ke file `test/data/session_user.json`.
   - Mengisi form registrasi, scroll ke bawah, dan klik tombol Register.
2. **Login dengan Akun Hasil Generate**:
   - Membaca data akun dari `session_user.json`.
   - Mengisi email & password dari user yang baru saja didaftarkan.
   - Klik Login dan memvalidasi assertion (header beranda & form input postingan muncul).
   - Melakukan scroll sampai bawah pada beranda.
3. **Buat Postingan dengan Akun Tersebut**:
   - Mengisi teks postingan: `"Sedang belajar membuat automation testing mobile dengan appium"`.
   - Klik tombol Posting.
   - Scroll feed untuk memverifikasi postingan telah masuk.

---

## ▶️ Menjalankan Pengujian

### 1. Jalankan Alur Lengkap (E2E Flow: Registrasi ➡️ Login ➡️ Posting)
```bash
npm run test:e2e
```

### 2. Jalankan Skenario Tertentu Saja
* **Skenario Registrasi saja**:
  ```bash
  npm run test:register
  ```
* **Skenario Login & Assertion saja**:
  ```bash
  npm run test:login
  ```
* **Skenario Buat Postingan saja**:
  ```bash
  npm run test:post
  ```

### 3. Jalankan Semua Test Suite
```bash
npm run test:mobile
```

---

## 📊 Menghasilkan & Membuka Allure Report

Setelah pengujian dijalankan, Anda dapat membuat laporan visual interaktif Allure Report dengan perintah:

### 1. Generate & Buka Laporan Sekaligus:
```bash
npm run report
```

### 2. Atau Secara Terpisah:
* **Generate Laporan**:
  ```bash
  npm run allure:generate
  ```
* **Buka Laporan di Browser**:
  ```bash
  npm run allure:open
  ```
Laporan akan otomatis terbuka di browser menampilkan grafik ringkasan pengujian, durasi, log langkah, dan screenshot kegagalan (jika ada).
