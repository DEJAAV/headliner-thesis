(function(){

  angular.module('headliner', [
    'headliner.authService',
    'headliner.homeService', 
    'headliner.profileService',
    'headliner.edit',
    'headliner.auth',
    'headliner.venueHomepage',
    'headliner.artistHomepage',
    'headliner.venueProfile',
    'headliner.artistProfile',
    'headliner.venueMessages',
    'headliner.artistMessages',
    'headliner.conversation',
    'headliner.music',
    'ngRoute',
    'angularSoundManager',
    'ui.router',
    'ui.bootstrap',
    'xeditable',
    'headliner.jwt'
  ])
  .config(config)
  .factory('AttachTokens', AttachTokens)

  function config($routeProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('landing', {
        templateUrl: 'app/auth/landing.html',
        url: '/',
        controller: 'AuthController'
      })
      .state('auth-init', {
        templateUrl: 'app/auth-init/auth-init.html',
        url: '/auth-init',
        controller: 'JwtController'
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
        controller: 'ArtistHomepageController' 
      })
      .state('homepage-venue', {
        templateUrl: 'app/homepage/homepage-venue.html',
        url: '/homepage-venue',
        controller: 'VenueHomepageController' 
      })
      // VENUE PROFILE 
      .state('profile-venue', {
        templateUrl: 'app/profiles/profile-venue/profile-venue.html',
        url: '/profile-venue/:id',
        controller: 'VenueProfileController'
      })
      // VENUE PROFILE (nested views)                                    
      .state('profile-venue.overview', {
        templateUrl: 'app/profiles/profile-venue/overview.html',
        url: '/venue-overview'
      }) 
      .state('profile-venue.reviews', {
        templateUrl: 'app/profiles/profile-venue/reviews.html',
        url: '/venue-reviews'
      }) 
      .state('profile-venue.events', {
        templateUrl: 'app/profiles/profile-venue/events.html',
        url: '/venue-events'
      }) 
      .state('profile-venue.photos', {
        templateUrl: 'app/profiles/profile-venue/photos.html',
        url: '/venue-photos'
      })    

      // VENUE MESSAGES
      .state('messages-venue', {
        templateUrl: 'app/messages/messages-venue.html',
        url: '/messages-venue/:id',
        controller: 'VenueMessagesController'
      })

      // ARTIST PROFILE 
      .state('profile-artist', {
        templateUrl: 'app/profiles/profile-artist/profile-artist.html',
        url: '/profile-artist/:id',
        controller: 'ArtistProfileController'
      })
      // ARTIST PROFILE (nested views)                                    
      .state('profile-artist.overview', {
        templateUrl: 'app/profiles/profile-artist/overview.html',
        url: '/artist-overview'
      })
      .state('profile-artist.music', {
        templateUrl: 'app/profiles/profile-artist/music.html',
        url: '/artist-music'
      })  
      .state('profile-artist.videos', {
        templateUrl: 'app/profiles/profile-artist/videos.html',
        url: '/artist-videos'
      })
      .state('profile-artist.photos', {
        templateUrl: 'app/profiles/profile-artist/photos.html',
        url: '/artist-photos'
      })                      
      .state('profile-artist.calendar', {
        templateUrl: 'app/profiles/profile-artist/calendar.html',
        url: '/artist-calendar'
      }) 
      .state('profile-artist.reviews', {
        templateUrl: 'app/profiles/profile-artist/reviews.html',
        url: '/artist-reviews'
      }) 

      // ARTIST MESSAGES
      .state('messages-artist', {
        templateUrl: 'app/messages/messages-artist.html',
        url: '/messages-artist/:id',
        controller: 'ArtistMessagesController'
      })

      // EDIT PROFILE 
      .state('edit-profile-venue', {
        templateUrl: 'app/edit-profile/edit-profile-venue.html',
        url: '/edit-profile-venue',
        controller: 'EditController'
      })

      // SIGNOUT    
      .state('signout', {
        templateUrl: 'app/auth/landing.html',
        url: '/signout',
        controller: 'AuthController',
        resolve: {function (Auth) {
          Auth.signout();
        }}
      })

      // Conversations
      .state('conversation', {
        templateUrl: 'app/messages/conversation.html',
        url: '/conversation/:id',
        controller: 'ConversationController'
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
