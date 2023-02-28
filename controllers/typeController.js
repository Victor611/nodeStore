const {ApiError} = require('../errors/ApiError');
const {create, getAll} = require('../services/typeService');
const {validateCreateByType} = require('../helpers/validationTypeSchemaHelper')
const {isEmptyObj} = require('../helpers/baseHelper');

class TypeController{
  async create(req, res, next){
    try{
      const validateByType = await validateCreateByType.validateAsync(req.body);  
      const type = await createType(validateByType)
      return res.json(`Тип ${validateByType.name} создан`)
    }catch (err){
     next(err)
    }
  }

  async getTypes(req, res, next){
    try{
      const types = await getAllTypes()
      if(!types) return res.status(204).send(); 
      return res.json(types)
    }catch (err){
      next(err)
    }
  }
}

module.exports = new TypeController()