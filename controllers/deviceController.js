const path = require('path');

const {validateCreateByDevice} = require('../helpers/validationDeviceSchemaHelper')

const {createDevice, getDevices, getDevice, createInfo} = require('../services/deviceService');
const {ApiError} = require('../errors/ApiError');
const {isEmptyObj, imageMime, getRandomString} = require('../helpers/baseHelper');

class DeviceController{
  async createDevice(req, res, next){
    try {
      if(req.files === null) throw ApiError.badRequest('FILE NOT FOUND')

      const validateDevice = await validateCreateByDevice.validateAsync(req.body);
      const {name, price, brandId, typeId, info} = validateDevice
      const {img} = req.files

      let fileName = getRandomString(20) + imageMime(img.mimetype)
      img.mv(path.resolve(__dirname, '..', 'public/images/devices', fileName))

      const device = await createDevice(name, price, brandId, typeId, fileName)
      
      if(info){
        info = JSON.parse(info)
        info.forEach( i => createInfo(i.title, i.description, i.deviceId)) 
      }

      return res.json(device)

    }catch (err){
     next(err)
    }

  }

  async getDevices(req, res){
    const {brandId, typeId, limit, page} = req.query
    const devices = await getDevices(brandId, typeId, limit, page)
    if(isEmptyObj(devices)) return res.status(204).send('ДЕВАЙСЫ НЕ НАЙДЕН');
    res.json(devices)
  }

  async getDevice(req, res){
    const{id} = req.params
    const device = await getDevice(id)
    if(isEmptyObj(device)) return res.status(204).send('ДЕВАЙС НЕ НАЙДЕН');
    res.json(device)
  }

  async update(req, res){

  }

  async delete(req, res){
    
  }
}

module.exports = new DeviceController()