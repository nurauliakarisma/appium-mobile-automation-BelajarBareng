const loginLocator = require('../../locators/login.locator');
const homeLocator = require('../../locators/home.locator');
const { validManualUser } = require('../../data/auth.data');
const { newPost } = require('../../data/post.data');
const scrollUtil = require('../../utils/scroll.util');

describe('[POSITIF] Fitur Buat Postingan - BelajarBareng', () => {
    it('Harus login terlebih dahulu dengan user valid', async () => {
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
    });

    it('Harus berhasil membuat postingan baru dan memvalidasi daftar feed', async () => {
        // 1. Masukkan konten postingan
        await homeLocator.inputPost.waitForDisplayed({ timeout: 15000 });
        await homeLocator.inputPost.click();
        await homeLocator.inputPost.setValue(newPost.content);

        // 2. Sembunyikan keyboard
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // 3. Klik tombol Posting
        await homeLocator.btnPosting.waitForDisplayed({ timeout: 10000 });
        await homeLocator.btnPosting.click();

        // 4. Jeda dan Scroll ke bawah untuk melihat postingan di feed
        await browser.pause(2000);
        await scrollUtil.scrollDown(0.7, 0.3, 600);

        // 5. Assertion: Feed postingan berhasil ditampilkan
        const isFeedDisplayed = await homeLocator.feedList.isDisplayed();
        expect(isFeedDisplayed).toBe(true);

        await browser.pause(2000);
    });
});
