(function() {
  angular.module('headliner.artistHomepage', []).controller('ArtistHomepageController',
    HomepageController);

  function HomepageController($scope, $window, $location, $rootScope,
    Homepage) { // Homepage is the injected service     

    $scope.venuesFake = [{
      "venue_name": "Ellie's Lounge",
      "street": "123 Peanut Street",
      "city": "Austin",
      "state": "TX",
      "zip": "78751",
      "genre": {
        "americana": true,
        "blues": true
      },
      "type": {
        "casual": true,
        "beer": true
      },
      "inout": "Indoor",
      "capacity": 10,
      "shows": [{'venue': '', 'date': ''}],
      "reviews": [{'venue': '','shows-date': '','rating': 1,'comment': ''},{'venue': '','shows-date': '','rating': 5,'comment': ''}],
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
      "genre": {
        "blues": true,
        "bluegrass": true
      },
      "type": {
        "champagne": true,
        "beer": true
      },
      "inout": "Outdoor",
      "capacity": 30,
      "shows": [{'venue': '', 'date': ''}, {'venue': '', 'date': ''}, {'venue': '', 'date': ''}],
      "reviews": [{'venue': '','shows-date': '','rating': 1,'comment': ''},{'venue': '','shows-date': '','rating': 5,'comment': ''}],
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
      "genre": {
        "bluegrass": true,
        "classical": true
      },
      "type": {
        "champagne": true,
        "cocktail": true
      },
      "inout": "Both",
      "capacity": 90,
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
      "genre": {
        "classical": true,
        "comedy": true
      },
      "type": {
        "country": true,
        "cocktail": true
      },
      "inout": "Both",
      "capacity": 150,
      "about": "My venue is bitchin'",
      "contact_email": "bob@gmail.com",
      "facebook": "http://www.facebook.com/elliematsusaka",
      "yelp": "http://www.yelp.com",
      "website": "http://www.google.com"
    }];

    $scope.initArtist = function() {
      console.log('initArtist is being called')
      Homepage.getAllVenues().then(function(all) {
        console.log($scope.venueGroup);        
        $scope.venues = all;
      })
    };

    $scope.genreFilter = function(venue) {
      var any = false;
      for (var genre in $scope.genre) {
        if ($scope.genre[genre]) {
          any = true;
          if (venue.genre[genre]) {
            return true;
          }
        }
      }
      return any ? false : true;
    };

    $scope.typeFilter = function(venue) {
      var any = false;
      for (var type in $scope.type) {
        if ($scope.type[type]) {
          any = true;
          if (venue.type[type]) {
            return true;
          }
        }
      }
      return any ? false : true;  
    };

    $scope.capacityFilter = function(venue) {
      var any = false;
      for (var key in $scope.capacity) {
        if ($scope.capacity[key]) {
          any = true;
          if ((key === 'high' && venue.capacity > 100) || (key === 'med' && venue.capacity > 50) || (key === 'low' && venue.capacity > 20) || (key === 'tiny' && venue.capacity < 20)) {
            return true;
          }
        }
      }
      return any ? false : true;
    };

    $scope.inoutFilter = function(venue) {
      var any = false;
      for (var key in $scope.inout) {
        if ($scope.inout[key]) {
          any = true;
          console.log(venue.inout);
          if (key === venue.inout) {
            return true;
          }
        }
      }
      return any ? false : true;
    };

    $scope.bookedFilter = function(venue) {
      var any = false;
      for (var key in $scope.booked) {
        if ($scope.booked[key]) {
          any = true;
          if ((key === 'many' && venue.shows && venue.shows.length > 100) || (key === 'some' && venue.shows && venue.shows.length > 10) || (key === 'few' && venue.shows && venue.shows.length > 0) || (key === 'none' && !venue.shows)) {
            return true;
          }
        }
      }
      return any ? false : true;
    };

    $scope.reviewsFilter = function(venue) {
      if (venue.reviews) {
        var avg = venue.reviews.map(function(review) {
          return review.rating;
        }).reduce(function(sum,rating) {
          return sum + rating;
        }) / venue.reviews.length;
      } else {
        var avg = 0;
      }
      var any = false;
      for (var key in $scope.reviews) {
        if ($scope.reviews[key]) {
          any = true;
          if ((key === 'four' && avg >= 4) || (key === 'three' && avg >= 3) || (key === 'two' && avg >= 2) || (key === 'one' && avg >= 1)  || (key === 'zero' && avg === 0)) {
            return true;
          }
        }
      }
      return any ? false : true;
    };

    $scope.dateFilter = function(venue) {
      //console.log($scope.date.toISOString().split('T')[0])
      var any = false;
      for (var genre in $scope.genre) {
        if ($scope.genre[genre]) {
          any = true;
          if (venue.genre[genre]) {
            return true;
          }
        }
      }
      return any ? false : true;
    };

  }
})();
