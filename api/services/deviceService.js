const {Device, DeviceInfo} = require('../models/models');
const {ApiError} = require('../errors/ApiError');
const {isEmptyObj} = require('../helpers/baseHelper');


class DeviceService{
  
  /*
    img = name file image
  */

  async createDevice(name, price, brandId, typeId, img){
    const created = await Device.create({name, price, brandId, typeId, img})
    if(isEmptyObj(created)) throw ApiError.internal("DEVICE WAS NOT CREATED")
    return created.dataValues 
  }

  async getDevices(brandId, typeId, limit, page){
    page = page || 1
    limit = limit || 10
    let offset = page * limit - limit

    let query

    if(brandId) {
      query = typeId ? { where: { brandId, typeId }, limit, offset} : { where: { brandId }, limit, offset};
    } else {
      query = typeId ? { where: { typeId }, limit, offset } : {limit, offset};
    }
    const finded = await Device.findAndCountAll(query)
    return finded
  }

  async getDevice(id){
    const device = await Device.findOne({
      where: {id}, 
      include: [{model: DeviceInfo, as: 'info'}]
    })
    return device
  }

  async createInfo(title, description, deviceId){
    const createdInfo = await DeviceInfo.create({ title, description, deviceId })
    if(isEmptyObj(createdInfo)) throw ApiError.internal("DEVICE INFO WOS NOT CREATED")
    return createdInfo.dataValues 
  }
}

  

module.exports = new DeviceService()