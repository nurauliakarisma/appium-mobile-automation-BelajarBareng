const loginLocator = require('../../locators/login.locator');
const homeLocator = require('../../locators/home.locator');
const { negativeLogin } = require('../../data/auth.data');
const appUtil = require('../../utils/app.util');

describe('Login Negatif Flow', () => {
    beforeEach(async () => {
        await appUtil.resetToLoginScreen();
    });

    it('Gagal login ketika memasukkan password salah', async () => {
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
        expect(await homeLocator.headerTitle.isDisplayed()).toBe(false);
    });

    it('Gagal login dengan email yang belum terdaftar', async () => {
        await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
        await loginLocator.inputEmail.click();
        await loginLocator.inputEmail.setValue(negativeLogin.unregisteredEmail.email);

        await loginLocator.inputPassword.waitForDisplayed({ timeout: 15000 });
        await loginLocator.inputPassword.click();
        await loginLocator.inputPassword.setValue(negativeLogin.unregisteredEmail.password);

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await loginLocator.btnLogin.waitForDisplayed({ timeout: 10000 });
        await loginLocator.btnLogin.click();

        await browser.pause(1500);
        expect(await loginLocator.btnLogin.isDisplayed()).toBe(true);
    });

    it('Gagal login ketika semua field kosong', async () => {
        await loginLocator.inputEmail.waitForDisplayed({ timeout: 15000 });
        await loginLocator.inputEmail.clearValue();
        await loginLocator.inputPassword.clearValue();

        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        await loginLocator.btnLogin.waitForDisplayed({ timeout: 10000 });
        await loginLocator.btnLogin.click();

        await browser.pause(1500);
        expect(await loginLocator.btnLogin.isDisplayed()).toBe(true);
    });
});
