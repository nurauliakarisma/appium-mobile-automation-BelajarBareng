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
}

module.exports = new LoginLocator();
