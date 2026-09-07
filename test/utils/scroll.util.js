/**
 * Helper Utility untuk Aksi Gestur Scroll pada Mobile Android
 */
class ScrollUtil {
    /**
     * Melakukan scroll ke bawah (swipe ke atas)
     * @param {number} fromYPercentage - Titik awal persentase tinggi layar (default 0.8 / 80%)
     * @param {number} toYPercentage - Titik akhir persentase tinggi layar (default 0.2 / 20%)
     * @param {number} duration - Durasi gestur dalam milidetik (default 600ms)
     */
    async scrollDown(fromYPercentage = 0.8, toYPercentage = 0.2, duration = 600) {
        const { width, height } = await browser.getWindowSize();
        const startX = Math.round(width / 2);
        const startY = Math.round(height * fromYPercentage);
        const endY = Math.round(height * toYPercentage);

        await browser.action('pointer', { parameters: { pointerType: 'touch' } })
            .move({ x: startX, y: startY })
            .down()
            .pause(100)
            .move({ duration: duration, x: startX, y: endY })
            .up()
            .perform();

        await browser.pause(500);
    }

    /**
     * Melakukan scroll ke atas (swipe ke bawah)
     * @param {number} fromYPercentage - Titik awal persentase tinggi layar (default 0.2 / 20%)
     * @param {number} toYPercentage - Titik akhir persentase tinggi layar (default 0.8 / 80%)
     * @param {number} duration - Durasi gestur dalam milidetik (default 600ms)
     */
    async scrollUp(fromYPercentage = 0.2, toYPercentage = 0.8, duration = 600) {
        const { width, height } = await browser.getWindowSize();
        const startX = Math.round(width / 2);
        const startY = Math.round(height * fromYPercentage);
        const endY = Math.round(height * toYPercentage);

        await browser.action('pointer', { parameters: { pointerType: 'touch' } })
            .move({ x: startX, y: startY })
            .down()
            .pause(100)
            .move({ duration: duration, x: startX, y: endY })
            .up()
            .perform();

        await browser.pause(500);
    }

    /**
     * Melakukan scroll hingga mencapai bagian paling bawah halaman
     * @param {number} times - Berapa kali melakukan swipe ke bawah (default 3 kali)
     */
    async scrollToBottom(times = 3) {
        for (let i = 0; i < times; i++) {
            await this.scrollDown(0.75, 0.25, 500);
        }
    }

    /**
     * Melakukan scroll hingga mencapai bagian paling atas halaman
     * @param {number} times - Berapa kali melakukan swipe ke atas (default 3 kali)
     */
    async scrollToTop(times = 3) {
        for (let i = 0; i < times; i++) {
            await this.scrollUp(0.25, 0.75, 500);
        }
    }

    /**
     * Melakukan scroll sampai elemen target terlihat di layar
     * @param {WebdriverIO.Element} element - Elemen WebdriverIO yang dicari
     * @param {number} maxScrolls - Maksimal percobaan scroll (default 5)
     */
    async scrollToElement(element, maxScrolls = 5) {
        for (let i = 0; i < maxScrolls; i++) {
            if (await element.isDisplayed()) {
                return true;
            }
            await this.scrollDown(0.7, 0.3, 500);
        }
        return await element.isDisplayed();
    }
}

module.exports = new ScrollUtil();
