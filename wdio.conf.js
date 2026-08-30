const path = require('path');

exports.config = {
    runner: 'local',
    port: 4723,
    specs: [
        './test/specs/**/*.js'
    ],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'Android Device', // Ganti dengan nama perangkat Android yang sesuai (karena hanya satu perangkat yang terhubung, gunakan nama generik)
        'appium:app': path.join(process.cwd(), 'app/app-release.apk'),
        'appium:appPackage': 'com.example.belajar_bareng',
        'appium:appActivity': 'com.example.belajar_bareng.MainActivity',
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 240,
    }],
    logLevel: 'info',
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    reporters: ['spec'],
    services: ['appium']
};