var expect = require("chai").expect;
var Bands = require("../server/models/bands.js");
var Locations = require('../server/models/locations.js');
var Band_Genres = require('../server/models/band_genres.js');
var Band_Members = require('../server/models/band_members.js');
 
describe("Bands", function(){
  describe("create and find", function(){
    it("should have method create", function(){
       expect(Bands.create).to.be.a.function;
    });
    it("should have method findBand", function(){
       expect(Bands.findBand).to.be.a.function;
    });
    it("should be able to create and find a band", function(){
      var req = {
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
      Bands.create(req).then(function(band_id) {
        Bands.findBand(band_id).then(function(band) {
          expect(band.band_name.to.equal(req.band_name));
          expect(band.onTour.to.equal(req.onTour));
          expect(band.email.to.equal(req.email));
          expect(band.phone_number.to.equal(req.phone_number));
          expect(band.record_label.to.equal(req.record_label));
          expect(band.facebook.to.equal(req.facebook));
          expect(band.youtube.to.equal(req.youtube));
          expect(band.soundcloud.to.equal(req.soundcloud));
          expect(band.bandcamp.to.equal(req.bandcamp));
          expect(band.website.to.equal(req.website));
          expect(band.bio.to.equal(req.bio));
          Locations.getLocationId(req.location).then(function(location_id) {
            expect(location_id.to.equal(band.location_id));
          });
        });
        Band_Genres.getGenres(band_id).then(function(genres) {
          expect(genres.to.equal(req.genres));
        });
        Band_Members.getMembers(band_id).then(function(members) {
          expect(members.to.equal(req.members));
        });
      });
    });
  });

  describe("getAll()", function(){
    it("should be a function", function(){
       expect(Bands.getAll).to.be.a.function;
    });
  });
});
