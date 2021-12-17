const db = require('../../data/dbConfig')


function findById(id) {
    return db('users')
        .where('id', id)
        .first()
}

function findByUsername(username) {
    return db('users')
        .where('username', username)
        .select('id', 'username', 'password')
        .first()
}

async function insert(user) {
    const [newId] = await db('users').insert(user)
    return findById(newId)
}

module.exports = {
    findByUsername,
    insert,
}