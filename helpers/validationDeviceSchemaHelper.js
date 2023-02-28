const joi = require('joi')

module.exports.validateCreateByDevice = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    brandId: joi.number().required(),
    typeId: joi.number().required()
}).keys({
    info: joi.array().items(
        joi.object({
            title: joi.string().required(),
            description: joi.string().required(),
            deviceId: joi.number().required()
        })
    ).required()
    })
