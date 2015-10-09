(function() {
  angular.module('headliner.conversation', []).controller('ConversationController', ConversationController);

  function ConversationController($scope, $window, $location, $rootScope, Messages, Auth) {
    $scope.$watch(Auth.isAuth, function(authed) {
      if (!authed) {
        $location.path('/#/');
      }
    }, true);
    
    $scope.id = parseInt($location.$$path.slice(14));

    Messages.markAsRead({'id': $scope.id});

    Messages.getConversation().then(function(messages) {
      $scope.messages = messages.filter(function(message) {
        if (message.venue_id) {
          return message.venue_id == $scope.id;
        } else if (message.artist_id) {
          return message.artist_id == $scope.id;
        }
      });
      $scope.messages.forEach(function(message) {
        message.date = new Date(message.date).toLocaleString();
      });
    });
    
    $scope.send = function() {
      $scope.message.date = new Date().toISOString();
      $scope.message.id = $scope.id;
      Messages.sendMessage($scope.message);
      $window.location.reload();
    };
    
  }
})();
