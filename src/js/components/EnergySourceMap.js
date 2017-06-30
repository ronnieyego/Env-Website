
const React = require('react');
const topojson = require('topojson');
const MapBubble = require('react-d3-map-bubble').MapBubble;

const buttonStyles = {
    margin: 'auto',
    width: '50%',
    border: '3px solid green',
    padding: '10px'
}

export default class EnergySourceMap extends React.Component {
	constructor() {
		super();
        let mapData, dataStates, dataCounties, circles, circleValue, tooltipContent;
        let domain = {
            scale: 'sqrt',
            domain: [0, 2000],
            range: [0, 15]
        };

        this.state = {
            mapData,
            width: 960,
            height: 700,
            dataStates,
            dataCounties,
            domain,
            circles,
            circleValue,
            projection: 'null',
            tooltipContent,
            polygonClass: 'land',
            meshClass: 'border',
            circleClass: 'bubble'
        };
	}

    componentDidMount() {
        console.log('Getting US Energy Data');
        fetch('/data/us.json')  
            .then(function(response) {
                return response.json();     
            })
            .then(us => {
                let dataStates = topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; });
                let dataCounties = topojson.feature(us, us.objects.nation);

                let circles = topojson.feature(us, us.objects.counties).features
                    .sort(function(a, b) { return b.properties.coal - a.properties.coal; })
                let circleValue = function(d) { return +d.properties.coal; };
                let tooltipContent = function(d) {return d.properties;}
                    
                this.setState({
                    mapData: us,
                    dataStates,
                    dataCounties,
                    circles,
                    circleValue,
                    tooltipContent
                });
            });
    };
    buttonClick(e) {
        console.log(e.target.value);
    }

    changeDataSource(e) {
        let source = e.target.value
        let circles = topojson.feature(this.state.mapData, this.state.mapData.objects.counties).features
            .sort(function(a, b) { return b.properties[source] - a.properties[source]; })
        let circleValue = function(d) { return +d.properties[source]; };
        this.setState({ 
            circles,
            circleValue
        });
    }

  render() {
    let map;
    if (this.state.mapData) {
        map = <MapBubble
                width= {this.state.width}
                height= {this.state.height}
                dataPolygon= {this.state.dataCounties}
                polygonClass= {this.state.polygonClass}
                dataMesh= {this.state.dataStates}
                meshClass = {this.state.meshClass}
                domain= {this.state.domain}
                dataCircle= {this.state.circles}
                circleValue= {this.state.circleValue}
                circleClass= {this.state.circleClass}
                projection= {this.state.projection}
                tooltipContent= {this.state.tooltipContent}
                showGraticule= {false}
                showTooltip= {true}
                showLegend= {true}
            /> 
    } // Should add an else with a loading bar thats the size of the map.

      return (
        <div>
             {map}
            <form style={buttonStyles}>
                <label>
                    Coal 
                    <input type="radio" id="coal" name="source" value="coal" onClick={this.changeDataSource.bind(this)} />
                </label>
                <label>
                    Solar 
                    <input type="radio" id="solar" name="source" value="solar" onClick={this.changeDataSource.bind(this)} />  
                </label>
                <label>
                    Wind 
                    <input type="radio" id="wind" name="source" value="wind" onClick={this.changeDataSource.bind(this)}/>
                </label>
                <br />
                <label>
                    Natural Gas 
                    <input type="radio" id="naturalGas" name="source" value="naturalGas" onClick={this.changeDataSource.bind(this)} />
                </label>
                <label>
                    Geothermal 
                    <input type="radio" id="geothermal" name="source" value="geothermal" onClick={this.changeDataSource.bind(this)} />  
                </label>
                <label>
                    Nuclear 
                    <input type="radio" id="nuclear" name="source" value="nuclear" onClick={this.changeDataSource.bind(this)}/>
                </label>
                <br />
                <label>
                    Hydroelectric 
                    <input type="radio" id="hydroelectric" name="source" value="hydroelectric" onClick={this.changeDataSource.bind(this)} />  
                </label>
                <label>
                    Oil 
                    <input type="radio" id="petroleum" name="source" value="petroleum" onClick={this.changeDataSource.bind(this)}/>
                </label>

            </form>
        </div>

      )
  }
}
  


  



  