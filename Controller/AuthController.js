const User = require("../Model/User");
const bcrypt = require('bcrypt');

const AuthController = {
    signup: async(req, res) => {
        try{
            const {
                username,
                email,
                password
            } = req.body

            const checkUser = await User.findOne(
                {
                    $or: [
                        { username: username },
                        { email: email }
                    ]
                }
            )

            if(checkUser){
                return res.josn({ Error: 'User Already exists....'})
            }

            const hashPass = await bcrypt.hash(password, 10);

            const newUser = new User({
                username: username,
                email: email,
                password: hashPass,                
            })

            const resutlUser = await newUser.save()
            return res.json({Status: "Success"})
        }
        catch(err) {
            console.log(err)
        }
    }
};

module.exports = AuthController;