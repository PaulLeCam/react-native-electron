'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInitialURL = exports.canOpenUrl = exports.openURL = exports.removeEventListener = exports.addEventListener = undefined;

var _electron = require('electron');

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addEventListener = exports.addEventListener = function addEventListener() {
  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Linking.addEventListener() is not implemented in react-native-electron') : void 0;
};

var removeEventListener = exports.removeEventListener = function removeEventListener() {
  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Linking.removeEventListener() is not implemented in react-native-electron') : void 0;
};

var openURL = exports.openURL = function openURL(url, options) {
  return _electron.shell.openExternal(url, options) ? Promise.resolve() : Promise.reject(new Error('Could not open URL'));
};

var canOpenUrl = exports.canOpenUrl = function canOpenUrl() {
  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Linking.canOpenUrl() is not implemented in react-native-electron') : void 0;
};

var getInitialURL = exports.getInitialURL = function getInitialURL() {
  process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Linking.canOpenUrl() is not implemented in react-native-electron') : void 0;
};