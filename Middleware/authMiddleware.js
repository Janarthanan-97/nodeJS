const jwt = require("jsonwebtoken")
const User = require('../module/UserModel.js')


const protect = async (req, res, next)=>{
    let token = req.headers.authorization.split(" ")[1]
    let {id} = jwt.verify(token, 'APPLE')
    req.user = await User.findById(id).select('-password')
    // console.log(req.body)
    next()

}

module.exports = protect