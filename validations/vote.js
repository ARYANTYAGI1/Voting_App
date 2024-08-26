const Joi = require('joi')

module.exports = {
    casteVote: Joi.object({
        voter: Joi.string().required(),
        party : Joi.string().required()
    })
}