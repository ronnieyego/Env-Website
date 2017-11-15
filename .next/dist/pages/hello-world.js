'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _jsxFileName = '/Users/steveny/Desktop/Env-Website/pages/hello-world.js?entry';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Hello = function (_React$Component) {
  (0, _inherits3.default)(Hello, _React$Component);

  function Hello() {
    (0, _classCallCheck3.default)(this, Hello);
    return (0, _possibleConstructorReturn3.default)(this, (Hello.__proto__ || (0, _getPrototypeOf2.default)(Hello)).apply(this, arguments));
  }

  (0, _createClass3.default)(Hello, [{
    key: 'render',
    value: function render() {
      console.log('this.props ', this.props);
      return _react2.default.createElement('div', { className: 'container-fluid text-center', __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, 'Hello World');
    }
  }], [{
    key: 'getInitialProps',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
        var req = _ref.req;
        var res, json;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('starting to fetch');
                _context.next = 3;
                return (0, _isomorphicFetch2.default)('http://localhost:3000/api');

              case 3:
                res = _context.sent;
                _context.next = 6;
                return res.json();

              case 6:
                json = _context.sent;
                return _context.abrupt('return', { data: json });

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref2.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);
  return Hello;
}(_react2.default.Component);

exports.default = Hello;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2hlbGxvLXdvcmxkLmpzIl0sIm5hbWVzIjpbIkhlbGxvIiwiY29uc29sZSIsImxvZyIsInByb3BzIiwicmVxIiwicmVzIiwianNvbiIsImRhdGEiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztJLEFBRXFCOzs7Ozs7Ozs7OzZCQVVYLEFBQ0Y7Y0FBQSxBQUFRLElBQVIsQUFBWSxlQUFlLEtBQTNCLEFBQWdDLEFBQ3RDOzZCQUNDLGNBQUEsU0FBSyxXQUFMLEFBQWU7b0JBQWY7c0JBQUE7QUFBQTtPQUFBLEVBREQsQUFDQyxBQUlEOzs7Ozs7WUFmZ0MsQSxXQUFBLEE7Ozs7O21CQUMxQjt3QkFBQSxBQUFRLElBQVIsQUFBWTs7dUJBQ00sK0IsQUFBQSxBQUFNOzttQkFBbEI7QTs7dUJBQ2EsSUFBQSxBLEFBQUk7O21CQUFqQjtBO2lEQUNDLEVBQUMsTUFBRCxBQUFPLEE7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQU5hLGdCQUFNLEE7O2tCQUFwQixBIiwiZmlsZSI6ImhlbGxvLXdvcmxkLmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9zdGV2ZW55L0Rlc2t0b3AvRW52LVdlYnNpdGUifQ==