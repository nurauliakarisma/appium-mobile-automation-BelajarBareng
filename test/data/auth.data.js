const fs = require('fs');
const path = require('path');
const generatorUtil = require('../utils/generator.util');

const SESSION_FILE_PATH = path.join(__dirname, 'session_user.json');

module.exports = {
    validManualUser: {
        email: 'aulia1@gmail.com',
        password: '@Aulia1'
    },

    getDynamicRegisterUser: (prefix = 'melati') => {
        return generatorUtil.generateRegisterUser(prefix);
    },

    saveSessionUser: (userData) => {
        fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(userData, null, 2), 'utf-8');
        return userData;
    },

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

    negativeLogin: {
        wrongPassword: {
            email: 'aulia1@gmail.com',
            password: 'SalahPassword123!'
        },
        unregisteredEmail: {
            email: 'emailtidakada_xyz999@gmail.com',
            password: '@PasswordValid123'
        },
        emptyFields: {
            email: '',
            password: ''
        }
    },

    negativeRegister: {
        invalidEmail: {
            username: 'melatitest',
            email: 'melati_tanpa_domain',
            password: '@Melati1'
        },
        emptyFields: {
            username: '',
            email: '',
            password: ''
        }
    }
};
