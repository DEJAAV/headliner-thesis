var expect = require("chai").expect;
var Locations = require("../server/models/locations.js");

describe("Locations", function(){
  describe("Return location_id", function(){
    it("should return a location_id if the zipcode is found", function(){
      Locations.getLocationId(78756).then(function(data){
        expect(data).to.equal(2);
      });
    });
  });
  // it("should return a location_id if the zipcode is not found", function(done){
  //   Locations.getLocationId(123456789).then(function(data){
  //     console.log(data)
  //     expect(data).to.equal(8);
  //     done()
  //   })
  // })
})