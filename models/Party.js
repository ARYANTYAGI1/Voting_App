const mongoose = require('mongoose');
const { Schema } = mongoose;

const partySchema = new Schema(
    {
        name: { type: String, required: true },
        // symbol: { type: String, required: true },
        leader: { type: String, required: true }, // Name of the party leader
        description: { type: String, default: '' },
    },
    {
        timestamps: true
    }
);

const Party = mongoose.model('Party', partySchema);

module.exports = Party;
