require('dotenv').config()
const jwt = require('jsonwebtoken')

//generate token

function generateToken(userId) {

    // data we want to encrypt/where is the file/options
    return jwt.sign(userId, process.env.TOKEN_SECRET, {})

}

function authenticateToken(req, res, next) {

    //value of header-authorization
    const token = req.get('Authorization')

    if (token === null) {
        return res.status(401)
    }
    //takes 3 parameters
    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.sendStatus(405)

        }
        req.user = user
        next()
    })
}


module.exports = {
    generateToken,
    authenticateToken
}