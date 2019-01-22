import React, { Component } from 'react'
import { string, func, number, shape } from 'prop-types';
import { Circle } from 'react-google-maps';
import { plantTypes, getRadiusBounds } from './utils';

export default class GoogleMapsCircle extends Component {
    static propTypes = {
        source: shape({
            id: string.isRequired,
            name: string.isRequired,
            utilityName: string.isRequired,
            city: string.isRequired,
            state: string.isRequired,
            zip: string.isRequired,
            county: string.isRequired,
            lat: number.isRequired,
            long: number.isRequired,
            coal: number.isRequired,
            oil: number.isRequired,
            naturalGas: number.isRequired,
            biofuel: number.isRequired,
            solar: number.isRequired,
            wind: number.isRequired,
            geothermal: number.isRequired,
            hydro: number.isRequired,
            nuclear: number.isRequired,
            other: number.isRequired,
            plantType: string.isRequired,
            primaryFuel: string.isRequired,
            distance: number.isRequired,
            radius: number.isRequired
        }).isRequired,
        onClick: func.isRequired
    }

    render() {
        const source = this.props.source;
        const colors = {
            fillColor: plantTypes[source.primaryFuel].circleColor,
            strokeColor: plantTypes[source.primaryFuel].circleColor,
            strokeWeight: 0
        };
        return (<Circle
                    radius={source.radius}
                    center={{ lat: source.lat, lng: source.long }} 
                    onClick={this.props.onClick.bind(this, source)}
                    strokeColor={plantTypes[source.primaryFuel].circleColor}
                    strokeOpacity={0}
                    strokeWeight={1}
                    options={colors}
                    fillOpacity={0.2}
                />);
    }
}