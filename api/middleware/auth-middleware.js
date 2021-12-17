const User = require('../users/users-model')

function validateRegister(req, res, next) {
    User.findByUsername(req.body.username)
        .then(user => {
            if (!user) {
                next()
            } else {
                next({ status: 400, message: 'username taken' })
            }
        })
        .catch(next)
}

function validateLogin(req, res, next) {
    User.findByUsername(req.body.username)
        .then(user => {
            if (!user) {
                next({ status: 401, message: 'invalid credentials' })
            } return next()
        })
        .catch(next)
}

function validatePayload(req, res, next) {
    const { username, password } = req.body
    if (!username || !password) {
        next({ status: 400, message: 'username and password required' })
    } return next()
}

module.exports = {
    validateRegister,
    validateLogin,
    validatePayload
}