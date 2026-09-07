const loginLocator = require('../locators/login.locator');
const registerLocator = require('../locators/register.locator');
const homeLocator = require('../locators/home.locator');
const { getDynamicRegisterUser, saveSessionUser, getSavedSessionUser } = require('../data/auth.data');
const { newPost } = require('../data/post.data');
const scrollUtil = require('../utils/scroll.util');

describe('E2E Flow - Registrasi Akun Baru, Login, dan Buat Postingan', () => {
    let currentUser;

    before(() => {
        // Generate data akun baru murni huruf tanpa angka dan simpan ke file session
        const generatedUser = getDynamicRegisterUser('melati');
        currentUser = saveSessionUser(generatedUser);
        console.log(`\n======================================================`);
        console.log(`[INFO] Akun Dinamis Dihasilkan:`);
        console.log(`- Username : ${currentUser.username}`);
        console.log(`- Email    : ${currentUser.email}`);
        console.log(`- Password : ${currentUser.password}`);
        console.log(`======================================================\n`);
    });

    it('Langkah 1: Registrasi Akun Baru dengan Data Hasil Generate (Tanpa Angka)', async () => {
        // 1. Klik 'Belum punya akun? Register'
        await loginLocator.btnToRegister.waitForDisplayed({ timeout: 15000 });
        await loginLocator.btnToRegister.click();

        // 2. Isi form registrasi dengan data yang baru di-generate
        await registerLocator.headerTitle.waitForDisplayed({ timeout: 15000 });
        await registerLocator.inputUsername.setValue(currentUser.username);
        await registerLocator.inputEmail.setValue(currentUser.email);
        await registerLocator.inputPassword.setValue(currentUser.password);

        // 3. Sembunyikan keyboard jika aktif
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // 4. Scroll ke bawah sampai tombol Register terlihat penuh
        await scrollUtil.scrollDown(0.7, 0.3, 500);

        // 5. Klik tombol Register
        await registerLocator.btnRegister.waitForDisplayed({ timeout: 10000 });
        await registerLocator.btnRegister.click();

        // 6. Assertion: Memastikan sistem kembali ke halaman Login setelah berhasil registrasi
        await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
        const isLoginScreenDisplayed = await loginLocator.inputEmail.isDisplayed();
        expect(isLoginScreenDisplayed).toBe(true);
    });

    it('Langkah 2: Login Menggunakan Akun yang Baru Saja Didaftarkan', async () => {
        const userToLogin = getSavedSessionUser();

        // 1. Masukkan Email yang baru dibuat
        await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
        await loginLocator.inputEmail.click();
        await loginLocator.inputEmail.setValue(userToLogin.email);

        // 2. Masukkan Password yang baru dibuat
        await loginLocator.inputPassword.waitForDisplayed({ timeout: 15000 });
        await loginLocator.inputPassword.click();
        await loginLocator.inputPassword.setValue(userToLogin.password);

        // 3. Sembunyikan keyboard jika aktif
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // 4. Klik tombol Login
        await loginLocator.btnLogin.waitForDisplayed({ timeout: 10000 });
        await loginLocator.btnLogin.click();

        // 5. Assertion Login: Memastikan Header Beranda dan Kolom Postingan tampil
        await homeLocator.headerTitle.waitForDisplayed({ timeout: 15000 });
        const isHeaderDisplayed = await homeLocator.headerTitle.isDisplayed();
        expect(isHeaderDisplayed).toBe(true);

        const isInputPostDisplayed = await homeLocator.inputPost.isDisplayed();
        expect(isInputPostDisplayed).toBe(true);

        // 6. Scroll ke bawah pada halaman beranda
        await scrollUtil.scrollToBottom(2);
    });

    it('Langkah 3: Membuat Postingan Baru Menggunakan Akun Tersebut', async () => {
        // 1. Scroll kembali ke atas untuk mengisi kolom postingan
        await scrollUtil.scrollUp(0.3, 0.7, 500);

        // 2. Masukkan teks konten postingan
        await homeLocator.inputPost.waitForDisplayed({ timeout: 15000 });
        await homeLocator.inputPost.click();
        await homeLocator.inputPost.setValue(newPost.content);

        // 3. Sembunyikan keyboard
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // 4. Klik tombol Posting
        await homeLocator.btnPosting.waitForDisplayed({ timeout: 10000 });
        await homeLocator.btnPosting.click();

        // 5. Jeda dan Scroll ke bawah untuk melihat postingan di feed
        await browser.pause(2000);
        await scrollUtil.scrollDown(0.7, 0.3, 600);

        // 6. Assertion: Memastikan feed postingan ditampilkan
        const isFeedDisplayed = await homeLocator.feedList.isDisplayed();
        expect(isFeedDisplayed).toBe(true);

        await browser.pause(2000);
    });
});
