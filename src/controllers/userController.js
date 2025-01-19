const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
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
        // console.log(user)
        if(user) {
            res.status(201).json({message: 'User logged in'})
        }else{
            res.status(400).json({message: 'Invalid emaili id, try again'})
        }
    })
    var token = jwt.sign({ email: email }, secretKey);
}

module.exports = {CreateUserController, LoginController}