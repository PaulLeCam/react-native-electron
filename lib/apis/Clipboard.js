'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setString = exports.getString = undefined;

var _electron = require('electron');

var getString = exports.getString = function getString(type) {
  return Promise.resolve(_electron.clipboard.readText(type));
};

var setString = exports.setString = function setString(text, type) {
  _electron.clipboard.writeText(text, type);
};