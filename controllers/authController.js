const { createUserByEmail, createUserByPhone } = require('../services/authService')
const { activateUserByEmail, activateUserByPhone } = require('../services/authService')
const { resendActivateUserByEmail, resendActivateUserByPhone } = require('../services/authService')
const { validateCreateUserByEmail, validateCreateUserByPhone } = require('../helpers/validationSchemaHelper');
const { validateEmail, validatePhone } = require('../helpers/validationSchemaHelper');
const { ApiError } = require('../errors/ApiError');

class AuthController {
  async registration(req, res, next) {
    try {
      req.body.role = req.params.role
      const provider = req.params.provider
      let userData
      switch (provider) {
        case "email":
          const validateByEmail = await validateCreateUserByEmail.validateAsync(req.body);
          userData = await createUserByEmail(validateByEmail);
          break;
        case "phone":
          const validateByPhone = await validateCreateUserByPhone.validateAsync(req.body);
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
      return res.cookie('refreshToken', refresh_jwt, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }).json(userData)

    } catch (err) {
      next(err)
    }
  }
//todo: validate request
  async activate(req, res, next) {
    try {
      const {provider, link} = req.params
      let userData
      switch (provider) {
        case "email":
          userData = await activateUserByEmail(link);
        break;
        case "phone":
          userData = await activateUserByPhone(link);
        default:
          console.log("Что-то пошло не так, это не должно было выполниться ( ! )")
        break;
      }
      console.log(userData)
      //return res.redirect(process.env.CLIENT_URL).json(userData);
    } catch (err) {
      next(err)
    }
  }

  async resendActivate(req, res, next){
    try {
      const provider = req.params.provider
      let userData
      switch (provider) {
        case "email":
          const validateByEmail = await validateEmail.validateAsync(req.body);
          userData = await resendActivateUserByEmail(validateByEmail);
        break;
        case "phone":
          const validateByPhone = await validatePhone.validateAsync(req.body);
          userData = await resendActivateUserByPhone(validateByPhone);
        default:
          console.log("Что-то пошло не так, это не должно было выполниться ( ! )")
        break;
      }
      return res.json(userData);
    } catch (err) {
      next(err)
    }
  }

  async login(req, res, next) {
    try { console.log(req)
      const provider = req.params.provider
      let userData
      switch (provider) {
        case "email": 
         // const validateByEmail = await validateloginUserByEmail.validateAsync(req.body);
          userData = await loginUserByEmail(req.body)
          break;
        case "phone":
          const validateByPhone = await validateLoginUserByPhone(req.body);
          userData = await loginUserByPhone(validateByPhone)
          break;
        case "google":
          userData = await loginUserByGoogle(req.body)
          break;
        case "facebook":
          userData = await loginUserByFacebook(req.body)
          break;
        default:
          
          break;
      }
      const refresh_jwt = userData.refresh_jwt
      delete userData.refresh_jwt
      return res.cookie('refreshToken', refresh_jwt, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }).json(userData)
    } catch (err) {
      next(err)
    }
  }

  logout(req, res, next) {
    return res.json({ message: "bye" })
  }

  async check(req, res, next) {
    const token_user = req.token_user
    const access_jwt = TokenService.createAccessToken(token_user)
    return res.json({ access: access_jwt })
  }
}

module.exports = new AuthController()