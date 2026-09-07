/**
 * Locator Elemen Halaman Login
 * Berdasarkan hierarki UI di dumps/login_dump.xml
 */
class LoginLocator {
    // Input field Email
    get inputEmail() {
        return $('//*[@resource-id="email_input"]');
    }

    // Input field Password
    get inputPassword() {
        return $('//*[@resource-id="password_input"]');
    }

    // Tombol Login
    get btnLogin() {
        return $('~Login');
    }

    // Tombol navigasi ke halaman Registrasi ("Belum punya akun? Register")
    get btnToRegister() {
        return $('~Belum punya akun? Register');
    }

    // Header / Gambar logo Belajar Bareng
    get headerLogo() {
        return $('~Belajar Bareng');
    }

    // Pesan error / Toast / Notifikasi jika login gagal
    get toastErrorMessage() {
        return $('//android.view.View[contains(@content-desc, "salah") or contains(@content-desc, "Gagal") or contains(@content-desc, "tidak") or contains(@content-desc, "Error")]');
    }
}

module.exports = new LoginLocator();
