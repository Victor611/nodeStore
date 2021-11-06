const {User, Email, Phone} = require('../models/models');

const {ApiError} = require('../errors/ApiError');

const {sendActivationMail} = require('./mailService');
const {generateAccessToken, generateRefreshToken, saveToken} = require('../services/tokenService');

const {isEmptyObj, getRandomInt} = require('../helpers/baseHelper');
const {encryptPassword} = require('../helpers/passwordHelper');
const {UserEmailDTO} = require('../helpers/userDTOHelper');

class UserService{
  async createByEmail(data){
   
    const {email, password, role, first_name} = data
    const hashPassword = await encryptPassword(password) 
    const activationLink = getRandomInt(1e5, 1e6)
    const existed = await Email.findOne( {where: {email}} )
    if(existed) throw ApiError.forbiden(`Пользователь с почтовым адресом ${email} уже существует`)
  
    const user = await User.create({role, first_name})
    const emailByUser = await user.createEmail({email, hashPassword, activationLink: hashPassword})
    const basket = await user.createBasket()
    if(isEmptyObj(user) && isEmptyObj(emailByUser) && isEmptyObj(basket)) throw ApiError.internal(`Юзер с почтовым адресом ${email} не был создан`)
    
    await sendActivationMail(email, hashPassword);
    const userDTO = UserEmailDTO(emailByUser);
    const access_jwt = generateAccessToken({...userDTO});
    const refresh_jwt = generateRefreshToken({...userDTO});
    const token = await saveToken(user.id, refresh_jwt)
    
    return {user:{...user}, email: {...emailByUser}, basket:{...basket}, token:{...token}, access_jwt, refresh_jwt}
  }

  async createByPhone(data){
   
    const {phone, password, role, first_name} = data
    const hashPassword = await encryptPassword(password) 
    const activationLink = getRandomInt(1e5, 1e6)

    const existed = await Phone.findOne( {where: {phone}} )
    if(existed) throw ApiError.forbiden(`Пользователь с почтовым адресом ${phone} уже существует`)
  
    const user = await User.create({role, first_name})
    const phoneByUser = await user.createPhone({phone, hashPassword, activationLink})
    const basket = await user.createBasket()
    if(isEmptyObj(user) && isEmptyObj(emailByUser) && isEmptyObj(basket)) throw ApiError.internal(`Юзер с почтовым адресом ${phone} не был создан`)
    
    await sendActivationSMS(phone, activationLink);
    const userDTO = UserPhoneDTO(phoneByUser);
    const access_jwt = generateAccessToken({...userDTO});
    const refresh_jwt = generateRefreshToken({...userDTO});
    const token = await saveToken(user.id, refresh_jwt)
    
    return {user:{...user}, email: {...phoneByUser}, basket:{...basket}, token:{...token}, access_jwt, refresh_jwt}
  }
  
 

  async getAll(req, res){
    
  }

  async getOneById(id){
    const user = await User.findOne( {where: {id}} )
    return user===null ?  {} : user.dataValues
  }

  async getOneByEmail(email){
    const user = await User.findOne( {where: {email}} )
    return user===null ?  {} : user.dataValues 
  }

  async update(req, res){

  }

  async delete(req, res){

  }
}

module.exports = new UserService()