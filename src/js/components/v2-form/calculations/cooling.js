import stateTemps from '../data/average-temp-by-state';
import { acPenaltyTempDiff, acWattage, acWattageTemperature, fanWattage } from '../data/heating-cooling';
import { convertKwhToCo2, getNumberOfRooms } from './utils';


const ROOMS_PER_AC_UNIT = 3;

const getDifferenceInTemp = (state, summerTemp, winterTemp) => {
    const stateTemp = stateTemps[state];
    const summer = Math.abs(summerTemp - stateTemp);
    const winter = Math.abs(winterTemp - stateTemp);
    return { summer, winter };
};

const getTimeOn = (hoursHome, coolingOnWhileSleeping) => {
    return coolingOnWhileSleeping ? hoursHome + 8 : hoursHome;
};

const getAcEnergy = (acType, tempDiff, rooms, timeOn) => {
    const unitWattage = acWattage[acType];
    if (!unitWattage) {
        console.log('ERROR -- could not find acWattage for ', unitWattage);
    }
    const multiplier = tempDiff > acPenaltyTempDiff ? (tempDiff - acPenaltyTempDiff) * acWattageTemperature : 1;
    const adjustedUnitWattage = unitWattage * multiplier;
    const unitKwhPerDay = adjustedUnitWattage * timeOn / 1000;
    const acUnits = acType === 'Central AC' ? 1 : Math.round(rooms / ROOMS_PER_AC_UNIT);
    const kwhPerDay = unitKwhPerDay * acUnits;
    return kwhPerDay;
};

const getFanEnergy = (rooms, timeOn) => {
    // Assume 1 fan per room.
    return fanWattage * rooms * timeOn / 1000;
};

export default ({ 
    state,
    coolingType,
    summerTemp,
    winterTemp,
    hoursHome,
    coolingWhileSleeping,
    houseSqft,
    usesPersonalFan
}) => {
    if( coolingType === 'None') {
        return 0;
    }
    let totalCo2 = 0;
    const tempDiff = getDifferenceInTemp(state, summerTemp, winterTemp);
    const timeOn = getTimeOn(hoursHome, coolingWhileSleeping);
    const numRooms = getNumberOfRooms(houseSqft);
    let kwhPerDay = 0;
    if(coolingType === 'Lots of Fans') {
        kwhPerDay = getFanEnergy(numRooms, timeOn);
    } else {
        kwhPerDay = getAcEnergy(coolingType, tempDiff.summer, numRooms, timeOn);
        if( winterTemp > stateTemps[state]) {
            kwhPerDay += getAcEnergy(coolingType, tempDiff.winter, numRooms, timeOn);
        }
    }
    const personalFanKwh = usesPersonalFan ? getFanEnergy(1, hoursHome) : 0; // 1 fan not used while sleeping
    kwhPerDay += personalFanKwh;

    return convertKwhToCo2(state, kwhPerDay);
};
