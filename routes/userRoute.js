const express = require('express');
const userDB = require("../module/userSchema")
const jwt = require('jsonwebtoken')
const router = express.Router();
const stringGenerator = require('../operations/stringGenerator')
const sendEmail = require('../operations/nodeMailer')


router.post('/', async (req, res) => {
    const user = await userDB.findOne({ emailID: req.body.emailID })
    if (user) {
        res.send({ message: "user already exist" })
    }
    else {
        await userDB.create(req.body);
        res.status(200).send({ message: "user created succesfully" })
    }
})

router.post('/forget-password', async (req, res) => {
    try {
        const user = await userDB.findOne({ emailID: req.body.emailID })

        if (user) {
            let randomString = await stringGenerator
            user.token = randomString;
            sendEmail(user.emailID, randomString)
            user.save();
            
            res.status(200).send({message: "Token send to your Email"})
        }
        else {
            res.send({ message: "user not found" })
        }
    } catch (error) {
        res.send({ message: error })
    }
})

router.post('/reset-password', async (req, res) => {
    let { emailID, password, token } = req.body;

    const user = await userDB.findOne({ emailID: emailID })
    if (user) {
        if (user.token == token) {
            user.password = password;
            user.token = ""
            user.save();
            res.status(200).send({ message: "password changed" })
        }
        else {
            res.send({ message: "invalid token" })
        }
    }
    else {
        res.send({ message: "invalid emailID" })
    }
})

router.post('/login', async (req, res)=>{
    let {emailID, password} = req.body;
    let user = await userDB.findOne({emailID: emailID})
    if(user){
        if(user.password==password){
            res.status(200).send({message: "User Loggedin successfully"})
        }
        else{
            res.send({message: "Wrong password"})
        }
    }
    else{
        res.send({message: "UserID does not exist"})
    }
})


module.exports = router