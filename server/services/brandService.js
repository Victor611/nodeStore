const {Brand} = require('../models/models');
const {ApiError} = require('../errors/ApiError');
const {isEmptyObj} = require('../helpers/baseHelper');

class BrandService{
  
  async create(name){
    const created = await Brand.create({name})
    if(isEmptyObj(created)) throw ApiError.internal("BRANDS WOS NOT CREATED")
    return created.dataValues 
  }

  async getAll(){
    const finded = await Brand.findAll()
    return finded
  }

}

module.exports = new BrandService()