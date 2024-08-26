const mongoose = require('mongoose');
const Vote = require('../models/Vote');
const Party = require('../models/Party')
const User = require('../models/User')
module.exports = {
    castVote: async function (req, res) {
        try {
            const userType = req.user.userType;
            if (userType !== 1) {
                return res.status(401).send({ success: false, message: 'CannotCastVote', data: null });
            }
            const { voter, party } = req.body;
            const validVoter = await User.findOne({_id: voter});
            if (!validVoter || validVoter.userType !== 1) {
                return res.status(400).send({ success: false, message: 'InvalidVoter', data: null });
            }
            const validParty = await Party.findById(party);
            if (!validParty) {
                return res.status(400).send({ success: false, message: 'InvalidParty', data: null });
            }
            const checkVoted = await Vote.findOne({ voter: voter });
            if (checkVoted) {
                return res.status(401).send({ success: false, message: 'AlreadyVoted', data: null });
            }
            const vote = new Vote({
                voter: voter,
                party: party
            });
            await vote.save();
            return res.status(200).send({ success: true, message: 'VoteCastedSuccessfully', data: vote });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ success: false, message: 'SomethingWentWrong', data: error });
        }
    },

    countVotes: async function(req, res) {
        try {
            const voteCounts = await Vote.aggregate([
                {
                    $group: {
                        _id: "$party",
                        count: { $sum: 1 } 
                    }
                },
                {
                    $lookup: {
                        from: 'parties',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'partyInfo'
                    }
                },
                {
                    $unwind: "$partyInfo" 
                },
                {
                    $project: {
                        _id: 0,
                        partyName: "$partyInfo.name",
                        count: 1
                    }
                }
            ]);
            const result = {};
            voteCounts.forEach(vote => {
                result[vote.partyName] = vote.count;
            });
    
            return res.status(200).send({ success: true, message: 'VoteCounts', data: result });
        } catch (error) {
            return res.status(500).send({ success: false, message: 'SomethingWentWrong', data: error });
        }
    }

}