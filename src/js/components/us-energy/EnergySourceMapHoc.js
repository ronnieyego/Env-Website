import React from 'react';
import { connect } from 'react-redux';

// WTF??
const topojson = require('topojson');

import { MapBubble } from '../../../../external/react-d3-bubble/index';
import FilterBox from './FilterBox';
import { getSourceCssName, getProducerDisplayname, getSourceDisplayname } from '../../utils/nameMaps.js';

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

    componentDidMount() {
        if(this.props.showMap) {
            return true;
        };
        console.log('Getting US Energy Data');
        fetch('/data/us.json')  
            .then(response => {
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

    renderMap({sources, utilities}) {
        const currentSources = sources ||  this.props.currentSources;
        const currentUtilities = utilities || this.props.currentUtilities;
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
    if(!this.props.showMap) {
        return <div className="us-energy-map-loading">Map is loading</div>
    } else {
        return (
            <div className="us-energy-map-container">
                <b>Energy generated by source</b>
                <br />
                This interactive map shows the location, output (MWHs/year), and type of electricity generated in the US.
                <br />
                This includes both private and public active power stations in the US as of April 2017 (source: <a href="https://www.eia.gov/electricity/data/eia860m/">EIA</a>)
                    <div className="us-energy-map-filter">
                    <FilterBox
                        dispatch={this.props.dispatch}
                        renderMap={this.renderMap.bind(this)}
                        filterType={'source'}
                        filterArray={sources}
                        currentSelected={this.props.currentSources}
                        currentSources={this.props.currentSources}
                        currentUtilities={this.props.currentUtilities}
                    />
                    <FilterBox
                        dispatch={this.props.dispatch}
                        renderMap={this.renderMap.bind(this)}
                        filterType={'utility'}
                        filterArray={utilities}
                        currentSelected={this.props.currentUtilities}
                        currentSources={this.props.currentSources}
                        currentUtilities={this.props.currentUtilities}
                    />
                </div>
                <MapBubble
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
            </div>
        )
    }
  }
}  