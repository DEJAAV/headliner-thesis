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
      .state('signup-artist', {
        templateUrl: 'app/auth/signup-artist.html', 
        url: '/signup-artist',
        controller: 'AuthController'
      })
      .state('signup-venue', {
        templateUrl: 'app/auth/signup-venue.html',
        url: '/signup-venue',
        controller: 'AuthController'
      })      
      .state('login', {
        templateUrl: 'app/auth/login.html',
        url: '/login',
        controller: 'AuthController'
      }) 
      .state('findBand', {
        templateUrl: 'app/search/findABand.html',
        url: '/find-bands',
        controller: 'AuthController' // change this to search controller after it's built out
      })  
      .state('findVenue', {
        templateUrl: 'app/search/findAVenue.html',
        url: '/find-venues',
        controller: 'AuthController' // change this to search controller after it's built out
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
        url: '/',
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