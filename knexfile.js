// Update with your config settings.

module.exports = {
  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'postgres',
      user:     'postgres',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'src/migrations'
    }
  }
};
