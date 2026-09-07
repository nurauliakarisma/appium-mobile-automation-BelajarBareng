# 📱 Appium Mobile Automation - BelajarBareng

Proyek otomasi pengujian aplikasi mobile Android **BelajarBareng** menggunakan framework **WebdriverIO (WDIO)** dan **Appium** dengan driver **UiAutomator2**. Proyek ini menerapkan arsitektur modular yang memisahkan **Locators**, **Test Data**, **Helper / Utilities**, dan **Test Cases (Specs)**.

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
│   │   ├── auth.data.js           # Data registrasi (melati) dan kredensial login
│   │   └── post.data.js           # Data konten teks postingan
│   ├── locators/                  # 📁 Direktori Selector Elemen (Locators)
│   │   ├── login.locator.js       # Selector elemen form login
│   │   ├── register.locator.js    # Selector elemen form registrasi
│   │   └── home.locator.js        # Selector elemen beranda & form posting
│   ├── utils/                     # 📁 Direktori Helper / Utility
│   │   └── scroll.util.js         # Fungsi gestur scroll (scroll down, scroll to bottom)
│   └── specs/                     # 📁 Direktori Test Case / Skenario Pengujian
│       ├── register.spec.js       # Skenario Registrasi Akun Baru (Melati) + Scroll
│       ├── login.spec.js          # Skenario Login dengan Valid User + Assertion
│       └── post.spec.js           # Skenario Buat Postingan Baru + Scroll Feed
├── .gitignore                     # Konfigurasi file yang diabaikan Git
├── package.json                   # Dependencies & npm scripts
├── README.md                      # Dokumentasi lengkap proyek
└── wdio.conf.js                   # Konfigurasi WebdriverIO & Appium
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

1. **Install dependencies**:
   ```bash
   npm install
   ```

---

## 📋 Detail Skenario & Arsitektur

### 1. Skenario Registrasi (`test/specs/register.spec.js`)
* **Tujuan**: Mendaftarkan akun baru dengan data:
  - **Username**: `melati`
  - **Email**: `melati@gmail.com`
  - **Password**: `@Melati1`
* **Alur**:
  1. Klik tombol *"Belum punya akun? Register"* di layar login.
  2. Mengisi form username, email, dan password dari `test/data/auth.data.js`.
  3. Menyembunyikan virtual keyboard (`driver.hideKeyboard()`).
  4. Melakukan gestur **scroll down** menggunakan `scrollUtil.scrollDown()` agar form dan tombol Register terlihat penuh.
  5. Menekan tombol Register.
  6. **Assertion**: Memverifikasi sistem kembali ke halaman login.

### 2. Skenario Login & Assertion (`test/specs/login.spec.js`)
* **Tujuan**: Melakukan login dan memvalidasi keberhasilan login.
* **Alur**:
  1. Memasukkan email dan password valid.
  2. Menekan tombol Login.
  3. **Assertion**:
     - Memverifikasi Header Beranda `"Belajar Bareng"` berhasil ditampilkan (`expect(homeLocator.headerTitle).toBeDisplayed()`).
     - Memverifikasi kolom input postingan tampil.
  4. Melakukan **Scroll sampai bawah** (`scrollUtil.scrollToBottom()`) untuk melihat feed postingan secara keseluruhan.

### 3. Skenario Buat Postingan (`test/specs/post.spec.js`)
* **Tujuan**: Membuat postingan baru dan memvalidasi postingan di feed.
* **Alur**:
  1. Login ke aplikasi.
  2. Mengisi teks: `"Sedang belajar membuat automation testing mobile dengan appium"`.
  3. Menekan tombol Posting.
  4. Melakukan scroll untuk melihat daftar feed postingan.

---

## 📜 Helper Utility Gestur Scroll (`test/utils/scroll.util.js`)

Gestur scroll dibuat menggunakan **W3C Pointer Actions** sehingga stabil dan kompatibel di semua versi Android:

```javascript
// Contoh pemanggilan scroll helper di test case
const scrollUtil = require('../utils/scroll.util');

// Scroll ke bawah sekali
await scrollUtil.scrollDown(0.7, 0.3, 500);

// Scroll berulang sampai ke bagian paling bawah
await scrollUtil.scrollToBottom(3);

// Scroll sampai elemen tertentu terlihat
await scrollUtil.scrollToElement(element);
```

---

## ▶️ Menjalankan Pengujian

### 1. Jalankan Semua Skenario Pengujian
```bash
npm run test:mobile
```

### 2. Jalankan Skenario Tertentu
* **Skenario Registrasi saja**:
  ```bash
  npx wdio run ./wdio.conf.js --spec ./test/specs/register.spec.js
  ```
* **Skenario Login & Assertion saja**:
  ```bash
  npx wdio run ./wdio.conf.js --spec ./test/specs/login.spec.js
  ```
* **Skenario Buat Postingan saja**:
  ```bash
  npx wdio run ./wdio.conf.js --spec ./test/specs/post.spec.js
  ```
