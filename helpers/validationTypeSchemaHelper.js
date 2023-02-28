const joi = require('joi')

module.exports.validateCreateByType = joi.object({
    name: joi.string().required()
})

