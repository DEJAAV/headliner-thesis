var expect = require("chai").expect;
var bands = require("../server/models/bands.js");
 
describe("Bands", function(){
  describe("getAll()", function(){
    it("should be a function", function(){
       expect(bands.getAll).to.be.a.function;
    });
  });
});
