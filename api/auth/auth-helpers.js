const jwt = require('jsonwebtoken')

function tokenBuilder(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '8h'
    }
    const result = jwt.sign(payload, 'supersecretsecret', options)
    return result
}

module.exports = {
    tokenBuilder
}