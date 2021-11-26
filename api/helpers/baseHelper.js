const {ApiError} = require('../errors/ApiError'); 



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

module.exports.getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
};