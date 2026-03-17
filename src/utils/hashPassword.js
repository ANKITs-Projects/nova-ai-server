const bcrypt = require("bcrypt");

const generateHashPass = async (password) => {
    const saltRound = +process.env.BCRYPT_SALT_ROUNDS
    const hashpasword = await bcrypt.hash(
      password,
      saltRound,
    );
    return hashpasword
}

const comparePassword = async (planePassword, hashPassword ) => {
    return await bcrypt.compare(planePassword, hashPassword) 
}

module.exports = {generateHashPass, comparePassword}