const User = require('../models/User');
const CommonHelper = require('../helpers/common')
const AuthHelper = require('../helpers/auth')

module.exports = {
    register: async function(req, res) {
        try {
            const { fullName, adhaarNumber, password, userRole, age, userType } = req.body;
            const adhaarExsits = await User.findOne({ adhaarNumber: adhaarNumber});
            if(adhaarExsits) return res.status(400).send({ success: false, message: 'AlreadyRegisterd', data: null })
            if(age<18) return res.status(400).send({ success: false, message: 'NotElegibleForVoting', data: null })
            const hashedPassword = await CommonHelper.bcryptPassword(password);
            const user = new User({
              fullName: fullName,
              adhaarNumber: adhaarNumber,
              password: hashedPassword,
              userRole: userRole ? userRole : 'Voter',
              userType: userType ? userType : '1',
              age: age
            })
            const savedUser=await user.save();
            return res.status(200).send({ success: true, message: 'Success', data: user })       
        } catch (error) {
            console.log(error)
            return res.status(500).send({ success: false, message: 'SomethingWentWrong', data: error })       
        }
    },
    login: async function (req, res) {
        try {
            const { adhaarNumber, password} = req.body;
            const user = await User.findOne({adhaarNumber: adhaarNumber});
            if(!user) return res.status(400).send({ success: false, message: 'NoUserRegisterd', data: null})
            if(!CommonHelper.comparePassword(password, user.password)) return res.status(401).send({ success: false, message: 'InvalidEmailOrPassword', data: null });
            token = AuthHelper.generateToken(user);
            res.status(200).send({ success: true, message: 'LoginSuccess', data: { user: user._id, token: token }})
        } catch (error) {
            res.status(500).send({ success: false, message: 'SomethingWentWrong', data: error})
        }
    },
    createDefaultAdmin: async function (req, res) {
        const nuser = {
            adhaarNumber: '0000000000',
            password: '123456',
            fullName: 'Election Commission',
            userType: '2',
            userRole: 'Admin',
            age: 55
        };
        try {
            let usr = await User.findOne({ adhaarNumber: nuser.adhaarNumber });
            if (!usr) {
                let user = new User(nuser);
                user.password = await CommonHelper.bcryptPassword(nuser.password);
                await user.save();
                console.log("Super Admin created successfully");
            } else {
                usr.fullName = nuser.fullName;
                await usr.save();
                console.log("Super Admin updated successfully");
            }
        } catch (err) {
            console.error('Error creating or updating Super Admin:', err);
        }
    },
}