(function(){
  
  angular.module('headliner.globalService', [])
  .factory('Global', Global);
  function Global ($http, $location, $window) {

    var allGenres = {
      Americana: undefined,
      Blues: undefined,
      Bluegrass: undefined,
      Classical: undefined,
      Comedy: undefined,
      Country: undefined,
      Coverband: undefined,
      DJ: undefined,
      EDM: undefined,
      Electronic: undefined,
      Folk: undefined,
      Hiphop: undefined,
      Jazz: undefined,
      Latin: undefined,
      Metal: undefined,
      Pop: undefined,
      RnB: undefined,
      Rock: undefined,
      SpokenWord: undefined,
      World: undefined
    };

    var allTypes = {
      Casual: undefined,      
      Beer: undefined,      
      Champagne: undefined,      
      Country: undefined,      
      Dance: undefined,      
      Dive: undefined,      
      LGBT: undefined,      
      Hookah: undefined,      
      Irish: undefined,      
      Jazz: undefined,      
      Karoke: undefined,      
      Coffee: undefined,      
      Lounge: undefined,      
      Music: undefined,      
      Piano: undefined,      
      Wine: undefined      
    }

    var states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
      'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
      'WY').split(' ').map(function (state) { 
        return { abbrev: state }; 
        });

    return {
      allGenres: allGenres,
      allTypes: allTypes,
      states: states
    }
  }

})();