const express = require('express');
const router = express.Router();
const VoteController = require('../controller/VoteController')
const auth = require('../helpers/auth').validateToken
const voteValidation = require('../validations/vote')
const validator = require('express-joi-validation').createValidator({});

router.post('/add/vote', auth, validator.body(voteValidation.casteVote), function(req, res) {
    VoteController.castVote(req, res)
})

router.get('/count/vote', auth, function(req, res) {
    VoteController.countVotes(req, res)
})

module.exports = router;