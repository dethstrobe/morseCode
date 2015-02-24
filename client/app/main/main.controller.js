'use strict';

angular.module('morseCodeApp')
  .controller('MainCtrl', function ($scope, $http, socket, morseCodeConvertor) {
    $scope.userData = {
      name: '',
      gender: 'female'
    };

    $scope.otherUsers = [];

    //get request to populate otherUsers with data from MondoDB
    $http.get('/api/listOfNames').success(function(listOfNames) {
      $scope.otherUsers = listOfNames;

      socket.syncUpdates('listOfNames', $scope.otherUsers);
    });

    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    //this submits the name to mondoDB
    $scope.addUserData = function () {
      if($scope.userData.name === '') {
        return;
      }
      $http.post('/api/listOfNames', {name: $scope.userData.name, gender: $scope.userData.gender});
      $scope.userData.name = '';
    };

    $scope.convertTo = function (name) {
      return morseCodeConvertor.convertTo(name);
    };

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
      socket.unsyncUpdates('listOfNames')
    });
  });
