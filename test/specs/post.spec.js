const loginLocator = require('../locators/login.locator');
const homeLocator = require('../locators/home.locator');
const { validManualUser } = require('../data/auth.data');
const { newPost } = require('../data/post.data');
const scrollUtil = require('../utils/scroll.util');
const appUtil = require('../utils/app.util');

describe('Buat Postingan Baru', () => {
    before(async () => {
        await appUtil.resetToLoginScreen();
    });

    it('Harus login dan berhasil membuat postingan baru', async () => {
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
        await browser.pause(1000);
    });
});
