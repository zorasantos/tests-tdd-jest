const request = require('supertest')

const app = require('../../src/app')

test('Deve listar todos os usuarios', async () => {
  const res = await request(app).get('/users')
  expect(res.status).toBe(200)
  expect(res.body.length).toBeGreaterThan(0)
})

test('Deve inserir usuario com sucesso', async () => {
  const email = `${Date.now()}@email.com`
  const res = await request(app).post('/users')
    .send({ name: 'Caio Ian', email, password: '123456' })
    expect(res.status).toBe(201)
    expect(res.body.name).toBe('Caio Ian')
})

test('Não deve inserir usuario sem nome', async () => {
  const res = await request(app).post('/users')
    .send({ email: 'zora@gmail.com', password: '123456' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Nome é um atributo obrigatório.')
})

test('Não deve inserir usuario sem email', async () => {
  const res = await request(app).post('/users')
    .send({ name: 'Luiza Hellen', password: '123456' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Email é um atributo obrigatório.')
})

test('Não deve inserir usuario sem senhas', async (done) => {
  const res = await request(app).post('/users')
    .send({ name: 'Luiza Hellen', email: 'caio@gmail.com' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Senha é um atributo obrigatório.')
    done()
})

