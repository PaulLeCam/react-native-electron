'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alert = undefined;

var _electron = require('electron');

var alert = exports.alert = function alert(title, message) {
  var buttons = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'none';

  _electron.remote.dialog.showMessageBox(_electron.remote.getCurrentWindow(), {
    type: type,
    buttons: buttons.map(function (b) {
      return b.text;
    }),
    message: title,
    detail: message
  }, function (index) {
    var button = buttons[index];
    if (button && button.onPress) {
      button.onPress();
    }
  });
};