const fs = require('fs');
const path = require('path');
const os = require('os');

const RESULTS_DIR = path.join(process.cwd(), 'allure-results');
const REPORT_DIR = path.join(process.cwd(), 'allure-report');

// 1. Pastikan direktori allure-results ada
if (!fs.existsSync(RESULTS_DIR)) {
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
}

// 2. Salin riwayat (history) dari allure-report ke allure-results untuk grafik Trend
const reportHistoryDir = path.join(REPORT_DIR, 'history');
const resultsHistoryDir = path.join(RESULTS_DIR, 'history');

if (fs.existsSync(reportHistoryDir)) {
    if (!fs.existsSync(resultsHistoryDir)) {
        fs.mkdirSync(resultsHistoryDir, { recursive: true });
    }
    const files = fs.readdirSync(reportHistoryDir);
    for (const file of files) {
        fs.copyFileSync(
            path.join(reportHistoryDir, file),
            path.join(resultsHistoryDir, file)
        );
    }
    console.log('✅ Berhasil menyalin riwayat Allure History untuk grafik Trend.');
}

// 3. Tulis environment.properties untuk widget Environment
const envContent = [
    `OperatingSystem=${os.type()} ${os.release()} (${os.arch()})`,
    'Platform=Android',
    'AutomationName=UiAutomator2',
    'DeviceName=Android Device (RRCY609FX2N)',
    'AppPackage=com.example.belajar_bareng',
    'AppActivity=com.example.belajar_bareng.MainActivity',
    'AppVersion=1.0.0',
    'Framework=WebdriverIO v9',
    'TestRunner=Mocha BDD',
    'AllureVersion=2.32.0',
    'NodeVersion=' + process.version
].join('\n');

fs.writeFileSync(path.join(RESULTS_DIR, 'environment.properties'), envContent, 'utf-8');
console.log('✅ Berhasil membuat environment.properties untuk Allure Dashboard.');

// 4. Tulis executor.json untuk widget Executors
const executorContent = {
    name: 'Local Test Runner',
    type: 'local',
    buildName: 'Local Execution',
    reportName: 'BelajarBareng Test Automation Report'
};

fs.writeFileSync(path.join(RESULTS_DIR, 'executor.json'), JSON.stringify(executorContent, null, 2), 'utf-8');
console.log('✅ Berhasil membuat executor.json untuk Allure Dashboard.');
