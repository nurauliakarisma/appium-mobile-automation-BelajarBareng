/**
 * Locator Elemen Halaman Registrasi (Create Account)
 * Berdasarkan hierarki UI aplikasi
 */
class RegisterLocator {
    // Header teks Create Account
    get headerTitle() {
        return $('//android.view.View[contains(@content-desc, "Create Account")]');
    }

    // Input field Username
    get inputUsername() {
        return $('//android.widget.EditText[contains(@hint, "Username")]');
    }

    // Input field Email
    get inputEmail() {
        return $('//android.widget.EditText[contains(@hint, "Email")]');
    }

    // Input field Password
    get inputPassword() {
        return $('//android.widget.EditText[contains(@hint, "Password")]');
    }

    // Tombol Register
    get btnRegister() {
        return $('~Register');
    }

    // ScrollView container halaman register
    get scrollView() {
        return $('//android.widget.ScrollView');
    }
}

module.exports = new RegisterLocator();
