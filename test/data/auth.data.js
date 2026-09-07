const fs = require('fs');
const path = require('path');
const generatorUtil = require('../utils/generator.util');

const SESSION_FILE_PATH = path.join(__dirname, 'session_user.json');

module.exports = {
    // 1. Fungsi membuat user registrasi baru yang unik tanpa angka
    getDynamicRegisterUser: (prefix = 'melati') => {
        return generatorUtil.generateRegisterUser(prefix);
    },

    // 2. Fungsi untuk menyimpan data hasil generate ke file session_user.json
    saveSessionUser: (userData) => {
        fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(userData, null, 2), 'utf-8');
        return userData;
    },

    // 3. Fungsi untuk mengambil data user yang terakhir kali disimpan
    getSavedSessionUser: () => {
        if (fs.existsSync(SESSION_FILE_PATH)) {
            const data = fs.readFileSync(SESSION_FILE_PATH, 'utf-8');
            return JSON.parse(data);
        }
        // Fallback jika file belum ada
        return generatorUtil.generateRegisterUser('melati');
    },

    // 4. Data statis fallback
    validUser: {
        email: 'aulia1@gmail.com',
        password: '@Aulia1'
    }
};
