const User = require("../Model/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
                return res.json({ Error: 'User Already exists....'})
            }
            else{
                const hashPass = await bcrypt.hash(password, 10)

                const newUser = new User({
                    username: username,
                    email: email,
                    password: hashPass,                
                })
    
                const resutlUser = await newUser.save()
                return res.json({Status: "Success"})
            }
        }
        catch(err) {
            console.log(err)
        }
    },

    signin: async(req, res) => {
        try{
            const {
                email,
                password
            } = req.body

            const checkUser = await User.findOne({ email: email })

            if(checkUser){
                const checkPass = await bcrypt.compare(password, checkUser.password); 

                if(checkPass){
                    if(checkUser.is_active === false){
                        return res.json({ Error: 'Your account not Active State'})
                    }
                    else{
                        const token = jwt.sign({ id: checkUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                        return res.json({ Status: "Success", Result: checkUser, Token: token });
                    }
                }
                else{
                    return res.json({ Error: "Password Not Match..."})
                }
            }
            else{
                return res.json({Error: "User Not Found..."})
            }
        }
        catch(err){
            console.log(err)
        }
    }
};

module.exports = AuthController;