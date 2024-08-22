const mongoose = require('mongoose');

const userSchema = new Schema(
    {
        fullName: { type: String, default: '' },
        adhaarNumber: { type: String, required: true },
        password: { type: String, required: true },
        age: { type: String, required: true },
        userRole: { type: String, default: 'Voter', enum: ['Voter', 'Admin', 'Candidate'] },
        createdAt: { type: Date },
        updatedAt: { type: Date },
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', function(next){
    this.updated_at = Date.now();
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;