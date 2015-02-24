'use strict';

angular.module('morseCodeApp')
  .controller('MainCtrl', function ($scope, $http, socket, morseCodeConvertor) {
    $scope.userData = {
      name: '',
      gender: 'female'
    };

    $scope.otherUsers = [{name: 'bob', gender: 'male'}, {name: 'Jane', gender: 'female'}];

    //get request to populate otherUsers with data from MondoDB
    $http.get('/api/listOfNames').success(function(listOfNames) {
      if (listOfNames !== undefined)
        $scope.otherUsers = listOfNames;

      socket.syncUpdates('ListOfNames', $scope.otherUsers);
    });

    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    //this submits the name to mondoDB
    $scope.addUserData = function () {
      console.log($scope.userData);
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
    });
  });
