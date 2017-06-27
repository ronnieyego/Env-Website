
var React = require('react');
var topojson = require('topojson');
var MapBubble = require('react-d3-map-bubble').MapBubble;


var width = 960;
var height = 700;

var us = require('./data/us2.js');


// data should be a MultiLineString
var dataStates = topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; });
/// data should be polygon
var dataCounties = topojson.feature(us, us.objects.nation);

// class
var meshClass = 'border';
var polygonClass = 'land';

// domain
var domain = {
    scale: 'sqrt',
    domain: [0, 2000],
    range: [0, 15]
};

var circles = topojson.feature(us, us.objects.counties).features
    .sort(function(a, b) { return b.properties.coal - a.properties.coal; })
var circleValue = function(d) { return +d.properties.coal; };
var projection = 'null';

var tooltipContent = function(d) {return d.properties;}

const buttonStyles = {
    margin: 'auto',
    width: '50%',
    border: '3px solid green',
    padding: '10px'
}

export default class EnergySourceMap extends React.Component {
	constructor() {
		super();
	}
    buttonClick(e) {
        console.log(changeEvent.target.value);
    }

  render() {
      return (
        <div>
            <MapBubble
                width= {width}
                height= {height}
                dataPolygon= {dataCounties}
                polygonClass= {polygonClass}
                dataMesh= {dataStates}
                meshClass = {meshClass}
                domain= {domain}
                dataCircle= {circles}
                circleValue= {circleValue}
                circleClass= {'bubble'}
                projection= {projection}
                tooltipContent= {tooltipContent}
                showGraticule= {false}
                showTooltip= {true}
                showLegend= {true}
            />  
            <form className="us-map-form" style={buttonStyles} action="">
                <label>
                    Coal 
                    <input type="radio" id="coal" name="hello" value="coal" onChange={this.buttonClick.bind(this)} />
                </label>
                <label>
                    Solar 
                    <input type="radio" id="solar" name="hello" value="solar" onClick={this.buttonClick.bind(this)} />  
                </label>
                <label>
                    Wind 
                    <input type="radio" id="wind" name="hello" value="wind" onChange={this.buttonClick.bind(this)}/>
                </label>
                <label>
                    Wind 
                    <input type="submit" name="lol" onClick={this.buttonClick.bind(this)}/>
                </label>
            </form>
        </div>

      )
  }
}
  


  



  