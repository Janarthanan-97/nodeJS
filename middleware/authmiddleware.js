const jwt = require('jsonwebtoken')

const authMiddleware = {
    verifyToken: (req, res, next) => {
        var token = req.headers.authorization;
        if (!token) {
            return res.json({ error: 'Token not found' });
        }
        else {
            try {
                jwt.verify(token.split(' ')[1], "APPLE", (err, decodedToken) => {
                    req.userID = decodedToken.userName;
                    next();
                })
            } catch (error) {
                console.log(error)
            }

        }




    }
}




module.exports = authMiddleware