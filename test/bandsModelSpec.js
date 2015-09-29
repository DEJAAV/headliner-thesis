var expect = require("chai").expect;
var Bands = require("../server/models/bands.js");
var Locations = require('../server/models/locations.js');
var Band_Genres = require('../server/models/band_genres.js');
var Genres = require('../server/models/genres.js');
var Band_Members = require('../server/models/band_members.js');

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
 
describe("Bands", function(){
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
       expect(Bands.create).to.be.a('function');
       done();
    });
    it("should have method findBand", function(done){
       expect(Bands.findBand).to.be.a('function');
       done();
    });
    it("should be able to create and find a band", function(done){
      var req = {
        band_name: 'The Rednex',
        onTour: 'false',
        email: 'rednex@rednex.com',
        phone_number: 1234567890,
        record_label: 'rednex',
        facebook: 'http://www.facebook.com/rednex',
        youtube: 'http://www.youtube.com/rednex',
        soundcloud: 'http://www.soundcloud.com/rednex',
        bandcamp: 'http://www.bandcamp.com/rednex',
        website: 'http://www.rednex.com',
        bio: 'We are an awsome band.',
        location: 12345,
        genres: {'country': true, 'comedy': true},
        members: [{name: 'bob', title: 'drummer'}, {name: 'joe', title: 'singer'}]
      };
      Bands.create(req).then(function(band_id) {
        Bands.findBand(band_id).then(function(band) {
          expect(band.band_name).to.equal(req.band_name);
          expect(band.onTour).to.equal(req.onTour);
          expect(band.email).to.equal(req.email);
          expect(band.phone_number).to.equal(req.phone_number);
          expect(band.record_label).to.equal(req.record_label);
          expect(band.facebook).to.equal(req.facebook);
          expect(band.youtube).to.equal(req.youtube);
          expect(band.soundcloud).to.equal(req.soundcloud);
          expect(band.bandcamp).to.equal(req.bandcamp);
          expect(band.website).to.equal(req.website);
          expect(band.bio).to.equal(req.bio);
          Locations.getLocationId(req.location).then(function(location_id) {
            expect(location_id).to.equal(band.location_id);
          });
          var reqGenres = [];
          var dbGenres = [];
          for (genre in req.genres) {
            reqGenres.push(genre);
          }
          Band_Genres.getGenres(band_id).then(function(pairs) {
            pairs.forEach(function(pair) {
              Genres.getGenreById(pair.genre_id).then(function(genre) {
                dbGenres.push(genre);
              });
            });
          });
          expect(reqGenres).to.deep.equal(dbGenres);
          Band_Members.getMembers(band_id).then(function(members) {
            expect(members).to.deep.equal(req.members);
          });
        });
      });
      done();
    });
  });
  describe("update", function(){
    it("should have method update", function(done){
       expect(Bands.update).to.be.a('function');
       done();
    });
    it("should be able to update a band", function(done){
      var req1 = {
        band_name: 'The Rednex',
        onTour: false,
        email: 'rednex@rednex.com',
        phone_number: 1234567890,
        record_label: 'rednex',
        facebook: 'http://www.facebook.com/rednex',
        youtube: 'http://www.youtube.com/rednex',
        soundcloud: 'http://www.soundcloud.com/rednex',
        bandcamp: 'http://www.bandcamp.com/rednex',
        website: 'http://www.rednex.com',
        bio: 'We are an awsome band.',
        location: 12345,
        genres: {'country': true, 'comedy': true},
        members: [{name: 'bob', title: 'drummer'}, {name: 'joe', title: 'singer'}]
      };
      Bands.create(req1).then(function(band_id) {
        var req2 = {
          'band_id': band_id,
          'band_name': 'The Rednecks'
        };
        Bands.update(req2);
        Bands.findBand(band_id).then(function(band) {
          expect(band.band_name).to.equal(req2.band_name);
        });
      });
      done();
    });
  });
  describe("getAll", function(){
    it("should have a method getAll", function(done){
      expect(Bands.getAll).to.be.a('function');
      done();
    });
    it("should retrieve all bands", function(done){
      var req1 = {
        band_name: 'The Rednex',
        onTour: false,
        email: 'rednex@rednex.com',
        phone_number: 1234567890,
        record_label: 'rednex',
        facebook: 'http://www.facebook.com/rednex',
        youtube: 'http://www.youtube.com/rednex',
        soundcloud: 'http://www.soundcloud.com/rednex',
        bandcamp: 'http://www.bandcamp.com/rednex',
        website: 'http://www.rednex.com',
        bio: 'We are an awsome band.',
        location: 12345,
        genres: {'country': true, 'comedy': true},
        members: [{name: 'bob', title: 'drummer'}, {name: 'joe', title: 'singer'}]
      };
      var req2 = {
        band_name: 'The Rednex2',
        onTour: false,
        email: 'rednex@rednex.com',
        phone_number: 1234567890,
        record_label: 'rednex',
        facebook: 'http://www.facebook.com/rednex',
        youtube: 'http://www.youtube.com/rednex',
        soundcloud: 'http://www.soundcloud.com/rednex',
        bandcamp: 'http://www.bandcamp.com/rednex',
        website: 'http://www.rednex.com',
        bio: 'We are an awsome band.',
        location: 12345,
        genres: {'country': true, 'comedy': true},
        members: [{name: 'bob', title: 'drummer'}, {name: 'joe', title: 'singer'}]
      };
      Bands.create(req1).then(function(band_id1) {
        Bands.create(req2).then(function(band_id2) {
          Bands.getAll().then(function(bands) {
            expect(bands.length).to.equal(2);
            for (band in bands) {
              if (band.band_id === bnad_id1) {
                expect(band.name).to.equal(req1.band_name);
              } else if (band.band_id === bnad_id2) {
                expect(band.name).to.equal(req2.band_name);
              }
            }
          });
        });
      });
      done();
    });
  });
});
