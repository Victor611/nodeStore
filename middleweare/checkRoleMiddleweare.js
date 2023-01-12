const { ApiError } = require('../errors/ApiError');
const {getOneUserById} = require('../services/userService');
module.exports = function (role){
  return async function(req, res, next) {
    try {
      const {id} = req.token_userId
      const user = await getOneUserById(id)
      if (user.role == role) return next()
      next(ApiError.internal("Доступ запрещен"))
    } catch (err) {
        next(err)
    }
  }
}