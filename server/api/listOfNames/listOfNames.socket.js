/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ListOfNames = require('./listOfNames.model');

exports.register = function(socket) {
  ListOfNames.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ListOfNames.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('listOfNames:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('listOfNames:remove', doc);
}