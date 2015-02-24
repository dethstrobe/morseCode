'use strict';

var _ = require('lodash');
var ListOfNames = require('./listOfNames.model');

// Get list of listOfNamess
exports.index = function(req, res) {
  ListOfNames.find(function (err, listOfNamess) {
    if(err) { return handleError(res, err); }
    return res.json(200, listOfNamess);
  });
};

// Get a single listOfNames
exports.show = function(req, res) {
  ListOfNames.findById(req.params.id, function (err, listOfNames) {
    if(err) { return handleError(res, err); }
    if(!listOfNames) { return res.send(404); }
    return res.json(listOfNames);
  });
};

// Creates a new listOfNames in the DB.
exports.create = function(req, res) {
  ListOfNames.create(req.body, function(err, listOfNames) {
    if(err) { return handleError(res, err); }
    return res.json(201, listOfNames);
  });
};

// Updates an existing listOfNames in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ListOfNames.findById(req.params.id, function (err, listOfNames) {
    if (err) { return handleError(res, err); }
    if(!listOfNames) { return res.send(404); }
    var updated = _.merge(listOfNames, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, listOfNames);
    });
  });
};

// Deletes a listOfNames from the DB.
exports.destroy = function(req, res) {
  ListOfNames.findById(req.params.id, function (err, listOfNames) {
    if(err) { return handleError(res, err); }
    if(!listOfNames) { return res.send(404); }
    listOfNames.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}