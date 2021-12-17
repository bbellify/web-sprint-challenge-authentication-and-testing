const db = require('../../data/dbConfig')

function verifyRegister(req, res, next) {
    const { username, password } = req.body

    if (!username || !password) {
        next({ status: 400, message: 'username and password required' })
    } else {
        db('users').where('username', username).first()
        .then(user => {
            if (!user) {
                next()
            } else {
                next({ status: 400, message: 'username taken' })
            }
        })
        .catch(next)
    }

    // if (!username || !password) {
    //     next({ status: 400, message: 'username and password required'})
    // }
    // res.end()
}

module.exports = {
    verifyRegister
}