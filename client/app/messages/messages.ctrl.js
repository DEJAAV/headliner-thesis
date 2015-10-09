(function() {
  angular.module('headliner.messages', []).controller('MessagesController', MessagesController);

  function MessagesController($scope, $window, $location, $rootScope, Messages, Auth) {
    $scope.$watch(Auth.isAuth, function(authed) {
      if (!authed) {
        $location.path('/#/');
      }
    }, true);

    Messages.getMessages().then(function(messages) {
      $scope.messages = messages;
      $scope.messages.forEach(function(message) {
        message.date = new Date(message.date).toLocaleString();
      });
    });

  }
})();
