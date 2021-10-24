const UserService = require('../services/userService')
const BasketService = require('../services/basketService');
const TokenService = require('../services/tokenService');

const {ApiError} = require('../errors/ApiError')
const {isEmptyObj, bcryptPassword, decryptPassword} = require('../helpers/helper')

class AuthController{
  async registration(req, res, next){
    try{
      const {email, password, role} = req.body
      if(!email) next(ApiError.badRequest('не задан email'))
      if(!password) next(ApiError.badRequest('не задан password'))
      
      const candidate = await UserService.getOneByEmail(email)
      if(!isEmptyObj(candidate)) next(ApiError.badRequest('ЮЗЕР СУЩЕСТВУЕТ'))
      
      const hashPassword = await bcryptPassword(password)

      const user = await UserService.create(email, hashPassword, role)
      const basket = await BasketService.create(user.id)
      const access_jwt = TokenService.createAccessToken(user.id)
      
      return res.json({access: access_jwt})
    }catch(err){
      next(err)
    }  
  }

  async login(req, res, next){
    try{
      const {email, password} = req.body
    
      const user = await UserService.getOneByEmail(email)
      if(isEmptyObj(user)) next(ApiError.badRequest('ЮЗЕР НЕ СУЩЕСТВУЕТ'))

      decryptPassword(password, user.password)

      const access_jwt = TokenService.createAccessToken(user.id)
      return res.json({access: access_jwt})
    }catch(err){
      next(err)
    }
  }

  async check(req, res, next){
    const token_user = req.token_user
    const access_jwt = TokenService.createAccessToken(token_user)
    return res.json({access: access_jwt})
  }
}

module.exports = new AuthController()