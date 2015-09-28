// var expect = require("chai").expect;
// var venues = require("../server/models/venues.js");
// var genres = require("../server/models/genres.js");
 
// describe("Venues", function(){
//   var req = {
//     venue_name: 'Red7',
//     capacity: 300
//     website: 'rednex@rednex.com',
//     street: 1234567890,
//     bio: 'rednex',
//     city: 'http://www.facebook.com/rednex',
//     state: 'http://www.youtube.com/rednex',
//     zip: 'http://www.soundcloud.com/rednex',
//     facebook: 'http://www.bandcamp.com/rednex',
//     yelp: 'http://www.rednex.com',
//     contact_name: 'We are an awsome band.',
//     contact_phone: 12345
//     in_out:
//   }
//     it("should add a genre to venue", function(){
//       expect(venues)
//     })
//   });
// });



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