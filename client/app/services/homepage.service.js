(function(){
  
  angular.module('headliner.service')
  .factory('Homepage', Homepage);

  function Homepage ($http, $location, $window) {
    //get all artists to load on to the venues homepage display
    function getArtists () {
      return $http({
        method: 'GET',
        url: '/artists'
      })
      .then(function(resp){
        return resp.data;
      })
    };

    //get all venues to load on to the artists homepage display
    function getVenues () {
      return $http({
        method: 'GET',
        url: '/venues'
      })
      .then(function(resp){
        return resp.data;
      })
    };
  }


});