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

var _bubbleLegend = require('./bubbleLegend');

var _bubbleLegend2 = _interopRequireDefault(_bubbleLegend);

var Map = (function (_Component) {
  _inherits(Map, _Component);

  function Map(props) {
    _classCallCheck(this, Map);

    _get(Object.getPrototypeOf(Map.prototype), 'constructor', this).call(this, props);
  }

  _createClass(Map, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _reactD3MapCore.isTooltipUpdate)(nextProps, nextState, this);
    }
  }, {
    key: '_dataPosition',
    value: function _dataPosition(d, geoPath, proj) {
      var _props = this.props;
      var circleX = _props.circleX;
      var circleY = _props.circleY;

      var type = d.geometry ? d.geometry.type : 'other';

      if (type === 'Polygon' || type === 'MultiPolygon') {
        var x = geoPath.centroid(d)[0];
        var y = geoPath.centroid(d)[1];
      } else if (type === 'Point') {
        var x = proj ? +proj(d.geometry.coordinates)[0] : d.geometry.coordinates[0];
        var y = proj ? +proj(d.geometry.coordinates)[1] : d.geometry.coordinates[1];
      } else if (type === 'other') {
        var x = proj ? +proj([circleX(d), circleY(d)])[0] : circleX(d);
        var y = proj ? +proj([circleX(d), circleY(d)])[1] : circleY(d);
      }

      return [x, y];
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var _props2 = this.props;
      var width = _props2.width;
      var height = _props2.height;
      var showGraticule = _props2.showGraticule;
      var dataPolygon = _props2.dataPolygon;
      var polygonClass = _props2.polygonClass;
      var meshClass = _props2.meshClass;
      var dataMesh = _props2.dataMesh;
      var scale = _props2.scale;
      var translate = _props2.translate;
      var precision = _props2.precision;
      var rotate = _props2.rotate;
      var center = _props2.center;
      var clipAngle = _props2.clipAngle;
      var parallels = _props2.parallels;
      var projection = _props2.projection;
      var domain = _props2.domain;
      var dataCircle = _props2.dataCircle;
      var circleValue = _props2.circleValue;
      var circleClass = _props2.circleClass;
      var showTooltip = _props2.showTooltip;
      var tooltipContent = _props2.tooltipContent;
      var circleX = _props2.circleX;
      var circleY = _props2.circleY;
      var onMouseOut = _props2.onMouseOut;
      var onMouseOver = _props2.onMouseOver;
      var showTile = _props2.showTile;

      var graticule, mesh, polygon, circle, voronoi, tile;

      var proj = (0, _reactD3MapCore.projection)({
        projection: projection,
        scale: scale,
        translate: translate,
        precision: precision,
        rotate: rotate,
        center: center,
        clipAngle: clipAngle,
        parallels: parallels
      });

      if (showTile) {
        var tiles = (0, _reactD3MapCore.tileFunc)({
          scale: proj.scale() * 2 * Math.PI,
          translate: proj([0, 0]),
          size: [width, height]
        });

        tile = _react2['default'].createElement(_reactD3MapCore.Tile, {
          tiles: tiles,
          scale: tiles.scale,
          translate: tiles.translate
        });
      }

      var geoPath = (0, _reactD3MapCore.geoPath)(proj);

      var domainScale = (0, _reactD3MapCore.scale)(domain);

      if (showGraticule) {
        graticule = _react2['default'].createElement(_reactD3MapCore.Graticule, _extends({
          geoPath: geoPath
        }, this.state));
      }

      if (dataPolygon) {
        if (!Array.isArray(dataPolygon)) {
          polygon = _react2['default'].createElement(_reactD3MapCore.Polygon, _extends({
            data: dataPolygon,
            geoPath: geoPath,
            polygonClass: polygonClass
          }, this.state));
        } else {
          polygon = dataPolygon.map(function (d, i) {
            return _react2['default'].createElement(_reactD3MapCore.Polygon, _extends({
              key: i,
              data: d,
              geoPath: geoPath,
              polygonClass: polygonClass
            }, _this.state));
          });
        }
      }

      if (dataMesh) {
        if (!Array.isArray(dataMesh)) {
          mesh = _react2['default'].createElement(_reactD3MapCore.Mesh, _extends({
            data: dataMesh,
            geoPath: geoPath,
            meshClass: meshClass
          }, this.state));
        } else {
          mesh = dataMesh.map(function (d, i) {
            return _react2['default'].createElement(_reactD3MapCore.Mesh, _extends({
              key: i,
              data: d,
              geoPath: geoPath,
              meshClass: meshClass
            }, _this.state));
          });
        }
      }

      if (dataCircle) {
        if (!Array.isArray(dataCircle)) {
          var r = domainScale(circleValue(dataCircle));
          var position = this._dataPosition(dataCircle, geoPath, proj);

          circle = _react2['default'].createElement(_reactD3MapCore.Circle, _extends({
            data: dataCircle,
            geoPath: geoPath,
            circleClass: circleClass,
            r: r,
            x: position[0],
            y: position[1],
            onMouseOut: onMouseOut,
            onMouseOver: onMouseOver
          }, this.state));
        } else {
          circle = dataCircle.map(function (d, i) {
            var r = domainScale(circleValue(d));
            var position = _this._dataPosition(d, geoPath, proj);

            return _react2['default'].createElement(_reactD3MapCore.Circle, _extends({
              key: i,
              data: d,
              geoPath: geoPath,
              circleClass: d.properties.class,
              r: r,
              x: position[0],
              y: position[1],
              onMouseOut: onMouseOut,
              onMouseOver: onMouseOver
            }, _this.state));
          });
        }
      }

      if (showTooltip) {

        var voronoiX = function voronoiX(d) {
          var type = d.geometry ? d.geometry.type : 'other';
          if (type === 'Polygon' || type === 'MultiPolygon') {
            return geoPath.centroid(d)[0];
          } else if (type === 'Point') {
            return proj ? +proj(d.geometry.coordinates)[0] : d.geometry.coordinates[0];
          } else if (type === 'other') {
            return proj ? +proj([circleX(d), circleY(d)])[0] : circleX(d);
          }
        };

        var voronoiY = function voronoiY(d) {
          var type = d.geometry ? d.geometry.type : 'other';
          if (type === 'Polygon' || type === 'MultiPolygon') {
            return geoPath.centroid(d)[1];
          } else if (type === 'Point') {
            return proj ? +proj(d.geometry.coordinates)[1] : d.geometry.coordinates[1];
          } else if (type === 'other') {
            return proj ? +proj([circleX(d), circleY(d)])[1] : circleY(d);
          }
        };

        var voronoi = _react2['default'].createElement(_reactD3MapCore.Voronoi, _extends({
          data: dataCircle,
          geoPath: geoPath,
          x: voronoiX,
          y: voronoiY,
          width: width,
          height: height,
          onMouseOut: onMouseOut,
          onMouseOver: onMouseOver
        }, this.state));
      }

      return _react2['default'].createElement(
        'g',
        null,
        tile,
        graticule,
        polygon,
        mesh,
        voronoi,
        circle
      );
    }
  }]);

  return Map;
})(_react.Component);

exports['default'] = Map;
module.exports = exports['default'];