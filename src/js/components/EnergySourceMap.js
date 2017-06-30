
const React = require('react');
const topojson = require('topojson');
const MapBubble = require('react-d3-map-bubble').MapBubble;

const { getProducerDisplayname, getSourceDisplayname } = require('../utils/nameMaps.js');

const buttonStyles = {
    textAlign: 'left',
    width: 300,
    border: '3px solid green',
    padding: '10px'
}

const width = 960;
const height = 700;

// Keep these names as they map to the fields in Map json.
const sources = ['coal', 'hydroelectric', 'wind', 'naturalGas', 'petroleum', 'solar', 'nuclear'];
const utilities = ['all', 'IPP CHP', 'IPP Non-CHP', 'Electric Utility'];

export default class EnergySourceMap extends React.Component {
	constructor(props) {
		super();
        let mapData, dataStates, dataCounties, circles, circleValue, tooltipContent;
        let domain = {
            scale: 'sqrt',
            domain: [0, 2000],
            range: [0, 15]
        };
        let currentSource = props.currentSource || 'coal';
        let currentUtility = props.currentUtility || 'all';

        this.state = {
            mapData,
            width,
            height,
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
            currentSource,
            currentUtility,
            sortSources: null,
            sortUtilities: null,
        };
        this.state.sortSources = this.getEnergyFilterOptions(sources);
        this.state.sortUtilities = this.getUtilityFilterOptions(utilities);
	}

    componentDidMount() {
        // The data fetch should happen in a HOC, not here
        // THis is because this function will run multiple times for some reason
        // I implemented a hack to get around this
        if(this.state.mapData) {
            return true;
        };
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
                let tooltipContent = function(d) {
                    /* TODO there is a bug where i keep adding MWHs
                    sources.forEach(el => {
                        if(d.properties[el]) {
                            d.properties[el] += ' MHWs';
                        }
                    });
                    */
                    return d.properties;
                }
                    
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
        let list = sources.map(source => { return <li>{getSourceDisplayname(source)} <input type="radio" id={source} defaultChecked={source === this.state.currentSource} name="source" value={source} style={{marginLeft: '10px'}} key={source} onClick={this.filterMap.bind(this)} /></li> });
        return list;
    }

    getUtilityFilterOptions(utilitySourceArray) {
        let sources = utilitySourceArray.sort();
        let list = sources.map(source => { return <li>{getProducerDisplayname(source)} <input type="radio" id={source} defaultChecked={source === this.state.currentUtility} name="utility" value={source} style={{marginLeft: '10px'}} key={source} onClick={this.filterMap.bind(this)} /></li> });
        return list;
    }

    filterMap(event) {
        let id = event.target.value;
        // check to see if its a source or utility change
        let source = sources.indexOf(id) !== -1 ? event.target.value : this.state.currentSource;
        let utility = utilities.indexOf(id) !== -1 ? event.target.value : this.state.currentUtility;

        let circles = topojson.feature(this.state.mapData, this.state.mapData.objects.counties).features
            .sort(function(a, b) { return b.properties[source] - a.properties[source]; })

        if(utility !== 'all') {
            // Check to see if i need to filter results and do so
            circles = circles.filter(val => {
                return val.properties.sector === utility;
            });
        }
        let circleValue = function(d) { return +d.properties[source]; };
        
        this.setState({ 
            circles,
            circleValue,
            currentSource: source,
            currentUtility: utility
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
    } else {
        map = <div styles={{width, height}} Map is loading />
    } // Should add an else with a loading bar thats the size of the map.
    let filterStyle = {
        display: 'inline-flex',
        justifyContent: 'space-around'
    }
      return (
        <div>
             {map}
             <div style={filterStyle}>
                <form style={buttonStyles}>
                    <ul><b>Filter by energy source</b>{this.state.sortSources}</ul>
                </form>
                <form style={buttonStyles}>
                    <ul><b>Filter by production source</b>{this.state.sortUtilities}</ul>
                </form>
            </div>
        </div>

      )
  }
}
  


  



  