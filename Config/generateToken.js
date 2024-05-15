 const jwt = require('jsonwebtoken')

 const generateToken = (id)=>{
    console.log(id)
    return jwt.sign({id}, "APPLE", {
        expiresIn: "30d"
    })

 }

 module.exports = generateToken