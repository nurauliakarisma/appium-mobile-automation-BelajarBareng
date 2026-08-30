const fs = require('fs');
const path = require('path');

describe('Mobile Automation - Fitur Login BelajarBareng', () => {
    it('Harus berhasil login ke aplikasi dengan email dan password yang valid', async () => {
        // Simpan dump XML halaman Login ke folder dumps/
        const dumpDir = path.join(process.cwd(), 'dumps');
        if (!fs.existsSync(dumpDir)) {
            fs.mkdirSync(dumpDir, { recursive: true });
        }
        const loginPageSource = await browser.getPageSource();
        fs.writeFileSync(path.join(dumpDir, 'login_dump.xml'), loginPageSource);

        /**
         * 1. INPUT EMAIL
         * Diambil dari login_dump.xml:
         * <android.widget.EditText resource-id="email_input" hint="Masukkan Email" />
         */
        const inputEmail = await $('//*[@resource-id="email_input"]');
        await inputEmail.waitForDisplayed({ timeout: 15000 });
        await inputEmail.click();
        await inputEmail.setValue('aulia1@gmail.com');

        /**
         * 2. INPUT PASSWORD
         * Diambil dari login_dump.xml:
         * <android.widget.EditText resource-id="password_input" hint="Masukkan Password" />
         */
        const inputPassword = await $('//*[@resource-id="password_input"]');
        await inputPassword.waitForDisplayed({ timeout: 15000 });
        await inputPassword.click();
        await inputPassword.setValue('@Aulia1');

        // Sembunyikan keyboard agar elemen tombol Login terlihat dan dapat diklik
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }

        /**
         * 3. TOMBOL LOGIN
         * Diambil dari login_dump.xml:
         * <android.widget.Button content-desc="Login" />
         * Locator: ~Login (Accessibility ID)
         */
        const btnLogin = await $('~Login');
        await btnLogin.waitForDisplayed({ timeout: 10000 });
        await btnLogin.click();

        // Verifikasi transisi setelah login
        await browser.pause(3000);
    });
});