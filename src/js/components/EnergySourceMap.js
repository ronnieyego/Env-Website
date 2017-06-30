
const React = require('react');
const topojson = require('topojson');
const MapBubble = require('react-d3-map-bubble').MapBubble;

const buttonStyles = {
    textAlign: 'left',
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

        let sources = ['coal', 'hydroelectric', 'wind', 'naturalGas', 'petroleum', 'solar', 'nuclear'];
        let sortButtons = this.getEnergyFilterOptions(sources);
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
            circleClass: 'bubble',
            sortButtons
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
    getEnergyFilterOptions(energySourceArray) {
        let sources = energySourceArray.sort();
        let list = sources.map(source => { return <li>{source} <input type="radio" id={source} name="source" value={source} key={source} onClick={this.changeDataSource.bind(this)} /></li> });
        return list;
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
      //
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
                <ul>{this.state.sortButtons}</ul>
            </form>
        </div>

      )
  }
}
  


  



  