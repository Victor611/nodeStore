const uuid = require('uuid');
const path = require('path');

const {create, getAll, getOne, createInfo} = require('../services/deviceService');
const {ApiError} = require('../errors/ApiError');
const {isEmptyObj, imageMime} = require('../helpers/helper');

class DeviceController{
  async create(req, res, next){
    try {
      if(req.files === null) throw ApiError.badRequest('FILE NOT FOUND')

      const {name, price, brandId, typeId, info} = req.body
      const {img} = req.files

      let fileName = uuid.v4() + imageMime(img.mimetype)
      img.mv(path.resolve(__dirname, '..', 'public/images', fileName))

      const device = await create(name, price, brandId, typeId, fileName)
      
      if(info){
        info = JSON.parse(info)
        info.forEach( i => createInfo(i.title, i.description, device.id)) 
      }

      return res.json(device)

    }catch (err){
     next(err)
    }

  }

  async getAll(req, res){
    const {brandId, typeId, limit, page} = req.query
    const devices = await getAll(brandId, typeId, limit, page)
    if(isEmptyObj(devices)) return res.status(204).send('ДЕВАЙСЫ НЕ НАЙДЕН');
    res.json(devices)
  }

  async getOne(req, res){
    const{id} = req.params
    const device = await getOne(id)
    if(isEmptyObj(device)) return res.status(204).send('ДЕВАЙС НЕ НАЙДЕН');
    res.json(device)
  }

  async update(req, res){

  }

  async delete(req, res){
    
  }
}

module.exports = new DeviceController()