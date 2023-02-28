const {Brand} = require('../models/models');
const {ApiError} = require('../errors/ApiError');
const {isEmptyObj} = require('../helpers/baseHelper');

class BrandService{
  
  async createBrand(name){
    const created = await Brand.create({name})
    if(!created) throw ApiError.internal("BRANDS WAS NOT CREATED")
    return created.toJSON();
  }

  async getAll(){
    const finded = await Brand.findAll()
    return finded
  }

}

module.exports = new BrandService()