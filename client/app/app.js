(function(){

  angular.module('headliner', [
    'headliner.authService',
    'headliner.homeService', 
    'headliner.auth',
    'headliner.homepage',
    'ngRoute',
    'ui.router'
  ])
  .config(config)
  .factory('AttachTokens', AttachTokens);

  function config($routeProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('landing', {
        templateUrl: 'app/auth/landing.html',
        url: '/',
        controller: 'AuthController'
      })
      // .state('signup-artist', {
      //   templateUrl: 'app/auth/signup-artist.html', 
      //   url: '/signup-artist',
      //   controller: 'AuthController'
      // })
      // .state('signup-venue', {
      //   templateUrl: 'app/auth/signup-venue.html',
      //   url: '/signup-venue',
      //   controller: 'AuthController'
      // })   

      .state('login', {
        templateUrl: 'app/auth/login.html',
        url: '/login',
        controller: 'AuthController'
      }) 
      .state('signup', {
        templateUrl: 'app/auth/signup.html',
        url: '/signup',
        controller: 'AuthController'
      })
      .state('signup-select', {
        templateUrl: 'app/auth/signup-select.html',
        url: '/select',
        controller: 'AuthController'
      })           
      // VENUE FORM (nested views)
      .state('signup-venue', {
        templateUrl: 'app/auth/signup-venue/signup-venue.html',
        url: '/signup-venue',
        controller: 'AuthController'
      })  
      .state('signup-venue.basic', {
        templateUrl: 'app/auth/signup-venue/signup-venue-basic.html',
        url: '/basic',
        controller: 'AuthController'
      })
      .state('signup-venue.more', {
        templateUrl: 'app/auth/signup-venue/signup-venue-more.html',
        url: '/more',
        controller: 'AuthController'
      }) 
      .state('signup-venue.about', {
        templateUrl: 'app/auth/signup-venue/signup-venue-about.html',
        url: '/about',
        controller: 'AuthController'
      })
      .state('signup-venue.contact', {
        templateUrl: 'app/auth/signup-venue/signup-venue-contact.html',
        url: '/contact',
        controller: 'AuthController'
      })
      .state('signup-venue.terms', {
        templateUrl: 'app/auth/signup-venue/signup-venue-terms.html',
        url: '/terms',
        controller: 'AuthController'
      }) 
      //ARTIST SIGNUP FORM
      .state('signup-artist', {
        templateUrl: 'app/auth/signup-artist/signup-artist.html',
        url: '/signup-artist',
        controller: 'AuthController'
      })
      .state('signup-artist.file1', {
        templateUrl: 'app/auth/signup-artist/signup-artist-file1.html',
        url: '/file1',
        controller: 'AuthController'
      })
      .state('signup-artist.file2', {
        templateUrl: 'app/auth/signup-artist/signup-artist-file2.html',
        url: '/file2',
        controller: 'AuthController'
      })
      .state('signup-artist.file3', {
        templateUrl: 'app/auth/signup-artist/signup-artist-file3.html',
        url: '/file3',
        controller: 'AuthController'
      })
      .state('signup-artist.file4', {
        templateUrl: 'app/auth/signup-artist/signup-artist-file4.html',
        url: '/file4',
        controller: 'AuthController'
      })
      .state('signup-artist.file5', {
        templateUrl: 'app/auth/signup-artist/signup-artist-file5.html',
        url: '/file5',
        controller: 'AuthController'
      })                                                                       
      // possibly remove these routes when modal is created from homepage to save query
      // .state('findBand', {
      //   templateUrl: 'app/search/findABand.html',
      //   url: '/find-bands',
      //   controller: 'AuthController' // change this to search controller after it's built out
      // })  
      // .state('findVenue', {
      //   templateUrl: 'app/search/findAVenue.html',
      //   url: '/find-venues',
      //   controller: 'AuthController' // change this to search controller after it's built out
      // })               
      .state('homepage-artist', {
        templateUrl: 'app/homepage/homepage-artist.html',
        url: '/homepage-artist',
        controller: 'HomepageController' 
      })
      .state('homepage-venue', {
        templateUrl: 'app/homepage/homepage-venue.html',
        url: '/homepage-venue',
        controller: 'HomepageController' 
      })                        
      .state('signout', {
        templateUrl: 'app/auth/landing.html',
        url: '/signout',
        controller: 'AuthController',
        resolve: {function (Auth) {
          Auth.signout();
        }}
      })

    // Add AttachTokens to $httpInterceptor, add token from local storage the to header of http request to server
    $httpProvider.interceptors.push('AttachTokens');
  }

  function AttachTokens ($window) {
    var attach = {
      request: function (object) {
        var jwt = $window.localStorage.getItem('headliner');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  }

})();