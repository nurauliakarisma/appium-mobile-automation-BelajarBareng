const loginLocator = require('../locators/login.locator');
const homeLocator = require('../locators/home.locator');
const { validManualUser } = require('../data/auth.data');
const scrollUtil = require('../utils/scroll.util');
const appUtil = require('../utils/app.util');

describe('Login dengan User Valid', () => {
    before(async () => {
        await appUtil.resetToLoginScreen();
    });

    it('Harus berhasil login dan memvalidasi beranda', async () => {
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