const bcrypt = require('bcrypt');
const saltRounds = 10;

const bcryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
      console.log('Error',error)
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        console.log('Error',error)
    }
};

module.exports = {
    bcryptPassword,
    comparePassword
};
