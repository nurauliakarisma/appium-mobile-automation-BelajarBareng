class GeneratorUtil {
    generateRandomAlpha(length = 4) {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        return result;
    }

    getUniqueAlphaFromTime() {
        const letterMap = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        return Date.now()
            .toString()
            .split('')
            .map(digit => letterMap[parseInt(digit)])
            .slice(-5)
            .join('');
    }

    generateRegisterUser(prefix = 'melati') {
        const suffix = this.getUniqueAlphaFromTime() + this.generateRandomAlpha(3);
        const username = `${prefix}${suffix}`;
        const email = `${username}@gmail.com`;
        const password = `@Melati1`;

        return {
            username,
            email,
            password
        };
    }
}

module.exports = new GeneratorUtil();
