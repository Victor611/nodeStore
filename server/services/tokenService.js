const jwt = require('jsonwebtoken');

class TokenService{
  createAccessToken(id){
    const access_token = jwt.sign({id: id}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: process.env.EXPIRED_ACCESS_TOKEN})
    return access_token
  }

  createRefreshToken(id){
    const refresh_token = jwt.sign({id: id}, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: process.env.EXPIRED_REFRESH_TOKEN})
    return refresh_token
  }

  decodeAccessToken(token){
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
    return decoded
  }

  decodeRefreshToken(){
    return true
  }
}

module.exports = new TokenService()