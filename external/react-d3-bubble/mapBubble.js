"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactD3MapCore = require('react-d3-map-core');

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var MapBubble = (function (_Component) {
  _inherits(MapBubble, _Component);

  function MapBubble(props) {
    _classCallCheck(this, MapBubble);

    _get(Object.getPrototypeOf(MapBubble.prototype), 'constructor', this).call(this, props);

    this.state = {
      xTooltip: null,
      yTooltip: null,
      contentTooltip: null
    };
  }

  _createClass(MapBubble, [{
    key: '_onMouseOver',
    value: function _onMouseOver(dom, d, i) {
      var tooltipContent = this.props.tooltipContent;

      this.setState({
        xTooltip: d3.event.clientX,
        yTooltip: d3.event.clientY,
        contentTooltip: tooltipContent(d)
      });
    }
  }, {
    key: '_onMouseOut',
    value: function _onMouseOut(dom, d, i) {
      this.setState({
        xTooltip: null,
        yTooltip: null,
        contentTooltip: null
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var showTooltip = _props.showTooltip;
      var tooltipContent = _props.tooltipContent;

      var tooltip;

      var onMouseOut = this._onMouseOut.bind(this);
      var onMouseOver = this._onMouseOver.bind(this);

      if (showTooltip) {
        var tooltip = _react2['default'].createElement(_reactD3MapCore.Tooltip, _extends({}, this.state, {
          content: tooltipContent
        }));
      }

      return _react2['default'].createElement(
        'div',
        null,
        tooltip,
        _react2['default'].createElement(
          _reactD3MapCore.Svg,
          {
            width: width,
            height: height
          },
          _react2['default'].createElement(_map2['default'], _extends({}, this.props, this.state, {
            onMouseOver: onMouseOver,
            onMouseOut: onMouseOut
          }))
        )
      );
    }
  }]);

  return MapBubble;
})(_react.Component);

exports['default'] = MapBubble;
module.exports = exports['default'];