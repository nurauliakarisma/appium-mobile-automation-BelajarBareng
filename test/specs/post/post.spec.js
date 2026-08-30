const fs = require('fs');
const path = require('path');

describe('Mobile Automation - Fitur Buat Postingan BelajarBareng', () => {
    it('Harus login terlebih dahulu sebelum membuat postingan', async () => {
        // Locator input email
        const inputEmail = await $('//*[@resource-id="email_input"]');
        await inputEmail.waitForDisplayed({ timeout: 15000 });
        await inputEmail.click();
        await inputEmail.setValue('aulia1@gmail.com');

        // Locator input password
        const inputPassword = await $('//*[@resource-id="password_input"]');
        await inputPassword.waitForDisplayed({ timeout: 15000 });
        await inputPassword.click();
        await inputPassword.setValue('@Aulia1');

        // Sembunyikan keyboard jika masih aktif
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        // Locator tombol Login
        const btnLogin = await $('~Login');
        await btnLogin.waitForDisplayed({ timeout: 10000 });
        await btnLogin.click();

        await browser.pause(3000);
    });

    it('Harus berhasil mengisi teks dan mengirim postingan baru', async () => {
        // Simpan dump XML halaman Beranda / Postingan ke folder dumps/
        const dumpDir = path.join(process.cwd(), 'dumps');
        if (!fs.existsSync(dumpDir)) {
            fs.mkdirSync(dumpDir, { recursive: true });
        }
        const homePageSource = await browser.getPageSource();
        fs.writeFileSync(path.join(dumpDir, 'home_dump.xml'), homePageSource);

        /**
         * 1. KOLOM TEKS POSTINGAN ("Apa yang kamu pikirkan hari ini?")
         * Diambil dari home_dump.xml:
         * <android.widget.EditText hint="Buat Postingan&#10;Apa yang kamu pikirkan hari ini?" />
         */
        const inputPost = await $('//android.widget.EditText[contains(@hint, "Apa yang kamu pikirkan")]');
        await inputPost.waitForDisplayed({ timeout: 15000 });
        await inputPost.click();
        await inputPost.setValue('Sedang belajar membuat automation testing mobile dengan appium');

        // Sembunyikan keyboard agar tombol Posting terlihat jelas
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        /**
         * 2. TOMBOL POSTING
         * Diambil dari home_dump.xml:
         * <android.widget.Button content-desc="Posting" />
         * Locator: ~Posting (Accessibility ID)
         */
        const btnPosting = await $('~Posting');
        await btnPosting.waitForDisplayed({ timeout: 10000 });
        await btnPosting.click();

        // Jeda waktu untuk memastikan proses posting berhasil
        await browser.pause(3000);
    });
});
