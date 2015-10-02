(function() {
  angular.module('headliner.homepage', []).controller('HomepageController',
    HomepageController);

  function HomepageController($scope, $window, $location, $rootScope,
    Homepage) { // Homepage is the injected service     
    $scope.artistsFake = [{
      "name": "Ellie",
      "street": "123 Peanut Street",
      "city": "Austin",
      "state": "TX",
      "zip": "78751",
      "genre": {
        "americana": true,
        "blues": true
      },
      "about": "Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied.",
      "contact_phone": "8327944795",
      "facebook": "http://www.facebook.com/elliematsusaka",
      "yelp": "http://www.yelp.com",
      "website": "http://www.google.com"
    }, {
      "name": "Aaron",
      "street": "123 Peanut Street",
      "city": "Austin",
      "state": "TX",
      "zip": "78751",
      "genre": {
        "blues": true,
        "bluegrass": true
      },
      "about": "Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied.'",
      "contact_phone": "8327944795",
      "facebook": "http://www.facebook.com/elliematsusaka",
      "yelp": "http://www.yelp.com",
      "website": "http://www.google.com"
    }, {
      "name": "Javier",
      "street": "123 Peanut Street",
      "city": "Austin",
      "state": "TX",
      "zip": "78751",
      "genre": {
        "bluegrass": true,
        "classical": true
      },
      "about": "Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied.'",
      "contact_phone": "8327944795",
      "facebook": "http://www.facebook.com/elliematsusaka",
      "yelp": "http://www.yelp.com",
      "website": "http://www.google.com"
    }, {
      "name": "Dan",
      "street": "123 Peanut Street",
      "city": "Austin",
      "state": "TX",
      "zip": "78751",
      "genre": {
        "classical": true,
        "comedy": true
      },
      "about": "Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied.",
      "contact_phone": "8327944795",
      "facebook": "http://www.facebook.com/elliematsusaka",
      "yelp": "http://www.yelp.com",
      "website": "http://www.google.com"
    }, {
      "name": "Vahagn",
      "street": "123 Peanut Street",
      "city": "Austin",
      "state": "TX",
      "zip": "78751",
      "genre": {
        "comedy": true,
        "country": true
      },
      "about": "Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied.",
      "contact_phone": "8327944795",
      "facebook": "http://www.facebook.com/elliematsusaka",
      "yelp": "http://www.yelp.com",
      "website": "http://www.google.com"
    }, ]
    $scope.venuesFake = [{
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
    }, {
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
    }, {
      "venue_name": "Pete's Piano Bar",
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
    }, {
      "venue_name": "Bob's Bar",
      "street": "123 Peanut Street",
      "city": "Austin",
      "state": "TX",
      "zip": "78751",
      "type": {
        "americana": true,
        "blues": true,
        "metal": false,
        "casual": true
      },
      "inout": "Indoor/Outdoor",
      "capacity": 150,
      "about": "My venue is bitchin'",
      "contact_email": "bob@gmail.com",
      "facebook": "http://www.facebook.com/elliematsusaka",
      "yelp": "http://www.yelp.com",
      "website": "http://www.google.com"
    }];

    $scope.initVenue = function() {
      console.log('initVenue is being called')
      Homepage.getAllArtists().then(function(all) {
        $scope.artists = all;
      })
    };

    $scope.initArtist = function() {
      console.log('initArtist is being called')
      Homepage.getAllVenues().then(function(all) {
        console.log($scope.venueGroup);        
        $scope.venues = all;
      })
    };

    $scope.genreFilter = function(artist) {
      var any = false;
      for (var genre in $scope.genre) {
        if ($scope.genre[genre]) {
          any = true;
          if (artist.genre[genre]) {
            return true;
          }
        }
      }
      return any ? false : true;
    };

  }
})();