const loginLocator = require('../locators/login.locator');
const registerLocator = require('../locators/register.locator');
const { getDynamicRegisterUser, saveSessionUser } = require('../data/auth.data');
const scrollUtil = require('../utils/scroll.util');

describe('Skenario Registrasi - BelajarBareng', () => {
    it('Harus berhasil mendaftarkan akun baru dengan nama unik (tanpa angka) dan scroll sampai tombol Register', async () => {
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

        // 2. Tunggu form registrasi tampil
        await registerLocator.headerTitle.waitForDisplayed({ timeout: 15000 });

        // 3. Masukkan Username
        await registerLocator.inputUsername.waitForDisplayed({ timeout: 10000 });
        await registerLocator.inputUsername.click();
        await registerLocator.inputUsername.setValue(newUser.username);

        // 4. Masukkan Email
        await registerLocator.inputEmail.waitForDisplayed({ timeout: 10000 });
        await registerLocator.inputEmail.click();
        await registerLocator.inputEmail.setValue(newUser.email);

        // 5. Masukkan Password
        await registerLocator.inputPassword.waitForDisplayed({ timeout: 10000 });
        await registerLocator.inputPassword.click();
        await registerLocator.inputPassword.setValue(newUser.password);

        // 6. Sembunyikan keyboard jika aktif
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // 7. Scroll ke bawah sampai tombol Register terlihat
        await scrollUtil.scrollDown(0.7, 0.3, 500);

        // 8. Klik tombol Register
        await registerLocator.btnRegister.waitForDisplayed({ timeout: 10000 });
        await registerLocator.btnRegister.click();

        // 9. Assertion: Memastikan kembali ke halaman Login
        await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
        const isLoginScreenDisplayed = await loginLocator.inputEmail.isDisplayed();
        expect(isLoginScreenDisplayed).toBe(true);

        await browser.pause(2000);
    });
});
