const Party = require('../models/Party');

module.exports = {
    addParty: async function (req, res) {
        try {
            const userType = req.user.userType;
            if(userType != 2) return res.status(401).send({ success: false, message: 'InvalidRequest', data: null })
            const { name, leader, description } = req.body;
            const checkParty = await Party.findOne({ name : name })
            if(checkParty) return res.status(400).send({ success: false, message: 'PartyAlreadyRegistered', data: null })
            const party = new Party({
                name: name,
                leader: leader,
                description: description,
            })
            const savedParty = await party.save()
            return res.status(200).send({ success: true, message: 'PartyAddedSuccessfully', data: party })
        } catch (error) {
          return res.status(500).send({ sucess: true, message: 'SomethingWentWrong', data: error}) 
        }
    },
    updateParty: async function (req, res) {
        try {
        const userType = req.user.userType;
        if(userType != 2) return res.status(401).send({ success: false, message: 'InvalidRequest', data: null })
          const party = await Party.findOne({ _id: req.params.id});
          if(!party) return res.status(404).send({ sucess: false, message: 'DataNotFound', data: null });
          party.name = req.body.name || '',
          party.leader = req.body.leader || '',
          party.description = req.body.description || ''
          await party.save();
          return res.status(200).send({ sucess: true, message: 'PartyUpdatedSuccessfully', data: party})
        } catch (error) {
          console.log(error)
          return res.status(500).send({ sucess: true, message: 'SomethingWentWrong', data: error})
        }
    },
    getParties: async function(req, res) {
        try {
          const party = await Party.find({});
          if(!party) return res.status(404).send({ success: false, message: 'DataNotFound', data: null })
          return res.status(200).send({ success: true, message: 'Success', data: party })
        } catch (error) {
          return res.status(500).send({ success: false, message: 'SomethingWentWrong', data: err });
        }
      },
    deleteParty: async function(req, res) {
        try {
            const userType = req.user.userType;
            if(userType != 2) return res.status(401).send({ success: false, message: 'InvalidRequest', data: null })
            const party  = await Party.findById(req.params.id);
            if (!party) {
                return res.status(404).send({ success: false, message: 'DataNotFound', data: null });
            }
            await party.deleteOne({ _id: req.params.id });
            return res.status(200).send({ success: true, message: 'PartyDeletedSuccessfully', data: null });
        } catch (error) {
            console.error('Error deleting party:', error);
            return res.status(500).send({ success: false, message: 'SomethingWentWrong', data: error });
        }
    }
}