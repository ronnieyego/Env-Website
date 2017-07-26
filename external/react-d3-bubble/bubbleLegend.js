"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactFauxDom = require('react-faux-dom');

var _reactFauxDom2 = _interopRequireDefault(_reactFauxDom);

var _reactD3MapCore = require('react-d3-map-core');

var BubbleLegend = (function (_Component) {
  _inherits(BubbleLegend, _Component);

  function BubbleLegend(props) {
    _classCallCheck(this, BubbleLegend);

    _get(Object.getPrototypeOf(BubbleLegend.prototype), 'constructor', this).call(this, props);
  }

  _createClass(BubbleLegend, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _reactD3MapCore.isTooltipUpdate)(nextProps, nextState, this);
    }
  }, {
    key: '_mkLegend',
    value: function _mkLegend(dom) {
      var _props = this.props;
      var width = _props.width;
      var height = _props.height;
      var domain = _props.domain;
      var domainScale = _props.domainScale;
      var circleValue = _props.circleValue;

      var g = d3.select(dom);

      var legend = g.attr('class', 'legend').attr("transform", "translate(" + (width - (domain.range[1] * 2 + 20)) + "," + (height - 20) + ")").selectAll('g').data([domain.domain[1] * 2 / 3, domain.domain[1] * 2 / 3, domain.domain[1] * 2]).enter().append('g');

      legend.append('circle').attr('cy', function (d) {
        return -domainScale(d);
      }).attr('r', domainScale);

      return g;
    }
  }, {
    key: 'render',
    value: function render() {
      var legendGroup = _reactFauxDom2['default'].createElement('g');
      var leg = this._mkLegend(legendGroup);

      return leg.node().toReact();
    }
  }], [{
    key: 'defaultProps',
    value: {},
    enumerable: true
  }]);

  return BubbleLegend;
})(_react.Component);

exports['default'] = BubbleLegend;
module.exports = exports['default'];