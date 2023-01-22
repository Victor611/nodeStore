const joi = require('joi')

module.exports.validateCreateUserByEmail = joi.object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(6).required(),
    role: joi.string().required(),
    first_name: joi.string().required()
})

module.exports.validateCreateUserByPhone = joi.object({
    phone: joi.string().pattern(new RegExp("^\\+[0-9]*$")).required(),
    password: joi.string().min(6).required(),
    role: joi.string().required(),
    first_name: joi.string().required()
})

module.exports.validateEmail = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

module.exports.validatePhone = joi.object({
    phone: joi.string().pattern(new RegExp("^\\+[0-9]*$")).required()
})