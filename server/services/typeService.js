const {Type} = require('../models/models');
const {ApiError} = require('../errors/ApiError');
const {isEmptyObj} = require('../helpers/helper');

class TypeService{
  
  async create(name){
    const created = await Type.create({name})
    if(isEmptyObj(created)) throw ApiError.internal("TYPES WOS NOT CREATED")
    return created.dataValues 
  }

  async getAll(){
    const finded = await Type.findAll()
    return finded
  }

}

module.exports = new TypeService()