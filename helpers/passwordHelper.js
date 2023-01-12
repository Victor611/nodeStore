const bcryptjs = require('bcryptjs');
const {ApiError} = require('../errors/ApiError'); 

module.exports.encryptPassword = async (password) => {
    const hashPassword = await bcryptjs.hash(password, parseInt(process.env.BCRYPT_SALT))
    return hashPassword;
  }
  
module.exports.decryptPassword = (password, userPassword) => {
    const comparePasword = bcryptjs.compareSync(password, userPassword)
    if(!comparePasword) throw ApiError.badRequest(`неверный пароль`);
    return true
  }