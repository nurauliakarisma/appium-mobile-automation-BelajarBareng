const allureReporter = require('@wdio/allure-reporter').default;
const loginLocator = require('../../locators/login.locator');
const registerLocator = require('../../locators/register.locator');
const homeLocator = require('../../locators/home.locator');
const { getDynamicRegisterUser, saveSessionUser, getSavedSessionUser } = require('../../data/auth.data');
const { newPost } = require('../../data/post.data');
const scrollUtil = require('../../utils/scroll.util');
const appUtil = require('../../utils/app.util');

describe('End-to-End Workflow - Complete User Journey', () => {
    let currentUser;

    before(async () => {
        await appUtil.resetToLoginScreen();
        const generatedUser = getDynamicRegisterUser('melati');
        currentUser = saveSessionUser(generatedUser);
    });

    it('Langkah 1: Registrasi Akun Baru dengan Auto-Generate', async () => {
        allureReporter.addEpic('End-to-End Workflow');
        allureReporter.addFeature('Complete User Journey');
        allureReporter.addStory('User Registration');
        allureReporter.addSeverity('blocker');

        await loginLocator.btnToRegister.waitForDisplayed({ timeout: 8000 });
        await loginLocator.btnToRegister.click();

        await registerLocator.headerTitle.waitForDisplayed({ timeout: 8000 });

        await registerLocator.inputUsername.waitForDisplayed({ timeout: 8000 });
        await registerLocator.inputUsername.click();
        await registerLocator.inputUsername.setValue(currentUser.username);

        await registerLocator.inputEmail.waitForDisplayed({ timeout: 8000 });
        await registerLocator.inputEmail.click();
        await registerLocator.inputEmail.setValue(currentUser.email);

        await registerLocator.inputPassword.waitForDisplayed({ timeout: 8000 });
        await registerLocator.inputPassword.click();
        await registerLocator.inputPassword.setValue(currentUser.password);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await scrollUtil.scrollDown(0.7, 0.3, 400);
        await registerLocator.btnRegister.waitForDisplayed({ timeout: 8000 });
        await registerLocator.btnRegister.click();

        await loginLocator.inputEmail.waitForDisplayed({ timeout: 8000 });
        expect(await loginLocator.inputEmail.isDisplayed()).toBe(true);
    });

    it('Langkah 2: Login Menggunakan Akun Baru yang Terdaftar', async () => {
        allureReporter.addEpic('End-to-End Workflow');
        allureReporter.addFeature('Complete User Journey');
        allureReporter.addStory('User Login');
        allureReporter.addSeverity('blocker');

        const userToLogin = getSavedSessionUser();

        await loginLocator.inputEmail.waitForDisplayed({ timeout: 8000 });
        await loginLocator.inputEmail.click();
        await loginLocator.inputEmail.setValue(userToLogin.email);

        await loginLocator.inputPassword.waitForDisplayed({ timeout: 8000 });
        await loginLocator.inputPassword.click();
        await loginLocator.inputPassword.setValue(userToLogin.password);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await loginLocator.btnLogin.waitForDisplayed({ timeout: 8000 });
        await loginLocator.btnLogin.click();

        await homeLocator.headerTitle.waitForDisplayed({ timeout: 10000 });
        expect(await homeLocator.headerTitle.isDisplayed()).toBe(true);
        expect(await homeLocator.inputPost.isDisplayed()).toBe(true);
    });

    it('Langkah 3: Membuat Postingan Baru dan Memverifikasi di Feed', async () => {
        allureReporter.addEpic('End-to-End Workflow');
        allureReporter.addFeature('Complete User Journey');
        allureReporter.addStory('Create and Verify Post');
        allureReporter.addSeverity('critical');

        await homeLocator.inputPost.waitForDisplayed({ timeout: 8000 });
        await homeLocator.inputPost.click();
        await homeLocator.inputPost.setValue(newPost.content);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await homeLocator.btnPosting.waitForDisplayed({ timeout: 8000 });
        await homeLocator.btnPosting.click();

        await scrollUtil.scrollDown(0.7, 0.3, 500);

        expect(await homeLocator.feedList.isDisplayed()).toBe(true);
        await scrollUtil.scrollToBottom(2);
    });
});
