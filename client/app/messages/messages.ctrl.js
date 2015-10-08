(function() {
  angular.module('headliner.messages', []).controller('MessagesController', MessagesController);

  function MessagesController($scope, $window, $location, $rootScope, Messages) {
    Messages.getMessages().then(function(messages) {
      $scope.messages = messages;
      $scope.messages.forEach(function(message) {
        message.date = new Date(message.date).toLocaleString();
      });
    });

  }
})();
