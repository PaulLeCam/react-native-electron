'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require('electron');

var _electron2 = _interopRequireDefault(_electron);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _reactNativeWeb = require('react-native-web');

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebView = function (_Component) {
  _inherits(WebView, _Component);

  function WebView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, WebView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WebView.__proto__ || Object.getPrototypeOf(WebView)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      viewState: 'IDLE',
      lastErrorEvent: null
    }, _this.bindWebView = function (e) {
      _this.webview = e;
    }, _this.onDomReady = function () {
      if (_this.props.injectedJavaScript) {
        _this.webview.executeJavaScript(_this.props.injectedJavaScript);
      }
    }, _this.onDidFailLoad = function (event) {
      if (_this.props.onError) {
        _this.props.onError(event);
      }
      if (_this.props.onLoadEnd) {
        _this.props.onLoadEnd(event);
      }
      _this.setState({
        lastErrorEvent: event,
        viewState: 'ERROR'
      });
    }, _this.onDidFinishLoad = function (event) {
      if (_this.props.onLoad) {
        _this.props.onLoad(event);
      }
      if (_this.props.onLoadEnd) {
        _this.props.onLoadEnd(event);
      }
      _this.setState({
        viewState: 'IDLE'
      });
    }, _this.onDidStartLoading = function (event) {
      if (_this.props.onLoadStart) {
        _this.props.onLoadStart(event);
      }
      _this.setState({
        viewState: 'LOADING'
      });
    }, _this.onIPCMessage = function (e) {
      if (e.channel === 'postMessage') {
        var msg = new Event('message');
        msg.nativeEvent = e;
        msg.nativeEvent.data = e.args[0];
        _this.props.onMessage(msg);
      }
    }, _this.postMessage = function (message) {
      if (_this.props.onMessage) {
        _this.webview.send('postMessage', message);
      } else {
        (0, _warning2.default)(false, 'Cannot use postMessage() without setting the onMessage() handler');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WebView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.webview.addEventListener('dom-ready', this.onDomReady);
      this.webview.addEventListener('did-fail-load', this.onDidFailLoad);
      this.webview.addEventListener('did-finish-load', this.onDidFinishLoad);
      this.webview.addEventListener('did-start-loading', this.onDidStartLoading);
      if (this.props.onMessage) {
        this.webview.addEventListener('ipc-message', this.onIPCMessage);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.onMessage) {
        if (!nextProps.onMessage) {
          this.webview.removeEventListener('ipc-message', this.onIPCMessage);
        }
      } else if (nextProps.onMessage) {
        this.webview.addEventListener('ipc-message', this.onIPCMessage);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.webview.removeEventListener('dom-ready', this.onDomReady);
      this.webview.removeEventListener('did-fail-load', this.onDidFailLoad);
      this.webview.removeEventListener('did-finish-load', this.onDidFinishLoad);
      this.webview.removeEventListener('did-start-loading', this.onDidStartLoading);
      if (this.props.onMessage) {
        this.webview.removeEventListener('ipc-message', this.onIPCMessage);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _ijs = _props.injectedJavaScript,
          _oe = _props.onError,
          _ol = _props.onLoad,
          _ols = _props.onLoadStart,
          _ole = _props.onLoadEnd,
          onMessage = _props.onMessage,
          source = _props.source,
          props = _objectWithoutProperties(_props, ['injectedJavaScript', 'onError', 'onLoad', 'onLoadStart', 'onLoadEnd', 'onMessage', 'source']);

      var extraProps = {};

      if (onMessage) {
        extraProps.preload = _electron2.default.remote.require('path').resolve(__dirname, 'WebView.preload');
      }

      return (0, _reactNativeWeb.createDOMElement)('webview', _extends({
        ref: this.bindWebView,
        src: source.uri ? source.uri : 'data:text/html,' + source.html
      }, extraProps, props));
    }
  }]);

  return WebView;
}(_react.Component);

WebView.propTypes = {
  injectedJavaScript: _propTypes2.default.string,
  onError: _propTypes2.default.func,
  onLoad: _propTypes2.default.func,
  onLoadEnd: _propTypes2.default.func,
  onLoadStart: _propTypes2.default.func,
  onMessage: _propTypes2.default.func,
  source: _propTypes2.default.oneOfType([_propTypes2.default.shape({ uri: _propTypes2.default.string.isRequired }), _propTypes2.default.shape({ html: _propTypes2.default.string.isRequired })]).isRequired,
  style: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.number, _propTypes2.default.object])
};
exports.default = WebView;