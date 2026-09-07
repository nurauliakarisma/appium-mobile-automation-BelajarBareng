const loginLocator = require('../locators/login.locator');
const registerLocator = require('../locators/register.locator');
const homeLocator = require('../locators/home.locator');
const { getDynamicRegisterUser, saveSessionUser, getSavedSessionUser } = require('../data/auth.data');
const { newPost } = require('../data/post.data');
const scrollUtil = require('../utils/scroll.util');
const appUtil = require('../utils/app.util');

describe('E2E Flow - Registrasi Akun Baru, Login, dan Buat Postingan', () => {
    let currentUser;

    before(async () => {
        await appUtil.resetToLoginScreen();
        const generatedUser = getDynamicRegisterUser('melati');
        currentUser = saveSessionUser(generatedUser);
    });

    it('Langkah 1: Registrasi Akun Baru dengan Auto-Generate', async () => {
        await loginLocator.btnToRegister.waitForDisplayed({ timeout: 15000 });
        await loginLocator.btnToRegister.click();

        await registerLocator.headerTitle.waitForDisplayed({ timeout: 15000 });
        await registerLocator.inputUsername.setValue(currentUser.username);
        await registerLocator.inputEmail.setValue(currentUser.email);
        await registerLocator.inputPassword.setValue(currentUser.password);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await scrollUtil.scrollDown(0.7, 0.3, 500);
        await registerLocator.btnRegister.waitForDisplayed({ timeout: 10000 });
        await registerLocator.btnRegister.click();

        await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
        expect(await loginLocator.inputEmail.isDisplayed()).toBe(true);
    });

    it('Langkah 2: Login Menggunakan Akun yang Baru Saja Didaftarkan', async () => {
        const userToLogin = getSavedSessionUser();

        await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
        await loginLocator.inputEmail.click();
        await loginLocator.inputEmail.setValue(userToLogin.email);

        await loginLocator.inputPassword.waitForDisplayed({ timeout: 15000 });
        await loginLocator.inputPassword.click();
        await loginLocator.inputPassword.setValue(userToLogin.password);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await loginLocator.btnLogin.waitForDisplayed({ timeout: 10000 });
        await loginLocator.btnLogin.click();

        await homeLocator.headerTitle.waitForDisplayed({ timeout: 15000 });
        expect(await homeLocator.headerTitle.isDisplayed()).toBe(true);
        expect(await homeLocator.inputPost.isDisplayed()).toBe(true);
    });

    it('Langkah 3: Membuat Postingan Baru Menggunakan Akun Tersebut', async () => {
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
