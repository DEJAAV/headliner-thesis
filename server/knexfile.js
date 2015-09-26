module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'headliner'
    },
    seeds: {
      directory: './seeds'
    }
  }
}
