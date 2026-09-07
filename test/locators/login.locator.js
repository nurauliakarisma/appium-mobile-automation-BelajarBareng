class LoginLocator {
    get inputEmail() {
        return $('//*[@resource-id="email_input"]');
    }

    get inputPassword() {
        return $('//*[@resource-id="password_input"]');
    }

    get btnLogin() {
        return $('~Login');
    }

    get btnToRegister() {
        return $('~Belum punya akun? Register');
    }

    get headerLogo() {
        return $('~Belajar Bareng');
    }
}

module.exports = new LoginLocator();
