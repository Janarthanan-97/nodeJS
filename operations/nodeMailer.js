
const nodemailer = require("nodemailer")
const dotenv = require('dotenv')

dotenv.config()


const sendMail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    var mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log("Error in sending mail", error);
        else console.log("Email sent:" + info.response);
    });
};

module.exports = sendMail;