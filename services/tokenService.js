const {Token} = require('../models/models');
const jwt = require('jsonwebtoken');

class TokenService{
  generateAccessToken(payload){
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: process.env.EXPIRED_ACCESS_TOKEN})
    return access_token
  }

  generateRefreshToken(payload){
    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: process.env.EXPIRED_REFRESH_TOKEN})
    return refresh_token
  }

  decodeAccessToken(token){
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
      return decoded
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  decodeRefreshToken(token){
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY)
      return decoded
    } catch (error) {
      return null;
    }
  }

  async saveToken(user_id, refresh_token){
    const tokenData = await Token.findOne({user_id})
    if(tokenData){
      tokenData.refresh_token = refresh_token;
      tokenData.userId = user_id;
      const refresh = tokenData.save()
      return refresh
    }
    const token = await Token.create({user_id, refresh_token})
    return token;
  }

  async removeToken(refresh_token){
    const tokenData = await Token.destroy({ where: {refresh_token}});
    return tokenData;
  }

  async findToken(refresh_token, Model = null){
    const condition = Model ? { where: {refresh_token}, include: Model} : { where: {refresh_token}};
    const tokenData = await Token.findOne(condition)
    .then(token =>{
      return token;
    })
    .catch(err => {
      console.log(err);
      return null;
    });
    return tokenData;
  }

}

module.exports = new TokenService()