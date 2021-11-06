const {Basket, BasketDevice } = require("../models/models");

const {isEmptyObj} = require('../helpers/baseHelper');

class BasketService{
  async create(userId){
    const created = await Basket.create({userId})
    if(isEmptyObj(created)) throw ApiError.internal("BASKET WAS NOT CREATED")
    return created.dataValues 
  }
}

module.exports = new BasketService()