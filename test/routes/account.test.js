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
    .send({ name: 'Acc #1', user_id: user.id });
  expect(result.status).toBe(200);
  expect(result.body[0].name).toBe('Acc #1');
})

test('Deve listar todas as contas', () => {
  return app.db('accounts')
    .insert({ name: 'Acc List', user_id: user.id })
    .then(() => request(app).get({MAIN_ROUTE}))
    .then(res => {
      expect(res.status).toBe(200)
      expect(res.body.length).toBeGreaterThan(0)
    })
})