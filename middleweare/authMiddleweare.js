const { ApiError } = require('../errors/ApiError');
const {decodeAccessToken} = require('../services/tokenService');

module.exports = function (req, res, next){
  if (req.method === "OPTIONS") {next()}
  try {
    const bearer = req.headers.authorization.split(' ')[0]
    const token = req.headers.authorization.split(' ')[1]
    if (!token && bearer !== "Bearer") next(ApiError.badRequest('неверный токен авторизации'))
    const decoded = decodeAccessToken(token)
    if(!decoded){throw ApiError.unauthorized()}
    req.token_userId = decoded
    next()
  }catch (err) {
    next(err);
  }
}