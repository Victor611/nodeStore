const {Type} = require('../models/models');
const {ApiError} = require('../errors/ApiError');
const {isEmptyObj} = require('../helpers/baseHelper');

class TypeService{
  
  async createType(name){
    const created = await Type.create({name});
    if(!created) throw ApiError.internal("TYPES WAS NOT CREATED");
    return created.toJSON(); 
  }

  async getAllTypes(){
    const finded = await Type.findAll()
    return finded
  }

}

module.exports = new TypeService()