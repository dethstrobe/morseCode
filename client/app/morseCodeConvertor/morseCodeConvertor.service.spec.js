'use strict';

describe('Service: morseCodeConvertor', function () {

  // load the service's module
  beforeEach(module('morseCodeApp'));

  // instantiate service
  var morseCodeConvertor;
  beforeEach(inject(function (_morseCodeConvertor_) {
    morseCodeConvertor = _morseCodeConvertor_;
  }));

  it('should do something', function () {
    expect(!!morseCodeConvertor).toBe(true);
  });

});
