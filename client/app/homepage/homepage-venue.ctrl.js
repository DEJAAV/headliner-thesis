(function() {
  angular.module('headliner.venueHomepage', []).controller('VenueHomepageController',
    HomepageController);

  function HomepageController($scope, $window, $location, $rootScope,
    Homepage, Auth) { // Homepage is the injected service     
    $scope.artistsFake = [{
      "band_name": "Ellie",
      "street": "123 Peanut Street",
      "city": "Austin",
      "state": "TX",
      "zip": "78751",
      "genre": {
        "americana": true,
        "blues": true
      },
      "record_label": '1',
      "onTour": 'Local',
      "about": "Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied.",
      "contact_phone": "8327944795",
      "facebook": "http://www.facebook.com/elliematsusaka",
      "yelp": "http://www.yelp.com",
      "website": "http://www.google.com"
    }, {
      "band_name": "Aaron",
      "street": "123 Peanut Street",
      "city": "Austin",
      "state": "TX",
      "zip": "78751",
      "genre": {
        "blues": true,
        "bluegrass": true
      },
      "record_label": '2',
      "onTour": 'Local',
      "shows": [{'venue': '', 'date': '2015-10-03'}],
      "reviews": [{'venue': '','shows-date': '','rating': 1,'comment': ''},{'venue': '','shows-date': '','rating': 5,'comment': ''}],
      "about": "Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied.'",
      "contact_phone": "8327944795",
      "facebook": "http://www.facebook.com/elliematsusaka",
      "yelp": "http://www.yelp.com",
      "website": "http://www.google.com"
    }, {
      "band_name": "Javier",
      "street": "123 Peanut Street",
      "city": "Austin",
      "state": "TX",
      "zip": "78751",
      "genre": {
        "bluegrass": true,
        "classical": true
      },
      "record_label": '3',
      "onTour": 'Touring',
      "shows": [{'venue': '', 'date': ''}, {'venue': '', 'date': ''}],
      "about": "Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied.'",
      "contact_phone": "8327944795",
      "facebook": "http://www.facebook.com/elliematsusaka",
      "yelp": "http://www.yelp.com",
      "website": "http://www.google.com"
    }, {
      "band_name": "Dan",
      "street": "123 Peanut Street",
      "city": "Austin",
      "state": "TX",
      "zip": "78751",
      "genre": {
        "classical": true,
        "comedy": true
      },
      "onTour": 'Touring',
      "shows": [{'venue': '', 'date': ''}],
      "about": "Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied.",
      "contact_phone": "8327944795",
      "facebook": "http://www.facebook.com/elliematsusaka",
      "yelp": "http://www.yelp.com",
      "website": "http://www.google.com"
    }, {
      "band_name": "Vahagn",
      "street": "123 Peanut Street",
      "city": "Austin",
      "state": "TX",
      "zip": "78751",
      "genre": {
        "comedy": true,
        "country": true
      },
      "onTour": 'Both',
      "shows": [{'venue': '', 'date': ''}],
      "about": "Depart do be so he enough talent. Sociable formerly six but handsome. Up do view time they shot. He concluded disposing provision by questions as situation. Its estimating are motionless day sentiments end. Calling an imagine at forbade. At name no an what like spot. Pressed my by do affixed he studied.",
      "contact_phone": "8327944795",
      "facebook": "http://www.facebook.com/elliematsusaka",
      "yelp": "http://www.yelp.com",
      "website": "http://www.google.com"
    }, ];

    $scope.initVenue = function() {
      console.log('initVenue is being called')
      Homepage.getAllArtists().then(function(all) {
        $scope.artists = all;
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

    $scope.signedFilter = function(artist) {
      var any = false;
      for (var key in $scope.signed) {
        if ($scope.signed[key]) {
          any = true;
          if ((key === 'yes' && artist.record_label) || (key === 'no' && !artist.record_label)) {
            return true;
          }
        }
      }
      return any ? false : true;
    };

    $scope.touringFilter = function(artist) {
      var any = false;
      for (var key in $scope.touring) {
        if ($scope.touring[key]) {
          any = true;
          if (artist.onTour === key) {
            return true;
          }
        }
      }
      return any ? false : true;
    };

    $scope.bookedFilter = function(artist) {
      var any = false;
      for (var key in $scope.booked) {
        if ($scope.booked[key]) {
          any = true;
          if ((key === 'many' && artist.shows && artist.shows.length > 100) || (key === 'some' && artist.shows && artist.shows.length > 10) || (key === 'few' && artist.shows && artist.shows.length > 0) || (key === 'none' && !artist.shows)) {
            return true;
          }
        }
      }
      return any ? false : true;
    };

    $scope.reviewsFilter = function(artist) {
      if (artist.reviews) {
        var avg = artist.reviews.map(function(review) {
          return review.rating;
        }).reduce(function(sum,rating) {
          return sum + rating;
        }) / artist.reviews.length;
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

    $scope.dateFilter = function(artist) {
      if (artist.shows) {
        var busy = artist.shows.map(function(show) {
          return show.date;
        });
      } else {
        var busy = [];
      }
      if ($scope.date) {
        if (busy.indexOf($scope.date.toISOString().split('T')[0]) > -1) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    };

    $scope.getClickedArtistData = function (e) {
      var id = $(e.target).data('id');
      console.log(this.artist);
      $rootScope.clickedArtist = this.artist;
    }    

    $scope.signout = function() {
      Auth.signout();
      console.log('user signed out');
    };
  }
})();
