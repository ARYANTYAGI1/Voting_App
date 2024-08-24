const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        fullName: { type: String, default: '' },
        adhaarNumber: { type: String, required: true },
        password: { type: String, required: true },
        age: { type: String, required: true },
        userRole: { type: String, default: 'Voter', enum: ['Voter', 'Admin', 'Candidate'] },
        userType: { type: Number, default: 1, enum: [1, 2, 3] }, // 1 -> Voter, 2 -> Admin, 3 -> Candidate
        // party: { type: Schema.Types.ObjectId, ref: 'Party' }, // Link to the Party if the user is a Candidate
        createdAt: { type: Date },
        updatedAt: { type: Date },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
