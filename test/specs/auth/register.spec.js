const allureReporter = require('@wdio/allure-reporter').default;
const loginLocator = require('../../locators/login.locator');
const registerLocator = require('../../locators/register.locator');
const { getDynamicRegisterUser, saveSessionUser, negativeRegister } = require('../../data/auth.data');
const scrollUtil = require('../../utils/scroll.util');
const appUtil = require('../../utils/app.util');

describe('Authentication - Registration', () => {
    beforeEach(async () => {
        await appUtil.resetToLoginScreen();
    });

    it('Harus berhasil mendaftarkan akun baru dengan data valid', async () => {
        allureReporter.addEpic('Authentication');
        allureReporter.addFeature('Registration');
        allureReporter.addStory('Valid User Registration');
        allureReporter.addSeverity('critical');

        const newUser = getDynamicRegisterUser('melati');
        saveSessionUser(newUser);

        await loginLocator.btnToRegister.waitForDisplayed({ timeout: 8000 });
        await loginLocator.btnToRegister.click();

        await registerLocator.headerTitle.waitForDisplayed({ timeout: 8000 });

        await registerLocator.inputUsername.waitForDisplayed({ timeout: 8000 });
        await registerLocator.inputUsername.click();
        await registerLocator.inputUsername.setValue(newUser.username);

        await registerLocator.inputEmail.waitForDisplayed({ timeout: 8000 });
        await registerLocator.inputEmail.click();
        await registerLocator.inputEmail.setValue(newUser.email);

        await registerLocator.inputPassword.waitForDisplayed({ timeout: 8000 });
        await registerLocator.inputPassword.click();
        await registerLocator.inputPassword.setValue(newUser.password);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await scrollUtil.scrollDown(0.7, 0.3, 400);
        await registerLocator.btnRegister.waitForDisplayed({ timeout: 8000 });
        await registerLocator.btnRegister.click();

        await loginLocator.inputEmail.waitForDisplayed({ timeout: 8000 });
        expect(await loginLocator.inputEmail.isDisplayed()).toBe(true);
    });

    it('Gagal registrasi ketika format email tidak valid', async () => {
        allureReporter.addEpic('Authentication');
        allureReporter.addFeature('Registration');
        allureReporter.addStory('Invalid Email Registration');
        allureReporter.addSeverity('normal');

        await loginLocator.btnToRegister.waitForDisplayed({ timeout: 8000 });
        await loginLocator.btnToRegister.click();

        await registerLocator.headerTitle.waitForDisplayed({ timeout: 8000 });

        await registerLocator.inputUsername.waitForDisplayed({ timeout: 8000 });
        await registerLocator.inputUsername.click();
        await registerLocator.inputUsername.setValue(negativeRegister.invalidEmail.username);

        await registerLocator.inputEmail.waitForDisplayed({ timeout: 8000 });
        await registerLocator.inputEmail.click();
        await registerLocator.inputEmail.setValue(negativeRegister.invalidEmail.email);

        await registerLocator.inputPassword.waitForDisplayed({ timeout: 8000 });
        await registerLocator.inputPassword.click();
        await registerLocator.inputPassword.setValue(negativeRegister.invalidEmail.password);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await scrollUtil.scrollDown(0.7, 0.3, 400);
        await registerLocator.btnRegister.waitForDisplayed({ timeout: 8000 });
        await registerLocator.btnRegister.click();

        expect(await registerLocator.headerTitle.isDisplayed()).toBe(true);
        expect(await registerLocator.btnRegister.isDisplayed()).toBe(true);
    });

    it('Gagal registrasi ketika semua field kosong', async () => {
        allureReporter.addEpic('Authentication');
        allureReporter.addFeature('Registration');
        allureReporter.addStory('Empty Fields Registration');
        allureReporter.addSeverity('normal');

        await loginLocator.btnToRegister.waitForDisplayed({ timeout: 8000 });
        await loginLocator.btnToRegister.click();

        await registerLocator.headerTitle.waitForDisplayed({ timeout: 8000 });

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await scrollUtil.scrollDown(0.7, 0.3, 400);
        await registerLocator.btnRegister.waitForDisplayed({ timeout: 8000 });
        await registerLocator.btnRegister.click();

        expect(await registerLocator.headerTitle.isDisplayed()).toBe(true);
        expect(await registerLocator.btnRegister.isDisplayed()).toBe(true);
    });
});
