var expect = require("chai").expect;
var Venues = require("../server/models/venues.js");
var genres = require("../server/models/genres.js");
 
describe("Venues", function(){
  it("should be able to create a venue", function(){
    var req = {
      name: 'Red7',
      capacity: 300,
      website: 'http://www.red7.com',
      street: 'main street',
      about: 'We are the best',
      city: 'Austin',
      state: 'TX',
      zip: 78787,
      facebook: 'http://www.facebook.com/red7',
      yelp: 'http://www.yelp.com/red7',
      contact: 'Danielson',
      phone: 12345,
      email: 'red7@red7.com',
      inout: 'out',
      genres: {"classical": "true"},
      type: {"beer": 'true'}
    }
    return Venues.create(req)
    // done();
  })
});



// describe("Bands", function(){
//  describe("create and find", function(){
//    it("should have method findBand", function(){
//       expect(bands.findBand).to.be.a.function;
//    });
//    it("should be able to create and find a band", function(){
//      var band = {
//        band_name: 'The Rednex',
//        onTour: false,
//        e_mail: 'rednex@rednex.com',
//        phone_number: 1234567890,
//        record_label: 'rednex',
//        facebook: 'http://www.facebook.com/rednex',
//        youtube: 'http://www.youtube.com/rednex',
//        soundcloud: 'http://www.soundcloud.com/rednex',
//        bandcamp: 'http://www.bandcamp.com/rednex',
//        website: 'http://www.rednex.com',
//        bio: 'We are an awsome band.',
//        location: 12345
//      };
//      bands.create(band).then(function(id) {
//        bands.findBand(id).then(function(band) {
//          expect(band.band_name.to.equal('The Rednex'));
//        });
//      });
//    });
//  });

//  describe("getAll()", function(){
//    it("should be a function", function(){
//       expect(bands.getAll).to.be.a.function;
//    });
//  });
// });