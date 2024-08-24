const Joi = require('joi')

module.exports = {
    addParty: Joi.object({
        name : Joi.string().required(),
        description : Joi.string().optional().allow(''),
        leader : Joi.string().required()
    })
}