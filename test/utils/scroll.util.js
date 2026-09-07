class ScrollUtil {
    async scrollDown(fromYPercentage = 0.8, toYPercentage = 0.2, duration = 600) {
        const { width, height } = await browser.getWindowSize();
        const startX = Math.round(width / 2);
        const startY = Math.round(height * fromYPercentage);
        const endY = Math.round(height * toYPercentage);

        await browser.action('pointer', { parameters: { pointerType: 'touch' } })
            .move({ x: startX, y: startY })
            .down()
            .pause(100)
            .move({ duration, x: startX, y: endY })
            .up()
            .perform();

        await browser.pause(500);
    }

    async scrollUp(fromYPercentage = 0.2, toYPercentage = 0.8, duration = 600) {
        const { width, height } = await browser.getWindowSize();
        const startX = Math.round(width / 2);
        const startY = Math.round(height * fromYPercentage);
        const endY = Math.round(height * toYPercentage);

        await browser.action('pointer', { parameters: { pointerType: 'touch' } })
            .move({ x: startX, y: startY })
            .down()
            .pause(100)
            .move({ duration, x: startX, y: endY })
            .up()
            .perform();

        await browser.pause(500);
    }

    async scrollToBottom(times = 3) {
        for (let i = 0; i < times; i++) {
            await this.scrollDown(0.75, 0.25, 500);
        }
    }

    async scrollToTop(times = 3) {
        for (let i = 0; i < times; i++) {
            await this.scrollUp(0.25, 0.75, 500);
        }
    }

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
