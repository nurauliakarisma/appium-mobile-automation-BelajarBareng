const loginLocator = require('../../locators/login.locator');
const registerLocator = require('../../locators/register.locator');
const { negativeRegister } = require('../../data/auth.data');
const scrollUtil = require('../../utils/scroll.util');

describe('[NEGATIF] Fitur Registrasi - BelajarBareng', () => {
    it('Kasus Negatif 1: Gagal registrasi dengan FORMAT EMAIL TIDAK VALID', async () => {
        // 1. Masuk ke halaman form Register
        await loginLocator.btnToRegister.waitForDisplayed({ timeout: 15000 });
        await loginLocator.btnToRegister.click();

        // 2. Isi data dengan email tanpa domain
        await registerLocator.headerTitle.waitForDisplayed({ timeout: 15000 });
        await registerLocator.inputUsername.setValue(negativeRegister.invalidEmail.username);
        await registerLocator.inputEmail.setValue(negativeRegister.invalidEmail.email);
        await registerLocator.inputPassword.setValue(negativeRegister.invalidEmail.password);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // 3. Scroll & Klik tombol Register
        await scrollUtil.scrollDown(0.7, 0.3, 500);
        await registerLocator.btnRegister.waitForDisplayed({ timeout: 10000 });
        await registerLocator.btnRegister.click();

        await browser.pause(2000);

        // 4. ASSERTION: Form registrasi tetap tampil (tidak dialihkan ke halaman login)
        const isStillOnRegister = await registerLocator.headerTitle.isDisplayed();
        expect(isStillOnRegister).toBe(true);
    });

    it('Kasus Negatif 2: Gagal registrasi ketika SEMUA FIELD KOSONG', async () => {
        // 1. Kosongkan semua field registrasi
        await registerLocator.inputUsername.clearValue();
        await registerLocator.inputEmail.clearValue();
        await registerLocator.inputPassword.clearValue();

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // 2. Scroll & Klik tombol Register
        await scrollUtil.scrollDown(0.7, 0.3, 500);
        await registerLocator.btnRegister.waitForDisplayed({ timeout: 10000 });
        await registerLocator.btnRegister.click();

        await browser.pause(2000);

        // 3. ASSERTION: Sistem tetap menahan di halaman registrasi
        const isStillOnRegister = await registerLocator.headerTitle.isDisplayed();
        expect(isStillOnRegister).toBe(true);
    });
});
