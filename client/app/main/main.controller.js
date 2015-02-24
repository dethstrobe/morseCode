'use strict';

angular.module('morseCodeApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    //this submits the name to mondoDB
    $scope.addUserData = function () {
      console.log($scope.userData);
    };

    //this converts the name to morse code
    $scope.morseCodeConvertor = function (name) {
      var morseCode = {
        a: ".- ",
        b: "-... ",
        c: "-.-. ",
        d: "-.. ",
        e: ". ",
        f: "..-. ",
        g: "--. ",
        h: ".... ",
        i: ".. ",
        j: ".--- ",
        k: "-.- ",
        l: ".-.. ",
        m: "-- ",
        n: "-. ",
        o: "--- ",
        p: ".--. ",
        q: "--.- ",
        r: ".-. ",
        s: "... ",
        t: "- ",
        u: "..- ",
        v: "...- ",
        w: ".-- ",
        x: "-..- ",
        y: "-.-- ",
        z: "--.. ",
        0: "----- ",
        1: ".---- ",
        2: "..--- ",
        3: "...-- ",
        4: "....- ",
        5: "..... ",
        6: "-.... ",
        7: "--... ",
        8: "---.. ",
        9: "----. ",
        " ": "/ "
      }


      return name.replace(/./g, function(letter){
        for(var code in morseCode){
          if(code === letter) return morseCode[code];
          if(code === letter.toLowerCase()) return morseCode[code];
        };
        return letter;
      });
    }

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
