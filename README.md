# 📱 Appium Mobile Automation - BelajarBareng

Proyek otomasi pengujian aplikasi mobile Android **BelajarBareng** berbasis **WebdriverIO (WDIO)** dan **Appium** dengan driver **UiAutomator2**.

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
│   └── specs/
│       ├── login.spec.js          # Skrip pengujian fitur Login
│       ├── open.test.js           # Skrip pengujian pembukaan aplikasi
│       └── post/
│           └── post.spec.js       # Skrip pengujian fitur Buat Postingan
├── .gitignore                     # Konfigurasi file yang diabaikan Git
├── package.json                   # Dependencies & npm scripts
├── README.md                      # Dokumentasi proyek
└── wdio.conf.js                   # Konfigurasi utama WebdriverIO & Appium
```

---

## 🛠️ Prasyarat (Prerequisites)

Sebelum menjalankan pengujian otomasi, pastikan lingkungan berikut telah terpasang dan terkonfigurasi:

1. **Node.js**: Versi LTS (v18.x atau lebih baru).
2. **Java Development Kit (JDK)**: Versi 11 atau 17.
3. **Android SDK**:
   - `ANDROID_HOME` telah dikonfigurasi pada Environment Variables.
   - `adb` (Android Debug Bridge) dapat diakses dari terminal.
4. **Device / Emulator Android**:
   - Fisik (USB Debugging / Wireless Debugging aktif) atau Emulator (AVD).
   - Pastikan device terdeteksi dengan perintah:
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
   git clone <URL_REPOSITORY>
   cd Appium_Mobile_Automation_BelajarBareng
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

---

## ⚙️ Konfigurasi (`wdio.conf.js`)

Pengujian dikonfigurasi untuk menjalankan APK yang berada di direktori `app/app-release.apk`:

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

## 📋 Fitur & Referensi Locator Elemen

Elemen UI aplikasi diambil langsung dari file XML Dump di folder `dumps/`:

### 1. Fitur Login (`test/specs/login.spec.js`)
* **Input Email**:
  - Diambil dari: `dumps/login_dump.xml`
  - Locator: `$('//*[@resource-id="email_input"]')`
  - Nilai: `aulia1@gmail.com`
* **Input Password**:
  - Diambil dari: `dumps/login_dump.xml`
  - Locator: `$('//*[@resource-id="password_input"]')`
  - Nilai: `@Aulia1`
* **Tombol Login**:
  - Diambil dari: `dumps/login_dump.xml` (`content-desc="Login"`)
  - Locator: `$('~Login')` *(Accessibility ID)*

### 2. Fitur Buat Postingan (`test/specs/post/post.spec.js`)
* **Kolom Input Postingan**:
  - Diambil dari: `dumps/home_dump.xml` (`hint="Buat Postingan... Apa yang kamu pikirkan hari ini?"`)
  - Locator: `$('//android.widget.EditText[contains(@hint, "Apa yang kamu pikirkan")]')`
  - Nilai: `"Sedang belajar membuat automation testing mobile dengan appium"`
* **Tombol Posting**:
  - Diambil dari: `dumps/home_dump.xml` (`content-desc="Posting"`)
  - Locator: `$('~Posting')` *(Accessibility ID)*

---

## ▶️ Menjalankan Pengujian

### 1. Menjalankan Semua Pengujian
```bash
npm run test:mobile
```

### 2. Menjalankan Pengujian Login Saja
```bash
npx wdio run ./wdio.conf.js --spec ./test/specs/login.spec.js
```

### 3. Menjalankan Pengujian Buat Postingan Saja
```bash
npx wdio run ./wdio.conf.js --spec ./test/specs/post/post.spec.js
```

---

## 💡 Catatan Teknis (Best Practices)

- **Keyboard Handling**: Sebelum menekan tombol submit / aksi, selalu gunakan pemeriksaan virtual keyboard:
  ```javascript
  if (await driver.isKeyboardShown()) {
      await driver.hideKeyboard();
  }
  ```
- **Implicit & Explicit Waits**: Gunakan `waitForDisplayed({ timeout: 15000 })` untuk mengantisipasi jeda loading aplikasi saat transisi halaman.
- **XML Dumps**: Skrip pengujian secara otomatis memperbarui file XML dump di folder `dumps/` setiap kali pengujian dijalankan.
