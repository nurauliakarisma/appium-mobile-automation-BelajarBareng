/**
 * Locator Elemen Halaman Beranda / Posting
 * Berdasarkan hierarki UI di dumps/home_dump.xml
 */
class HomeLocator {
    // Header Aplikasi
    get headerTitle() {
        return $('//android.view.View[@content-desc="Belajar Bareng"]');
    }

    // Input field Buat Postingan ("Apa yang kamu pikirkan hari ini?")
    get inputPost() {
        return $('//android.widget.EditText[contains(@hint, "Apa yang kamu pikirkan")]');
    }

    // Tombol Posting
    get btnPosting() {
        return $('~Posting');
    }

    // Banner / Popup notifikasi "Login berhasil"
    get toastLoginSuccess() {
        return $('//android.view.View[@content-desc="Login berhasil"]');
    }

    // Daftar postingan (Feed container)
    get feedList() {
        return $('//android.view.View[contains(@bounds, "[53,1111]")]');
    }
}

module.exports = new HomeLocator();
