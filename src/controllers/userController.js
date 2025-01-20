const UserModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const otpGenerator = require('otp-generator')
const jwt = require('jsonwebtoken');

const saltRounds = 10
const secretKey = "@12345"

const CreateUserController = (req, res) => {
    // console.log(req.body);
    
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) { 
        console.log(hash);
        if (err) {
            return res.status(400).json({ message: 'Error hashing password' })
          }
        if(hash){
            const user = new UserModel(req.body);
            user.password = hash;
            user.save()
                .then((user) => {
                    res.status(201).json({ message: 'User registered' });
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json({ message: 'User not registered, try again' });
                });
        } else {
            res.status(400).json({ message: 'User not registered' });
        }
    });
}

const LoginController = (req, res) => {
    // console.log(req.body)
    const email = req.body.email
    UserModel.findOne({ email: email })
        .then((user) => {
            if (user) {
                console.log(user)
                bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        generateAndSendOTP(user.email, res);
                    } else {
                        res.status(400).json({ message: 'Invalid password, try again' });
                    }
                });
            } else {
                res.status(400).json({ message: 'Invalid email, try again' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        });
}

const generateAndSendOTP = (email, res) => {
    console.log(email)
    const otp = otpGenerator.generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false });
    const token = jwt.sign({ email: email, otp: otp }, secretKey, { expiresIn: '10m' }); // OTP expires in 10 minutes

    // Setup Nodemailer transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nimmiev222@gmail.com',
            pass: 'Nimmi@123',
        },
    });

    // Email options
    let mailOptions = {
        from: 'nimmievelayudhan199@gmail.com',
        to: email,
        subject: 'Your OTP for login',
        text: `Your OTP is: ${otp}. Use this to login within the next 10 minutes.`,
    };

    // Send the OTP email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Failed to send OTP' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'OTP sent to email', token: token });
        }
    });
}

const VerifyOTPController = (req, res) => {
    const token = req.body.token;
    const enteredOtp = req.body.otp;

    jwt.verify(token, secretKey, function (err, decoded) {
        if (err) {
            return res.status(400).json({ message: 'Token expired or invalid' });
        }

        if (decoded.otp === enteredOtp) {
            res.status(200).json({ message: 'OTP verified, login successful' });
        } else {
            res.status(400).json({ message: 'Invalid OTP, try again' });
        }
    });
}

module.exports = {CreateUserController, LoginController, VerifyOTPController}