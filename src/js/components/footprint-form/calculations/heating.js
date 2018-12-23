import {
    naturalGasCo2,
    btusLostPerSqft,
    btusToHeat,
    btusPerNaturalGas,
    btusLostByInsulation,
    radiatorWattageBySqft,
    radiantFloorWattageBySqft,
    btusPerKwhHeatPump,
    personalHeaterWattage
} from '../data/heating-cooling';
import stateTemps from '../data/average-temp-by-state.js';
import { utilityEmissionsPerState } from '../../../utils/utils-data/state-energy-and-emissions';
import { convertDailyToMonthly } from './utils';
import isThere, { oneOfIsThere } from '../../../utils/is-there';
import ids from '../../../utils/ids/index';
// import 'isomorphic-fetch';
// import getEnv from '../../../utils/get-env';

/*
    TODO:  Add housemates. Should reduce some number based on housemates
    Assumptions
        Radiators  
            1.  They are on the entire time you're home
        Radiant Flooring  
            1.  They are on the entire time you're home

*/


const HOURS_OF_HEATING = 16; // I assume you're gone 8 hours a day and leave the heat off.

const convertKwhToCo2 = (state, kwh) => {
    return Math.round(utilityEmissionsPerState[state] * kwh * 10)/10;
};

// const fetchUserZipDataFromZip = async(zip) => {
//     const env = getEnv();
//     const zipData = await fetch(`${env.baseUrl}/api/get-nearest-zip-code-temperature-data/${zip}`)
//         .then(res => res.json())
//         .catch(() => {
//             console.log('Failed to fetch zip data for zip', zip);
//             return {error: true}
//         });
//     return zipData.error ? null : zipData;
// }

const getDifferenceInTemp = ({userZip, zipData, state, summerTemp, winterTemp}) => {
    // if(userZip && !zipData) {
    //     console.log('fetching userZipData from zipcode', userZip);
    //     zipData = await fetchUserZipDataFromZip(userZip);
    // }
    if(!zipData) {
        console.log(`WARNING -- Expected to find zip temperature data for zipData: ${zipData} or userZip: ${userZip}`);
        console.log('Using state data instead');
        const stateTempWinter = stateTemps[state].winter;
        const stateTempSummer = stateTemps[state].summer;
        const summer = stateTempSummer > summerTemp ? 0 : Math.round(Math.abs(summerTemp - stateTempSummer));
        const winter = stateTempWinter > winterTemp ? 0 : Math.round(Math.abs(winterTemp - stateTempWinter));
        return { summer, winter };
    }
    const zipTempWinter = zipData.winter;
    const zipTempSummer = zipData.summer;
    const summer = zipTempSummer > summerTemp ? 0 : Math.round(Math.abs(summerTemp - zipTempSummer));
    const winter = zipTempWinter > winterTemp ? 0 : Math.round(Math.abs(winterTemp - zipTempWinter));
    return { summer, winter };
}

const getTimeOn = (hoursHome, heatingOnWhileSleeping) => {
    return heatingOnWhileSleeping ? hoursHome + 8 : hoursHome;
};

// TODO add multiplier based on temp diff.  Great diff leads to more heat loss.
const getHeatLoss = (houseSqft, insulationType, tempDiff) => {
    // You can't loss heat to make inside colder than outside.
    const maxHeatLoss = tempDiff * houseSqft * btusToHeat * HOURS_OF_HEATING;
    const multiplier = btusLostByInsulation[insulationType];
    const naturalHeatLoss = houseSqft * btusLostPerSqft * HOURS_OF_HEATING * multiplier;
    const realHeatLoss = naturalHeatLoss > maxHeatLoss ? maxHeatLoss : naturalHeatLoss;
    return realHeatLoss;
};

const getHeatingRequirementBtus = (houseSqft, tempDiff, insulationType) => {
    const heatRequirement = houseSqft * btusToHeat * tempDiff; // BTUs to get the house to temp.  Assume no heat loss
    const heatLoss = getHeatLoss(houseSqft, insulationType, tempDiff);
    
    return heatRequirement + heatLoss;
};

const getNaturalGasCo2 = btus => {
    const ngRequired = btus / btusPerNaturalGas;
    const ngCo2 = Math.round(ngRequired * naturalGasCo2);
    return ngCo2;
};

const getSizeFromHeatWholeHome = (heatWholeHome, houseSqft) => {
    // Overloaded with heat whole home questions and radiant floor heat whole home
    let heatingSize;
    if( heatWholeHome === ids.entireHome) {
        heatingSize = houseSqft;
    } else if( heatWholeHome === ids.mostRooms) {
        heatingSize = houseSqft * .75; //
    } else if( heatWholeHome === ids.halfOfRooms) {
        heatingSize = houseSqft * .5; 
    } else if( heatWholeHome === ids.someRooms) {
        heatingSize = houseSqft * .33;
    } else if( heatWholeHome === ids.quarterOfRooms) {
        heatingSize = houseSqft * .25; 
    } else if ( heatWholeHome === ids.justCurrentRoom) {
        heatingSize = 250; // average room size
    } else {
        console.log('ERROR -- bad value for Heat Whole Home')
    }
    return heatingSize;
}

const getRadiatorKwh = (hoursOn, heatingSize) => {
    const radiatorWttage = heatingSize * radiatorWattageBySqft;
    const kwh = hoursOn * radiatorWttage / 1000;
    return kwh;
};

const getRadiantFlooringKwh = (hoursOn, heatingSize) => {
    const radiantFlooringWattage = heatingSize * radiantFloorWattageBySqft;
    const kwh = hoursOn * radiantFlooringWattage / 1000;
    return kwh;
};

const getPersonalHeaterKwh = hoursHome => {
    return hoursHome * personalHeaterWattage / 1000;
}

const checkIfAllFieldsPresent = ({ state, userZip, userZipData, heatType, insulationType, houseSqft, summerTemp, winterTemp, hoursHome, heatingOnWhileSleeping, heatWholeHome, usesPersonalHeater }) => {
    isThere(state, 'state required');
    isThere(heatType, 'heatType required');
    isThere(insulationType, 'insulationType required');
    isThere(houseSqft, 'houseSqft required');
    isThere(summerTemp, 'summerTemp required');
    isThere(winterTemp, 'winterTemp required');
    isThere(hoursHome, 'hoursHome required');
    isThere(heatingOnWhileSleeping, 'heatingOnWhileSleeping required');
    isThere(heatWholeHome, 'heatWholeHome required');
    isThere(usesPersonalHeater, 'usesPersonalHeater required');
    oneOfIsThere([userZip, userZipData], 'Either need a user zip code or user zip data.')
}

export default ({ 
    state,
    userZip,
    userZipData,
    heatType,
    insulationType,
    houseSqft,
    summerTemp,
    winterTemp,
    hoursHome,
    heatingOnWhileSleeping = false,
    heatWholeHome,
    usesPersonalHeater 
}) => {
    checkIfAllFieldsPresent({ state, userZip, userZipData, heatType, insulationType, houseSqft, summerTemp, winterTemp, hoursHome, heatingOnWhileSleeping, heatWholeHome, usesPersonalHeater });
    const personalHeaterKwh = usesPersonalHeater ? getPersonalHeaterKwh(hoursHome) : 0;
    const personalHeaterCo2 = convertKwhToCo2(state, personalHeaterKwh);
    
    if(heatType === 'None') {
        const totalCo2 = personalHeaterCo2;
        const monthlyCo2 = convertDailyToMonthly(totalCo2);
        return { totalCo2, monthlyCo2 };
    }
    let totalCo2 = 0;

    const tempDiff = getDifferenceInTemp({userZip, userZipData, state, summerTemp, winterTemp});
    // Ignoring summer
    const heatingRequirementBtus = getHeatingRequirementBtus(houseSqft, tempDiff.winter, insulationType);
    const timeOn = getTimeOn(hoursHome, heatingOnWhileSleeping);

    totalCo2 += personalHeaterCo2;
    if(heatType === ids.gasVents) {
        totalCo2 += getNaturalGasCo2(heatingRequirementBtus);
    } else if(heatType === ids.heatPump) {
        const heatingPumpKwh =  heatingRequirementBtus / btusPerKwhHeatPump;
        totalCo2 += convertKwhToCo2(state, heatingPumpKwh);
    }else if(heatType === ids.radiator) {
        const heatingSize = getSizeFromHeatWholeHome(heatWholeHome, houseSqft);
        const radiatorKwh = getRadiatorKwh(timeOn, heatingSize);
        totalCo2 += convertKwhToCo2(state, radiatorKwh);
    } else if(heatType === ids.radiantFloors) {
        const heatingSize = getSizeFromHeatWholeHome(heatWholeHome, houseSqft);
        const radiantFlooringKwh = getRadiantFlooringKwh(timeOn, heatingSize);
        totalCo2 += convertKwhToCo2(state, radiantFlooringKwh);
    } else {
        console.log('Need to add heating type: ', heatType);
    }
    totalCo2 = Math.round(totalCo2 / 2); // Since you only heat for half of the year.
    const monthlyCo2 = convertDailyToMonthly(totalCo2);
    return { totalCo2, monthlyCo2 };
}



