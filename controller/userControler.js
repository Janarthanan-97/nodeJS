const UserDB = require('../module/userSchema')
const randomString = require('randomstring')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userControler = {
    register: async (req, res) => {
        try {
            let newUser = req.body;
            const user = await UserDB.findOne({ email: newUser.email })
            if (user) { res.send({ message: "User already exist" }) }
            newUser.password = await bcrypt.hash(newUser.password, 10)
            const resetToken = await randomString.generate({
                length: 20,
                charset: 'alphanumeric'
            })
            newUser = { ...newUser, resetToken, resetExpiry: new Date(Date.now() + 3600 * 1000) }
            await UserDB.create(newUser);
            res.status(200).send({ message: "user created successfully" })
        } catch (error) {
            res.send({ message: error })
        }
    },
    verify: async (req, res) => {
        const { resetToken } = req.params
        let user = await UserDB.findOne({ resetToken: resetToken })
        user.activated = true;
        user.resetToken = ''
        user.save()
        res.status(200).send({ message: "Account activated successfully" })
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await UserDB.findOne({ email: email });
            if (!user) { res.send({ message: "user not available" }) }
            else {
                const isPasswordMatch = bcrypt.compare(password, user.password)
                if (!isPasswordMatch) { res.send({ message: "Incorrect password" }) }
                else {
                    if (user.activated == false) { res.send({ message: "Account not activated" }) }
                    else {
                        const token = jwt.sign({ email: user.email }, "APPLE", { expiresIn: '1h' })
                        res.status(200).send(token)
                    }
                }
            }



        } catch (error) {
            res.send(error)
        }

    }
}

module.exports = userControler