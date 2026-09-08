const path = require('path');

exports.config = {
    runner: 'local',
    port: 4723,
    specs: [
        './test/specs/**/*.spec.js'
    ],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android Device',
        'appium:app': path.join(process.cwd(), 'app/app-release.apk'),
        'appium:appPackage': 'com.example.belajar_bareng',
        'appium:appActivity': 'com.example.belajar_bareng.MainActivity',
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 120,
    }],
    logLevel: 'info',
    waitforTimeout: 8000,
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 45000
    },
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    services: ['appium'],

    // Otomatis mengambil screenshot saat terjadi error dan melampirkannya ke Allure Report
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (error) {
            await browser.takeScreenshot();
        }
    }
};