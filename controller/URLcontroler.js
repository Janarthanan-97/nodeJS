const User = require('../module/userSchema');
const Url = require('../module/URLSchema');
const jwt = require("jsonwebtoken");
const randomstring = require('randomstring');

const SECRET_KEY = "APPLE";

const getTokenFrom = (request) => {
    const authHeader = request.header('Authorization');
    return authHeader;
}

const urlController = {

    //To get the ID of User
    getUserID: async (req, res) => {
        try {
            const token = getTokenFrom(req);
            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY);
            // if the token is not valid, return an error
            if (!decodedToken) {
                return res.json({ message: 'token invalid' });
            }
            const user = await User.findById(decodedToken.userId).exec();
            const user_ID = user._id
            res.status(200).json({ user_ID })

        }
        catch (error) {
            console.error('Error in Fetching User ID', error)
            res.status(500).json({ message: 'Error in Fetching User ID' })
        }
    },

    //Get the Long URL and generate short URL
    generateShortURL: async (req, res) => {
        try {
            const token = getTokenFrom(req);

            // decode the token to authorize the user
            const decodedToken = jwt.verify(token, SECRET_KEY);

            // if the token is not valid, return an error
            if (!decodedToken) {
                return response.json({ message: 'token invalid' });
            }
            //BaseUrl to concat with RandomString
            
            const BaseURL = `${process.env.BE_URL}/api/url`;

            //Getting the long URL from user
            const { longURL } = req.body;

            //To check whether the longUrl already exists            
            const url = await Url.find({ longURL });
            console.log(longURL)
            let new_id;
            const one = url.map((i) => {
                if ((i.user) == (req.params.id)) {
                    console.log("MATCHED " + i.user)
                    new_id = i.user;
                }
            })
            //if Url exists   
            if ((new_id) == (req.params.id)) {
                res.status(200).json({ url })
            }
            //If not exists generate new URL
            else if (longURL.length > 15) {
                console.log("It's new URL")
                var user = await User.findById(req.params.id).exec();

                //Generate the random String
                const shortId = randomstring.generate({
                    length: 6,
                    charset: "alphanumeric",
                });

                //Created shortURL
                const shortURL = `${BaseURL}/${shortId}`;

                //Created Date
                let dt = new Date();
                let date = dt.getDate();
                let month = dt.getMonth() + 1;
                let year = dt.getFullYear();
                let fulldate = `${date}-${month}-${year}`

                //Save the details in DB
                const newUrl = new Url({
                    shortId: shortId,
                    shortURL: shortURL,
                    longURL: longURL,
                    month: month,
                    createdAt: fulldate,
                    user: user._id,
                })

                const result = await newUrl.save();

                user.url = user.url.concat(result._id)
                await user.save();
                res.status(200).json({ newUrl })
            }
            else {
                console.log("SHORT URL")
            }
        }
        catch (error) {
            console.error("Error in creating URL ", error);
        }
    },

    //Get all URLs
    getAll: async (req, res) => {
        try {

            let dt = new Date();
            let date = dt.getDate();
            let month = dt.getMonth() + 1;
            let year = dt.getFullYear();
            let fulldate = `${date}-${month}-${year}`

            const urls = await Url.find({ user: (req.params.id) }).exec();

            const monthlyurlcount = await Url.find({ $and: [{ user: (req.params.id) }, { month: month }] }).count();

            const dayurlcount = await Url.find({ $and: [{ user: (req.params.id) }, { createdAt: fulldate }] }).count();

            if (urls) {
                res.json({ urls, monthlyurlcount, dayurlcount });
            }
            else {
                res.json({ message: "No URL found" })
            }
        }
        catch (error) {
            console.log("Error in fetching all URL ", error)
        }
    },

    //For Url Redirects
    redirectUrl: async (req, res) => {
        try {
            const url = await Url.findOne({ shortId: (req.params.id) });
            if (!url) {
                res.status(404).json("Not found");
            }
            else {
                url.clicks++;
                url.save();
                res.redirect(`${url.longURL}`);
            }
        }
        catch (error) {
            console.log("Error in redirecting URL  ", error);
        }
    },


}

module.exports = urlController;