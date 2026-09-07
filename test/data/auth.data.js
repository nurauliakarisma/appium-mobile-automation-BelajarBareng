const generatorUtil = require('../utils/generator.util');

module.exports = {
    // Fungsi untuk membuat data registrasi dinamis yang selalu berbeda di setiap test (tanpa angka di username)
    getDynamicRegisterUser: (prefix = 'melati') => {
        return generatorUtil.generateRegisterUser(prefix);
    },

    // Data statis untuk skenario Login user yang sudah terdaftar
    validUser: {
        email: 'aulia1@gmail.com',
        password: '@Aulia1'
    }
};
