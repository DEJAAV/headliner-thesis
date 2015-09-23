(function(){

  angular.module('headliner', [
    'headliner.service',
    'headliner.auth',
    'headliner.create',
    'headliner.current',
    'headliner.open',
    'headliner.closed',
    'headliner.index',
    'ngRoute',
    'ui.router',
    'timer'
  ])
  .config(config)
  .factory('AttachTokens', AttachTokens);

  function config($routeProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/landing');

    $stateProvider
      .state('signup', {
        templateUrl: 'app/auth/signup.html',
        url: '/signup',
        controller: 'AuthController'
      })
      .state('landing', {
        templateUrl: 'app/auth/landing.html',
        url: '/landing',
        controller: 'AuthController'
      })
      .state('signin', {
        templateUrl: 'app/auth/signin.html',
        url: '/signin',
        controller: 'AuthController'
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