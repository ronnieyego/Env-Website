const React = require('react');
const topojson = require('topojson');
const MapBubble = require('react-d3-map-bubble').MapBubble;

const { getSourceCssName, getProducerDisplayname, getSourceDisplayname } = require('../utils/nameMaps.js');

const buttonStyles = {
    textAlign: 'left',
    width: 300,
    border: '3px solid gray',
    margin: '10px'
}

const width = 960;
const height = 700;

// Keep these names as they map to the fields in Map json.
const sources = ['coal', 'hydroelectric', 'wind', 'naturalGas', 'petroleum', 'solar', 'nuclear'];
const utilities = ['IPP CHP', 'IPP Non-CHP', 'Electric Utility'];

export default class EnergySourceMap extends React.Component {
	constructor(props) {
		super();
        let mapData, dataStates, dataCounties, circles, circleValue, tooltipContent;
        let domain = {
            scale: 'sqrt',
            domain: [0, 2000],
            range: [0, 15]
        };
        let currentSources = ['coal'];
        let currentUtilities = ['IPP CHP', 'IPP Non-CHP', 'Electric Utility'];
        let sourceTotals = {
            coal: 176260,
            hydroelectric: 121811,
            naturalGas: 636376,
            nuclear : 122851,
            petroleum: 24755,
            solar: 26868,
            wind: 115327
        };

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
            currentSources,
            currentUtilities,
            sourceTotals
        };
	}

    componentDidMount() {
        // The data fetch should happen in a HOC, not here
        // This is because this function will run multiple times for some reason
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

                let circles = topojson.feature(us, us.objects.counties).features;
                circles = this.filterBySource(circles);
                circles = this.filterByUtility(circles);
                let currentSources = this.state.currentSources;
                let circleValue = function(d) { 
                    let finalVal = 0;
                    currentSources.forEach(filteredEnergySource => {
                        // Need to handle case where multiple sources exist in same county
                        // I will choose the largest 
                        if (d.properties[filteredEnergySource] > finalVal) {
                            finalVal = d.properties[filteredEnergySource];
                        }
                    });
                    return finalVal; 
                };
                let tooltipContent = function(d) {
                    let payload = {};
                    payload.name = d.properties.name;
                    payload.population = d.properties.population;
                    if (d.properties.entityName) { // Name of the power producer
                        payload['Energy Producer'] = d.properties.entityName;
                    }
                    sources.forEach(el => {
                        payload[el] = d.properties[el] +' MHWs';
                    });
                    return payload;
                }
                let sourceTotals = {};
                let countyArray = us.objects.counties.geometries;
                sources.forEach(source => {
                    let sourceTotal = 0;
                    countyArray.forEach(county => {
                        sourceTotal += county.properties[source];
                    });
                    sourceTotals[source] = Math.round(sourceTotal);
                })    
                
                this.setState({
                    mapData: us,
                    dataStates,
                    dataCounties,
                    circles,
                    circleValue,
                    tooltipContent,
                    sourceTotals
                });
            });
    };

    getEnergyFilterOptions(energySourceArray, currentSources) {
        let sources = energySourceArray.sort();
        let list = sources.map(source => { return <li>{getSourceDisplayname(source)} <input type="checkbox" checked={currentSources.indexOf(source) !== -1} id={source} name="source" value={source} style={{marginLeft: '10px'}} key={source} onClick={this.updateSources.bind(this)} /></li> });
        return list;
    }

    getUtilityFilterOptions(utilitySourceArray, currentUtilities) {
        let sources = utilitySourceArray.sort();
        let list = sources.map(source => { return <li>{getProducerDisplayname(source)} <input type="checkbox" checked={currentUtilities.indexOf(source) !== -1} id={source} name="utility" value={source} style={{marginLeft: '10px'}} key={source} onClick={this.updateUtilities.bind(this)} /></li> });
        return list;
    }

    updateSources(e) {
        let source = e.target.value;
        let current = this.state.currentSources;
        let index = current.indexOf(source);
        if(index !== -1) { // source is active.  Remove it from currentSources
            current.splice(index, 1);
        } else {
            current.push(source);
        }
        this.setState({ currentSources: current});
        this.renderMap()

    }

    updateUtilities(e) {
        let utility = e.target.value;
        let current = this.state.currentUtilities;
        let index = current.indexOf(utility);
        if(index !== -1) { // utility is active.  Remove it from currentUtilities
            current.splice(index, 1);
        } else {
            current.push(utility);
        }
        this.setState({ currentUtilities: current});
        this.renderMap()

    }

    filterBySource(circles) {
        let currentSources = this.state.currentSources;
        return circles.filter(county => {
            let res = false;
            // Class should be largest value based on filtered energy source.
            let sourceVal = 0;
            currentSources.forEach(filteredEnergySource => {
                if(county.properties[filteredEnergySource] > sourceVal) {
                    sourceVal = county.properties[filteredEnergySource];
                    county.properties.class = getSourceCssName(filteredEnergySource);
                    res = true;
                }
            });
            if(res) {
                return true;
            }
            return false;
        });
    };

    filterByUtility(circles) {
        const currentUtilities = this.state.currentUtilities;
        return circles.filter(county => {
            let res = false;
            currentUtilities.forEach(activeUtility => {
                if(county.properties.sector === activeUtility) {
                    res = true;
                }
            });
            if (res) {
                return true;
            }
            return false;
        });
    };

    renderMap() {
        const currentSources = this.state.currentSources;
        const currentUtilities = this.state.currentUtilities;
        let circles = topojson.feature(this.state.mapData, this.state.mapData.objects.counties).features
            //.sort(function(a, b) { return b.properties[source] - a.properties[source]; })
        
        // Filter by energy source
        circles = this.filterBySource(circles);

        // Filter by utility
        circles = this.filterByUtility(circles);

        let circleValue = function(d) { 
            let finalVal = 0;
            currentSources.forEach(filteredEnergySource => {
                // Need to handle case where multiple sources exist in same county
                // I will choose the largest 
                if (d.properties[filteredEnergySource] > finalVal) {
                    finalVal = d.properties[filteredEnergySource];
                }
            });
            return finalVal;  
        };
        this.setState({ 
            circles,
            circleValue
        });
    }

  render() {
    console.log('this state', this.state);
    const sourceFilterButtons = this.getEnergyFilterOptions(sources, this.state.currentSources);
    const utilityFilterButtons = this.getUtilityFilterOptions(utilities, this.state.currentUtilities);
    let map;
    console.log(this.state.circleClass);
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
        <div style={{ width ,border: '3px solid gray'}}>
            <b>Energy generated by source</b>
            <br />
            This map shows the location, intensity, and type of electricity generated in the US.
            <br />
            This incudes both private and public active power stations in the US as of April 2017 (source: <a href="https://www.eia.gov/electricity/data/eia860m/">EIA</a>)
             <div style={filterStyle}>
                <form style={buttonStyles}>
                    <ul style={{listStyleType :'none'}} ><b>Filter by energy source</b>{sourceFilterButtons}</ul>
                </form>
                <form style={buttonStyles}>
                    <ul style={{listStyleType :'none'}} ><b>Filter by production source</b>{utilityFilterButtons}</ul>
                </form>
            </div>
            {map}
        </div>

      )
  }
}
  


  



  