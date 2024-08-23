const Joi = require('joi');

module.exports = {
    registerValidation: Joi.object({
        fullName: Joi.string().optional().allow(''),
        adhaarNumber: Joi.string().length(10).pattern(/^[0-9]{10}$/).required(),
        password: Joi.string().min(4).max(8).required(),
        age: Joi.number().min(18).required()
    }),
    loginValidation: Joi.object({
        adhaarNumber: Joi.string().length(10).pattern(/^[0-9]{10}$/).required(),
        password: Joi.string().required()
    })
}