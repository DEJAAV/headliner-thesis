(function() {
  angular.module('headliner.profile', []).controller('ProfileController',
    ProfileController);

  function ProfileController($scope, $window, $location, $rootScope,
    Profile) { // Profile is the injected service  

    var homepageUrl = $location.$$path.slice(0, ($location.$$path).length-1)
    var id = $location.$$path.slice(($location.$$path).length-1)

    $scope.getArtistById = function(id){
      Profile.getAllArtists().then(function(artists) {
        for (var artist in artists) {
          if (artists[artist].band_id.toString() === id) {
            console.log(artists[artist])
            $scope.artist = artists[artist]
          }
        }
      })
    }
    $scope.getVenueById = function(id){
      Profile.getAllVenues().then(function(venues) {
        console.log(venues, 'venues')
        for (var venue in venues) {
          if (venues[venue].venue_id.toString() === id) {
            $scope.venue = venues[venue]
          }
        }
      })
    }
    if (homepageUrl === '/profile-artist/') {
      $scope.getArtistById(id);
    }
    if (homepageUrl === '/profile-venue/') {
      $scope.getVenueById(id)
    }


    

    $scope.fakeArtist = [{
      "name": "Ellie",
      "street": "123 Peanut Street",
      "city": "Austin",
      "state": "TX",
      "zip": "78751",
      "type": {
        "americana": true,
        "blues": true,
        "metal": false,
        "casual": true,
        "lounge": true,
        "jazz": true
      },
      "about": "Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied.",
      "contact_phone": "8327944795",
      "facebook": "http://www.facebook.com/elliematsusaka",
      "yelp": "http://www.yelp.com",
      "website": "http://www.google.com"
    }]

    $scope.fakeVenue = [{
      "venue_name": "Ellie's Lounge",
      "street": "123 Peanut Street",
      "city": "Austin",
      "state": "TX",
      "zip": "78751",
      "type": {
        "americana": true,
        "blues": true,
        "metal": false,
        "casual": true,
        "lounge": true,
        "jazz": true
      },
      "inout": "Indoor/Outdoor",
      "capacity": 150,
      "about": "My venue is bitchin'",
      "contact_phone": "8327944795",
      "facebook": "http://www.facebook.com/elliematsusaka",
      "yelp": "http://www.yelp.com",
      "website": "http://www.google.com"
    }
      ];

      $scope.init = function() {
          $(document).ready(function(){
            $('ul.tabs').tabs();
          });
      }
      // add in functions here 

      
  }
})();
