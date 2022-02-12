const User = require("../models/user")
const {validationResult, cookie} = require('express-validator')
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')


exports.signup = (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body)
    console.log(user);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to add user"
            })
        }

        return res.json({
            message: "Success",
            user
        })
    })
}


exports.signin = (req, res) => {
    // const {username, email, password} = req.body
    User.findOne({username:req.body.username}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "username was not found"
            })
        }
        if (err || user.email !== req.body.email) {
            return res.status(400).json({
                error: "email doesn't match"
            })
        }
        // Authenticate user
        if (!user.authenticate(req.body.password)) {
            return res.status(400).json({
                error: "Email and password do not match"
            })
        }

        const { username,password, email} = user
        return res.json({
            user: {
                username,
                password,
                email
            }
        })

    })
}

exports.signout = (req, res) => {
    return res.json({
        message: "User siginout successful"
    })
}

exports.editProfile = async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username})
        console.log(user);
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        await user.save()
        res.status(200).json(user);
    } catch (error) {
        res.send('Error '+ error);
    }


}
