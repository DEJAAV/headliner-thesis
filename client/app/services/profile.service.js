(function(){

  angular.module('headliner.profileService', [])

  .factory('Profile', Profile)

  function Profile ($http, $location, $window) {

    // function getVenueById(id) {
    //   console.log('getting venue by id');
    //   return $http({
    //     method: 'GET',
    //     url: ''
    //   }).then(function(res) {
    //     console.log('GET: ', res.data);
    //     return res.data
    //   })
    // };

    // function getArtistById(id) {
    //   console.log('getting venue by id');
    //   return $http({
    //     method: 'GET',
    //     url: '/api/artist',
    //     data: 
    //   }).then(function(res) {
    //     console.log(res, 'res');
    //     return res.data
    //   })
    // };

    function getAllVenues () {
      console.log('getAllVenues is being called');
      return $http({
        method: 'GET',
        url: '/api/venues'
      })
      .then(function(resp){
        console.log('GET:',resp.data);
        return resp.data;
      })
    };

  function getAllArtists () {
    console.log('getAllArtists is being called');
    return $http({
      method: 'GET',
      url: '/api/artists'
    })
    .then(function(resp){
      return resp.data;
    })
  };





    return {
      getAllVenues: getAllVenues,
      getAllArtists: getAllArtists
    };
  }
})();