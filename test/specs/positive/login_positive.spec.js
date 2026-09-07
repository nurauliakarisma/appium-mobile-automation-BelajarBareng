const loginLocator = require('../../locators/login.locator');
const homeLocator = require('../../locators/home.locator');
const { validManualUser, getSavedSessionUser } = require('../../data/auth.data');
const scrollUtil = require('../../utils/scroll.util');

describe('[POSITIF] Fitur Login - BelajarBareng', () => {
    it('Kasus 1: Harus berhasil login menggunakan kredensial MANUAL user valid (aulia1@gmail.com)', async () => {
        // 1. Masukkan Email Manual
        await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
        await loginLocator.inputEmail.click();
        await loginLocator.inputEmail.setValue(validManualUser.email);

        // 2. Masukkan Password Manual
        await loginLocator.inputPassword.waitForDisplayed({ timeout: 15000 });
        await loginLocator.inputPassword.click();
        await loginLocator.inputPassword.setValue(validManualUser.password);

        // 3. Sembunyikan keyboard jika aktif
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // 4. Klik tombol Login
        await loginLocator.btnLogin.waitForDisplayed({ timeout: 10000 });
        await loginLocator.btnLogin.click();

        // 5. ASSERTION: Header Beranda & Kolom Input Postingan berhasil tampil
        await homeLocator.headerTitle.waitForDisplayed({ timeout: 15000 });
        const isHeaderDisplayed = await homeLocator.headerTitle.isDisplayed();
        expect(isHeaderDisplayed).toBe(true);

        const isInputPostDisplayed = await homeLocator.inputPost.isDisplayed();
        expect(isInputPostDisplayed).toBe(true);

        // 6. Scroll melihat feed
        await scrollUtil.scrollToBottom(2);
        await browser.pause(2000);
    });

    it('Kasus 2: Harus berhasil login menggunakan kredensial DINAMIS hasil generate sesi', async () => {
        const sessionUser = getSavedSessionUser();

        // Jika masih di halaman beranda, buka kembali layar aplikasi
        // Masukkan email & password session user
        if (await loginLocator.inputEmail.isDisplayed()) {
            await loginLocator.inputEmail.click();
            await loginLocator.inputEmail.setValue(sessionUser.email);

            await loginLocator.inputPassword.click();
            await loginLocator.inputPassword.setValue(sessionUser.password);

            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard();
            }

            await loginLocator.btnLogin.click();

            await homeLocator.headerTitle.waitForDisplayed({ timeout: 15000 });
            expect(await homeLocator.headerTitle.isDisplayed()).toBe(true);
        }
    });
});
