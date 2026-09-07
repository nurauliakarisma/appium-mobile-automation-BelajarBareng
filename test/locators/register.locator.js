/**
 * Locator Elemen Halaman Registrasi (Create Account)
 * Berdasarkan hierarki UI aplikasi Flutter Android
 */
class RegisterLocator {
    // Header teks Create Account
    get headerTitle() {
        return $('//android.view.View[contains(@content-desc, "Create Account")]');
    }

    // Input field Username (Field ke-1)
    get inputUsername() {
        return $('(//android.widget.EditText)[1]');
    }

    // Input field Email (Field ke-2)
    get inputEmail() {
        return $('(//android.widget.EditText)[2]');
    }

    // Input field Password (Field ke-3)
    get inputPassword() {
        return $('(//android.widget.EditText)[3]');
    }

    // Tombol Register
    get btnRegister() {
        return $('~Register');
    }

    // Notifikasi / Toast berhasil registrasi
    get toastRegisterSuccess() {
        return $('//android.view.View[contains(@content-desc, "Register berhasil")]');
    }

    // Tombol kembali ke Login ("Sudah punya akun? Login")
    get btnToLogin() {
        return $('~Sudah punya akun? Login');
    }

    // ScrollView container halaman register
    get scrollView() {
        return $('//android.widget.ScrollView');
    }
}

module.exports = new RegisterLocator();
