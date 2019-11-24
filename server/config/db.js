module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'tipssm',
    user: process.env.DB_USER || 'tipssm',
    password: process.env.DB_PASS || 'tipssm',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './tipssm.sqlite'
    }
  }
}
