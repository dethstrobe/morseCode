'use strict';

angular.module('morseCodeApp')
  .factory('morseCodeConvertor', function () {
    // Service logic

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

    // Public API here
    return {
      convertTo: function (name) {
        return name.replace(/./g, function(letter){
          for(var code in morseCode){
            if(code === letter) return morseCode[code];
            if(code === letter.toLowerCase()) return morseCode[code];
          };
          return letter;
        });
      },
      convertFrom: function (name) {
        return name.replace(/./g, function(letter){
          for(var code in morseCode){
            if(morseCode[code] === letter) return code;
            if(morseCode[code] === letter.toLowerCase()) return code;
          };
          return letter;
        });
      }
    };
  });
