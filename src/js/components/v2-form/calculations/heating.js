import {
    naturalGasCo2,
    btusLostPerSqft,
    btusToHeat,
    btusPerNaturalGas,
    btusLostByInsulation,
} from '../data/heating-cooling';
import stateTemps from '../data/average-temp-by-state';

const HOURS_OF_HEATING = 16; // I assume you're gone 8 hours a day and leave the heat off.

const getDifferenceInTemp = (state, summerTemp, winterTemp) => {
    const stateTemp = stateTemps[state];
    const summer = stateTemp > summerTemp ? 0 : Math.round(Math.abs(summerTemp - stateTemp));
    const winter = stateTemp > winterTemp ? 0 : Math.round(Math.abs(winterTemp - stateTemp));
    return { summer, winter };
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

export default ({state, heatType, insulationType, houseSqft, summerTemp, winterTemp}) => {
    const tempDiff = getDifferenceInTemp(state, summerTemp, winterTemp);
    // Ignoring summer
    const heatingRequirementBtus = getHeatingRequirementBtus(houseSqft, tempDiff.winter, insulationType);

    if(heatType === 'Natural Gas') {
        return getNaturalGasCo2(heatingRequirementBtus);
    }
    console.log('Need to add heating type: ', heatType);
}



