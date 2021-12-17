
exports.seed = async function(knex) {
  await knex('users').truncate()
  await knex('users').insert(users)
  
};

const users = [
  { username: 'foo', password: 'bar' }
]