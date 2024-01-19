const User = require('../module/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const sendMail = require('./emailer');
const { trusted } = require('mongoose');

const SECRET_KEY = 'APPLE';

const userController = {

    //Signup and generate activation link with token
    signup: async (req, res) => {
        try {
            
            const { name, email, password } = req.body;
            console.log(name, email)
            //check if the user already exists
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' });
            }

            //create randomstring for account activation                  
            let token = randomstring.generate({
                length: 16,
                charset: "alphanumeric",
            });

            //creating expiry after 1 hour
            let expiry = new Date(Date.now() + 3600 * 1000);

            //hash the password before savingg
            const hashedPassword = await bcrypt.hash(password, 10);

            //create new USer

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                resetExpiry: expiry,
                resetToken: token,
            });

            //save the user
            await newUser.save();

            //Send Email along with link to activate the account

            let link = `${process.env.FE_URL}/activation_page/${token}`;

            await sendMail(email, "URL Shortener - Account Activation", `Hello !!, You have register to create a account on URL Shortener application.

                Please click the following link to activate your account: ${link}`);
            res.status(200).send({
                message: `Activation link sent to mail ${email} and link is ${link}`,
            });

            // res.status(201).json({message:"Email has been sent to the Mail ID for account activation"})

        }
        catch (error) {
            console.error('Error sending link to Email', error)
            // res.status(500).json({message:'Activation Error'})
        }
    },

    //Signin process and generate JWT Token
    signin: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            //find the user by email
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            //compare passwords

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Password wrong' });
            }

            //generate and send the jwt token 

            const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
        }
        catch (error) {
            console.log('Error signing in user', error);
            res.status(500).json({ message: 'Internal Server error' });
        }
    },

    //To verify the account activation link token
    accountVerify: async (req, res) => {
        try {
            const { token } = req.body;

            let userDB = await User.findOne({ resetToken: token });

            //checking token is present in db is the token sent by the user or not
            const isTokenValid = userDB.resetToken === token;

            //checking if the time limit to change the password has the expired
            const isntExpired = userDB.resetExpiry > Date.now();

            if (isTokenValid && isntExpired) {

                //deleting the token and expiry time update the activated status to true
                const updateActiveStatus = await User.findOneAndUpdate(
                    { resetToken: token },
                    {
                        activated: true,
                        resetToken: undefined,
                        resetExpiry: undefined,
                    },
                    { new: true }
                );

                res.status(200).send({ success: "Activation updated successfully" });
            }
            else res.status(400).send({ Error: "Invalid Link or Expired !!!" });

        }
        catch (error) {
            console.log("Activation failed in backend", error);
        }
    },

}

module.exports = userController;