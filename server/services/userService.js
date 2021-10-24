const {User} = require('../models/models');
const {ApiError} = require('../errors/ApiError');
const {isEmptyObj} = require('../helpers/helper');

class UserService{
  async create(email, password, role){
    const created = await User.create({email, password, role})
    if(isEmptyObj(created)) throw ApiError.internal("USER WAS NOT CREATED")
    return created.dataValues 
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