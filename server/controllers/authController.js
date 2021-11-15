const {createUserByEmail} = require('../services/userService')

const {ApiError} = require('../errors/ApiError')
const {isEmptyObj, bcryptPassword, decryptPassword} = require('../helpers/baseHelper')
const { validateCreateUserByEmail } = require('../helpers/validationSchemaHelper');

class AuthController{
  async registration(req, res, next){
    try{
      req.body.role = req.params.role
      const provider = req.params.provider
      let userData
      switch (provider) {
        case "email":
          const validateByEmail = await validateCreateUserByEmail.validateAsync(req.body);
          userData = await createUserByEmail(validateByEmail)
          break;
        case "phone":
          const validateByPhone = await createUserByPhone.validateAsync(req.body);
          userData = await createUserByPhone(validateByPhone)
          break;
        case "google":
        
          break;
        case "facebook":
        
          break;
        default:
          console.log("Что-то пошло не так, это не должно было выполниться ( ! )")
          break;
      }
      const refresh_jwt = userData.refresh_jwt
      delete userData.refresh_jwt
      return res.cookie('refreshToken', refresh_jwt, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly:true}).json(userData)

    }catch(err){
      next(err)
    }  
  }

  async login(req, res, next){
    try{
      // const {email, password} = req.body
    
      // const user = await UserService.getOneUserByEmail(email)
      // if(isEmptyObj(user)) next(ApiError.badRequest('ЮЗЕР НЕ СУЩЕСТВУЕТ'))

      // decryptPassword(password, user.password)

      // const access_jwt = TokenService.createAccessToken(user.id)
      // return res.json({access: access_jwt})
    }catch(err){
      next(err)
    }
  }

  logout(req, res, next){
    return res.json({message: "bye"})
  }

  async check(req, res, next){
    const token_user = req.token_user
    const access_jwt = TokenService.createAccessToken(token_user)
    return res.json({access: access_jwt})
  }
}

module.exports = new AuthController()