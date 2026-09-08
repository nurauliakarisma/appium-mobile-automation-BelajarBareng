const allureReporter = require('@wdio/allure-reporter').default;
const loginLocator = require('../../locators/login.locator');
const homeLocator = require('../../locators/home.locator');
const { validManualUser } = require('../../data/auth.data');
const { newPost } = require('../../data/post.data');
const scrollUtil = require('../../utils/scroll.util');
const appUtil = require('../../utils/app.util');

describe('Post Management - Create & Feed', () => {
    before(async () => {
        await appUtil.resetToLoginScreen();
    });

    it('Harus berhasil login dan membuat postingan baru di feed', async () => {
        allureReporter.addEpic('Post Management');
        allureReporter.addFeature('Feed & Posting');
        allureReporter.addStory('Create Post');
        allureReporter.addSeverity('critical');

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
