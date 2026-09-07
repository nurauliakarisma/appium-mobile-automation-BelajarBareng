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
const appUtil = require('../utils/app.util');

describe('Master Sequence: Login Manual ➡️ Registrasi Generate ➡️ Positif Flow ➡️ Negatif Flow', () => {
    let generatedUser;

    before(async () => {
        await appUtil.resetToLoginScreen();
    });

    describe('1. Login Manual User Valid', () => {
        it('Harus berhasil login dengan user manual dan memvalidasi beranda', async () => {
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

            await homeLocator.headerTitle.waitForDisplayed({ timeout: 15000 });
            expect(await homeLocator.headerTitle.isDisplayed()).toBe(true);
            expect(await homeLocator.inputPost.isDisplayed()).toBe(true);

            await scrollUtil.scrollToBottom(2);
            await browser.pause(1000);
        });
    });

    describe('2. Registrasi Akun Baru dengan Auto-Generate', () => {
        it('Harus berhasil generate data dan mendaftarkan akun baru', async () => {
            await appUtil.resetToLoginScreen();

            generatedUser = getDynamicRegisterUser('melati');
            saveSessionUser(generatedUser);

            await loginLocator.btnToRegister.waitForDisplayed({ timeout: 15000 });
            await loginLocator.btnToRegister.click();

            await registerLocator.headerTitle.waitForDisplayed({ timeout: 15000 });

            await registerLocator.inputUsername.waitForDisplayed({ timeout: 10000 });
            await registerLocator.inputUsername.click();
            await registerLocator.inputUsername.setValue(generatedUser.username);

            await registerLocator.inputEmail.waitForDisplayed({ timeout: 10000 });
            await registerLocator.inputEmail.click();
            await registerLocator.inputEmail.setValue(generatedUser.email);

            await registerLocator.inputPassword.waitForDisplayed({ timeout: 10000 });
            await registerLocator.inputPassword.click();
            await registerLocator.inputPassword.setValue(generatedUser.password);

            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard();
            }

            await scrollUtil.scrollDown(0.7, 0.3, 500);
            await registerLocator.btnRegister.waitForDisplayed({ timeout: 10000 });
            await registerLocator.btnRegister.click();

            await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
            expect(await loginLocator.inputEmail.isDisplayed()).toBe(true);
            await browser.pause(1000);
        });
    });

    describe('3. Skenario Positif Flow', () => {
        it('Harus berhasil login menggunakan akun hasil generate', async () => {
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

            await homeLocator.inputPost.waitForDisplayed({ timeout: 15000 });
            expect(await homeLocator.inputPost.isDisplayed()).toBe(true);
        });

        it('Harus berhasil membuat postingan baru dan memverifikasi feed', async () => {
            await homeLocator.inputPost.waitForDisplayed({ timeout: 15000 });
            await homeLocator.inputPost.click();
            await homeLocator.inputPost.setValue(newPost.content);

            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard();
            }

            await homeLocator.btnPosting.waitForDisplayed({ timeout: 10000 });
            await homeLocator.btnPosting.click();

            await browser.pause(1500);
            await scrollUtil.scrollDown(0.7, 0.3, 600);

            expect(await homeLocator.feedList.isDisplayed()).toBe(true);
            await scrollUtil.scrollToBottom(2);
            await browser.pause(1000);
        });
    });

    describe('4. Skenario Negatif Flow', () => {
        it('Gagal login ketika memasukkan password salah', async () => {
            await appUtil.resetToLoginScreen();

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

            await browser.pause(1500);
            expect(await loginLocator.btnLogin.isDisplayed()).toBe(true);
        });

        it('Gagal registrasi ketika format email tidak valid', async () => {
            await loginLocator.btnToRegister.waitForDisplayed({ timeout: 15000 });
            await loginLocator.btnToRegister.click();

            await registerLocator.headerTitle.waitForDisplayed({ timeout: 15000 });

            await registerLocator.inputUsername.waitForDisplayed({ timeout: 10000 });
            await registerLocator.inputUsername.click();
            await registerLocator.inputUsername.setValue(negativeRegister.invalidEmail.username);

            await registerLocator.inputEmail.waitForDisplayed({ timeout: 10000 });
            await registerLocator.inputEmail.click();
            await registerLocator.inputEmail.setValue(negativeRegister.invalidEmail.email);

            await registerLocator.inputPassword.waitForDisplayed({ timeout: 10000 });
            await registerLocator.inputPassword.click();
            await registerLocator.inputPassword.setValue(negativeRegister.invalidEmail.password);

            if (await driver.isKeyboardShown()) {
                await driver.hideKeyboard();
            }

            await scrollUtil.scrollDown(0.7, 0.3, 500);
            await registerLocator.btnRegister.waitForDisplayed({ timeout: 10000 });
            await registerLocator.btnRegister.click();

            await browser.pause(1500);
            expect(await registerLocator.headerTitle.isDisplayed()).toBe(true);
        });
    });
});
