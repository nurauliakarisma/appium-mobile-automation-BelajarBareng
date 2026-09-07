const loginLocator = require('../locators/login.locator');
const registerLocator = require('../locators/register.locator');
const homeLocator = require('../locators/home.locator');
const { 
    validManualUser, 
    getDynamicRegisterUser, 
    saveSessionUser, 
    getSavedSessionUser, 
    negativeLogin, 
    negativeRegister 
} = require('../data/auth.data');
const { newPost } = require('../data/post.data');
const scrollUtil = require('../utils/scroll.util');

describe('Full Sequence Testing: Login Manual ➡️ Registrasi Generate ➡️ Positif Flow ➡️ Negatif Flow', () => {
    let generatedUser;

    // =========================================================================
    // TAHAP 1: LOGIN MANUAL DULU (User Valid Tetap)
    // =========================================================================
    describe('1. [TAHAP 1] Login Manual Menggunakan Kredensial Valid Tetap', () => {
        it('Harus berhasil login dengan user manual aulia1@gmail.com', async () => {
            console.log('\n🔵 [TAHAP 1] Menjalankan Login Manual (aulia1@gmail.com)...');

            await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
            await loginLocator.inputEmail.click();
            await loginLocator.inputEmail.setValue(validManualUser.email);

            await loginLocator.inputPassword.waitForDisplayed({ timeout: 15000 });
            await loginLocator.inputPassword.click();
            await loginLocator.inputPassword.setValue(validManualUser.password);

            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard();
            }

            await loginLocator.btnLogin.waitForDisplayed({ timeout: 10000 });
            await loginLocator.btnLogin.click();

            // Assertion: Berhasil masuk ke beranda
            await homeLocator.headerTitle.waitForDisplayed({ timeout: 15000 });
            expect(await homeLocator.headerTitle.isDisplayed()).toBe(true);
            expect(await homeLocator.inputPost.isDisplayed()).toBe(true);

            // Scroll beranda sampai bawah
            await scrollUtil.scrollToBottom(2);
            await browser.pause(2000);
        });
    });

    // =========================================================================
    // TAHAP 2: REGISTRASI DENGAN GENERATE NAMA UNIK TANPA ANGKA
    // =========================================================================
    describe('2. [TAHAP 2] Registrasi Akun Baru dengan Auto-Generate (Tanpa Angka)', () => {
        it('Harus berhasil generate nama unik dan mendaftarkan akun baru', async () => {
            // Restart / buka kembali ke layar login untuk memulai registrasi baru
            await driver.terminateApp('com.example.belajar_bareng');
            await driver.activateApp('com.example.belajar_bareng');

            // Generate user unik 100% huruf
            generatedUser = getDynamicRegisterUser('melati');
            saveSessionUser(generatedUser);

            console.log('\n🟢 [TAHAP 2] Menjalankan Registrasi User Baru:');
            console.log(`- Username : ${generatedUser.username}`);
            console.log(`- Email    : ${generatedUser.email}`);
            console.log(`- Password : ${generatedUser.password}`);

            // Masuk ke form registrasi
            await loginLocator.btnToRegister.waitForDisplayed({ timeout: 15000 });
            await loginLocator.btnToRegister.click();

            await registerLocator.headerTitle.waitForDisplayed({ timeout: 15000 });
            await registerLocator.inputUsername.setValue(generatedUser.username);
            await registerLocator.inputEmail.setValue(generatedUser.email);
            await registerLocator.inputPassword.setValue(generatedUser.password);

            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard();
            }

            // Scroll ke tombol register & submit
            await scrollUtil.scrollDown(0.7, 0.3, 500);
            await registerLocator.btnRegister.waitForDisplayed({ timeout: 10000 });
            await registerLocator.btnRegister.click();

            // Assertion: Kembali ke halaman login
            await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
            expect(await loginLocator.inputEmail.isDisplayed()).toBe(true);
            await browser.pause(2000);
        });
    });

    // =========================================================================
    // TAHAP 3: SKENARIO POSITIF (Login Akun Baru & Buat Postingan)
    // =========================================================================
    describe('3. [TAHAP 3] Skenario Positif (Login Akun Baru & Buat Postingan)', () => {
        it('Harus berhasil login menggunakan akun yang baru saja di-generate', async () => {
            console.log('\n🟢 [TAHAP 3] Login dengan User Baru...');
            const sessionUser = getSavedSessionUser();

            await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
            await loginLocator.inputEmail.click();
            await loginLocator.inputEmail.setValue(sessionUser.email);

            await loginLocator.inputPassword.waitForDisplayed({ timeout: 15000 });
            await loginLocator.inputPassword.click();
            await loginLocator.inputPassword.setValue(sessionUser.password);

            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard();
            }

            await loginLocator.btnLogin.waitForDisplayed({ timeout: 10000 });
            await loginLocator.btnLogin.click();

            await homeLocator.headerTitle.waitForDisplayed({ timeout: 15000 });
            expect(await homeLocator.headerTitle.isDisplayed()).toBe(true);
        });

        it('Harus berhasil membuat postingan baru dan memverifikasi feed', async () => {
            console.log('🟢 [TAHAP 3] Membuat Postingan Baru...');

            await homeLocator.inputPost.waitForDisplayed({ timeout: 15000 });
            await homeLocator.inputPost.click();
            await homeLocator.inputPost.setValue(newPost.content);

            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard();
            }

            await homeLocator.btnPosting.waitForDisplayed({ timeout: 10000 });
            await homeLocator.btnPosting.click();

            await browser.pause(2000);
            await scrollUtil.scrollDown(0.7, 0.3, 600);

            // Assertion feed muncul
            expect(await homeLocator.feedList.isDisplayed()).toBe(true);
            await browser.pause(2000);
        });
    });

    // =========================================================================
    // TAHAP 4: SKENARIO NEGATIF (Uji Input Salah & Validasi Error)
    // =========================================================================
    describe('4. [TAHAP 4] Skenario Negatif (Validasi Input Salah & Field Kosong)', () => {
        it('Negatif 1: Gagal login ketika memasukkan password salah', async () => {
            console.log('\n🔴 [TAHAP 4] Uji Negatif: Login Password Salah...');

            // Restart app ke layar login
            await driver.terminateApp('com.example.belajar_bareng');
            await driver.activateApp('com.example.belajar_bareng');

            await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
            await loginLocator.inputEmail.click();
            await loginLocator.inputEmail.setValue(negativeLogin.wrongPassword.email);

            await loginLocator.inputPassword.waitForDisplayed({ timeout: 15000 });
            await loginLocator.inputPassword.click();
            await loginLocator.inputPassword.setValue(negativeLogin.wrongPassword.password);

            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard();
            }

            await loginLocator.btnLogin.waitForDisplayed({ timeout: 10000 });
            await loginLocator.btnLogin.click();

            await browser.pause(2000);

            // Assertion: Sistem menolak login dan TETAP berada di layar login
            expect(await loginLocator.btnLogin.isDisplayed()).toBe(true);
        });

        it('Negatif 2: Gagal registrasi ketika format email tidak valid (tanpa domain)', async () => {
            console.log('🔴 [TAHAP 4] Uji Negatif: Registrasi Email Tidak Valid...');

            await loginLocator.btnToRegister.waitForDisplayed({ timeout: 15000 });
            await loginLocator.btnToRegister.click();

            await registerLocator.headerTitle.waitForDisplayed({ timeout: 15000 });
            await registerLocator.inputUsername.setValue(negativeRegister.invalidEmail.username);
            await registerLocator.inputEmail.setValue(negativeRegister.invalidEmail.email);
            await registerLocator.inputPassword.setValue(negativeRegister.invalidEmail.password);

            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard();
            }

            await scrollUtil.scrollDown(0.7, 0.3, 500);
            await registerLocator.btnRegister.waitForDisplayed({ timeout: 10000 });
            await registerLocator.btnRegister.click();

            await browser.pause(2000);

            // Assertion: Form registrasi tetap terbuka (pendaftaran ditolak)
            expect(await registerLocator.headerTitle.isDisplayed()).toBe(true);
        });
    });
});
