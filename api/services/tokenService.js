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
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
    return decoded
  }

  decodeRefreshToken(){
    return true
  }

  async saveToken(user_id, refresh_token){
    const tokenData = await Token.findOne({user_id})
    if(tokenData){
      tokenData.refresh_token = refresh_token;
      const refresh = tokenData.save()
      return refresh
    }
    const token = await Token.create({user_id, refresh_token})
    return token;
  }
}

module.exports = new TokenService()