const {ApiError} = require('../errors/ApiError'); 
const bcryptjs = require('bcryptjs');

module.exports.isEmptyObj = (obj) => {
  for(var key in obj)
  {
      return false;
  }
  return true;
}

module.exports.imageMime = (data) => {
  const mime = {
    "image/gif": ".gif",
    "image/jpeg": ".jpeg",
    "image/png": ".png"
  }
  for(var key in mime) {
    if(data == key) return mime[key];
  }
  throw ApiError.badRequest(`${data}: неподдерживаемый тип фала`);
}

module.exports.bcryptPassword = async (password) => {
  const hashPassword = await bcryptjs.hash(password, parseInt(process.env.BCRYPT_SALT))
  return hashPassword;
}

module.exports.decryptPassword = (password, userPassword) => {
  const comparePasword = bcryptjs.compareSync(password, userPassword)
  if(!comparePasword) throw ApiError.badRequest(`неверный пароль`);
  return true
}