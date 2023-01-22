const { User, Email, Phone } = require('../models/models');

const { ApiError } = require('../errors/ApiError');

const { sendActivationMail } = require('./mailService');
const { generateAccessToken, generateRefreshToken, saveToken } = require('../services/tokenService');

const { isEmptyObj, getRandomInt } = require('../helpers/baseHelper');
const { encryptPassword } = require('../helpers/passwordHelper');
const { UserEmailDTO} = require('../helpers/userEmailDTOHelper');
const { UserDTO } = require('../helpers/userDTOHelper');

class AuthService {
//todo: need return DTO ???
  async createUserByEmail(data) {

    const { email, password, role, first_name } = data
    const hashPassword = await encryptPassword(password)
    const activationLink = getRandomInt(1e5, 1e6)
    const existed = await Email.findOne({ where: { email } })
    if (existed) throw ApiError.forbiden(`Пользователь с почтовым адресом ${email} уже существует`)

    const user = await User.create({ role, first_name })

    const emailByUser = await user.createEmail({ email, hashPassword, activationLink })
    const basketByUser = await user.createBasket()

    const sendMail = sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/email/${activationLink}`)
    .then(response=>{ return response; })
    .catch(error=>{ throw ApiError.forbiden(`email не был отправлен`) })
    if (isEmptyObj(user) && isEmptyObj(emailByUser) && isEmptyObj(basketByUser)) {
      throw ApiError.internal(`Юзер с почтовым адресом ${email} не был создан`)
    }
    const userDTO = UserDTO(user);
    const userEmailDTO = UserEmailDTO(emailByUser);
    const access_jwt = generateAccessToken({ ...userEmailDTO });
    const refresh_jwt = generateRefreshToken({ ...userEmailDTO });
    const token = await saveToken(user.id, refresh_jwt)

   return { user: { ...userDTO }, email: { ...userEmailDTO }, access_jwt, refresh_jwt }
  }

  async createUserByPhone(data) {

    const { phone, password, role, first_name } = data
    const hashPassword = await encryptPassword(password)
    const activationLink = getRandomInt(1e5, 1e6)

    const existed = await Phone.findOne({ where: { phone } })
    if (existed) throw ApiError.forbiden(`Пользователь с номером телефона ${phone} уже существует`)

    const user = await User.create({ role, first_name })
    const phoneByUser = await user.createPhone({ phone, hashPassword, activationLink })
    const basket = await user.createBasket()
    if (isEmptyObj(user) && isEmptyObj(emailByUser) && isEmptyObj(basket)) throw ApiError.internal(`Юзер с почтовым адресом ${phone} не был создан`)
//????? нет активации по тел
    await sendActivationMail(phone, activationLink);
    const userDTO = UserPhoneDTO(phoneByUser);
    const access_jwt = generateAccessToken({ ...userDTO });
    const refresh_jwt = generateRefreshToken({ ...userDTO });
    const token = await saveToken(user.id, refresh_jwt)

    return { user: { ...user }, phone: { ...phoneByUser }, basket: { ...basket }, token: { ...token }, access_jwt, refresh_jwt }
  }
//todo: create
  async createUserByGoogle(data) {

  }
//todo:create
  async createUserByFacebook(data) {

  }

//todo:TTL activate link
  async activateUserByEmail(activationLink) {
    const userEmail = await Email.findOne({ where: { activationLink }, include: User })
    if(!userEmail) {throw ApiError.forbiden(`Некоректная ссылка активации`)};
    if(userEmail.activate && userEmail.user.activate){throw ApiError.forbiden(`Email ${userEmail.email} уже активирован`)}
    userEmail.activate = true;
    const resultUser = await userEmail.user.update({activate: true})
    const user = UserDTO(resultUser.toJSON());
    const resultEmailByUser = await userEmail.save()
    const emailByUser = UserEmailDTO(resultEmailByUser.toJSON()); 

    return { user, email: emailByUser  };
  }

  async activateUserByPhone(link) {
    const query = await Phone.findOne({ where: { activationLink }, include: User })
    if(!query) {throw ApiError.forbiden(`Некоректная ссылка активации`)};
    const userPhone = query.toJSON();
    if(userPhone.activate && userPhone.user.activate){throw ApiError.forbiden(`Email ${userPhone.phone} уже активирован`)}
    userPhone.activate = true;
    const resultUser = await userPhone.user.update({activate: true})
    const user = UserDTO(resultUser.toJSON());
    const resultPhoneByUser = await userEmail.save()
    const phoneByUser = UserEmailDTO(resultPhoneByUser.toJSON()); 

    return { user, phone: phoneByUser  };
  }

  async resendActivateUserByEmail(data) {
    const {email} = data;
    const userEmail = await Email.findOne({ where: { email }, include: User })
    if(!userEmail) {throw ApiError.forbiden(`Пользователя с email ${email} не существует`)};
    if(userEmail.activate && userEmail.user.activate){throw ApiError.forbiden(`Email ${userEmail.email} уже активирован`)}
    return await sendActivationMail(userEmail.email, `${process.env.API_URL}/api/auth/activate/email/${userEmail.activationLink}`)
    .then(response=>{ return response; })
    .catch(error=>{ throw ApiError.forbiden(`email не был отправлен`) })
  }
//todo create
  async resendActivateUserByPhone(data){

  }

//todo create
    async loginUserByEmail(data) {
        const {email, password} = data;
        const emailByUser = await Email.findOne({ where: { email }, include: User })
        if (!emailByUser) { throw ApiError.forbiden(`Пользователь с почтовым адресом ${email} не существует`) }
        const isPasEquals = await bcript.compare(password, emailByUser.hashPassword)
        if (!isPasEquals) { throw ApiError.forbiden(`Некоректный пароль`) }
        const userDTO = UserDTO(emailByUser.user);
        const userEmailDTO = UserEmailDTO(emailByUser);
        const access_jwt = generateAccessToken({ ...userEmailDTO });
        const refresh_jwt = generateRefreshToken({ ...userEmailDTO });
        const token = await saveToken(userEmailDTO.id, refresh_jwt)

        return { user: { ...userDTO }, email: { ...userEmailDTO }, access_jwt, refresh_jwt }
    } 

//todo create
    async loginUserByPhone(data) {

    }

//todo create
    async loginUserByGoogle(data) {

    }

//todo create
    async loginUserByFacebook(data) {

    }


}
module.exports = new AuthService()