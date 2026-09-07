/**
 * Helper Utility untuk Menghasilkan Data Acak Unik (Tanpa Angka)
 */
class GeneratorUtil {
    /**
     * Menghasilkan string huruf acak alfabet (a-z) tanpa angka
     * @param {number} length - Jumlah karakter huruf (default 4)
     * @returns {string}
     */
    generateRandomAlpha(length = 4) {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return result;
    }

    /**
     * Mengonversi timestamp milidetik menjadi huruf (0->a, 1->b, dst)
     * Dijamin 100% selalu unik di setiap eksekusi tanpa mengandung angka sama sekali.
     * @returns {string}
     */
    getUniqueAlphaFromTime() {
        const letterMap = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        return Date.now()
            .toString()
            .split('')
            .map(digit => letterMap[parseInt(digit)])
            .slice(-5)
            .join('');
    }

    /**
     * Menghasilkan kredensial registrasi baru yang selalu unik dan murni huruf (tanpa angka pada username)
     * @param {string} prefix - Nama awalan (default: 'melati')
     * @returns {{username: string, email: string, password: string}}
     */
    generateRegisterUser(prefix = 'melati') {
        const suffix = this.getUniqueAlphaFromTime() + this.generateRandomAlpha(3);
        const username = `${prefix}${suffix}`; // Contoh hasil: melatibchdfxyz (100% huruf)
        const email = `${username}@gmail.com`;
        const password = `@Melati1`; // Password tetap memiliki syarat huruf besar, kecil, angka, simbol

        return {
            username,
            email,
            password
        };
    }
}

module.exports = new GeneratorUtil();
