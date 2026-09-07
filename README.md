# 📱 Mobile Automation Testing - BelajarBareng

Proyek otomasi pengujian aplikasi mobile Android **BelajarBareng** menggunakan framework **WebdriverIO (WDIO)** dan **Appium** dengan driver **UiAutomator2**. 

Proyek ini dibangun menggunakan arsitektur modular berbasis **Page Object Pattern (Locators, Test Data, Utilities, Specs)**, mendukung **Auto-Generated Data Unik (Tanpa Angka)**, penyimpanan sesi dinamis, gestur scroll otomatis, serta terintegrasi penuh dengan **Allure Reporting**.

---

## 📑 Daftar Isi

- [📂 Struktur Direktori Proyek](#-struktur-direktori-proyek)
- [🛠️ Prasyarat (Prerequisites)](#️-prasyarat-prerequisites)
- [🚀 Instalasi & Setup](#-instalasi--setup)
- [⚙️ Konfigurasi Appium & Desired Capabilities](#️-konfigurasi-appium--desired-capabilities)
- [🌟 Fitur & Arsitektur Pengujian](#-fitur--arsitektur-pengujian)
  - [1. Generator Akun Unik Murni Huruf (`generator.util.js`)](#1-generator-akun-unik-murni-huruf-generatorutiljs)
  - [2. Manajemen Sesi Otomatis (`auth.data.js`)](#2-manajemen-sesi-otomatis-authdatajs)
  - [3. Helper Gestur Scroll W3C Actions (`scroll.util.js`)](#3-helper-gestur-scroll-w3c-actions-scrollutiljs)
  - [4. Pemisahan Modular Locators](#4-pemisahan-modular-locators)
- [📋 Skenario Pengujian (Test Specs)](#-skenario-pengujian-test-specs)
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
│   ├── data/                      # 📁 Direktori Data Pengujian (Test Data)
│   │   ├── auth.data.js           # Generator data registrasi dinamis & manajemen sesi
│   │   └── post.data.js           # Data konten teks postingan
│   ├── locators/                  # 📁 Direktori Selector Elemen (Locators)
│   │   ├── login.locator.js       # Selector elemen form login
│   │   ├── register.locator.js    # Selector elemen form registrasi
│   │   └── home.locator.js        # Selector elemen beranda & form posting
│   ├── utils/                     # 📁 Direktori Helper & Utilitas
│   │   ├── generator.util.js      # Generator akun unik 100% huruf (tanpa angka)
│   │   └── scroll.util.js         # Gestur scroll (scrollDown, scrollUp, scrollToBottom, scrollToTop)
│   └── specs/                     # 📁 Direktori Test Case / Skenario Pengujian
│       ├── e2e_register_login_post.spec.js # 🌟 Skenario E2E (Registrasi -> Login -> Posting)
│       ├── register.spec.js       # Skenario Registrasi Akun Baru Dinamis + Scroll
│       ├── login.spec.js          # Skenario Login menggunakan akun hasil registrasi + Assertion
│       └── post.spec.js           # Skenario Buat Postingan menggunakan akun hasil registrasi
├── .gitignore                     # Konfigurasi file yang dikecualikan dari Git
├── package.json                   # Dependencies & npm scripts
├── README.md                      # Dokumentasi lengkap proyek
└── wdio.conf.js                   # Konfigurasi WebdriverIO & Allure Reporter
```

---

## 🛠️ Prasyarat (Prerequisites)

Sebelum menjalankan pengujian, pastikan environment berikut telah terkonfigurasi:

1. **Node.js**: Versi LTS (v18.x atau lebih baru).
2. **Java Development Kit (JDK)**: Versi 11 atau 17.
3. **Android SDK**: `ANDROID_HOME` dan `adb` telah terdaftar di Environment Variables.
4. **Device Android / Emulator**:
   - Fisik (USB Debugging / Wireless Debugging aktif) atau Emulator (Android Studio AVD).
   - Pastikan device terdeteksi di terminal:
     ```bash
     adb devices
     ```
5. **Appium UiAutomator2 Driver**:
   ```bash
   npx appium driver install uiautomator2
   ```

---

## 🚀 Instalasi & Setup

1. **Clone repository**:
   ```bash
   git clone <URL_REPOSITORY_ANDA>
   cd Appium_Mobile_Automation_BelajarBareng
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

---

## ⚙️ Konfigurasi Appium & Desired Capabilities

Pengujian dikonfigurasi melalui [`wdio.conf.js`](file:///c:/Users/qcris/OneDrive/Documents/Digital%20Skola/Appium_Mobile_Automation_BelajarBareng/wdio.conf.js) dengan kapabilitas sebagai berikut:

```javascript
capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android Device',
    'appium:app': path.join(process.cwd(), 'app/app-release.apk'),
    'appium:appPackage': 'com.example.belajar_bareng',
    'appium:appActivity': 'com.example.belajar_bareng.MainActivity',
    'appium:autoGrantPermissions': true,
    'appium:newCommandTimeout': 240,
}]
```

---

## 🌟 Fitur & Arsitektur Pengujian

### 1. Generator Akun Unik Murni Huruf (`generator.util.js`)
Menghindari kegagalan registrasi akibat duplikasi username/email tanpa menggunakan angka:
* Mengonversi digit waktu milidetik ke huruf ($0 \to \text{a}, 1 \to \text{b}, \dots, 9 \to \text{j}$) dan menggabungkannya dengan huruf acak.
* **Hasil**: Username seperti `melatibchdfabc`, `melatijcaedxyz` (100% murni huruf).
* **Email**: `${username}@gmail.com`.
* **Password**: `@Melati1`.

### 2. Manajemen Sesi Otomatis (`auth.data.js`)
* Data akun hasil generate langsung disimpan ke `session_user.json` saat registrasi berlangsung.
* Skenario **Login** dan **Buat Postingan** otomatis membaca data akun tersebut, sehingga pengujian berjalan secara berkesinambungan (data-driven).

### 3. Helper Gestur Scroll W3C Actions (`scroll.util.js`)
Menggunakan standar W3C Touch Pointer Actions yang kompatibel di semua versi Android:
* `scrollDown(fromY, toY, duration)`: Swipe layar ke bawah.
* `scrollUp(fromY, toY, duration)`: Swipe layar ke atas.
* `scrollToBottom(times)`: Scroll sampai ke bagian paling bawah feed.
* `scrollToTop(times)`: Scroll kembali ke bagian paling atas form.

### 4. Pemisahan Modular Locators
Elemen UI didefinisikan secara rapi di folder `test/locators/`:
* `login.locator.js`: Elemen input email (`//*[@resource-id="email_input"]`), password, dan tombol login.
* `register.locator.js`: Elemen form registrasi berbasis indeks field (`(//android.widget.EditText)[1]`, `[2]`, `[3]`) dan tombol register.
* `home.locator.js`: Header beranda, kolom input postingan, dan daftar feed.

---

## 📋 Skenario Pengujian (Test Specs)

### 🌟 1. Skenario End-to-End (`test/specs/e2e_register_login_post.spec.js`)
Rangkaian lengkap 3 langkah pengujian otomatis:
1. **Langkah 1 (Registrasi)**: Menghasilkan akun unik tanpa angka $\to$ mengisi form $\to$ scroll down $\to$ klik Register $\to$ assert kembali ke halaman login.
2. **Langkah 2 (Login)**: Membaca data akun yang baru dibuat $\to$ mengisi email & password $\to$ klik Login $\to$ assert header beranda & form posting tampil.
3. **Langkah 3 (Buat Postingan)**: Mengisi teks postingan $\to$ klik Posting $\to$ scroll down $\to$ assert postingan berhasil masuk ke feed.

---

## ▶️ Perintah Menjalankan Pengujian

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run test:e2e` | **Menjalankan Alur Lengkap E2E (Registrasi $\to$ Login $\to$ Posting)** |
| `npm run test:register` | Menjalankan skenario Registrasi akun dinamis saja |
| `npm run test:login` | Menjalankan skenario Login & Assertion saja |
| `npm run test:post` | Menjalankan skenario Buat Postingan saja |
| `npm run test:mobile` | Menjalankan seluruh test suite yang ada |

---

## 📊 Menghasilkan & Membuka Allure Report

Proyek ini telah terintegrasi dengan **Allure Framework** untuk laporan visual pengujian:

```bash
# 1. Generate dan Buka Laporan Sekaligus:
npm run report

# 2. Atau Buka Laporan yang Sudah Ada:
npm run allure:open
```

Dashboard Allure Report akan otomatis terbuka di browser menampilkan grafik status lulus/gagal, durasi pengujian, dan riwayat langkah pengujian.

---

## 🔍 Panduan Appium Inspector

Jika Anda ingin memeriksa elemen UI secara visual menggunakan **Appium Inspector**:

1. Jalankan Appium Server:
   ```bash
   npx appium
   ```
2. Buka aplikasi **Appium Inspector**.
3. Konfigurasi Server:
   - **Remote Host**: `127.0.0.1`
   - **Remote Port**: `4723`
   - **Remote Path**: `/`
4. Masukkan **JSON Representation**:
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
5. Klik **Start Session**.

---

## 🚫 Standar Git & File yang Diabaikan (`.gitignore`)

File-file berikut telah dikecualikan dari Git agar repository tetap bersih dan aman:

* `node_modules/`: Dependensi npm.
* `allure-results/` & `allure-report/`: Laporan pengujian dinamis lokal.
* `test/data/session_user.json`: File data runtime sesi sementara.
* `*.xml` *(kecuali `dumps/*.xml`)*: File XML dump sementara saat debugging.
* `*.log`: Log debug npm/yarn.
* `.DS_Store`, `Thumbs.db`, `.vscode/`, `.idea/`: File bawaan OS dan editor.
