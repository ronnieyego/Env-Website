import React from 'react';
import { connect } from 'react-redux';

// WTF??
const topojson = require('topojson');

import { MapBubble } from '../../../../external/react-d3-bubble/index';

import { getSourceCssName, getProducerDisplayname, getSourceDisplayname } from '../../utils/nameMaps.js';

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
const sourceButtonBorders = ['red', 'blue', 'lightgrey', 'orange', 'black', 'yellow', 'green'];
const utilities = ['IPP CHP', 'IPP Non-CHP', 'Electric Utility'];

const domain = {
    scale: 'sqrt',
    domain: [0, 2000],
    range: [0, 15]
};

@connect((store, props) => {
	return {
        showMap: store.usEnergyMap.showMap,
		mapData: store.usEnergyMap.mapData,
        dataStates: store.usEnergyMap.dataStates,
        dataCounties: store.usEnergyMap.dataCounties,
        circles: store.usEnergyMap.circles,
        circleValue: store.usEnergyMap.circleValue,
        tooltipContent: store.usEnergyMap.tooltipContent,
        sourceTotals: store.usEnergyMap.sourceTotals,
        currentSources: store.usEnergyMap.currentSources,
        currentUtilities: store.usEnergyMap.currentUtilities,
        projection: 'null',
        polygonClass: 'land',
        meshClass: 'border',
        circleClass: 'bubble'
	};
})
export default class EnergySourceMapHoc extends React.Component {
	constructor(props) {
		super();
	}

    componentDidMount() {
        if(this.props.showMap) {
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
                let currentSources = this.props.currentSources;
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
                });

                this.props.dispatch({type: 'RECEIVE_MAP_DATA', payload: { 
                    showMap: true,
                    mapData: us,
                    dataStates,
                    dataCounties,
                    circles,
                    circleValue,
                    tooltipContent,
                    sourceTotals
                }});
            });
    };

    getEnergyFilterOptions(energySourceArray, currentSources) {
        let sources = energySourceArray.sort();
        let list = sources.map((source, index) => {
            const color =  sourceButtonBorders[index];
            const buttonStyle = {
                marginLeft: '10px',
                marginRight: '10px', 
                marginTop: '18px', 
                outline: `4px dashed ${color}`
            };
            return <li><input type="checkbox" checked={currentSources.indexOf(source) !== -1} id={source} name="source" value={source} style={buttonStyle} key={source} onClick={this.updateSources.bind(this)} />  {getSourceDisplayname(source)}</li> 
        });
        return list;
    }

    getUtilityFilterOptions(utilitySourceArray, currentUtilities) {
        let sources = utilitySourceArray.sort();
        let list = sources.map(source => { 
            const buttonStyle = {
                marginLeft: '10px',
                marginRight: '10px', 
                marginTop: '10px', 
            };
            return <li><input type="checkbox" checked={currentUtilities.indexOf(source) !== -1} id={source} name="utility" value={source} style={buttonStyle} key={source} onClick={this.updateUtilities.bind(this)} />  {getProducerDisplayname(source)}</li> 
        });
        return list;
    }

    updateSources(e) {
        let source = e.target.value;
        let current = this.props.currentSources;
        let index = current.indexOf(source);
        if(index !== -1) { // source is active.  Remove it from currentSources
            current.splice(index, 1);
        } else {
            current.push(source);
        }
        this.props.dispatch({type: 'SET_CURRENT_SOURCES', payload: current});
        this.renderMap()

    }

    updateUtilities(e) {
        let utility = e.target.value;
        let current = this.props.currentUtilities;
        let index = current.indexOf(utility);
        if(index !== -1) { // utility is active.  Remove it from currentUtilities
            current.splice(index, 1);
        } else {
            current.push(utility);
        }
        this.props.dispatch({type:'SET_CURRENT_SOURCES', payload: current });
        this.renderMap()
    }

    filterBySource(circles) {
        let currentSources = this.props.currentSources;
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
        const currentUtilities = this.props.currentUtilities;
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
        const currentSources = this.props.currentSources;
        const currentUtilities = this.props.currentUtilities;
        let circles = topojson.feature(this.props.mapData, this.props.mapData.objects.counties).features
        
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
        this.props.dispatch({type: 'SET_CIRCLES', payload: { circles, circleValue }});
    }

  render() {
    const sourceFilterButtons = this.getEnergyFilterOptions(sources, this.props.currentSources);
    const utilityFilterButtons = this.getUtilityFilterOptions(utilities, this.props.currentUtilities);
    let map;
    if (this.props.showMap) {
        map = <MapBubble
                width= {width}
                height= {height}
                dataPolygon= {this.props.dataCounties}
                polygonClass= {'land'}
                dataMesh= {'border'}
                meshClass = {this.props.meshClass}
                domain= {domain}
                dataCircle= {this.props.circles}
                circleValue= {this.props.circleValue}
                circleClass= {'bubble'}
                projection={'null'}
                tooltipContent= {this.props.tooltipContent}
                showGraticule= {false}
                showTooltip= {true}
                showLegend= {true}
            /> 
    } else {
        map = <div styles={{width, height}} Map is loading />
    } // Should add an else with a loading bar thats the size of the map.

      return (
        <div className="us-energy-map-container">
            <b>Energy generated by source</b>
            <br />
            This interactive map shows the location, output (MWHs/year), and type of electricity generated in the US.
            <br />
            This includes both private and public active power stations in the US as of April 2017 (source: <a href="https://www.eia.gov/electricity/data/eia860m/">EIA</a>)
             <div className="us-energy-map-filter">
                <form class="us-energy-map-filter-button">
                <ul className="us-energy-map-filter-button-text"><b>Filter by energy source</b>{sourceFilterButtons}</ul>
                </form>
                <form class="us-energy-map-filter-button">
                    <ul className="us-energy-map-filter-button-text"><b>Filter by production source</b>{utilityFilterButtons}</ul>
                </form>
            </div>
            {map}
        </div>

      )
  }
}
  


  



  