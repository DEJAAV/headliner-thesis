module.exports = {
  findGenreId: function(name) {
    return knex('Genres')
      .where({
        genre_name: name
      })
      .select('genre_id')
  },

  create: function(name) {
    return knex('Genres')
      .insert({
        genre_name: name
      })
  }
}