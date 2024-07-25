const jwt = require("jsonwebtoken")
const User = require('../module/UserModel.js')


const protect = async (req, res, next)=>{
    let token = req.headers.authorization.split(" ")[1]
    let {id} = jwt.verify(token, 'APPLE')
    req.user = await User.findById(id).select('-password')
    next()

}

module.exports = protect