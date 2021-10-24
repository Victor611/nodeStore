const {decodeAccessToken} = require('../services/tokenService');

module.exports = function (req, res, next){
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const bearer = req.headers.authorization.split(' ')[0]
    const token = req.headers.authorization.split(' ')[1]
    if (!token) res.status(400).json({message: "неверный токен авторизации"})
    if (bearer === "Bearer"){
      const decoded = decodeAccessToken(token)
      req.token_userId = decoded
      next()
    } else { res.status(400).json({message: "неверный токен авторизации"})}
  }catch (err) {
    res.status(400).json({message: "Не авторизован"})
  }
}