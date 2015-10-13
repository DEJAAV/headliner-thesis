module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'headliner'
    },
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: './seeds'
    }
  }
}
