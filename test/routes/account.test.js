const request = require('supertest')
const app = require('../../src/app')

const MAIN_ROUTE = '/accounts'
let user;

beforeAll( async () => {
  const res = await app.services.user.save({ name: 'User Account', email: `${Date.now()}@email.com`, password: '123456' })
  user = { ...res[0] }
})

test('Deve inserir uma conta com sucesso', async () => {
  const result = await request(app).post(MAIN_ROUTE)
    .send({ name: 'Acc #1', user_id: user.id })
  expect(result.status).toBe(200)
  expect(result.body[0].name).toBe('Acc #1')
})

test('Não deve inserir uma conta sem nome', async () => {
  const result = await request(app).post(MAIN_ROUTE)
    .send({ user_id: user.id })
  expect(result.status).toBe(400)
  expect(result.body.error).toBe('Nome é um atributo obrigatório!')
})

test('Deve listar todas as contas', () => {
  return app.db('accounts')
    .insert({ name: 'Acc List', user_id: user.id })
    .then(() => request(app).get(MAIN_ROUTE))
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body.length).toBeGreaterThan(0)
    })
})

test('Deve listar uma conta por id', () => {
  return app.db('accounts')
    .insert({ name: 'Acc By ID', user_id: user.id }, ['id'])
    .then(acc => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`))
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body.name).toBe('Acc By ID')
      expect(res.body.user_id).toBe(user.id)
    })
})

test('Deve alterar uma conta', () => {
  return app.db('accounts')
    .insert({ name: 'Acc To Update', user_id: user.id }, ['id'])
    .then(acc => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
      .send({ name: 'Acc Updated' }))
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body.name).toBe('Acc Updated')
    })
})

test('Deve remover uma conta', () => {
  return app.db('accounts')
    .insert({ name: 'Acc Remove Account', user_id: user.id }, ['id'])
    .then(acc => request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`))
    .then(res => {
      expect(res.status).toBe(204)
    })
})