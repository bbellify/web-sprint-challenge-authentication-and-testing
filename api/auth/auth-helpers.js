const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')

function tokenBuilder(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '8h'
    }
    const result = jwt.sign(payload, JWT_SECRET, options)
    return result
}

module.exports = {
    tokenBuilder
}