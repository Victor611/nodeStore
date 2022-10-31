const {ApiError} = require('../errors/ApiError');
const {create, getAll} = require('../services/brandService');
const {isEmptyObj} = require('../helpers/baseHelper');

class BrandController{
  async create(req, res, next){
    try{
      const {name} = req.body
      if(!name) throw ApiError.badRequest('не задано ИМЯ')
      const brand = await create(name)
      if(isEmptyObj (brand)) return res.status(204).send();
      return res.json(`Бренд ${brand.name} создан`)
    }catch (err){
     next(err)
    }
  }

  async getAll(req, res, next){
    try{
      const brands = await getAll()
      if(isEmptyObj(brands)) return res.status(204).send(); 
      return res.json(brands)
    }catch (err){
      next(err)
    }
  }

}

module.exports = new BrandController()