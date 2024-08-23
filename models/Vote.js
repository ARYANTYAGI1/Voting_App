const mongoose = require('mongoose');
const { Schema } = mongoose;

const voteSchema = new Schema(
    {
        voter: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // The user who voted
        candidate: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // The candidate who received the vote
        party: { type: Schema.Types.ObjectId, ref: 'Party', required: true } // The party to which the candidate belongs
    },
    {
        timestamps: true
    }
);

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
