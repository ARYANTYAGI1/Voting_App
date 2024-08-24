const express = require('express');
const router = express.Router();
const PartyController = require('../controller/PartyController')
const auth = require('../helpers/auth').validateToken
const partyValidation = require('../validations/party')
const validator = require('express-joi-validation').createValidator({});

router.post('/add/party', auth, validator.body(partyValidation.addParty), function(req, res) {
    PartyController.addParty(req, res)
})

router.post('/update/party/:id', auth, validator.body(partyValidation.addParty), function(req, res) {
    PartyController.updateParty(req, res)
})

router.get('/list/partys', auth, function(req, res) {
    PartyController.getParties(req, res)
})


router.delete('/delete/party/:id', auth, function(req, res) {
    PartyController.deleteParty(req, res)
})

module.exports = router;