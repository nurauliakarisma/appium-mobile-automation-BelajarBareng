const fs = require('fs');
const path = require('path');
const generatorUtil = require('../utils/generator.util');

const SESSION_FILE_PATH = path.join(__dirname, 'session_user.json');

module.exports = {
    // ==========================================
    // DATA POSITIF (VALID DATA)
    // ==========================================

    // 1. Data User Manual Valid (Dipertahankan untuk Login Manual)
    validManualUser: {
        email: 'aulia1@gmail.com',
        password: '@Aulia1'
    },

    // 2. Fungsi membuat user registrasi baru yang unik tanpa angka
    getDynamicRegisterUser: (prefix = 'melati') => {
        return generatorUtil.generateRegisterUser(prefix);
    },

    // 3. Fungsi untuk menyimpan data hasil generate ke file session_user.json
    saveSessionUser: (userData) => {
        fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(userData, null, 2), 'utf-8');
        return userData;
    },

    // 4. Fungsi untuk mengambil data user yang terakhir kali disimpan
    getSavedSessionUser: () => {
        if (fs.existsSync(SESSION_FILE_PATH)) {
            const data = fs.readFileSync(SESSION_FILE_PATH, 'utf-8');
            return JSON.parse(data);
        }
        return {
            username: 'melatiaulia',
            email: 'aulia1@gmail.com',
            password: '@Aulia1'
        };
    },

    // ==========================================
    // DATA NEGATIF (INVALID DATA)
    // ==========================================

    // A. Negatif Case untuk Login
    negativeLogin: {
        // Password salah dengan email valid
        wrongPassword: {
            email: 'aulia1@gmail.com',
            password: 'SalahPassword123!'
        },
        // Email belum terdaftar di aplikasi
        unregisteredEmail: {
            email: 'emailtidakada_xyz999@gmail.com',
            password: '@PasswordValid123'
        },
        // Format email salah (tanpa @ dan domain)
        invalidEmailFormat: {
            email: 'aulia1_bukan_email',
            password: '@Aulia1'
        },
        // Field kosong
        emptyFields: {
            email: '',
            password: ''
        }
    },

    // B. Negatif Case untuk Registrasi
    negativeRegister: {
        // Format email tidak valid
        invalidEmail: {
            username: 'melatitest',
            email: 'melati_tanpa_domain',
            password: '@Melati1'
        },
        // Password terlalu pendek / tidak memenuhi syarat
        shortPassword: {
            username: 'melatitest',
            email: 'melatishort@gmail.com',
            password: '123'
        },
        // Field kosong
        emptyFields: {
            username: '',
            email: '',
            password: ''
        }
    }
};
