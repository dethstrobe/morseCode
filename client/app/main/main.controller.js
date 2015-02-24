'use strict';

angular.module('morseCodeApp')
  .controller('MainCtrl', function ($scope, $http, socket, morseCodeConvertor) {
    $scope.userData = {
      name: '',
      gender: 'female'
    };

    //holds names that have already been submitted
    $scope.otherUsers = [];

    //get request to populate otherUsers with data from MondoDB
    $http.get('/api/listOfNames').success(function(listOfNames) {
      $scope.otherUsers = listOfNames;

      socket.syncUpdates('listOfNames', $scope.otherUsers);
    });

    //this posts the name to mondoDB
    $scope.addUserData = function () {
      if($scope.userData.name === '') {
        return;
      }
      $http.post('/api/listOfNames', {name: $scope.userData.name, gender: $scope.userData.gender});
      $scope.userData.name = '';
    };

    //this removes a name from mondoDB
    $scope.deleteName = function (nameID) {
      $http.delete('/api/listOfNames/' + nameID);
    };

    //converts names to morse code
    $scope.convertTo = function (name) {
      return morseCodeConvertor.convertTo(name);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('listOfNames')
    });
  });
