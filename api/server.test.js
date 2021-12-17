const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

// beforeEach(async () => {
//   await db('users').truncate()
// })

afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})


describe('auth router', () => {
  describe('[POST], /register', () => {
    let res
    beforeEach(async () => {
      res = await request(server)
        .post('/api/auth/register')
        .send({ username: 'mister', password: 'sister' })
    })
    it('responds with 201 created and new user', async () => {
      expect(res.status).toBe(201)
      expect(res.body).toMatchObject({ username: 'mister' })
    })
    it('creates a new user in db', async () => {
      const [newUser] = await db('users').where('id', 1)
      expect(newUser).toMatchObject({ username: 'mister' })
    })
  })

  describe('[POST], /login', () => {
    beforeAll(async () => {
      await request(server)
        .post('/api/auth/register')
        .send({ username: 'mister', password: 'sister' })
    })
    let res
    beforeEach(async () => {
      res = await request(server)
        .post('/api/auth/login')
        .send({ username: 'mister', password: 'sister' })
    })
    it('responds with 200 OK', async () => {
      expect(res.status).toBe(200)
    })
    it('responds with welcome, username', async () => {
      expect(res.body).toMatchObject({ message: 'welcome, mister' })
    })
  })

})


describe('login endpoint', () => {

})