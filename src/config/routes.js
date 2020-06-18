module.exports = (app) => {
  app.route('/users')
    .get(app.routes.users.findAll)
    .post(app.routes.users.createUser)

  app.route('/accounts')
    .post(app.routes.accounts.createAccount)
    .get(app.routes.accounts.getAll)

  app.route('/accounts/:id')
    .get(app.routes.accounts.getById)
    .put(app.routes.accounts.update)
    .delete(app.routes.accounts.remove)
}