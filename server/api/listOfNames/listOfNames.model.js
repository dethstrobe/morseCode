'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ListOfNamesSchema = new Schema({
  name: String,
  gender: String
});

module.exports = mongoose.model('ListOfNames', ListOfNamesSchema);