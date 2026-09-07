const loginLocator = require('../locators/login.locator');
const registerLocator = require('../locators/register.locator');
const { getDynamicRegisterUser, saveSessionUser } = require('../data/auth.data');
const scrollUtil = require('../utils/scroll.util');
const appUtil = require('../utils/app.util');

describe('Registrasi Akun Baru dengan Auto-Generate', () => {
    before(async () => {
        await appUtil.resetToLoginScreen();
    });

    it('Harus berhasil mendaftarkan akun baru dengan data valid', async () => {
        const newUser = getDynamicRegisterUser('melati');
        saveSessionUser(newUser);

        await loginLocator.btnToRegister.waitForDisplayed({ timeout: 15000 });
        await loginLocator.btnToRegister.click();

        await registerLocator.headerTitle.waitForDisplayed({ timeout: 15000 });

        await registerLocator.inputUsername.waitForDisplayed({ timeout: 10000 });
        await registerLocator.inputUsername.click();
        await registerLocator.inputUsername.setValue(newUser.username);

        await registerLocator.inputEmail.waitForDisplayed({ timeout: 10000 });
        await registerLocator.inputEmail.click();
        await registerLocator.inputEmail.setValue(newUser.email);

        await registerLocator.inputPassword.waitForDisplayed({ timeout: 10000 });
        await registerLocator.inputPassword.click();
        await registerLocator.inputPassword.setValue(newUser.password);

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
