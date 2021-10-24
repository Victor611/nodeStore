const {ApiError} = require('../errors/ApiError');
const {create, getAll} = require('../services/typeService');
const {isEmptyObj} = require('../helpers/helper');

class TypeController{
  async create(req, res, next){
    try{
      const {name} = req.body
      if(!name) throw ApiError.badRequest('не задано ИМЯ')
      const type = await create(name)
      return res.json(`Тип ${type.name} создан`)
    }catch (err){
     next(err)
    }
  }

  async getAll(req, res, next){
    try{
      const types = await getAll()
      if(isEmptyObj(types)) return res.status(204).send(); 
      return res.json(types)
    }catch (err){
      next(err)
    }
  }

}

module.exports = new TypeController()