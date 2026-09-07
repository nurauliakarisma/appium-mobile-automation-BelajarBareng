const loginLocator = require('../../locators/login.locator');
const registerLocator = require('../../locators/register.locator');
const { getDynamicRegisterUser, saveSessionUser } = require('../../data/auth.data');
const scrollUtil = require('../../utils/scroll.util');

describe('[POSITIF] Fitur Registrasi - BelajarBareng', () => {
    it('Harus berhasil mendaftarkan akun baru dengan data valid (nama unik tanpa angka)', async () => {
        // 1. Generate user unik murni huruf tanpa angka & simpan ke session
        const newUser = getDynamicRegisterUser('melati');
        saveSessionUser(newUser);

        console.log(`\n========================================`);
        console.log(`[POSITIF TEST] Mendaftarkan User Baru:`);
        console.log(`- Username : ${newUser.username}`);
        console.log(`- Email    : ${newUser.email}`);
        console.log(`- Password : ${newUser.password}`);
        console.log(`========================================\n`);

        // 2. Klik tombol navigasi 'Belum punya akun? Register'
        await loginLocator.btnToRegister.waitForDisplayed({ timeout: 15000 });
        await loginLocator.btnToRegister.click();

        // 3. Tunggu form registrasi tampil
        await registerLocator.headerTitle.waitForDisplayed({ timeout: 15000 });

        // 4. Masukkan Username
        await registerLocator.inputUsername.waitForDisplayed({ timeout: 10000 });
        await registerLocator.inputUsername.click();
        await registerLocator.inputUsername.setValue(newUser.username);

        // 5. Masukkan Email
        await registerLocator.inputEmail.waitForDisplayed({ timeout: 10000 });
        await registerLocator.inputEmail.click();
        await registerLocator.inputEmail.setValue(newUser.email);

        // 6. Masukkan Password
        await registerLocator.inputPassword.waitForDisplayed({ timeout: 10000 });
        await registerLocator.inputPassword.click();
        await registerLocator.inputPassword.setValue(newUser.password);

        // 7. Sembunyikan keyboard jika aktif
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // 8. Scroll ke bawah sampai tombol Register terlihat
        await scrollUtil.scrollDown(0.7, 0.3, 500);

        // 9. Klik tombol Register
        await registerLocator.btnRegister.waitForDisplayed({ timeout: 10000 });
        await registerLocator.btnRegister.click();

        // 10. ASSERTION: Sistem berhasil mendaftarkan user dan kembali ke halaman Login
        await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
        const isLoginScreenDisplayed = await loginLocator.inputEmail.isDisplayed();
        expect(isLoginScreenDisplayed).toBe(true);

        await browser.pause(2000);
    });
});
