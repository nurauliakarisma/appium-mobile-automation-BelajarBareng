const loginLocator = require('../../locators/login.locator');
const homeLocator = require('../../locators/home.locator');
const { negativeLogin } = require('../../data/auth.data');

describe('[NEGATIF] Fitur Login - BelajarBareng', () => {
    it('Kasus Negatif 1: Gagal login ketika memasukkan PASSWORD YANG SALAH', async () => {
        // 1. Masukkan Email Valid tetapi Password Salah
        await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
        await loginLocator.inputEmail.click();
        await loginLocator.inputEmail.setValue(negativeLogin.wrongPassword.email);

        await loginLocator.inputPassword.waitForDisplayed({ timeout: 15000 });
        await loginLocator.inputPassword.click();
        await loginLocator.inputPassword.setValue(negativeLogin.wrongPassword.password);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // 2. Klik tombol Login
        await loginLocator.btnLogin.waitForDisplayed({ timeout: 10000 });
        await loginLocator.btnLogin.click();

        await browser.pause(2000);

        // 3. ASSERTION: Sistem menolak login dan TETAP berada di halaman login (tidak masuk ke beranda)
        const isStillOnLogin = await loginLocator.btnLogin.isDisplayed();
        expect(isStillOnLogin).toBe(true);

        const isHomeDisplayed = await homeLocator.headerTitle.isDisplayed();
        expect(isHomeDisplayed).toBe(false);
    });

    it('Kasus Negatif 2: Gagal login dengan EMAIL YANG BELUM TERDAFTAR', async () => {
        // 1. Masukkan Email yang belum pernah didaftarkan
        await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
        await loginLocator.inputEmail.click();
        await loginLocator.inputEmail.setValue(negativeLogin.unregisteredEmail.email);

        await loginLocator.inputPassword.waitForDisplayed({ timeout: 15000 });
        await loginLocator.inputPassword.click();
        await loginLocator.inputPassword.setValue(negativeLogin.unregisteredEmail.password);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // 2. Klik tombol Login
        await loginLocator.btnLogin.waitForDisplayed({ timeout: 10000 });
        await loginLocator.btnLogin.click();

        await browser.pause(2000);

        // 3. ASSERTION: Sistem tetap di halaman Login
        const isStillOnLogin = await loginLocator.btnLogin.isDisplayed();
        expect(isStillOnLogin).toBe(true);
    });

    it('Kasus Negatif 3: Gagal login ketika SEMUA FIELD KOSONG', async () => {
        // 1. Kosongkan input
        await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
        await loginLocator.inputEmail.clearValue();
        await loginLocator.inputPassword.clearValue();

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // 2. Klik tombol Login
        await loginLocator.btnLogin.waitForDisplayed({ timeout: 10000 });
        await loginLocator.btnLogin.click();

        await browser.pause(2000);

        // 3. ASSERTION: Sistem tidak berpindah halaman
        const isStillOnLogin = await loginLocator.btnLogin.isDisplayed();
        expect(isStillOnLogin).toBe(true);
    });
});
