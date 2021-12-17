const db = require('../../data/dbConfig')

function validateRegister(req, res, next) {
    
    db('users').where('username', req.body.username).first()
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
    db('users').where('username', req.body.username).first()
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


// 4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
// the response body should include a string exactly as follows: "invalid credentials".


module.exports = {
    validateRegister,
    validateLogin,
    validatePayload
}