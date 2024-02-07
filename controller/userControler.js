const nodemailer = require("nodemailer")
const dotenv = require('dotenv')
dotenv.config()

const userController = {
    toMail : async (req, res)=>{
        let {name, email, subject, message} = req.body
       
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
            to: process.env.USER_EMAIL,
            subject: `${subject} - from RESUME`,
            text: `
            Name : ${name},
            Email : ${email}
            Message : ${message}`
        };
    
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                res.send('Error: ', error)
            }
            else {
                res.status(200).send("Email sent") ;
            };
        });
    }
  

}

module.exports = userController;