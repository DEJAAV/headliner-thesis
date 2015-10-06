(function() {
  angular.module('headliner.venueHomepage', []).controller('VenueHomepageController',
    HomepageController);

  function HomepageController($scope, $window, $location, $rootScope,
    Homepage, Auth) { // Homepage is the injected service     

    var geocoder = new google.maps.Geocoder();

    $scope.initVenue = function() {
      console.log('initVenue is being called')
      Homepage.getAllArtists().then(function(all) {
        $scope.artists = all;
        geocoder.geocode({'address': '78701'}, function(c1) {         
          var venue_coord = new google.maps.LatLng(c1[0].geometry.location.H, c1[0].geometry.location.L);
          $scope.artists.forEach(function(artist) {
            geocoder.geocode({'address': artist.zip}, function(c2) {
              var artist_coord = new google.maps.LatLng(c2[0].geometry.location.H, c2[0].geometry.location.L);
              artist.distance = google.maps.geometry.spherical.computeDistanceBetween(venue_coord, artist_coord) * 0.000621371;
            });
          }); 
        });
      });
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
    
    $scope.minDate = new Date();
    $scope.opened = false;

    $scope.open = function() {
      $scope.opened = true;
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

    $scope.distanceFilter = function(artist) {
      var any = false;
        if ($scope.distance) {
          any = true;
          if ((artist.distance < 10 && $scope.distance === '10') || (artist.distance < 25 && $scope.distance === '25') || (artist.distance < 50 && $scope.distance === '50') || (artist.distance < 100 && $scope.distance === '100')) {
            return true;
          }
        }
      return any ? false : true;  
    };

    $scope.signout = function() {
      Auth.signout();
      console.log('user signed out');
    };
  }
})();
