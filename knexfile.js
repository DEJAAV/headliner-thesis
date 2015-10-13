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
    connection: {
      process.env.url: process.env.DATABASE_URL
    },
    seeds: {
      directory: 'knex_migrations'
    }
  }
}