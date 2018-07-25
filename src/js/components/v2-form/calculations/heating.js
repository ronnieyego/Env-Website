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
import stateTemps from '../data/average-temp-by-state';
import { utilityEmissionsPerState } from '../../../utils/utils-data/state-energy-and-emissions';
import { convertDailyToMonthly } from './utils';
import isThere from '../../../utils/is-there';

/*
    Assumptions
        Radiators  
            1.  They are on the entire time you're home
        Radiant Flooring  
            1.  They are on the entire time you're home

*/


const HOURS_OF_HEATING = 16; // I assume you're gone 8 hours a day and leave the heat off.

const convertKwhToCo2 = (state, kwh) => {
    return Math.round(utilityEmissionsPerState[state] * kwh * 10)/10;
}

const getDifferenceInTemp = (state, summerTemp, winterTemp) => {
    const stateTemp = stateTemps[state];
    const summer = stateTemp > summerTemp ? 0 : Math.round(Math.abs(summerTemp - stateTemp));
    const winter = stateTemp > winterTemp ? 0 : Math.round(Math.abs(winterTemp - stateTemp));
    return { summer, winter };
};

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
    if( heatWholeHome === 'Entire home') {
        heatingSize = houseSqft;
    } else if( heatWholeHome === 'Most rooms') {
        heatingSize = houseSqft * .75; //
    } else if( heatWholeHome === 'Half of rooms') {
        heatingSize = houseSqft * .5; 
    } else if( heatWholeHome === 'Some rooms') {
        heatingSize = houseSqft * .33;
    } else if( heatWholeHome === 'Quarter of rooms') {
        heatingSize = houseSqft * .25; 
    } else if ( heatWholeHome === 'Just my current room') {
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

const checkIfAllFieldsPresent = ({ state, heatType, insulationType, houseSqft, summerTemp, winterTemp, hoursHome, heatingOnWhileSleeping, heatWholeHome, usesPersonalHeater }) => {
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
}

export default ({ 
    state,
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
    checkIfAllFieldsPresent({ state, heatType, insulationType, houseSqft, summerTemp, winterTemp, hoursHome, heatingOnWhileSleeping, heatWholeHome, usesPersonalHeater });
    const personalHeaterKwh = usesPersonalHeater ? getPersonalHeaterKwh(hoursHome) : 0;
    const personalHeaterCo2 = convertKwhToCo2(state, personalHeaterKwh);
    
    if(heatType === 'None') {
        const totalCo2 = personalHeaterCo2;
        const monthlyCo2 = convertDailyToMonthly(totalCo2);
        return { totalCo2, monthlyCo2 };
    }
    let totalCo2 = 0;

    const tempDiff = getDifferenceInTemp(state, summerTemp, winterTemp);
    // Ignoring summer
    const heatingRequirementBtus = getHeatingRequirementBtus(houseSqft, tempDiff.winter, insulationType);
    const timeOn = getTimeOn(hoursHome, heatingOnWhileSleeping);

    totalCo2 += personalHeaterCo2;
    if(heatType === 'Gas Vents') {
        totalCo2 += getNaturalGasCo2(heatingRequirementBtus);
    } else if(heatType === 'Heat Pump') {
        const heatingPumpKwh =  heatingRequirementBtus / btusPerKwhHeatPump;
        totalCo2 += convertKwhToCo2(state, heatingPumpKwh);
    }else if(heatType === 'Radiator') {
        const heatingSize = getSizeFromHeatWholeHome(heatWholeHome, houseSqft);
        const radiatorKwh = getRadiatorKwh(timeOn, heatingSize);
        totalCo2 += convertKwhToCo2(state, radiatorKwh);
    } else if(heatType === 'Radiant Flooring') {
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



