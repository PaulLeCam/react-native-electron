'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAsDefaultProtocolClient = exports.getInitialURL = exports.canOpenURL = exports.openURL = exports.removeEventListener = exports.addEventListener = undefined;

var _electron = require('electron');

var eventHandlers = new Map();

var addEventListener = exports.addEventListener = function addEventListener(type, handler) {
  if (type === 'url' && typeof handler === 'function') {
    var wrapHandler = function wrapHandler(event, url) {
      handler({ type: type, url: url });
    };
    eventHandlers.set(handler, wrapHandler);
    _electron.remote.app.on('open-url', wrapHandler);
  }
};

var removeEventListener = exports.removeEventListener = function removeEventListener(type, handler) {
  if (type === 'url' && typeof handler === 'function') {
    var wrapHandler = eventHandlers.get(handler);
    if (wrapHandler) {
      _electron.remote.app.removeListener('open-url', wrapHandler);
    }
    eventHandlers.delete(handler);
  }
};

var openURL = exports.openURL = function openURL(url, options) {
  return _electron.shell.openExternal(url, options) ? Promise.resolve() : Promise.reject(new Error('Could not open URL'));
};

// Apply same behavior as RNW
var canOpenURL = exports.canOpenURL = function canOpenURL() {
  return true;
};

var getInitialURL = exports.getInitialURL = function getInitialURL() {
  return _electron.remote.process.argv[1] || null;
};

// Non-RN, added for convenience
var setAsDefaultProtocolClient = exports.setAsDefaultProtocolClient = function setAsDefaultProtocolClient(scheme) {
  _electron.remote.app.setAsDefaultProtocolClient(scheme);
};