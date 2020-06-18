module.exports = (app) => {
  const createAccount = (req, res) => {
    app.services.account.save(req.body)
      .then(result => res.status(200).json(result))
  }

  const getAll = (req, res) => {
    app.services.account.findAll()
      .then(result => res.status(200).json(result))
  }
  return { createAccount, getAll }
}