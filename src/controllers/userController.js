const UserModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const saltRounds = 10
const secretKey = "@12345"

const CreateUserController = (req, res) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        console.log(hash)
        if(hash){
            const user = new UserModel(req.body)
            user.password = hash
            user.save()
            .then((user) => {
                res.status(201).json({message: 'User registered'})
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({message: 'User not registered, try again'})
            })
        }else{
            res.status(400).json({message: 'User not registered'})
        }
    });
}

const LoginController = (req, res) => {
    console.log(req.body)
    const email = req.body.email
    UserModel.findOne({email: email})
    .then((user) => {
        if(user) {
            console.log(user)
            
            bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    var token = jwt.sign({ email: email }, secretKey);
                    res.status(200).json({message: 'User logged in', token: token})
                } else {
                    res.status(400).json({message: 'Invalid password, try again'})
                }
            })
        }else{
            res.status(400).json({message: 'Invalid email, try again'})
        }
    })
}

module.exports = {CreateUserController, LoginController}