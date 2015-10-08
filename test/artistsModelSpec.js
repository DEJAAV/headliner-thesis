var expect = require("chai").expect;
var Artists = require("../server/models/artists.js");
var Locations = require('../server/models/locations.js');
var Artist_Genres = require('../server/models/artist_genres.js');
var Genres = require('../server/models/genres.js');
var Artist_Members = require('../server/models/artist_members.js');

var config = {  
  database: {
    client: 'postgresql',
    connection: {
      database: 'headliner'
    }
  },
  directory: './server/migrations',
  tableName: 'knex_migrations'
};

var knex = require('knex')(config.database);  
 
describe("Artists", function(){
  before(function(done) {
    knex.migrate.rollback(config);
    done();
  });
  beforeEach(function(done) {
    knex.migrate.latest(config);
    done();
  });
  afterEach(function(done) {  
    knex.migrate.rollback(config);
    done();
  });
  describe("create and find", function(){
    it("should have method create", function(done){
       expect(Artists.create).to.be.a('function');
       done();
    });
    it("should have method findArtist", function(done){
       expect(Artists.findArtist).to.be.a('function');
       done();
    });
    it("should be able to create and find a artist", function(done){
      var req = {
        artist_name: 'The Rednex',
        onTour: 'false',
        email: 'rednex@rednex.com',
        phone_number: 1234567890,
        record_label: 'rednex',
        facebook: 'http://www.facebook.com/rednex',
        youtube: 'http://www.youtube.com/rednex',
        soundcloud: 'http://www.soundcloud.com/rednex',
        artistcamp: 'http://www.artistcamp.com/rednex',
        website: 'http://www.rednex.com',
        bio: 'We are an awsome artist.',
        location: 12345,
        genres: {'country': true, 'comedy': true},
        members: [{name: 'bob', title: 'drummer'}, {name: 'joe', title: 'singer'}]
      };
      Artists.create(req).then(function(artist_id) {
        Artists.findArtist(artist_id).then(function(artist) {
          expect(artist.artist_name).to.equal(req.artist_name);
          expect(artist.onTour).to.equal(req.onTour);
          expect(artist.email).to.equal(req.email);
          expect(artist.phone_number).to.equal(req.phone_number);
          expect(artist.record_label).to.equal(req.record_label);
          expect(artist.facebook).to.equal(req.facebook);
          expect(artist.youtube).to.equal(req.youtube);
          expect(artist.soundcloud).to.equal(req.soundcloud);
          expect(artist.artistcamp).to.equal(req.artistcamp);
          expect(artist.website).to.equal(req.website);
          expect(artist.bio).to.equal(req.bio);
          Locations.getLocationId(req.location).then(function(location_id) {
            expect(location_id).to.equal(artist.location_id);
          });
          var reqGenres = [];
          var dbGenres = [];
          for (genre in req.genres) {
            reqGenres.push(genre);
          }
          Artist_Genres.getGenres(artist_id).then(function(pairs) {
            pairs.forEach(function(pair) {
              Genres.getGenreById(pair.genre_id).then(function(genre) {
                dbGenres.push(genre);
              });
            });
          });
          expect(reqGenres).to.deep.equal(dbGenres);
          Artist_Members.getMembers(artist_id).then(function(members) {
            expect(members).to.deep.equal(req.members);
          });
        });
      });
      done();
    });
  });
  describe("update", function(){
    it("should have method update", function(done){
       expect(Artists.update).to.be.a('function');
       done();
    });
    it("should be able to update a artist", function(done){
      var req1 = {
        artist_name: 'The Rednex',
        onTour: false,
        email: 'rednex@rednex.com',
        phone_number: 1234567890,
        record_label: 'rednex',
        facebook: 'http://www.facebook.com/rednex',
        youtube: 'http://www.youtube.com/rednex',
        soundcloud: 'http://www.soundcloud.com/rednex',
        artistcamp: 'http://www.artistcamp.com/rednex',
        website: 'http://www.rednex.com',
        bio: 'We are an awsome artist.',
        location: 12345,
        genres: {'country': true, 'comedy': true},
        members: [{name: 'bob', title: 'drummer'}, {name: 'joe', title: 'singer'}]
      };
      Artists.create(req1).then(function(artist_id) {
        var req2 = {
          'artist_id': artist_id,
          'artist_name': 'The Rednecks'
        };
        Artists.update(req2);
        Artists.findArtist(artist_id).then(function(artist) {
          expect(artist.artist_name).to.equal(req2.artist_name);
        });
      });
      done();
    });
  });
  describe("getAll", function(){
    it("should have a method getAll", function(done){
      expect(Artists.getAll).to.be.a('function');
      done();
    });
    it("should retrieve all artists", function(done){
      var req1 = {
        artist_name: 'The Rednex',
        onTour: false,
        email: 'rednex@rednex.com',
        phone_number: 1234567890,
        record_label: 'rednex',
        facebook: 'http://www.facebook.com/rednex',
        youtube: 'http://www.youtube.com/rednex',
        soundcloud: 'http://www.soundcloud.com/rednex',
        artistcamp: 'http://www.artistcamp.com/rednex',
        website: 'http://www.rednex.com',
        bio: 'We are an awsome artist.',
        location: 12345,
        genres: {'country': true, 'comedy': true},
        members: [{name: 'bob', title: 'drummer'}, {name: 'joe', title: 'singer'}]
      };
      var req2 = {
        artist_name: 'The Rednex2',
        onTour: false,
        email: 'rednex@rednex.com',
        phone_number: 1234567890,
        record_label: 'rednex',
        facebook: 'http://www.facebook.com/rednex',
        youtube: 'http://www.youtube.com/rednex',
        soundcloud: 'http://www.soundcloud.com/rednex',
        artistcamp: 'http://www.artistcamp.com/rednex',
        website: 'http://www.rednex.com',
        bio: 'We are an awsome artist.',
        location: 12345,
        genres: {'country': true, 'comedy': true},
        members: [{name: 'bob', title: 'drummer'}, {name: 'joe', title: 'singer'}]
      };
      Artists.create(req1).then(function(artist_id1) {
        Artists.create(req2).then(function(artist_id2) {
          Artists.getAll().then(function(artists) {
            expect(artists.length).to.equal(2);
            for (artist in artists) {
              if (artist.artist_id === bnad_id1) {
                expect(artist.name).to.equal(req1.artist_name);
              } else if (artist.artist_id === bnad_id2) {
                expect(artist.name).to.equal(req2.artist_name);
              }
            }
          });
        });
      });
      done();
    });
  });
});
