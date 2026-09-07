const loginLocator = require('../locators/login.locator');
const registerLocator = require('../locators/register.locator');
const { getDynamicRegisterUser, saveSessionUser } = require('../data/auth.data');
const scrollUtil = require('../utils/scroll.util');

describe('Skenario Registrasi - BelajarBareng', () => {
    it('Harus berhasil mendaftarkan akun baru dengan nama unik (tanpa angka) dan scroll sampai tombol Register', async () => {
        // Generate data registrasi baru murni huruf tanpa angka dan simpan untuk dipakai login
        const newUser = getDynamicRegisterUser('melati');
        saveSessionUser(newUser);

        console.log(`\n========================================`);
        console.log(`[INFO] Mendaftarkan User Baru:`);
        console.log(`- Username : ${newUser.username}`);
        console.log(`- Email    : ${newUser.email}`);
        console.log(`- Password : ${newUser.password}`);
        console.log(`========================================\n`);

        // 1. Masuk ke halaman form Register
        await loginLocator.btnToRegister.waitForDisplayed({ timeout: 15000 });
        await loginLocator.btnToRegister.click();

        // 2. Isi form registrasi
        await registerLocator.headerTitle.waitForDisplayed({ timeout: 15000 });
        await registerLocator.inputUsername.setValue(newUser.username);
        await registerLocator.inputEmail.setValue(newUser.email);
        await registerLocator.inputPassword.setValue(newUser.password);

        // 3. Sembunyikan keyboard jika aktif
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // 4. Scroll ke bawah sampai tombol Register terlihat
        await scrollUtil.scrollDown(0.7, 0.3, 500);

        // 5. Klik tombol Register
        await registerLocator.btnRegister.waitForDisplayed({ timeout: 10000 });
        await registerLocator.btnRegister.click();

        // 6. Assertion: Memastikan kembali ke halaman Login
        await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
        const isLoginScreenDisplayed = await loginLocator.inputEmail.isDisplayed();
        expect(isLoginScreenDisplayed).toBe(true);

        await browser.pause(2000);
    });
});
