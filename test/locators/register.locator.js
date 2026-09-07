class RegisterLocator {
    get headerTitle() {
        return $('//android.view.View[contains(@content-desc, "Create Account")]');
    }

    get inputUsername() {
        return $('(//android.widget.EditText)[1]');
    }

    get inputEmail() {
        return $('(//android.widget.EditText)[2]');
    }

    get inputPassword() {
        return $('(//android.widget.EditText)[3]');
    }

    get btnRegister() {
        return $('~Register');
    }

    get btnToLogin() {
        return $('~Sudah punya akun? Login');
    }

    get scrollView() {
        return $('//android.widget.ScrollView');
    }
}

module.exports = new RegisterLocator();
