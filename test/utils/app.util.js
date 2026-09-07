/**
 * Helper Utility untuk Manajemen State Aplikasi (Reset Sesi & Navigasi Layar)
 */
class AppUtil {
    /**
     * Mereset data/sesi aplikasi agar selalu kembali ke halaman Login awal yang bersih
     */
    async resetToLoginScreen() {
        try {
            await driver.execute('mobile: clearApp', { appId: 'com.example.belajar_bareng' });
        } catch (e) {
            try {
                await driver.execute('mobile: shell', { command: 'pm', args: ['clear', 'com.example.belajar_bareng'] });
            } catch (err) {
                await driver.terminateApp('com.example.belajar_bareng');
            }
        }
        await driver.activateApp('com.example.belajar_bareng');
        await browser.pause(2000);
    }
}

module.exports = new AppUtil();
