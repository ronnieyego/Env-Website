// Averaged from a few sources.

import ids from '../../../utils/ids/index';
import { statesLatLong } from '../../../utils/utils-data/lat-longs';
import geolib from 'geolib';

const METERS_TO_MILES = 0.000621371;

// Wrapper around geolib to convert meters to miles
const getDistance = (start, destination) => {
    const meters = geolib.getDistance(start,destination);
    return Math.round(meters * METERS_TO_MILES);
} 

export const transitCO2 = {
    // LB CO2e/ LB-MI
    plane:	0.00297,
    truck:	0.00072,
    rail:	0.00090,
    ship:	0.00003
}

// Wild guess of road frieght distance from the state to your house.
const fromStateToHouse = 100;
// Wild guess that under 200 miles, it'll be truck vs train.
const truckTrainCutoffDistance = 200;


const chinaToPortDistance = 93;
const europeToPortDistance = 100;

const latLongs = {
    longBeach: { name: 'Long Beach, CA', latitude:33.7701, longitude: -118.1937, chinaDistance: 6564, europeDistance: 7991 }, 
    savannah: { name: 'Savannah, GA', latitude:32.0809, longitude: -81.0912, chinaDistance: 10946, europeDistance: 4180 },
    houston: { name: 'Houston, TX', latitude: 29.7604, longitude: -95.3698, chinaDistance: 11119, europeDistance: 4810 },
    newYork: { name: 'New York, NY', latitude: 40.7128, longitude: -74.0060, chinaDistance: 11565, europeDistance: 3472 },
    seattle: { name: 'Seattle, WA', latitude: 47.6062, longitude: -122.3321, chinaDistance: 5705, europeDistance: 8650   },
    shanghai: { name: 'Shanghai, China', latitude: 31.2304, longitude: 121.4737 },
    europe: { name: 'Amsterdamn, Netherlands', latitude: 52.3702, longitude: 4.8952 }
}


//  in miles
// cool shipping map https://www.shiplilly.com/blog/ocean-shipping-from-china-to-miami-carrier-review-and-routes/#manhattan-bridge
// toPanama: 9343,
// THis will be train miles
// Big chinese manufacturing cities, SHanghai, Ningbo, Hangzhou (200km from coast).  Tainjin on the water.  Beijin is about 150km away from water and Tainjin  Assume 150km from port.

// Europe to panama canal: 5540
// pC to seattle 3610  
// PC to Long Beach 2951 

const getCity = (destination, port) => {
    const longBeachDistance = getDistance(latLongs.longBeach, destination);
    const houstonDistance = getDistance(latLongs.houston, destination);
    const newYorkDistance = getDistance(latLongs.newYork, destination);
    const savannahDistance = getDistance(latLongs.savannah, destination);
    const seattleDistance = getDistance(latLongs.seattle, destination);

    // get min distance for port or max distance for across america
    const distance = port ? 
        Math.min(longBeachDistance, houstonDistance, newYorkDistance, savannahDistance, seattleDistance)
        :
        Math.max(longBeachDistance, houstonDistance, newYorkDistance, savannahDistance, seattleDistance)

    if(longBeachDistance === distance ) {
        return latLongs.longBeach;
    } else if (houstonDistance === distance ) {
        return latLongs.houston;
    } else if (newYorkDistance === distance ) {
        return latLongs.newYork;
    } else if (savannahDistance === distance ) {
        return latLongs.savannah;
    } else if (seattleDistance === distance ) {
        return latLongs.seattle;
    }
    console.log('error.  Could not find city');
    return null;
};

// Could be an arbitrary location or a port
const getFromStatesToDestination = (start, destination, rush, weight) => {
    const usDistance = getDistance(start, destination);
    if (usDistance < truckTrainCutoffDistance ) { // Rush doesnt matter if its so close
        const usDistanceCo2 = usDistance * weight * transitCO2.truck;
        const totalCo2 = usDistanceCo2;
        return { totalCo2, usDistance, usDistanceCo2, local: true };
    } else if (rush) { // Rush use plane
        const planeCo2 = usDistance * weight * transitCO2.plane;
        const usTruckCo2 = fromStateToHouse * weight * transitCO2.truck;
        const totalCo2 = usTruckCo2 + planeCo2;
        return { totalCo2, usDistance, planeCo2, usTruckCo2, airDistance: usDistance };
    } else { // No Rush.  Take rail
        const usRailCo2 = usDistance * weight * transitCO2.rail;
        const usTruckCo2 = fromStateToHouse * weight * transitCO2.truck;
        const totalCo2 = usTruckCo2 + usRailCo2;
        return { totalCo2, usDistance, usRailCo2, usTruckCo2 };
    };
};


const getFromOverseas = (continent, destination, rush, weight) => {
    const overseasRailDistance = continent === 'China' ? chinaToPortDistance : europeToPortDistance;
    const startCity = continent === 'China' ? latLongs.shanghai : latLongs.europe;
    const fromPortName = continent === 'China' ? 'chinaDistance' : 'europeDistance';
    const overseasRailCo2 = overseasRailDistance * transitCO2.rail * weight;
    if (rush) { // Rush:  use plane
        const airDistance = getDistance(startCity, destination);
        const planeCo2 = weight * transitCO2.plane * airDistance;
        const usRoadCo2 = fromStateToHouse * weight * transitCO2.truck;
        const totalCo2 = planeCo2 + usRoadCo2 + overseasRailCo2;
        return { totalCo2, airDistance, overseasRailDistance, overseasRailCo2, planeCo2, usRoadCo2, fromOverseas: continent };
    } // No rush
    const shipPort = getCity(destination, true);
    const overseasShipDistance = shipPort[fromPortName];
    const overseasShipCo2 = overseasShipDistance * transitCO2.ship * weight;
    const afterUs = getFromStatesToDestination(shipPort, destination, rush, weight);
    const totalCo2 = afterUs.totalUsCo2 + overseasRailCo2 + overseasShipCo2;
    return { totalCo2,
        overseasRailCo2,
        overseasRailDistance,
        overseasShipCo2,
        overseasShipDistance,
        ...afterUs,
        fromOverseas: continent,
        shipPort
    };
};

const getFromAcrossAmerica = (destination, rush, weight) => {
    const madeCity = getCity(destination, false);
    console.log('Lets assume this package was made in ', madeCity.name);
    const results = getFromStatesToDestination(madeCity, destination, rush, weight);
    return { totalCo2: results.totalUsCo2, ...results, producedIn: madeCity.name };
};

// Aiming for a state close to X miles away
const getXDistance = (range, destination, rush, weight) => {
    const states = Object.keys(statesLatLong);
    let madeStateDistance = 1000;
    let madeState;
    states.forEach(state => {
        // Slow computation but mehhhhh.  WIll be fast enough
        const distance = getDistance(statesLatLong[state], destination);
        const distanceToRange = Math.abs(range - distance); 
        if(distanceToRange < madeStateDistance) {
            madeState = state;
            madeStateDistance = distanceToRange;
        }
    });
    // { state: madeState, distance: madeStateDistance };
    const results = getFromStatesToDestination(statesLatLong[madeState], destination, rush, weight);
    const totalCo2 = results.totalUsCo2;
    return { totalCo2, ...results, producedIn: madeState };
}

// Trains take 2 days to cross half of the US
// 4 days for the whole country


const packageQuestions = [
    {    
        id: ids.packageWeight,
        name: 'How many pounds does your package weigh?',
        value: 5,
        type: 'int',
        forms: ['package'],
        formType: 'costs',
    },
    {    
        id: ids.packageMade,
        name: 'Where was the package made?',
        "selectOptions": [
            'Local (~200 miles)',
            'Semi-local (~1000 miles)',
            'Across America',
            'Unknown. Probably in America',
            'China',
            'Europe',
            'No idea',
        ],
        value: "China",
        type: 'dropdown',
        forms: ['package'],
        formType: 'costs'
    },
    {    
        id: ids.packageShipping,
        name: 'What type of shipping did you select?',
        "selectOptions": [
            'Overnight',
            '2 Day',
            'Within a week',
            'No rush',
        ],
        value: "No rush",
        type: 'dropdown',
        forms: ['package'],
        formType: 'costs'
    }
];

module.exports = {
    packageQuestions,
    getFromOverseas,
    getFromStatesToDestination,
    getXDistance,
    getFromAcrossAmerica,
    fromStateToHouse
}