const nodemailer = require("nodemailer");
const env = require('dotenv')
env.config()

const sendEmail = (emailID, randomString)=>{
  // console.log(process.env.EMAIL)
  // console.log(emailID, randomString)
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        }
      });
    
      let message = {
        from: process.env.EMAIL, // sender address
        to: emailID, // list of receivers
        subject: "Password reset token", // Subject line
        html: `<p>token : ${randomString}</p>`, // html body
      }
    
      transporter.sendMail(message).then(()=>{
        console.log("received email");
        
      }).catch(error=>{console.log("Message:"+error)})
}

module.exports = sendEmail