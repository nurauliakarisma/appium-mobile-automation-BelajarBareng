const loginLocator = require('../locators/login.locator');
const homeLocator = require('../locators/home.locator');
const { getSavedSessionUser } = require('../data/auth.data');
const scrollUtil = require('../utils/scroll.util');

describe('Skenario Login & Assertion - BelajarBareng', () => {
    it('Harus berhasil login dengan data hasil generate dan memverifikasi halaman beranda', async () => {
        // Mengambil akun yang baru saja di-generate saat registrasi
        const user = getSavedSessionUser();

        // 1. Masukkan Email dari user hasil generate
        await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
        await loginLocator.inputEmail.click();
        await loginLocator.inputEmail.setValue(user.email);

        // 2. Masukkan Password dari user hasil generate
        await loginLocator.inputPassword.waitForDisplayed({ timeout: 15000 });
        await loginLocator.inputPassword.click();
        await loginLocator.inputPassword.setValue(user.password);

        // 3. Sembunyikan keyboard jika aktif
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // 4. Klik tombol Login
        await loginLocator.btnLogin.waitForDisplayed({ timeout: 10000 });
        await loginLocator.btnLogin.click();

        // 5. ASSERTION LOGIN
        // Assert A: Memastikan Header Beranda "Belajar Bareng" berhasil ditampilkan
        await homeLocator.headerTitle.waitForDisplayed({ timeout: 15000 });
        const isHeaderDisplayed = await homeLocator.headerTitle.isDisplayed();
        expect(isHeaderDisplayed).toBe(true);

        // Assert B: Memastikan Kolom Input Postingan tampil
        await homeLocator.inputPost.waitForDisplayed({ timeout: 10000 });
        const isInputPostDisplayed = await homeLocator.inputPost.isDisplayed();
        expect(isInputPostDisplayed).toBe(true);

        // 6. SCROLL SAMPAI BAWAH (Melihat feed postingan sampai akhir)
        await scrollUtil.scrollToBottom(3);

        await browser.pause(2000);
    });
});