# 📱 Mobile Automation Testing - BelajarBareng

Proyek otomasi pengujian aplikasi mobile Android **BelajarBareng** menggunakan framework **WebdriverIO (WDIO)** dan **Appium** dengan driver **UiAutomator2**.

Proyek ini menerapkan arsitektur modular **Page Object Pattern (Locators, Test Data, Utilities, Specs)** yang tersusun rapi memisahkan fitur autentikasi, manajemen postingan, skenario End-to-End (E2E), auto-generated dataset tanpa angka, serta integrasi **Allure Reporting BDD** dengan widget *Environment* dan grafik *Trend History*.

---

## 📑 Daftar Isi

- [📂 Struktur Direktori Proyek](#-struktur-direktori-proyek)
- [🛠️ Prasyarat (Prerequisites)](#️-prasyarat-prerequisites)
- [🚀 Instalasi & Setup](#-instalasi--setup)
- [📊 Arsitektur Pengujian & Hierarki BDD Allure](#-arsitektur-pengujian--hierarki-bdd-allure)
- [▶️ Perintah Menjalankan Pengujian](#️-perintah-menjalankan-pengujian)
- [📈 Menghasilkan & Membuka Allure Report](#-menghasilkan--membuka-allure-report)
- [🔍 Panduan Appium Inspector](#-panduan-appium-inspector)
- [🚫 Standar Git & File yang Diabaikan (.gitignore)](#-standar-git--file-yang-diabaikan-gitignore)

---

## 📂 Struktur Direktori Proyek

```
Appium_Mobile_Automation_BelajarBareng/
├── app/
│   └── app-release.apk              # File APK aplikasi BelajarBareng
├── dumps/
│   ├── login_dump.xml               # Hierarki UI (XML Dump) layar Login
│   └── home_dump.xml                # Hierarki UI (XML Dump) layar Beranda / Postingan
├── scripts/
│   └── prepare_allure.js            # Generator environment.properties & sync history trend
├── test/
│   ├── data/                        # 📁 Data Pengujian (Test Data)
│   │   ├── auth.data.js             # Dataset Positif (Manual & Dinamis) & Negatif
│   │   └── post.data.js             # Data konten teks postingan
│   ├── locators/                    # 📁 Selector Elemen (Locators)
│   │   ├── login.locator.js         # Selector elemen form login
│   │   ├── register.locator.js      # Selector elemen form registrasi
│   │   └── home.locator.js          # Selector elemen beranda & form posting
│   ├── utils/                       # 📁 Helper & Utilitas
│   │   ├── app.util.js              # State reset aplikasi (mobile: clearApp)
│   │   ├── generator.util.js        # Generator username 100% huruf (tanpa angka)
│   │   └── scroll.util.js           # Gestur scroll W3C Actions
│   └── specs/                       # 📁 Skenario Pengujian Modular
│       ├── auth/
│       │   ├── register.spec.js     # Registrasi: Valid dynamic user & Negative cases
│       │   └── login.spec.js        # Login: Manual user, Dynamic user, & Negative cases
│       ├── post/
│       │   └── post.spec.js         # Posting: Create new post & verify on feed
│       └── e2e/
│           └── e2e_flow.spec.js     # Master E2E Flow: Register -> Login -> Post -> Feed
├── .gitignore                       # Konfigurasi file yang dikecualikan dari Git
├── package.json                     # Dependencies & npm scripts
├── README.md                        # Dokumentasi lengkap proyek
└── wdio.conf.js                     # Konfigurasi WebdriverIO & Allure Reporter
```

---

## 🛠️ Prasyarat (Prerequisites)

1. **Node.js**: Versi LTS (v18.x atau lebih baru).
2. **Java Development Kit (JDK)**: Versi 11 atau 17.
3. **Android SDK**: `ANDROID_HOME` dan `adb` telah terdaftar di Environment Variables.
4. **Device Android / Emulator**:
   - Fisik (USB Debugging aktif) atau Emulator (Android Studio AVD).
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

## 📊 Arsitektur Pengujian & Hierarki BDD Allure

Pengujian telah distandarisasi menggunakan anotasi BDD resmi (`@wdio/allure-reporter`) sehingga terstruktur rapi pada tab **Behaviors** Allure Report:

| Epic | Feature | Story | Tipe Kasus |
| :--- | :--- | :--- | :--- |
| **Authentication** | `Registration` | `Valid User Registration` | Positif (Auto-Generated 100% huruf) |
| **Authentication** | `Registration` | `Invalid Email Registration` | Negatif (Email tanpa domain) |
| **Authentication** | `Registration` | `Empty Fields Registration` | Negatif (Field kosong) |
| **Authentication** | `Login` | `Manual Valid User Login` | Positif (`aulia1@gmail.com`) |
| **Authentication** | `Login` | `Dynamic User Login` | Positif (Akun hasil registrasi) |
| **Authentication** | `Login` | `Wrong Password Login` | Negatif (Password salah) |
| **Authentication** | `Login` | `Unregistered Email Login` | Negatif (Email tidak terdaftar) |
| **Authentication** | `Login` | `Empty Fields Login` | Negatif (Field kosong) |
| **Post Management** | `Feed & Posting` | `Create Post` | Positif (Buat postingan & cek feed) |
| **End-to-End Workflow** | `Complete User Journey` | `Register to Post Flow` | E2E (Register $\to$ Login $\to$ Posting) |

---

## ▶️ Perintah Menjalankan Pengujian

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run test:all` | **Menjalankan Seluruh Suite Pengujian (Auth, Post, E2E)** |
| `npm run test:e2e` | Menjalankan Skenario E2E Lengkap (*Register $\to$ Login $\to$ Post*) |
| `npm run test:auth` | Menjalankan seluruh modul Autentikasi (Register & Login) |
| `npm run test:login` | Menjalankan pengujian Login (Manual, Dinamis, & Negatif) |
| `npm run test:register` | Menjalankan pengujian Registrasi (Dinamis & Negatif) |
| `npm run test:post` | Menjalankan pengujian Buat Postingan & Verifikasi Feed |
| `npm run report` | **Menghasilkan data environment, sinkronisasi history, dan membuka Allure Report** |

---

## 📈 Menghasilkan & Membuka Allure Report

Proyek ini telah dilengkapi script otomatis `scripts/prepare_allure.js` yang secara otomatis:
1. Menghasilkan metadata sistem dan perangkat pada file `allure-results/environment.properties` (menghidupkan widget **Environment**).
2. Menyalin folder `allure-report/history` ke `allure-results/history` sebelum proses generate (menghidupkan grafik **Trend History**).
3. Menyertakan metadata runner pada `allure-results/executor.json` (menghidupkan widget **Executors**).

```bash
# Generate dan buka Allure Report secara instan:
npm run report

# Atau buka Allure Report yang sudah pernah digenerate:
npm run allure:open
```

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

* `node_modules/`: Dependensi library npm.
* `allure-results/` & `allure-report/`: Artefak laporan pengujian Allure.
* `test/data/session_user.json`: Data sesi runtime sementara.
* `*.xml` *(kecuali `dumps/*.xml`)*: File XML dump debug.
* `*.log`: Log debug npm/system.
* `.DS_Store`, `Thumbs.db`, `.vscode/`, `.idea/`: File bawaan sistem operasi dan editor.
