(function(){

  angular.module('headliner', [
    'headliner.authService',
    'headliner.homeService', 
    'headliner.auth',
    'headliner.homepage',
    'ngRoute',
    'ngMaterial',
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
        url: '/basic'
      })
      .state('signup-venue.more', {
        templateUrl: 'app/auth/signup-venue/signup-venue-more.html',
        url: '/more'
      }) 
      .state('signup-venue.about', {
        templateUrl: 'app/auth/signup-venue/signup-venue-about.html',
        url: '/about'
      })
      .state('signup-venue.contact', {
        templateUrl: 'app/auth/signup-venue/signup-venue-contact.html',
        url: '/contact'
      })
      .state('signup-venue.terms', {
        templateUrl: 'app/auth/signup-venue/signup-venue-terms.html',
        url: '/terms'
      }) 
      //ARTIST SIGNUP FORM
      .state('signup-artist', {
        templateUrl: 'app/auth/signup-artist/signup-artist.html',
        url: '/signup-artist',
        controller: 'AuthController'
      })
      .state('signup-artist.basic', {
        templateUrl: 'app/auth/signup-artist/signup-artist-basic.html',
        url: '/basic'
      })
      .state('signup-artist.about', {
        templateUrl: 'app/auth/signup-artist/signup-artist-about.html',
        url: '/about'
      })
      .state('signup-artist.label', {
        templateUrl: 'app/auth/signup-artist/signup-artist-label.html',
        url: '/label'
      })
      .state('signup-artist.contact', {
        templateUrl: 'app/auth/signup-artist/signup-artist-contact.html',
        url: '/contact'
      })
      .state('signup-artist.terms', {
        templateUrl: 'app/auth/signup-artist/signup-artist-terms.html',
        url: '/terms'
      })                                                                                     
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