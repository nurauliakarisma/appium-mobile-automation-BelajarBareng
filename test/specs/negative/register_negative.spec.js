const loginLocator = require('../../locators/login.locator');
const registerLocator = require('../../locators/register.locator');
const { negativeRegister } = require('../../data/auth.data');
const scrollUtil = require('../../utils/scroll.util');
const appUtil = require('../../utils/app.util');

describe('Registrasi Negatif Flow', () => {
    beforeEach(async () => {
        await appUtil.resetToLoginScreen();
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

    it('Gagal registrasi ketika semua field kosong', async () => {
        await loginLocator.btnToRegister.waitForDisplayed({ timeout: 15000 });
        await loginLocator.btnToRegister.click();

        await registerLocator.headerTitle.waitForDisplayed({ timeout: 15000 });

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
