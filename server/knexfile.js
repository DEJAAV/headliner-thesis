
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
      process.env.url: 'headliner'
    },
    seeds: {
      directory: 'knex_migrations'
    }
  }
}
