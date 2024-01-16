const UserDB = require('../module/userSchema')
const randomString = require('randomstring')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const nodemailer = require("nodemailer");

dotenv.config()

const userControler = {
    register: async (req, res) => {
        try {
            let newUser = req.body;
            const user = await UserDB.findOne({ email: newUser.email })
            if (user) { res.send({ message: "User already exist" }) }
            else {
                newUser.password = await bcrypt.hash(newUser.password, 10)
                const resetToken = await randomString.generate({
                    length: 20,
                    charset: 'alphanumeric'
                })
                newUser = { ...newUser, resetToken };
                await UserDB.create(newUser);

                //Mail
                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD,
                    }
                });

                let message = {
                    from: process.env.EMAIL,
                    to: newUser.email,
                    subject: "Store register verification",
                    text: `Activation link : http://localhost:5173/verify/${resetToken}`,
                };

                transporter.sendMail(message).then(() => {
                    console.log("received email");
                }).catch(error => { console.log("Message:" + error) })

                res.status(200).send({ message: "Activation link send to mail. Please check Inbox or Spam" })
            }
        } catch (error) {
            res.send({ message: error })
        }
    },
    verify: async (req, res) => {
        try {
            const { resetToken } = req.params
            let user = await UserDB.findOne({ resetToken: resetToken })
            if (user) {
                user.activated = true;
                user.resetToken = ''
                user.save()
                res.status(200).send({ message: "Account activated successfully" })
            }
            else {
                res.send({ message: "invalid link" })
            }

        } catch (error) {
            res.send({ message: error })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await UserDB.findOne({ email: email });
            if (!user) { res.send({ message: "user not available" }) }
            else {
                const isPasswordMatch = await bcrypt.compare(password, user.password)
                if (!isPasswordMatch) { res.send({ message: "Incorrect password" }) }
                else {
                    if (user.activated == false) {
                        //////////////////////////////
                        const transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            auth: {
                                user: process.env.EMAIL,
                                pass: process.env.PASSWORD,
                            }
                        });

                        let message = {
                            from: process.env.EMAIL,
                            to: user.email,
                            subject: "Store register verification",
                            text: `Activation link : http://localhost:5173/verify/${user.resetToken}`,
                        };

                        transporter.sendMail(message).then(() => {
                            console.log("received email");
                        }).catch(error => { console.log("Message:" + error) })
                        ////////////
                        res.send({ message: "Account not activated. Activation link send to mail. Please check inbox or Spam" })
                    }
                    else {
                        const token = jwt.sign({ email: user.email }, "APPLE", { expiresIn: '1h' })
                        res.status(200).send({ message: { token: token, email: user.email } })
                    }
                }
            }
        } catch (error) {
            res.send(error)
        }

    },

    forgetPassword: async (req, res) => {
        try {
            let { email } = req.body   
            const user = await UserDB.findOne({ email: email })

            /////////
            if (user) {

                const resetToken = await randomString.generate({
                    length: 20,
                    charset: 'alphanumeric'
                })
                user.resetToken = resetToken;
                user.save()

                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD,
                    }
                });

                let message = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: "Store Password reset link",
                    text: `Activation link : http://localhost:5173/password-reset/${resetToken}`,
                };

                transporter.sendMail(message).then(() => {
                    console.log("received email");
                    res.status(200).send({ message: "Reset link send to mail. Please check Inbox or Spam" })
                }).catch(error => { console.log("Message:" + error) })
            }
            else {
                console.log("Hi")
                res.send({ message: 'User not exist' })
            }
        }
        catch (error) {
            res.send({ message: error })
        }
    },
    passwordReset: async (req, res) => {
        try {
            let {resetToken, password} = req.body;
            console.log(req.body)
            let user = await UserDB.findOne({resetToken: resetToken});
            console.log(user)
            if(user){
                user.password = await bcrypt.hash(password, 10);
            user.save()
            console.log("first")
            res.status(200).send({message:'Password reset successfully'})
            }
            else{
                res.send({message: 'Invalid link'})
            }
        } 
        catch (error) {
            res.send({message:error})
        }
    }
}

module.exports = userControler