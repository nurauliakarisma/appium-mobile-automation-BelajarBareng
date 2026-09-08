const allureReporter = require('@wdio/allure-reporter').default;
const loginLocator = require('../../locators/login.locator');
const homeLocator = require('../../locators/home.locator');
const { 
    validManualUser, 
    getSavedSessionUser, 
    negativeLogin 
} = require('../../data/auth.data');
const scrollUtil = require('../../utils/scroll.util');
const appUtil = require('../../utils/app.util');

describe('Authentication - Login', () => {
    beforeEach(async () => {
        await appUtil.resetToLoginScreen();
    });

    it('Harus berhasil login dengan manual valid user (aulia1@gmail.com)', async () => {
        allureReporter.addEpic('Authentication');
        allureReporter.addFeature('Login');
        allureReporter.addStory('Manual Valid User Login');
        allureReporter.addSeverity('blocker');

        await loginLocator.inputEmail.waitForDisplayed({ timeout: 8000 });
        await loginLocator.inputEmail.click();
        await loginLocator.inputEmail.setValue(validManualUser.email);

        await loginLocator.inputPassword.waitForDisplayed({ timeout: 8000 });
        await loginLocator.inputPassword.click();
        await loginLocator.inputPassword.setValue(validManualUser.password);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await loginLocator.btnLogin.waitForDisplayed({ timeout: 8000 });
        await loginLocator.btnLogin.click();

        await homeLocator.headerTitle.waitForDisplayed({ timeout: 10000 });
        expect(await homeLocator.headerTitle.isDisplayed()).toBe(true);
        expect(await homeLocator.inputPost.isDisplayed()).toBe(true);

        await scrollUtil.scrollToBottom(2);
    });

    it('Harus berhasil login dengan dynamic session user', async () => {
        allureReporter.addEpic('Authentication');
        allureReporter.addFeature('Login');
        allureReporter.addStory('Dynamic User Login');
        allureReporter.addSeverity('critical');

        const sessionUser = getSavedSessionUser();

        await loginLocator.inputEmail.waitForDisplayed({ timeout: 8000 });
        await loginLocator.inputEmail.click();
        await loginLocator.inputEmail.setValue(sessionUser.email);

        await loginLocator.inputPassword.waitForDisplayed({ timeout: 8000 });
        await loginLocator.inputPassword.click();
        await loginLocator.inputPassword.setValue(sessionUser.password);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await loginLocator.btnLogin.waitForDisplayed({ timeout: 8000 });
        await loginLocator.btnLogin.click();

        await homeLocator.headerTitle.waitForDisplayed({ timeout: 10000 });
        expect(await homeLocator.headerTitle.isDisplayed()).toBe(true);
        expect(await homeLocator.inputPost.isDisplayed()).toBe(true);
    });

    it('Gagal login ketika memasukkan password salah', async () => {
        allureReporter.addEpic('Authentication');
        allureReporter.addFeature('Login');
        allureReporter.addStory('Wrong Password Login');
        allureReporter.addSeverity('normal');

        await loginLocator.inputEmail.waitForDisplayed({ timeout: 8000 });
        await loginLocator.inputEmail.click();
        await loginLocator.inputEmail.setValue(negativeLogin.wrongPassword.email);

        await loginLocator.inputPassword.waitForDisplayed({ timeout: 8000 });
        await loginLocator.inputPassword.click();
        await loginLocator.inputPassword.setValue(negativeLogin.wrongPassword.password);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await loginLocator.btnLogin.waitForDisplayed({ timeout: 8000 });
        await loginLocator.btnLogin.click();

        await browser.pause(1000);
        expect(await loginLocator.btnLogin.isDisplayed()).toBe(true);
    });

    it('Gagal login dengan email yang belum terdaftar', async () => {
        allureReporter.addEpic('Authentication');
        allureReporter.addFeature('Login');
        allureReporter.addStory('Unregistered Email Login');
        allureReporter.addSeverity('normal');

        await loginLocator.inputEmail.waitForDisplayed({ timeout: 8000 });
        await loginLocator.inputEmail.click();
        await loginLocator.inputEmail.setValue(negativeLogin.unregisteredEmail.email);

        await loginLocator.inputPassword.waitForDisplayed({ timeout: 8000 });
        await loginLocator.inputPassword.click();
        await loginLocator.inputPassword.setValue(negativeLogin.unregisteredEmail.password);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await loginLocator.btnLogin.waitForDisplayed({ timeout: 8000 });
        await loginLocator.btnLogin.click();

        await browser.pause(1000);
        expect(await loginLocator.btnLogin.isDisplayed()).toBe(true);
    });

    it('Gagal login ketika semua field kosong', async () => {
        allureReporter.addEpic('Authentication');
        allureReporter.addFeature('Login');
        allureReporter.addStory('Empty Fields Login');
        allureReporter.addSeverity('normal');

        await loginLocator.inputEmail.waitForDisplayed({ timeout: 8000 });
        await loginLocator.inputEmail.clearValue();
        await loginLocator.inputPassword.clearValue();

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await loginLocator.btnLogin.waitForDisplayed({ timeout: 8000 });
        await loginLocator.btnLogin.click();

        await browser.pause(1000);
        expect(await loginLocator.btnLogin.isDisplayed()).toBe(true);
    });
});
